import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    console.log('MCP Server Initiator extension is now active!');

    let disposable = vscode.commands.registerCommand('mcp-server-initiator.createMCPServer', async () => {
        try {
            // Get folder name from user input
            const folderName = await vscode.window.showInputBox({
                prompt: 'Enter the name for your MCP server folder',
                placeHolder: 'my-mcp-server',
                validateInput: (value: string) => {
                    if (!value || value.trim() === '') {
                        return 'Folder name cannot be empty';
                    }
                    if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
                        return 'Folder name can only contain letters, numbers, hyphens, and underscores';
                    }
                    return null;
                }
            });

            if (!folderName) {
                return;
            }

            // Get the workspace folder
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                vscode.window.showErrorMessage('No workspace folder found. Please open a folder in VS Code.');
                return;
            }

            const targetPath = path.join(workspaceFolder.uri.fsPath, folderName);

            // Check if folder already exists
            if (fs.existsSync(targetPath)) {
                const overwrite = await vscode.window.showWarningMessage(
                    `Folder "${folderName}" already exists. Do you want to overwrite it?`,
                    'Yes', 'No'
                );
                if (overwrite !== 'Yes') {
                    return;
                }
                // Remove existing folder
                fs.rmSync(targetPath, { recursive: true, force: true });
            }

            // Create folder structure
            await createMCPServerStructure(targetPath, folderName);

            vscode.window.showInformationMessage(`MCP server "${folderName}" created successfully!`);
            
            // Open the created folder in VS Code
            const uri = vscode.Uri.file(targetPath);
            await vscode.commands.executeCommand('vscode.openFolder', uri, true);

        } catch (error) {
            vscode.window.showErrorMessage(`Error creating MCP server: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

async function createMCPServerStructure(basePath: string, folderName: string) {
    // Create main folder
    fs.mkdirSync(basePath, { recursive: true });

    // Create src folder
    const srcPath = path.join(basePath, 'src');
    fs.mkdirSync(srcPath, { recursive: true });

    // Create __init__.py
    const initContent = `"""
MCP Server Application Package
"""

__version__ = "0.1.0"
__author__ = "Your Name"
__email__ = "your.email@example.com"
`;
    fs.writeFileSync(path.join(srcPath, '__init__.py'), initContent);

    // Create server.py
    const serverContent = `"""
Main MCP Server Implementation
"""

import asyncio
import logging
import sys
from typing import Any, Dict, List, Optional
from mcp import StdioServerParameters
from mcp.server import FastMCP
from mcp.server.session import ServerSession
from mcp.server.models import InitializationOptions
from mcp.server.stdio import stdio_server
from mcp.server.lowlevel.server import NotificationOptions
from mcp.types import (
    CallToolRequest,
    CallToolResult,
    ListResourcesRequest,
    ListResourcesResult,
    ListToolsRequest,
    ListToolsResult,
    ReadResourceRequest,
    ReadResourceResult,
    Resource,
    Tool,
    TextContent,
    ImageContent,
    EmbeddedResource,
    LoggingLevel,
)

from .resources import get_resources
from .tools import get_tools, call_tool
from .prompts import get_prompts

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create MCP server
server = FastMCP("${folderName}")

# Register resources using the resource decorator
@server.resource("file://{path}")
async def file_resource(path: str) -> str:
    """Read a file from the filesystem"""
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"Error reading file {path}: {str(e)}"

@server.resource("config://server-config")
def server_config() -> str:
    """Get server configuration"""
    import json
    config = {
        "server_name": "${folderName}",
        "version": "0.1.0",
        "status": "running",
        "features": ["resources", "tools", "prompts"]
    }
    return json.dumps(config, indent=2)

@server.resource("api://status")
def server_status() -> str:
    """Get server status"""
    import json
    status = {
        "status": "healthy",
        "uptime": "0s",
        "resources_count": 3,
        "tools_count": 2
    }
    return json.dumps(status, indent=2)

# Register tools using the tool decorator
@server.tool()
def echo(message: str) -> str:
    """Echo back the input text"""
    return f"Echo: {message}"

@server.tool()
def system_info() -> str:
    """Get system information"""
    import json
    import platform
    info = {
        "platform": platform.system(),
        "platform_version": platform.version(),
        "architecture": platform.machine(),
        "processor": platform.processor(),
        "python_version": platform.python_version()
    }
    return json.dumps(info, indent=2)

@server.tool()
def file_operations(operation: str, path: str, content: str = "") -> str:
    """Perform file operations (list, read, write)"""
    import os
    
    if operation == "list":
        try:
            if os.path.exists(path):
                if os.path.isdir(path):
                    items = os.listdir(path)
                    return f"Directory contents of {path}:\\n" + "\\n".join(items)
                else:
                    return f"{path} is a file"
            else:
                return f"Path {path} does not exist"
        except Exception as e:
            return f"Error listing {path}: {str(e)}"
    
    elif operation == "read":
        try:
            with open(path, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            return f"Error reading {path}: {str(e)}"
    
    elif operation == "write":
        try:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            return f"Successfully wrote to {path}"
        except Exception as e:
            return f"Error writing to {path}: {str(e)}"
    
    else:
        return f"Unknown operation: {operation}"

# Register prompts using the prompt decorator
@server.prompt()
def greeting() -> List[Dict[str, str]]:
    """A friendly greeting prompt"""
    return [
        {
            "role": "user",
            "content": "Hello! I'm your MCP server assistant. How can I help you today?"
        }
    ]

@server.prompt()
def file_analysis(file_content: str) -> List[Dict[str, str]]:
    """Analyze a file and provide insights"""
    return [
        {
            "role": "user",
            "content": f"Please analyze the following file content and provide insights:\\n\\n{file_content}"
        }
    ]

@server.prompt()
def code_review(code: str) -> List[Dict[str, str]]:
    """Review code and provide suggestions"""
    return [
        {
            "role": "user",
            "content": f"Please review the following code and provide suggestions for improvement:\\n\\n{code}"
        }
    ]

@server.prompt()
def data_summary(data: str) -> List[Dict[str, str]]:
    """Summarize data in a structured format"""
    return [
        {
            "role": "user",
            "content": f"Please summarize the following data in a clear and structured format:\\n\\n{data}"
        }
    ]

async def main():
    """Main function to run the MCP server"""
    # FastMCP handles stdio and initialization internally
    await server.run_stdio_async()

if __name__ == "__main__":
    asyncio.run(main())
`;
    fs.writeFileSync(path.join(srcPath, 'server.py'), serverContent);

    // Create resources.py
    const resourcesContent = `"""
Data Resources and Content for MCP Server
"""

import os
import json
from typing import List, Optional
from mcp.server.session import ServerSession
from mcp.types import Resource, TextContent, ReadResourceResult, ListResourcesRequest

async def get_resources(session: ServerSession, request: ListResourcesRequest) -> List[Resource]:
    """Get available resources"""
    resources = []
    
    # Example: File system resources
    if os.path.exists("."):
        for root, dirs, files in os.walk(".", topdown=True):
            for file in files:
                if file.endswith(('.txt', '.md', '.py', '.json')):
                    file_path = os.path.join(root, file)
                    resources.append(
                        Resource(
                            uri=f"file://{os.path.abspath(file_path)}",
                            name=file,
                            description=f"File: {file_path}",
                            mimeType="text/plain"
                        )
                    )
    
    # Example: Configuration resources
    resources.append(
        Resource(
            uri="config://server-config",
            name="Server Configuration",
            description="Current server configuration",
            mimeType="application/json"
        )
    )
    
    # Example: API resources
    resources.append(
        Resource(
            uri="api://status",
            name="Server Status",
            description="Current server status and health",
            mimeType="application/json"
        )
    )
    
    return resources

async def read_resource(uri: str) -> ReadResourceResult:
    """Read a specific resource"""
    if uri.startswith("file://"):
        file_path = uri[7:]  # Remove "file://" prefix
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            return ReadResourceResult(
                contents=[
                    TextContent(
                        type="text",
                        text=content
                    )
                ]
            )
        except Exception as e:
            return ReadResourceResult(
                contents=[
                    TextContent(
                        type="text",
                        text=f"Error reading file: {str(e)}"
                    )
                ]
            )
    
    elif uri == "config://server-config":
        config = {
            "server_name": "${folderName}",
            "version": "0.1.0",
            "status": "running",
            "features": ["resources", "tools", "prompts"]
        }
        return ReadResourceResult(
            contents=[
                TextContent(
                    type="text",
                    text=json.dumps(config, indent=2)
                )
            ]
        )
    
    elif uri == "api://status":
        status = {
            "status": "healthy",
            "uptime": "0s",
            "resources_count": 3,
            "tools_count": 2
        }
        return ReadResourceResult(
            contents=[
                TextContent(
                    type="text",
                    text=json.dumps(status, indent=2)
                )
            ]
        )
    
    else:
        return ReadResourceResult(
            contents=[
                TextContent(
                    type="text",
                    text=f"Unknown resource: {uri}"
                )
            ]
        )
`;
    fs.writeFileSync(path.join(srcPath, 'resources.py'), resourcesContent);

    // Create tools.py
    const toolsContent = `"""
Tool Implementations for MCP Server
"""

import json
import subprocess
import platform
from typing import List, Dict, Any, Optional
from mcp.server.session import ServerSession
from mcp.types import Tool, CallToolResult, TextContent, ListToolsRequest, CallToolRequest

async def get_tools(session: ServerSession, request: ListToolsRequest) -> List[Tool]:
    """Get available tools"""
    tools = [
        Tool(
            name="echo",
            description="Echo back the input text",
            inputSchema={
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string",
                        "description": "The message to echo"
                    }
                },
                "required": ["message"]
            }
        ),
        Tool(
            name="system_info",
            description="Get system information",
            inputSchema={
                "type": "object",
                "properties": {},
                "required": []
            }
        ),
        Tool(
            name="file_operations",
            description="Perform file operations (list, read, write)",
            inputSchema={
                "type": "object",
                "properties": {
                    "operation": {
                        "type": "string",
                        "enum": ["list", "read", "write"],
                        "description": "The operation to perform"
                    },
                    "path": {
                        "type": "string",
                        "description": "File path for the operation"
                    },
                    "content": {
                        "type": "string",
                        "description": "Content to write (for write operation)"
                    }
                },
                "required": ["operation", "path"]
            }
        )
    ]
    
    return tools

async def call_tool(session: ServerSession, request: CallToolRequest) -> CallToolResult:
    """Call a specific tool"""
    tool_name = request.name
    arguments = request.arguments or {}
    
    try:
        if tool_name == "echo":
            message = arguments.get("message", "")
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text=f"Echo: {message}"
                    )
                ]
            )
        
        elif tool_name == "system_info":
            info = {
                "platform": platform.system(),
                "platform_version": platform.version(),
                "architecture": platform.machine(),
                "processor": platform.processor(),
                "python_version": platform.python_version()
            }
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text=json.dumps(info, indent=2)
                    )
                ]
            )
        
        elif tool_name == "file_operations":
            operation = arguments.get("operation")
            path = arguments.get("path")
            
            if operation == "list":
                try:
                    import os
                    if os.path.exists(path):
                        if os.path.isdir(path):
                            items = os.listdir(path)
                            result = f"Directory contents of {path}:\\n" + "\\n".join(items)
                        else:
                            result = f"{path} is a file"
                    else:
                        result = f"Path {path} does not exist"
                except Exception as e:
                    result = f"Error listing {path}: {str(e)}"
                
                return CallToolResult(
                    content=[
                        TextContent(
                            type="text",
                            text=result
                        )
                    ]
                )
            
            elif operation == "read":
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    return CallToolResult(
                        content=[
                            TextContent(
                                type="text",
                                text=content
                            )
                        ]
                    )
                except Exception as e:
                    return CallToolResult(
                        content=[
                            TextContent(
                                type="text",
                                text=f"Error reading {path}: {str(e)}"
                            )
                        ]
                    )
            
            elif operation == "write":
                content = arguments.get("content", "")
                try:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    return CallToolResult(
                        content=[
                            TextContent(
                                type="text",
                                text=f"Successfully wrote to {path}"
                            )
                        ]
                    )
                except Exception as e:
                    return CallToolResult(
                        content=[
                            TextContent(
                                type="text",
                                text=f"Error writing to {path}: {str(e)}"
                            )
                        ]
                    )
        
        else:
            return CallToolResult(
                content=[
                    TextContent(
                        type="text",
                        text=f"Unknown tool: {tool_name}"
                    )
                ]
            )
    
    except Exception as e:
        return CallToolResult(
            content=[
                TextContent(
                    type="text",
                    text=f"Error executing tool {tool_name}: {str(e)}"
                )
            ]
        )
`;
    fs.writeFileSync(path.join(srcPath, 'tools.py'), toolsContent);

    // Create prompts.py
    const promptsContent = `"""
Prompt Templates for MCP Server
"""

from typing import Dict, Any, List, Optional
from mcp.types import Prompt

def get_prompts() -> List[Prompt]:
    """Get available prompt templates"""
    prompts = [
        Prompt(
            name="greeting",
            description="A friendly greeting prompt",
            prompt="Hello! I'm your MCP server assistant. How can I help you today?",
            arguments={}
        ),
        Prompt(
            name="file_analysis",
            description="Analyze a file and provide insights",
            prompt="Please analyze the following file content and provide insights:\\n\\n{file_content}",
            arguments={
                "file_content": {
                    "type": "string",
                    "description": "The content of the file to analyze"
                }
            }
        ),
        Prompt(
            name="code_review",
            description="Review code and provide suggestions",
            prompt="Please review the following code and provide suggestions for improvement:\\n\\n{code}",
            arguments={
                "code": {
                    "type": "string",
                    "description": "The code to review"
                }
            }
        ),
        Prompt(
            name="data_summary",
            description="Summarize data in a structured format",
            prompt="Please summarize the following data in a clear and structured format:\\n\\n{data}",
            arguments={
                "data": {
                    "type": "string",
                    "description": "The data to summarize"
                }
            }
        )
    ]
    
    return prompts

def get_prompt_by_name(name: str) -> Optional[Prompt]:
    """Get a specific prompt by name"""
    prompts = get_prompts()
    for prompt in prompts:
        if prompt.name == name:
            return prompt
    return None

def format_prompt(prompt: Prompt, arguments: Dict[str, Any]) -> str:
    """Format a prompt with the given arguments"""
    formatted_prompt = prompt.prompt
    
    for arg_name, arg_value in arguments.items():
        placeholder = "{" + arg_name + "}"
        if placeholder in formatted_prompt:
            formatted_prompt = formatted_prompt.replace(placeholder, str(arg_value))
    
    return formatted_prompt
`;
    fs.writeFileSync(path.join(srcPath, 'prompts.py'), promptsContent);

    // Create main.py
    const mainContent = `"""
Main entry point for the MCP server
"""

import asyncio
import sys
import os
from pathlib import Path

# Add src directory to Python path
src_path = Path(__file__).parent / "src"
sys.path.insert(0, str(src_path))

from src.server import main, server

# Make server available globally for MCP Inspector
mcp = server

if __name__ == "__main__":
    try:
        print("Starting MCP Server: ${folderName}")
        print("=" * 50)
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\\nServer stopped by user")
    except Exception as e:
        print(f"Error starting server: {e}")
        sys.exit(1)
`;
    fs.writeFileSync(path.join(basePath, 'main.py'), mainContent);

    // Create requirements.txt
    const requirementsContent = `# MCP Server Dependencies
# Model Context Protocol Python SDK
mcp[cli]>=1.0.0

# Additional dependencies for enhanced functionality
requests>=2.28.0
python-dotenv>=1.0.0

# Development dependencies (optional)
pytest>=7.0.0
black>=23.0.0
flake8>=6.0.0
`;
    fs.writeFileSync(path.join(basePath, 'requirements.txt'), requirementsContent);
}

export function deactivate() {} 
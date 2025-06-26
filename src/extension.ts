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

    // Create app folder
    const appPath = path.join(basePath, 'app');
    fs.mkdirSync(appPath, { recursive: true });

    // Create __init__.py
    const initContent = `"""
MCP Server Application Package
"""

__version__ = "0.1.0"
__author__ = "Your Name"
__email__ = "your.email@example.com"
`;
    fs.writeFileSync(path.join(appPath, '__init__.py'), initContent);

    // Create model.py
    const modelContent = `"""
Data models and business logic for the MCP server
"""

from typing import Dict, Any, Optional
from dataclasses import dataclass


@dataclass
class ServerConfig:
    """Configuration for the MCP server"""
    name: str
    version: str
    description: str
    host: str = "localhost"
    port: int = 8000


class DataModel:
    """Base data model class"""
    
    def __init__(self):
        self.data: Dict[str, Any] = {}
    
    def get(self, key: str, default: Any = None) -> Any:
        """Get value by key"""
        return self.data.get(key, default)
    
    def set(self, key: str, value: Any) -> None:
        """Set value by key"""
        self.data[key] = value
    
    def delete(self, key: str) -> bool:
        """Delete value by key"""
        if key in self.data:
            del self.data[key]
            return True
        return False
`;
    fs.writeFileSync(path.join(appPath, 'model.py'), modelContent);

    // Create controller.py
    const controllerContent = `"""
Controller logic for handling MCP server operations
"""

from typing import Dict, Any, List, Optional
from .model import DataModel, ServerConfig


class MCPController:
    """Controller for MCP server operations"""
    
    def __init__(self):
        self.data_model = DataModel()
        self.config = ServerConfig(
            name="MCP Server",
            version="0.1.0",
            description="A Model-Controller-Presenter MCP server"
        )
    
    def handle_request(self, request_type: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle incoming requests"""
        try:
            if request_type == "get":
                return self._handle_get(data)
            elif request_type == "set":
                return self._handle_set(data)
            elif request_type == "delete":
                return self._handle_delete(data)
            elif request_type == "list":
                return self._handle_list(data)
            else:
                return {"error": f"Unknown request type: {request_type}"}
        except Exception as e:
            return {"error": str(e)}
    
    def _handle_get(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle GET requests"""
        key = data.get("key")
        if not key:
            return {"error": "Key is required for GET request"}
        
        value = self.data_model.get(key)
        return {"key": key, "value": value}
    
    def _handle_set(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle SET requests"""
        key = data.get("key")
        value = data.get("value")
        
        if not key:
            return {"error": "Key is required for SET request"}
        
        self.data_model.set(key, value)
        return {"key": key, "value": value, "status": "set"}
    
    def _handle_delete(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle DELETE requests"""
        key = data.get("key")
        if not key:
            return {"error": "Key is required for DELETE request"}
        
        success = self.data_model.delete(key)
        return {"key": key, "deleted": success}
    
    def _handle_list(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle LIST requests"""
        return {"data": self.data_model.data}
    
    def get_server_info(self) -> Dict[str, Any]:
        """Get server information"""
        return {
            "name": self.config.name,
            "version": self.config.version,
            "description": self.config.description,
            "host": self.config.host,
            "port": self.config.port
        }
`;
    fs.writeFileSync(path.join(appPath, 'controller.py'), controllerContent);

    // Create presenter.py
    const presenterContent = `"""
Presentation layer for the MCP server
"""

import json
from typing import Dict, Any, Optional
from .controller import MCPController


class MCPPresenter:
    """Presenter for formatting MCP server responses"""
    
    def __init__(self):
        self.controller = MCPController()
    
    def format_response(self, response: Dict[str, Any], status_code: int = 200) -> str:
        """Format response as JSON string"""
        response_data = {
            "status": "success" if status_code < 400 else "error",
            "status_code": status_code,
            "data": response
        }
        return json.dumps(response_data, indent=2)
    
    def handle_request(self, request_data: str) -> str:
        """Handle incoming request and return formatted response"""
        try:
            # Parse request data
            request = json.loads(request_data)
            request_type = request.get("type")
            data = request.get("data", {})
            
            if not request_type:
                return self.format_response(
                    {"error": "Request type is required"}, 
                    400
                )
            
            # Process request through controller
            result = self.controller.handle_request(request_type, data)
            
            # Check if there was an error
            if "error" in result:
                return self.format_response(result, 400)
            
            return self.format_response(result, 200)
            
        except json.JSONDecodeError:
            return self.format_response(
                {"error": "Invalid JSON in request"}, 
                400
            )
        except Exception as e:
            return self.format_response(
                {"error": f"Internal server error: {str(e)}"}, 
                500
            )
    
    def get_server_info(self) -> str:
        """Get formatted server information"""
        info = self.controller.get_server_info()
        return self.format_response(info, 200)
    
    def health_check(self) -> str:
        """Health check endpoint"""
        return self.format_response({"status": "healthy"}, 200)
`;
    fs.writeFileSync(path.join(appPath, 'presenter.py'), presenterContent);

    // Create main.py
    const mainContent = `"""
Main entry point for the MCP server
"""

import sys
import json
from typing import Dict, Any
from app.presenter import MCPPresenter


def main():
    """Main function to run the MCP server"""
    presenter = MCPPresenter()
    
    print("MCP Server Started")
    print("=" * 50)
    
    # Example usage
    print("\\nServer Info:")
    print(presenter.get_server_info())
    
    print("\\nHealth Check:")
    print(presenter.health_check())
    
    # Example request handling
    example_requests = [
        {"type": "set", "data": {"key": "test_key", "value": "test_value"}},
        {"type": "get", "data": {"key": "test_key"}},
        {"type": "list", "data": {}},
        {"type": "delete", "data": {"key": "test_key"}}
    ]
    
    print("\\nExample Requests:")
    for i, request in enumerate(example_requests, 1):
        print(f"\\nRequest {i}:")
        request_json = json.dumps(request, indent=2)
        print(f"Input: {request_json}")
        
        response = presenter.handle_request(request_json)
        print(f"Output: {response}")


if __name__ == "__main__":
    main()
`;
    fs.writeFileSync(path.join(basePath, 'main.py'), mainContent);

    // Create requirements.txt
    const requirementsContent = `# MCP Server Dependencies
# Add your project dependencies here

# Example dependencies:
# requests>=2.28.0
# fastapi>=0.68.0
# uvicorn>=0.15.0
# pydantic>=1.8.0

# Core Python packages (usually included)
typing-extensions>=4.0.0
`;
    fs.writeFileSync(path.join(basePath, 'requirements.txt'), requirementsContent);
}

export function deactivate() {} 
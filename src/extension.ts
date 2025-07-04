import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const GITHUB_OWNER = "jasonshen190";

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

    // Create components folder
    const componentsPath = path.join(srcPath, 'components');
    fs.mkdirSync(componentsPath, { recursive: true });

    // Create components/__init__.py
    const componentsInitContent = `"""
Components package for ${folderName} MCP Server
Contains tools, resources, and prompts modules
"""

from .tools import *
from .resources import *
from .prompts import *

__all__ = [
    # Tools
    'add_numbers', 'multiply_numbers', 'calculate_bmi', 
    'get_weather', 'format_text', 'get_current_time', 'WeatherData',
    # Resources
    'get_app_config', 'get_greeting', 'get_server_info', 'get_math_constants',
    # Prompts
    'calculator_assistant', 'weather_assistant', 'text_formatter'
]`;
    fs.writeFileSync(path.join(componentsPath, '__init__.py'), componentsInitContent);

    // Create components/tools.py
    const toolsContent = `"""
Tools module for ${folderName} MCP Server
Contains all tool functions and related models
"""

from pydantic import BaseModel, Field
import datetime


class WeatherData(BaseModel):
    temperature: float = Field(description="Temperature in Celsius")
    humidity: float = Field(description="Humidity percentage")
    condition: str = Field(description="Weather condition")
    wind_speed: float = Field(description="Wind speed in km/h")


def add_numbers(a: int, b: int) -> int:
    """Add two numbers together"""
    return a + b


def multiply_numbers(a: float, b: float) -> float:
    """Multiply two numbers together"""
    return a * b


def calculate_bmi(weight_kg: float, height_m: float) -> float:
    """Calculate BMI given weight in kg and height in meters"""
    if height_m <= 0:
        raise ValueError("Height must be positive")
    return weight_kg / (height_m ** 2)


def get_weather(city: str) -> WeatherData:
    """Get weather information for a city (simulated)"""
    # This is a simulated weather API
    weather_data = {
        "New York": WeatherData(temperature=22.5, humidity=65.0, condition="partly cloudy", wind_speed=12.3),
        "London": WeatherData(temperature=15.2, humidity=78.0, condition="rainy", wind_speed=8.7),
        "Tokyo": WeatherData(temperature=28.1, humidity=72.0, condition="sunny", wind_speed=5.2),
        "Sydney": WeatherData(temperature=25.8, humidity=68.0, condition="clear", wind_speed=15.1)
    }
    
    if city in weather_data:
        return weather_data[city]
    else:
        # Return default data for unknown cities
        return WeatherData(temperature=20.0, humidity=60.0, condition="unknown", wind_speed=10.0)


def format_text(text: str, style: str = "normal") -> str:
    """Format text in different styles"""
    styles = {
        "uppercase": text.upper(),
        "lowercase": text.lower(),
        "title": text.title(),
        "reverse": text[::-1],
        "normal": text
    }
    return styles.get(style, text)


def get_current_time(timezone: str = "UTC") -> str:
    """Get the current time in the specified timezone"""
    now = datetime.datetime.now()
    return f"Current time in {timezone}: {now.strftime('%Y-%m-%d %H:%M:%S')}"`;
    fs.writeFileSync(path.join(componentsPath, 'tools.py'), toolsContent);

    // Create components/resources.py
    const resourcesContent = `"""
Resources module for ${folderName} MCP Server
Contains all resource functions
"""

import json


def get_app_config() -> str:
    """Get application configuration"""
    config = {
        "name": "${folderName}",
        "version": "1.0.0",
        "features": ["tools", "resources", "prompts"],
        "status": "active"
    }
    return json.dumps(config, indent=2)


def get_greeting(name: str) -> str:
    """Get a personalized greeting"""
    return f"Hello, {name}! Welcome to the ${folderName} MCP Server."


def get_server_info() -> str:
    """Get server information"""
    info = {
        "server_name": "${folderName}",
        "description": "A comprehensive MCP server demonstrating various features",
        "available_tools": [
            "add_numbers",
            "multiply_numbers", 
            "calculate_bmi",
            "get_weather",
            "format_text",
            "get_current_time"
        ],
        "available_resources": [
            "config://app",
            "greeting://{name}",
            "info://server",
            "math://constants"
        ]
    }
    return json.dumps(info, indent=2)


def get_math_constants() -> str:
    """Get common mathematical constants"""
    constants = {
        "pi": 3.14159265359,
        "e": 2.71828182846,
        "golden_ratio": 1.61803398875,
        "sqrt_2": 1.41421356237
    }
    return json.dumps(constants, indent=2)`;
    fs.writeFileSync(path.join(componentsPath, 'resources.py'), resourcesContent);

    // Create components/prompts.py
    const promptsContent = `"""
Prompts module for ${folderName} MCP Server
Contains all prompt functions
"""


def calculator_assistant() -> str:
    """A helpful calculator assistant prompt"""
    return """You are a helpful calculator assistant. You can:
- Add numbers using the add_numbers tool
- Multiply numbers using the multiply_numbers tool
- Calculate BMI using the calculate_bmi tool
- Get mathematical constants from the math://constants resource

Please help users with their calculations!"""


def weather_assistant() -> str:
    """A weather information assistant prompt"""
    return """You are a weather information assistant. You can:
- Get weather data for cities using the get_weather tool
- Format text using the format_text tool
- Get current time using the get_current_time tool

Please help users with weather-related queries!"""


def text_formatter() -> str:
    """A text formatting assistant prompt"""
    return """You are a text formatting assistant. You can:
- Format text in different styles (uppercase, lowercase, title, reverse)
- Get personalized greetings from greeting://{name} resource
- Get server information from info://server resource

Please help users format their text!"""`;
    fs.writeFileSync(path.join(componentsPath, 'prompts.py'), promptsContent);

    // Create demo_server.py - Main server implementation
    const demoServerContent = `"""
${folderName} MCP Server
A comprehensive example showing tools, resources, and prompts
"""

from mcp.server.fastmcp import FastMCP
from src.components.tools import (
    add_numbers, multiply_numbers, calculate_bmi, 
    get_weather, format_text, get_current_time, WeatherData
)
from src.components.resources import (
    get_app_config, get_greeting, get_server_info, get_math_constants
)
from src.components.prompts import (
    calculator_assistant, weather_assistant, text_formatter
)

# Create the MCP server
mcp = FastMCP("${folderName}")


# ============================================================================
# TOOLS
# ============================================================================

@mcp.tool()
def add_numbers_tool(a: int, b: int) -> int:
    """Add two numbers together"""
    return add_numbers(a, b)


@mcp.tool()
def multiply_numbers_tool(a: float, b: float) -> float:
    """Multiply two numbers together"""
    return multiply_numbers(a, b)


@mcp.tool()
def calculate_bmi_tool(weight_kg: float, height_m: float) -> float:
    """Calculate BMI given weight in kg and height in meters"""
    return calculate_bmi(weight_kg, height_m)


@mcp.tool()
def get_weather_tool(city: str) -> WeatherData:
    """Get weather information for a city (simulated)"""
    return get_weather(city)


@mcp.tool()
def format_text_tool(text: str, style: str = "normal") -> str:
    """Format text in different styles"""
    return format_text(text, style)


@mcp.tool()
def get_current_time_tool(timezone: str = "UTC") -> str:
    """Get the current time in the specified timezone"""
    return get_current_time(timezone)


# ============================================================================
# RESOURCES
# ============================================================================

@mcp.resource("config://app")
def get_app_config_resource() -> str:
    """Get application configuration"""
    return get_app_config()


@mcp.resource("greeting://{name}")
def get_greeting_resource(name: str) -> str:
    """Get a personalized greeting"""
    return get_greeting(name)


@mcp.resource("info://server")
def get_server_info_resource() -> str:
    """Get server information"""
    return get_server_info()


@mcp.resource("math://constants")
def get_math_constants_resource() -> str:
    """Get common mathematical constants"""
    return get_math_constants()


# ============================================================================
# PROMPTS
# ============================================================================

@mcp.prompt()
def calculator_assistant_prompt() -> str:
    """A helpful calculator assistant prompt"""
    return calculator_assistant()


@mcp.prompt()
def weather_assistant_prompt() -> str:
    """A weather information assistant prompt"""
    return weather_assistant()


@mcp.prompt()
def text_formatter_prompt() -> str:
    """A text formatting assistant prompt"""
    return text_formatter()


def main():
    # Run the server on HTTP at 127.0.0.1:8000
    # mcp.run(transport="streamable-http")
    print("Starting MCP server...")
    mcp.run()

if __name__ == "__main__":
    main()`;
    fs.writeFileSync(path.join(srcPath, 'demo_server.py'), demoServerContent);

    // create and empty __init__.py
    const srcInitContent = ``;
    fs.writeFileSync(path.join(srcPath, '__init__.py'), srcInitContent);

    // create mcp-local.json
    const mcpLocalJsonContent = `{
  "mcpServers": [
    "local-mcp-server": {
        "name": "Local MCP Server (streamable-http)",
        "url": "http://127.0.0.1:8000/mcp",
        "transport": "streamable-http",
        "description": "Local development MCP server using streamable-http transport."
    }
  ]
}`;
    fs.writeFileSync(path.join(srcPath, 'mcp-local.json'), mcpLocalJsonContent);

    // create mcp.json
    const mcpJsonContent = `{
  "mcpServers": {
    "${folderName}": {
      "command": "~/.local/bin/uvx",
      "args": ["git+https://github.com/${GITHUB_OWNER}/${folderName}.git@main"],
      "env": {
        "FASTMCP_LOG_LEVEL": "INFO"
      },
      "disabled": false,
      "autoApprove": []
    },
    "awslabs.aws-documentation-mcp-server": {
      "command": "~/.local/bin/uvx",
      "args": ["awslabs.aws-documentation-mcp-server@latest"],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR",
        "AWS_DOCUMENTATION_PARTITION": "aws"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}`;
    fs.writeFileSync(path.join(srcPath, 'mcp.json'), mcpJsonContent);

    // create .fastmcp.json
    const fastmcpJsonContent = `{
    "name": "${GITHUB_OWNER}.${folderName}",
    "version": "0.0.1",
    "branch": "main",
    "entry": "src/demo_server.py",
    "runtime": "python3",
    "files": ["src/", "src/components/", "requirements.txt"]
  }`;
    fs.writeFileSync(path.join(basePath, '.fastmcp.json'), fastmcpJsonContent);

    // create .gitignore
    const gitignoreContent = `__pycache__/
.DS_Store
.vscode/
.cursor/
.cursor/mcp.json
.venv/
build/
${folderName}.egg-info/
`;
    fs.writeFileSync(path.join(basePath, '.gitignore'), gitignoreContent);

    // create pyproject.toml
    const pyprojectTomlContent = `[project]
name = "${folderName}"
version = "1.0.0"
description = "A comprehensive MCP server demonstrating tools, resources, and prompts"
authors = [
    { name = "${GITHUB_OWNER}" }
]
readme = "README.md"
requires-python = ">=3.8"
license = { text = "MIT" }

dependencies = [
    "mcp[cli]>=1.0.0",
    "pydantic>=2.0.0",
    "fastapi>=0.104.0",
    "uvicorn[standard]>=0.24.0",
    "requests>=2.28.0",
    "python-dotenv>=1.0.0"
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0.0",
    "black>=23.0.0",
    "flake8>=6.0.0"
]

[tool.setuptools]
packages = ["src", "src.components"]

[tool.black]
line-length = 88
target-version = ['py38']

[tool.pytest.ini_options]
minversion = "7.0"
addopts = "-ra -q"
testpaths = [
    "src"
]

[project.scripts]
${folderName} = "src.demo_server:main"
`;
    fs.writeFileSync(path.join(basePath, 'pyproject.toml'), pyprojectTomlContent);

    // Create setup_and_run.py
    const setupAndRunContent = `#!/usr/bin/env python3
"""
Setup and run script for the ${folderName} MCP Server
"""

import subprocess
import sys
import os


def install_dependencies():
    """Install required dependencies"""
    print("Installing dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "../requirements.txt"])
        print("✅ Dependencies installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        return False
    return True


def run_server():
    """Run the MCP server"""
    print("\\nStarting the ${folderName} MCP Server...")
    print("Press Ctrl+C to stop the server")
    try:
        subprocess.run([sys.executable, "demo_server.py"])
    except KeyboardInterrupt:
        print("\\nServer stopped.")


def run_test_client():
    """Run the test client"""
    print("\\nRunning test client...")
    try:
        subprocess.run([sys.executable, "test_client.py"])
    except subprocess.CalledProcessError as e:
        print(f"❌ Test client failed: {e}")


def main():
    """Main function"""
    print("${folderName} MCP Server Setup")
    print("=" * 30)
    
    # Check if we're in the right directory
    if not os.path.exists("demo_server.py"):
        print("❌ Please run this script from the src/ directory")
        sys.exit(1)
    
    # Install dependencies
    if not install_dependencies():
        sys.exit(1)
    
    # Ask user what they want to do
    print("\\nWhat would you like to do?")
    print("1. Run the server")
    print("2. Run the test client")
    print("3. Run both (server in background, then test client)")
    print("4. Exit")
    
    while True:
        choice = input("\\nEnter your choice (1-4): ").strip()
        
        if choice == "1":
            run_server()
            break
        elif choice == "2":
            run_test_client()
            break
        elif choice == "3":
            print("\\nStarting server in background...")
            # Start server in background
            server_process = subprocess.Popen([sys.executable, "demo_server.py"])
            try:
                # Wait a moment for server to start
                import time
                time.sleep(2)
                # Run test client
                run_test_client()
            finally:
                # Stop server
                server_process.terminate()
                server_process.wait()
            break
        elif choice == "4":
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please enter 1, 2, 3, or 4.")


if __name__ == "__main__":
    main()
`;
    fs.writeFileSync(path.join(srcPath, 'setup_and_run.py'), setupAndRunContent);

    // Create test_client.py
    const testClientContent = `"""
Test Client for ${folderName} MCP Server
Demonstrates how to connect to and use the MCP server
"""

import asyncio
from mcp import ClientSession
from mcp.client.session_group import StreamableHttpParameters
from mcp.client.streamable_http import streamablehttp_client


async def test_server():
    """Test the ${folderName} MCP server"""
    
    # Create server parameters for HTTP connection
    server_params = StreamableHttpParameters(url="http://127.0.0.1:8000/mcp")
    
    # Connect to the server via streamable-http
    async with streamablehttp_client(server_params.url) as (read, write, _):
        async with ClientSession(read, write) as session:
            
            # Initialize the connection
            await session.initialize()
            
            print("Connected to ${folderName} MCP Server!")
            print("=" * 50)
            
            # Test tools
            print("\\n1. Testing Tools:")
            print("-" * 20)
            
            # Test add_numbers tool
            result = await session.call_tool("add_numbers_tool", {"a": 5, "b": 3})
            print(f"add_numbers_tool(5, 3) = {result.content[0].text}")
            
            # Test multiply_numbers tool
            result = await session.call_tool("multiply_numbers_tool", {"a": 4.5, "b": 2.0})
            print(f"multiply_numbers_tool(4.5, 2.0) = {result.content[0].text}")
            
            # Test calculate_bmi tool
            result = await session.call_tool("calculate_bmi_tool", {"weight_kg": 70.0, "height_m": 1.75})
            print(f"calculate_bmi_tool(70kg, 1.75m) = {result.content[0].text}")
            
            # Test get_weather tool
            result = await session.call_tool("get_weather_tool", {"city": "New York"})
            print(f"get_weather_tool('New York') = {result.content[0].text}")
            
            # Test format_text tool
            result = await session.call_tool("format_text_tool", {"text": "hello world", "style": "uppercase"})
            print(f"format_text_tool('hello world', 'uppercase') = {result.content[0].text}")
            
            # Test get_current_time tool
            result = await session.call_tool("get_current_time_tool", {"timezone": "UTC"})
            print(f"get_current_time_tool('UTC') = {result.content[0].text}")
            
            # Test resources
            print("\\n2. Testing Resources:")
            print("-" * 20)
            
            # Test config resource
            result = await session.read_resource("config://app")
            print(f"config://app = {result.contents[0].text[:100]}...")
            
            # Test greeting resource
            result = await session.read_resource("greeting://Alice")
            print(f"greeting://Alice = {result.contents[0].text}")
            
            # Test server info resource
            result = await session.read_resource("info://server")
            print(f"info://server = {result.contents[0].text[:100]}...")
            
            # Test math constants resource
            result = await session.read_resource("math://constants")
            print(f"math://constants = {result.contents[0].text[:100]}...")
            
            # Test prompts
            print("\\n3. Testing Prompts:")
            print("-" * 20)
            
            # List available prompts
            prompts = await session.list_prompts()
            print(f"Available prompts: {[p.name for p in prompts.prompts]}")
            
            # Get a specific prompt
            result = await session.get_prompt("calculator_assistant_prompt")
            print(f"calculator_assistant_prompt = {result.description}")
            
            print("\\n" + "=" * 50)
            print("All tests completed successfully!")


if __name__ == "__main__":
    asyncio.run(test_server())
`;
    fs.writeFileSync(path.join(srcPath, 'test_client.py'), testClientContent);

    // Create README.md
    const readmeContent = `# ${folderName} MCP Server

## Overview

my-mcp-server is a comprehensive example MCP server demonstrating tools, resources, and prompts using the FastMCP framework. It is modular, extensible, and includes structured output, error handling, and async support.

## Local Testing Instructions

If you want to test the server locally after cloning the repository or downloading and unzipping the package:

1. Open \`src/demo_server.py\` and go to lines 114 and 115.
1. Comment the mcp.run()
1. Uncomment or update these lines to enable the \`streamable-http\` mode:
   \`\`\`python
   # mcp.run(transport="streamable-http")
   # print("Starting MCP server...")
   mcp.run(transport="streamable-http")
   \`\`\`
1. run by following [Testing with the Client](#testing-with-the-client)
1. To test with IDEs like Cursor, use the contents in mcp-local.json in ~/.cursor/mcp.json(restart Cursor might be needed)

## Test with Remote(uvx)
1. Replace Github owner name "${GITHUB_OWNER}" with your own in mcp.json, .fastmcp.json, pyproject.toml
1. Instead of run the demo_server.py locally, use mcp.json in ~/.cursor/mcp.json to use it as remote MCP server

## Project Structure

\`\`\`
my-mcp-server/
├── src/
│   ├── demo_server.py         # Main MCP server with tool/resource/prompt registration
│   ├── setup_and_run.py      # Interactive setup and run script
│   ├── test_client.py        # Async test client for all features
|   |── mcp-local.json        # local test server configuration
│   ├── mcp.json              # Server configuration
│   └── components/
│       ├── tools.py          # Tool logic and models
│       ├── resources.py      # Resource logic
│       ├── prompts.py        # Prompt logic
│       └── __init__.py
├── requirements.txt
├── pyproject.toml
├── README.md
\`\`\`

## Usage

### Testing the Server locally

#### Method 1: Direct execution
\`\`\`bash
python src/demo_server.py
\`\`\`


#### Method 2: Interactive Setup (Recommended)
\`\`\`bash
python src/setup_and_run.py
\`\`\`

### Testing with the Client

Run the test client to see all features in action:
\`\`\`bash
python src/test_client.py
\`\`\`

## Example Output

When you run the test client, you should see output like:

\`\`\`
Connected to my-mcp-server MCP Server!
==================================================

1. Testing Tools:
--------------------
add_numbers_tool(5, 3) = 8
multiply_numbers_tool(4.5, 2.0) = 9.0
calculate_bmi_tool(70kg, 1.75m) = 22.857142857142858
get_weather_tool('New York') = {"temperature": 22.5, "humidity": 65.0, "condition": "partly cloudy", "wind_speed": 12.3}
format_text_tool('hello world', 'uppercase') = HELLO WORLD
get_current_time_tool('UTC') = Current time in UTC: 2024-01-15 10:30:45

2. Testing Resources:
--------------------
config://app = {
  "name": "my-mcp-server",
  "version": "1.0.0",
  "features": ["tools", "resources", "prompts"],
  "status": "active"
}...
greeting://Alice = Hello, Alice! Welcome to the my-mcp-server MCP Server.
info://server = {
  "server_name": "my-mcp-server",
  "description": "A comprehensive MCP server demonstrating various features",
  "available_tools": [...]
}...
math://constants = {
  "pi": 3.14159265359,
  "e": 2.71828182846,
  "golden_ratio": 1.61803398875,
  "sqrt_2": 1.41421356237
}...

3. Testing Prompts:
--------------------
Available prompts: ['calculator_assistant_prompt', 'weather_assistant_prompt', 'text_formatter_prompt']
calculator_assistant_prompt = You are a helpful calculator assistant. You can:
- Add numbers using the add_numbers tool
- Multiply numbers using the multiply_numbers tool
- Calculate BMI using the calculate_bmi tool
- Get mathematical constants from the math://constants resource

Please help users with their calculations!

==================================================
All tests completed successfully!
\`\`\`

## Features

### Tools
- **add_numbers_tool(a, b)**: Add two numbers (int)
- **multiply_numbers_tool(a, b)**: Multiply two numbers (float)
- **calculate_bmi_tool(weight_kg, height_m)**: Calculate BMI given weight (kg) and height (m)
- **get_weather_tool(city)**: Get simulated weather data for a city (returns structured WeatherData)
- **format_text_tool(text, style)**: Format text in different styles (uppercase, lowercase, title, reverse, normal)
- **get_current_time_tool(timezone)**: Get the current time in the specified timezone (default: UTC)

### Resources
- **config://app**: Application configuration (name, version, features, status)
- **greeting://{name}**: Personalized greeting
- **info://server**: Server information and available features
- **math://constants**: Common mathematical constants (pi, e, golden_ratio, sqrt_2)

### Prompts
- **calculator_assistant_prompt**: Assistant for mathematical calculations
- **weather_assistant_prompt**: Assistant for weather-related queries
- **text_formatter_prompt**: Assistant for text formatting

## Main Files

- **src/demo_server.py**: Registers all tools, resources, and prompts with FastMCP. Entry point for running the server.
- **src/setup_and_run.py**: Installs dependencies and interactively runs the server or test client.
- **src/test_client.py**: Async client that tests all tools, resources, and prompts via HTTP.
- **src/components/tools.py**: Implements tool logic and the WeatherData model.
- **src/components/resources.py**: Implements resource logic and returns JSON-encoded data.
- **src/components/prompts.py**: Implements prompt logic for assistants.

## Advanced Usage

- **Structured Output**: \`get_weather_tool\` returns a Pydantic model for structured weather data.
- **Error Handling**: Tools like \`calculate_bmi_tool\` raise errors for invalid input (e.g., non-positive height).
- **Customization**: Add new tools/resources/prompts by editing the respective files in \`src/components/\`.

## Development

- Modular, decoupled design for easy extension and debugging
- Pydantic models for type safety
- Async/await support
- Comprehensive error handling

## Next Steps

- Explore the [MCP Python SDK documentation](https://modelcontextprotocol.io)
- Build your own MCP server with custom functionality
- Integrate with Claude Desktop or other MCP clients

`;
    fs.writeFileSync(path.join(basePath, 'README.md'), readmeContent);

    // Create requirements.txt
    const requirementsContent = `# MCP Server Dependencies
# Model Context Protocol Python SDK
mcp[cli]>=1.0.0
pydantic>=2.0.0 

# HTTP Server Dependencies
fastapi>=0.104.0
uvicorn[standard]>=0.24.0

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
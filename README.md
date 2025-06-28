# MCP Server Initiator

A VS Code extension that creates MCP (Model Context Protocol) server folder structures with ready-to-use Python code using the modern FastMCP framework.

## Features

- Creates a complete MCP server folder structure with FastMCP
- Generates ready-to-use Python code with HTTP transport
- Supports both VS Code and Cursor
- Interactive folder naming with validation
- Automatic folder opening after creation
- Includes comprehensive tools, resources, and prompts functionality
- Built-in test client for immediate testing
- Setup script for easy dependency management

## Usage

1. Open VS Code or Cursor
2. Open a workspace folder where you want to create the MCP server
3. Open the Command Palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Windows/Linux)
4. Type "Create MCP Server" and select the command
5. Enter a folder name when prompted
6. The extension will create the complete folder structure and open it

### Run the Generated MCP Server

After the server is generated, you have several options to run it:

#### Option 1: Using the Setup Script (Recommended)
```bash
cd <your-folder-name>/src
python setup_and_run.py
```

#### Option 2: Direct Server Run
```bash
cd <your-folder-name>/src
python demo_server.py
```

#### Option 3: Using the Main Entry Point
```bash
cd <your-folder-name>
python main.py
```

#### Option 4: Test the Server
```bash
cd <your-folder-name>/src
python test_client.py
```

## Generated Structure

```
<folder-name>/
├── src/
│   ├── components/
│   │   ├── __init__.py      # Components package initialization
│   │   ├── tools.py         # Tool functions and models
│   │   ├── resources.py     # Resource functions
│   │   └── prompts.py       # Prompt functions
│   ├── demo_server.py       # Main MCP server implementation
│   ├── setup_and_run.py     # Setup and run script
│   ├── test_client.py       # Test client for the server
│   ├── mcp.json            # MCP server configuration
│   └── README.md           # Server documentation
├── main.py                 # Entry point for the server
└── requirements.txt        # Python dependencies
```

## Installation

### For Development

1. Clone this repository
2. Navigate to the extension directory:
   ```bash
   cd mcp-server-initiator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Compile the extension:
   ```bash
   npm run compile
   ```
5. Open the extension in VS Code:
   ```bash
   code .
   ```
6. Press `F5` to run the extension in a new Extension Development Host window

### For Production

1. Package the extension:
   ```bash
   npm run package
   ```
2. Install the generated `.vsix` file in VS Code or Cursor:
   
   **Method 1: Using Extensions Panel**
   - Open VS Code/Cursor
   - Go to Extensions (`Cmd+Shift+X` on macOS, `Ctrl+Shift+X` on Windows/Linux)
   - Look for one of these options:
     - Click the "..." (More Actions) menu in the Extensions panel header
     - Click the gear icon (⚙️) in the Extensions panel
     - Right-click in the Extensions panel area
   - Select "Install from VSIX..."
   - Choose the generated `.vsix` file from your project directory
   - Click "Install"
   - Reload the editor when prompted
   
   **Method 2: Drag and Drop**
   - Open VS Code/Cursor
   - Go to Extensions (`Cmd+Shift+X` on macOS, `Ctrl+Shift+X` on Windows/Linux)
   - Simply drag the `.vsix` file from your file explorer and drop it into the Extensions panel
   - Click "Install" when prompted
   - Reload the editor when prompted
   
   **Method 3: Command Line (Recommended)**
   ```bash
   # For VS Code
   code --install-extension mcp-server-initiator-0.0.1.vsix
   
   # For Cursor
   cursor --install-extension mcp-server-initiator-0.0.1.vsix
   ```
   
   **Method 4: File Menu**
   - Open VS Code/Cursor
   - Go to File → Install from VSIX...
   - Choose the generated `.vsix` file
   - Click "Install"
   - Reload the editor when prompted

3. **Test the Generated Server**
   ```bash
   cd <your-folder-name>/src
   python setup_and_run.py
   ```

## Generated Code Features

### Main Server (`src/demo_server.py`)
- Complete MCP server implementation using FastMCP framework
- HTTP transport support for easy testing and development
- Comprehensive tools including:
  - Mathematical operations (add, multiply, BMI calculation)
  - Weather data simulation
  - Text formatting utilities
  - Time and date functions
- Rich resources including:
  - Application configuration
  - Personalized greetings
  - Server information
  - Mathematical constants
- AI assistant prompts for different use cases

### Setup Script (`src/setup_and_run.py`)
- Interactive setup and run script
- Automatic dependency installation
- Multiple run options (server only, test client only, or both)
- User-friendly interface with numbered choices

### Test Client (`src/test_client.py`)
- Comprehensive test suite for all server features
- Demonstrates tool calling with parameters
- Shows resource reading capabilities
- Tests prompt functionality
- Async/await implementation for modern Python

### Configuration (`src/mcp.json`)
- MCP server configuration for easy integration
- HTTP endpoint configuration
- Ready for use with MCP clients

### Main Entry Point (`main.py`)
- Alternative entry point for running the server
- Proper path handling and imports
- Error handling and graceful shutdown

## Server Features

### Tools
- **add_numbers**: Add two numbers together
- **multiply_numbers**: Multiply two numbers together
- **calculate_bmi**: Calculate BMI given weight and height
- **get_weather**: Get weather information for cities (simulated)
- **format_text**: Format text in different styles (uppercase, lowercase, title, reverse)
- **get_current_time**: Get current time in specified timezone

### Resources
- **config://app**: Application configuration and status
- **greeting://{name}**: Personalized greetings
- **info://server**: Server information and capabilities
- **math://constants**: Mathematical constants (π, e, golden ratio, √2)

### Prompts
- **calculator_assistant**: Helpful calculator assistant
- **weather_assistant**: Weather information assistant
- **text_formatter**: Text formatting assistant

## Architecture

The extension creates a modern MCP (Model Context Protocol) server structure using FastMCP:

- **FastMCP Framework**: Modern, decorator-based MCP server implementation
- **HTTP Transport**: Uses streamable-http for easy testing and development
- **Pydantic Models**: Type-safe data models for tool parameters and responses
- **Async Support**: Full async/await support for modern Python development
- **Comprehensive Testing**: Built-in test client for immediate validation

## Requirements

- VS Code 1.74.0 or later
- Node.js 16.x or later
- TypeScript 4.9.4 or later
- Python 3.8+ for the generated MCP server

## Development

### Building

```bash
npm run compile
```

### Watching for Changes

```bash
npm run watch
```

### Testing

1. Press `F5` in VS Code to launch the Extension Development Host
2. Use the "Create MCP Server" command in the new window
3. Test the generated folder structure and code
4. Run the setup script to test the complete workflow

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

---

# MCP 服务器初始化器

一个VS Code扩展，用于创建具有即用型Python代码的MCP（模型上下文协议）服务器文件夹结构。

## 功能特性

- 创建完整的MCP服务器文件夹结构
- 生成即用型Python代码，使用FastMCP
- 支持VS Code和Cursor
- 交互式文件夹命名与验证
- 创建后自动打开文件夹
- 包含工具、资源和提示功能

## 使用方法

1. 打开VS Code或Cursor
2. 打开要创建MCP服务器的工作区文件夹
3. 打开命令面板（macOS上按 `Cmd+Shift+P`，Windows/Linux上按 `Ctrl+Shift+P`）
4. 输入 "Create MCP Server" 并选择命令
5. 在提示时输入文件夹名称
6. 扩展将创建完整的文件夹结构并打开它

### 运行生成的MCP服务器

在生成的服务器文件夹中，依次运行以下命令：

```bash
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
mcp dev main.py
```

## 生成的结构

```
<文件夹名称>/
├── src/
│   ├── components/
│   │   ├── __init__.py      # Components package initialization
│   │   ├── tools.py         # Tool functions and models
│   │   ├── resources.py     # Resource functions
│   │   └── prompts.py       # Prompt functions
│   ├── demo_server.py       # Main MCP server implementation
│   ├── setup_and_run.py     # Setup and run script
│   ├── test_client.py       # Test client for the server
│   ├── mcp.json            # MCP server configuration
│   └── README.md           # Server documentation
├── main.py                 # Entry point for the server
└── requirements.txt        # Python dependencies
```

## 生成的代码功能

### 服务器（`src/server.py`)
- Main MCP server implementation using FastMCP
- Resource decorators for file system access
- Tool decorators for echo, system_info, and file operations
- Prompt decorators for various AI interactions

### Resources (`src/resources.py`)
- File system resource handling
- Configuration and API status resources
- Resource listing and reading functionality

### Tools (`src/tools.py`)
- Echo tool for testing
- System information tool
- File operations tool (list, read, write)

### Prompts (`src/prompts.py`)
- Greeting prompts
- File analysis prompts
- Code review prompts
- Data summary prompts

### Main (`main.py`)
- Entry point for the MCP server
- Server initialization and startup
- Error handling and graceful shutdown

## Architecture

The extension creates a standard MCP (Model Context Protocol) server structure:

- **Server**: Main FastMCP server with decorators for resources, tools, and prompts
- **Resources**: Data access and content management
- **Tools**: Function implementations for AI interactions
- **Prompts**: Template definitions for AI conversations

## Requirements

- VS Code 1.74.0 or later
- Node.js 16.x or later
- TypeScript 4.9.4 or later

## Development

### Building

```bash
npm run compile
```

### Watching for Changes

```bash
npm run watch
```

### Testing

1. Press `F5` in VS Code to launch the Extension Development Host
2. Use the "Create MCP Server" command in the new window
3. Test the generated folder structure and code

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
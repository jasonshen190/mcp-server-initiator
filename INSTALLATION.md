# Installation Guide

## Quick Start

### For Development Testing

1. **Clone and Setup**
   ```bash
   cd mcp-server-initiator
   npm install
   npm run compile
   ```

2. **Test in VS Code**
   - Open the `mcp-server-initiator` folder in VS Code
   - Press `F5` to launch the Extension Development Host
   - In the new window, open Command Palette (`Cmd+Shift+P`)
   - Type "Create MCP Server" and select the command
   - Enter a folder name when prompted

3. **Test the Generated Server**
   ```bash
   cd <your-folder-name>/src
   python setup_and_run.py
   ```

### For Production Use

1. **Package the Extension**
   ```bash
   npm run package
   ```
   This creates a `.vsix` file in the project directory.

2. **Install in VS Code/Cursor**
   - Open VS Code or Cursor
   - Go to Extensions (`Cmd+Shift+X`)
   - Click the "..." menu and select "Install from VSIX..."
   - Choose the generated `.vsix` file

3. **Use the Extension**
   - Open a workspace folder
   - Open Command Palette (`Cmd+Shift+P`)
   - Type "Create MCP Server" and select the command
   - Enter your desired folder name

4. **Test the Generated Server**
   ```bash
   cd <your-folder-name>/src
   python setup_and_run.py
   ```

## Generated Structure

The extension creates the following folder structure:

```
<your-folder-name>/
├── src/
│   ├── components/
│   │   ├── __init__.py      # Components package initialization
│   │   ├── tools.py         # Tool functions and models
│   │   ├── resources.py     # Resource functions
│   │   └── prompts.py       # Prompt functions
│   ├── demo_server.py       # Main MCP server implementation with FastMCP
│   ├── setup_and_run.py     # Interactive setup and run script
│   ├── test_client.py       # Comprehensive test client
│   ├── mcp.json            # MCP server configuration
│   └── README.md           # Server documentation
├── main.py                 # Alternative entry point
└── requirements.txt        # Python dependencies (FastAPI, uvicorn, pydantic)
```

## Features

- ✅ **Interactive Naming**: Validates folder names and prevents conflicts
- ✅ **Complete Structure**: Creates all necessary files with working code
- ✅ **FastMCP Framework**: Modern, decorator-based MCP server implementation
- ✅ **HTTP Transport**: Uses streamable-http for easy testing and development
- ✅ **Ready to Run**: Generated code includes examples and can be executed immediately
- ✅ **Built-in Testing**: Comprehensive test client for immediate validation
- ✅ **Setup Script**: Interactive setup with dependency management
- ✅ **Cross-Platform**: Works on Windows, macOS, and Linux
- ✅ **VS Code & Cursor**: Compatible with both editors

## Server Capabilities

### Tools Available
- **Mathematical Operations**: Add, multiply, BMI calculation
- **Weather Data**: Simulated weather information for cities
- **Text Formatting**: Uppercase, lowercase, title case, reverse
- **Time Functions**: Current time in specified timezones

### Resources Available
- **Configuration**: Server configuration and status
- **Greetings**: Personalized greeting messages
- **Server Info**: Detailed server capabilities
- **Math Constants**: π, e, golden ratio, √2

### Prompts Available
- **Calculator Assistant**: Help with mathematical operations
- **Weather Assistant**: Weather-related queries
- **Text Formatter**: Text formatting assistance

## Running Options

### Option 1: Interactive Setup (Recommended)
```bash
cd <your-folder-name>/src
python setup_and_run.py
```
This provides a menu with options to:
- Run the server only
- Run the test client only
- Run both (server in background, then test client)
- Exit

### Option 2: Direct Server Run
```bash
cd <your-folder-name>/src
python demo_server.py
```

### Option 3: Main Entry Point
```bash
cd <your-folder-name>
python main.py
```

### Option 4: Test Client Only
```bash
cd <your-folder-name>/src
python test_client.py
```

## Troubleshooting

### Common Issues

1. **"No workspace folder found"**
   - Make sure you have a folder open in VS Code/Cursor
   - The extension needs a workspace to create the MCP server

2. **"Folder already exists"**
   - The extension will ask if you want to overwrite
   - Choose "Yes" to replace the existing folder

3. **Extension not found**
   - Make sure the extension is properly installed
   - Try reloading VS Code/Cursor (`Cmd+Shift+P` → "Developer: Reload Window")

4. **Python dependencies not found**
   - Run the setup script: `python setup_and_run.py`
   - It will automatically install required dependencies

5. **Server won't start**
   - Check if port 8000 is available
   - The server runs on `http://127.0.0.1:8000/mcp`
   - Use `python setup_and_run.py` for automatic dependency installation

### Development Issues

1. **TypeScript errors**
   ```bash
   npm run compile
   ```

2. **Extension not loading**
   - Check the Developer Console for errors
   - Ensure all dependencies are installed: `npm install`

3. **Test client fails**
   - Make sure the server is running first
   - Check that the server is accessible at `http://127.0.0.1:8000/mcp`

## Support

For issues or questions:
1. Check the README.md for detailed documentation
2. Review the generated code structure
3. Test with the provided examples using `python setup_and_run.py`
4. Check the server logs for error messages

---

# 安装指南

## 快速开始

### 开发测试

1. **克隆和设置**
   ```bash
   cd mcp-server-initiator
   npm install
   npm run compile
   ```

2. **在VS Code中测试**
   - 在VS Code中打开 `mcp-server-initiator` 文件夹
   - 按 `F5` 启动扩展开发主机
   - 在新窗口中，打开命令面板 (`Cmd+Shift+P`)
   - 输入 "Create MCP Server" 并选择命令
   - 在提示时输入文件夹名称

3. **测试生成的服务器**
   ```bash
   cd <您的文件夹名称>/src
   python setup_and_run.py
   ```

### 生产使用

1. **打包扩展**
   ```bash
   npm run package
   ```
   这将在项目目录中创建一个 `.vsix` 文件。

2. **在VS Code/Cursor中安装**
   - 打开VS Code或Cursor
   - 转到扩展 (`Cmd+Shift+X`)
   - 点击 "..." 菜单并选择 "Install from VSIX..."
   - 选择生成的 `.vsix` 文件

3. **使用扩展**
   - 打开工作区文件夹
   - 打开命令面板 (`Cmd+Shift+P`)
   - 输入 "Create MCP Server" 并选择命令
   - 输入您想要的文件夹名称

4. **测试生成的服务器**
   ```bash
   cd <您的文件夹名称>/src
   python setup_and_run.py
   ```

## 生成的结构

扩展创建以下文件夹结构：

```
<您的文件夹名称>/
├── src/
│   ├── components/
│   │   ├── __init__.py      # Components package initialization
│   │   ├── tools.py         # Tool functions and models
│   │   ├── resources.py     # Resource functions
│   │   └── prompts.py       # Prompt functions
│   ├── demo_server.py       # 使用FastMCP的主要MCP服务器实现
│   ├── setup_and_run.py     # 交互式设置和运行脚本
│   ├── test_client.py       # 综合测试客户端
│   ├── mcp.json            # MCP服务器配置
│   └── README.md           # 服务器文档
├── main.py                 # 替代入口点
└── requirements.txt        # Python依赖项（FastAPI、uvicorn、pydantic）
```

## 功能特性

- ✅ **交互式命名**: 验证文件夹名称并防止冲突
- ✅ **完整结构**: 创建所有必要的文件和工作代码
- ✅ **FastMCP框架**: 现代、基于装饰器的MCP服务器实现
- ✅ **HTTP传输**: 使用streamable-http进行简单的测试和开发
- ✅ **即用即行**: 生成的代码包含示例并可立即执行
- ✅ **内置测试**: 用于立即验证的综合测试客户端
- ✅ **设置脚本**: 具有依赖项管理的交互式设置
- ✅ **跨平台**: 在Windows、macOS和Linux上工作
- ✅ **VS Code & Cursor**: 与两个编辑器兼容

## 服务器功能

### 可用工具
- **数学运算**: 加法、乘法、BMI计算
- **天气数据**: 城市模拟天气信息
- **文本格式化**: 大写、小写、标题大小写、反转
- **时间函数**: 指定时区的当前时间

### 可用资源
- **配置**: 服务器配置和状态
- **问候**: 个性化问候消息
- **服务器信息**: 详细的服务器功能
- **数学常数**: π、e、黄金比例、√2

### 可用提示
- **计算器助手**: 帮助数学运算
- **天气助手**: 天气相关查询
- **文本格式化器**: 文本格式化帮助

## 运行选项

### 选项1: 交互式设置（推荐）
```bash
cd <您的文件夹名称>/src
python setup_and_run.py
```
这提供了一个菜单，选项包括：
- 仅运行服务器
- 仅运行测试客户端
- 运行两者（后台服务器，然后测试客户端）
- 退出

### 选项2: 直接运行服务器
```bash
cd <您的文件夹名称>/src
python demo_server.py
```

### 选项3: 主入口点
```bash
cd <您的文件夹名称>
python main.py
```

### 选项4: 测试客户端
```bash
cd <您的文件夹名称>/src
python test_client.py
```

## 故障排除

### 常见问题

1. **"未找到工作区文件夹"**
   - 确保您在VS Code/Cursor中打开了文件夹
   - 扩展需要工作区来创建MCP服务器

2. **"文件夹已存在"**
   - 扩展会询问是否要覆盖
   - 选择 "是" 替换现有文件夹

3. **扩展未找到**
   - 确保扩展已正确安装
   - 尝试重新加载VS Code/Cursor (`Cmd+Shift+P` → "Developer: Reload Window")

4. **Python依赖项未找到**
   - 运行设置脚本: `python setup_and_run.py`
   - 它将自动安装所需的依赖项

5. **服务器无法启动**
   - 检查端口8000是否可用
   - 服务器运行在 `http://127.0.0.1:8000/mcp`
   - 使用 `python setup_and_run.py` 进行自动依赖项安装

### 开发问题

1. **TypeScript错误**
   ```bash
   npm run compile
   ```

2. **扩展未加载**
   - 检查开发者控制台中的错误
   - 确保所有依赖项都已安装: `npm install`

3. **测试客户端失败**
   - 确保服务器首先运行
   - 检查服务器是否可在 `http://127.0.0.1:8000/mcp` 访问

## 支持

对于问题或疑问：
1. 查看README.md获取详细文档
2. 查看生成的代码结构
3. 使用 `python setup_and_run.py` 测试提供的示例
4. 检查服务器日志中的错误消息 
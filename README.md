# MCP Server Initiator

A VS Code extension that creates MCP (Model-Controller-Presenter) server folder structures with a clean architecture pattern.

## Features

- Creates a complete MCP server folder structure
- Implements Model-Controller-Presenter pattern
- Generates ready-to-use Python code
- Supports both VS Code and Cursor
- Interactive folder naming with validation
- Automatic folder opening after creation

## Generated Structure

```
<folder-name>/
├── app/
│   ├── __init__.py
│   ├── model.py
│   ├── controller.py
│   └── presenter.py
├── main.py
└── requirements.txt
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
   cd <your-folder-name>
   mcp dev main.py
   ```

## Usage

1. Open VS Code or Cursor
2. Open a workspace folder where you want to create the MCP server
3. Open the Command Palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Windows/Linux)
4. Type "Create MCP Server" and select the command
5. Enter a folder name when prompted
6. The extension will create the complete folder structure and open it

## Generated Code Features

### Model (`app/model.py`)
- `ServerConfig` dataclass for server configuration
- `DataModel` class for data storage and retrieval operations

### Controller (`app/controller.py`)
- `MCPController` class handling business logic
- Request routing and processing
- Error handling and validation

### Presenter (`app/presenter.py`)
- `MCPPresenter` class for response formatting
- JSON response formatting
- Error response handling

### Main (`main.py`)
- Entry point for the MCP server
- Example usage and demonstration
- Health check functionality

## Architecture

The extension follows the Model-Controller-Presenter (MCP) pattern:

- **Model**: Handles data and business logic
- **Controller**: Processes requests and coordinates between Model and Presenter
- **Presenter**: Formats responses and handles presentation logic

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

---

# MCP 服务器初始化器

一个VS Code扩展，用于创建具有清晰架构模式的MCP（模型-控制器-展示器）服务器文件夹结构。

## 功能特性

- 创建完整的MCP服务器文件夹结构
- 实现模型-控制器-展示器模式
- 生成即用型Python代码
- 支持VS Code和Cursor
- 交互式文件夹命名与验证
- 创建后自动打开文件夹

## 生成的结构

```
<文件夹名称>/
├── app/
│   ├── __init__.py
│   ├── model.py
│   ├── controller.py
│   └── presenter.py
├── main.py
└── requirements.txt
```

## 安装

### 开发环境

1. 克隆此仓库
2. 导航到扩展目录：
   ```bash
   cd mcp-server-initiator
   ```
3. 安装依赖项：
   ```bash
   npm install
   ```
4. 编译扩展：
   ```bash
   npm run compile
   ```
5. 在VS Code中打开扩展：
   ```bash
   code .
   ```
6. 按 `F5` 在新的扩展开发主机窗口中运行扩展

### 生产环境

1. 打包扩展：
   ```bash
   npm run package
   ```
2. 在VS Code或Cursor中安装生成的 `.vsix` 文件：
   
   **方法1：使用扩展面板**
   - 打开VS Code/Cursor
   - 转到扩展（macOS上按 `Cmd+Shift+X`，Windows/Linux上按 `Ctrl+Shift+X`）
   - 查找以下选项之一：
     - 点击扩展面板标题中的 "..."（更多操作）菜单
     - 点击扩展面板中的齿轮图标（⚙️）
     - 右键点击扩展面板区域
   - 选择 "Install from VSIX..."
   - 从项目目录中选择生成的 `.vsix` 文件
   - 点击 "Install"
   - 提示时重新加载编辑器
   
   **方法2：拖放**
   - 打开VS Code/Cursor
   - 转到扩展（macOS上按 `Cmd+Shift+X`，Windows/Linux上按 `Ctrl+Shift+X`）
   - 简单地从文件资源管理器拖拽 `.vsix` 文件并放入扩展面板
   - 提示时点击 "Install"
   - 提示时重新加载编辑器
   
   **方法3：命令行（推荐）**
   ```bash
   # 对于VS Code
   code --install-extension mcp-server-initiator-0.0.1.vsix
   
   # 对于Cursor
   cursor --install-extension mcp-server-initiator-0.0.1.vsix
   ```
   
   **方法4：文件菜单**
   - 打开VS Code/Cursor
   - 转到文件 → Install from VSIX...
   - 选择生成的 `.vsix` 文件
   - 点击 "Install"
   - 提示时重新加载编辑器

3. **Test the Generated Server**
   ```bash
   cd <your-folder-name>
   mcp dev main.py
   ```

## 使用方法

1. 打开VS Code或Cursor
2. 打开要创建MCP服务器的工作区文件夹
3. 打开命令面板（macOS上按 `Cmd+Shift+P`，Windows/Linux上按 `Ctrl+Shift+P`）
4. 输入 "Create MCP Server" 并选择命令
5. 在提示时输入文件夹名称
6. 扩展将创建完整的文件夹结构并打开它

## 生成的代码功能

### 模型（`app/model.py`）
- `ServerConfig` 数据类用于服务器配置
- `DataModel` 类用于数据存储和检索操作

### 控制器（`app/controller.py`）
- `MCPController` 类处理业务逻辑
- 请求路由和处理
- 错误处理和验证

### 展示器（`app/presenter.py`）
- `MCPPresenter` 类用于响应格式化
- JSON响应格式化
- 错误响应处理

### 主程序（`main.py`）
- MCP服务器的入口点
- 示例用法和演示
- 健康检查功能

## 架构

扩展遵循模型-控制器-展示器（MCP）模式：

- **模型**：处理数据和业务逻辑
- **控制器**：处理请求并协调模型和展示器之间
- **展示器**：格式化响应并处理展示逻辑

## 要求

- VS Code 1.74.0 或更高版本
- Node.js 16.x 或更高版本
- TypeScript 4.9.4 或更高版本

## 开发

### 构建

```bash
npm run compile
```

### 监听更改

```bash
npm run watch
```

### 测试

1. 在VS Code中按 `F5` 启动扩展开发主机
2. 在新窗口中使用 "Create MCP Server" 命令
3. 测试生成的文件夹结构和代码

## 贡献

1. Fork 仓库
2. 创建功能分支
3. 进行更改
4. 彻底测试
5. 提交拉取请求

## 许可证

MIT许可证 - 详情请参阅LICENSE文件 
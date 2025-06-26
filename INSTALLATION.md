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

## Generated Structure

The extension creates the following folder structure:

```
<your-folder-name>/
├── app/
│   ├── __init__.py          # Package initialization
│   ├── model.py             # Data models and business logic
│   ├── controller.py        # Request handling and routing
│   └── presenter.py         # Response formatting
├── main.py                  # Entry point with examples
└── requirements.txt         # Python dependencies
```

## Features

- ✅ **Interactive Naming**: Validates folder names and prevents conflicts
- ✅ **Complete Structure**: Creates all necessary files with working code
- ✅ **MVC Pattern**: Implements Model-Controller-Presenter architecture
- ✅ **Ready to Run**: Generated code includes examples and can be executed immediately
- ✅ **Cross-Platform**: Works on Windows, macOS, and Linux
- ✅ **VS Code & Cursor**: Compatible with both editors

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

### Development Issues

1. **TypeScript errors**
   ```bash
   npm run compile
   ```

2. **Extension not loading**
   - Check the Developer Console for errors
   - Ensure all dependencies are installed: `npm install`

## Support

For issues or questions:
1. Check the README.md for detailed documentation
2. Review the generated code structure
3. Test with the provided examples in `main.py`

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

## 生成的结构

扩展创建以下文件夹结构：

```
<您的文件夹名称>/
├── app/
│   ├── __init__.py          # 包初始化
│   ├── model.py             # 数据模型和业务逻辑
│   ├── controller.py        # 请求处理和路由
│   └── presenter.py         # 响应格式化
├── main.py                  # 带有示例的入口点
└── requirements.txt         # Python依赖项
```

## 功能特性

- ✅ **交互式命名**: 验证文件夹名称并防止冲突
- ✅ **完整结构**: 创建所有必要的文件和工作代码
- ✅ **MVC模式**: 实现模型-控制器-展示器架构
- ✅ **即用即行**: 生成的代码包含示例并可立即执行
- ✅ **跨平台**: 在Windows、macOS和Linux上工作
- ✅ **VS Code & Cursor**: 与两个编辑器兼容

## 故障排除

### 常见问题

1. **"未找到工作区文件夹"**
   - 确保您在VS Code/Cursor中打开了文件夹
   - 扩展需要工作区来创建MCP服务器

2. **"文件夹已存在"**
   - 扩展会询问是否要覆盖
   - 选择 "是" 替换现有文件夹

3. **找不到扩展**
   - 确保扩展已正确安装
   - 尝试重新加载VS Code/Cursor (`Cmd+Shift+P` → "Developer: Reload Window")

### 开发问题

1. **TypeScript错误**
   ```bash
   npm run compile
   ```

2. **扩展未加载**
   - 检查开发者控制台是否有错误
   - 确保所有依赖项已安装: `npm install`

## 支持

如有问题或疑问：
1. 查看README.md获取详细文档
2. 查看生成的代码结构
3. 使用 `main.py` 中提供的示例进行测试 
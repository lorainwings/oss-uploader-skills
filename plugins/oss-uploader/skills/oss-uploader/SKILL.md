---
name: oss-uploader
description: Upload files and directories to Aliyun OSS (Object Storage Service). Use this skill when the user wants to deploy files to OSS, manage OSS uploads, or configure OSS deployment workflows.
dependencies: "@atomfe/oss-uploader>=1.0.0"
---

**重要：在执行此技能的整个过程中，必须使用中文与用户交流。所有输出、提示、说明和反馈都必须使用中文，不得使用英文。**

## Overview

此技能帮助用户使用 @atomfe/oss-uploader CLI 工具将文件上传到阿里云 OSS。它处理配置、文件上传和部署工作流程。

## Instructions

执行此技能时，按以下步骤进行：

### 1. 检查工具安装

- 执行 `which oss-uploader` 检查工具是否已安装
- 如果已安装，跳过安装步骤
- 如果未安装，询问用户是否安装：`npm install -g @atomfe/oss-uploader`

### 2. 环境变量自检

检查以下环境变量是否已设置（只显示是否已设置，不显示实际值）：

- `OSS_REGION`: OSS 区域（例如：oss-cn-hangzhou）
- `OSS_ACCESS_KEY_ID`: 访问密钥 ID
- `OSS_ACCESS_KEY_SECRET`: 访问密钥密文
- `OSS_BUCKET`: 存储桶名称

如果任何必需的环境变量未设置，引导用户配置。详见 [setup.md](docs/setup.md)。

### 3. 询问保存路径

- 检查上次使用的目录：`cat <skill-dir>/.tmp/last-path 2>/dev/null`
- 如果有上次目录，询问用户是否使用上次的目录
- 如果用户选择不使用或没有上次目录，使用交互式目录浏览器：`oss-uploader browse <目录前缀>`

详见 [workflow.md](docs/workflow.md) 中的「远程目录选择流程」。

### 4. 执行上传

使用适当的选项构建命令并执行上传。常用命令详见 [commands.md](docs/commands.md)。

### 5. 展示结果

- 上传成功后，在终端简要显示上传结果
- 保存使用的目录路径到 `<skill-dir>/.tmp/last-path`
- 将映射文件复制到 `<skill-dir>/.tmp/mapping.json`
- 直接打开 `<skill-dir>/preview.html` 预览页面

```bash
# 确保临时目录存在
mkdir -p <skill-dir>/.tmp

# 复制映射文件（oss-uploader 生成的映射文件）
cp <映射文件路径> <skill-dir>/.tmp/mapping.json

# 保存上次使用的目录路径
echo "<目录路径>" > <skill-dir>/.tmp/last-path

# 打开预览页面
open <skill-dir>/preview.html
```

**注意**：预览页面会自动从 `.tmp/mapping.json` 加载数据，无需动态生成 HTML。

## Examples

### 上传单个文件

```bash
oss-uploader upload <file-path>
```

### 上传目录

```bash
oss-uploader upload <directory> -t <target-path>
```

### 部署前端构建

```bash
oss-uploader upload ./dist -t static/ -m <skill-dir>/.tmp/mapping.json -v
```

### 带过滤的部署

```bash
oss-uploader upload ./dist -t assets/ -i "**/*.js" "**/*.css" -e "**/*.map"
```

## Guidelines

- **安全**：凭证只能设置在本地环境变量中，禁止泄露到代码仓库或聊天工具
- **权限**：用户通常没有存储桶根目录权限，需先确认有权限的目录前缀
- **预览**：不要在对话中输出完整的 HTML 内容，直接使用命令生成文件

## Reference

- [新用户初始化引导](docs/setup.md) - 环境变量配置、凭证获取
- [可用命令详解](docs/commands.md) - upload、list、info、browse 命令
- [工作流程指导](docs/workflow.md) - 上传流程、目录选择、预览页面生成

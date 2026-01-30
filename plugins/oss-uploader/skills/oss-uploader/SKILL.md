---
name: oss-uploader
description: Upload files and directories to Aliyun OSS (Object Storage Service). Use this skill when the user wants to deploy files to OSS, manage OSS uploads, or configure OSS deployment workflows.
---

**重要：在执行此技能的整个过程中，必须使用中文与用户交流。所有输出、提示、说明和反馈都必须使用中文，不得使用英文。**

此技能帮助用户使用 @atomfe/oss-uploader CLI 工具将文件上传到阿里云 OSS。它处理配置、文件上传和部署工作流程。

## 前置检查

在继续之前，请验证：
1. 工具已安装：`npm list -g @atomfe/oss-uploader` 或提供安装选项
2. **环境变量自检**：检查以下环境变量是否已设置
   - `OSS_REGION`: OSS 区域（例如：oss-cn-hangzhou）
   - `OSS_ACCESS_KEY_ID`: 访问密钥 ID
   - `OSS_ACCESS_KEY_SECRET`: 访问密钥密文
   - `OSS_BUCKET`: 存储桶名称
   - 如果环境变量未设置，提示用户配置或使用配置文件
3. OSS 凭证已配置（通过配置文件或环境变量）
4. 目标文件/目录存在

## 配置

该工具支持多种配置方法：

### 配置文件
- 项目根目录中的 `.ossrc.json` 或 `.ossrc.yaml`
- 用于 JavaScript 配置的 `oss.config.js`

### 环境变量
- `OSS_REGION`: OSS 区域（例如：oss-cn-hangzhou）
- `OSS_ACCESS_KEY_ID`: 访问密钥 ID
- `OSS_ACCESS_KEY_SECRET`: 访问密钥密文
- `OSS_BUCKET`: 存储桶名称

### 必需字段
所有配置必须包含：
- `region`: OSS 区域
- `accessKeyId`: 访问密钥 ID
- `accessKeySecret`: 访问密钥密文
- `bucket`: 存储桶名称

## 常见任务

### 初始化配置
帮助用户创建配置文件：
```bash
oss-uploader init
```

### 上传单个文件
```bash
oss-uploader upload <file-path>
```

### 上传目录
```bash
oss-uploader upload <directory> -t <target-path>
```

### 带过滤的上传
```bash
# 包含特定模式
oss-uploader upload ./dist -i "**/*.js" "**/*.css"

# 排除模式
oss-uploader upload ./dist -e "**/*.map" "**/*.txt"
```

### 生成映射文件
创建映射文件以跟踪上传：
```bash
oss-uploader upload ./dist -m ./upload-map.json
```

### 内容哈希
为文件名添加内容哈希（默认启用）：
```bash
oss-uploader upload ./dist -h
```

## 可用命令

### upload
将文件或目录上传到 OSS。

选项：
- `-t, --target <path>`: OSS 存储桶中的目标路径
- `-c, --config <file>`: 配置文件路径
- `-r, --recursive`: 递归上传（默认：true）
- `-i, --include <patterns...>`: 包含文件模式（glob）
- `-e, --exclude <patterns...>`: 排除文件模式（glob）
- `-m, --mapping <file>`: 生成映射文件
- `-h, --content-hash`: 为文件名添加内容哈希（默认：true）
- `-v, --verbose`: 详细输出

### list
列出 OSS 存储桶中的文件：
```bash
oss-uploader list
```

### delete
从 OSS 删除文件：
```bash
oss-uploader delete <file-path>
```

### info
显示存储桶信息：
```bash
oss-uploader info
```

## 工作流程指导

在帮助用户进行 OSS 上传时：

1. **了解需求**：询问以下内容：
   - 要上传哪些文件/目录
   - **OSS 存储桶中的目标保存路径**：
     - 询问用户希望将文件保存到哪个路径
     - 提供默认路径：`/prd/ha/skills-resource/YYYYMMDD`（其中 YYYYMMDD 为当前日期，例如：20260130）
     - 示例：`/prd/ha/skills-resource/20260130/`
     - 用户可以自定义路径或使用默认路径
   - 是否使用内容哈希
   - 文件过滤需求
   - 是否生成映射文件

2. **检查配置**：验证 OSS 凭证是否正确设置

3. **推荐最佳实践**：
   - 使用内容哈希进行缓存清除
   - 为 CI/CD 集成生成映射文件
   - 使用包含/排除模式进行选择性上传
   - 使用详细模式进行调试

4. **处理常见问题**：
   - 缺少凭证：指导设置配置文件或环境变量
   - 权限错误：检查 OSS 存储桶权限
   - 文件未找到：验证源路径是否存在

## 安全注意事项

- 永远不要在代码或日志中暴露访问密钥
- 建议在 CI/CD 中使用环境变量
- 建议在生产部署中使用 RAM 角色
- 提醒用户将配置文件添加到 .gitignore

## 示例工作流程

### 部署前端构建
```bash
# 将 dist 文件夹上传到 static 目录并生成映射
oss-uploader upload ./dist -t static/ -m ./upload-map.json -v
```

### 带过滤的部署
```bash
# 仅上传 JS 和 CSS 文件
oss-uploader upload ./dist -t assets/ -i "**/*.js" "**/*.css" -e "**/*.map"
```

### CI/CD 集成
```bash
# 使用环境变量作为凭证
export OSS_REGION=oss-cn-hangzhou
export OSS_ACCESS_KEY_ID=your-key-id
export OSS_ACCESS_KEY_SECRET=your-key-secret
export OSS_BUCKET=your-bucket

oss-uploader upload ./build -t production/ -m ./mapping.json
```

## 实现方法

执行此技能时：
1. **环境变量自检**：
   - 使用 `echo $OSS_REGION $OSS_ACCESS_KEY_ID $OSS_ACCESS_KEY_SECRET $OSS_BUCKET` 检查环境变量
   - 如果任何必需的环境变量未设置，提示用户：
     - 设置环境变量，或
     - 使用配置文件（.ossrc.json、.ossrc.yaml 或 oss.config.js）
   - 显示当前环境变量状态（隐藏敏感信息，只显示是否已设置）
2. 检查工具是否已安装，如果未安装则提供安装选项
3. 验证配置是否存在或帮助创建配置
4. **询问保存路径**：
   - 询问用户希望将文件保存到 OSS 的哪个路径
   - 提供默认路径：`/prd/ha/skills-resource/YYYYMMDD`（例如：`/prd/ha/skills-resource/20260130`）
   - 用户可以选择使用默认路径或自定义路径
5. 了解用户的其他上传需求（文件过滤、内容哈希等）
6. 使用适当的选项构建命令
7. 执行上传并验证成功
8. **重要**：上传成功后，始终读取 `.oss-uploader-mapping.json` 文件并：
   - 在终端中使用绿色 ANSI 颜色代码显示 URL
   - 使用上传的文件生成 HTML 预览页面
   - 自动在默认浏览器中打开预览
9. 提供映射文件位置（如果已生成）
10. 提供后续步骤建议（例如：CDN 配置、URL 使用）

### 终端输出格式

以这种紧凑格式显示 URL：

```
✓ 上传成功！

example.png: \033[32mhttps://bucket.oss-region.aliyuncs.com/path/example.hash.png\033[0m
example2.png: \033[32mhttps://bucket.oss-region.aliyuncs.com/path/example2.hash.png\033[0m

🌐 正在生成预览页面...
```

### HTML 预览生成

显示终端输出后，生成 HTML 预览页面：

1. 从技能目录中的 `preview-template.html` 读取 HTML 模板
2. 读取 `.oss-uploader-mapping.json` 文件以获取文件映射
3. 将映射数据转换为 JavaScript 数组格式：
   ```javascript
   [
     {"filename": "example.png", "url": "https://..."},
     {"filename": "example2.png", "url": "https://..."}
   ]
   ```
4. 用实际数据替换模板中的 `{{FILES_DATA}}`
5. 将生成的 HTML 写入临时文件（例如：项目根目录中的 `.oss-preview.html`）
6. 使用适当的命令在默认浏览器中打开 HTML 文件：
   - macOS: `open .oss-preview.html`
   - Linux: `xdg-open .oss-preview.html`
   - Windows: `start .oss-preview.html`
7. 告知用户预览已打开

### 预览页面特性

生成的 HTML 预览页面包括：
- 精美的渐变背景和现代化设计
- 显示总文件数和图片数量的统计信息
- 每个文件的响应式卡片网格布局
- 图片缩略图，点击可放大查看
- 一键复制 URL 功能，带视觉反馈
- 直接在新标签页中打开文件的链接
- 移动端响应式设计
- 复制操作的提示通知


# 可用命令详解

## upload

将文件或目录上传到 OSS。

**选项：**

- `-t, --target <path>`: OSS 存储桶中的目标路径
- `-c, --config <file>`: 配置文件路径
- `-r, --recursive`: 递归上传（默认：true）
- `-i, --include <patterns...>`: 包含文件模式（glob）
- `-e, --exclude <patterns...>`: 排除文件模式（glob）
- `-m, --mapping <file>`: 生成映射文件
- `-h, --content-hash`: 为文件名添加内容哈希（默认：true）
- `-v, --verbose`: 详细输出

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

## list

列出 OSS 存储桶中的文件：

```bash
oss-uploader list
```

## info

显示存储桶信息：

```bash
oss-uploader info
```

## browse

使用交互式界面浏览和选择目标目录，支持键盘上下键选择。

**权限说明**：用户通常没有存储桶根目录的访问权限，只有特定子目录的权限。用户需要先向运维确认自己有权限的目录前缀（例如：`prd/`、`dev/`、`prd/ha/` 等）。

```bash
oss-uploader browse <有权限的目录前缀>
```

例如，如果用户有 `prd/` 目录的权限：

```bash
oss-uploader browse prd/
```

此命令会启动交互式界面，用户可以：

- 使用 **上下键** 选择目录
- 按 **Enter** 进入子目录或确认选择
- 按 **Esc** 返回上级目录

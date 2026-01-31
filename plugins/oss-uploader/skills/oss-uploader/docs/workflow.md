# 工作流程指导

**注意**：本文档中所有 `<skill-dir>` 占位符必须替换为 SKILL.md 文件所在目录的绝对路径。

## 上传流程概述

在帮助用户进行 OSS 上传时：

1. **了解需求**：询问以下内容：
   - 要上传哪些文件/目录
   - OSS 存储桶中的目标保存路径
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
   - 缺少凭证：引导用户通过飞书申请权限并配置本地环境变量
   - 权限错误：检查 OSS 存储桶权限
   - 文件未找到：验证源路径是否存在

## 远程目录选择流程

### 上次使用的目录

检查是否存在上次使用的目录记录。上次使用的目录保存在全局临时目录 `/tmp/oss-uploader/last-path` 文件中。

```bash
# 检查上次使用的目录
cat /tmp/oss-uploader/last-path 2>/dev/null || echo ""
```

### 路径选择流程

1. 先检查是否有上次使用的目录
2. 如果有，询问用户是否使用上次的目录
3. 如果用户选择不使用或没有上次目录，询问用户有权限的目录前缀
4. 使用 `oss-uploader browse <目录前缀>` 启动交互式选择

**注意**：如果用户不知道自己有权限的目录，提示用户联系运维获取目录权限信息。

### 保存上次使用的目录

上传成功后，将使用的目录路径保存到 `/tmp/oss-uploader/last-path` 文件中：

```bash
mkdir -p /tmp/oss-uploader
echo "prd/ha/skills-resource/20260131/" > /tmp/oss-uploader/last-path
```

这样下次上传时可以快速选择上次使用的目录。

## 示例工作流程

### 部署前端构建

```bash
# 将 dist 文件夹上传到 static 目录并生成映射
mkdir -p /tmp/oss-uploader
oss-uploader upload ./dist -t static/ -m /tmp/oss-uploader/mapping.json -v
```

### 带过滤的部署

```bash
# 仅上传 JS 和 CSS 文件
oss-uploader upload ./dist -t assets/ -i "**/*.js" "**/*.css" -e "**/*.map"
```

## 展示预览页面

上传成功后，按以下步骤展示预览：

1. 读取映射数据
2. 复制 preview.html 到临时目录并注入数据
3. 打开注入数据后的预览页面

```bash
# 读取映射数据
MAPPING_JSON=$(cat /tmp/oss-uploader/mapping.json)

# 复制 preview.html 到临时目录并注入数据
cp <skill-dir>/preview.html /tmp/oss-uploader/preview.html
sed -i '' "s|const MAPPING_DATA = null;|const MAPPING_DATA = ${MAPPING_JSON};|" /tmp/oss-uploader/preview.html

# 打开注入数据后的预览页面
open /tmp/oss-uploader/preview.html
```

**为什么要注入数据？**

浏览器通过 `file://` 协议打开本地 HTML 文件时，由于 CORS 安全限制，无法使用 `fetch` 读取本地文件。将映射数据直接内嵌到 HTML 中可以绕过这个限制。

## 安全注意事项

- 凭证只能设置在本地环境变量中，禁止泄露
- 永远不要在代码、日志或配置文件中暴露访问密钥
- 禁止将凭证提交到代码仓库
- 禁止在聊天工具、文档中明文分享凭证

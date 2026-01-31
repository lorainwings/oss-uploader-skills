# 新用户初始化引导

## 配置状态检测

执行以下命令检测配置状态：

```bash
# 检测环境变量（不显示实际值，只显示是否已设置）
echo "OSS_REGION: $([ -n \"$OSS_REGION\" ] && echo '已设置' || echo '未设置')"
echo "OSS_ACCESS_KEY_ID: $([ -n \"$OSS_ACCESS_KEY_ID\" ] && echo '已设置' || echo '未设置')"
echo "OSS_ACCESS_KEY_SECRET: $([ -n \"$OSS_ACCESS_KEY_SECRET\" ] && echo '已设置' || echo '未设置')"
echo "OSS_BUCKET: $([ -n \"$OSS_BUCKET\" ] && echo '已设置' || echo '未设置')"
```

## 状态表格展示

向用户展示配置状态时，使用以下表格格式：

```
┌─────────────────────────┬──────────┐
│ 配置项                   │ 状态     │
├─────────────────────────┼──────────┤
│ OSS_REGION              │ 已设置   │
│ OSS_ACCESS_KEY_ID       │ 已设置   │
│ OSS_ACCESS_KEY_SECRET   │ 已设置   │
│ OSS_BUCKET              │ 未设置   │
└─────────────────────────┴──────────┘
```

## 环境变量配置

如果检测到环境变量未完全配置，引导用户在本地 shell 配置文件中添加环境变量：

```bash
# 在 shell 配置文件中添加（~/.bashrc 或 ~/.zshrc）
export OSS_REGION="oss-cn-hangzhou"
export OSS_ACCESS_KEY_ID="your-access-key-id"
export OSS_ACCESS_KEY_SECRET="your-access-key-secret"
export OSS_BUCKET="your-bucket-name"
```

配置完成后，执行 `source ~/.zshrc` 或 `source ~/.bashrc` 使配置生效。

## 凭证获取指引

**公司内网员工**：请通过飞书提交权限申请，获取 AccessKey ID 和 AccessKey Secret。

**安全警告**：

- AccessKey 凭证只能设置在本地环境变量中
- 禁止将凭证提交到代码仓库、配置文件或任何可能泄露的地方
- 禁止在聊天工具、文档中明文分享凭证

## 配置验证

配置完成后，执行以下命令验证配置是否正确：

```bash
oss-uploader info
```

如果配置正确，将显示存储桶信息。如果出现错误，请检查：

- AccessKey ID 和 Secret 是否正确
- Bucket 名称是否正确
- Region 是否与 Bucket 所在区域匹配

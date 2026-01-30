---
name: oss-uploader
description: Upload files and directories to Aliyun OSS (Object Storage Service). Use this skill when the user wants to deploy files to OSS, manage OSS uploads, or configure OSS deployment workflows.
---

This skill helps users upload files to Aliyun OSS using the @atomfe/oss-uploader CLI tool. It handles configuration, file uploads, and deployment workflows.

## Prerequisites Check

Before proceeding, verify:
1. The tool is installed: `npm list -g @atomfe/oss-uploader` or offer to install it
2. OSS credentials are configured (via config file or environment variables)
3. The target files/directories exist

## Configuration

The tool supports multiple configuration methods:

### Config Files
- `.ossrc.json` or `.ossrc.yaml` in project root
- `oss.config.js` for JavaScript configuration

### Environment Variables
- `OSS_REGION`: OSS region (e.g., oss-cn-hangzhou)
- `OSS_ACCESS_KEY_ID`: Access key ID
- `OSS_ACCESS_KEY_SECRET`: Access key secret
- `OSS_BUCKET`: Bucket name

### Required Fields
All configurations must include:
- `region`: OSS region
- `accessKeyId`: Access key ID
- `accessKeySecret`: Access key secret
- `bucket`: Bucket name

## Common Tasks

### Initialize Configuration
Help users create a configuration file:
```bash
oss-uploader init
```

### Upload Single File
```bash
oss-uploader upload <file-path>
```

### Upload Directory
```bash
oss-uploader upload <directory> -t <target-path>
```

### Upload with Filtering
```bash
# Include specific patterns
oss-uploader upload ./dist -i "**/*.js" "**/*.css"

# Exclude patterns
oss-uploader upload ./dist -e "**/*.map" "**/*.txt"
```

### Generate Mapping File
Create a mapping file for tracking uploads:
```bash
oss-uploader upload ./dist -m ./upload-map.json
```

### Content Hash
Add content hash to filenames (enabled by default):
```bash
oss-uploader upload ./dist -h
```

## Available Commands

### upload
Upload files or directories to OSS.

Options:
- `-t, --target <path>`: Target path in OSS bucket
- `-c, --config <file>`: Configuration file path
- `-r, --recursive`: Recursive upload (default: true)
- `-i, --include <patterns...>`: Include file patterns (glob)
- `-e, --exclude <patterns...>`: Exclude file patterns (glob)
- `-m, --mapping <file>`: Generate mapping file
- `-h, --content-hash`: Add content hash to filenames (default: true)
- `-v, --verbose`: Verbose output

### list
List files in OSS bucket:
```bash
oss-uploader list
```

### delete
Delete files from OSS:
```bash
oss-uploader delete <file-path>
```

### info
Show bucket information:
```bash
oss-uploader info
```

## Workflow Guidance

When helping users with OSS uploads:

1. **Understand Requirements**: Ask about:
   - What files/directories to upload
   - Target path in OSS bucket
   - Whether to use content hashing
   - File filtering needs
   - Whether to generate mapping file

2. **Check Configuration**: Verify OSS credentials are set up properly

3. **Recommend Best Practices**:
   - Use content hashing for cache busting
   - Generate mapping files for CI/CD integration
   - Use include/exclude patterns for selective uploads
   - Use verbose mode for debugging

4. **Handle Common Issues**:
   - Missing credentials: Guide to set up config file or env vars
   - Permission errors: Check OSS bucket permissions
   - File not found: Verify source paths exist

## Security Considerations

- Never expose access keys in code or logs
- Recommend using environment variables in CI/CD
- Suggest using RAM roles for production deployments
- Remind users to add config files to .gitignore

## Example Workflows

### Deploy Frontend Build
```bash
# Upload dist folder to static directory with mapping
oss-uploader upload ./dist -t static/ -m ./upload-map.json -v
```

### Deploy with Filtering
```bash
# Upload only JS and CSS files
oss-uploader upload ./dist -t assets/ -i "**/*.js" "**/*.css" -e "**/*.map"
```

### CI/CD Integration
```bash
# Use environment variables for credentials
export OSS_REGION=oss-cn-hangzhou
export OSS_ACCESS_KEY_ID=your-key-id
export OSS_ACCESS_KEY_SECRET=your-key-secret
export OSS_BUCKET=your-bucket

oss-uploader upload ./build -t production/ -m ./mapping.json
```

## Implementation Approach

When executing this skill:
1. Check if the tool is installed, offer to install if not
2. Verify configuration exists or help create it
3. Understand the user's upload requirements
4. Construct the appropriate command with options
5. Execute the upload and verify success
6. **IMPORTANT**: After successful upload, ALWAYS read the `.oss-uploader-mapping.json` file and display a formatted mapping table showing:
   - Original filename in the first column
   - OSS access URL in the second column as a clickable markdown link with custom text color
   - Use markdown table format for clear presentation
7. Display URLs as markdown links with green color using HTML: `<span style="color: #00cc00">[URL]</span>`
8. Provide the mapping file location if generated
9. Offer next steps (e.g., CDN configuration, URL usage)

### Output Format Example

After upload completion, display:

```markdown
## 文件上传映射表

| 原始文件名 | OSS访问地址 |
|-----------|------------|
| example.png | <span style="color: #00cc00">https://bucket.oss-region.aliyuncs.com/path/example.hash.png</span> |
| example2.png | <span style="color: #00cc00">https://bucket.oss-region.aliyuncs.com/path/example2.hash.png</span> |
```

Use bright green color (#00cc00) for better visibility against dark backgrounds.

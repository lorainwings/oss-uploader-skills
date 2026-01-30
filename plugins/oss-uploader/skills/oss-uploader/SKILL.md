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
6. **IMPORTANT**: After successful upload, ALWAYS read the `.oss-uploader-mapping.json` file and:
   - Display URLs in terminal using green ANSI color codes
   - Generate an HTML preview page with the uploaded files
   - Automatically open the preview in the default browser
7. Provide the mapping file location if generated
8. Offer next steps (e.g., CDN configuration, URL usage)

### Terminal Output Format

Display URLs in this compact format:

```
✓ 上传成功！

example.png: \033[32mhttps://bucket.oss-region.aliyuncs.com/path/example.hash.png\033[0m
example2.png: \033[32mhttps://bucket.oss-region.aliyuncs.com/path/example2.hash.png\033[0m

🌐 正在生成预览页面...
```

### HTML Preview Generation

After displaying terminal output, generate an HTML preview page:

1. Read the HTML template from `preview-template.html` in the skill directory
2. Read the `.oss-uploader-mapping.json` file to get the file mappings
3. Transform the mapping data into JavaScript array format:
   ```javascript
   [
     {"filename": "example.png", "url": "https://..."},
     {"filename": "example2.png", "url": "https://..."}
   ]
   ```
4. Replace `{{FILES_DATA}}` in the template with the actual data
5. Write the generated HTML to a temporary file (e.g., `.oss-preview.html` in the project root)
6. Open the HTML file in the default browser using the appropriate command:
   - macOS: `open .oss-preview.html`
   - Linux: `xdg-open .oss-preview.html`
   - Windows: `start .oss-preview.html`
7. Inform the user that the preview has been opened

### Preview Page Features

The generated HTML preview page includes:
- Beautiful gradient background with modern design
- Statistics showing total files and image count
- Grid layout with responsive cards for each file
- Image thumbnails with click-to-enlarge modal
- One-click copy URL functionality with visual feedback
- Direct link to open files in new tab
- Mobile-responsive design
- Toast notifications for copy actions

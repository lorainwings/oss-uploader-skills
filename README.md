# OSS Uploader Plugin for Claude Code

A Claude Code plugin that provides skills for uploading files to Aliyun OSS (Object Storage Service).

## Features

- Upload single files or entire directories to Aliyun OSS
- Support for file filtering with glob patterns
- Content hashing for cache busting
- Generate mapping files for CI/CD integration
- Multiple configuration methods (config files, environment variables)

## Installation

### Method 1: Install from GitHub (Recommended)

```bash
# Add the marketplace
/plugin marketplace add lorainwings/aliyun-oss-uploader

# Install the plugin
/plugin install oss-uploader
```

### Method 2: Install from Local Path

```bash
# Clone the repository
git clone https://github.com/lorainwings/aliyun-oss-uploader.git

# Add the marketplace
/plugin marketplace add /path/to/aliyun-oss-uploader

# Install the plugin
/plugin install oss-uploader
```

## Usage

### Using the Skill

You can use the skill in two ways:

1. **Direct command:**
   ```
   /oss-uploader
   ```

2. **Natural language (Recommended):**
   Just describe what you want to do:
   - "Upload my dist folder to OSS"
   - "Configure Aliyun OSS upload"
   - "Deploy files to OSS static directory"

### Prerequisites

The skill requires the `@atomfe/oss-uploader` CLI tool:

```bash
npm install -g @atomfe/oss-uploader
```

### Configuration

Configure OSS credentials using one of these methods:

**Config File (.ossrc.json):**
```json
{
  "region": "oss-cn-hangzhou",
  "accessKeyId": "your-access-key-id",
  "accessKeySecret": "your-access-key-secret",
  "bucket": "your-bucket-name"
}
```

**Environment Variables:**
```bash
export OSS_REGION=oss-cn-hangzhou
export OSS_ACCESS_KEY_ID=your-access-key-id
export OSS_ACCESS_KEY_SECRET=your-access-key-secret
export OSS_BUCKET=your-bucket-name
```

## Examples

### Upload a Directory
```
Upload my dist folder to the static directory in OSS
```

### Upload with Filtering
```
Upload dist folder, only include JS and CSS files
```

### Generate Mapping File
```
Upload dist to OSS and generate a mapping file
```

## What the Skill Does

The skill helps you:
- Check if the OSS uploader tool is installed
- Verify or create OSS configuration
- Construct appropriate upload commands
- Execute uploads with proper options
- Generate mapping files for deployment tracking
- Handle common issues and errors

## Related Links

- [OSS Uploader CLI Tool](https://github.com/lorainwings/aliyun-oss-uploader)
- [Aliyun OSS Documentation](https://www.alibabacloud.com/help/en/oss/)

## License

MIT

## Author

lorain

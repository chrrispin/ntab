# ntab - New Time Africa Backup System

A simple yet powerful backup utility for files and directories.

## Features

- ✨ Easy-to-use command-line interface
- 📦 Multiple compression formats (tar.gz, zip, or uncompressed)
- 🕐 Automatic timestamp generation for backup files
- 📋 List and manage existing backups
- 🔄 Restore backups to any location
- ⚙️ Configurable backup settings via JSON

## Installation

1. Clone the repository:
```bash
git clone https://github.com/chrrispin/ntab.git
cd ntab
```

2. Make the backup script executable (optional):
```bash
chmod +x backup.py
```

3. Initialize configuration (optional):
```bash
python backup.py init
```

## Requirements

- Python 3.6 or higher
- No external dependencies required (uses only Python standard library)

## Usage

### Create a Backup

Backup specific files or directories:
```bash
python backup.py create file1.txt folder1/ folder2/
```

Create a backup with a custom name:
```bash
python backup.py create -n myproject file1.txt folder1/
```

### List Backups

View all existing backups with size and modification time:
```bash
python backup.py list
```

### Restore a Backup

Restore a backup to the current directory:
```bash
python backup.py restore backups/ntab_backup_20231201_120000.tar.gz
```

Restore to a specific location:
```bash
python backup.py restore backups/ntab_backup_20231201_120000.tar.gz -d /path/to/restore
```

### Configuration

The backup system can be configured using `config.json`:

```json
{
    "backup_dir": "backups",
    "compression": "tar.gz",
    "include_timestamp": true,
    "sources": []
}
```

**Configuration Options:**
- `backup_dir`: Directory where backups are stored (default: "backups")
- `compression`: Compression format - "tar.gz", "zip", or "none" (default: "tar.gz")
- `include_timestamp`: Add timestamp to backup filenames (default: true)
- `sources`: Default source paths for backups (default: empty list)

## Examples

**Example 1: Backup important documents**
```bash
python backup.py create ~/Documents/important/ ~/Pictures/family/
```

**Example 2: Create a named backup before deployment**
```bash
python backup.py create -n pre-deployment src/ config/ data/
```

**Example 3: List all backups**
```bash
python backup.py list
```
Output:
```
Existing backups:
------------------------------------------------------------
ntab_backup_20231201_120000.tar.gz           125.3MB 2023-12-01 12:00:00
myproject_20231201_150000.tar.gz              45.7MB 2023-12-01 15:00:00
------------------------------------------------------------
```

**Example 4: Restore a specific backup**
```bash
python backup.py restore backups/ntab_backup_20231201_120000.tar.gz -d ~/restored_files
```

## Use Cases

- 📝 Backup important project files before major changes
- 🗂️ Create regular snapshots of critical directories
- 💾 Archive old data for long-term storage
- 🔄 Migrate files between systems
- 🛡️ Protect against accidental data loss

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue on the GitHub repository.

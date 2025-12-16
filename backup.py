#!/usr/bin/env python3
"""
New Time Africa Backup System
A simple yet effective backup utility for files and directories.
"""

import os
import sys
import json
import shutil
import argparse
from datetime import datetime
from pathlib import Path
import tarfile
import zipfile


class BackupSystem:
    """Main backup system class for New Time Africa."""
    
    def __init__(self, config_file='config.json'):
        """Initialize the backup system with configuration."""
        self.config_file = config_file
        self.config = self.load_config()
        
    def load_config(self):
        """Load configuration from JSON file."""
        if os.path.exists(self.config_file):
            with open(self.config_file, 'r') as f:
                return json.load(f)
        else:
            # Default configuration
            return {
                'backup_dir': 'backups',
                'compression': 'tar.gz',
                'include_timestamp': True,
                'sources': []
            }
    
    def save_config(self):
        """Save current configuration to JSON file."""
        with open(self.config_file, 'w') as f:
            json.dump(self.config, f, indent=4)
    
    def create_backup(self, source_paths, backup_name=None):
        """
        Create a backup of specified source paths.
        
        Args:
            source_paths: List of paths to backup
            backup_name: Optional custom name for the backup
        
        Returns:
            Path to the created backup file
        """
        # Ensure backup directory exists
        backup_dir = Path(self.config['backup_dir'])
        backup_dir.mkdir(exist_ok=True)
        
        # Generate backup name
        if backup_name is None:
            backup_name = 'ntab_backup'
        
        if self.config['include_timestamp']:
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            backup_name = f"{backup_name}_{timestamp}"
        
        # Create backup based on compression type
        compression = self.config['compression']
        
        if compression == 'tar.gz':
            backup_file = backup_dir / f"{backup_name}.tar.gz"
            self._create_tar_backup(source_paths, backup_file)
        elif compression == 'zip':
            backup_file = backup_dir / f"{backup_name}.zip"
            self._create_zip_backup(source_paths, backup_file)
        else:
            # Simple directory copy
            backup_file = backup_dir / backup_name
            self._create_dir_backup(source_paths, backup_file)
        
        print(f"✓ Backup created successfully: {backup_file}")
        return backup_file
    
    def _create_tar_backup(self, source_paths, backup_file):
        """Create a tar.gz backup."""
        with tarfile.open(backup_file, 'w:gz') as tar:
            for source in source_paths:
                if os.path.exists(source):
                    tar.add(source, arcname=os.path.basename(source))
                    print(f"  Added: {source}")
                else:
                    print(f"  Warning: {source} not found, skipping...")
    
    def _create_zip_backup(self, source_paths, backup_file):
        """Create a zip backup."""
        with zipfile.ZipFile(backup_file, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for source in source_paths:
                if os.path.exists(source):
                    if os.path.isfile(source):
                        zipf.write(source, os.path.basename(source))
                        print(f"  Added: {source}")
                    else:
                        for root, dirs, files in os.walk(source):
                            for file in files:
                                file_path = os.path.join(root, file)
                                arcname = os.path.relpath(file_path, os.path.dirname(source))
                                zipf.write(file_path, arcname)
                        print(f"  Added: {source}")
                else:
                    print(f"  Warning: {source} not found, skipping...")
    
    def _create_dir_backup(self, source_paths, backup_dir):
        """Create a simple directory backup."""
        backup_dir.mkdir(exist_ok=True)
        for source in source_paths:
            if os.path.exists(source):
                dest = backup_dir / os.path.basename(source)
                if os.path.isfile(source):
                    shutil.copy2(source, dest)
                else:
                    shutil.copytree(source, dest, dirs_exist_ok=True)
                print(f"  Added: {source}")
            else:
                print(f"  Warning: {source} not found, skipping...")
    
    def list_backups(self):
        """List all existing backups."""
        backup_dir = Path(self.config['backup_dir'])
        if not backup_dir.exists():
            print("No backups found.")
            return []
        
        backups = []
        print("\nExisting backups:")
        print("-" * 60)
        
        for item in sorted(backup_dir.iterdir()):
            size = self._get_size(item)
            mtime = datetime.fromtimestamp(item.stat().st_mtime)
            backups.append({
                'name': item.name,
                'path': str(item),
                'size': size,
                'modified': mtime
            })
            print(f"{item.name:40} {self._format_size(size):>10} {mtime.strftime('%Y-%m-%d %H:%M:%S')}")
        
        print("-" * 60)
        return backups
    
    def _get_size(self, path):
        """Get size of file or directory."""
        path = Path(path)
        if path.is_file():
            return path.stat().st_size
        else:
            return sum(f.stat().st_size for f in path.rglob('*') if f.is_file())
    
    def _format_size(self, size):
        """Format size in human-readable format."""
        for unit in ['B', 'KB', 'MB', 'GB']:
            if size < 1024.0:
                return f"{size:.1f}{unit}"
            size /= 1024.0
        return f"{size:.1f}TB"
    
    def restore_backup(self, backup_file, restore_path='.'):
        """
        Restore a backup to specified location.
        
        Args:
            backup_file: Path to backup file
            restore_path: Path where backup should be restored
        """
        backup_file = Path(backup_file)
        if not backup_file.exists():
            print(f"Error: Backup file {backup_file} not found.")
            return False
        
        restore_path = Path(restore_path)
        restore_path.mkdir(exist_ok=True)
        
        print(f"Restoring backup from: {backup_file}")
        print(f"Restore location: {restore_path}")
        
        # Better file type detection using suffixes
        if backup_file.suffixes[-2:] == ['.tar', '.gz'] or backup_file.suffix == '.tgz':
            with tarfile.open(backup_file, 'r:gz') as tar:
                tar.extractall(restore_path)
        elif backup_file.suffix == '.zip':
            with zipfile.ZipFile(backup_file, 'r') as zipf:
                zipf.extractall(restore_path)
        else:
            # For directory backups, copy contents directly to restore_path
            if backup_file.is_dir():
                for item in backup_file.iterdir():
                    dest = restore_path / item.name
                    if item.is_file():
                        shutil.copy2(item, dest)
                    else:
                        shutil.copytree(item, dest, dirs_exist_ok=True)
            else:
                # Single file backup
                shutil.copy2(backup_file, restore_path)
        
        print(f"✓ Backup restored successfully to: {restore_path}")
        return True


def main():
    """Main entry point for the backup system."""
    parser = argparse.ArgumentParser(
        description='New Time Africa Backup System',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Create a backup of specific files/directories
  python backup.py create file1.txt folder1/ folder2/
  
  # Create a backup with custom name
  python backup.py create -n mybackup file1.txt
  
  # List all backups
  python backup.py list
  
  # Restore a backup
  python backup.py restore backups/ntab_backup_20231201_120000.tar.gz
        """
    )
    
    subparsers = parser.add_subparsers(dest='command', help='Command to execute')
    
    # Create backup command
    create_parser = subparsers.add_parser('create', help='Create a new backup')
    create_parser.add_argument('sources', nargs='+', help='Files/directories to backup')
    create_parser.add_argument('-n', '--name', help='Custom backup name')
    create_parser.add_argument('-c', '--config', default='config.json', help='Config file path')
    
    # List backups command
    list_parser = subparsers.add_parser('list', help='List all backups')
    list_parser.add_argument('-c', '--config', default='config.json', help='Config file path')
    
    # Restore backup command
    restore_parser = subparsers.add_parser('restore', help='Restore a backup')
    restore_parser.add_argument('backup_file', help='Backup file to restore')
    restore_parser.add_argument('-d', '--destination', default='restored', help='Restore destination')
    restore_parser.add_argument('-c', '--config', default='config.json', help='Config file path')
    
    # Init command
    init_parser = subparsers.add_parser('init', help='Initialize backup configuration')
    init_parser.add_argument('-c', '--config', default='config.json', help='Config file path')
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return
    
    # Initialize backup system
    backup_system = BackupSystem(config_file=getattr(args, 'config', 'config.json'))
    
    if args.command == 'create':
        backup_system.create_backup(args.sources, args.name)
    elif args.command == 'list':
        backup_system.list_backups()
    elif args.command == 'restore':
        backup_system.restore_backup(args.backup_file, args.destination)
    elif args.command == 'init':
        backup_system.save_config()
        print(f"✓ Configuration initialized: {backup_system.config_file}")
        print(json.dumps(backup_system.config, indent=4))


if __name__ == '__main__':
    main()

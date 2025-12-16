#!/bin/bash
set -e  # Exit on any command failure

# Example usage of New Time Africa Backup System

echo "=== New Time Africa Backup System - Example Usage ==="
echo ""

# Example 1: Create test data
echo "1. Creating test data..."
mkdir -p example_data
echo "Important document content" > example_data/document.txt
echo "Configuration data" > example_data/config.ini
echo "Script file" > example_data/script.sh
echo "   ✓ Test data created in example_data/"
echo ""

# Example 2: Create a backup
echo "2. Creating backup..."
python backup.py create example_data/
echo ""

# Example 3: List backups
echo "3. Listing all backups..."
python backup.py list
echo ""

# Example 4: Create a custom named backup
echo "4. Creating custom named backup..."
python backup.py create -n my_project example_data/
echo ""

# Example 5: List backups again
echo "5. Listing backups again..."
python backup.py list
echo ""

echo "=== Example Complete ==="
echo ""
echo "To restore a backup, use:"
echo "  python backup.py restore backups/[backup_name].tar.gz -d restored/"
echo ""
echo "To clean up test data:"
echo "  rm -rf example_data backups/"

#!/bin/bash

# Function to rename images in a directory
rename_images() {
    local dir=$1
    local prefix=$2
    local counter=1
    
    echo "Renaming images in $dir..."
    
    # Create a temporary directory to avoid conflicts
    mkdir -p "$dir/temp"
    
    # First, move all WhatsApp images to temp with new names
    for file in "$dir"/"WhatsApp Image"*.jpeg; do
        if [ -f "$file" ]; then
            new_name="${prefix}_${counter}.jpeg"
            echo "Renaming: $(basename "$file") -> $new_name"
            mv "$file" "$dir/temp/$new_name"
            ((counter++))
        fi
    done
    
    # Move files back from temp
    mv "$dir/temp"/* "$dir/"
    rmdir "$dir/temp"
}

# Rename images in each directory
rename_images "public/corporate" "corporate"
rename_images "public/denim" "denim"
rename_images "public/jersey" "jersey"
rename_images "public/costume" "costume"
rename_images "public/owambe" "owambe"
rename_images "public/others" "others"

echo "Image renaming completed!"

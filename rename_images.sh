#!/bin/bash

# Function to rename images in a directory
rename_images() {
    local dir=$1
    local prefix=$2
    local counter=1
    
    echo "Renaming images in $dir..."
    
    # Find all WhatsApp images and rename them
    for file in "$dir"/"WhatsApp Image"*.jpeg; do
        if [ -f "$file" ]; then
            new_name="${prefix}_${counter}.jpeg"
            echo "Renaming: $(basename "$file") -> $new_name"
            mv "$file" "$dir/$new_name"
            ((counter++))
        fi
    done
    
    # Also handle files with (1), (2) etc.
    for file in "$dir"/"WhatsApp Image"*"("*")"*.jpeg; do
        if [ -f "$file" ]; then
            new_name="${prefix}_${counter}.jpeg"
            echo "Renaming: $(basename "$file") -> $new_name"
            mv "$file" "$dir/$new_name"
            ((counter++))
        fi
    done
}

# Rename images in each directory
rename_images "corporate" "corporate"
rename_images "denim" "denim"
rename_images "jersey" "jersey"
rename_images "costume" "costume"
rename_images "owambe" "owambe"
rename_images "others" "others"

echo "Image renaming completed!"

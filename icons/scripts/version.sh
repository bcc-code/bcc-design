#!/bin/bash

# Take the version increment as an argument
INCREMENT=$1

if [ -z "$INCREMENT" ]; then
    echo "No version given!"
    exit 1
fi

# Version vue-components
NEW_VERSION=$(npm version $INCREMENT --no-git-tag-version)

# Version design-components
cd vue
npm version $INCREMENT --no-git-tag-version

# Navigate back to the root of the workspace
cd ..

# Add changes to git
git add .

# Commit changes
git commit -m "$NEW_VERSION"

# Create a tag
git tag -am $NEW_VERSION "$NEW_VERSION"

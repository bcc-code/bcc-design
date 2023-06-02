#!/bin/bash

# Take the version increment as an argument
INCREMENT=$1

# Version vue-components
NEW_VERSION=$(npm version $INCREMENT --no-git-tag-version)

# Version design-components
cd css-package
npm version $INCREMENT --no-git-tag-version

# Navigate back to the root of the workspace
cd ..

# Add changes to git
git add .

# Commit changes
git commit -m "$NEW_VERSION"

# Create a tag
git tag "$NEW_VERSION"

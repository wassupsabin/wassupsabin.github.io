#!/bin/bash

# Setup GitHub Pages deployment script
# This script helps configure the local repository for GitHub Pages deployment

echo "🚀 Setting up GitHub Pages deployment..."

# Ensure we're in the root of the project
cd "$(dirname "$0")/.." || exit

# Verify astro.config.mjs has the correct GitHub Pages settings
if grep -q "site:" "astro.config.mjs" && grep -q "base:" "astro.config.mjs"; then
  echo "✅ Astro config has site and base path configurations"
else
  echo "⚠️ Warning: Your astro.config.mjs might be missing site or base path configurations"
  echo "Please ensure your astro.config.mjs contains:"
  echo "site: 'https://wassupsabin.github.io',"
  echo "base: '/website-southside',"
fi

# Check for GitHub workflow file
if [ -f ".github/workflows/deploy.yml" ]; then
  echo "✅ GitHub Actions workflow file exists"
else
  echo "⚠️ Creating GitHub Actions workflow file..."
  mkdir -p .github/workflows
  cat > .github/workflows/deploy.yml << 'EOL'
name: Deploy Astro site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: 'npm'
      - name: Setup Pages
        uses: actions/configure-pages@v4
        with:
          static_site_generator: astro
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./dist"

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
EOL
  echo "✅ Created GitHub Actions workflow file"
fi

# Check if we need a .nojekyll file to prevent Jekyll processing
if [ -f "public/.nojekyll" ]; then
  echo "✅ .nojekyll file exists to prevent Jekyll processing"
else
  echo "⚠️ Creating .nojekyll file to prevent Jekyll processing..."
  touch public/.nojekyll
  echo "✅ Created .nojekyll file"
fi

# Suggest commands to push changes
echo ""
echo "🔍 Next steps to enable GitHub Pages:"
echo "1. Commit and push these changes:"
echo "   git add .github/workflows/deploy.yml public/.nojekyll"
echo "   git commit -m \"Setup GitHub Pages deployment\""
echo "   git push origin main"
echo ""
echo "2. Go to your GitHub repository settings:"
echo "   https://github.com/wassupsabin/website-southside/settings/pages"
echo ""
echo "3. Under 'Build and deployment', select 'GitHub Actions' as the source"
echo ""
echo "4. Check that your repository visibility is public (required for GitHub Pages with free accounts)"
echo ""
echo "5. Ensure workflow permissions are set correctly:"
echo "   Go to Settings > Actions > General > Workflow permissions"
echo "   Enable 'Read and write permissions'"
echo ""
echo "✅ Setup complete!"
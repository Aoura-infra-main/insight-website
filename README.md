# Insight Website

A modern website for Insight.

## Overview
This repository contains the source code for the Insight Website.

## Developer Setup
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Aoura-infra-main/insight-website.git
   cd "Insight Website"
   ```

## Git Workflow & Aliases
The following Git aliases have been configured for a streamlined daily workflow:
- `git gs` = `git status`
- `git ga` = `git add .`
- `git gc "message"` = `git commit -m "message"`
- `git gp` = `git push`
- `git gl` = `git log --oneline --graph`

### Daily Development Loop:
1. Make your changes in the codebase.
2. Check changes status:
   ```bash
   git gs
   ```
3. Stage changes:
   ```bash
   git ga
   ```
4. Commit changes:
   ```bash
   git gc "Your descriptive commit message"
   ```
5. Push to GitHub:
   ```bash
   git gp
   ```

## Deployment Workflow
Depending on the final stack selection, the recommended deployment platforms are:

### Option A: Static HTML (Recommended for Simple Sites)
- **Primary Hosting**: Cloudflare Pages
- **Secondary Hosting**: Netlify
- **Workflow**: 
  1. Connect your GitHub repository (`insight-website`) to Cloudflare Pages or Netlify.
  2. Set the build command to empty/none and the publish directory to the root `/` (or your build directory, e.g., `dist` if using a bundler).
  3. Every push to the `main` branch will automatically trigger a production build and deployment.

### Option B: React / Next.js (Recommended for Dynamic Apps)
- **Primary Hosting**: Vercel
- **Workflow**:
  1. Import the repository on Vercel.
  2. Select the framework preset (e.g., Next.js or Vite).
  3. Every push to the `main` branch will trigger a serverless production deploy.

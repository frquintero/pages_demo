# 🌴 Digital Oasis - GitHub Pages Site

A beautiful, interactive web page hosted on GitHub Pages with automatic HTTPS.

## 🚀 Quick Setup

### 1. Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it: `fratquintero.github.io` (for custom domain) OR any name you want
3. Make it public
4. Don't initialize with README (we have one)

### 2. Upload Files
```bash
# Clone your new repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# Copy the web files
cp -r /run/media/fratq/4593fc5e-12d7-4064-8a55-3ad61a661126/CODE/apps/router_test/docs/* ./
cp /run/media/fratq/4593fc5e-12d7-4064-8a55-3ad61a661126/CODE/apps/router_test/README.md ./

# Add, commit, and push
git add .
git commit -m "Initial commit: Digital Oasis website"
git push origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Select **main** branch and **/(root)** folder
6. Click **Save**

### 4. Configure Custom Domain (Optional)
If you want to use `fratquintero.dpdns.org`:
1. In Pages settings, enter `fratquintero.dpdns.org` in **Custom domain**
2. Click **Save**
3. GitHub will create a `CNAME` file automatically

## 📁 Project Structure
```
your-repo/
├── index.html          # Main web page with CSS and JS
├── README.md           # This file
└── docs/              # Alternative location (not needed for Pages)
```

## 🎨 Features
- **Responsive Design**: Works on desktop and mobile
- **Interactive Elements**: Color-changing background buttons
- **Real-time Clock**: Updates every second
- **Visit Counter**: Click counter with animations
- **Modern UI**: Glassmorphism design with gradients
- **Keyboard Shortcuts**: Press 1-5 to change colors

## 🔧 Customization
- Edit `index.html` to change content, colors, or add features
- Modify the CSS in the `<style>` tag for styling
- Update JavaScript in the `<script>` tag for functionality

## 🌐 Access Your Site
- **GitHub Pages URL**: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`
- **Custom Domain**: `https://fratquintero.dpdns.org` (after DNS setup)

## 📝 FreeDNS Setup (for custom domain)
If using custom domain, configure FreeDNS:
1. Login to [FreeDNS.afraid.org](https://freedns.afraid.org)
2. Go to Dynamic DNS
3. Find `fratquintero.dpdns.org`
4. Copy the Direct URL
5. Set up automatic updates (see original setup files)

## 🎯 Demo
The page includes:
- Gradient background with color-changing buttons
- Floating animations
- Interactive counter
- Real-time clock
- Keyboard shortcuts (1-5 for colors)

Enjoy your new website! 🌴✨
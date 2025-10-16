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
If you want to use a custom domain like `pages.fratquintero.dpdns.org`:
1. In Pages settings, enter your custom domain name
2. Click **Save**
3. GitHub will create a `CNAME` file automatically
4. Update your FreeDNS or domain registrar DNS records to point to GitHub Pages

## 📁 Project Structure
```
your-repo/
├── index.html          # Main landing page
├── styles.css          # Shared styling for both entry points
├── script.js           # Shared interactivity module
├── readme.html         # Bundled documentation
├── README.md           # Project overview and setup notes
└── docs/               # GitHub Pages deployment root (mirrors key assets)
```

## 🎨 Features
- **Responsive Design**: Works on desktop and mobile
- **Interactive Elements**: Color-changing background buttons
- **Real-time Clock**: Updates every second
- **Visit Counter**: Click counter with animations
- **Local Weather**: Automatic location-based weather display with refresh button
- **Modern UI**: Glassmorphism design with gradients
- **Keyboard Shortcuts**: Press 1-5 to change colors

## 🔧 Customization
- Edit `index.html` to update copy, layout, or metadata
- Tweak design tokens and layout rules in `styles.css`
- Extend interactivity in `script.js` using the shared data-attribute patterns
- Mirror changes in the `/docs` directory when deploying GitHub Pages from that folder

## ✅ Development Standards
- Review [STANDARDS.md](STANDARDS.md) for the agreed-upon formatting, accessibility, and scripting conventions before contributing changes.

## 🌐 Access Your Site
- **Main Page**: `https://pages.fratquintero.dpdns.org/index.html`
- **Documentation**: `https://pages.fratquintero.dpdns.org/readme.html`
- **GitHub Pages URL**: `https://frquintero.github.io/pages_demo`

## 📝 FreeDNS Setup (for custom domain)
If using custom domain `pages.fratquintero.dpdns.org`:
1. Login to [FreeDNS.afraid.org](https://freedns.afraid.org)
2. Go to Dynamic DNS
3. Find or create a subdomain entry for your custom domain
4. Point it to your GitHub Pages domain
5. Set up automatic updates if needed

## 🎯 Demo
The page includes:
- Gradient background with color-changing buttons
- Floating animations
- Interactive counter
- Real-time clock
- Local weather display with geolocation and refresh button
- Keyboard shortcuts (1-5 for colors)

Enjoy your new website! 🌴✨
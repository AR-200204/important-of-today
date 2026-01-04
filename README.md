# What's Special Today? 📅

A fast, SEO-optimized, mobile-friendly static website that displays special days for every day of the year (365+ days). Works 100% offline and can be hosted for free on GitHub Pages.

## ✨ Features

- **Today's Special Day** - Automatically detects and displays today's special day
- **Browse Any Date** - Navigate to any date using the date picker
- **Complete Data** - 366 days of real, globally recognized special days
- **SEO Optimized** - Meta tags, Open Graph, and Schema.org structured data
- **Mobile-First Design** - Responsive layout with modern aesthetics
- **Share Functionality** - Easy sharing via native share or clipboard
- **No Dependencies** - Pure HTML, CSS, and vanilla JavaScript
- **Offline Ready** - Works without an internet connection once loaded

## 📁 Project Structure

```
/special-day-website
├── index.html          # Homepage - today's special day
├── day.html            # Browse any date
├── styles.css          # Complete responsive styling
├── script.js           # All JavaScript logic
├── data/
│   └── special-days.json   # Complete 366-day dataset
└── README.md           # This file
```

## 🚀 Getting Started

### Run Locally

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No build step or server required.

For best results, use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🌐 Deploy to GitHub Pages

### Step-by-Step Guide

1. **Create a GitHub Repository**
   - Go to [github.com](https://github.com) and sign in
   - Click "New repository"
   - Name it `special-day-website` (or any name)
   - Keep it public
   - Click "Create repository"

2. **Upload Files**
   - Click "uploading an existing file"
   - Drag and drop all files:
     - `index.html`
     - `day.html`
     - `styles.css`
     - `script.js`
     - `data/special-days.json`
     - `README.md`
   - Click "Commit changes"

3. **Enable GitHub Pages**
   - Go to repository **Settings**
   - Click **Pages** in the left sidebar
   - Under "Source", select **Deploy from a branch**
   - Choose **main** branch and **/ (root)**
   - Click **Save**

4. **Access Your Site**
   - Wait 1-2 minutes for deployment
   - Your site will be live at:
     ```
     https://YOUR-USERNAME.github.io/special-day-website/
     ```

### Using Git Command Line

```bash
# Clone your new repository
git clone https://github.com/YOUR-USERNAME/special-day-website.git
cd special-day-website

# Copy project files here, then:
git add .
git commit -m "Initial commit - What's Special Today website"
git push origin main
```

## 📅 Data Format

Each day entry in `special-days.json` follows this structure:

```json
{
    "month": "January",
    "day": 2,
    "date": "January 2",
    "title": "World Introvert Day",
    "description": "A day to celebrate introverts and the value of quiet reflection.",
    "category": "Awareness Day",
    "hashtags": ["#IntrovertDay", "#MentalHealth"]
}
```

### Categories
- **International Day** - UN and globally recognized days
- **World Day** - Major awareness and celebration days
- **Awareness Day** - Health, social, and cause-related days
- **Cultural Day** - Holidays and cultural celebrations
- **Fun Day** - Lighthearted and quirky observances

## 🛠️ Customization

### Add/Edit Special Days
Edit `data/special-days.json` to add, modify, or remove entries.

### Change Styling
Modify CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    /* ... more variables */
}
```

### Change Gradient Background
Update the `body` background in `styles.css`:

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

MIT License - Feel free to use, modify, and distribute.

---

Made with ❤️ | Discover what makes every day special!
"# important-of-today" 

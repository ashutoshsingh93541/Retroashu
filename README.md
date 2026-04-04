# RetroAshu | Gaming Creator Portfolio

A modern, responsive, and performance-focused personal portfolio built to represent a gaming content creator brand. Designed to showcase cinematic reels, PC setups, and creator-focused content while maintaining smooth performance across devices.

This project is not just about design — it is the result of solving real-world frontend problems related to responsiveness, asset optimization, and interactive UI behavior.

---

Live Demo : https://ashutoshsingh93541.github.io/Personal-Portfolio-Retroashu_HTML-CSS-Javascript/

## 🚀 Tech Stack

- **HTML5** – Semantic layout and SEO-friendly structure  
- **CSS3** – Flexbox, Grid, custom properties, responsive media queries  
- **JavaScript (Vanilla JS)** – Menu toggle logic, interaction handling  
- **Libraries & Assets**
  - Particles.js – Interactive hero background  
  - Font Awesome – Iconography  

---

## 🛠️ Major Challenges & Improvements

This project went through heavy debugging and optimization to become stable and mobile-friendly. Below are the key problems I faced and how I solved them.

---

### 1. Mobile Responsiveness & Horizontal Scroll Issue

**Problem:**  
The layout looked perfect on desktop but broke badly on mobile screens. Content overflowed to the right, causing unwanted horizontal scrolling.

**Root Causes:**
- Fixed-width logo  
- Long, unbroken text (email address)  
- Wide sections without overflow control  

**Solution:**
- Applied `overflow-x: hidden` to `html` and `body`  
- Used `word-break: break-all;` for long strings  
- Converted fixed widths to flexible units  
- Added mobile-first media queries  
- Reworked layout using Flexbox instead of hard margins  

---

### 2. Image Size & Performance Bottleneck

**Problem:**  
The website used high-resolution screenshots directly from games.  
The `images/` folder became too large (~40+ MB), causing:
- Slow page load  
- GitHub push failures  
- Poor mobile performance  

**Solution:**
- Resized all images to match actual display size  
- Converted `.png` and `.jpg` files into `.webp`  
- Applied lossy compression  
- Reduced repository size drastically  
- Improved mobile load speed  

---

### 3. Hamburger Menu Breaking on Mobile

**Problem:**  
The hamburger menu worked visually but:
- Did not toggle properly  
- Overlapped content  
- Stayed open when clicking links  
- Broke on resize  

**Solution:**
- Implemented JavaScript-based toggle logic  
- Added active class handling  
- Closed menu automatically on link click  
- Fixed z-index and positioning  
- Added smooth open/close animation  

---

### 4. Particles.js Performance & Layout Issues

**Problem:**  
Particles animation caused:
- Lag on low-end devices  
- Overlay issues with hero text  
- Height calculation bugs  

**Solution:**
- Set particles container with fixed height  
- Used proper z-index layering  
- Disabled heavy particle count  
- Optimized configuration  
- Ensured particles do not block UI interaction  

---

### 5. Sticky Header & Anchor Navigation Issues

**Problem:**  
Clicking navigation links caused:
- Content to hide under header  
- Sudden jump instead of smooth scroll  

**Solution:**
- Added `scroll-behavior: smooth`  
- Used `scroll-padding-top` to offset header  
- Fixed header overlap logic  

---

### 6. Cross-Browser CSS Warnings

**Problem:**  
VS Code showed warnings on:
```css
-webkit-background-clip: text;
```

**Solution:**
- Verified vendor-prefixed support  
- Added fallback styles  
- Ensured compatibility without breaking visuals  

---

## 📦 Installation & Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/ashutoshsingh93541/Retroashu.git
   ```

2. Open `index.html` in your browser.

---

## 📈 Key Learnings

- Responsive design is not about shrinking layouts — it is about restructuring them  
- Large images kill performance and repositories  
- UI libraries need careful layering and configuration  
- Mobile testing is mandatory, not optional  
- GitHub hosting requires optimized assets  
- Clean CSS beats hacks  

---

## 🧠 Future Improvements

- Add lazy loading for images  
- Convert to modular JS  
- Improve Lighthouse performance score  
- Add dark/light theme toggle  
- Introduce reusable UI components  

---

## 👤 Author

**RetroAshu (Ashutosh Singh)**  
Gaming Creator & Frontend Developer  
Building performance-first creator websites.

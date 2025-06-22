# Bloom & Blossom 🌸

A beautiful, responsive flower shop website that delivers fresh flowers with love. This project showcases modern web design with elegant animations and user-friendly features.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI/UX**: Clean, elegant design with smooth animations
- **Interactive Gallery**: Beautiful flower arrangement showcase with lightbox functionality
- **Shopping Cart**: Add flowers to cart with local storage persistence
- **Smooth Animations**: AOS (Animate On Scroll) library integration
- **Mobile Menu**: Hamburger menu for mobile navigation
- **Contact Integration**: WhatsApp integration for easy customer communication

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality and cart management
- **External Libraries**:
  - [AOS](https://michalsnik.github.io/aos/) - Animate On Scroll
  - [Swiper](https://swiperjs.com/) - Touch slider
  - [Lightbox2](https://lokeshdhakar.com/projects/lightbox2/) - Image gallery
  - [Font Awesome](https://fontawesome.com/) - Icons
  - [Google Fonts](https://fonts.google.com/) - Typography (Playfair Display & Lato)

## 📁 Project Structure

```
flower web/
├── index.html          # Main homepage
├── gallery.html        # Gallery page
├── css/
│   └── style.css      # Main stylesheet
├── js/
│   └── main.js        # JavaScript functionality
├── images/            # Image assets
├── .vscode/           # VS Code configuration
│   └── launch.json
└── README.md          # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. **Clone or download** the project to your local machine

2. **Navigate** to the project directory:
   ```bash
   cd "flower web"
   ```

3. **Open with a local server** (recommended):
   
   **Option A: Using Python (if installed):**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Option B: Using Node.js (if installed):**
   ```bash
   npx http-server
   ```
   
   **Option C: Using VS Code Live Server extension**
   - Install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

4. **Open your browser** and navigate to:
   - `http://localhost:8000` (if using Python/Node.js)
   - Or the URL provided by your chosen server

### Alternative: Direct File Opening

You can also open `index.html` directly in your browser, though some features may not work optimally without a server.

## 🎨 Customization

### Colors

The color scheme is defined in CSS custom properties in `css/style.css`:

```css
:root {
    --primary-color: #E78EA9;    /* Main pink color */
    --secondary-color: #C76D89;  /* Deeper pink */
    --accent-color: #A0D9B7;     /* Calming green */
    --accent-color-2: #FDECF2;   /* Light pink */
    --accent-color-3: #EBF7F0;   /* Light green */
    --text-color: #4A4A4A;       /* Text color */
    --light-color: #ffffff;      /* White */
    --dark-color: #333333;       /* Dark gray */
}
```

### Adding Images

1. Add your flower images to the `images/` directory
2. Update the image paths in the HTML files
3. Ensure images are optimized for web (recommended: WebP format)

### Modifying Content

- **Homepage content**: Edit `index.html`
- **Gallery images**: Update `gallery.html`
- **Styling**: Modify `css/style.css`
- **Functionality**: Update `js/main.js`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

For questions or support, please contact:
- Website: [Bloom & Blossom](#)
- Email: info@bloomandblossom.com
- WhatsApp: Available through the website

## 🙏 Acknowledgments

- Font Awesome for beautiful icons
- Google Fonts for elegant typography
- AOS library for smooth animations
- Swiper for touch-friendly sliders
- Lightbox2 for gallery functionality

---

**Made with ❤️ for flower lovers everywhere**
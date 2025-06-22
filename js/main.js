// ===== MAIN JAVASCRIPT FILE =====

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// ===== GLOBAL VARIABLES =====
let cart = [];
let cartCount = 0;
let isMenuOpen = false;

// ===== DOM ELEMENTS =====
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-menu');
const cartCountElement = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const searchIcon = document.querySelector('.header-icons .icon:first-child');
const userIcon = document.querySelector('.header-icons .icon:nth-child(2)');
const cartIcon = document.querySelector('.header-icons .icon:last-child');
const whatsappIcon = document.querySelector('.whatsapp-icon');

// ===== MOBILE MENU FUNCTIONALITY =====
if (hamburgerMenu && navMenu) {
    hamburgerMenu.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});

// ===== CART FUNCTIONALITY =====
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.showNotification(`${product.name} added to cart!`);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
                this.updateCartCount();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const count = this.getItemCount();
        if (cartCountElement) {
            cartCountElement.textContent = count;
            cartCountElement.style.display = count > 0 ? 'block' : 'none';
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize shopping cart
const shoppingCart = new ShoppingCart();

// ===== ADD TO CART FUNCTIONALITY =====
if (addToCartButtons.length > 0) {
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add animation to button
            button.classList.add('adding');
            button.textContent = 'Adding...';
            
            // Get product info from the card
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseInt(productCard.querySelector('.price').textContent.replace('₹', '').replace(',', ''));
            const productImage = productCard.querySelector('img').src;
            
            const product = {
                id: `product-${index + 1}`,
                name: productName,
                price: productPrice,
                image: productImage
            };
            
            // Simulate loading
            setTimeout(() => {
                shoppingCart.addItem(product);
                button.classList.remove('adding');
                button.textContent = 'Added!';
                button.classList.add('added');
                
                setTimeout(() => {
                    button.classList.remove('added');
                    button.textContent = 'Add to Cart';
                }, 2000);
            }, 500);
        });
    });
}

// ===== SEARCH FUNCTIONALITY =====
if (searchIcon) {
    searchIcon.addEventListener('click', (e) => {
        e.preventDefault();
        showSearchModal();
    });
}

function showSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.innerHTML = `
        <div class="search-modal-content">
            <div class="search-modal-header">
                <h3>Search Flowers</h3>
                <button class="close-search">&times;</button>
            </div>
            <div class="search-input-container">
                <input type="text" placeholder="Search for flowers, bouquets..." class="search-input">
                <button class="search-btn"><i class="fas fa-search"></i></button>
            </div>
            <div class="search-results"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('show');
        modal.querySelector('.search-input').focus();
    }, 100);
    
    // Close modal
    modal.querySelector('.close-search').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // Search functionality
    const searchInput = modal.querySelector('.search-input');
    const searchResults = modal.querySelector('.search-results');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
            performSearch(query, searchResults);
        } else {
            searchResults.innerHTML = '';
        }
    });
}

function performSearch(query, resultsContainer) {
    const products = [
        { name: 'Pink Peony Bunch', price: '₹899', image: 'https://images.pexels.com/photos/797793/pexels-photo-797793.jpeg' },
        { name: 'Sunflower Delight', price: '₹699', image: 'https://images.pexels.com/photos/1086584/pexels-photo-1086584.jpeg' },
        { name: 'Roses in Bloom', price: '₹799', image: 'https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg' },
        { name: 'Lavender Dreams', price: '₹599', image: 'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg' },
        { name: 'Tulip Treasure', price: '₹499', image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg' },
        { name: 'Orchid Elegance', price: '₹999', image: 'https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg' }
    ];
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );
    
    if (filteredProducts.length > 0) {
        resultsContainer.innerHTML = filteredProducts.map(product => `
            <div class="search-result-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="search-result-info">
                    <h4>${product.name}</h4>
                    <p class="price">${product.price}</p>
                </div>
            </div>
        `).join('');
    } else {
        resultsContainer.innerHTML = '<p class="no-results">No products found</p>';
    }
}

// ===== USER ACCOUNT FUNCTIONALITY =====
if (userIcon) {
    userIcon.addEventListener('click', (e) => {
        e.preventDefault();
        showUserModal();
    });
}

function showUserModal() {
    const modal = document.createElement('div');
    modal.className = 'user-modal';
    modal.innerHTML = `
        <div class="user-modal-content">
            <div class="user-modal-header">
                <h3>Account</h3>
                <button class="close-user">&times;</button>
            </div>
            <div class="user-options">
                <button class="user-option" data-action="login">
                    <i class="fas fa-sign-in-alt"></i>
                    <span>Login</span>
                </button>
                <button class="user-option" data-action="register">
                    <i class="fas fa-user-plus"></i>
                    <span>Register</span>
                </button>
                <button class="user-option" data-action="profile">
                    <i class="fas fa-user"></i>
                    <span>My Profile</span>
                </button>
                <button class="user-option" data-action="orders">
                    <i class="fas fa-shopping-bag"></i>
                    <span>My Orders</span>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
    
    // Close modal
    modal.querySelector('.close-user').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // Handle user options
    modal.querySelectorAll('.user-option').forEach(option => {
        option.addEventListener('click', () => {
            const action = option.dataset.action;
            handleUserAction(action);
        });
    });
}

function handleUserAction(action) {
    switch(action) {
        case 'login':
            alert('Login functionality would be implemented here');
            break;
        case 'register':
            alert('Registration functionality would be implemented here');
            break;
        case 'profile':
            alert('Profile management would be implemented here');
            break;
        case 'orders':
            alert('Order history would be implemented here');
            break;
    }
}

// ===== CART MODAL FUNCTIONALITY =====
if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        showCartModal();
    });
}

function showCartModal() {
    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    
    const cartItems = shoppingCart.items;
    const total = shoppingCart.getTotal();
    
    modal.innerHTML = `
        <div class="cart-modal-content">
            <div class="cart-modal-header">
                <h3>Shopping Cart</h3>
                <button class="close-cart">&times;</button>
            </div>
            <div class="cart-items">
                ${cartItems.length > 0 ? 
                    cartItems.map(item => `
                        <div class="cart-item" data-id="${item.id}">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="cart-item-info">
                                <h4>${item.name}</h4>
                                <p class="price">₹${item.price}</p>
                                <div class="quantity-controls">
                                    <button class="qty-btn minus">-</button>
                                    <span class="quantity">${item.quantity}</span>
                                    <button class="qty-btn plus">+</button>
                                </div>
                            </div>
                            <button class="remove-item">&times;</button>
                        </div>
                    `).join('') : 
                    '<p class="empty-cart">Your cart is empty</p>'
                }
            </div>
            ${cartItems.length > 0 ? `
                <div class="cart-footer">
                    <div class="cart-total">
                        <strong>Total: ₹${total}</strong>
                    </div>
                    <button class="btn btn-primary checkout-btn">Proceed to Checkout</button>
                </div>
            ` : ''}
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
    
    // Close modal
    modal.querySelector('.close-cart').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // Handle cart item interactions
    modal.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            const itemId = cartItem.dataset.id;
            const quantityElement = cartItem.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            
            if (e.target.classList.contains('plus')) {
                quantity++;
            } else if (e.target.classList.contains('minus') && quantity > 1) {
                quantity--;
            }
            
            shoppingCart.updateQuantity(itemId, quantity);
            quantityElement.textContent = quantity;
            
            // Update total
            const total = shoppingCart.getTotal();
            modal.querySelector('.cart-total strong').textContent = `Total: ₹${total}`;
        });
    });
    
    modal.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            const itemId = cartItem.dataset.id;
            
            shoppingCart.removeItem(itemId);
            cartItem.remove();
            
            // Update total or show empty cart
            if (shoppingCart.items.length === 0) {
                modal.querySelector('.cart-items').innerHTML = '<p class="empty-cart">Your cart is empty</p>';
                const footer = modal.querySelector('.cart-footer');
                if (footer) footer.remove();
            } else {
                const total = shoppingCart.getTotal();
                modal.querySelector('.cart-total strong').textContent = `Total: ₹${total}`;
            }
        });
    });
    
    // Checkout functionality
    const checkoutBtn = modal.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Checkout functionality would be implemented here');
        });
    }
}

// ===== WHATSAPP INTEGRATION =====
if (whatsappIcon) {
    whatsappIcon.addEventListener('click', (e) => {
        e.preventDefault();
        const message = encodeURIComponent('Hi! I\'m interested in your flower arrangements. Can you help me?');
        const whatsappUrl = `https://wa.me/919876543210?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });
}

// ===== SWIPER SLIDER INITIALIZATION =====
if (typeof Swiper !== 'undefined') {
    const featuredSlider = new Swiper('.featured-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
}

// ===== CONTACT FORM FUNCTIONALITY =====
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert(`Thank you ${name}! Your message has been sent. We'll get back to you soon.`);
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ===== PRODUCT HOVER EFFECTS =====
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
});

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== LAZY LOADING FOR IMAGES =====
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c🌸 Welcome to Bloom & Blossom! 🌸', 'color: #E78EA9; font-size: 20px; font-weight: bold;');
console.log('%cEnjoy browsing our beautiful flower arrangements!', 'color: #A0D9B7; font-size: 14px;');
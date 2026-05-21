// Velvet Brew Café - Application Logic

// Menu Database (12 items in English)
const MENU_ITEMS = [
    {
        id: 'espresso',
        name: 'Specialty Espresso',
        category: 'drinks',
        price: 2.20,
        image: 'assets/espresso.png',
        description: 'Single origin espresso shot with rich crema and dark cocoa notes.',
        customizable: true
    },
    {
        id: 'cappuccino',
        name: 'Classic Cappuccino',
        category: 'drinks',
        price: 3.50,
        image: 'assets/flat_white.png',
        description: 'Perfect balance of double espresso, warm milk, and dense microfoam.',
        customizable: true
    },
    {
        id: 'flat_white',
        name: 'Flat White',
        category: 'drinks',
        price: 3.80,
        image: 'assets/flat_white.png',
        description: 'Velvety microfoam poured over double ristretto espresso shots.',
        customizable: true
    },
    {
        id: 'matcha_latte',
        name: 'Uji Matcha Latte',
        category: 'drinks',
        price: 4.20,
        image: 'assets/matcha_latte.png',
        description: 'Premium organic Uji matcha whisked with your choice of steamed milk.',
        customizable: true
    },
    {
        id: 'caramel_macchiato',
        name: 'Iced Caramel Macchiato',
        category: 'drinks',
        price: 4.60,
        image: 'assets/flat_white.png',
        description: 'Chilled milk, vanilla syrup, and double espresso topped with caramel drizzle.',
        customizable: true
    },
    {
        id: 'cold_brew',
        name: 'Nitro Cold Brew',
        category: 'drinks',
        price: 4.00,
        image: 'assets/espresso.png',
        description: 'Slow-steeped cold brew infused with nitrogen for a creamy finish.',
        customizable: true
    },
    {
        id: 'golden_latte',
        name: 'Turmeric Golden Latte',
        category: 'drinks',
        price: 4.40,
        image: 'assets/matcha_latte.png',
        description: 'A soothing warm blend of organic turmeric, ginger, black pepper, and oat milk.',
        customizable: true
    },
    {
        id: 'croissant',
        name: 'Butter Croissant',
        category: 'bakery',
        price: 2.50,
        image: 'assets/croissant.png',
        description: 'Artisanal flaky pastry layered with pure French butter, baked fresh daily.',
        customizable: false
    },
    {
        id: 'avocado_toast',
        name: 'Sourdough Avocado Toast',
        category: 'bakery',
        price: 6.80,
        image: 'assets/croissant.png',
        description: 'Toasted sourdough topped with smashed organic avocado, feta cheese, and microgreens.',
        customizable: false
    },
    {
        id: 'cinnamon_roll',
        name: 'Cardamom Cinnamon Roll',
        category: 'bakery',
        price: 3.20,
        image: 'assets/croissant.png',
        description: 'Soft Swedish-style cardamom and cinnamon roll with pearl sugar glaze.',
        customizable: false
    },
    {
        id: 'berry_tart',
        name: 'Wild Berry Glazed Tart',
        category: 'desserts',
        price: 3.80,
        image: 'assets/berry_tart.png',
        description: 'Shortcrust pastry shells loaded with rich pastry cream and fresh wild berries.',
        customizable: false
    },
    {
        id: 'cheesecake',
        name: 'New York Baked Cheesecake',
        category: 'desserts',
        price: 4.50,
        image: 'assets/berry_tart.png',
        description: 'Classic dense baked cream cheese filling on a buttery graham cracker crust.',
        customizable: false
    }
];

// Locations Database
const LOCATIONS = {
    london: {
        id: 'london',
        name: 'London, Soho',
        region: 'Europe',
        address: '42 Wardour St, Soho, London W1D 6PX, UK',
        lat: 51.5074,
        lon: -0.1278,
        currency: 'GBP',
        symbol: '£',
        rate: 0.85 // Conversion rate from EUR
    },
    paris: {
        id: 'paris',
        name: 'Paris, Le Marais',
        region: 'Europe',
        address: '18 Rue des Rosiers, 75004 Paris, France',
        lat: 48.8566,
        lon: 2.3522,
        currency: 'EUR',
        symbol: '€',
        rate: 1.0
    },
    berlin: {
        id: 'berlin',
        name: 'Berlin, Mitte',
        region: 'Europe',
        address: 'Rosenthaler Str. 36, 10178 Berlin, Germany',
        lat: 52.5200,
        lon: 13.4050,
        currency: 'EUR',
        symbol: '€',
        rate: 1.0
    },
    newyork: {
        id: 'newyork',
        name: 'New York, SoHo',
        region: 'North America',
        address: '120 Prince St, New York, NY 10012, USA',
        lat: 40.7128,
        lon: -74.0060,
        currency: 'USD',
        symbol: '$',
        rate: 1.10
    },
    losangeles: {
        id: 'losangeles',
        name: 'Los Angeles, Venice',
        region: 'North America',
        address: '1600 Boardwalk, Venice, CA 90291, USA',
        lat: 34.0522,
        lon: -118.2437,
        currency: 'USD',
        symbol: '$',
        rate: 1.12
    }
};

// Global App State
let cart = [];
let selectedItem = null;
let currentCustomPrice = 0;
let selectedLocation = null;

// Page elements
const menuGrid = document.getElementById('menu-grid');
const searchInput = document.getElementById('menu-search');
const filterTabs = document.getElementById('filter-tabs');

const cartDrawer = document.getElementById('cart-drawer');
const cartDrawerBackdrop = document.getElementById('cart-drawer-backdrop');
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const cartDrawerFooter = document.getElementById('cart-drawer-footer');

const customizerModal = document.getElementById('customizer-modal');
const customizerCloseBtn = document.getElementById('customizer-close-btn');
const customizerForm = document.getElementById('customizer-form');
const customizerImg = document.getElementById('customizer-img');
const customizerTitle = document.getElementById('customizer-title');
const customizerDesc = document.getElementById('customizer-desc');
const customizerPriceDisplay = document.getElementById('customizer-price-display');
const addToCartSubmitBtn = document.getElementById('add-to-cart-submit');

const checkoutModal = document.getElementById('checkout-modal');
const checkoutCloseBtn = document.getElementById('checkout-close-btn');
const cancelBtn = document.querySelector('.modal-cancel-btn');
const payAmountLabel = document.getElementById('pay-button-amount');

// 3D Globe WebGL Properties
let globeScene, globeCamera, globeRenderer, globeGroup;
let globePins = [];
let isGlobeInitialized = false;

// Initialize Web App
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderMenu(MENU_ITEMS);
    setupEventListeners();
    updateCartUI();
});

// Theme Toggle State
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const isDark = localStorage.getItem('theme') === 'dark';
    if (isDark) {
        document.body.classList.add('dark-theme');
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

function toggleTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    
    // Add micro-animation effect
    themeBtn.querySelector('i').style.transform = 'rotate(360deg)';
    themeBtn.querySelector('i').style.transition = 'transform 0.5s ease';
    setTimeout(() => {
        themeBtn.querySelector('i').style.transform = '';
        themeBtn.querySelector('i').style.transition = '';
    }, 500);
}

// Render Menu Cards (default base currency: EUR €)
function renderMenu(items) {
    menuGrid.innerHTML = '';
    if (items.length === 0) {
        menuGrid.innerHTML = `
            <div class="empty-results-message" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">
                <i class="fa-solid fa-mug-hot" style="font-size: 2.5rem; margin-bottom: 12px; opacity: 0.5;"></i>
                <p>No items found matching your query.</p>
            </div>
        `;
        return;
    }

    items.forEach(item => {
        const card = document.createElement('article');
        card.className = 'menu-card';
        card.setAttribute('id', `item-card-${item.id}`);
        
        let categoryName = 'Drinks';
        if (item.category === 'bakery') categoryName = 'Bakery';
        if (item.category === 'desserts') categoryName = 'Desserts';

        card.innerHTML = `
            <div class="menu-card-img-wrapper">
                <span class="menu-card-tag">${categoryName}</span>
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="menu-card-body">
                <h3 class="menu-card-title">${item.name}</h3>
                <p class="menu-card-desc">${item.description}</p>
                <div class="menu-card-footer">
                    <span class="menu-card-price">€${item.price.toFixed(2)}</span>
                    <button class="menu-card-btn" data-id="${item.id}" aria-label="Add ${item.name} to order">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Theme Toggle
    document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);

    // Search query input
    searchInput.addEventListener('input', () => {
        filterAndSearchMenu();
    });

    // Category Tabs click
    filterTabs.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-tab')) {
            document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
            e.target.classList.add('active');
            filterAndSearchMenu();
        }
    });

    // Menu Item Add Click
    menuGrid.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.menu-card-btn');
        if (addBtn) {
            const itemId = addBtn.dataset.id;
            const item = MENU_ITEMS.find(i => i.id === itemId);
            if (item) {
                if (item.customizable) {
                    openCustomizer(item);
                } else {
                    addToCartDirectly(item, addBtn);
                }
            }
        }
    });

    // Cart Drawer Toggle binds
    cartToggleBtn.addEventListener('click', () => toggleCartDrawer(true));
    cartCloseBtn.addEventListener('click', () => toggleCartDrawer(false));
    cartDrawerBackdrop.addEventListener('click', () => toggleCartDrawer(false));
    
    // Customizer Modal binds
    customizerCloseBtn.addEventListener('click', () => toggleModal(customizerModal, false));
    customizerForm.addEventListener('change', updateCustomizerPrice);
    addToCartSubmitBtn.addEventListener('click', submitCustomization);

    // Cart list modifications inside drawer
    cartItemsContainer.addEventListener('click', handleCartClicks);

    // Checkout modal open & cancel binds
    checkoutBtn.addEventListener('click', () => {
        toggleCartDrawer(false);
        openCheckoutWizard();
    });
    checkoutCloseBtn.addEventListener('click', () => toggleModal(checkoutModal, false));
    cancelBtn.addEventListener('click', () => toggleModal(checkoutModal, false));
    
    // Sticky Header Scroll handler
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 8px 30px var(--shadow-color)';
            header.style.height = '70px';
            document.querySelector('.header-container').style.height = '70px';
        } else {
            header.style.boxShadow = '';
            header.style.height = '80px';
            document.querySelector('.header-container').style.height = '80px';
        }
        highlightActiveNavLink();
    });

    // Setup credit card fields interactions
    setupInteractiveCreditCard();

    // Setup checkout routing step switches
    setupCheckoutNavigation();
}

// Highlight Navigation links on Scroll
function highlightActiveNavLink() {
    const sections = ['hero', 'features', 'menu', 'locations', 'footer'];
    const scrollPos = window.scrollY + 200;

    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
}

// Filter and Search Menu Catalog
function filterAndSearchMenu() {
    const activeTab = document.querySelector('.filter-tab.active');
    const category = activeTab ? activeTab.dataset.category : 'all';
    const query = searchInput.value.toLowerCase().trim();

    let filtered = MENU_ITEMS;

    if (category !== 'all') {
        filtered = filtered.filter(item => item.category === category);
    }

    if (query !== '') {
        filtered = filtered.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query)
        );
    }

    renderMenu(filtered);
}

// Toggle drawer state
function toggleCartDrawer(isOpen) {
    if (isOpen) {
        cartDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        cartDrawer.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Toggle modal state
function toggleModal(modal, isOpen) {
    if (isOpen) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Directly insert item to cart
function addToCartDirectly(item, targetElement) {
    const cartItem = {
        id: item.id,
        uniqueId: item.id + '_default',
        name: item.name,
        basePrice: item.price,
        price: item.price,
        quantity: 1,
        image: item.image,
        customizations: null,
        customText: 'Standard recipe'
    };

    const existing = cart.find(i => i.uniqueId === cartItem.uniqueId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(cartItem);
    }

    // Trigger item trajectory animation
    animateFlyingOrb(targetElement);

    updateCartUI();
}

// Open Customizer for drinks
function openCustomizer(item) {
    selectedItem = item;
    
    customizerImg.src = item.image;
    customizerImg.alt = item.name;
    customizerTitle.textContent = item.name;
    customizerDesc.textContent = item.description;

    const milkSection = document.getElementById('option-milk');
    const addonsSection = document.getElementById('option-addons');
    const sweetSection = document.getElementById('option-sweet');

    // Reset fields
    customizerForm.reset();
    
    // Hide milk selector if espresso
    if (item.id === 'espresso' || item.id === 'cold_brew') {
        milkSection.style.display = 'none';
        sweetSection.style.display = 'block';
        addonsSection.style.display = 'block';
    } else {
        milkSection.style.display = 'block';
        sweetSection.style.display = 'block';
        addonsSection.style.display = 'block';
    }

    updateCustomizerPrice();
    toggleModal(customizerModal, true);
}

// Calculate customizations price adjustments
function updateCustomizerPrice() {
    if (!selectedItem) return;
    
    let basePrice = selectedItem.price;
    const formData = new FormData(customizerForm);
    
    // Size adjustment
    const size = formData.get('size');
    if (size === 'M') basePrice += 0.50;
    if (size === 'L') basePrice += 1.00;
    
    // Milk adjustment
    const milk = formData.get('milk');
    if (milk === 'oat') basePrice += 0.60;
    if (milk === 'almond') basePrice += 0.70;
    
    // Addons adjustment
    const addons = formData.getAll('addons');
    addons.forEach(addon => {
        if (addon === 'extra_shot') basePrice += 0.80;
        if (addon === 'syrup') basePrice += 0.50;
        if (addon === 'marshmallow') basePrice += 0.50;
    });
    
    currentCustomPrice = basePrice;
    customizerPriceDisplay.textContent = `€${currentCustomPrice.toFixed(2)}`;
}

// Submit customization form
function submitCustomization() {
    if (!selectedItem) return;
    
    const formData = new FormData(customizerForm);
    const size = formData.get('size');
    const milk = formData.get('milk') || 'none';
    const sweetnessIndex = parseInt(formData.get('sweetness'));
    const addons = formData.getAll('addons');
    
    const sizeNames = { 'S': 'Small (8 oz)', 'M': 'Medium (12 oz)', 'L': 'Large (16 oz)' };
    const milkNames = { 'standard': 'Whole Milk', 'oat': 'Oat Milk', 'almond': 'Almond Milk', 'none': 'No Milk' };
    const sweetNames = ['Unsweetened', 'Medium Sweet', 'Sweet'];
    const addonNames = { 'extra_shot': 'Extra Shot', 'syrup': 'Caramel Syrup', 'marshmallow': 'Marshmallows' };
    
    let metaTexts = [sizeNames[size]];
    if (selectedItem.id !== 'espresso' && selectedItem.id !== 'cold_brew') {
        metaTexts.push(milkNames[milk]);
    }
    metaTexts.push(sweetNames[sweetnessIndex]);
    if (addons.length > 0) {
        addons.forEach(a => metaTexts.push(addonNames[a]));
    }
    
    const customText = metaTexts.join(', ');
    
    // Config unique hash ID
    const configHash = `${selectedItem.id}_${size}_${milk}_${sweetnessIndex}_${addons.sort().join('-')}`;
    
    const cartItem = {
        id: selectedItem.id,
        uniqueId: configHash,
        name: selectedItem.name,
        basePrice: selectedItem.price,
        price: currentCustomPrice,
        quantity: 1,
        image: selectedItem.image,
        customizations: {
            size,
            milk,
            sweetness: sweetnessIndex,
            addons
        },
        customText
    };

    const existing = cart.find(i => i.uniqueId === cartItem.uniqueId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(cartItem);
    }

    const customizerSubmitCoords = addToCartSubmitBtn.getBoundingClientRect();
    animateFlyingOrb(null, customizerSubmitCoords);

    toggleModal(customizerModal, false);
    updateCartUI();
}

// Update Drawer list and badge
function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;
    
    if (totalCount > 0) {
        cartCount.classList.remove('hidden');
        cartCount.style.animation = 'none';
        cartCount.offsetHeight; // trigger reflow
        cartCount.style.animation = 'cartBump 0.3s ease-out';
    } else {
        cartCount.classList.add('hidden');
    }

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <i class="fa-solid fa-basket-shopping"></i>
                <p>Your basket is currently empty</p>
                <a href="#menu" class="btn btn-primary btn-sm" id="empty-cart-cta">View Our Menu</a>
            </div>
        `;
        cartDrawerFooter.style.display = 'none';
        checkoutBtn.style.display = 'none';
    } else {
        cartDrawerFooter.style.display = 'block';
        checkoutBtn.style.display = 'block';
        
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-meta">${item.customText}</p>
                    <p class="cart-item-price">€${item.price.toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn dec-btn" data-uid="${item.uniqueId}">-</button>
                            <span class="quantity-val">${item.quantity}</span>
                            <button class="quantity-btn inc-btn" data-uid="${item.uniqueId}">+</button>
                        </div>
                        <button class="cart-item-delete" data-uid="${item.uniqueId}" aria-label="Remove"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
    }

    // Subtotal in base currency (EUR)
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotal.textContent = `€${subtotal.toFixed(2)}`;
    cartTotal.textContent = `€${subtotal.toFixed(2)}`;
}

// Drawer clicks adjuster
function handleCartClicks(e) {
    if (e.target.id === 'empty-cart-cta') {
        toggleCartDrawer(false);
        return;
    }

    const decBtn = e.target.closest('.dec-btn');
    const incBtn = e.target.closest('.inc-btn');
    const deleteBtn = e.target.closest('.cart-item-delete');

    if (decBtn) {
        const uid = decBtn.dataset.uid;
        const item = cart.find(i => i.uniqueId === uid);
        if (item) {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.uniqueId !== uid);
            }
            updateCartUI();
        }
    }

    if (incBtn) {
        const uid = incBtn.dataset.uid;
        const item = cart.find(i => i.uniqueId === uid);
        if (item) {
            item.quantity += 1;
            updateCartUI();
        }
    }

    if (deleteBtn) {
        const uid = deleteBtn.dataset.uid;
        cart = cart.filter(i => i.uniqueId !== uid);
        updateCartUI();
    }
}

// Flying item element animation
function animateFlyingOrb(triggerButton, startRectOverride = null) {
    let startCoords;
    if (startRectOverride) {
        startCoords = startRectOverride;
    } else if (triggerButton) {
        startCoords = triggerButton.getBoundingClientRect();
    } else {
        return;
    }

    const cartIconCoords = cartToggleBtn.getBoundingClientRect();

    const particle = document.createElement('div');
    particle.className = 'flying-particle';
    particle.innerHTML = '<i class="fa-solid fa-mug-hot"></i>';
    
    particle.style.left = `${startCoords.left + (startCoords.width / 2) - 12}px`;
    particle.style.top = `${startCoords.top + (startCoords.height / 2) - 12}px`;
    
    document.body.appendChild(particle);

    const endX = cartIconCoords.left + (cartIconCoords.width / 2) - 12;
    const endY = cartIconCoords.top + (cartIconCoords.height / 2) - 12;
    const startX = startCoords.left + (startCoords.width / 2) - 12;
    const startY = startCoords.top + (startCoords.height / 2) - 12;

    const controlX = startX + (endX - startX) * 0.2;
    const controlY = startY - 150;

    const keyframes = [
        { left: `${startX}px`, top: `${startY}px`, transform: 'scale(1.2)' },
        { left: `${controlX}px`, top: `${controlY}px`, transform: 'scale(1.4)' },
        { left: `${endX}px`, top: `${endY}px`, transform: 'scale(0.3)' }
    ];

    const animation = particle.animate(keyframes, {
        duration: 850,
        easing: 'cubic-bezier(0.1, 0.8, 0.25, 1)'
    });

    animation.onfinish = () => {
        particle.remove();
        cartToggleBtn.animate([
            { transform: 'scale(1) rotate(0)' },
            { transform: 'scale(1.2) rotate(-10deg)', offset: 0.3 },
            { transform: 'scale(1.2) rotate(10deg)', offset: 0.6 },
            { transform: 'scale(1.1) rotate(-5deg)', offset: 0.85 },
            { transform: 'scale(1) rotate(0)' }
        ], {
            duration: 400,
            easing: 'ease-out'
        });
    };
}

// 3D Credit Card Rotation & Validation binders
function setupInteractiveCreditCard() {
    const cardEl = document.getElementById('credit-card');
    const cNumberInput = document.getElementById('input-card-number');
    const cHolderInput = document.getElementById('input-card-holder');
    const cExpiryInput = document.getElementById('input-card-expiry');
    const cCvvInput = document.getElementById('input-card-cvv');

    const cNumberDisplay = document.getElementById('card-number-display');
    const cHolderDisplay = document.getElementById('card-holder-display');
    const cExpiryDisplay = document.getElementById('card-expiry-display');
    const cCvvDisplay = document.getElementById('card-cvv-display');

    cCvvInput.addEventListener('focus', () => {
        cardEl.classList.add('flipped');
    });
    
    cCvvInput.addEventListener('blur', () => {
        cardEl.classList.remove('flipped');
    });

    cNumberInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        let formatted = val.match(/.{1,4}/g);
        if (formatted) {
            e.target.value = formatted.join(' ');
        } else {
            e.target.value = '';
        }

        let displayVal = e.target.value;
        if (displayVal === '') displayVal = '•••• •••• •••• ••••';
        cNumberDisplay.textContent = displayVal;

        const cardTypeLogo = document.querySelector('.card-type-logo');
        if (val.startsWith('4')) {
            cardTypeLogo.innerHTML = '<i class="fa-brands fa-cc-visa"></i>';
        } else if (val.startsWith('5')) {
            cardTypeLogo.innerHTML = '<i class="fa-brands fa-cc-mastercard"></i>';
        } else if (val.startsWith('3')) {
            cardTypeLogo.innerHTML = '<i class="fa-brands fa-cc-amex"></i>';
        } else {
            cardTypeLogo.innerHTML = '<i class="fa-regular fa-credit-card"></i>';
        }
    });

    cHolderInput.addEventListener('input', (e) => {
        let val = e.target.value.toUpperCase().replace(/[^A-Z\s]/g, '');
        e.target.value = val;
        cHolderDisplay.textContent = val === '' ? 'CARDHOLDER NAME' : val;
    });

    cExpiryInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 2) {
            val = val.substring(0, 2) + '/' + val.substring(2, 4);
        }
        e.target.value = val;
        cExpiryDisplay.textContent = val === '' ? 'MM/YY' : val;
    });

    cCvvInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        e.target.value = val;
        cCvvDisplay.textContent = val === '' ? '•••' : '•'.repeat(val.length);
    });
}

// 4-Step Checkout Wizard Setup
function openCheckoutWizard() {
    showCheckoutStep(1);
    
    document.getElementById('user-name').value = localStorage.getItem('user_name') || '';
    document.getElementById('user-phone').value = localStorage.getItem('user_phone') || '';
    document.getElementById('table-number').value = '';
    
    // Reset selected location state
    selectedLocation = null;
    document.getElementById('card-active-state').classList.add('hidden');
    document.getElementById('card-empty-state').classList.remove('hidden');
    document.getElementById('location-dropdown').value = '';
    
    toggleModal(checkoutModal, true);

    // Initialize 3D Globe when first opening checkout
    setTimeout(() => {
        initGlobeScene();
    }, 100);
}

function showCheckoutStep(stepNum) {
    document.querySelectorAll('.checkout-step-content').forEach(el => el.classList.remove('active'));
    document.getElementById(`checkout-step-${stepNum}`).classList.add('active');

    const d1 = document.getElementById('step-dot-1');
    const d2 = document.getElementById('step-dot-2');
    const d3 = document.getElementById('step-dot-3');
    const d4 = document.getElementById('step-dot-4');
    const l1 = document.getElementById('line-1');
    const l2 = document.getElementById('line-2');
    const l3 = document.getElementById('line-3');

    d1.className = 'progress-step';
    d2.className = 'progress-step';
    d3.className = 'progress-step';
    d4.className = 'progress-step';
    l1.className = 'progress-line';
    l2.className = 'progress-line';
    l3.className = 'progress-line';

    if (stepNum >= 1) d1.classList.add('active');
    if (stepNum >= 2) {
        d1.classList.remove('active'); d1.classList.add('completed'); l1.classList.add('completed');
        d2.classList.add('active');
    }
    if (stepNum >= 3) {
        d1.classList.remove('active'); d1.classList.add('completed'); l1.classList.add('completed');
        d2.classList.remove('active'); d2.classList.add('completed'); l2.classList.add('completed');
        d3.classList.add('active');
    }
    if (stepNum >= 4) {
        d1.classList.remove('active'); d1.classList.add('completed'); l1.classList.add('completed');
        d2.classList.remove('active'); d2.classList.add('completed'); l2.classList.add('completed');
        d3.classList.remove('active'); d3.classList.add('completed'); l3.classList.add('completed');
        d4.classList.add('completed');
    }
}

// Local Currency Converted Price calculator helper
function getConvertedCartTotal(location) {
    const rate = location ? location.rate : 1.0;
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return subtotal * rate;
}

function setupCheckoutNavigation() {
    const typeDinein = document.querySelector('input[value="dinein"]');
    const typeTakeaway = document.querySelector('input[value="takeaway"]');
    const dineinDetails = document.getElementById('dinein-details-container');

    typeDinein.addEventListener('change', () => {
        dineinDetails.style.display = 'block';
    });
    typeTakeaway.addEventListener('change', () => {
        dineinDetails.style.display = 'none';
    });

    // Toggle 3D Globe vs list selectors
    const toggleGlobe = document.getElementById('toggle-globe-view');
    const toggleList = document.getElementById('toggle-list-view');
    const panelGlobe = document.getElementById('globe-selector-panel');
    const panelList = document.getElementById('list-selector-panel');

    toggleGlobe.addEventListener('click', () => {
        toggleList.classList.remove('active');
        toggleGlobe.classList.add('active');
        panelList.classList.add('hidden');
        panelGlobe.classList.remove('hidden');
        if (isGlobeInitialized) {
            onGlobeResize();
        }
    });

    toggleList.addEventListener('click', () => {
        toggleGlobe.classList.remove('active');
        toggleList.classList.add('active');
        panelGlobe.classList.add('hidden');
        panelList.classList.remove('hidden');
    });

    // Dropdown list select update callback
    document.getElementById('location-dropdown').addEventListener('change', (e) => {
        const val = e.target.value;
        if (val && LOCATIONS[val]) {
            selectLocation(LOCATIONS[val]);
        }
    });

    // Step 1 Location Check
    document.getElementById('step-1-next').addEventListener('click', () => {
        if (!selectedLocation) {
            alert('Please select a café outlet first by clicking a pin on the globe or using the list.');
            return;
        }
        showCheckoutStep(2);
    });

    // Step 2 routing checks
    document.getElementById('step-2-prev').addEventListener('click', () => {
        showCheckoutStep(1);
    });

    document.getElementById('step-2-next').addEventListener('click', () => {
        const orderType = document.querySelector('input[name="order-type"]:checked').value;
        const name = document.getElementById('user-name').value.trim();
        const table = document.getElementById('table-number').value;

        if (name === '') {
            alert('Please enter your name.');
            return;
        }

        if (orderType === 'dinein' && (table === '' || table < 1)) {
            alert('Please enter a valid table number.');
            return;
        }

        localStorage.setItem('user_name', name);
        const phone = document.getElementById('user-phone').value.trim();
        if (phone) localStorage.setItem('user_phone', phone);

        // Update step 3 total cost label with selected location's currency conversion
        const convertedTotal = getConvertedCartTotal(selectedLocation);
        payAmountLabel.textContent = `${selectedLocation.symbol}${convertedTotal.toFixed(2)}`;

        showCheckoutStep(3);
    });

    // Step 3 routing
    document.getElementById('step-3-prev').addEventListener('click', () => {
        showCheckoutStep(2);
    });

    const tabCard = document.getElementById('pay-method-card');
    const tabFast = document.getElementById('pay-method-fast');
    const panelCard = document.getElementById('card-payment-panel');
    const panelFast = document.getElementById('fast-pay-panel');
    const payBtn = document.getElementById('step-3-pay-btn');

    tabCard.addEventListener('click', () => {
        tabFast.classList.remove('active');
        tabCard.classList.add('active');
        panelFast.classList.add('hidden');
        panelCard.classList.remove('hidden');
        payBtn.style.display = 'inline-flex';
    });

    tabFast.addEventListener('click', () => {
        tabCard.classList.remove('active');
        tabFast.classList.add('active');
        panelCard.classList.add('hidden');
        panelFast.classList.remove('hidden');
        payBtn.style.display = 'none';
    });

    document.getElementById('mock-gpay-trigger').addEventListener('click', () => performMockPayment('Google Pay'));
    document.getElementById('mock-applepay-trigger').addEventListener('click', () => performMockPayment('Apple Pay'));

    payBtn.addEventListener('click', () => {
        const cNum = document.getElementById('input-card-number').value.replace(/\s/g, '');
        const cHolder = document.getElementById('input-card-holder').value.trim();
        const cExpiry = document.getElementById('input-card-expiry').value;
        const cCvv = document.getElementById('input-card-cvv').value;

        if (cNum.length < 16) {
            alert('Please enter a valid 16-digit card number.');
            return;
        }
        if (cHolder.length < 3) {
            alert('Please enter the name of the card holder.');
            return;
        }
        if (cExpiry.length < 5) {
            alert('Expiry date must be in MM/YY format.');
            return;
        }
        if (cCvv.length < 3) {
            alert('Please enter a valid 3-digit CVV safety code.');
            return;
        }

        performMockPayment('Credit Card');
    });

    // Close checkout completely on final step
    document.getElementById('checkout-finish-btn').addEventListener('click', () => {
        cart = [];
        updateCartUI();
        toggleModal(checkoutModal, false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Perform simulated checkout loader
function performMockPayment(methodName) {
    const payBtn = document.getElementById('step-3-pay-btn');
    const oldText = payBtn.innerHTML;
    
    payBtn.disabled = true;
    payBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Payment...';
    
    setTimeout(() => {
        payBtn.disabled = false;
        payBtn.innerHTML = oldText;
        
        generateReceipt(methodName);
        showCheckoutStep(4);
    }, 1800);
}

// Generate printable receipt with currency convert computations
function generateReceipt(paymentMethod) {
    const orderNumber = Math.floor(100 + Math.random() * 900);
    const orderTypeVal = document.querySelector('input[name="order-type"]:checked').value;
    const tableNum = document.getElementById('table-number').value;
    
    document.getElementById('receipt-order-number').textContent = orderNumber;
    
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('receipt-time').textContent = `${dateStr} at ${timeStr}`;
    
    // Set selected outlet details
    document.getElementById('receipt-outlet-address').innerHTML = `
        <strong>Velvet Brew - ${selectedLocation.name}</strong><br>
        ${selectedLocation.address}
    `;

    let orderTypeDisplay = 'Takeaway';
    if (orderTypeVal === 'dinein') {
        orderTypeDisplay = `Dine-in (Table #${tableNum})`;
    }
    document.getElementById('receipt-order-type').textContent = orderTypeDisplay;
    document.getElementById('receipt-pay-method').textContent = paymentMethod;
    
    const listContainer = document.getElementById('receipt-items-list');
    listContainer.innerHTML = '';
    
    const rate = selectedLocation.rate;
    const symbol = selectedLocation.symbol;

    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'receipt-item';
        
        const convertedItemPrice = item.price * rate;
        const totalItemPrice = convertedItemPrice * item.quantity;
        itemEl.innerHTML = `
            <div class="receipt-row receipt-item-title-row">
                <span>${item.name} x${item.quantity}</span>
                <span>${symbol}${totalItemPrice.toFixed(2)}</span>
            </div>
            ${item.customizations ? `<div class="receipt-item-customizations">${item.customText}</div>` : ''}
        `;
        listContainer.appendChild(itemEl);
    });

    const totalConverted = getConvertedCartTotal(selectedLocation);
    document.getElementById('receipt-total-amount').textContent = `${symbol}${totalConverted.toFixed(2)}`;
}

// Select a location: updates form and visual 3D pin highlight
function selectLocation(loc) {
    selectedLocation = loc;
    
    // Sync dropdown
    document.getElementById('location-dropdown').value = loc.id;
    
    // Update active details display card
    document.getElementById('card-empty-state').classList.add('hidden');
    const activeState = document.getElementById('card-active-state');
    activeState.classList.remove('hidden');
    
    document.getElementById('selected-loc-name').textContent = loc.name;
    document.getElementById('selected-loc-region').textContent = loc.region;
    document.getElementById('selected-loc-address').textContent = loc.address;

    // Highlight targeted 3D globe pin mesh
    if (isGlobeInitialized) {
        globePins.forEach(pin => {
            if (pin.userData.id === loc.id) {
                // Focus camera towards this point
                smoothFocusOnCoords(pin.position);
                pin.material.color.setHex(0xffd700); // Gold for selected
                pin.scale.set(1.6, 1.6, 1.6);
            } else {
                pin.material.color.setHex(0x39ff14); // Green for default
                pin.scale.set(1.0, 1.0, 1.0);
            }
        });
    }
}

// THREE.JS 3D PLANET EARTH GLOBE IMPLEMENTATION
function initGlobeScene() {
    if (isGlobeInitialized) {
        onGlobeResize();
        return;
    }

    const container = document.querySelector('.globe-canvas-wrapper');
    const canvas = document.getElementById('globe-canvas');

    // 1. Scene setup
    globeScene = new THREE.Scene();

    // 2. Camera setup
    globeCamera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    globeCamera.position.z = 12.5;

    // 3. Renderer setup
    globeRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    globeRenderer.setPixelRatio(window.devicePixelRatio);
    globeRenderer.setSize(container.clientWidth, container.clientHeight);

    // 4. Globe Group setup
    globeGroup = new THREE.Group();
    globeScene.add(globeGroup);

    // 5. Earth Sphere setup
    const sphereRadius = 4.2;
    const geometry = new THREE.SphereGeometry(sphereRadius, 64, 64);
    
    // Generate programmatic stylized dot-matrix canvas texture
    const earthTexture = createDottedEarthTexture();
    const material = new THREE.MeshBasicMaterial({
        map: earthTexture,
        transparent: true
    });

    const earthMesh = new THREE.Mesh(geometry, material);
    globeGroup.add(earthMesh);

    // 6. Draw Atmosphere / Grid Halo
    const gridGeometry = new THREE.SphereGeometry(sphereRadius + 0.05, 32, 32);
    const gridMaterial = new THREE.MeshBasicMaterial({
        color: 0x332014,
        wireframe: true,
        transparent: true,
        opacity: 0.12
    });
    const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
    globeGroup.add(gridMesh);

    // 7. Plot Cafe Locations Pins
    Object.values(LOCATIONS).forEach(loc => {
        const pinGeom = new THREE.SphereGeometry(0.13, 16, 16);
        const pinMat = new THREE.MeshBasicMaterial({ color: 0x39ff14 }); // Neon Green
        const pinMesh = new THREE.Mesh(pinGeom, pinMat);

        // Convert Lat/Lon to 3D Cartesian coordinates on sphere surface
        const pos = latLonToVector3(loc.lat, loc.lon, sphereRadius + 0.1);
        pinMesh.position.copy(pos);
        
        // Store reference data
        pinMesh.userData = { id: loc.id, name: loc.name };
        
        globeGroup.add(pinMesh);
        globePins.push(pinMesh);
    });

    // 8. Auto-rotation & mouse drag binders
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
    });

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const deltaMove = {
            x: mouseX - previousMousePosition.x,
            y: mouseY - previousMousePosition.y
        };

        if (isDragging) {
            globeGroup.rotation.y += deltaMove.x * 0.007;
            globeGroup.rotation.x += deltaMove.y * 0.007;
            
            // Constrain X rotation to prevent flipping upside down
            globeGroup.rotation.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, globeGroup.rotation.x));
        }

        previousMousePosition = { x: mouseX, y: mouseY };

        // Handle Raycasting check for Hovers
        checkGlobeRaycast(mouseX, mouseY, rect, false);
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Handle clicks for selection
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        checkGlobeRaycast(mouseX, mouseY, rect, true);
    });

    // Set Initial Angle facing London/Europe
    globeGroup.rotation.y = 2.4;
    globeGroup.rotation.x = 0.5;

    // Start 3D render loop
    isGlobeInitialized = true;
    animateGlobe();
}

// Convert Spherical Lat/Lon Coordinates to Cartesian 3D Coords
function latLonToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.sin(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.cos(theta);

    return new THREE.Vector3(x, y, z);
}

// Raycaster check for hover highlighting & selecting pins
function checkGlobeRaycast(mouseX, mouseY, rect, isClick) {
    if (!isGlobeInitialized) return;

    // Map screen mouse position to normalized device coordinates (-1 to +1)
    const mouse = new THREE.Vector2();
    mouse.x = (mouseX / rect.width) * 2 - 1;
    mouse.y = -(mouseY / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, globeCamera);

    // Test intersections against pins array
    const intersects = raycaster.intersectObjects(globePins);

    if (intersects.length > 0) {
        const hitPin = intersects[0].object;
        document.getElementById('globe-canvas').style.cursor = 'pointer';

        if (!isClick) {
            // Hover highlight
            globePins.forEach(p => {
                if (p.userData.id !== (selectedLocation ? selectedLocation.id : null)) {
                    p.material.color.setHex(p === hitPin ? 0xffa500 : 0x39ff14); // orange on hover
                    p.scale.set(p === hitPin ? 1.4 : 1.0, p === hitPin ? 1.4 : 1.0, p === hitPin ? 1.4 : 1.0);
                }
            });
        } else {
            // Click select
            const locId = hitPin.userData.id;
            if (LOCATIONS[locId]) {
                selectLocation(LOCATIONS[locId]);
            }
        }
    } else {
        document.getElementById('globe-canvas').style.cursor = 'grab';
        if (!isClick) {
            // Reset hover highlights
            globePins.forEach(p => {
                const isSelected = selectedLocation && selectedLocation.id === p.userData.id;
                p.material.color.setHex(isSelected ? 0xffd700 : 0x39ff14);
                p.scale.set(isSelected ? 1.6 : 1.0, isSelected ? 1.6 : 1.0, isSelected ? 1.6 : 1.0);
            });
        }
    }
}

// Smoothly align camera towards focused vector coords
function smoothFocusOnCoords(targetVector) {
    // Math calculation to compute required rotation angle
    const targetYRotation = Math.atan2(targetVector.x, targetVector.z);
    
    // Animate rotation using custom linear interpolation loop
    const step = 0.08;
    const rotateAnim = () => {
        const diffY = targetYRotation - globeGroup.rotation.y;
        
        // Handle wrap-around math
        const normalizedDiffY = Math.atan2(Math.sin(diffY), Math.cos(diffY));

        if (Math.abs(normalizedDiffY) > 0.01) {
            globeGroup.rotation.y += normalizedDiffY * step;
            requestAnimationFrame(rotateAnim);
        }
    };
    rotateAnim();
}

// Draw dynamic dot-matrix continents map on canvas texture
function createDottedEarthTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#0c0806';
    ctx.fillRect(0, 0, 1024, 512);

    // Inline continent boundary centers logic
    const isLand = (x, y) => {
        // Greenland
        if (Math.hypot(x - 380, y - 70) < 45) return true;
        // North America
        if (Math.hypot(x - 220, y - 140) < 100) return true;
        if (Math.hypot(x - 170, y - 220) < 55) return true;
        // South America
        if (Math.hypot(x - 300, y - 360) < 70 && y > x * 0.75) return true;
        // Europe
        if (Math.hypot(x - 510, y - 120) < 65) return true;
        // Africa
        if (Math.hypot(x - 540, y - 280) < 75) return true;
        // Asia
        if (Math.hypot(x - 720, y - 150) < 110) return true;
        if (Math.hypot(x - 850, y - 200) < 85) return true;
        if (Math.hypot(x - 660, y - 220) < 70) return true;
        // Australia
        if (Math.hypot(x - 830, y - 390) < 50) return true;
        
        return false;
    };

    // Draw stylized matrices dots
    for (let x = 6; x < 1024; x += 12) {
        for (let y = 6; y < 512; y += 12) {
            const land = isLand(x, y);
            ctx.fillStyle = land ? 'rgba(212, 175, 87, 0.65)' : 'rgba(74, 51, 33, 0.08)'; // Gold land / subtle grid water
            ctx.beginPath();
            ctx.arc(x, y, land ? 2.2 : 0.8, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    return new THREE.CanvasTexture(canvas);
}

// 3D Rendering looping frames
function animateGlobe() {
    if (!isGlobeInitialized) return;
    requestAnimationFrame(animateGlobe);

    // Subtle automatic slow spinning if user isn't dragging
    globeGroup.rotation.y += 0.0012;

    globeRenderer.render(globeScene, globeCamera);
}

// Handle resize when container changes (modal transitions)
function onGlobeResize() {
    if (!isGlobeInitialized) return;
    const container = document.querySelector('.globe-canvas-wrapper');
    globeCamera.aspect = container.clientWidth / container.clientHeight;
    globeCamera.updateProjectionMatrix();
    globeRenderer.setSize(container.clientWidth, container.clientHeight);
}

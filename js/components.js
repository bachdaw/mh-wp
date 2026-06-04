class MioNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <nav class="navbar" id="navbar">
        <div class="nav-left">
            <img src="img/icons/burger.svg" alt="Menu" class="nav-icon-svg burger-icon">
            <div class="search-container">
                <img src="img/icons/search.svg" alt="Szukaj" class="nav-icon-svg">
                <input type="text" placeholder="Czego szukasz?">
            </div>
        </div>
        <div class="nav-center">
            <a href="index.html">
                <img src="img/icons/logo-miohome.svg" alt="Miohome" class="nav-logo-img">
            </a>
        </div>
        <div class="nav-right">
            <ul class="nav-links">
                <li><a href="#">Nowości</a></li>
                <li><a href="listing.html">Produkty</a></li>
                <li><a href="#">Współpraca</a></li>
            </ul>
            <div class="nav-icons">
                <img src="img/icons/search.svg" alt="Szukaj" class="nav-icon-svg mobile-search-icon">
                <img src="img/icons/User.svg" alt="User" class="nav-icon-svg">
                <img src="img/icons/heart.svg" alt="Heart" class="nav-icon-svg">
                <img src="img/icons/shopping-cart.svg" alt="Cart" class="nav-icon-svg">
            </div>
        </div>
    </nav>
        `;
        
        const navbar = this.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}
customElements.define('mio-navbar', MioNavbar);

class MioFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <footer class="main-footer">
        <div class="footer-top">
            <img src="img/icons/logo-miohome.svg" alt="Miohome" class="footer-logo">
            <div class="footer-social">
                <span>Follow us:</span>
                <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
                <a href="#"><i class="fa-brands fa-pinterest-p"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>
            </div>
        </div>
        
        <div class="footer-grid">
            <div class="footer-col">
                <h4>O nas</h4>
                <ul>
                    <li><a href="#">Firma</a></li>
                    <li><a href="#">Kontakt</a></li>
                    <li><a href="#">Media</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Produkty</h4>
                <ul>
                    <li><a href="#">Sofy</a></li>
                    <li><a href="#">Narożniki</a></li>
                    <li><a href="#">Leżanki</a></li>
                    <li><a href="#">Fotele</a></li>
                    <li><a href="#">Pufy</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Dla klienta</h4>
                <ul>
                    <li><a href="#">Katalog</a></li>
                    <li><a href="#">Znajdź Sklep</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Zasady i reklamacje</a></li>
                    <li><a href="#">Dostawa i płatność</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Współpraca</h4>
                <ul>
                    <li><a href="#">Architekci</a></li>
                    <li><a href="#">Partnerzy biznesowi</a></li>
                </ul>
            </div>
            <!-- Pusta kolumna zamiast 'Blog', aby Newsletter nie zmienił pozycji -->
            <div></div>
            <div class="footer-col newsletter-col">
                <h4>Newsletter</h4>
                <div class="newsletter-input-group">
                    <input type="email" placeholder="Twój adres e-mail">
                    <button class="newsletter-submit">Zapisz mnie</button>
                </div>
                <label class="newsletter-checkbox">
                    <input type="checkbox">
                    <span>Akceptuję regulamin i politykę prywatności. Wyrażam zgodę na otrzymywanie informacji handlowych.</span>
                </label>
            </div>
        </div>

        <div class="footer-policies-payments">
            <div class="footer-policies">
                <a href="#">Polityka prywatności</a>
                <a href="#">Regulamin sklepu</a>
                <a href="#">Polityka zwrotu kosztów</a>
            </div>
            <div class="footer-payments">
                <div class="payment-box"><i class="fa-brands fa-apple"></i>&nbsp;Pay</div>
                <div class="payment-box">blik</div>
                <div class="payment-box"><i class="fa-brands fa-google"></i>&nbsp;Pay</div>
                <div class="payment-box">Klarna.</div>
                <div class="payment-box"><i class="fa-brands fa-cc-mastercard" style="font-size: 16px;"></i></div>
                <div class="payment-box visa-font">VISA</div>
            </div>
        </div>
    </footer>
    <div class="footer-bottom-line">
        <div class="copyright">© 2026 Miohome</div>
        <div class="language-chat">
            <div class="language">
                Język: 
                <select>
                    <option value="pl">Polski</option>
                    <option value="en">English</option>
                </select>
                <i class="fa-solid fa-chevron-down" style="font-size: 8px;"></i>
            </div>
        </div>
    </div>
        `;
    }
}
customElements.define('mio-footer', MioFooter);

class MioProductCard extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title') || 'Nazwa produktu';
        const desc = this.getAttribute('desc') || 'Krótki opis produktu...';
        const price = this.getAttribute('price') || '0 zł';
        const pricePrefix = this.getAttribute('price-prefix') || '';
        
        let badgesHtml = '';
        try {
            const badges = JSON.parse(this.getAttribute('badges') || '[]');
            badgesHtml = badges.map(b => `<span class="badge ${b.class}">${b.text}</span>`).join('');
        } catch(e) {}

        let imagesHtml = '';
        let imagesCount = 0;
        try {
            const images = JSON.parse(this.getAttribute('images') || '[]');
            imagesCount = images.length;
            imagesHtml = images.map(img => `<img src="${img}" alt="${title}">`).join('');
        } catch(e) {}

        this.innerHTML = `
        <article class="product-card">
            <div class="product-image-wrapper">
                <div class="badges-container">${badgesHtml}</div>
                <button class="wishlist-btn" aria-label="Dodaj do ulubionych">
                    <i class="fa-regular fa-heart"></i>
                </button>
                <div class="gallery-track">${imagesHtml}</div>
                ${imagesCount > 1 ? `
                <div class="gallery-scroll-indicator">
                    ${Array.from({length: imagesCount}).map((_, i) => `<div class="indicator-segment ${i === 0 ? 'active' : ''}"></div>`).join('')}
                </div>
                ` : ''}
                <button class="slider-arrow prev" aria-label="Poprzednie zdjęcie">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="slider-arrow next" aria-label="Następne zdjęcie">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <button class="add-to-cart-btn"><a href="product_page.html">KONFIGURUJ</a></button>
            </div>
            <div class="product-info">
                <h3 class="product-title">${title}</h3>
                <p class="product-desc">${desc}</p>
                <div class="price-section">
                    <p class="current-price"><span class="price-prefix">${pricePrefix}</span> ${price}</p>
                    <p class="mobile-customizable-label">PERSONALIZOWANY</p>
                </div>
            </div>
        </article>
        `;

        const track = this.querySelector('.gallery-track');
        const btnPrev = this.querySelector('.slider-arrow.prev');
        const btnNext = this.querySelector('.slider-arrow.next');
        const scrollIndicator = this.querySelector('.gallery-scroll-indicator');
        
        const maxIndex = imagesCount - 1;

        if (btnNext && btnPrev && maxIndex > 0) {
            btnNext.addEventListener('click', (e) => {
                e.preventDefault(); 
                track.scrollBy({ left: track.offsetWidth, behavior: 'smooth' });
            });
            btnPrev.addEventListener('click', (e) => {
                e.preventDefault();
                track.scrollBy({ left: -track.offsetWidth, behavior: 'smooth' });
            });
            
            if (scrollIndicator) {
                const segments = scrollIndicator.querySelectorAll('.indicator-segment');
                track.addEventListener('scroll', () => {
                    const scrollableWidth = track.scrollWidth - track.clientWidth;
                    if (scrollableWidth > 0) {
                        const index = Math.round(track.scrollLeft / track.clientWidth);
                        segments.forEach((seg, i) => {
                            if (i === index) seg.classList.add('active');
                            else seg.classList.remove('active');
                        });
                    }
                });
            }
        } else {
            if(btnPrev) btnPrev.style.display = 'none';
            if(btnNext) btnNext.style.display = 'none';
        }

        const wishlistBtn = this.querySelector('.wishlist-btn');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', (e) => {
                e.preventDefault();
                wishlistBtn.classList.toggle('active');
                const i = wishlistBtn.querySelector('i');
                if(wishlistBtn.classList.contains('active')) {
                    i.classList.remove('fa-regular');
                    i.classList.add('fa-solid');
                } else {
                    i.classList.remove('fa-solid');
                    i.classList.add('fa-regular');
                }
            });
        }

        const productCard = this.querySelector('.product-card');
        if (productCard) {
            productCard.addEventListener('click', (e) => {
                // If the click is on a button (wishlist, slider arrow, add-to-cart) or a link inside it, do nothing.
                // Otherwise, redirect to product_page.html
                if (!e.target.closest('button') && !e.target.closest('a')) {
                    window.location.href = 'product_page.html';
                }
            });
        }
    }
}
customElements.define('mio-product-card', MioProductCard);

class MioProductCarousel extends HTMLElement {
    connectedCallback() {
        const innerHTML = this.innerHTML;
        this.innerHTML = `
        <div class="products-carousel">
            <button class="carousel-arrow prev-slide"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="carousel-track-wrapper">
                <div class="carousel-track">
                    ${innerHTML}
                </div>
            </div>
            <button class="carousel-arrow next-slide"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        `;

        const trackWrapper = this.querySelector('.carousel-track-wrapper');
        const prevBtn = this.querySelector('.prev-slide');
        const nextBtn = this.querySelector('.next-slide');

        if (trackWrapper && prevBtn && nextBtn) {
            const scrollAmount = 340; 
            prevBtn.addEventListener('click', () => {
                trackWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
            nextBtn.addEventListener('click', () => {
                trackWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }
    }
}
customElements.define('mio-product-carousel', MioProductCarousel);

function initObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Drobne opóźnienie, aby dać czas Web Components na przerenderowanie HTML
    setTimeout(() => {
        document.querySelectorAll('.animate-up').forEach(el => {
            observer.observe(el);
        });
    }, 50);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initObserver);
} else {
    initObserver();
}

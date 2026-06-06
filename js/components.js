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
                <a href="#" class="user-nav-link"><img src="img/icons/User.svg" alt="User" class="nav-icon-svg"></a>
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
        const userLinks = this.querySelectorAll('.user-nav-link');
        const updateAuthLink = () => {
            const isLogged = localStorage.getItem('mock_is_logged_in') === 'true';
            userLinks.forEach(link => {
                link.href = isLogged ? 'account.html' : 'login.html';
            });
        };
        updateAuthLink();
        window.addEventListener('auth-mock-changed', updateAuthLink);

        const cartIcons = this.querySelectorAll('img[alt="Cart"]');
        cartIcons.forEach(icon => {
            icon.style.cursor = 'pointer';
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                window.dispatchEvent(new Event('open-cart'));
            });
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
                <span>Obserwuj nas:</span>
                <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
                <a href="#"><i class="fa-brands fa-pinterest-p"></i></a>
            </div>
        </div>
        
        <div class="footer-grid">
            <div class="footer-col">
                <h4>O nas</h4>
                <ul>
                    <li><a href="#">Firma</a></li>
                    <li><a href="kontakt.html">Kontakt</a></li>
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

class MioAuthMock extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="auth-mock-widget">
                <span class="auth-mock-label">Tryb:</span>
                <select class="auth-mock-select">
                    <option value="false">Gość</option>
                    <option value="true">Zalogowany</option>
                </select>
            </div>
        `;

        const select = this.querySelector('.auth-mock-select');
        select.value = localStorage.getItem('mock_is_logged_in') === 'true' ? 'true' : 'false';

        select.addEventListener('change', (e) => {
            localStorage.setItem('mock_is_logged_in', e.target.value);
            window.dispatchEvent(new Event('auth-mock-changed'));
            // Optionally reload to update UI immediately on standard pages
            window.location.reload();
        });
    }
}
customElements.define('mio-auth-mock', MioAuthMock);

// Auto-inject mock widget
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(document.createElement('mio-auth-mock'));
    });
} else {
    document.body.appendChild(document.createElement('mio-auth-mock'));
}

class MioCartDrawer extends HTMLElement {
    connectedCallback() {
        this.render();
        window.addEventListener('auth-mock-changed', () => this.render());
        window.addEventListener('open-cart', () => this.open());
    }

    render() {
        const isLogged = localStorage.getItem('mock_is_logged_in') === 'true';
        
        let bodyHtml = '';
        let footerHtml = '';
        let sheetHtml = '';
        
        if (!isLogged) {
            bodyHtml = `
                <div style="padding: 60px 40px; text-align: center; color: #666; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
                    <i class="fa-solid fa-basket-shopping" style="font-size: 48px; margin-bottom: 20px; color: #ddd;"></i>
                    <p style="font-size: 14px; margin-bottom: 30px;">Twój koszyk jest pusty.</p>
                    <button onclick="document.querySelector('mio-cart-drawer').close(); window.location.href='listing.html'" style="padding: 12px 25px; background: #000; color: #fff; border: none; text-transform: uppercase; font-size: 11px; font-weight: 500; letter-spacing: 1px; cursor: pointer; transition: 0.3s;">Przejdź do produktów</button>
                </div>
            `;
        } else {
            bodyHtml = `
                <div class="cart-items" style="padding: 0 40px; flex-shrink: 0;">
                    <!-- Produkt 1 -->
                    <div class="cart-item" style="display: flex; gap: 20px; padding: 25px 0; border-bottom: 1px solid #eee;">
                        <img src="img/product-img/chesterclub_preview_v2.jpg" alt="Sofa Cezar" style="width: 90px; height: 90px; object-fit: cover;">
                        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                    <h4 style="margin: 0; font-size: 13px;">Sofa Cezar 2-osobowa Patchwork Harris Tweed</h4>
                                    <span style="font-weight: 600; font-size: 14px; white-space: nowrap; margin-left: 10px;">16 850 zł</span>
                                </div>
                                <div style="font-size: 11px; color: var(--secondary-text-color); line-height: 1.5;">
                                    <div style="display: flex; align-items: center; gap: 6px;">
                                        <img src="img/materials/MTK0381.avif" alt="Skóra" style="width: 12px; height: 12px; object-fit: cover;">
                                        <span>Obicie: Skóra (Koniakowy Brąz)</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 6px; margin-top: 3px;">
                                        <img src="img/wood/black.jpg" alt="Dąb czarny" style="width: 12px; height: 12px; object-fit: cover;">
                                        <span>Nóżki: Dąb czarny</span>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                                <div class="qty-selector" style="display: flex; border: 1px solid #ddd; width: fit-content;">
                                    <button style="border: none; background: none; padding: 4px 10px; cursor: pointer; color: #666;">-</button>
                                    <input type="text" value="1" readonly style="width: 25px; text-align: center; border: none; font-family: inherit; font-size: 12px; color: #000; padding: 0;">
                                    <button style="border: none; background: none; padding: 4px 10px; cursor: pointer; color: #666;">+</button>
                                </div>
                                <button style="background: none; border: none; font-size: 10px; text-transform: uppercase; color: #d9534f; text-decoration: underline; cursor: pointer; padding: 0;">Usuń</button>
                            </div>
                        </div>
                    </div>
                    <!-- Produkt 2 -->
                    <div class="cart-item" style="display: flex; gap: 20px; padding: 25px 0; border-bottom: 1px solid #eee;">
                        <img src="img/product-img/cezar_preview_przod.png" alt="Sofa Lounge" style="width: 90px; height: 90px; object-fit: cover;">
                        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                    <h4 style="margin: 0; font-size: 13px;">Sofa Lounge 3-osobowa</h4>
                                    <span style="font-weight: 600; font-size: 14px; white-space: nowrap; margin-left: 10px;">4 200 zł</span>
                                </div>
                                <div style="font-size: 11px; color: var(--secondary-text-color); line-height: 1.5;">
                                    <div style="display: flex; align-items: center; gap: 6px;">
                                        <img src="img/materials/MTK0354.avif" alt="Welur" style="width: 12px; height: 12px; object-fit: cover;">
                                        <span>Obicie: Welur (Butelkowa zieleń)</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 6px; margin-top: 3px;">
                                        <div style="width: 12px; height: 12px; background: linear-gradient(135deg, #f3c36c, #a88235);"></div>
                                        <span>Nóżki: Złoty metal</span>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                                <div class="qty-selector" style="display: flex; border: 1px solid #ddd; width: fit-content;">
                                    <button style="border: none; background: none; padding: 4px 10px; cursor: pointer; color: #666;">-</button>
                                    <input type="text" value="1" readonly style="width: 25px; text-align: center; border: none; font-family: inherit; font-size: 12px; color: #000; padding: 0;">
                                    <button style="border: none; background: none; padding: 4px 10px; cursor: pointer; color: #666;">+</button>
                                </div>
                                <button style="background: none; border: none; font-size: 10px; text-transform: uppercase; color: #d9534f; text-decoration: underline; cursor: pointer; padding: 0;">Usuń</button>
                            </div>
                        </div>
                    </div>
                    <!-- Produkt 3 -->
                    <div class="cart-item" style="display: flex; gap: 20px; padding: 25px 0; border-bottom: 1px solid #eee;">
                        <img src="img/product-img/barry_preview.png" alt="Fotel Uszak" style="width: 90px; height: 90px; object-fit: cover;">
                        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                    <h4 style="margin: 0; font-size: 13px;">Fotel Classic Uszak</h4>
                                    <span style="font-weight: 600; font-size: 14px; white-space: nowrap; margin-left: 10px;">1 890 zł</span>
                                </div>
                                <div style="font-size: 11px; color: var(--secondary-text-color); line-height: 1.5;">
                                    <div style="display: flex; align-items: center; gap: 6px;">
                                        <img src="img/materials/material.avif" alt="Tkanina" style="width: 12px; height: 12px; object-fit: cover;">
                                        <span>Obicie: Tkanina (Szary melanż)</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 6px; margin-top: 3px;">
                                        <img src="img/wood/natural.jpg" alt="Buk" style="width: 12px; height: 12px; object-fit: cover;">
                                        <span>Nóżki: Buk naturalny</span>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                                <div class="qty-selector" style="display: flex; border: 1px solid #ddd; width: fit-content;">
                                    <button style="border: none; background: none; padding: 4px 10px; cursor: pointer; color: #666;">-</button>
                                    <input type="text" value="1" readonly style="width: 25px; text-align: center; border: none; font-family: inherit; font-size: 12px; color: #000; padding: 0;">
                                    <button style="border: none; background: none; padding: 4px 10px; cursor: pointer; color: #666;">+</button>
                                </div>
                                <button style="background: none; border: none; font-size: 10px; text-transform: uppercase; color: #d9534f; text-decoration: underline; cursor: pointer; padding: 0;">Usuń</button>
                            </div>
                        </div>
                    </div>
                    <!-- Produkt 4 -->
                    <div class="cart-item" style="display: flex; gap: 20px; padding: 25px 0; border-bottom: 1px solid #eee;">
                        <img src="img/product-img/biber_preview.png" alt="Pufa" style="width: 90px; height: 90px; object-fit: cover;">
                        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                    <h4 style="margin: 0; font-size: 13px;">Pufa Chesterfield</h4>
                                    <span style="font-weight: 600; font-size: 14px; white-space: nowrap; margin-left: 10px;">950 zł</span>
                                </div>
                                <div style="font-size: 11px; color: var(--secondary-text-color); line-height: 1.5;">
                                    <div style="display: flex; align-items: center; gap: 6px;">
                                        <img src="img/materials/MTK000ZF22.avif" alt="Skóra" style="width: 12px; height: 12px; object-fit: cover;">
                                        <span>Obicie: Skóra (Czarna)</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 6px; margin-top: 3px;">
                                        <div style="width: 12px; height: 12px; background-color: #333;"></div>
                                        <span>Nóżki: Brak (ślizgacze)</span>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                                <div class="qty-selector" style="display: flex; border: 1px solid #ddd; width: fit-content;">
                                    <button style="border: none; background: none; padding: 4px 10px; cursor: pointer; color: #666;">-</button>
                                    <input type="text" value="2" readonly style="width: 25px; text-align: center; border: none; font-family: inherit; font-size: 12px; color: #000; padding: 0;">
                                    <button style="border: none; background: none; padding: 4px 10px; cursor: pointer; color: #666;">+</button>
                                </div>
                                <button style="background: none; border: none; font-size: 10px; text-transform: uppercase; color: #d9534f; text-decoration: underline; cursor: pointer; padding: 0;">Usuń</button>
                            </div>
                        </div>
                    </div>
                    <!-- Produkt 5 -->
                    <div class="cart-item" style="display: flex; gap: 20px; padding: 25px 0; border-bottom: 1px solid #eee;">
                        <img src="img/product-img/pufa_preview.png" alt="Sofa Modern" style="width: 90px; height: 90px; object-fit: cover;">
                        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                    <h4 style="margin: 0; font-size: 13px;">Sofa Modern 3-osobowa</h4>
                                    <span style="font-weight: 600; font-size: 14px; white-space: nowrap; margin-left: 10px;">5 400 zł</span>
                                </div>
                                <div style="font-size: 11px; color: var(--secondary-text-color); line-height: 1.5;">
                                    <div style="display: flex; align-items: center; gap: 6px;">
                                        <img src="img/materials/MTK0381.avif" alt="Skóra" style="width: 12px; height: 12px; object-fit: cover;">
                                        <span>Obicie: Skóra (Biała)</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 6px; margin-top: 3px;">
                                        <div style="width: 12px; height: 12px; background-color: #eee;"></div>
                                        <span>Nóżki: Srebrny metal</span>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                                <div class="qty-selector" style="display: flex; border: 1px solid #ddd; width: fit-content;">
                                    <button style="border: none; background: none; padding: 4px 10px; cursor: pointer; color: #666;">-</button>
                                    <input type="text" value="1" readonly style="width: 25px; text-align: center; border: none; font-family: inherit; font-size: 12px; color: #000; padding: 0;">
                                    <button style="border: none; background: none; padding: 4px 10px; cursor: pointer; color: #666;">+</button>
                                </div>
                                <button style="background: none; border: none; font-size: 10px; text-transform: uppercase; color: #d9534f; text-decoration: underline; cursor: pointer; padding: 0;">Usuń</button>
                            </div>
                        </div>
                    </div>
                </div>
                 <!-- Akcesoria / Carousel -->
                <div class="cart-accessories" style="padding: 30px 40px 10px 40px; max-width: 100%; box-sizing: border-box; overflow: hidden; flex-shrink: 0;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <h4 style="font-size: 14px; margin: 0;">Dobierz akcesoria</h4>
                        <div style="display: flex; gap: 10px;">
                            <button class="acc-prev" style="border: none; background: #f5f5f5; width: 24px; height: 24px; cursor: pointer; transition: 0.3s; border-radius: 0;" onmouseover="this.style.background='#e0e0e0'" onmouseout="this.style.background='#f5f5f5'"><i class="fa-solid fa-chevron-left" style="font-size: 10px;"></i></button>
                            <button class="acc-next" style="border: none; background: #f5f5f5; width: 24px; height: 24px; cursor: pointer; transition: 0.3s; border-radius: 0;" onmouseover="this.style.background='#e0e0e0'" onmouseout="this.style.background='#f5f5f5'"><i class="fa-solid fa-chevron-right" style="font-size: 10px;"></i></button>
                        </div>
                    </div>
                    <div class="acc-track" style="display: flex; overflow-x: auto; gap: 15px; padding-bottom: 20px; scrollbar-width: none; scroll-behavior: smooth;">
                        <style>.acc-track::-webkit-scrollbar { display: none; }</style>
                        <!-- Akcesorium 1 -->
                        <div style="min-width: 260px; border: 1px solid #eee; padding: 15px; display: flex; gap: 15px;">
                            <img src="img/prod_1.jpg" style="width: 70px; height: 70px; object-fit: cover;">
                            <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                                <h4 style="font-size: 12px; font-weight: 600; margin: 0;">Zestaw czyszczący</h4>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                                    <span style="font-size: 13px; font-weight: 600;">120 zł</span>
                                    <button style="padding: 6px 15px; background: #fff; border: 1px solid #000; color: #000; font-size: 9px; text-transform: uppercase; font-weight: 500; cursor: pointer; transition: 0.3s;" onmouseover="this.style.background='#000'; this.style.color='#fff';" onmouseout="this.style.background='#fff'; this.style.color='#000';">Dodaj</button>
                                </div>
                            </div>
                        </div>
                        <!-- Akcesorium 2 -->
                        <div style="min-width: 260px; border: 1px solid #eee; padding: 15px; display: flex; gap: 15px;">
                            <img src="img/prod_4.jpg" style="width: 70px; height: 70px; object-fit: cover;">
                            <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                                <h4 style="font-size: 12px; font-weight: 600; margin: 0;">Poduszka dekoracyjna</h4>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                                    <span style="font-size: 13px; font-weight: 600;">180 zł</span>
                                    <button style="padding: 6px 15px; background: #fff; border: 1px solid #000; color: #000; font-size: 9px; text-transform: uppercase; font-weight: 500; cursor: pointer; transition: 0.3s;" onmouseover="this.style.background='#000'; this.style.color='#fff';" onmouseout="this.style.background='#fff'; this.style.color='#000';">Dodaj</button>
                                </div>
                            </div>
                        </div>
                        <!-- Akcesorium 3 -->
                        <div style="min-width: 260px; border: 1px solid #eee; padding: 15px; display: flex; gap: 15px;">
                            <img src="img/prod_6.jpg" style="width: 70px; height: 70px; object-fit: cover;">
                            <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                                <h4 style="font-size: 12px; font-weight: 600; margin: 0;">Koc wełniany</h4>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                                    <span style="font-size: 13px; font-weight: 600;">350 zł</span>
                                    <button style="padding: 6px 15px; background: #fff; border: 1px solid #000; color: #000; font-size: 9px; text-transform: uppercase; font-weight: 500; cursor: pointer; transition: 0.3s;" onmouseover="this.style.background='#000'; this.style.color='#fff';" onmouseout="this.style.background='#fff'; this.style.color='#000';">Dodaj</button>
                                </div>
                            </div>
                        </div>
                        <!-- Akcesorium 4 -->
                        <div style="min-width: 260px; border: 1px solid #eee; padding: 15px; display: flex; gap: 15px;">
                            <img src="img/prod_9.jpg" style="width: 70px; height: 70px; object-fit: cover;">
                            <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                                <h4 style="font-size: 12px; font-weight: 600; margin: 0;">Impregnat do skór</h4>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                                    <span style="font-size: 13px; font-weight: 600;">90 zł</span>
                                    <button style="padding: 6px 15px; background: #fff; border: 1px solid #000; color: #000; font-size: 9px; text-transform: uppercase; font-weight: 500; cursor: pointer; transition: 0.3s;" onmouseover="this.style.background='#000'; this.style.color='#fff';" onmouseout="this.style.background='#fff'; this.style.color='#000';">Dodaj</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            footerHtml = `
                <div class="cart-footer" style="padding: 30px 40px; background: #fafafa; border-top: 1px solid #eee; width: 100%; box-sizing: border-box;">
                    <style>
                        .cart-checkout-btn {
                            width: 100%; background: #000; color: #fff; padding: 16px; border: none; text-transform: uppercase; letter-spacing: 1px; font-weight: 500; font-size: 12px; font-family: inherit; cursor: pointer; transition: 0.2s;
                        }
                        .cart-checkout-btn:hover { background: var(--accent-color); }
                        .cart-checkout-btn:active { background: var(--accent-color) !important; }
                        
                        .delivery-date-link {
                            text-decoration: underline;
                            text-underline-offset: 3px;
                            cursor: pointer;
                            transition: color 0.2s;
                        }
                        .delivery-date-link:hover {
                            color: #000;
                        }
                        
                        .delivery-sheet-overlay {
                            position: absolute; inset: 0; background: rgba(0,0,0,0.5); z-index: 100; opacity: 0; pointer-events: none; transition: opacity 0.3s;
                        }
                        .delivery-sheet-overlay.active {
                            opacity: 1; pointer-events: auto;
                        }
                        
                        .delivery-sheet {
                            position: absolute; bottom: 0; left: 0; width: 100%; height: 75%; background: #fff; transform: translateY(100%); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); z-index: 101; box-shadow: 0 -5px 20px rgba(0,0,0,0.1); display: flex; flex-direction: column;
                        }
                        .delivery-sheet.active {
                            transform: translateY(0);
                        }
                    </style>
                    <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 700; margin-bottom: 8px;">
                        <span>Suma częściowa:</span>
                        <span>20 240 zł</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 500; color: #666; margin-bottom: 20px; align-items: center;">
                        <span style="display: flex; align-items: center;"><img src="img/icons/truck.svg" alt="Dostawa" style="width: 14px; height: 14px; margin-right: 6px; filter: brightness(0) saturate(100%) invert(40%) sepia(0%) saturate(1637%) hue-rotate(189deg) brightness(97%) contrast(85%);">Przewidywana dostawa:</span>
                        <span class="delivery-date-link">14 - 26 czerwca</span>
                    </div>
                    <button class="cart-checkout-btn">Przejdź do kasy</button>
                    <div style="text-align: center; margin-top: 15px; font-size: 10px; color: #666;">
                        Darmowa dostawa dla zamówień powyżej 15 000 zł
                    </div>
                </div>
            `;
            
            sheetHtml = `
                <!-- Delivery Info Sheet -->
                <div class="delivery-sheet-overlay"></div>
                <div class="delivery-sheet">
                    <div style="padding: 25px 40px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                        <h4 style="margin: 0; font-size: 18px; font-weight: 700;">Dostawa Mebli</h4>
                        <button class="close-delivery-sheet" style="border: none; background: none; font-size: 30px; cursor: pointer; line-height: 1; transition: 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">&times;</button>
                    </div>
                    <div style="padding: 30px 40px; overflow-y: auto; font-size: 13px; line-height: 1.8; color: var(--secondary-text-color);">
                        <h5 style="margin: 0 0 15px 0; font-size: 14px; color: #000; text-transform: uppercase; letter-spacing: 1px;">Jak estymujemy datę?</h5>
                        <p style="margin-bottom: 25px;">Każdy z naszych mebli tworzony jest na indywidualne zamówienie w polskiej manufakturze. Czas dostawy od 14 do 26 czerwca uwzględnia proces produkcji wybranego modelu w spersonalizowanej tkaninie, dokładną kontrolę jakości (QC) oraz czas potrzebny na bezpieczny transport naszą dedykowaną flotą pojazdów.</p>
                        
                        <h5 style="margin: 0 0 15px 0; font-size: 14px; color: #000; text-transform: uppercase; letter-spacing: 1px;">Co po zamówieniu?</h5>
                        <ul style="padding-left: 20px; margin-bottom: 25px; display: flex; flex-direction: column; gap: 10px;">
                            <li><strong style="color: #000;">Potwierdzenie:</strong> Natychmiast po złożeniu i opłaceniu zamówienia, otrzymasz e-mail z podsumowaniem konfiguracji.</li>
                            <li><strong style="color: #000;">Status produkcji:</strong> Będziemy Cię informować o kluczowych etapach (np. rozpoczęcie szycia pokrowca, montaż na stelażu).</li>
                            <li><strong style="color: #000;">Kontakt przed dostawą:</strong> Na kilka dni przed planowanym transportem, nasz Dział Logistyki skontaktuje się z Tobą telefonicznie, aby umówić dogodny termin oraz dwugodzinne okno czasowe doręczenia.</li>
                        </ul>
                        
                        <div style="background: #f9f9f9; padding: 20px; border-left: 3px solid var(--accent-color);">
                            <strong style="color: #000; display: block; margin-bottom: 5px;">Wniesienie i montaż gratis</strong>
                            Nasz dwuosobowy zespół dostawców wniesie mebel do wskazanego pomieszczenia, rozpakuje go, poskręca (np. zamontuje nóżki) i zabierze ze sobą wszelkie zbędne opakowania oraz kartony.
                        </div>
                    </div>
                </div>
            `;
        }

        this.innerHTML = `
            <div class="cart-drawer-overlay"></div>
            <div class="cart-drawer">
                <div class="cart-drawer-header">
                    <span class="cd-title">Twój koszyk</span>
                    <span class="cd-close">&times;</span>
                </div>
                <div class="cart-drawer-content" style="flex: 1; display: flex; flex-direction: column; overflow-y: auto; overflow-x: hidden; width: 100%; min-height: 0;">
                    ${bodyHtml}
                </div>
                ${footerHtml}
                ${sheetHtml}
            </div>
        `;

        const closeBtn = this.querySelector('.cd-close');
        if(closeBtn) closeBtn.addEventListener('click', () => this.close());
        const overlay = this.querySelector('.cart-drawer-overlay');
        if(overlay) overlay.addEventListener('click', () => this.close());

        const accTrack = this.querySelector('.acc-track');
        const accPrev = this.querySelector('.acc-prev');
        const accNext = this.querySelector('.acc-next');

        if (accTrack && accPrev && accNext) {
            accPrev.addEventListener('click', (e) => {
                e.preventDefault();
                accTrack.scrollBy({ left: -275, behavior: 'smooth' });
            });
            accNext.addEventListener('click', (e) => {
                e.preventDefault();
                accTrack.scrollBy({ left: 275, behavior: 'smooth' });
            });
        }
        
        // Delivery Sheet Logic
        const delLink = this.querySelector('.delivery-date-link');
        const delSheet = this.querySelector('.delivery-sheet');
        const delSheetOverlay = this.querySelector('.delivery-sheet-overlay');
        const delSheetClose = this.querySelector('.close-delivery-sheet');
        
        if (delLink && delSheet && delSheetOverlay && delSheetClose) {
            delLink.addEventListener('click', () => {
                delSheet.classList.add('active');
                delSheetOverlay.classList.add('active');
            });
            
            const closeSheet = () => {
                delSheet.classList.remove('active');
                delSheetOverlay.classList.remove('active');
            };
            
            delSheetClose.addEventListener('click', closeSheet);
            delSheetOverlay.addEventListener('click', closeSheet);
        }
    }

    open() {
        this.querySelector('.cart-drawer-overlay').classList.add('active');
        this.querySelector('.cart-drawer').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.querySelector('.cart-drawer-overlay').classList.remove('active');
        this.querySelector('.cart-drawer').classList.remove('active');
        document.body.style.overflow = '';
    }
}
customElements.define('mio-cart-drawer', MioCartDrawer);

// Auto-inject cart drawer
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(document.createElement('mio-cart-drawer'));
    });
} else {
    document.body.appendChild(document.createElement('mio-cart-drawer'));
}

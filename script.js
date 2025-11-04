// ============================================
// GOOSE GAMES - INTERACTIVE FEATURES
// Updated with filtering, cookies, & analytics
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // COOKIE CONSENT
    // ============================================
    
    const cookieBanner = document.getElementById('cookie-banner');
    
    // Check if user already accepted cookies
    if (!localStorage.getItem('cookies-accepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }
    
    // ============================================
    // CATEGORY FILTERING
    // ============================================
    
    const navLinks = document.querySelectorAll('.nav-link');
    const gameCards = document.querySelectorAll('.game-card');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's not a filter link
            if (!href.startsWith('#') || href === '#leaderboard') {
                return;
            }
            
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Get category from href (e.g., #puzzle)
            const category = href.substring(1);
            
            // Filter games
            filterGames(category);
            
            // Track filter usage
            trackEvent('Filter', 'Category', category);
        });
    });
    
    // ============================================
    // CARD HOVER EFFECTS
    // ============================================
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.game-icon');
            if (icon) {
                icon.style.filter = 'drop-shadow(0 0 20px currentColor)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.game-icon');
            if (icon) {
                icon.style.filter = 'none';
            }
        });
    });
    
    // ============================================
    // PARALLAX SCROLL EFFECT
    // ============================================
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = Math.max(1 - (scrolled / 600), 0.3);
        }
    });
    
    // ============================================
    // SMOOTH SCROLL
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ============================================
    // ENTRANCE ANIMATIONS
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all game cards for entrance animation
    gameCards.forEach(card => {
        observer.observe(card);
    });
    
    // ============================================
    // LOADING ANIMATION
    // ============================================
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    console.log('🦆 GOOSE GAMES loaded! Ready to play!');
});

// ============================================
// GLOBAL FUNCTIONS
// ============================================

// Filter games by category
function filterGames(category) {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            // Show card with animation
            card.style.display = 'block';
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`;
            }, 10);
        } else {
            // Hide card
            card.style.display = 'none';
        }
    });
}

// Accept cookies
function acceptCookies() {
    localStorage.setItem('cookies-accepted', 'true');
    const banner = document.getElementById('cookie-banner');
    banner.style.animation = 'slideDown 0.5s ease-out';
    setTimeout(() => {
        banner.style.display = 'none';
    }, 500);
    
    // Track cookie acceptance
    trackEvent('Cookie', 'Accept', 'User accepted cookies');
}

// Track game clicks (Google Analytics)
function trackGameClick(gameName) {
    trackEvent('Game', 'Click', gameName);
}

// Generic event tracking for Google Analytics
function trackEvent(category, action, label) {
    if (typeof gtag === 'function') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Leaderboard game selector change
function updateLeaderboard() {
    const selector = document.getElementById('leaderboard-game');
    const game = selector.value;
    
    // Track leaderboard view
    trackEvent('Leaderboard', 'View', game);
    
    // In a real implementation, this would fetch data from a backend
    // For now, it's just placeholder data
    console.log(`Showing leaderboard for: ${game}`);
}

// Slide down animation for cookie banner
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            bottom: 20px;
            opacity: 1;
        }
        to {
            bottom: -100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// FILTER BUTTONS (INCLUDING MOBILE FILTER)
// ============================================

const filterButtons = document.querySelectorAll('.filter-btn');
const allGameCards = document.querySelectorAll('.game-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filter = button.getAttribute('data-filter');
        
        // Track filter usage
        trackEvent('Filter', 'Click', filter);
        
        // Filter games
        allGameCards.forEach(card => {
            if (filter === 'all') {
                // Show all games
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else if (filter === 'mobile') {
                // Show only mobile-friendly games
                if (card.getAttribute('data-mobile') === 'true') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            } else {
                // Show games matching the category
                const category = card.getAttribute('data-category');
                if (category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
        
        // Smooth scroll to games grid
        document.querySelector('.masonry-grid').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});


// ============================================
// GOOSE GAMES - DYNAMIC INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // CATEGORY FILTERING
    // ============================================
    
    const navLinks = document.querySelectorAll('.nav-link');
    const gameCards = document.querySelectorAll('.game-card');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Get category from href (e.g., #puzzle)
            const category = link.getAttribute('href').substring(1);
            
            // Filter games
            filterGames(category);
        });
    });
    
    function filterGames(category) {
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
    
    // ============================================
    // CARD HOVER EFFECTS
    // ============================================
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add extra glow on hover
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
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / 600);
        }
    });
    
    // ============================================
    // RANDOM CARD SHUFFLE (Poki-style)
    // ============================================
    
    function shuffleCards() {
        const grid = document.querySelector('.masonry-grid');
        if (!grid) return;
        
        const cards = Array.from(gameCards);
        
        // Only shuffle occasionally (every 30 seconds)
        setInterval(() => {
            // Pick 2 random cards to swap
            const idx1 = Math.floor(Math.random() * cards.length);
            let idx2 = Math.floor(Math.random() * cards.length);
            
            // Make sure they're different
            while (idx2 === idx1) {
                idx2 = Math.floor(Math.random() * cards.length);
            }
            
            // Swap them with animation
            const card1 = cards[idx1];
            const card2 = cards[idx2];
            
            if (card1 && card2) {
                // Add transition effect
                card1.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                card2.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // Swap in DOM
                const parent = card1.parentNode;
                const sibling = card1.nextSibling === card2 ? card1 : card1.nextSibling;
                card2.parentNode.insertBefore(card1, card2);
                parent.insertBefore(card2, sibling);
                
                // Update our reference array
                [cards[idx1], cards[idx2]] = [cards[idx2], cards[idx1]];
            }
        }, 30000); // Every 30 seconds
    }
    
    // Start shuffle effect
    shuffleCards();
    
    // ============================================
    // SMOOTH SCROLL
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
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
    // DYNAMIC NEON GLOW INTENSITY
    // ============================================
    
    const neonText = document.querySelector('.neon-text');
    const neonGlow = document.querySelector('.neon-glow');
    
    let glowIntensity = 1;
    let glowDirection = 1;
    
    function animateNeonGlow() {
        glowIntensity += 0.01 * glowDirection;
        
        if (glowIntensity >= 1.5) glowDirection = -1;
        if (glowIntensity <= 0.7) glowDirection = 1;
        
        if (neonText) {
            neonText.style.filter = `brightness(${glowIntensity})`;
        }
        if (neonGlow) {
            neonGlow.style.filter = `brightness(${glowIntensity})`;
        }
        
        requestAnimationFrame(animateNeonGlow);
    }
    
    animateNeonGlow();
    
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

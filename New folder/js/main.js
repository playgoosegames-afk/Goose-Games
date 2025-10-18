// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#about' && href !== '#safe') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.querySelector('.search-input');
const gameCards = document.querySelectorAll('.game-card');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        gameCards.forEach(card => {
            const title = card.querySelector('.game-title').textContent.toLowerCase();
            const description = card.querySelector('.game-description').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.4s ease-out';
            } else {
                card.style.display = 'none';
            }
        });

        // Show message if no results
        if (searchTerm && Array.from(gameCards).every(card => card.style.display === 'none')) {
            showNoResults();
        } else {
            hideNoResults();
        }
    });
}

function showNoResults() {
    let noResultsMsg = document.querySelector('.no-results-message');
    if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.style.cssText = 'text-align: center; padding: 60px 20px; font-size: 20px; color: #636E72;';
        noResultsMsg.innerHTML = '🦆 No games found. Try another search!';
        document.querySelector('.section').appendChild(noResultsMsg);
    }
}

function hideNoResults() {
    const noResultsMsg = document.querySelector('.no-results-message');
    if (noResultsMsg) {
        noResultsMsg.remove();
    }
}

// ===== ANIMATE ON SCROLL =====
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

// Observe all game cards
document.querySelectorAll('.game-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== HEADER SHADOW ON SCROLL =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.12)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    }
    
    lastScroll = currentScroll;
});

// ===== PREVENT FORM SUBMISSION (SEARCH) =====
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
}

// ===== ADD LOADING STATE TO GAME LINKS =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.getAttribute('href').startsWith('games/')) {
            btn.innerHTML = 'Loading... ⏳';
            btn.style.pointerEvents = 'none';
        }
    });
});

console.log('🦆 Goose Games loaded successfully!');

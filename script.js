// DOM Elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const quoteCount = document.getElementById('quote-count');
const sourceIndicator = document.getElementById('source-indicator');

// State
let quotes = [];
let quoteCounter = 0;
let isFirstLoad = true;

// Show Loading
function showLoading() {
    loader.classList.remove('hidden');
    quoteContainer.style.opacity = '0.5';
    twitterBtn.disabled = true;
    newQuoteBtn.disabled = true;
}

// Hide Loading
function hideLoading() {
    loader.classList.add('hidden');
    quoteContainer.style.opacity = '1';
    twitterBtn.disabled = false;
    newQuoteBtn.disabled = false;
}

// Initialize quotes - ONLY USE LOCAL QUOTES
function initQuotes() {
    showLoading();
    
    // Use local quotes
    quotes = window.localQuotes || [];
    
    if (quotes.length === 0) {
        console.error('No quotes found!');
        quotes = [
            {
                text: "Error: No quotes available. Please check your quotes.js file.",
                author: "System"
            }
        ];
    }
    
    console.log('Initialized with', quotes.length, 'quotes');
    
    // Show first quote after short delay
    setTimeout(() => {
        showNewQuote();
        isFirstLoad = false;
    }, 800); // Show loading for at least 800ms for better UX
}

// Show New Quote
function showNewQuote() {
    if (quotes.length === 0) {
        quoteText.textContent = 'No quotes available.';
        authorText.textContent = 'System';
        hideLoading();
        return;
    }
    
    // Pick a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    // Update quote text
    quoteText.textContent = quote.text;
    
    // Update author
    authorText.textContent = quote.author || 'Unknown';
    
    // Adjust font size for long quotes
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    
    // Update counter
    quoteCounter++;
    quoteCount.textContent = `${quoteCounter} ${quoteCounter === 1 ? 'quote' : 'quotes'} displayed`;
    
    // Update source indicator
    sourceIndicator.innerHTML = '<i class="fas fa-database"></i> Local (' + quotes.length + ' quotes)';
    
    // Reset animation
    quoteContainer.style.animation = 'none';
    setTimeout(() => {
        quoteContainer.style.animation = 'slideUp 0.8s ease';
    }, 10);
    
    // Hide loading
    hideLoading();
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text="${encodeURIComponent(quoteText.textContent)}" - ${encodeURIComponent(authorText.textContent)}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', () => {
    showLoading();
    setTimeout(showNewQuote, 300); // Small delay for better UX
});

twitterBtn.addEventListener('click', tweetQuote);

// Add click animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing quote generator...');
    
    // Start with a short delay to ensure quotes.js is loaded
    setTimeout(() => {
        initQuotes();
    }, 100);
});

// Fallback in case quotes.js doesn't load
window.addEventListener('load', () => {
    if (quotes.length === 0) {
        console.log('Quotes not loaded yet, using fallback...');
        setTimeout(() => {
            if (quotes.length === 0) {
                quotes = [
                    {
                        text: "Welcome to Quote Generator! Please check if quotes.js is loaded correctly.",
                        author: "System"
                    },
                    {
                        text: "The journey of a thousand miles begins with one step.",
                        author: "Lao Tzu"
                    },
                    {
                        text: "Life is what happens to you while you're busy making other plans.",
                        author: "Allen Saunders"
                    }
                ];
                showNewQuote();
            }
        }, 2000);
    }
});
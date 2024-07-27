// Existing quotes array
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Function to show a notification
function showNotification(message, type) {
    const notificationContainer = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;
    notificationContainer.appendChild(notification);

    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Function to display a random quote
function displayRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById('quoteDisplay').innerText = 'No quotes available.';
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerText = `"${quote.text}" - ${quote.category}`;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText.trim() === '' || newQuoteCategory.trim() === '') {
        showNotification('Quote text and category cannot be empty.', 'error');
        return;
    }

    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();
    displayRandomQuote();
    populateCategories(); // Update categories dropdown
    showNotification('Quote added successfully!', 'success');
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        displayRandomQuote();
        populateCategories(); // Update categories dropdown
        showNotification('Quotes imported successfully!', 'success');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Function to export quotes to a JSON file
function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://api.example.com/quotes');
        if (!response.ok) throw new Error('Network response was not ok');
        const serverQuotes = await response.json();
        // Implement conflict resolution if needed
        quotes = serverQuotes;
        saveQuotes();
        displayRandomQuote();
        showNotification('Quotes synced with server!', 'success');
    } catch (error) {
        showNotification(`Error fetching quotes: ${error.message}`, 'error');
    }
}

// Function to sync quotes with the server
async function syncQuotes() {
    try {
        const response = await fetch('https://api.example.com/quotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quotes)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        showNotification('Quotes successfully synced with server!', 'success');
    } catch (error) {
        showNotification(`Error syncing quotes: ${error.message}`, 'error');
    }
}

// Function to filter quotes based on category
function filterQuotes() {
    const category = document.getElementById('categoryFilter').value;
    const filteredQuotes = quotes.filter(quote => category === 'all' || quote.category === category);
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';

    if (filteredQuotes.length === 0) {
        quoteDisplay.innerText = 'No quotes available for this category.';
    } else {
        filteredQuotes.forEach(quote => {
            const quoteElement = document.createElement('div');
            quoteElement.innerText = `"${quote.text}" - ${quote.category}`;
            quoteDisplay.appendChild(quoteElement);
        });
    }
}

// Function to populate categories
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.innerText = category;
        categoryFilter.appendChild(option);
    });
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', addQuote);
document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);
document.getElementById('categoryFilter').addEventListener('change', filterQuotes);

// Sync quotes periodically
setInterval(syncQuotes, 60000); // Sync every minute

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    displayRandomQuote();
    // Optionally, you can fetch quotes from the server on initial load
    // fetchQuotesFromServer();
});


  
  
  
  
  
  
  
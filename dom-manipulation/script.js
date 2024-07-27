document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const exportButton = document.getElementById('exportQuotes');
    const importFileInput = document.getElementById('importFile');
    const categoryFilter = document.getElementById('categoryFilter');
    const notificationContainer = document.getElementById('notificationContainer'); // Notification container
  
    let quotes = [];
    let categories = new Set();
    const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API URL for fetching
    const POST_API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API URL for posting
    const SYNC_INTERVAL = 60000; // 60 seconds
  
    function showNotification(message, type = 'info') {
      // Create a notification element
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.textContent = message;
  
      // Append notification to container
      notificationContainer.innerHTML = ''; // Clear previous notifications
      notificationContainer.appendChild(notification);
  
      // Remove notification after 5 seconds
      setTimeout(() => {
        notificationContainer.removeChild(notification);
      }, 5000);
    }
  
    function loadQuotes() {
      const storedQuotes = localStorage.getItem('quotes');
      if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
        categories = new Set(quotes.map(quote => quote.category));
      } else {
        quotes = [];
        categories = new Set();
      }
      populateCategories();
      showFilteredQuotes();
      syncQuotes(); // Sync with server on load
  
      // Set up periodic syncing
      setInterval(syncQuotes, SYNC_INTERVAL);
    }
  
    function saveQuotes() {
      localStorage.setItem('quotes', JSON.stringify(quotes));
    }
  
    function populateCategories() {
      categoryFilter.innerHTML = '<option value="all">All Categories</option>';
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
      });
    }
  
    function showFilteredQuotes() {
      const selectedCategory = categoryFilter.value;
      const filteredQuotes = selectedCategory === 'all'
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);
  
      if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = '<p>No quotes available for this category.</p>';
        return;
      }
  
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const quote = filteredQuotes[randomIndex];
      quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>Category: ${quote.category}</em></p>`;
    }
  
    async function addQuote() {
      const quoteText = document.getElementById('newQuoteText').value.trim();
      const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
      if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        categories.add(quoteCategory);
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        saveQuotes();
        populateCategories();
        showFilteredQuotes();
        showNotification('Quote added successfully!', 'success');
  
        // Post the new quote to the server
        await postQuoteToServer(newQuote);
      } else {
        showNotification('Please enter both a quote and a category.', 'error');
      }
    }
  
    async function postQuoteToServer(quote) {
      try {
        const response = await fetch(POST_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(quote)
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log('Quote posted to server:', responseData);
        } else {
          console.error('Error posting quote to server:', response.statusText);
        }
      } catch (error) {
        console.error('Error posting quote to server:', error);
      }
    }
  
    async function fetchQuotesFromServer() {
      try {
        const response = await fetch(API_URL);
        const serverQuotes = await response.json();
  
        // Simple conflict resolution: server data takes precedence
        quotes = serverQuotes.map(quote => ({
          text: quote.title, // Mock API does not have a "text" field, using "title" instead
          category: quote.userId // Mock API does not have a "category" field, using "userId" instead
        }));
        categories = new Set(quotes.map(quote => quote.category));
        saveQuotes();
        populateCategories();
        showFilteredQuotes();
        showNotification('Quotes synced with server!', 'info');
      } catch (error) {
        console.error('Error syncing with server:', error);
      }
    }
  
    async function syncQuotes() {
      await fetchQuotesFromServer();
    }
  
    function exportQuotes() {
      const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quotes.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showNotification('Quotes exported successfully!', 'success');
    }
  
    function importFromJsonFile(event) {
      const fileReader = new FileReader();
      fileReader.onload = function(event) {
        try {
          const importedQuotes = JSON.parse(event.target.result);
          if (Array.isArray(importedQuotes)) {
            quotes = importedQuotes;
            categories = new Set(quotes.map(quote => quote.category));
            saveQuotes();
            populateCategories();
            showFilteredQuotes();
            showNotification('Quotes imported successfully!', 'success');
          } else {
            showNotification('Invalid file format.', 'error');
          }
        } catch (error) {
          showNotification('Error importing quotes: ' + error.message, 'error');
        }
      };
      fileReader.readAsText(event.target.files[0]);
    }
  
    function filterQuotes() {
      showFilteredQuotes();
    }
  
    // Event listeners
    newQuoteButton.addEventListener('click', addQuote);
    exportButton.addEventListener('click', exportQuotes);
    importFileInput.addEventListener('change', importFromJsonFile);
    categoryFilter.addEventListener('change', filterQuotes);
  
    loadQuotes();
  });
  
  
  
  
  
  
  
  
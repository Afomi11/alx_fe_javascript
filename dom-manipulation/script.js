document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const exportButton = document.getElementById('exportQuotes');
    const importFileInput = document.getElementById('importFile');
    const categoryFilter = document.getElementById('categoryFilter');
  
    let quotes = [];
    let categories = new Set();
    const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API URL
  
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
      syncWithServer(); // Sync with server on load
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
  
    function addQuote() {
      const quoteText = document.getElementById('newQuoteText').value.trim();
      const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
      if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory });
        categories.add(quoteCategory);
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        saveQuotes();
        populateCategories();
        showFilteredQuotes();
        alert('Quote added successfully!');
      } else {
        alert('Please enter both a quote and a category.');
      }
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
            alert('Quotes imported successfully!');
          } else {
            alert('Invalid file format.');
          }
        } catch (error) {
          alert('Error importing quotes: ' + error.message);
        }
      };
      fileReader.readAsText(event.target.files[0]);
    }
  
    function filterQuotes() {
      showFilteredQuotes();
    }
  
    function syncWithServer() {
      fetch(API_URL)
        .then(response => response.json())
        .then(serverQuotes => {
          // Simple conflict resolution: server data takes precedence
          quotes = serverQuotes.map(quote => ({
            text: quote.title, // Mock API does not have a "text" field, using "title" instead
            category: quote.userId // Mock API does not have a "category" field, using "userId" instead
          }));
          categories = new Set(quotes.map(quote => quote.category));
          saveQuotes();
          populateCategories();
          showFilteredQuotes();
          alert('Data synchronized with server!');
        })
        .catch(error => console.error('Error syncing with server:', error));
    }
  
    // Event listeners
    newQuoteButton.addEventListener('click', showFilteredQuotes);
    exportButton.addEventListener('click', exportQuotes);
    importFileInput.addEventListener('change', importFromJsonFile);
    categoryFilter.addEventListener('change', filterQuotes);
  
    loadQuotes();
  });
  

  
  
  
  
  
  
  
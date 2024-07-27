document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const exportButton = document.getElementById('exportQuotes');
    const importFileInput = document.getElementById('importFile');
    const categoryFilter = document.getElementById('categoryFilter');
  
    let quotes = [];
    let categories = new Set();
  
    // Function to load quotes from local storage
    function loadQuotes() {
      const storedQuotes = localStorage.getItem('quotes');
      if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
        categories = new Set(quotes.map(quote => quote.category));
      } else {
        quotes = [
          { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
          { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", category: "Motivation" },
          { text: "Great minds discuss ideas; average minds discuss events; small minds discuss people.", category: "Wisdom" }
        ];
        categories = new Set(quotes.map(quote => quote.category));
        saveQuotes();
      }
      populateCategories();
      showFilteredQuotes();
    }
  
    // Function to save quotes to local storage
    function saveQuotes() {
      localStorage.setItem('quotes', JSON.stringify(quotes));
    }
  
    // Function to populate the category filter dropdown
    function populateCategories() {
      categoryFilter.innerHTML = '<option value="all">All Categories</option>';
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
      });
    }
  
    // Function to display quotes based on the selected category
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
  
    // Function to add a new quote
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
  
    // Function to export quotes to a JSON file
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
  
    // Function to import quotes from a JSON file
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
            showFilteredQuotes(); // Optional: Show a random quote after importing
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
  
    // Event listeners
    newQuoteButton.addEventListener('click', showFilteredQuotes);
    exportButton.addEventListener('click', exportQuotes);
    importFileInput.addEventListener('change', importFromJsonFile);
    categoryFilter.addEventListener('change', showFilteredQuotes);
  
    // Load quotes from local storage and show filtered quotes
    loadQuotes();
  });
  
  
  
  
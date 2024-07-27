document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const exportButton = document.getElementById('exportQuotes');
    const importFileInput = document.getElementById('importFile');
  
    // Array to hold quote objects
    let quotes = [];
  
    // Function to load quotes from local storage
    function loadQuotes() {
      const storedQuotes = localStorage.getItem('quotes');
      if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
      } else {
        // Initialize with some default quotes if none are found
        quotes = [
          { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
          { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", category: "Motivation" },
          { text: "Great minds discuss ideas; average minds discuss events; small minds discuss people.", category: "Wisdom" }
        ];
        saveQuotes();
      }
    }
  
    // Function to save quotes to local storage
    function saveQuotes() {
      localStorage.setItem('quotes', JSON.stringify(quotes));
    }
  
    // Function to display a random quote
    function showRandomQuote() {
      if (quotes.length === 0) return;
  
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>Category: ${quote.category}</em></p>`;
  
      // Store the last viewed quote index in session storage
      sessionStorage.setItem('lastViewedQuoteIndex', randomIndex);
    }
  
    // Function to add a new quote
    function addQuote() {
      const quoteText = document.getElementById('newQuoteText').value.trim();
      const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
      if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory });
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        saveQuotes();
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
            saveQuotes();
            alert('Quotes imported successfully!');
            showRandomQuote(); // Optional: Show a random quote after importing
          } else {
            alert('Invalid file format.');
          }
        } catch (error) {
          alert('Error importing quotes: ' + error.message);
        }
      };
      fileReader.readAsText(event.target.files[0]);
    }
  
    // Create and append the add quote form
    function createAddQuoteForm() {
      const formContainer = document.createElement('div');
      
      const quoteInput = document.createElement('input');
      quoteInput.id = 'newQuoteText';
      quoteInput.type = 'text';
      quoteInput.placeholder = 'Enter a new quote';
  
      const categoryInput = document.createElement('input');
      categoryInput.id = 'newQuoteCategory';
      categoryInput.type = 'text';
      categoryInput.placeholder = 'Enter quote category';
  
      const addButton = document.createElement('button');
      addButton.id = 'addQuote';
      addButton.textContent = 'Add Quote';
  
      formContainer.appendChild(quoteInput);
      formContainer.appendChild(categoryInput);
      formContainer.appendChild(addButton);
  
      document.body.appendChild(formContainer);
  
      addButton.addEventListener('click', addQuote);
    }
  
    // Event listeners
    newQuoteButton.addEventListener('click', showRandomQuote);
    exportButton.addEventListener('click', exportQuotes);
    importFileInput.addEventListener('change', importFromJsonFile);
  
    // Load quotes from local storage and show a random quote
    loadQuotes();
    showRandomQuote();
    createAddQuoteForm(); // Ensure the form is created
  });
  
  
  
  
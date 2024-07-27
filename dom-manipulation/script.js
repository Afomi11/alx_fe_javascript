document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
    const categoryFilter = document.getElementById('categoryFilter');
  
    // Quotes array with objects containing text and category properties
    let quotes = [
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
      { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", category: "Motivation" },
      { text: "Great minds discuss ideas; average minds discuss events; small minds discuss people.", category: "Wisdom" }
    ];
  
    // Function to display a random quote
    function showRandomQuote() {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>Category: ${quote.category}</em></p>`;
    }
  
    // Function to add a new quote
    function addQuote() {
      const quoteText = newQuoteText.value.trim();
      const quoteCategory = newQuoteCategory.value.trim();
  
      if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory });
        newQuoteText.value = '';
        newQuoteCategory.value = '';
        alert('Quote added successfully!');
        showRandomQuote(); // Display a new quote after adding one
      } else {
        alert('Please enter both a quote and a category.');
      }
    }
  
    // Function to filter quotes by category
    function filterQuotes(category) {
      const filteredQuotes = quotes.filter(quote => quote.category === category);
      if (filteredQuotes.length > 0) {
        // Display filtered quotes or a random quote from filtered quotes
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const quote = filteredQuotes[randomIndex];
        quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>Category: ${quote.category}</em></p>`;
      } else {
        quoteDisplay.textContent = 'No quotes found for this category.';
      }
    }
  
    // Populate category filter options
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
    uniqueCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.text = category;
      categoryFilter.appendChild(option);
    });
  
    // Event listeners
    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);
    categoryFilter.addEventListener('change', () => filterQuotes(categoryFilter.value));
  
    // Display an initial random quote
    showRandomQuote();
  });
  
  
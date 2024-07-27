document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
  
    // Array to hold quote objects
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
      } else {
        alert('Please enter both a quote and a category.');
      }
    }
  
    // Function to create and append the add quote form
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
  
    // Create the add quote form
    createAddQuoteForm();
  
    // Display an initial random quote
    showRandomQuote();
  });
  
  
  
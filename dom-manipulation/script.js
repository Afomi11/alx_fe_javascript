document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
  
    // 2. Quotes array with objects containing text and category properties
    let quotes = [
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
      { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", category: "Motivation" },
      { text: "Great minds discuss ideas; average minds discuss events; small minds discuss people.", category: "Wisdom" }
    ];
  
    // 3. displayRandomQuote function
    function showRandomQuote() {
      // 4. Logic to select a random quote and update the DOM
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>Category: ${quote.category}</em></p>`;
    }
  
    // 5. addQuote function
    function addQuote() {
      // 6. Logic to add a new quote to the quotes array and update the DOM
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
  
    // 7. Event listener on the “Show New Quote” button
    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);
  
    // Display an initial random quote
    showRandomQuote();
  });
  
  
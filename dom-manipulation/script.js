const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');

const quotes = [
  { text: 'Quote 1', category: 'Category A' },
  { text: 'Quote 2', category: 'Category B' },
  // ... more quotes
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = randomQuote.text;
}

function displayQuote(quote) {
  quoteDisplay.textContent = quote.text;
}

function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    displayQuote(newQuote); // Display the newly added quote
  }
}

newQuoteButton.addEventListener('click', showRandomQuote);

  
  
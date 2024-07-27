document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const exportButton = document.getElementById('exportQuotes');
    const importFileInput = document.getElementById('importFile');

    // Array to hold quote objects
    let quotes = [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
        { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", category: "Motivation" },
        { text: "Great minds discuss ideas; average minds discuss events; small minds discuss people.", category: "Wisdom" }
    ];

    // Load quotes from local storage
    function loadQuotes() {
        const savedQuotes = localStorage.getItem('quotes');
        if (savedQuotes) {
            quotes = JSON.parse(savedQuotes);
        }
    }

    // Save quotes to local storage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    // Function to display a random quote
    function showRandomQuote() {
        if (quotes.length === 0) {
            quoteDisplay.innerHTML = '<p>No quotes available.</p>';
            return;
        }
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>Category: ${quote.category}</em></p>`;
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
    }

    // Function to add a new quote
    function addQuote() {
        const quoteText = document.getElementById('newQuoteText').value.trim();
        const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

        if (quoteText && quoteCategory) {
            quotes.push({ text: quoteText, category: quoteCategory });
            document.getElementById('newQuoteText').value = '';
            document.getElementById('newQuoteCategory').value = '';
            saveQuotes();  // Save quotes to local storage
            alert('Quote added successfully!');
        } else {
            alert('Please enter both a quote and a category.');
        }
    }

    // Function to export quotes to JSON file
    function exportToJson() {
        const dataStr = JSON.stringify(quotes, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'quotes.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Function to import quotes from JSON file
    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            try {
                const importedQuotes = JSON.parse(event.target.result);
                if (Array.isArray(importedQuotes)) {
                    quotes = importedQuotes;
                    saveQuotes();  // Save the imported quotes to local storage
                    showRandomQuote();  // Display a random quote after import
                    alert('Quotes imported successfully!');
                } else {
                    alert('Invalid JSON format.');
                }
            } catch (error) {
                alert('Error parsing JSON file.');
            }
        };
        fileReader.readAsText(event.target.files[0]);
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
    exportButton.addEventListener('click', exportToJson);
    importFileInput.addEventListener('change', importFromJsonFile);

    // Create the add quote form
    createAddQuoteForm();

    // Load quotes from local storage and display an initial random quote
    loadQuotes();
    showRandomQuote();
});

  
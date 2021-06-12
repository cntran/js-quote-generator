const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote'); 

function QuoteRepository(type) {
  this.type = type;
  this.quotes = this.getQuotes(type);
}

QuoteRepository.prototype.getQuotes = (type) => {    
  switch (type) {
    case 'remote':
      this.quotes = getRemoteQuotes();
      break;
    default:
      this.quotes = getLocalQuotes();
  }
}

QuoteRepository.prototype.getQuote = () => {
  // Pick a random quote from apiQuotes array
  const randomIndex = Math.floor(Math.random() * this.quotes.length);
  const randomQuote = this.quotes[randomIndex];
  displayQuote(randomQuote);  
}

// TODO: Get Quotes From API (remote) 
async function getRemoteQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';  
  try {
    const response = await fetch(apiUrl);
    const quotes = await response.json();
    console.log(quotes);
    return quotes;
  } catch (error) {
    // Catch error here
    return [];
  }
}

// Get Quotes locally
function getLocalQuotes() {
  return localQuotes;
}

function displayQuote(quote) {
  let text = (quote.text ? quote.text : "unknown");
  let author = (quote.author ? quote.author : "unknown");   
  quoteText.textContent = text;
  authorText.textContent = author;

  if (quote.text.length > 50) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load:
const quoteRepository = new QuoteRepository('local');
quoteRepository.getQuote();

// Get new quote
function newQuote() {
  quoteRepository.getQuote();
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}
import { useState, useEffect } from 'react';
import './App.css';
import { FaTwitter, FaQuoteLeft, FaQuoteRight, FaFacebookF } from 'react-icons/fa';

interface Quote {
  quote: string;
  author: string;
}

const getRandomQuote = (quotes: Quote[]): Quote => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

const getRandomColor = (): string => {
  const rouge = Math.floor(Math.random() * 128);
  const bleu = Math.floor(Math.random() * 128);
  const vert = Math.floor(Math.random() * 128);

  return `rgb(${rouge}, ${vert},${bleu})`;
};

const transition = 'all 1s';

function App() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quote, setQuote] = useState<Quote>({ quote: '', author: '' });
  const [color, setColor] = useState<string>(getRandomColor());

  useEffect(() => {
    const fetchQuotesData = async () => {
      try {
        const response = await fetch(
          'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
        );
        const data = await response.json();
        let quote = [];
        quote = data.quotes
        setQuotes(quote); 
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error);
      }
    };
    fetchQuotesData();
  }, []);
  
  

  useEffect(() => {
    // We check if quotes is not empty to avoid errors when trying to get a random quote
    if (quotes.length > 0) {
      setQuote(getRandomQuote(quotes));
      setColor(getRandomColor());
    }
  }, [quotes]);

  const changeQuote = () => {
    setQuote(getRandomQuote(quotes));
    setColor(getRandomColor());
  };

  return (
    <>
      <div className='background' style={{ backgroundColor: color, transition: transition }}>
        <div id='quote-box'>
          <div className='quote-content' style={{ color: color, transition: transition }}>
            <h2 id='text'>
              <FaQuoteLeft size='30' style={{ marginRight: '10px' }} />
              {quote.quote}
              <FaQuoteRight size='30' style={{ marginLeft: '10px' }} />
            </h2>
            <h4 id='author'>- {quote.author}</h4>
          </div>
          <div className='buttons'>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.quote}" - ${quote.author}"`)}`}
              id='tweet-quote'
              style={{
                backgroundColor: color,
                marginRight: '10px',
                transition: transition,
              }}
            >
              <FaTwitter color='white' />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`"${quote.quote}" - ${quote.author}"`)}`}
              id='facebook-share'
              style={{
                backgroundColor: color,
                marginRight: '10px',
                transition: transition,
              }}
            >
              <FaFacebookF color='white' />
            </a>
            {/* Bouton WhatsApp */}
            {/* <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`"${quote.quote}" - ${quote.author}"`)}`}
              id='whatsapp-share'
              style={{
                backgroundColor: color,
                marginRight: '10px',
                transition: transition,
              }}
            >
              WhatsApp
            </a> */}
            <button
              id='new-quote'
              onClick={changeQuote}
              style={{
                backgroundColor: color,
                color: 'white',
                transition: transition,
              }}
            >
              Change Quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

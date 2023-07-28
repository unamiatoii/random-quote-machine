import { useState } from 'react'
import './App.css'
import quotes from "./assets/quotes.json"
import { FaTwitter, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
interface Quote {
  quote: string;
  author: string;
}

const getRandomQuote = (): Quote => {

  return quotes[Math.floor(Math.random() * quotes.length)];
}

const getRandomColor = (): string => {
  const rouge = Math.floor(Math.random() * 128);
  const bleu = Math.floor(Math.random() * 128);
  const vert = Math.floor(Math.random() * 128);

  return `rgb(${rouge}, ${vert},${bleu})`;
}

const transition = "all 1s";

function App() {
  const [quote, setQuote] = useState<Quote>(getRandomQuote())
  const [color, setColor] = useState<string>(getRandomColor());

  const changeQuote = () => {
    setQuote(getRandomQuote());
    setColor(getRandomColor());
  }

  return (
    <>
      <div className='background' style={{ backgroundColor: color , transition: transition}}>
        <div id="quote-box" >
          <div className='quote-content' style={{ color: color , transition: transition}}>


            <h2 id='text'>

              <FaQuoteLeft size='30' style={{ marginRight: "10px" }} />
              {quote.quote}

              <FaQuoteRight size='30' style={{ marginLeft: "10px" }} />

            </h2>
            <h4 id='author'>
              - {quote.author}
            </h4>
          </div>
          <div className='buttons'>
            <a
              href=""
              id='tweet-quote'
              style={{
                backgroundColor: color,
                marginRight: "10px",
                transition: transition
              }}
            >
              <FaTwitter color="white" />
            </a>
            <button id='new-quote' onClick={changeQuote} style={{ backgroundColor: color, color: "white",transition: transition }}> Change Quote</button>

          </div>
        </div>

      </div>
    </>
  )
}

export default App

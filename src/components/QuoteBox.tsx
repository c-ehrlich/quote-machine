import { useEffect, useState } from "react";
import styled from "styled-components";

interface Quote {
  quote: string;
  author: string;
}

const StyledQuoteBox = styled.div`
  width: 600px;
  max-width: 90%;
  height: 300px;
  background-color: #ddd;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

interface Props {}

const QuoteBox = (props: Props) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [haveData, setHaveData] = useState<boolean>(false);
  const [activeQuoteNumber, setActiveQuoteNumber] = useState<number>(0);

  const getData = async () => {
    try {
      const res = await fetch(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      );
      const data = await res.json();
      console.log(data.quotes[0].quote);
      console.log(data.quotes[0].author);
      setQuotes(data.quotes);
    } catch (err) {
      console.log(err);
    }
  };

  const getNewQuote = (): void => {
    if (!haveData) getData();

    let randomNum: number = activeQuoteNumber;
    if (quotes.length > 0) {
      while (randomNum === activeQuoteNumber) {
        console.log("generating random number");
        randomNum = Math.floor(Math.random() * quotes.length);
        console.log(`quotes length: ${quotes.length} random number: ${randomNum}`)
      }
      setActiveQuoteNumber(randomNum);
      setHaveData(true);
    } else {
      console.log("error fetching quotes");
    }
  };

  useEffect(() => {
    getData().then(() => getNewQuote());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledQuoteBox id="quote-box">
      <div>Note: this is incredibly low effort. Absolutely not a portfolio project!</div>
      {quotes.length !== 0 && activeQuoteNumber <= quotes.length
        ? <div>
          <div id="text">{quotes[activeQuoteNumber].quote}</div>
          <div id="author">- {quotes[activeQuoteNumber].author}</div>
        </div>
        : <div>Error fetching quotes</div>}
      <button id="new-quote" onClick={getNewQuote}>New Quote</button>
      {quotes.length !== 0 && <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text="${quotes[activeQuoteNumber].quote}" -${quotes[activeQuoteNumber].author}&url=https://github.com/c-ehrlich`}>Tweet</a>}
    </StyledQuoteBox>
  );
};

export default QuoteBox;

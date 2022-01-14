import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";

interface Quote {
  quote: string;
  author: string;
}

const StyledQuoteBox = styled.div`
  width: 600px;
  max-width: 90%;
  // min-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 1em;

  border-radius: 30px;
  background: #e6e6e6;
  box-shadow: 10px 10px 22px rgba(0, 0, 0, 0.2),
    -10px -10px 22px rgba(255, 255, 255, 0.75);
  padding: 30px;
`;

const QuoteText = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 24px;
`;

const QuoteAuthor = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 16px;
  text-align: right;
`;

const neomorphicButton = css`
  padding: 8px;
  font-family: "Lato", sans-serif;

  font-size: 18px;
  font-weight: 400;
  border-radius: 25px;
  border: none;
  background-color: #e6e6e6;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
  transition: all 0.4s;
  box-shadow: 10px 10px 22px rgba(0, 0, 0, 0.2),
    -10px -10px 22px rgba(255, 255, 255, 0.75);
  padding: 8px 16px;

  &:active {
    box-shadow: inset 5px 5px 11px rgba(0, 0, 0, 0.2),
      inset -5px -5px 11px rgba(255, 255, 255, 0.75);
  }
`;

const TweetButton = styled.button`
  ${neomorphicButton}
`;
const RefreshButton = styled.button`
  ${neomorphicButton}
  color: #3db166;
`;

const GapRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
`;

const GapColumn = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
`;

const GappedFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

interface Quote {
  quote: string;
  author: string;
}

interface QuoteList {
  quotes: Quote[];
}

const QuoteBox = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [haveData, setHaveData] = useState<boolean>(false);
  const [activeQuoteNumber, setActiveQuoteNumber] = useState<number>(0);
  const quoteBox = useRef<HTMLDivElement>(null);

  const getData = async () => {
    try {
      const res: Response = await fetch(
        "https://gist.githubusercontent.com/c-ehrlich/01142ae126f7eaf4eea353e0a2c9a87e/raw/366807970431d54ce0186b3cdf8f531e924fca7d/quotes.json"
      );
      const data: QuoteList = await res.json();
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
        console.log(
          `quotes length: ${quotes.length} random number: ${randomNum}`
        );
      }
      setActiveQuoteNumber(randomNum);
      setHaveData(true);

      quoteBox.current!.classList.add("collapsed");
      quoteBox.current!.classList.remove("collapsed");
    } else {
      console.log("error fetching quotes");
    }
  };

  useEffect(() => {
    getData().then(() => getNewQuote());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledQuoteBox id="quote-box" ref={quoteBox}>
      <GapColumn>
        {quotes.length !== 0 && activeQuoteNumber <= quotes.length ? (
          <GappedFlexColumn>
            <QuoteText id="text">{quotes[activeQuoteNumber].quote}</QuoteText>
            <QuoteAuthor id="author">
              - {quotes[activeQuoteNumber].author}
            </QuoteAuthor>
          </GappedFlexColumn>
        ) : (
          <div>Error fetching quotes</div>
        )}
        <GapRow>
          {quotes.length !== 0 && (
            <TweetButton
              id="tweet-quote"
              onClick={() => {window.location.href = `https://twitter.com/intent/tweet?text="${quotes[activeQuoteNumber].quote}" -${quotes[activeQuoteNumber].author}&url=https://github.com/c-ehrlich`;}}
              // href={`https://twitter.com/intent/tweet?text="${quotes[activeQuoteNumber].quote}" -${quotes[activeQuoteNumber].author}&url=https://github.com/c-ehrlich`}
            >
              <FontAwesomeIcon icon={faTwitterSquare} color="#1DA1F2" />
              &nbsp;Tweet
            </TweetButton>
          )}
          <RefreshButton id="new-quote" onClick={getNewQuote}>
            <FontAwesomeIcon icon={faRedoAlt} color="#3db166" />
            &nbsp;New Quote
          </RefreshButton>
        </GapRow>
      </GapColumn>
    </StyledQuoteBox>
  );
};

export default QuoteBox;

import React from 'react';
import './App.css';
import styled from 'styled-components';
import QuoteBox from './components/QuoteBox';

const StyledApp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <StyledApp className="App">
      <QuoteBox />
    </StyledApp>
  );
}

export default App;

import React, {useState, useRef} from 'react';
import './App.css';

function App() {
  const [readyForNewInput, setReadyForNewInput] = useState(true)
  const [a, setA] = useState(null); // update the base number
  const [b, setB] = useState(0);    // update the shown number (the number in the input field)
  const [sign, setSign] = useState('');

  function calculate() {

    let result;
    if (sign === '+') {
      result = Number(a) + Number(b)
    } else if (sign === '-') {
      result = Number(a) - Number(b)
    } else if (sign === '*') {
      result = Number(a) * Number(b)
    } else if (sign === '/') {
      result = Number(a) / Number(b)
    }
    setA(result)
    setB(result) 
  }

  function handleKeydownVal(e) {
    const keyList = '1234567890.+-*/='
    
    // key not available pressed
    if(keyList.indexOf(e.key) === -1){ console.log('key out of scope pressed')
      return
    }

    // a digit key pressed
    if(keyList.indexOf(e.key) >=0 && keyList.indexOf(e.key) < 10) {
      if(readyForNewInput === true) { // When typed at the starting point
        setReadyForNewInput(false)
        setB(e.key)
      } else {
        setB(b + e.key)  // When typed after a previous type
      }
    }
    // a sign key pressed (+, -, *, /)
    if(keyList.indexOf(e.key) > 10) {
      if (a === null && !readyForNewInput) { // a(onto which calculation will be applied) is not set up, b(new input) is ready, and some sign has been pressed
        setA(b) 
        setSign(e.key) 
        setReadyForNewInput(true);
        console.log('no calculator yet. wait for the other half')
      } else if (a !== null && readyForNewInput) { // a is ready, b has been filled out, and sign has been pressed
        setSign(e.key)
        console.log('lets update sign')
      } else if (a !== null && !readyForNewInput) { // a is ready, b has been filled out, and sign has been pressed
        calculate()
        setReadyForNewInput(true);
      }
    }

    // an output key pressed (=)
    if(e.key === '=' || e.key === 'Enter') {
      calculate()
      setReadyForNewInput(true);
    }

  }

  return (
    <div className="App">
      <div>
        <input type="text" value={b} autoFocus onKeyDown={handleKeydownVal} />
      </div>
      <div>
        <button>add</button>
        <button>minus</button>
        <button>multiply</button>
        <button>divide</button>
      </div>
      <div>
        <button>0</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>.</button>
        <button>AC</button>
      </div>
      <div>
        <button>=</button>
      </div>
    </div>
  );

  
}

export default App;

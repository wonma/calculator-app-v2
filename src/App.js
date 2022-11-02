import React, {useState, useRef} from 'react';
import './App.css';

function App() {
  const [valueFilledIn, setValueFilledIn] = useState(false)
  const [a, setA] = useState(null); // update the base number
  const [b, setB] = useState(0);    // update the shown number (the number in the input field)
  const [displayedNum, setDisplayedNum] = useState(0);
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
    setB(0)
    setDisplayedNum(result)
  }

  function handleKeydownVal(e) {
    const keyList = ['1','2','3','4','5','6','7','8','9','0','.','+','-','*','/','=','Enter','Backspace']
    
    // invalid keys have been pressed
    if(keyList.indexOf(e.key) === -1){ console.log('key out of scope pressed: ' + e.key)}

    // a digit key pressed (0,1,....8,9)
    if(keyList.indexOf(e.key) >=0 && keyList.indexOf(e.key) < 10) {
      if(valueFilledIn === false) { // When typed at the starting point
        setValueFilledIn(true)
        setB(e.key)
        setDisplayedNum(e.key)
      } else {
        setB(b + e.key)  // When typed after a previous typedsf
        setDisplayedNum(b + e.key)
      }
    }
    // a sign key pressed (+, -, *, /)
    if(keyList.indexOf(e.key) >= 11 && keyList.indexOf(e.key) < 15) {
      if (a === null && valueFilledIn) { // 'a' is empty, typing of 'b' has been in process
        setA(b) 
        setSign(e.key) 
        setValueFilledIn(true);
        console.log('no calculator yet. wait for the other half')
      } else if (a !== null && !valueFilledIn) { // 'a' is ready, no typing of 'b' yet
        setSign(e.key)
        console.log('lets update sign')
      } else if (a !== null && valueFilledIn) { // both 'a' and 'b' are filled out.
        calculate()
        setValueFilledIn(true);
      }
    }

    // an output key pressed (=)
    if(e.key === '=' || e.key === 'Enter') {
      console.log('pressed key: '+ e.key)
      calculate()
      setValueFilledIn(true);
    }

    // Backspace key pressed (=)
    if(e.key === 'Backspace') {
      let str;
      if (a !== null && valueFilledIn) { // both 'a' and 'b' are filled out.
        str = a;
        const result = str.toString().substring(0, str.toString().length - 1);
        setA(result)
        setDisplayedNum(result)
      }

    }

  }

  return (
    <div className="App">
      <div>
        <input type="text" value={displayedNum} autoFocus onKeyDown={handleKeydownVal} />
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

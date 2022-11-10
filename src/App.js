import React, {useState, useRef} from 'react';
import './App.css';

function App() {
  const [a, setA] = useState(null); 
  const [b, setB] = useState(null);
  const [typingStarted, setTypingStarted] = useState(false)
  const [displayedNum, setDisplayedNum] = useState(0);
  const [sign, setSign] = useState('');
  const inputRef = useRef(null);

  function calculate(useThisNum, signKey) {
    let result;
    if (sign === '+') {
      result = Number(a) + Number(useThisNum)
    } else if (sign === '-') {
      result = Number(a) - Number(useThisNum)
    } else if (sign === '*') {
      result = Number(a) * Number(useThisNum)
    } else if (sign === '/') {
      result = Number(a) / Number(useThisNum)
    }
    setA(result)
    setB(null)
    setDisplayedNum('')
    setTypingStarted(false)
    setSign(signKey)
    console.log('Used Formula: ', a, sign, useThisNum)

  }


  function handleKeydownVal(e) {
    const keyList = ['1','2','3','4','5','6','7','8','9','0','.','+','-','*','/','=','Enter','Backspace']
    const theKeyIndex = keyList.indexOf(e.key);

    // invalid keys have been pressed
    if( theKeyIndex === -1){ console.log('key out of scope pressed: ' + e.key)}

    // a digit key pressed (0,1,....8,9)
    if(theKeyIndex >=0 && theKeyIndex < 10) {
      if (a === null) {
        if (inputRef.current.value != 0) {
          setDisplayedNum(displayedNum + e.key)
        } else if(inputRef.current.value == 0) {
          setDisplayedNum(e.key)
        }
      } else if (a !== null && typingStarted) {
        setDisplayedNum(displayedNum + e.key)
      } else if (a !== null && !typingStarted) {
        setDisplayedNum(e.key)
        setTypingStarted(true)
      }
    }

    // a sign key pressed (+, -, *, /)
    if(theKeyIndex >= 11 && theKeyIndex < 15) {
      if (!sign && inputRef.current.value) { // a: true or x, sign: x, newinput: true
        setA(inputRef.current.value) // UPDATE a AND sign
        setSign(e.key)
        setDisplayedNum('')
        setTypingStarted(false)
        console.log('A and sign are registered!')
      } else if (a !== null && sign && inputRef.current.value) { // a: true, sign: true, newinput: true (input by typing)
        calculate(inputRef.current.value, e.key) // DO CALCULATION
      } else if (a !== null && b === null) {  // a: true, sign: true or x, newinput: x
        setSign(e.key) // UPDATE sign
      }
    }

    // an output key pressed (=)
    if(e.key === '=' || e.key === 'Enter') {
      calculate(inputRef.current.value)
    }

    // Backspace key pressed
    if(e.key === 'Backspace') {
      let str = inputRef.current.value
      const result = str.toString().substring(0, str.toString().length - 1);
      setDisplayedNum(result)
    }

  }

  return (
    <div className="App">
      <div>
        <div>
          <p>a: {a}</p>
          <p>b: {b}</p>
          <p>sign: {sign}</p>
          <p>inputRef: {sign}</p>

        </div>
        <input type="text" ref={inputRef} value={displayedNum} autoFocus onKeyDown={handleKeydownVal} />
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

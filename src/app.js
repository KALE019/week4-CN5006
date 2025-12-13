import React, { useState } from 'react';
import './App.css';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState('');

  const calculate = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    if (isNaN(n1) || isNaN(n2)) {
      setResult('Please enter both numbers');
      return;
    }

    let res;
    switch (operator) {
      case '+': res = n1 + n2; break;
      case '-': res = n1 - n2; break;
      case '*': res = n1 * n2; break;
      case '/': res = n2 !== 0 ? n1 / n2 : 'Cannot divide by zero'; break;
      default: res = 'Invalid Operation';
    }

    setResult(`Result: ${res}`);
  };

  return (
    <div style={{ padding: '20px', border: '8px solid #ccc', width: '300px', background: 'lightgreen', margin: '50px auto', borderRadius: '10px' }}>
      <h2>Simple Calculator</h2>
      <input type="number" value={num1} onChange={e => setNum1(e.target.value)} placeholder="First Number" style={{ width: '100%', marginBottom: '10px' }} />
      <select value={operator} onChange={e => setOperator(e.target.value)} style={{ width: '100%', marginBottom: '10px' }}>
        <option value="+">Add</option>
        <option value="-">Subtract</option>
        <option value="*">Multiply</option>
        <option value="/">Divide</option>
      </select>
      <input type="number" value={num2} onChange={e => setNum2(e.target.value)} placeholder="Second Number" style={{ width: '100%', marginBottom: '10px' }} />
      <button onClick={calculate} style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>Calculate</button>
      <p style={{ fontWeight: 'bold', fontSize: '16px' }}>{result}</p>
    </div>
  );
}

export default App;

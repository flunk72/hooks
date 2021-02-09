import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <HookSwitcher/>
    </div>
  )
}


const HookSwitcher = () => {
  const [color, setColor ] = useState('grey');
  const [fontSize, setFontSize] = useState(14)
  return (
    <div style={{padding: '10px', backgroundColor: color, fontSize: `${fontSize}px`}}>
    Hello!!!
      <button 
        onClick={() => setColor('green')}>
        Color
      </button>
      <button 
        onClick={() => setColor('#f5f5f5')}>
        Light
      </button>
      <button onClick={() => setFontSize((s) => s+2)}>
      (+)
      </button>
      <button onClick={() => setFontSize((s) => s-4)}>
      (-)
      </button>
    </div>
  );
};



ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);


import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

const MyContext = React.createContext();

const App = () => {
  return (
    <div>
      <MyContext.Provider value="Hello 123">
        <Child/>
      </MyContext.Provider>
    </div>
  )
}

const Child = () => {
  const value = useContext(MyContext)
  return (
    <p>{value}</p>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

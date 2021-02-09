import React, { Component, useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  const [value, setValue] = useState(1);
  const [visible, setVisible] = useState(true);

  if(visible) {
    return (
      <div>
        <button onClick={() => setValue((v) => v+1)}>
          +
        </button>
        <button onClick={() => setVisible(false)}>
          hide
        </button>
        <ClassCounter value={value}/>
        {/* <Notification/> */}
        <PlanetInfo id={value}/>
        {/* <HookCounter value={value}/> */}
      </div>
    )
  } else {
    return (
      <button onClick={() => setVisible(true)}>
        show
      </button>
    )
  }
}

const getPlanet = (id) => {
  return fetch(`https://swapi.dev/api/planets/${id}/`)
    .then(res => res.json())
    .then(data => data);
}

const useRequest = (request) => {

  const [dataState, setDataState] = useState({
    data: null,
    loading: true,
    error: null
  })
  useEffect(() => {
    setDataState({
      data: null,
      loading: true,
      error: null
    })
    let cancelled = false;
    request()
      .then(data => !cancelled && setDataState({
        data,
        loading: false,
        error: null
      }))
      .catch(error => !cancelled && setDataState({
        data: null,
        loading: false,
        error
      }))
      return() => cancelled = true;
  }, [request])
  return dataState;
}
const usePlanetInfo = (id) => {
  const request = useCallback(() => getPlanet(id), [id])
  return useRequest(request);
}
const PlanetInfo = ({id}) => {
  const { data, loading, error } = usePlanetInfo(id);
  if(error) {
    return (
      <div style={{color: 'red'}}>Ошибка</div>
    )
  }
  if(loading) {
    return (
      <div style={{color: 'blue'}}> Loading...</div>
    )
  }
  return (
    <div>{id} - {data.name}</div>
  )
}

// const Notification = () => {
//   const [visible, unVisible] = useState(true)
//   useEffect(() => {
//    const timeout = setTimeout(() => {
//       unVisible(false)
//     }, 1500);
//     return (
//       () => clearTimeout(timeout)
//     ) 
//    }, [])
//   return (
//     <div>{visible && <p>Hello</p>}</div>
//   )
// }

class ClassCounter extends Component {
  componentDidMount() {
    console.log("mount");
    
  }
  componentDidUpdate() {
    console.log("update");
  }
  componentWillUnmount() {
    console.log("unMount");
  }
  render() {
    return(
      <p>{this.props.value}</p>
    ) 
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
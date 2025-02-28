import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tempreture } from './types/dataTypes';
import Chart from './components/Chart';
import InputThreshold from './components/InputTreshold';
import './App.css';
import { setThreshold } from './redux/actions';


function App() {
  const dispatch = useDispatch();
  const temp = useSelector((state: Tempreture ) => state.temp)

  useEffect(()=>{
    const currentThreshold = localStorage.getItem('threshold');
    if(currentThreshold){
      dispatch(setThreshold(Number(currentThreshold)))
    }
  }, [dispatch])
  

  return (
    <div className="App">
      <h1 className='mainTitle'>Real-Time Temperature Monitoring</h1>
      <InputThreshold />
      <Chart temp={temp} />
    </div>
  );
}

export default App;

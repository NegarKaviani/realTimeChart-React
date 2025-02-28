import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { Tempreture, Threshold } from '../types/dataTypes';
import { sendThresholdNotification } from '../services/socketService';


const Chart: React.FC<Tempreture> = ({ temp }) => {

    const formatTime = () => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0'); 
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      };

    const currentThresholdValue = Number(localStorage.getItem('threshold'));
    const [data, setData] = useState<Threshold[]>([]);
    const [crossed, setCrossed] = useState<Threshold[]>([]);
    const [currentThreshold , setCurrentThreshold] = useState<number>(currentThresholdValue)


    useEffect(() => {
        const interval = setInterval(() => {
            setData((prev) => [...prev, { time: formatTime(), temp: Math.random() * 50 }]);
            setCurrentThreshold(Number(localStorage.getItem('threshold')))
        }, 1000)

        return () => {
            clearInterval(interval);
            setData([]);
            setCrossed([]);
            localStorage.clear();
         } //Cleanup function
    }, [])

    useEffect(() => {
        setData([]);
        setCrossed([]);
    } , [currentThreshold]) //When the threshold changes

    useEffect(() => {
        if(data.length > 40)
            data.shift();

        if (data.length > 0 && data[data.length - 1].temp > temp){
            sendThresholdNotification(data[data.length - 1]);
            setCrossed((prev) => [...prev, { time: formatTime(), temp: data[data.length - 1].temp }])
        }

    }, [data, temp])


    return (
        <div className='chart'>
            <LineChart width={800} height={340} data={data}>
                <XAxis domain={[0, 40]} dataKey="time"></XAxis>
                <YAxis domain={[0, 50]}></YAxis>
                <Tooltip />
                <Line  type="monotone" dataKey="temp" stroke='#88843e' isAnimationActive={false}/>
            </LineChart>
            <div className="currentThreshold">Current threshold is: {temp}</div>
            {data.length > 0 && data[data.length - 1].temp > temp && (
                <div className="alert">Threshold crossed! Temperature: {data[data.length - 1].temp}</div>
            )}
            <ul>
                {crossed.length > 0 && crossed.map((item, index) => (
                    <li key={index}>
                        {`Threshold crossed at ${item.time} with temperature ${item.temp}`}
                    </li>
                ))}
            </ul>
            
        </div>
    )
}

export default Chart;
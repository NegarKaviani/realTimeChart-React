import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { setThreshold } from "../redux/actions";

const InputThreshold: React.FC = () => {
    const [inputValue, setInputValue] = useState("");
    const dispatch = useDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value) 
    }

    
    const handleThresholdChange = () => {
        const value = Number(inputValue);

        if(value === 0)
            alert("Threshold value cannot be 0")
    
        if (!isNaN(value) && value > 0) {
            dispatch(setThreshold(value));
            localStorage.setItem("threshold", inputValue)
            //console.log(localStorage.threshold)
        }

    }

    return (
        <div className="wrapper">
            <div>
                <label className="inputLabel block">Threshold Input: </label>
                <input
                    className="inputBox"
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={localStorage.getItem("threshold") || "Enter Threshold Value"}
                />
            </div>
            <button
                className="setButton"
                onClick={handleThresholdChange}>
                Set Threshold
            </button>
        </div>
    )

}

export default InputThreshold;
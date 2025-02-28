import { Tempreture } from "../types/dataTypes";


const initialState: Tempreture = {
    temp: Number(localStorage.getItem("threshold")) || 30,
}


const reducer = (state = initialState , action: {type: string ; payload: any}) : Tempreture => {
        switch(action.type){
            case "Set_Threshold":
                return {...state, temp: action.payload };
            default:
                return state;
        }
}

export default reducer;
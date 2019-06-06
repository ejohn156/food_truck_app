import { TruckActionTypes, TruckActions } from "./truckAction";

export let initialState = []

export function truckReducer(state=initialState, action: TruckActions) {  
    switch (action.type) {
        case TruckActionTypes.ADD_TRUCK: 
            return [...state, action.payload]
        case TruckActionTypes.REMOVE_TRUCK: 
            let product = action.payload        
            return state.filter((el)=>el.id != product.id)
        default: 
            return state
    }
}
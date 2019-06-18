import { MarkerActionTypes, MarkerActions } from "./markerAction";

export let initialState = []

export function markerReducer(state=initialState, action: MarkerActions) {  
    switch (action.type) {
        case MarkerActionTypes.ADD_MARKER: 
            return [...state, action.payload]
        case MarkerActionTypes.REMOVE_MARKER: 
            let product = action.payload        
            return state.filter((el)=>el.id != product.id)
        default: 
            return state
    }
}
import { IsFilteredActionTypes, IsFilteredActions } from "./isFilteredAction";

export let initialState = []

export function isFilteredReducer(state=initialState, action: IsFilteredActions) {  
    switch (action.type) {
        case IsFilteredActionTypes.ADD_ISFILTERED: 
            return [...state, action.payload]
        case IsFilteredActionTypes.REMOVE_ISFILTERED: 
            let product = action.payload        
            return state.filter((el)=>el.id != product.id)
        default: 
            return state
    }
}
import { FilterActionTypes, FilterActions } from "./filterAction";

export let initialState = []

export function filterReducer(state=initialState, action: FilterActions) {  
    switch (action.type) {
        case FilterActionTypes.ADD_FILTER: 
            return [...state, action.payload]
        case FilterActionTypes.REMOVE_FILTER: 
            let product = action.payload        
            return state.filter((el)=>el.id != product.id)
        default: 
            return state
    }
}
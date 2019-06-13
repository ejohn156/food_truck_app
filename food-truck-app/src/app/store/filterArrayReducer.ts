import { FilterArrayActionTypes, FilterArrayActions } from "./filterArrayAction";

export let initialState = []

export function filterArrayReducer(state=initialState, action: FilterArrayActions) {  
    switch (action.type) {
        case FilterArrayActionTypes.ADD_FILTERARRAY: 
            return [...state, action.payload]
        case FilterArrayActionTypes.REMOVE_FILTERARRAY: 
            let product = action.payload        
            return state.filter((el)=>el.id != product.id)
        default: 
            return state
    }
}
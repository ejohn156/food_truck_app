import { FavMarkerActionTypes, FavMarkerActions } from "./favMarkerAction";

export let initialState = []

export function favMarkerReducer(state=initialState, action: FavMarkerActions) {  
    switch (action.type) {
        case FavMarkerActionTypes.ADD_FAVMARKER: 
            return [...state, action.payload]
        case FavMarkerActionTypes.REMOVE_FAVMARKER: 
            let product = action.payload        
            return state.filter((el)=>el.id != product.id)
        default: 
            return state
    }
}
import { FavoriteActionTypes, FavoriteActions } from "./action";

export let initialState = []

export function reducer(state=initialState, action: FavoriteActions) {  
    switch (action.type) {
        case FavoriteActionTypes.ADD_FAVORITE: 
            return [...state, action.payload]
        case FavoriteActionTypes.REMOVE_FAVORITE: 
            let product = action.payload        
            return state.filter((el)=>el.id != product.id)
        default: 
            return state
    }
}
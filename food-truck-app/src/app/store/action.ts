import { Action } from '@ngrx/store'

export enum FavoriteActionTypes {  
    ADD_FAVORITE = 'ADD_FAVORITE',
    REMOVE_FAVORITE = 'REMOVE_FAVORITE'
}

export class AddFavorite implements Action {  
    readonly type = FavoriteActionTypes.ADD_FAVORITE
    constructor(public payload: any){}
}

export class RemoveFavorite implements Action {  
    readonly type = FavoriteActionTypes.REMOVE_FAVORITE
    constructor(public payload: any){}
}

export type FavoriteActions = AddFavorite | RemoveFavorite
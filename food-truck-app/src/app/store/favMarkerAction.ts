import { Action } from '@ngrx/store'

export enum FavMarkerActionTypes {  
    ADD_FAVMARKER = 'ADD_FAVMARKER',
    REMOVE_FAVMARKER = 'REMOVE_FAVMARKER'
}

export class AddFavMarker implements Action {  
    readonly type = FavMarkerActionTypes.ADD_FAVMARKER
    constructor(public payload: any){}
}

export class RemoveFavMarker implements Action {  
    readonly type = FavMarkerActionTypes.REMOVE_FAVMARKER
    constructor(public payload: any){}
}

export type FavMarkerActions = AddFavMarker | RemoveFavMarker
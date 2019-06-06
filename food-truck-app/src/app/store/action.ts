import { Action } from '@ngrx/store'

export enum FavoriteActionTypes {  
    ADD_TRUCK = 'ADD_TRUCK',
    REMOVE_TRUCK = 'REMOVE_TRUCK'
}

export class AddTruck implements Action {  
    readonly type = FavoriteActionTypes.ADD_TRUCK
    constructor(public payload: any){}
}

export class RemoveTruck implements Action {  
    readonly type = FavoriteActionTypes.REMOVE_TRUCK
    constructor(public payload: any){}
}

export type FavoriteActions = AddTruck | RemoveTruck
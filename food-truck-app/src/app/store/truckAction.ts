import { Action } from '@ngrx/store'

export enum TruckActionTypes {  
    ADD_TRUCK = 'ADD_TRUCK',
    REMOVE_TRUCK = 'REMOVE_TRUCK'
}

export class AddTruck implements Action {  
    readonly type = TruckActionTypes.ADD_TRUCK
    constructor(public payload: any){}
}

export class RemoveTruck implements Action {  
    readonly type = TruckActionTypes.REMOVE_TRUCK
    constructor(public payload: any){}
}

export type TruckActions = AddTruck | RemoveTruck
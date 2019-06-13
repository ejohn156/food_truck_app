import { Action } from '@ngrx/store'

export enum IsFilteredActionTypes {  
    ADD_ISFILTERED = 'ADD_ISFILTERED',
    REMOVE_ISFILTERED = 'REMOVE_ISFILTERED'
}

export class AddIsFiltered implements Action {  
    readonly type = IsFilteredActionTypes.ADD_ISFILTERED
    constructor(public payload: any){}
}

export class RemoveIsFiltered implements Action {  
    readonly type = IsFilteredActionTypes.REMOVE_ISFILTERED
    constructor(public payload: any){}
}

export type IsFilteredActions = AddIsFiltered | RemoveIsFiltered
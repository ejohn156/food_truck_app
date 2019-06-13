import { Action } from '@ngrx/store'

export enum FilterArrayActionTypes {  
    ADD_FILTERARRAY = 'ADD_FILTERARRAY',
    REMOVE_FILTERARRAY = 'REMOVE_FILTERARRAY'
}

export class AddFilterArray implements Action {  
    readonly type = FilterArrayActionTypes.ADD_FILTERARRAY
    constructor(public payload: any){}
}

export class RemoveFilterArray implements Action {  
    readonly type = FilterArrayActionTypes.REMOVE_FILTERARRAY
    constructor(public payload: any){}
}

export type FilterArrayActions = AddFilterArray | RemoveFilterArray
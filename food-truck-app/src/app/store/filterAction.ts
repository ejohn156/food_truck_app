import { Action } from '@ngrx/store'

export enum FilterActionTypes {  
    ADD_FILTER = 'ADD_FILTER',
    REMOVE_FILTER = 'REMOVE_FILTER'
}

export class AddFilter implements Action {  
    readonly type = FilterActionTypes.ADD_FILTER
    constructor(public payload: any){}
}

export class RemoveFilter implements Action {  
    readonly type = FilterActionTypes.REMOVE_FILTER
    constructor(public payload: any){}
}

export type FilterActions = AddFilter | RemoveFilter
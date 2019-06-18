import { Action } from '@ngrx/store'

export enum MarkerActionTypes {  
    ADD_MARKER = 'ADD_MARKER',
    REMOVE_MARKER = 'REMOVE_MARKER'
}

export class AddMarker implements Action {  
    readonly type = MarkerActionTypes.ADD_MARKER
    constructor(public payload: any){}
}

export class RemoveMarker implements Action {  
    readonly type = MarkerActionTypes.REMOVE_MARKER
    constructor(public payload: any){}
}

export type MarkerActions = AddMarker | RemoveMarker
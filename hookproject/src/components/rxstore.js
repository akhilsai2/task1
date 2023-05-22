import {BehaviorSubject} from 'rxjs'

const fullStateStore= new BehaviorSubject(1)

const setFullStateStore=(value)=>{
    fullStateStore.next(value)
}

const getFullStateStore=()=>{
    return fullStateStore;
}

  


export const globleState= {setFullStateStore,getFullStateStore}
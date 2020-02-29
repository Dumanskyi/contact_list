import { CLOSE, OPEN } from './actionTypes';

export function closeSideBar() {
    return {
         type: CLOSE
    }
}

export function openSideBar() {
    return {
         type: OPEN
    }
}
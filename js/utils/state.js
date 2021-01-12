import { subscribe, dispatch } from "./events.js";

export const state = {
    listItems: [
        { id: 1, name: 'Dave' },
        { id: 2, name: 'Sally' },
        { id: 3, name: 'Malcolm' }
    ],
};

subscribe('state', ({ detail: { type, payload } }) => {
    switch(type) {

        case 'LIST_ITEM_UPDATE': {
            const item = state.listItems.find((itemToCheck => itemToCheck.id === payload.id))
            if(item !== null) {
                item = {
                    item,
                    ...payload
                }
            }
        }

        case 'LIST_ITEM_ADD': {
            state.listItems.push(payload)
        }
    }

    dispatch('stateUpdated', { state })
})

// render initial state
setTimeout(() => {
    dispatch('stateUpdated', { state })
})

import { registerComponent } from './utils/components.js'
import { subscribe } from "./utils/events.js";
import './listItem.js'

const elementName = 'app-list';

const template = /*html*/`
    <style>
        .list {
            border: 1px solid red;
            padding: 5px;
        }
    </style>

    <div class="list">

        <div id="listItems" class="list"></div>

        <button id="add">Add</button>
        <button id="remove">Remove</button>
    </div>
`

const onConnected = ({ root }) => {
    const listElement = root.querySelector('#listItems')
    
    const addListItem = ({ id, name }) => {
        const listItem = document.createElement('app-list-item')
        listItem.id = id
        listElement.name = name
        listElement.appendChild(listItem)
    }

    const removeListItem = () => {

        if (listElement.childElementCount > 0) {
            listElement.removeChild(listElement.lastElementChild)
        }
    }

    root.querySelector('#add').addEventListener(
        'click',
        () => {
            window.appState = window.appState + 1
            addListItem()
        }
    )

    root.querySelector('#remove').addEventListener(
        'click',
        () => {
            window.appState = Math.max(0, window.appState + 1)
            removeListItem()
        }
    )

    subscribe('stateUpdated', ({ detail: { state } }) => {
        state.listItems.forEach(addListItem);
    })
}

registerComponent({
    elementName,
    template,
    onConnected,
})

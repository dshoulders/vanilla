import { registerComponent } from './utils/components.js'
import './dave.js'

const elementName = 'app-dave-list';

const template = /*html*/`
    <style>
        .dave-list {
            border: 1px solid red;
            padding: 5px;
        }
    </style>

    <div class="dave-list">

        <div id="daves" class="daves"></div>

        <button id="add">Add</button>
        <button id="remove">Remove</button>
    </div>
`

const onConnected = ({ root }) => {
    const davesElement = root.querySelector('#daves')
    
    const addDave = () => {
        davesElement.appendChild(document.createElement('app-dave'))
    }

    const removeDave = () => {

        if (davesElement.childElementCount > 0) {
            davesElement.removeChild(davesElement.lastElementChild)
        }
    }

    for (let i = 0; i < 3; i++) {
        addDave()
    }

    root.querySelector('#add').addEventListener(
        'click',
        () => {
            window.appState = window.appState + 1
            addDave()
        }
    )

    root.querySelector('#remove').addEventListener(
        'click',
        () => {
            window.appState = Math.max(0, window.appState + 1)
            removeDave()
        }
    )
}

registerComponent({
    elementName,
    template,
    onConnected
})

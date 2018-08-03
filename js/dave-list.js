import './dave.js'

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

const templateNode = document.createElement('template')

templateNode.setAttribute('id', 'dave-list')
templateNode.innerHTML = template

document.body.appendChild(templateNode)

class DaveList extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById('dave-list')
        const templateContent = template.content
        const shadowRoot = 
            this.attachShadow({mode: 'open'})
            .appendChild(templateContent.cloneNode(true))
    }

    connectedCallback() {

        const daves = this.shadowRoot.querySelector('#daves')

        const addDave = () => {
            daves.appendChild(document.createElement('app-dave'))
        }

        const removeDave = () => {

            if (daves.childElementCount > 0) {
                daves.removeChild(daves.lastElementChild)
            }
        }

        for (let i = 0; i < 3; i++) {
            addDave()
        }

        this.shadowRoot.querySelector('#add').addEventListener(
            'click',
            () => {
                window.appState = window.appState + 1
                addDave()
            }
        )

        this.shadowRoot.querySelector('#remove').addEventListener(
            'click',
            () => {
                window.appState = Math.max(0, window.appState + 1)
                removeDave()
            }
        )
    }
}

customElements.define('app-dave-list', DaveList)
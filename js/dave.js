const template = /*html*/`
    <style>
        .dave {
            color: white;
            background-color: #666;
            padding: 5px;
        }
    </style>
    <div class="dave">Dave</div>
`

const templateNode = document.createElement('template')

templateNode.setAttribute('id', 'dave')
templateNode.innerHTML = template

document.body.appendChild(templateNode)

class Dave extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById('dave')
        const templateContent = template.content
        const shadowRoot = 
            this.attachShadow({mode: 'open'})
            .appendChild(templateContent.cloneNode(true))
 
    }
}

customElements.define('app-dave', Dave)
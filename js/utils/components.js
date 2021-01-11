export function registerTemplate(template, id) {
    const templateNode = document.createElement('template')

    templateNode.setAttribute('id', id)
    templateNode.innerHTML = template

    document.body.appendChild(templateNode)

    return templateNode
}

export function registerComponent({
    elementName,
    template,
    onConnected,
}) {

    registerTemplate(template, elementName)

    const Component = class extends HTMLElement {
        constructor() {
            super();
    
            const templateElement = document.getElementById(elementName)
            const templateContent = templateElement.content
            this.attachShadow({mode: 'open'})
                .appendChild(templateContent.cloneNode(true))
        }
    
        connectedCallback() {
            onConnected({ root: this.shadowRoot });
        }
    }
    
    customElements.define(elementName, Component)
}
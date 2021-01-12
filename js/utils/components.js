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
    observedAttributes,
    onConnected,
    onDisconnected,
    onAttributeChanged,
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

        static get observedAttributes() { return observedAttributes }
    
        connectedCallback() {
            onConnected({ root: this.shadowRoot })
        }

        disconnectedCallback() {
            onDisconnected({ root: this.shadowRoot })
        }

        attributeChangedCallback(name, oldValue, newValue) {
            onAttributeChanged({ root: this.shadowRoot, name, oldValue, newValue })
        }
    }
    
    customElements.define(elementName, Component)
}
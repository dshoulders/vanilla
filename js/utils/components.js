const noop = () => {}

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
    observedAttributes = [],
    onConnected = noop,
    onDisconnected = noop,
    onAttributeChanged = noop,
    onUpdate = noop,
}) {

    registerTemplate(template, elementName)

    const Component = class extends HTMLElement {
        constructor() {
            super()
    
            const templateElement = document.getElementById(elementName)
            const templateContent = templateElement.content
            this.attachShadow({mode: 'open'})
                .appendChild(templateContent.cloneNode(true))

            this.eventRegistry = []
        }

        static get observedAttributes() { return observedAttributes }
    
        connectedCallback() {
            onConnected({ root: this.shadowRoot, instance: this, })
        }

        disconnectedCallback() {
            onDisconnected({ root: this.shadowRoot, instance: this, })

            // clean up all registered events
            this.eventRegistry.forEach(({ context, type, listener }) => {
                context.removeEventListener(type, listener)
            })
        }

        attributeChangedCallback(name, oldValue, newValue) {
            onAttributeChanged({ root: this.shadowRoot, instance: this, name, oldValue, newValue })
        }

        update(props) {
            onUpdate({ root: this.shadowRoot, instance: this, props })
        }

        registerEvent(context, type, listener) {
            context.addEventListener(type, listener)
            this.eventRegistry.push({ context, type, listener })
        }
    }
    
    customElements.define(elementName, Component)
}

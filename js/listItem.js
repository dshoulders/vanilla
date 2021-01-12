import { registerComponent } from './utils/components.js'

const elementName = 'app-list-item'

const template = /*html*/`
    <style>
        .list-item {
            color: white;
            background-color: #666;
            padding: 5px;
        }
    </style>
    <div class="list-item">
        <span class="name"></span>
        <button class="change">change</button>
    </div>
`

const onConnected = ({ root, instance }) => {
    instance.registerEvent(root.querySelector('.change'), 'click', () => {
        const nameElement = root.querySelector('.name')
        const currentName = nameElement.textContent
        if (currentName === 'Dave') {
            nameElement.textContent = 'Sandra'
        } else {
            nameElement.textContent = 'Dave'
        }
    })
}

const onUpdate = ({ propertyName, value, instance, root }) => {
    switch (propertyName) {
        case 'name': root.querySelector('.name').textContent = value
    }
}

registerComponent({
    elementName,
    template,
    onUpdate,
    onConnected,
})
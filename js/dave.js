import { registerComponent } from './utils/components.js'

const elementName = 'app-dave'

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

registerComponent({
    elementName,
    template,
})
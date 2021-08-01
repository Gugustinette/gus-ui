const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_header {
    color: var(--gus-ui-color-on-surface);

    font-size: 6em;
}
</style>
<div class="gus_header" part="text">
    <slot></slot>
</div>
`

export class GusHeader extends HTMLElement {
    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
    }
}

window.customElements.define('gus-header', GusHeader)
const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_title {
    color: var(--gus-ui-color-on-surface);

    font-size: 2.5em;
}
</style>
<div class="gus_title" part="text">
    <slot></slot>
</div>
`

export class GusTitle extends HTMLElement {
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

window.customElements.define('gus-title', GusTitle)
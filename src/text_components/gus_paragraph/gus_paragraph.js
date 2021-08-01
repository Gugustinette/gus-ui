const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_paragraph {
    color: var(--gus-ui-color-on-surface);

    font-size: 1.2em;
}
</style>
<div class="gus_paragraph" part="text">
    <slot></slot>
</div>
`

export class GusParagraph extends HTMLElement {
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

window.customElements.define('gus-paragraph', GusParagraph)
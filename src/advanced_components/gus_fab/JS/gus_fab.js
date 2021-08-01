const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_fab {
    position: fixed;

    right: 40px;
    bottom: 40px;

    height: 50px;
    width: 50px;

    cursor: pointer;

    border-radius: 100%;

    background: var(--gus-ui-color-primary);
    color: var(--gus-ui-color-on-primary);

    display: grid;
    place-items: center;

    transition: 0.2s;
}
.gus_fab:hover {
    background: var(--gus-ui-color-primary-hover);
}
</style>
<div class="gus_fab" part="fab">
    <slot></slot>
</div>
`

export class GusFab extends HTMLElement {
    static get observedAttributes() {
        return [];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.fab = shadowRoot.querySelector('.gus_fab')
    }

    connectedCallback() {
        this.render()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
            }
        }
    }

    // Re-render the whole fab
    render() {
    }
}

window.customElements.define('gus-fab', GusFab)
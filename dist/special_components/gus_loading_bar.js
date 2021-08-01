const template = document.createElement('template')

template.innerHTML = `
<style>

@keyframes infiniteloop {
    from {
        margin-left: -50%;
    }
    to {
        margin-left: 100%;
    }
}

@keyframes infinitelooplength {
    0% {
        margin-left: -50%;
        width: 20%;
    }
    20% {
        width: 30%;
    }
    50% {
        width: 70%;
    }
    90% {
        width: 40%;
    }
    100% {
        margin-left: 100%;
        width: 20%;
    }
}

.gus_loading_bar_holder {
    min-height: 5px;
    width: 200px;
    position: relative;
    overflow: hidden;
}

.gus_loading_bar {
    height: 5px;
    width: 50%;
    background: var(--gus-ui-color-primary);

    animation: 1.5s linear infinite running infiniteloop;
}

.gus_loading_bar_length {
    animation: 1.5s linear infinite running infinitelooplength;
}

</style>
<div class="gus_loading_bar_holder" part="loading-bar-holder">
    <div class="gus_loading_bar" part="loading-bar">
    </div>
</div>
`

export class GusLoadingBar extends HTMLElement {
    static get observedAttributes() {
        return ['mode'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.loading_bar = shadowRoot.querySelector('.gus_loading_bar')
    }

    connectedCallback() {
        if (!this.mode) {
            this.mode = "normal"
        }
        this.render()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'mode':
                    this.mode = newVal
                    break;
            }
        }
        this.render()
    }

    // Define methods for loading bar 'mode' attribute (String)
    get mode() {
        return this.getAttribute('mode')
    }

    set mode(value) {
        this.setAttribute('mode', value)
    }

    // Re-render the whole loading bar
    render() {
        if (this.mode === "length-variation") {
            this.loading_bar.classList.add("gus_loading_bar_length")
        }
    }
}

window.customElements.define('gus-loading-bar', GusLoadingBar)
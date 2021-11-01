const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_focus_window {
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    position: fixed;
    display: grid;
    justify-items: center;
    align-items: center;
    opacity: 0;
    transition: 0.2s;
    z-index: -100;
    background: rgba(0, 0, 0, 0);
}
.gus_focus_window_visible {
    opacity: 1;
    transition: 0.2s;
    z-index: 100;
}
</style>
<div class="gus_focus_window" part="focus-window">
    <div class="gus_stop_event">
        <slot></slot>
    </div>
</div>
`

export class GusFocusWindow extends HTMLElement {
    static get observedAttributes() {
        return ['visible', 'opacity', 'close-on-click'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // Assign elements to variables
        this.focus_window = shadowRoot.querySelector('.gus_focus_window')
        this.stop_event = shadowRoot.querySelector('.gus_stop_event')

        // Create events
        this.event_closed_window = new Event('closed-window') // User closed the window

        // Assign click events
        this.stop_event.addEventListener('click', (e) => {
            e.stopPropagation()
        })
        
        this.focus_window.addEventListener('click', (e) => {
            if (this.closeOnClick) {
                this.visible = false
                this.dispatchEvent(this.event_closed_window)
            }
        })
    }

    connectedCallback() {
        if (this.closeOnClick) {
            this.closeOnClick = true;
        }
        if (!this.visible) {
            this.visible = 'false'
        }
        if (!this.opacity && this.opacity != 0) {
            this.opacity = 0.8
        }
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'visible':
                    this.visible = newVal
                    break;
                case 'opacity':
                    this.opacity = newVal
                    break;
            }
        }
    }

    // Define methods for focus window 'visible' attribute (Boolean)
    get visible() {
        return this.getAttribute('visible') == 'true'
    }

    set visible(value) {
        this.setAttribute('visible', value)
        this.render()
    }

    // Define methods for focus window 'opacity' attribute (Float)
    get opacity() {
        return parseFloat(this.getAttribute('opacity'))
    }

    set opacity(value) {
        this.setAttribute('opacity', value)
    }

    // Define methods for focus window 'closeOnClick' attribute (Boolean)
    get closeOnClick() {
        return this.getAttribute('close-on-click') == 'true'
    }

    set closeOnClick(value) {
        this.setAttribute('close-on-click', value)
        this.render()
    }

    // Re-render the whole focus window
    render() {
        if (this.visible) {
            this.focus_window.style.background = `rgba(0, 0, 0, ${this.opacity})`
            this.focus_window.classList.add("gus_focus_window_visible")
        }
        else {
            this.focus_window.classList.remove("gus_focus_window_visible")
        }
    }
}

window.customElements.define('gus-focus-window', GusFocusWindow)
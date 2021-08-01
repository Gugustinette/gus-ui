const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_sidebar {
    top: 0;
    left: -500px;
    position: fixed;
    height: 100vh;
    width: 500px;
    background: var(--gus-ui-color-surface);
    transition: 0.2s;
    overflow: scroll;

    z-index: 10000;
}
.gus_sidebar_visible {
    left: 0;
    transition: 0.2s;
}

.gus_sidebar_right {
    left: 0;
    margin-left: 100vw;
    transition: 0.2s;
}
.gus_sidebar_right_visible {
    margin-left: 70vw;
    transition: 0.2s;
}
</style>
<div class="gus_sidebar" part="sidebar">
    <slot></slot>
</div>
`

export class GusSidebar extends HTMLElement {
    static get observedAttributes() {
        return ['visible', 'direction', 'push-ui'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.sidebar = shadowRoot.querySelector('.gus_sidebar')

        // EVENTS
        this.event_statutChanged = new Event("statut-changed")
    }

    connectedCallback() {
        if (!this.visible) {
            this.visible = false
        }
        if (!this.direction) {
            this.direction = "left"
        }
        if (!this.pushUi) {
            this.pushUi = false
        }
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'visible':
                    this.visible = newVal
                    break;
                case 'direction':
                    this.direction = newVal
                    break;
                case 'push-ui':
                    this.pushUi = newVal
                    break;
            }
        }
    }

    // Define methods for side bar 'visible' attribute (Boolean)
    get visible() {
        return this.getAttribute('visible') == 'true'
    }

    set visible(value) {
        this.setAttribute('visible', value)
        this.dispatchEvent(this.event_statutChanged)
        this.render()
    }

    // Define methods for side bar 'direction' attribute (String)
    get direction() {
        return this.getAttribute('direction')
    }

    set direction(value) {
        this.setAttribute('direction', value)
        this.render()
    }

    // Define methods for side bar 'push-ui' attribute (Boolean)
    get pushUi() {
        return this.getAttribute('push-ui') == 'true'
    }

    set pushUi(value) {
        this.setAttribute('push-ui', value)
    }

    // Re-render the whole side bar
    render() {
        if (this.direction == "left") { // Left Sidebar
            if (this.visible) {
                this.sidebar.classList.add("gus_sidebar_visible")

                if (document.querySelector("gus-ui") !== undefined && this.pushUi) { // Push the full Ui
                    var ui = document.querySelector("gus-ui")

                    ui.style.left = `${this.sidebar.clientWidth}px`
                    document.body.style.overflow = 'hidden'
                }
            }
            else {
                this.sidebar.classList.remove("gus_sidebar_visible")

                if (document.querySelector("gus-ui") !== undefined && this.pushUi) { // Replace the full Ui
                    var ui = document.querySelector("gus-ui")

                    ui.style.left = `0`
                    document.body.style.overflow = 'auto'
                }
            }
        }
        else {
            if (this.direction == "right") { // Right Sidebar
                if (this.visible) {
                    this.sidebar.classList.add("gus_sidebar_right_visible")

                    if (document.querySelector("gus-ui") !== undefined && this.pushUi) { // Push the full Ui
                        var ui = document.querySelector("gus-ui")
    
                        ui.style.right = `${this.sidebar.clientWidth}px`
                        document.body.style.overflow = 'hidden'
                    }
                }
                else {
                    this.sidebar.classList.add("gus_sidebar_right")
                    this.sidebar.classList.remove("gus_sidebar_right_visible")

                    if (document.querySelector("gus-ui") !== undefined && this.pushUi) { // Replace the full Ui
                        var ui = document.querySelector("gus-ui")
    
                        ui.style.right = `0`
                        document.body.style.overflow = 'auto'
                    }
                }
            }
        }
    }
}

window.customElements.define('gus-sidebar', GusSidebar)
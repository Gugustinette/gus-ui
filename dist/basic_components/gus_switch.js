const template = document.createElement('template')

template.innerHTML = `
<style>

.gus_switch_button_background {
    padding-top: 1px;
    width: 60px;
    height: 15px;
    border-radius: 20px;
    background: var(--gus-ui-color-primary);
    cursor: pointer;
}
.gus_switch_button_background_off {
    background: var(--gus-ui-color-surface-focus) !important;
    transition: 0.3s;
}
.gus_switch_button_background_disabled {
    background: var(--gus-ui-color-surface-disabled);
}

.gus_switch_button {
    height: 40px;
    width: 40px;
    background: var(--gus-ui-color-white);
    cursor: pointer;
    border-radius: 1000px;
    margin-top: -15px;
    margin-left: 40px;
    transition: 0.3s;
    box-shadow: var(--gus-ui-color-component-shadow);
}
.gus_switch_button_off {
    margin-left: -10px;
    transition: 0.3s;
}
.gus_switch_button_disabled {
    background: var(--gus-ui-color-on-surface-disabled);
    cursor: default;
}

</style>
<div class="gus_switch_button_background" part="switch_background">
    <div class="gus_switch_button" part="switch"></div>
</div>
`

export class GusSwitch extends HTMLElement {
    static get observedAttributes() {
        return ['checked', 'disabled'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.switch_button = shadowRoot.querySelector('.gus_switch_button')
        this.switch_button_background = shadowRoot.querySelector('.gus_switch_button_background')

        // EVENTS
        this.event_valueChanged = new Event("value-changed")

        // LISTENERS
        this.switch_button.addEventListener('click', (e) => {
            this.checked = (this.checked == false)
            e.stopPropagation()
            this.dispatchEvent(this.event_valueChanged)
        })
        this.switch_button_background.addEventListener('click', (e) => {
            this.checked = (this.checked == false)
            this.dispatchEvent(this.event_valueChanged)
        })
    }

    connectedCallback() {
        if (!this.checked) {
            this.checked = false
        }
        if (!this.disabled) {
            this.disabled = false
        }
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'checked':
                    this.checked = newVal
                    break;
                case 'disabled':
                    this.disabled = newVal
                    break;
            }
        }
    }

    // Define methods for switch 'checked' attribute (boolean)
    get checked() {
        return this.getAttribute('checked') == 'true'
    }

    set checked(value) {
        if (!this.disabled) {
            this.setAttribute('checked', value)
            this.render()
        }
    }

    // Define methods for switch 'disabled' attribute (boolean)
    get disabled() {
        return this.getAttribute('disabled') == 'true'
    }

    set disabled(value) {
        this.setAttribute('disabled', value)
        this.render()
    }

    // Re-render the whole switch
    render() {
        if (this.disabled) {
            this.switch_button.classList.add('gus_switch_button_disabled')
            this.switch_button_background.classList.add('gus_switch_button_background_disabled')
            this.switch_button.classList.add('gus_switch_button_off')
        }
        else {
            this.switch_button.classList.remove('gus_switch_button_disabled')
            this.switch_button_background.classList.remove('gus_switch_button_background_disabled')
            if (!this.checked) {
                this.switch_button.classList.add('gus_switch_button_off')
                this.switch_button_background.classList.add('gus_switch_button_background_off')
            }
            else {
                this.switch_button.classList.remove('gus_switch_button_off')
                this.switch_button_background.classList.remove('gus_switch_button_background_off')
            }
        }
    }
}

window.customElements.define('gus-switch', GusSwitch)
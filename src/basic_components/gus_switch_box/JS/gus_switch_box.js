const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_switch {
    width: 300px;
    height: 100px;
    background: var(--gus-ui-color-primary);
    border-radius: 20px;
    display: grid;
    grid-template-columns: 2fr 1.5fr;
    justify-items: center;
    align-items: center;
    transition: 0.3s;
    font-size: 2em;
}
.gus_switch_off {
    background: var(--gus-ui-color-surface) !important;
    box-shadow: var(--gus-ui-color-surface-shadow);
    transition: 0.3s;
}
.gus_switch_disabled {
    background: var(--gus-ui-color-surface-disabled);
    transition: 0.3s;
}

.gus_switch_button_background {
    width: 90%;
    max-width: 100px;
    height: 15px;
    border-radius: 20px;
    background: rgba(35, 35, 35, 0.5);
}
.gus_switch_button_background_off {
    background: var(--gus-ui-color-surface-focus) !important;
    transition: 0.3s;
}
.gus_switch_button_background_disabled {
    background: var(--gus-ui-color-surface-focus);
    transition: 0.3s;
}

.gus_switch_button {
    height: 40px;
    width: 40px;
    background: var(--gus-ui-color-white);
    cursor: pointer;
    border-radius: 1000px;
    margin-top: -12px;
    margin-left: 60px;
    transition: 0.3s;
}
.gus_switch_button_off {
    margin-left: 0;
    box-shadow: var(--gus-ui-color-component-shadow);
    transition: 0.3s;
}
.gus_switch_button_disabled {
    background: var(--gus-ui-color-on-surface-disabled);
    cursor: default;
    transition: 0.3s;
}


.gus_switch p {
    color: var(--gus-ui-color-on-primary);
    font-size: inherit;
}
.gus_switch_off p {
    color: var(--gus-ui-color-on-background);
}
.content_disabled {
    color: #808080 !important;
}
</style>
<div class="gus_switch" part="switch">
    <p part="content"></p>
    <div class="gus_switch_button_background" part="button_background">
        <div class="gus_switch_button" part="button"></div>
    </div>
</div>
`

export class GusSwitchBox extends HTMLElement {
    static get observedAttributes() {
        return ['content', 'checked', 'disabled'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.switch = shadowRoot.querySelector('.gus_switch')
        this.switch_content = shadowRoot.querySelector('.gus_switch p')
        this.switch_button = shadowRoot.querySelector('.gus_switch_button')
        this.switch_button_background = shadowRoot.querySelector('.gus_switch_button_background')

        // EVENTS
        this.event_valueChanged = new Event("value-changed")

        // LISTENERS
        this.switch.addEventListener('click', () => {
            this.checked = (this.checked == false)
            this.dispatchEvent(this.event_valueChanged)
        })
    }

    connectedCallback() {
        if (!this.content) {
            this.content = 'No State'
        }
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
                case 'content':
                    this.content = newVal
                    break;
                case 'checked':
                    this.checked = newVal
                    break;
                case 'disabled':
                    this.disabled = newVal
                    break;
            }
        }
    }

    // Define methods for switch 'content' attribute (string)
    get content() {
        return this.getAttribute('content')
    }

    set content(value) {
        this.setAttribute('content', value)
        this.render()
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
        this.switch_content.innerHTML = this.content
        if (this.disabled) {
            this.switch.classList.add('gus_switch_disabled')
            this.switch_button.classList.add('gus_switch_button_disabled')
            this.switch_button_background.classList.add('gus_switch_button_background_disabled')
            this.switch_content.classList.add('content_disabled')
            this.switch_button.classList.add('gus_switch_button_off')
        }
        else {
            this.switch.classList.remove('gus_switch_disabled')
            this.switch_button.classList.remove('gus_switch_button_disabled')
            this.switch_button_background.classList.remove('gus_switch_button_background_disabled')
            this.switch_content.classList.remove('content_disabled')
            if (!this.checked) {
                this.switch.classList.add('gus_switch_off')
                this.switch_button.classList.add('gus_switch_button_off')
                this.switch_button_background.classList.add('gus_switch_button_background_off')
            }
            else {
                this.switch.classList.remove('gus_switch_off')
                this.switch_button.classList.remove('gus_switch_button_off')
                this.switch_button_background.classList.remove('gus_switch_button_background_off')
            }
        }
    }
}

window.customElements.define('gus-switch-box', GusSwitchBox)
const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_radiobuttonlist {
    display: flex;
    flex-direction: column;
    justify-items: center;
}
</style>
<div class="gus_radiobuttonlist" part="radio-button-list">
    <slot></slot>
</div>
`

export class GusRadioButtonList extends HTMLElement {
    static get observedAttributes() {
        return ['value', 'default-value'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.radiobuttonlist = shadowRoot.querySelector('.gus_radiobuttonlist')

        // Store elements outside of the shadow DOM
        this.elements = null

        // EVENTS
        this.event_valueChanged = new Event("value-changed") // User has changed the value of the radio button list

        // LISTENERS
        this.radiobuttonlist.addEventListener('click', (e) => {
            if (this.value !== e.target.content) {
                this.value = e.target.content
                this.elements = e.target.parentNode.children
                this.render()
                this.dispatchEvent(this.event_valueChanged)
            }
        })
    }

    connectedCallback() {
        if (!this.defaultValue) {
            this.defaultValue = this.children[0].content
            this.children[0].checked = true
        }
        if (!this.value) {
            this.value = this.defaultValue
        }
        this.render()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'value':
                    this.value = newVal
                    break;
                case 'default-value':
                    this.defaultValue = newVal
                    break;
            }
        }
    }

    // Define methods for radiobutton list 'value' attribute (String)
    get value() {
        return this.getAttribute('value')
    }

    set value(value) {
        this.setAttribute('value', value)
    }

    // Define methods for radiobutton list 'default-value' attribute (String)
    get defaultValue() {
        return this.getAttribute('default-value')
    }

    set defaultValue(value) {
        this.setAttribute('default-value', value)
    }

    // Re-render the whole radiobutton list
    render() {
        if (this.elements !== null) {
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].checked = this.elements[i].content === this.value
            }
        }
    }
}

window.customElements.define('gus-radio-button-list', GusRadioButtonList)

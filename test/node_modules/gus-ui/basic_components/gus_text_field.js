const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_textfield {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.gus_textfield_icon {
    margin-right: 5px;
}

.gus_textfield {
    min-height: 20px;
    min-width: 100px;

    border: solid 10px var(--gus-ui-color-surface);
    border-radius: 10px;

    background: var(--gus-ui-color-surface);

    color: var(--gus-ui-color-on-surface);

    outline: solid 2px var(--gus-ui-color-primary);

    transition: 0.3s;

    resize: none;
}

.gus_textfield_focused {
    outline-color: var(--gus-ui-color-primary-hover);
    transition: 0.3s;
}

.gus_textfield_input {
    min-width: 300px;

    border: none;

    background: var(--gus-ui-color-surface);

    color: inherit;
}
.gus_textfield_input:focus {
    outline: none;
    border: none;
}

</style>
<div class="gus_textfield">
    <div class="gus_textfield_icon">
        <slot name="icon"></slot>
    </div>
    <input type="textfield" class="gus_textfield_input" part="text-field-input">
    </input>
</div>
`

export class GusTextField extends HTMLElement {
    static get observedAttributes() {
        return ['placeholder'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.textfield = shadowRoot.querySelector(".gus_textfield")
        this.textfield_input = shadowRoot.querySelector('.gus_textfield_input')

        // EVENTS
        this.event_text_modif = new Event("text-modif")

        // LISTENERS
        this.textfield_input.addEventListener("keyup", (e) => { // User typed something
            this.dispatchEvent(this.event_text_modif)
        })

        this.textfield_input.addEventListener("focus", (e) => { // User start focus
            this.textfield.classList.add("gus_textfield_focused")
        })
        this.textfield_input.addEventListener("blur", (e) => { // User stop focus
            this.textfield.classList.remove("gus_textfield_focused")
        })
    }

    connectedCallback() {
        if (!this.placeholder) {
            this.placeholder = ""
        }

        this.render()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'placeholder':
                    this.placeholder = newVal
                    break;
            }
        }
    }

    // Define methods for textfield 'placeholder' attribute (String)
    get placeholder() {
        return this.getAttribute('placeholder')
    }

    set placeholder(value) {
        this.setAttribute('placeholder', value)
    }

    // Define methods for textfield 'value' attribute (String)
    get value() {
        return this.textfield_input.value
    }

    set value(newValue) {
        this.textfield_input.value = newValue
    }
    
    // Re-render the whole textfield
    render() {
        this.textfield_input.placeholder = this.placeholder
    }

}

window.customElements.define('gus-text-field', GusTextField)

const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_textarea {
    min-height: 20px;
    min-width: 80px;

    border: solid 10px var(--gus-ui-color-surface);
    border-radius: 20px;

    background: var(--gus-ui-color-surface);

    color: var(--gus-ui-color-on-surface);

    outline: solid 2px var(--gus-ui-color-primary);

    transition: 0.3s;

    resize: none;

    font-size: 0.9em;
}

.gus_textarea:focus {
    outline-color: var(--gus-ui-color-primary-hover);
    transition: 0.3s;
}

</style>
<textarea class="gus_textarea" part="textarea">
</textarea>
`

export class GusTextArea extends HTMLElement {
    static get observedAttributes() {
        return ['placeholder'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // Assign elements to variables
        this.textarea = shadowRoot.querySelector('.gus_textarea')

        this.event_text_modif = new Event("text-modif")

        this.textarea.addEventListener("keyup", (e) => {
            this.dispatchEvent(this.event_text_modif)
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

    // Define methods for textarea 'placeholder' attribute (String)
    get placeholder() {
        return this.getAttribute('placeholder')
    }

    set placeholder(value) {
        this.setAttribute('placeholder', value)
    }

    // Define methods for textarea 'value' attribute (String)
    get value() {
        return this.textarea.value
    }

    set value(newValue) {
        this.textarea.value = newValue
    }
    
    // Re-render the whole textarea
    render() {
        this.textarea.placeholder = this.placeholder
    }

}

window.customElements.define('gus-text-area', GusTextArea)

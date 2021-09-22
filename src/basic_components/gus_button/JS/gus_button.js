const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_button {
    min-height: 40px;
    min-width: 80px;

    padding-left: 10px;
    padding-right: 10px;

    display: grid;
    place-items: center;

    background: var(--gus-ui-color-primary);

    border-radius: 5px;
    color: var(--gus-ui-color-on-primary);

    cursor: pointer;
    transition: 0.1s;
}
.gus_button:hover {
    background: var(--gus-ui-color-primary-hover);
    transition: 0.1s;
}

.gus_button_outlined {
    background: rgba(250, 250, 250, 0);
    color: var(--gus-ui-color-primary);
    border: solid 1px var(--gus-ui-color-primary);
    transition: 0.1s;
}
.gus_button_outlined:hover {
    background: var(--gus-ui-color-background-hover);
    transition: 0.1s;
}

.gus_button_noborder {
    color: var(--gus-ui-color-primary);
    background: rgba(250, 250, 250, 0);
    transition: 0.1s;
}
.gus_button_noborder:hover {
    background: rgba(250, 250, 250, 0.05);
    transition: 0.1s;
}
</style>
<div class="gus_button" part="button">
</div>
`

export class GusButton extends HTMLElement {
    static get observedAttributes() {
        return ['content', 'outlined', 'noborder'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.button = shadowRoot.querySelector('.gus_button')

        // VARIABLES
        this.firstRender = true
    }

    connectedCallback() {
        if (!this.content) {
            this.content = "Button"
        }
        if (this.outlined === undefined) {
            this.outlined = false
        }
        if (!this.noBorder === undefined) {
            this.noBorder = false
        }
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'content':
                    this.content = newVal
                    break;
                case 'outlined':
                    this.outlined = newVal
                    break;
                case 'noBorder':
                    this.noBorder = newVal
                    break;
            }
        }
        this.render()
    }

    // Define methods for button 'content' attribute (string)
    get content() {
        return this.getAttribute('content')
    }

    set content(value) {
        this.setAttribute('content', value)
    }

    // Define methods for button 'outlined' attribute (boolean)
    get outlined() {
        return this.getAttribute('outlined')
    }

    set outlined(value) {
        this.setAttribute('outlined', value)
    }

    // Define methods for button 'noborder' attribute (boolean)
    get noBorder() {
        return this.getAttribute('noborder')
    }

    set noBorder(value) {
        this.setAttribute('noborder', value)
    }

    // Define methods for button 'type' attribute (String)
    get type() {
        return this.getAttribute('type')
    }

    set type(value) {
        this.setAttribute('type', value)
    }

    // Re-render the whole checkbox
    render() {
        this.button.innerHTML = `${this.content}`
        this.button.classList.remove("gus_button_outlined")
        this.button.classList.remove("gus_button_noborder")
        if (this.outlined) {
            this.button.classList.add("gus_button_outlined")
        }
        else {
            if (this.noBorder) {
                this.button.classList.add("gus_button_noborder")
            }
        }

        if (this.firstRender) {
            this.button.addEventListener("click", (e) => {
                if (this.type === "submit") { // Form
                    var form = this.getParentForm(this)
    
                    var fakeTextFields = form.getElementsByTagName("gus-text-field")
    
                    for (var i = 0; i < fakeTextFields.length; i++) {
                        var realTextField = document.createElement("input")
                        realTextField.type = "text"
    
                        realTextField.value = fakeTextFields[i].value

                        realTextField.name = fakeTextFields[i].getAttribute("name")

                        realTextField.style.display = "none"
    
                        form.appendChild(realTextField)
                    }
    
                    form.submit()
                }
            })
        }

        this.firstRender = false
    }

    getParentForm(element) {
        var parentForm = element.parentNode

        while (parentForm.nodeName !== "FORM") {
            parentForm = parentForm.parentNode
        }

        return parentForm
    }
}

window.customElements.define('gus-button', GusButton)

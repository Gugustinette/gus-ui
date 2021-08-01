const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_combobox {
    position: relative;

    height: 50px;
    width: 300px;
    transition: 0.4s;
    background: var(--gus-ui-color-surface);

    border-top: solid 1px var(--gus-ui-color-primary);
    border-left: solid 1px var(--gus-ui-color-primary);
    border-right: solid 1px var(--gus-ui-color-primary);
    border-bottom: solid 1px var(--gus-ui-color-primary);

    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    color: var(--gus-ui-color-on-surface);

    transition: 0.2s;
}
.gus_combobox_active {
    border-bottom: 0;

    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    transition: 0.2s;
}

.gus_combobox_content {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
}

.gus_combobox_content_text {
    width: 100%;
    margin-left: 20px;
}

.gus_combobox_content_arrow {
    height: 16px;
    fill: var(--gus-ui-color-on-surface);
    transform: rotate(180deg);
    transition: 0.2s;
    margin-right: 20px;
    margin-left: 20px;
}

.gus_combobox_content_arrow_active {
    transform: rotate(90deg);
    transition: 0.2s;
}



.gus_combobox_elements {
    position: absolute;

    min-height: 0;
    max-height: 0;
    width: inherit;
    overflow: scroll;

    left: -1px;

    transition: 0.2s;
}
.gus_combobox_elements_active {
    min-height: 40px;
    max-height: 200px;

    border-top: solid 1px var(--gus-ui-color-surface-focus);

    border-left: solid 1px var(--gus-ui-color-primary);
    border-right: solid 1px var(--gus-ui-color-primary);
    border-bottom: solid 1px var(--gus-ui-color-primary);

    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    
    transition: 0.2s;
}

</style>
<div class="gus_combobox" part="combobox">
    <div class="gus_combobox_content" part="combobox_content">
        <p class="gus_combobox_content_text" part="combobox_content_text">Error No Content</p>
        <svg class="gus_combobox_content_arrow" part="combobox_content_arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 12l-18 12v-24z"/></svg>
    </div>
    <div class="gus_combobox_elements" part="combobox_elements">
    </div>
</div>
`

export class GusComboBox extends HTMLElement {
    static get observedAttributes() {
        return ['content', 'default-value', 'selected-value'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.combobox = shadowRoot.querySelector('.gus_combobox')
        this.combobox_content = shadowRoot.querySelector('.gus_combobox_content')
        this.combobox_content_text = shadowRoot.querySelector('.gus_combobox_content_text')

        this.combobox_elements = shadowRoot.querySelector('.gus_combobox_elements')

        this.combobox_arrow = shadowRoot.querySelector('.gus_combobox_content_arrow')

        this.isActive = false

        // EVENTS
        this.event_valueChanged = new Event("value-changed")
        this.event_toggle = new Event("toggle")
        this.event_close = new Event("close")

        // LISTENERS
        this.combobox_content.addEventListener("click", (e) => {
            this.toggleComboBox()
        })

        document.addEventListener("click", (e) => {
            if (e.target !== this) {
                this.closeComboBox()
            }
        })
    }

    connectedCallback() {
        if (!this.content) {
            this.content = ''
        }
        if (!this.defaultValue) {
            this.defaultValue = this.content[0]
        }
        if (!this.selectedValue) {
            this.selectedValue = this.defaultValue
        }
        this.render()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'content':
                    this.content = newVal
                    this.selectedValue = this.content[0]
                    this.render()
                    break;
                case 'default-value':
                    this.defaultValue = newVal
                    break;
                case 'selected-value':
                    this.selectedValue = newVal
                    this.render()
                    break;
            }
        }
    }

    // Define methods for combobox 'content' attribute (JSON)
    get content() {
        return JSON.parse(this.getAttribute('content'))
    }

    set content(value) {
        this.setAttribute('content', value)
    }

    // Define methods for combobox 'default-value' attribute (String)
    get defaultValue() {
        return this.getAttribute('default-value')
    }

    set defaultValue(value) {
        this.setAttribute('default-value', value)
    }

    // Define methods for combobox 'selected-value' attribute (String)
    get selectedValue() {
        return this.getAttribute('selected-value')
    }

    set selectedValue(value) {
        this.setAttribute('selected-value', value)
    }

    // Re-render the whole combo box
    render() {
        this.clear()
        this.combobox_content_text.innerHTML = `${this.selectedValue}`
        for (var i = 0; i < this.content.length; i++) {
            var newElement = document.createElement('div')
            newElement.innerHTML = `
            <style>
            .gus_combobox_element {
                height: 50px;
                width: 100%;

                display: grid;
                align-items: center;

                background: var(--gus-ui-color-surface);

                cursor: pointer;
                transition: 0.1s;
            }
            .gus_combobox_element:hover {
                background: var(--gus-ui-color-surface-hover);
                transition: 0.1s;
            }
            .gus_combobox_element_text {
                margin-left: 20px;
            }
            </style>
            <div class="gus_combobox_element" part="combobox_element">
                <p class="gus_combobox_element_text" part="combobox_element_text">${this.content[i]}</p>
            </div>
            `
            newElement.addEventListener("click", (e) => {
                var newSelectedValue = null

                if (e.target.children.length > 0) {
                    newSelectedValue = e.target.children[0].innerHTML
                }
                else {
                    newSelectedValue = e.target.innerHTML
                }

                this.selectedValue = newSelectedValue // Store the new Selected Value

                this.combobox_content_text.innerHTML = this.selectedValue // Display it

                this.dispatchEvent(this.event_valueChanged)

                this.toggleComboBox() // Toggle the combobox
            })
            this.combobox_elements.appendChild(newElement)
        }
    }

    clear() {
        this.combobox_elements.innerHTML = ""
    }

    toggleComboBox() {
        if (this.isActive) {
            this.combobox.classList.remove("gus_combobox_active")
            this.combobox_elements.classList.remove("gus_combobox_elements_active")
            this.combobox_arrow.classList.remove("gus_combobox_content_arrow_active")
        }
        else {
            this.combobox.classList.add("gus_combobox_active")
            this.combobox_elements.classList.add("gus_combobox_elements_active")
            this.combobox_arrow.classList.add("gus_combobox_content_arrow_active")
        }
        this.isActive = !this.isActive
        this.dispatchEvent(this.event_toggle)
    }

    closeComboBox() {
        this.combobox.classList.remove("gus_combobox_active")
        this.combobox_elements.classList.remove("gus_combobox_elements_active")
        this.combobox_arrow.classList.remove("gus_combobox_content_arrow_active")
        this.isActive = false
        this.dispatchEvent(this.event_close)
    }
}

window.customElements.define('gus-combobox', GusComboBox)

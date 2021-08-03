const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_checkbox_div {
    display:grid;
    grid-template-columns: 1fr 3fr;
    justify-items: center;
    align-items: center;
}
.gus_checkbox_div_nocontent {
    grid-template-columns: 1fr;
}

.gus_checkbox {
    height: 20px;
    width: 20px;
    background: var(--gus-ui-color-primary);
    border: solid 1px var(--gus-ui-color-primary);
    border-radius: 5px;
    transition: 0.1s;
    cursor: pointer;
}
.gus_checkbox_unchecked {
    background: var(--gus-ui-color-background) !important;
    transition: 0.1s;
}

.gus_checkbox_icon {
    height: 100%;
    width: 100%;
    transition: 0.1s;
}

.gus_checkbox_content {
    margin-left: 5px;
    color: var(--gus-ui-color-on-background);
}

.gus_invisible {
    display: none;
    transition: 0.1s;
}
</style>
<div class="gus_checkbox_div">
    <div class="gus_checkbox" part="checkbox">
        <svg class="gus_checkbox_icon" part="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="640" height="640"><defs><path d="M271.49 457.07C277.94 463.53 277.94 474 271.49 480.46C266.09 485.86 260.02 491.92 254.24 497.71C248.86 503.08 240.15 503.08 234.78 497.71C199.75 462.68 105.96 368.89 71.32 334.25C64.87 327.79 64.87 317.32 71.32 310.86C76.72 305.47 81.21 300.98 86.61 295.58C93.06 289.12 103.53 289.12 109.99 295.58C144.63 330.22 236.85 422.44 271.49 457.07Z" id="i2MqTOYVi3"></path><path d="M274.42 476.03C266.6 483.84 253.94 483.84 246.13 476.03C241.23 471.13 238.75 468.65 233.37 463.27C226.87 456.78 226.87 446.24 233.37 439.74C295.32 377.79 467.52 205.6 528.99 144.12C536.8 136.31 549.47 136.31 557.28 144.12C562.18 149.03 562.76 149.6 567.66 154.5C575.47 162.31 575.47 174.98 567.66 182.79C506.18 244.27 335.89 414.56 274.42 476.03Z" id="e16sdqL2Uz"></path></defs><g><g><g><use xlink:href="#i2MqTOYVi3" opacity="1" fill="#f5f5f5" fill-opacity="1"></use></g><g><use xlink:href="#e16sdqL2Uz" opacity="1" fill="#f5f5f5" fill-opacity="1"></use></g></g></g></svg>
    </div>
    <p class="gus_checkbox_content" part="checkbox-content"></p>
</div>
`

export class GusCheckBox extends HTMLElement {
    static get observedAttributes() {
        return ['checked', 'content'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.checkbox_div = shadowRoot.querySelector('.gus_checkbox_div')
        this.checkbox = shadowRoot.querySelector('.gus_checkbox')
        this.checkbox_icon = shadowRoot.querySelector('.gus_checkbox_icon')
        this.checkbox_content = shadowRoot.querySelector('.gus_checkbox_content')

        // EVENTS
        this.event_valueChanged = new Event("value-changed")

        // LISTENERS
        this.checkbox.addEventListener('click', () => {
            this.checked = (this.checked == false)
            this.dispatchEvent(this.event_valueChanged)
        })
    }

    connectedCallback() {
        if (!this.checked) {
            this.checked = false
        }
        if (!this.content) {
            this.content = ''
        }
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'checked':
                    this.checked = newVal
                    break;
                case 'content':
                    this.content = newVal
                    break;
            }
        }
        this.render()
    }

    // Define methods for checkbox 'checked' attribute (boolean)
    get checked() {
        return this.getAttribute('checked') == 'true'
    }

    set checked(value) {
        this.setAttribute('checked', value)
    }

    // Define methods for checkbox 'content' attribute (string)
    get content() {
        return this.getAttribute('content')
    }

    set content(value) {
        this.setAttribute('content', value)
    }

    // Re-render the whole checkbox
    render() {
        if (this.checked) {
            this.checkbox.classList.remove("gus_checkbox_unchecked")
            this.checkbox_icon.classList.remove("gus_invisible")
        }
        else {
            this.checkbox.classList.add("gus_checkbox_unchecked")
            this.checkbox_icon.classList.add("gus_invisible")
        }
        if (this.content) {
            this.checkbox_div.classList.remove("gus_checkbox_div_nocontent")
            this.checkbox_content.classList.remove("gus_invisble")
            this.checkbox_content.innerHTML = `${this.content}`
        }
        else {
            this.checkbox_div.classList.add("gus_checkbox_div_nocontent")
            this.checkbox_content.classList.add("gus_invisble")
        }
    }
}

window.customElements.define('gus-checkbox', GusCheckBox)

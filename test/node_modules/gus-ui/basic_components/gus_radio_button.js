const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_radiobutton_div {
    display:grid;
    grid-template-columns: 1fr 3fr;
    justify-items: center;
    align-items: center;
}
.gus_radiobutton_div_nocontent {
    grid-template-columns: 1fr;
}

.gus_radiobutton {
    height: 20px;
    width: 20px;
    border: solid 2px var(--gus-ui-color-primary);
    border-radius: 100%;
    transition: 0.1s;
    cursor: default;

    display: grid;
    place-items: center;
}
.gus_radiobutton > div {
    height: 12px;
    width: 12px;

    background: var(--gus-ui-color-primary);
    border-radius: 100%;
    transition: 0.1s;
}

.gus_radiobutton_unchecked {
    border-color: var(--gus-ui-color-surface-focus);
    cursor: pointer;
    transition: 0.1s;
}

.gus_radiobutton_unchecked > div {
    opacity: 0;
    transition: 0.1s;
}

.gus_radiobutton_content {
    color: var(--gus-ui-color-on-background);
}

.gus_invisible {
    display: none;
    transition: 0.1s;
}
</style>
<div class="gus_radiobutton_div">
    <div class="gus_radiobutton" part="radiobutton">
        <div class="gus_radiobutton_circle"></div>
    </div>
    <p class="gus_radiobutton_content" part="radiobutton-content"></p>
</div>
`

export class GusRadioButton extends HTMLElement {
    static get observedAttributes() {
        return ['checked', 'content'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // Assign elements to variables
        this.radiobutton_div = shadowRoot.querySelector('.gus_radiobutton_div')
        this.radiobutton = shadowRoot.querySelector('.gus_radiobutton')
        this.radiobutton_content = shadowRoot.querySelector('.gus_radiobutton_content')
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

    // Define methods for radiobutton 'checked' attribute (boolean)
    get checked() {
        return this.getAttribute('checked') == 'true'
    }

    set checked(value) {
        this.setAttribute('checked', value)
    }

    // Define methods for radiobutton 'content' attribute (string)
    get content() {
        return this.getAttribute('content')
    }

    set content(value) {
        this.setAttribute('content', value)
    }

    // Re-render the whole radiobutton
    render() {
        if (!this.checked) {
            this.radiobutton.classList.add("gus_radiobutton_unchecked")
        }
        else {
            this.radiobutton.classList.remove("gus_radiobutton_unchecked")
        }
        if (this.content) {
            this.radiobutton_div.classList.remove("gus_radiobutton_div_nocontent")
            this.radiobutton_content.innerHTML = `${this.content}`
        }
        else {
            this.radiobutton_div.classList.add("gus_radiobutton_div_nocontent")
        }
    }
}

window.customElements.define('gus-radio-button', GusRadioButton)

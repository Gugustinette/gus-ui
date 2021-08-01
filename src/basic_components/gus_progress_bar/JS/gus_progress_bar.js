const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_progress_bar {
    height: 30px;
    width: 500px;
    background: var(--gus-ui-color-background);
    border-radius: 20px;
    display: grid;
    justify-items: center;
    transition: 0.4s;
}

.gus_progress_bar_filler {
    justify-self: left;
    height: 100%;
    width: 60%;
    background: var(--gus-ui-color-primary);
    border-radius: 20px;
    transition: 0.4s;
}

.gus_progress_bar_display_div { 
    height: 40px;
    position: absolute;
    align-self: flex-end;
}
.gus_progress_bar_display {
    color: var(--gus-ui-color-on-background);
    transition: 0.2s;
}
</style>
<div class="gus_progress_bar" part="progress-bar">
    <div class="gus_progress_bar_filler" part="progress-bar-filler">
    </div>
    <div class="gus_progress_bar_display_div">
        <p class="gus_progress_bar_display" part="progress-bar-display"></p>
    </div>
</div>
`

export class GusProgressBar extends HTMLElement {
    static get observedAttributes() {
        return ['filling', 'max-filling', 'display', 'to-display'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // Assign elements to variables
        this.progress_bar = shadowRoot.querySelector('.gus_progress_bar')
        this.progress_bar_filler = shadowRoot.querySelector('.gus_progress_bar_filler')
        this.progress_bar_display_div = shadowRoot.querySelector('.gus_progress_bar_display_div')
        this.progress_bar_display = shadowRoot.querySelector('.gus_progress_bar_display')
    }

    connectedCallback() {
        if (isNaN(this.filling)) {
            this.filling = '50'
        }
        if (!this.maxFilling) {
            this.maxFilling = '100'
        }
        if (!this.display) {
            this.display = false
        }
        if (!this.toDisplay) {
            this.toDisplay = ''
        }
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'filling':
                    this.filling = newVal
                    break;
                case 'max-filling':
                    this.maxFilling = newVal
                    break;
                case 'display':
                    this.display = newVal
                    break;
                case 'to-display':
                    this.toDisplay = newVal
                    break;
            }
        }
        this.render()
    }

    // Define methods for progress bar 'filling' attribute (string)
    get filling() {
        return parseInt(this.getAttribute('filling'))
    }

    set filling(value) {
        this.setAttribute('filling', value)
    }

    // Define methods for progress bar 'max-filling' attribute (string)
    get maxFilling() {
        return parseInt(this.getAttribute('max-filling'))
    }

    set maxFilling(value) {
        this.setAttribute('max-filling', value)
    }

    // Define methods for progress bar 'display' attribute (boolean)
    get display() {
        return this.getAttribute('display') == 'true'
    }

    set display(value) {
        this.setAttribute('display', value)
    }

    // Define methods for progress bar 'toDisplay' attribute (string)
    get toDisplay() {
        return this.getAttribute('to-display')
    }

    set toDisplay(value) {
        this.setAttribute('to-display', value)
    }

    // Re-render the whole progress bar
    render() {
        this.progress_bar_filler.style.width = `${this.filling / this.maxFilling * 100}%`
        
        if (this.display) { // Display text on the progress bar
            this.progress_bar.style.display = "grid"
            this.progress_bar_display_div.style.display = "inline-block"
            if (this.toDisplay) { // Display text given by the user
                this.progress_bar_display.innerHTML = `${this.toDisplay}`
            }
            else { // Display a standard text of type "x%"
                this.progress_bar_display.innerHTML = `${Math.round(this.filling / this.maxFilling * 100)}%`
            }
        }
        else {
            this.progress_bar.style.display = "inline-block"
            this.progress_bar_display_div.style.display = "none"
        }
    }
}

window.customElements.define('gus-progress-bar', GusProgressBar)

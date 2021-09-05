const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_slider {
    display: grid;
    height: 150px;
    width: 300px;
    justify-items: center;
    align-items: center;
    background: var(--gus-ui-color-surface);
    overflow: scroll;
    color: var(--gus-ui-color-on-surface);

    border: solid 1px var(--gus-ui-color-primary);
    border-radius: 10px;
}
.gus_slider div {
    height: 50px;
    width: 100%;
    display: grid;
    justify-content: center;
    align-content: center;
    transition: 0.2s;
    cursor: pointer;
}
.gus_slider div:hover {
    background: var(--gus-ui-color-surface-hover);
    transition: 0.2s;
}

#gus_slider_insert:hover {
    background: none;
    cursor: default;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.gus_slider_noscrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.gus_slider_noscrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
} 
</style>
<div class="gus_slider" part="slider">
</div>
`

export class GusSlider extends HTMLElement {
    static get observedAttributes() {
        return ['type', 'elements', 'hide-scrollbar', 'int-start', 'int-range', 'selected-value'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // EVENTS
        this.event_selected_value_changed = new Event('selected-value-changed'); // Selected value of slider changed

        // Assign elements to variables
        this.slider = shadowRoot.querySelector('.gus_slider')

        this.buttons = []

        this.selected_button_style = `
        <style>
        .selected_element {
            background: var(--gus-ui-color-surface-focus);
            cursor: default !important;
        }
        .selected_element:hover {
            background: var(--gus-ui-color-surface-focus) !important;
        }
        </style>
        `
    }

    connectedCallback() {
        if (this.type === 'int') {
            if (!this.int_range) {
                this.int_range = JSON.stringify([-10, 10])
            }
            if (!this.int_start) {
                this.int_start = Math.round((this.int_range[0]+this.int_range[1])/2);
            }
        }
        else {
            this.type = 'default'
            if (!this.elements) {
                this.elements = '["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]'
            }
        }
        if (!this.hide_scrollbar) {
            this.hide_scrollbar = 'false'
        }
        if (!this.selected_value) {
            if (this.type === "int") {
                this.selected_value = this.int_start
            }
            else {
                this.selected_value = this.elements[0]
            }
        }
        if (this.type !== "int") {
            this.int_start = this.getIdOfElement(this.selected_value)
        }
        this.render()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'type':
                    this.type = newVal
                    break;
                case 'elements':
                    this.elements = newVal
                    break;
                case 'hide-scrollbar':
                    this.hide_scrollbar = newVal
                    break;
                case 'int-start':
                    this.int_start = newVal
                    break;
                case 'int-range':
                    this.int_range = newVal
                    break;
                case 'selected-value':
                    this.selected_value = newVal
                    break;
            }
        }
    }

    // Re-render the whole slider
    render() {
        this.reset()
        if (this.type === "int") {
            // Int Button
            for (let i = this.int_range[0]; i <= this.int_range[1]; i++) {
                let newButton = document.createElement('div')
                let innerHTML = `${i}`
                if (this.selected_value === i) {
                    newButton.innerHTML = `${this.selected_button_style}${innerHTML}`
                    newButton.classList.add("selected_element")
                }
                else {
                    newButton.innerHTML = `${innerHTML}`
                    newButton.addEventListener('click', (e) => {
                        this.selected_value = parseInt(e.target.innerHTML)
                        this.dispatchEvent(this.event_selected_value_changed)
                        this.render()
                    })
                }
                this.buttons.push(newButton)
                this.slider.appendChild(newButton)
            }
            let range = this.int_start - this.int_range[0]
            this.slider.scrollTo(0, 50*range - 50)
        }
        else {
            // Classic String Button
            for (let i = 0; i < this.elements.length; i++) {
                let newButton = document.createElement('div')
                let innerHTML = `${this.elements[i]}`
                if (this.selected_value === this.elements[i]) {
                    newButton.innerHTML = `${this.selected_button_style}${innerHTML}`
                    newButton.classList.add("selected_element")
                }
                else {
                    newButton.innerHTML = `${innerHTML}`
                    newButton.addEventListener('click', (e) => {
                        this.selected_value = e.target.innerHTML
                        this.dispatchEvent(this.event_selected_value_changed)
                        this.render()
                    })
                }
                this.buttons.push(newButton)
                this.slider.appendChild(newButton)
                this.slider.scrollTo(0, 50*this.int_start - 50)
            }
        }
        if (this.hide_scrollbar) {
            this.slider.classList.add("gus_slider_noscrollbar")
        }
    }

    reset() {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].remove()
        }
        this.button = []
        if (this.type !== "int") {
            this.int_start = this.getIdOfElement(this.selected_value)
        }
        else {
            this.int_start = this.selected_value
        }
    }


    // Define methods for slider 'type' attribute (String)
    get type() {
        return this.getAttribute('type')
    }

    set type(value) {
        this.setAttribute('type', value)
    }

    // Define methods for slider 'elements' attribute (String Array)
    get elements() {
        return JSON.parse(this.getAttribute('elements'))
    }

    set elements(value) {
        this.setAttribute('elements', value)
    }

    // Define methods for slider 'selected_value' attribute (String)
    get selected_value() {
        if (this.type === "int") {
            return parseInt(this.getAttribute('selected-value'))
        }
        else {
            return this.getAttribute('selected-value')
        }
    }

    set selected_value(value) {
        this.setAttribute('selected-value', value)
    }

    // Define methods for slider 'hide-scrollbar' attribute (Boolean)
    get hide_scrollbar() {
        return this.getAttribute('hide-scrollbar') == 'true'
    }

    set hide_scrollbar(value) {
        this.setAttribute('hide-scrollbar', value)
    }

    // Define methods for slider 'int-start' attribute (Int)
    get int_start() {
        return parseInt(this.getAttribute('int-start'))
    }

    set int_start(value) {
        this.setAttribute('int-start', value)
    }

    // Define methods for slider 'int-range' attribute (Int Array)
    get int_range() {
        return JSON.parse(this.getAttribute('int_range'))
    }

    set int_range(value) {
        this.setAttribute('int_range', value)
    }

    getIdOfElement(elem) {
        for (let i = 0; i < this.elements.length; i++) {
            if (elem === this.elements[i]) {
                return i
            }
        } 
    }
}

window.customElements.define('gus-slider', GusSlider)
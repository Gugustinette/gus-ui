const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_section_slider {
    height: 100vh;
    width: 100vw;
    background: var(--gus-ui-color-background);
    overflow: hidden;
}

.gus_slider {
    display: flex;
    justify-content: center;
    height: 60px;
    width: 100%;
    background: var(--gus-ui-color-surface);
}

.gus_slider_display {
    display: grid;
    grid-template-rows: 10fr 1fr;
    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.gus_slider_display::-webkit-scrollbar {
    display: none;
}

.gus_slider_button_holder {
    display: flex;
    height: 100%;
    background: var(--gus-ui-color-surface);
}

.gus_slider_line {
    width: 10vw;
    min-width: 100px;
    max-width: 200px;
    background: var(--gus-ui-color-primary);
    transition: 0.2s;
}

.gus_section {
    display: flex;
    height: 90vh;
    background: var(--gus-ui-color-background);
    transition: 0.4s;
}
</style>
<div class="gus_section_slider" part="section-slider">
    <div class="gus_slider" part="slider">
        <div class="gus_slider_display">
            <div class="gus_slider_button_holder" part"slider-button-holder">
                <div class="gus_slider_button_insert">
                </div>
            </div>
            <div class="gus_slider_line" part="slider-line"></div>
        </div>
    </div>
    <div class="gus_section" part="section">
        <div class="gus_section_content_insert">
        </div>
    </div>
</div>
`

export class GusSectionSlider extends HTMLElement {
    static get observedAttributes() {
        return ['sections', 'inverted'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // Assign elements to variables
        this.section_slider = shadowRoot.querySelector('.gus_section_slider')
        this.slider = shadowRoot.querySelector('.gus_slider')
        this.slider_button_holder = shadowRoot.querySelector('.gus_slider_button_holder')
        this.slider_button_insert = shadowRoot.querySelector('.gus_slider_button_insert')
        this.slider_line = shadowRoot.querySelector('.gus_slider_line')

        this.section = shadowRoot.querySelector('.gus_section')
        this.section_content_insert = shadowRoot.querySelector('.gus_section_content_insert')

        this.slider_buttons = []
        this.section_sections = []

        this.selected_button = 0
    }

    connectedCallback() {
        if (!this.sections) {
            this.sections = JSON.stringify([
                {title: "Section 1"},
                {title: "Section 2"},
                {title: "Section 3"}
            ])
        }
        if (!this.inverted) {
            this.inverted = false;
        }

        this.render()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'sections':
                    this.sections = newVal
                    break;
                case 'inverted':
                    this.inverted = newVal
                    break;
            }
        }
    }

    // Define methods for section 'sections' attribute (JSON)
    get sections() {
        return JSON.parse(this.getAttribute('sections'))
    }

    set sections(value) {
        this.setAttribute('sections', value)
    }

    // Define methods for section 'inverted' attribute (Boolean)
    get inverted() {
        return this.getAttribute('inverted') == 'true'
    }

    set inverted(value) {
        this.setAttribute('inverted', value)
    }

    // Re-render the whole section-slider
    render() {
        this.createButtons()
        this.createSections()

        if (this.inverted) {
            this.section_slider.insertBefore(this.section, this.slider)
        }
        this.resize()
        this.replace()
    }

    // Resize section-slider elements
    resize() {
        this.section.style.height = `${this.section_slider.clientHeight - this.slider.clientHeight}px`
        this.section.style.width = `${this.sections.length * this.section_slider.clientWidth}px`
    }

    // Replace section-slider elements
    replace() {
        this.slider_line.style.marginLeft = `${this.selected_button * this.slider_buttons[0].clientWidth + (this.slider_buttons[0].clientWidth - this.slider_line.clientWidth) / 2 }px`
        this.section.style.marginLeft = `-${this.selected_button*this.section_slider.clientWidth}px`
    }

    // Generate all the slider buttons
    createButtons() {
        this.slider_buttons = []
        for (let i = 0; i < this.sections.length; i++) {
            let newButton = document.createElement('div')
            newButton.innerHTML = `
            <style>
            .gus_slider_button {
                display: grid;
                height: 100%;
                width: 10vw;
                min-width: 100px;
                max-width: 200px;
                background: var(--gus-ui-color-surface-focus);
                justify-content: center;
                align-content: center;
                justify-items: center;
                align-items: center;
                color: var(--gus-ui-color-on-surface);
                cursor: pointer;
                transition: 0.2s;
            }
            .gus_slider_button:hover {
                background: var(--gus-ui-color-surface) !important;
                transition: 0.2s;
            }
            .gus_slider_button_content {
                pointer-events: none;
            }
            </style>
            <div class="gus_slider_button" part="slider_button slider_button_${i + 1}">
                ${this.sections[i].title}
                <div class="gus_slider_button_content" part="slider_button_content slider_button_content_${i + 1}"></div>
            </div>
            `
            // Assign click event
            newButton.addEventListener('click', (e) => {
                let id = this.getButtonID(e.target, false)
                if (id != this.selected_button) {
                    this.selected_button = id
                    this.replace()
                }
            })
            // Store button
            this.slider_buttons.push(newButton)
            this.slider_button_holder.insertBefore(newButton, this.slider_button_insert)
        }
    }

    // Generate all the sections
    createSections() {
        this.section_sections = []
        for (let i = 0; i < this.sections.length; i++) {
            let newSection = document.createElement('div')
            newSection.innerHTML = `
            <slot name="section_${i + 1}">
            </slot>
            `
            this.section_sections.push(newSection)
            this.section.insertBefore(newSection, this.section_content_insert)
        }
    }

    // Return the index of given button if present in the slider, else return null
    getButtonID(button) {
        for (let i = 0; i < this.slider_buttons.length; i++) {
            if (this.slider_buttons[i].children[1] == button) {
                return i
            }
        }
        return null
    }
}

window.customElements.define('gus-section-slider', GusSectionSlider)

window.addEventListener('resize', function() {
    let all_gus_section_slider = document.querySelector('gus-section-slider')

    if (all_gus_section_slider) {
        all_gus_section_slider.resize()
        all_gus_section_slider.replace()
    }
});

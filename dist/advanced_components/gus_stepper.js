const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_stepper {
    min-height: 30px;
    min-width: 200px;

    display: flex;
    flex-direction: column;
    
    transition: 0.2s;
}

.gus_stepper * {
    margin: 0;
    padding: 0;

    transition: 0.2s;
}

.gus_stepper_clickable {
    cursor: pointer;
}

.gus_stepper_horizontal {
    flex-direction: row;
}








.gus_step_vertical {
    display: flex;
    flex-direction: row;
}

.gus_step_vertical_left {
    height: 100%;

    display: flex;
    flex-direction: column;
}

.gus_step_vertical_right {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
}

.gus_step_vertical_icon {
    display: grid;
    place-items: center;
}

.gus_step_icon_display {
    height: 50px;
    width: 50px;

    border-radius: 100%;

    background: var(--gus-ui-color-on-background);

    display: grid;
    place-items: center;

    color: var(--gus-ui-color-on-primary);
    font-size: 1em;
}

.gus_step_vertical_title {
    display: grid;
    align-items: center;
    height: 50px;
    margin-left: 10px;
}

.gus_step_vertical_title p {
    text-align: center;
    margin: 0;
    padding: 0;
    font-size: 1em;
}

.gus_step_vertical_link {
    display: grid;
    place-items: center;
}
.gus_step_vertical_link_display {
    background: var(--gus-ui-color-on-background);
    position: relative;

    height: 80px;
    width: 15px;

    margin-top: 10px;
    margin-bottom: 10px;
}
.gus_step_vertical_link_display_none {
    opacity: 0;
}
.gus_step_vertical_link_display_attach {
    margin-top: 0;
    margin-bottom: 0;
}

.gus_step_vertical_link_display_attach::before {
    content: "";

    position: absolute;
    
    background: inherit;

    top: -10px;
    bottom: 0;
    right: 0;
    left: 0;
}
.gus_step_vertical_link_display_attach::after {
    content: "";

    position: absolute;
    
    background: inherit;

    top: 0;
    bottom: -10px;
    right: 0;
    left: 0;
}













.gus_step_horizontal {
    width: auto;
    height: 200px;

    display: flex;
    flex-direction: column;

    color: var(--gus-ui-color-on-background);
}

.gus_step_horizontal_top {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
}

.gus_step_horizontal_bottom {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    justify-items: center;
    align-content: center;
}

.gus_step_horizontal_icon {
    display: grid;

    place-items: center;
    z-index: 1;
}

.gus_step_horizontal_title {
    display: grid;
    justify-items: center;
    align-items: end;
    width: 50px;
}

.gus_step_horizontal_title p {
    text-align: center;
    margin: 0;
    padding: 0;
    font-size: 1em;
}

.gus_step_horizontal_link {
    display: grid;
    place-items: center;
}

.gus_step_horizontal_link_display {
    position: relative;
    
    background: var(--gus-ui-color-on-background);

    width: 80px;

    margin-left: 10px;
    margin-right: 10px;

    height: 15px;
}

.gus_step_horizontal_link_display_attach {
    margin-left: 0;
    margin-right: 0;
}

.gus_step_horizontal_link_display_none {
    opacity: 0;
}

.gus_step_horizontal_link_display_attach::before {
    content: "";

    position: absolute;
    
    background: inherit;

    top: 0;
    bottom: 0;
    right: 0;
    left: -10px;
}
.gus_step_horizontal_link_display_attach::after {
    content: "";

    position: absolute;
    
    background: inherit;

    top: 0;
    bottom: 0;
    right: -10px;
    left: 0;
}


</style>
<div class="gus_stepper" part="stepper">
</div>
`

export class GusStepper extends HTMLElement {
    static get observedAttributes() {
        return ['nb-step', 'steps', 'orientation', 'step-link'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // Assign elements to variables
        this.stepper = shadowRoot.querySelector('.gus_stepper')
    }

    connectedCallback() {
        if (!this.content) {
            this.content = ""
        }
        if (!this.nb_step) {
            this.nb_step = this.content.length
        }
        if (!this.orientation) {
            this.orientation = "vertical"
        }
        if (!this.step_link) {
            this.step_link = "full"
        }

        this.render()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'steps':
                    this.content = newVal
                    break;
                case 'orientation':
                    this.orientation = newVal
                    break;
                case 'nb-step':
                    this.nb_step = newVal
                    break;
                case 'step-link':
                    this.step_link = newVal
                    break;
            }
        }
    }

    // Define methods for stepper 'steps' attribute (JSON)
    get content() {
        return JSON.parse(this.getAttribute('steps'))
    }

    set content(value) {
        this.setAttribute('steps', value)
    }

    // Define methods for stepper 'orientation' attribute (String)
    get orientation() {
        return this.getAttribute('orientation')
    }

    set orientation(value) {
        this.setAttribute('orientation', value)
    }

    // Define methods for stepper 'nb-step' attribute (Int)
    get nb_step() {
        return parseInt(this.getAttribute('nb-step'))
    }

    set nb_step(value) {
        this.setAttribute('nb-step', value)
    }

    // Define methods for stepper 'step-link' attribute (String)
    get step_link() {
        return this.getAttribute('step-link')
    }

    set step_link(value) {
        this.setAttribute('step-link', value)
    }

    // Re-render the whole stepper
    render() {
        this.stepper.innerHTML = ''
        if (this.orientation === "vertical") { // Vertical Stepper
            for (var i = 0; i < this.nb_step; i++) {
                let step = document.createElement("div");
                step.innerHTML = `
                <div class="gus_step_vertical">
                    <div class="gus_step_vertical_left">
                        <div class="gus_step_vertical_icon">
                            <div class="gus_step_icon_display" part="step">
                                ${this.content[i].content ?? i + 1}
                            </div>
                        </div>
                        ${
                            // Link step for every step except last one
                            (i !== this.nb_step - 1) ?
                            `
                            <div class="gus_step_vertical_link">
                                <div class="
                                gus_step_vertical_link_display
                                ${
                                    // StepLink: none
                                    (this.step_link === "none") ? "gus_step_vertical_link_display_none" : ""}
                                ${
                                    // StepLink: full
                                    (this.step_link === "full") ? "gus_step_vertical_link_display_attach" : ""}
                                " part="step-link"></div>
                            </div>
                            `
                            : ""
                        }
                    </div>
                    <div class="gus_step_vertical_right">
                        <div class="gus_step_vertical_title" part="step-title">
                            <p part="step-title-text">${this.content[i].title}</p>
                        </div>
                    </div>
                </div>
                `
                this.stepper.appendChild(step);
            }
        }
        else { // Horizontal Stepper
            this.stepper.classList.add("gus_stepper_horizontal")
            for (var i = 0; i < this.nb_step; i++) {
                let step = document.createElement("div")
                step.innerHTML = `
                <div class="gus_step_horizontal">
                    <div class="gus_step_horizontal_top">
                        <div class="gus_step_horizontal_title" part="step-title">
                            <p part="step-title-text">${this.content[i].title}</p>
                        </div>
                    </div>
                    <div class="gus_step_horizontal_bottom">
                        <div class="gus_step_horizontal_icon">
                            <div class="gus_step_icon_display" part="step">
                                ${this.content[i].content ?? i + 1}
                            </div>
                        </div>
                        ${
                            // Link step for every step except last one
                            (i !== this.nb_step - 1) ?
                            `
                            <div class="gus_step_horizontal_link">
                                <div class="
                                gus_step_horizontal_link_display
                                ${
                                    // StepLink: none
                                    (this.step_link === "none") ? "gus_step_horizontal_link_display_none" : ""}
                                ${
                                    // StepLink: full
                                    (this.step_link === "full") ? "gus_step_horizontal_link_display_attach" : ""}
                                " part="step-link"></div>
                            </div>
                            `
                            : ""
                        }
                    </div>
                </div>
                `
                this.stepper.appendChild(step);
            }
        }
    }
}

window.customElements.define('gus-stepper', GusStepper)

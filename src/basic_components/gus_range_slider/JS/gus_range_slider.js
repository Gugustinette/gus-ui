const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_range_slider {
    padding-top: 1px;
    width: 200px;
    height: 10px;
    border-radius: 20px;
    background: var(--gus-ui-color-surface-focus);
}
.gus_range_slider_disabled {
    background: rgba(100, 100, 100, 0.646);
}

.gus_range_slider_button {
    height: 25px;
    width: 25px;
    background: var(--gus-ui-color-white);
    box-shadow: var(--gus-ui-color-component-shadow);
    cursor: pointer;
    border-radius: 1000px;
    margin-top: -8px;
    transition: 0.1s;
}
.gus_range_slider_button_active {
    height: 28px;
    width: 28px;
    margin-top: -10px;
    transition: 0.1s;
}

</style>
<div class="gus_range_slider" part="range-slider">
    <div class="gus_range_slider_button" part="button"></div>
</div>
`

export class GusRangeSlider extends HTMLElement {
    static get observedAttributes() {
        return ['int-start', 'int-end', 'value', 'round-button-position'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.range_slider = shadowRoot.querySelector('.gus_range_slider')
        this.range_slider_button = shadowRoot.querySelector('.gus_range_slider_button')

        this.mousePos = null

        this.isDragging = false

        // EVENTS
        this.event_value_changed = new Event("selected-value-changed") // Fired when the user change the value of the range slider

        // LISTENERS
        document.onmousemove = (event) => {this.handleMouseMove()} // Store the mouse position in this.mousePos

        this.range_slider_button.addEventListener("mousedown", (e) => { // Start Dragging
            this.isDragging = true
            this.range_slider_button.classList.add("gus_range_slider_button_active")
            e.stopPropagation()
        })

        document.body.addEventListener("mousemove", (e) => { // On Dragging
            if (this.isDragging) {
                var range_slider_rect = this.range_slider.getBoundingClientRect()
                var range_slider_button_rect = this.range_slider_button.getBoundingClientRect()

                var newButtonPosition = Math.min(Math.max(
                    this.mousePos.x - range_slider_rect.left - (range_slider_button_rect.width / 2), // New Position
                    0 - (range_slider_button_rect.width / 2) // Min
                    ), range_slider_rect.width - (range_slider_button_rect.width / 2) // Max
                )

                this.range_slider_button.style.marginLeft = `${
                    newButtonPosition
                }px`

                this.value = this.getValueFromPosition(
                    newButtonPosition + (range_slider_button_rect.width / 2), // Position
                    range_slider_rect.width - (range_slider_button_rect.width / 2) + (range_slider_button_rect.width / 2) // Max Position
                )
                this.dispatchEvent(this.event_value_changed)
            }
        })

        document.addEventListener("mouseup", (e) => { // Stop Dragging
            this.isDragging = false

            if (this.roundButtonPosition) { // Round the position of the button
                var range_slider_rect = this.range_slider.getBoundingClientRect()
                var range_slider_button_rect = this.range_slider_button.getBoundingClientRect()

                var newButtonPosition = (this.value - this.int_start) * (range_slider_rect.width - (range_slider_button_rect.width / 2) + (range_slider_button_rect.width / 2)) / (this.int_end - this.int_start)
                newButtonPosition -= range_slider_button_rect.width / 2
                this.range_slider_button.style.marginLeft = `${
                    newButtonPosition
                }px`
            }

            this.range_slider_button.classList.remove("gus_range_slider_button_active")
        })

        this.range_slider.addEventListener("mousedown", (e) => { // Click & Dragging on range slider
            var range_slider_rect = this.range_slider.getBoundingClientRect()
            var range_slider_button_rect = this.range_slider_button.getBoundingClientRect()

            var newButtonPosition = Math.min(Math.max(
                this.mousePos.x - range_slider_rect.left - (range_slider_button_rect.width / 2), // New Position
                0 - (range_slider_button_rect.width / 2) // Min
                ), range_slider_rect.width - (range_slider_button_rect.width / 2) // Max
            )

            this.range_slider_button.style.marginLeft = `${
                newButtonPosition
            }px`

            this.value = this.getValueFromPosition(
                newButtonPosition + (range_slider_button_rect.width / 2), // Position
                range_slider_rect.width - (range_slider_button_rect.width / 2) + (range_slider_button_rect.width / 2) // Max Position
            )
            this.dispatchEvent(this.event_value_changed)

            this.range_slider_button.classList.add("gus_range_slider_button_active")
            // Dragging
            this.isDragging = true
        })
    }

    connectedCallback() {
        if (!this.int_start) {
            this.int_start = 0
        }
        if (!this.int_end) {
            this.int_end = this.int_start + 10
        }
        if (!this.value) {
            this.value = this.int_start
        }
        if (!this.roundButtonPosition) {
            this.roundButtonPosition = false
        }
        this.render()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'int-start':
                    this.int_start = newVal;
                    break;
                case 'int-end':
                    this.int_end = newVal;
                    break;
                case 'value':
                    this.value = newVal;
                    break;
                case 'round-button-position':
                    this.roundButtonPosition = newVal;
                    break;
            }
        }
    }

    // Define methods for range slider 'int-start' attribute (int)
    get int_start() {
        return parseInt(this.getAttribute('int-start'))
    }

    set int_start(value) {
        this.setAttribute('int-start', value)
    }

    // Define methods for range slider 'int-end' attribute (int)
    get int_end() {
        return parseInt(this.getAttribute('int-end'))
    }

    set int_end(value) {
        this.setAttribute('int-end', value)
    }

    // Define methods for range slider 'value' attribute (int)
    get value() {
        return parseInt(this.getAttribute('value'))
    }

    set value(newVal) {
        this.setAttribute('value', newVal)
    }

    // Define methods for range slider 'round-button-position' attribute (boolean)
    get roundButtonPosition() {
        return this.getAttribute('round-button-position') === "true"
    }

    set roundButtonPosition(value) {
        this.setAttribute('round-button-position', value)
    }

    // Re-render the whole range slider
    render() {
        this.value = this.int_start
    }

    handleMouseMove(event) {
        var newMousePos;

        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        newMousePos = {
            x: event.pageX,
            y: event.pageY
        };

        this.mousePos = newMousePos
    }

    getValueFromPosition(position, maxPosition) {
        var nbStep = this.int_end - this.int_start  // Number of step
        var stepValue = maxPosition / nbStep        // Value of a step (in px)
        var nbStepDone = position / stepValue       // Number of step passed by the button
        var value = this.int_start + nbStepDone     // Corresponding value
        return value
    }
}

window.customElements.define('gus-range-slider', GusRangeSlider)


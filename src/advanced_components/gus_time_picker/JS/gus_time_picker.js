const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_time_picker {
    position: relative;

    height: 500px;
    width: 400px;

    background: var(--gus-ui-color-surface);

    display: flex;
    flex-direction: column;
}

.gus_tp_time_display {
    height: 120px;
    width: 100%;
    background: var(--gus-ui-color-primary);

    display: grid;
    justify-content: center;
    align-content: center;

    font-size: 3em;
}

.gus_tp_time_display_holder {
    display: flex;
}

.gus_tp_time_display_period {
    margin-left: 5px;
    font-size: 2rem;

    display: grid;
    align-content: end;

    cursor: pointer;
}


.gus_tp_content {
    height: 100%;
    width: 100%;

    display: grid;
    grid-template-rows: 6fr 1fr;

    color: var(--gus-ui-color-on-surface);
}

.gus_tp_content_clock {
    display: grid;
    justify-items: center;
    align-items: center;
}


.gus_tp_clock {
    height: 275px;
    width: 275px;

    background: var(--gus-ui-color-background);

    border-radius: 100%;

    display: flex;
    align-items: center;
}

.gus_tp_clock_content_hours {
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    margin-left: 120px;
}

.gus_tp_clock_content_minutes {
    height: 100%;
    width: 50%;
    display: flex;
    visibility: hidden;
    align-items: center;
    margin-left: 120px;
}

.gus_tp_clock div {
    display: grid;

    height: 30px;
    width: 30px;

    position: absolute;

    border-radius: 100%;

    justify-content: center;
    align-content: center;

    z-index: 10;

    cursor: pointer;
    transition: 0.2s;
}

.gus_tp_clock_12 { transform: rotate(-90deg) translate(110px) rotate(90deg); }
.gus_tp_clock_1 { transform: rotate(-60deg) translate(110px) rotate(60deg); }
.gus_tp_clock_2 { transform: rotate(-30deg) translate(110px) rotate(30deg); }
.gus_tp_clock_3 { transform: translate(110px);}
.gus_tp_clock_4 { transform: rotate(30deg) translate(110px) rotate(-30deg); }
.gus_tp_clock_5 { transform: rotate(60deg) translate(110px) rotate(-60deg); }
.gus_tp_clock_6 { transform: rotate(90deg) translate(110px) rotate(-90deg); }
.gus_tp_clock_7 { transform: rotate(120deg) translate(110px) rotate(-120deg); }
.gus_tp_clock_8 { transform: rotate(150deg) translate(110px) rotate(-150deg); }
.gus_tp_clock_9 { transform: rotate(180deg) translate(110px) rotate(-180deg); }
.gus_tp_clock_10 { transform: rotate(210deg) translate(110px) rotate(-210deg); }
.gus_tp_clock_11 { transform: rotate(240deg) translate(110px) rotate(-240deg); }

.gus_tp_selector {
    height: 10px !important;
    width: 10px !important;

    background: var(--gus-ui-color-primary);

    display: grid;
    justify-items: center;
    align-items: center;

    z-index: 9 !important;

    transform: rotate(-90deg);

    cursor: default !important;

    margin-left: 130px;
}
.gus_tp_selector_bar {
    height: 3px !important;
    width: 100px !important;

    background: inherit;

    margin-left: 100px;
    border-radius: 0 !important;

    cursor: inherit !important;
}
.gus_tp_selector_circle {
    height: 35px !important;
    width: 35px !important;

    background: inherit;

    margin-left: 220px;
    cursor: inherit !important;
}


.gus_tp_content_buttons {
    width: 100%;

    display: flex;
}

.gus_tp_keyboard_button {
    height: 100%;
    width: 120px;

    display: grid;
    justify-items: center;
    align-items: center;
    cursor: pointer;

    transition: 0.2s;
}

.gus_tp_keyboard_button:hover {
    background: var(--gus-ui-color-surface-hover);
    transition: 0.2s;
}

.gus_tp_keyboard_button svg {
    width: 100%;
    fill: var(--gus-ui-color-on-surface);
}

.gus_tp_buttons {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
}

.gus_tp_buttons div {
    height: 100%;
    width: 120px;
    display: grid;
    justify-content: center;
    align-content: center;
    cursor: pointer;
    transition: 0.2s;
}

.gus_tp_buttons div:hover {
    background: var(--gus-ui-color-surface-hover);
    transition: 0.2s;
}



.gus_wy {
    display: grid;
    grid-template-rows: 6fr 1fr;
    row-gap: 20px;
}
.gus_wy_display {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
}
.gus_wy_buttons {
    justify-self: right;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
}
.gus_wy_button {
    min-height: 30px;
    min-width: 100px;
    display: grid;
    justify-content: center;
    align-content: center;
    transition: 0.2s;
    cursor: pointer;
}
.gus_wy_button:hover {
    background: var(--gus-ui-color-surface-hover);
    transition: 0.2s;
}

.gus_wk {
    display: grid;
    grid-template-rows: 2fr 1fr;
    justify-items: center;
    align-items: center;
    row-gap: 20px;
}
.gus_wk_display {
    display: grid;
    justify-items: center;
    align-items: center;
}
.gus_wk_buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
}

</style>
<div class="gus_time_picker" part="time_picker">

    <gus-focus-window close-on-click="true" class="gus_tp_window_keyboard">
        <div class="gus_wk">
            <div class="gus_wk_display">
                <p>Enter an hour in the following format : "hh:mm/period"</p>
                <input type="text" id="time_keyboard" class="time_keyboard" name="time_keyboard" placeholder="Example : 06:55/pm">
            </div>
            <div class="gus_wk_buttons">
                    <div class="gus_wy_button wk_ok">Ok</div>
                    <div class="gus_wy_button wk_cancel">Cancel</div>
            </div>
        </div>
    </gus-focus-window>

    <div class="gus_tp_time_display" part="time_picker_display">
        <div class="gus_tp_time_display_holder">
            <div class="gus_tp_time_display_value">nn:nn</div>
            <div class="gus_tp_time_display_period">nn</div>
        </div>
    </div>

    <div class="gus_tp_content">

        <div class="gus_tp_content_clock">
            <div class="gus_tp_clock" draggable="true">
                <div class="gus_tp_clock_content_hours">
                    <div class="gus_tp_clock_12">12</div>
                    <div class="gus_tp_clock_1">1</div>
                    <div class="gus_tp_clock_2">2</div>
                    <div class="gus_tp_clock_3">3</div>
                    <div class="gus_tp_clock_4">4</div>
                    <div class="gus_tp_clock_5">5</div>
                    <div class="gus_tp_clock_6">6</div>
                    <div class="gus_tp_clock_7">7</div>
                    <div class="gus_tp_clock_8">8</div>
                    <div class="gus_tp_clock_9">9</div>
                    <div class="gus_tp_clock_10">10</div>
                    <div class="gus_tp_clock_11">11</div>
                </div>

                <div class="gus_tp_clock_content_minutes">
                    <div class="gus_tp_clock_12">0</div>
                    <div class="gus_tp_clock_1">5</div>
                    <div class="gus_tp_clock_2">10</div>
                    <div class="gus_tp_clock_3">15</div>
                    <div class="gus_tp_clock_4">20</div>
                    <div class="gus_tp_clock_5">25</div>
                    <div class="gus_tp_clock_6">30</div>
                    <div class="gus_tp_clock_7">35</div>
                    <div class="gus_tp_clock_8">40</div>
                    <div class="gus_tp_clock_9">45</div>
                    <div class="gus_tp_clock_10">50</div>
                    <div class="gus_tp_clock_11">55</div>
                </div>

                <div class="gus_tp_selector">
                    <div class="gus_tp_selector_bar">
                    </div>
                    <div class="gus_tp_selector_circle">
                    </div>
                </div>
            </div>
        </div>

        <div class="gus_tp_content_buttons">
            <div class="gus_tp_keyboard_button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#F5F5F5"><path d="M0 8v14h24v-14h-24zm16 3h2v2h-2v-2zm-3 0h2v2h-2v-2zm3 3v2h-2v-2h2zm-6-3h2v2h-2v-2zm3 3v2h-2v-2h2zm-6-3h2v2h-2v-2zm3 3v2h-2v-2h2zm-7-3h3v2h-3v-2zm0 3h4v2h-4v-2zm14 5h-10v-2h10v2zm4-3h-4v-2h4v2zm0-3h-2v-2h2v2zm-13-7l4-4 4 4h-8z"/></svg>
            </div>
            <div class="gus_tp_buttons">
                <div class="gus_tp_button_confirm">Next &#8594;</div>
                <div class="gus_tp_button_cancel">Cancel</div>
            </div>
        </div>

    </div>

</div>
`

export class GusTimePicker extends HTMLElement {
    static get observedAttributes() {
        return ['time', 'period'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        /// VARIABLES

        // Assign elements to variables
        this.time_picker = shadowRoot.querySelector('.gus_time_picker')
        this.tp_clock = shadowRoot.querySelector('.gus_tp_clock') // Holding the whole clock system

        this.tp_clock_hours = shadowRoot.querySelector('.gus_tp_clock_content_hours') // Hour clock
        this.tp_clock_minutes = shadowRoot.querySelector('.gus_tp_clock_content_minutes') // Minute clock

        this.tp_time_display_value = shadowRoot.querySelector('.gus_tp_time_display_value') // The time displayed
        this.tp_time_display_period = shadowRoot.querySelector('.gus_tp_time_display_period') // The period displayed (am/pm)

        this.tp_selector = shadowRoot.querySelector('.gus_tp_selector') // The selector rotating in the clock

        this.tp_button_confirm = shadowRoot.querySelector('.gus_tp_button_confirm') // Confirm button
        this.tp_button_cancel = shadowRoot.querySelector('.gus_tp_button_cancel') // Cancel button

        this.tp_button_keyboard_switch = shadowRoot.querySelector('.gus_tp_keyboard_button') // Keyboard input button
        this.tp_keyboard_window = shadowRoot.querySelector('.gus_tp_window_keyboard') // Keyboard input window
        this.tp_keyboard_button_confirm = shadowRoot.querySelector('.wk_ok') // Confirm button for keyboard input window
        this.tp_keyboard_button_cancel = shadowRoot.querySelector('.wk_cancel') // Cancel button for keyboard input window
        this.tp_keyboard_textfield = shadowRoot.querySelector('.time_keyboard') // TextField for keyboard input window

        // Selector position
        this.selector_x = 0
        this.selector_y = 0 

        // Time
        this.hours = 0
        this.minutes = 0

        // True if the user is in the "minutes" interface
        this.isMinutes = false

        /// EVENTS

        this.event_confirm = new Event('confirm'); // User clicked on "Confirm button"
        this.event_cancel = new Event('cancel'); // User canceled the choosing of a time

        this.event_confirm_keyboard = new Event('confirm-keyboard'); // User clicked on "Confirm button" in Keyboard Input Window
        this.event_cancel_keyboard = new Event('cancel-keyboard'); // User clicked on "Cancel button" in Keyboard Input Window

        this.event_confirm_keyboard_succesfull = new Event('confirm-keyboard-scfl'); // User confirmed a correct input in Keyboard Input Window
        this.event_confirm_keyboard_wrong = new Event('confirm-keyboard-wrong'); // User confirmed a wrong input in Keyboard Input Window

        /// LISTENERS

        // User changing time period
        this.tp_time_display_period.addEventListener("click", (e) => {
            this.changePeriod()
            this.render()
        })

        // User started dragging
        this.tp_clock.addEventListener("dragstart", (e) => {
            // Get the position of the selector
            var selector_rect = this.tp_selector.getBoundingClientRect()
            this.selector_x = selector_rect.x
            this.selector_y = selector_rect.y

            // Change the drag shadow so it is hidden
            var img = new Image()
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
            e.dataTransfer.setDragImage(img, 0, 0)
        }, false);

        // User clicked the clock
        this.tp_clock.addEventListener("click", (e) => {
            this.rotateSelector(e)
        }, false);

        // User dragging
        document.addEventListener("dragover", (e) => {
            this.rotateSelector(e)
        }, false);

        // User clicked confirm button
        this.tp_button_confirm.addEventListener("click", (e) => {
            if (this.isMinutes) {
                this.dispatchEvent(this.event_confirm)
            }
            this.isMinutes = true;
            // Re-render the time-picker
            this.render()
            // Rotate the selector
            this.tp_selector.style.transform = `rotate(-90deg)`

            this.tp_button_confirm.innerHTML = "Confirm"
        })

        // User clicked cancel button
        this.tp_button_cancel.addEventListener("click", (e) => {
            if (!this.isMinutes) {
                this.dispatchEvent(this.event_cancel)
            }
            this.isMinutes = false;
            // Re-render the time-picker
            this.render()
            // Rotate the selector
            this.tp_selector.style.transform = `rotate(-90deg)`

            this.tp_button_confirm.innerHTML = "Next &#8594;"
        })

        // User clicked on Keyboard Input button
        this.tp_button_keyboard_switch.addEventListener("click", (e) => {
            this.tp_keyboard_window.visible = this.tp_keyboard_window.visible == false
        })

        // User clicked on Keyboard Input Confirm button
        this.tp_keyboard_button_confirm.addEventListener("click", (e) => {
            this.dispatchEvent(this.event_confirm_keyboard) // User clicked
            this.tp_keyboard_window.visible = false // Hide Window
            
            var kb_values = this.getKeyboardInputValues(this.tp_keyboard_textfield.value) // Get text field values
            if (kb_values) { // Correct input
                this.setTime(kb_values.hour, kb_values.minutes)
                this.period = kb_values.period
                this.render()
                this.dispatchEvent(this.event_confirm_keyboard_succesfull) // Scfl event
            }
            else { // Wrong input
                this.dispatchEvent(this.event_confirm_keyboard_wrong) // Wrong event
            }

            // Reset the textfield content
            this.tp_keyboard_textfield.value = ''
        })

        // User clicked on Keyboard Input Cancel button
        this.tp_keyboard_button_cancel.addEventListener("click", (e) => {
            this.dispatchEvent(this.event_cancel_keyboard)
            this.tp_keyboard_window.visible = false
            this.tp_keyboard_textfield.value = ''
        })

    }

    connectedCallback() {
        var today = new Date();
        if (!this.time) {
            this.hours = today.getHours() % 12 || 12
            this.minutes = this.normalizeTime(today.getMinutes())
            this.time = `${this.hours}:${this.minutes}`
        }
        if (!this.period) {
            if (today.getHours() >= 12) {
                this.period = "pm"
            }
            else {
                this.period = "am"
            }
        }
        this.render()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'time':
                    this.time = newVal
                    break;
                case 'period':
                    this.period = newVal
                    break;
            }
        }
    }

    // Define methods for time-picker 'time' attribute (string)
    get time() {
        return this.getAttribute('time')
    }

    set time(value) {
        this.setAttribute('time', value)
    }

    // Define methods for time-picker 'period' attribute (string: am / pm)
    get period() {
        return this.getAttribute('period')
    }

    set period(value) {
        this.setAttribute('period', value)
    }

    // Re-render the whole time-picker
    render() {
        this.tp_time_display_value.innerHTML = this.time
        this.tp_time_display_period.innerHTML = this.period

        if (this.isMinutes) {
            this.tp_clock_hours.style.visibility = 'hidden'
            this.tp_clock_minutes.style.visibility = 'visible'
        }
        else {
            this.tp_clock_minutes.style.visibility = 'hidden'
            this.tp_clock_hours.style.visibility = 'visible'
        }
    }

    // Time Management Methods

    setTime(new_hours, new_minutes) {
        this.time = `${new_hours}:${this.normalizeTime(new_minutes)}`
    }

    changePeriod() {
        if (this.period === "pm") {
            this.period = "am"
        }
        else {
            this.period = "pm"
        }
    }

    normalizeTime(value) {
        if (value >= 60) {
            value = 0
        }
        if (parseInt(value) < 10 && !value.length) {
            value = `0${value}`
        }
        return value
    }

    normalizePeriod(period) {
        if (period === "Am" || period === "aM" || period === "AM"  || period === "am") {
            return "am"
        }
        else {
            if (period === "Pm" || period === "pM" || period === "PM"  || period === "pm") {
                return "pm"
            }
        }
        return null
    }

    isValidHours(value) {
        return value >= 0 && value < 12 && Number.isInteger(value)
    }

    isValidMinutes(value) {
        return value >= 0 && value < 60 && Number.isInteger(value)
    }

    isValidPeriod(period) {
        return period === "am" || period === "pm" 
    }

    getKeyboardInputValues(kb) {
        try {
            var hour = 0
            var minutes = 0
            var period = 'am'

            var read = 1
            if (kb[read] === ':') {
                hour = kb[0]
            }
            else {
                read += 1
                hour = kb[0] + kb[1]
            }

            read += 2

            if (kb[read] === '/') {
                minutes = kb[read - 1]
            }
            else {
                minutes = kb[read - 1] + kb[read]
                read += 1
            }

            read += 1

            period = kb[read] + kb[read + 1]

            hour = parseInt(hour)
            minutes = parseInt(minutes)
            period = this.normalizePeriod(period)

            if (this.isValidHours(hour) && this.isValidMinutes(minutes) && this.isValidPeriod(period)) {
                return {hour: hour, minutes: minutes, period: period}
            }
            else {
                return null
            }
        }
        catch (e) {
            return null
        }
    }

    // Maths Methods

    rotateSelector(e) {
        // Get mouse position
        var mouse_pos_x = e.clientX
        var mouse_pos_y = e.clientY

        // Get the angle
        var angle = this.getAngleFromPoints(this.selector_x, this.selector_y, mouse_pos_x, mouse_pos_y)

        // Round it correctly
        if (this.isMinutes) {
            var final_angle = this.roundToMultipleOf(6, angle - 3)
            // Set the hour to the expected value
            this.minutes = final_angle / 30 * 5
        }
        else {
            var final_angle = this.roundToMultipleOf(30, angle - 15)
            // Set the hour to the expected value
            this.hours = final_angle / 30
        }

        // Set the displayed time
        this.setTime(this.hours, this.minutes)

        // Re-render the time-picker
        this.render()

        // Rotate the selector
        this.tp_selector.style.transform = `rotate(${final_angle - 90}deg)`
    }

    getAngleFromPoints(x1, y1, x2, y2) {
        var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI

        angle += 90

        if (angle < 0) {
            angle += 360
        }

        return angle
    }

    roundToMultipleOf(multiple, x)
    {
        return Math.ceil(x/multiple)*multiple;
    }

    getCurrentRotation(el){
        var st = window.getComputedStyle(el, null);
        var tm = st.getPropertyValue("-webkit-transform") ||
                 st.getPropertyValue("-moz-transform") ||
                 st.getPropertyValue("-ms-transform") ||
                 st.getPropertyValue("-o-transform") ||
                 st.getPropertyValue("transform") ||
                 "none";
        if (tm != "none") {
          var values = tm.split('(')[1].split(')')[0].split(',');
          /*
          a = values[0];
          b = values[1];
          angle = Math.round(Math.atan2(b,a) * (180/Math.PI));
          */
          //return Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI)); //this would return negative values the OP doesn't wants so it got commented and the next lines of code added
          var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
          return (angle < 0 ? angle + 360 : angle); //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
        }
        return 0;
    }
}

window.customElements.define('gus-time-picker', GusTimePicker)

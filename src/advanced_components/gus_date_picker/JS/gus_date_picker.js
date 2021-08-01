const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_dp {
    height: 450px;
    width: 300px;
    background: var(--gus-ui-color-surface);
    display: grid;
    grid-template-rows: 2fr 5fr 1fr;
}

.gus_dp_top {
    background: var(--gus-ui-color-primary);
    display: grid;
    grid-template-rows: 1.5fr 2fr;
}
.gus_dp_top_title {
    display: grid;
    align-content: center;
    margin-left: 20px;
}
.gus_dp_top_sub {
    display: grid;
    grid-template-columns: 4fr 1fr;
    align-content: center;
    margin-left: 20px;
    font-size: 2em;
}

.gus_dp_center {
    display: grid;
    grid-template-rows: 1.5fr 7fr;
}
.gus_dp_center_top {
    display: grid;
    grid-template-columns: 2fr 1fr;
    color: var(--gus-ui-color-on-primary);
}

.gus_dp_holder_selected_year {
    width: min-content;
    display: grid;
    grid-template-columns: 3fr 1fr;
    justify-items: center;
    align-items: center;
    transition: 0.2s;
    cursor: pointer;
}
.gus_dp_holder_selected_year:hover {
    background: var(--gus-ui-color-surface-hover);
    transition: 0.2s;
}
.gus_dp_selected_year {
    white-space: nowrap;
    margin-left: 20px;
    display: grid;
    color: var(--gus-ui-color-on-surface-secondary);
    align-content: center;
    font-size: 0.6em;
}

.gus_dp_holder_month {
    display: grid;
    color: inherit;
    grid-template-columns: 1fr 1fr;
}
.gus_dp_month {
    display: grid;
    color: inherit;
    justify-content: center;
    align-content: center;
    cursor: pointer;
    transition: 0.2s;
}
.gus_dp_month:hover {
    background: var(--gus-ui-color-surface-hover);
    transition: 0.2s;
}
.month_previous {
    transform: rotate(180deg);
}
.gus_icon_arrow {
    height: 20px;
}

.gus_dp_content {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
}
.gus_dp_day {
    color: var(--gus-ui-color-on-surface);
    font-size: 0.5em;
    height: 33px;
    width: 33px;
    border-radius: 33px;
    display: grid;
    justify-items: center;
    align-items: center;
    transition: 0.2s;
    cursor: pointer;
}
.gus_dp_day:hover {
    background: var(--gus-ui-color-surface-hover);
    transition: 0.2s;
}
.dp_weekday {
    color: var(--gus-ui-color-on-surface-secondary);
    cursor: default;
}
.gus_dp_actual_day {
    color: var(--gus-ui-color-on-surface);
    background: var(--gus-ui-color-primary);
    cursor: default;
}
.gus_dp_actual_day:hover {
    background: var(--gus-ui-color-primary);
}

.gus_dp_bottom div {
    height: 100%;
    min-width: 80px;
    display: grid;
    justify-content: center;
    align-content: center;
    color: var(--gus-ui-color-on-surface);
    transition: 0.2s;
    cursor: pointer;
}
.gus_dp_bottom div:hover {
    background: var(--gus-ui-color-surface-hover);
    transition: 0.2s;
}

.gus_dp_bottom {
    display: flex;
    flex-direction: row-reverse;
}
.gus_icon_selected_year {
    height: 15px;
    width: 15px;
    margin-left: 5px;
    margin-right: 20px;
}

.gus_dp_switch_keyboard {
    display: grid;
    justify-items: center;
    align-items: center;
    height: 40px;
    width: 40px;
    border-radius: 40px;
    transition: 0.2s;
    cursor: pointer;
}
.gus_dp_switch_keyboard:hover {
    background: var(--gus-ui-color-primary-hover);
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

<gus-focus-window class="gus_dp_window_year">
    <div class="gus_wy">
        <div class="gus_wy_display">
            <div>
                <p>Month</p>
                <gus-slider class="gus_dp_slider_month" elements='[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ]'></gus-slider>
            </div>
            <div>
                <p>Year</p>
                <gus-slider class="gus_dp_slider_year" type="int" int-range='[1944, 2044]'></gus-slider>
            </div>
        </div>
        <div class="gus_wy_buttons">
                <div class="gus_wy_button wy_ok">Ok</div>
                <div class="gus_wy_button wy_cancel">Cancel</div>
        </div>
    </div>
</gus-focus-window>

<gus-focus-window class="gus_dp_window_keyboard">
    <div class="gus_wk">
        <div class="gus_wk_display">
            <p>Enter a date in following format : "mm/dd/yyyy"</p>
            <input type="text" id="date_keyboard" class="date_keyboard" name="date_keyboard" placeholder="mm/dd/yyyy">
        </div>
        <div class="gus_wk_buttons">
                <div class="gus_wy_button wk_ok">Ok</div>
                <div class="gus_wy_button wk_cancel">Cancel</div>
        </div>
    </div>
</gus-focus-window>

<div class="gus_dp" part="date_picker">
    <div class="gus_dp_top">
        <div class="gus_dp_top_title">Select Date</div>
        <div class="gus_dp_top_sub">
            <div class="gus_dp_selected_date">Mon, Nov 17</div>
            <div class="gus_dp_switch_keyboard">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path style="fill: var(--gus-ui-color-on-background);" d="M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z"/></svg>
            </div>
        </div>
    </div>
    <div class="gus_dp_center">
        <div class="gus_dp_center_top">
            <div class="gus_dp_holder_selected_year">
                <div class="gus_dp_selected_year">Date</div>
                <svg class="gus_icon_selected_year" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="640" height="640"><defs><path d="M169.62 320L19.25 174.79L320.01 174.79L620.75 174.79L470.39 320L320.01 465.21L169.62 320Z" id="f5c81ygHk"></path></defs><g><g><g><use xlink:href="#f5c81ygHk" opacity="1" fill="#808080" fill-opacity="1"></use></g></g></g></svg>
            </div>
            <div class="gus_dp_holder_month">
                <div class="gus_dp_month month_previous"><svg class="gus_icon_arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path style="fill: #808080;" d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg></div>
                <div class="gus_dp_month month_next"><svg class="gus_icon_arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path style="fill: #808080;" d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg></div>
            </div>
        </div>
        <div class="gus_dp_content">
            <div class="gus_dp_day dp_weekday">S</div>
            <div class="gus_dp_day dp_weekday">M</div>
            <div class="gus_dp_day dp_weekday">T</div>
            <div class="gus_dp_day dp_weekday">W</div>
            <div class="gus_dp_day dp_weekday">T</div>
            <div class="gus_dp_day dp_weekday">F</div>
            <div class="gus_dp_day dp_weekday">S</div>
        </div>
    </div>
    <div class="gus_dp_bottom">
        <div class="gus_dp_button_confirm">Confirm</div>
        <div class="gus_dp_button_cancel">Cancel</div>
    </div>
</div>
`

export class GusDatePicker extends HTMLElement {
    static get observedAttributes() {
        return ['lang'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS & VARIABLES
        this.date_picker = shadowRoot.querySelector('.gus_date_picker')
        this.date_content = shadowRoot.querySelector('.gus_dp_content')
        this.date_selected = shadowRoot.querySelector('.gus_dp_selected_date')

        this.date_title = shadowRoot.querySelector('.gus_dp_top_title')

        this.year_selected_holder = shadowRoot.querySelector('.gus_dp_holder_selected_year')
        this.year_selected = shadowRoot.querySelector('.gus_dp_selected_year')

        this.date = new Date()
        this.selected_date = new Date(this.date)
        this.firstDayOfTheWeek = this.getFirstDayOfDate(this.date.getMonth(), this.date.getFullYear())

        this.days = []

        this.next_month = shadowRoot.querySelector('.month_next')
        this.previous_month = shadowRoot.querySelector('.month_previous')

        this.window_year = shadowRoot.querySelector('.gus_dp_window_year')

        this.slider_month = shadowRoot.querySelector('.gus_dp_slider_month')
        this.slider_year = shadowRoot.querySelector('.gus_dp_slider_year')

        this.button_wy_ok = shadowRoot.querySelector('.wy_ok')
        this.button_wy_cancel = shadowRoot.querySelector('.wy_cancel')

        this.button_switch_keyboard = shadowRoot.querySelector('.gus_dp_switch_keyboard')

        this.window_keyboard = shadowRoot.querySelector('.gus_dp_window_keyboard')

        this.input_keyboard = shadowRoot.querySelector('.date_keyboard')

        this.button_wk_ok = shadowRoot.querySelector('.wk_ok')
        this.button_wk_cancel = shadowRoot.querySelector('.wk_cancel')

        this.button_ok = shadowRoot.querySelector('.gus_dp_button_confirm')
        this.button_cancel = shadowRoot.querySelector('.gus_dp_button_cancel')

        // EVENTS

        this.event_date_changed = new Event('date-changed'); // User changed the selected date

        this.event_confirm = new Event('confirm'); // User clicked on "Confirm button"
        this.event_cancel = new Event('cancel'); // User canceled the choosing of a date

        this.event_confirm_slider = new Event('confirm-slider'); // User clicked on "Confirm button" in Slider Input Window
        this.event_cancel_slider = new Event('cancel-slider'); // User clicked on "Cancel button" in Slider Input Window

        this.event_confirm_keyboard = new Event('confirm-keyboard'); // User clicked on "Confirm button" in Keyboard Input Window
        this.event_cancel_keyboard = new Event('cancel-keyboard'); // User clicked on "Cancel button" in Keyboard Input Window

        this.event_confirm_keyboard_succesfull = new Event('confirm-keyboard-scfl'); // User confirmed a correct input in Keyboard Input Window
        this.event_confirm_keyboard_wrong = new Event('confirm-keyboard-wrong'); // User confirmed a wrong input in Keyboard Input Window

        // LISTENERS

        this.button_ok.addEventListener('click', (e) => { // Confirm Button
            this.dispatchEvent(this.event_confirm)
        })
        this.button_cancel.addEventListener('click', (e) => { // Cancel Button
            this.dispatchEvent(this.event_cancel)
        })

        this.next_month.addEventListener('click', (e) => { // Next Month Arrow
            this.date.setMonth(this.date.getMonth() + 1)
            this.render()
        })
        this.previous_month.addEventListener('click', (e) => { // Previous Month Arrow
            this.date.setMonth(this.date.getMonth() - 1)
            this.render()
        })

        this.year_selected_holder.addEventListener('click', (e) => { // Slider Selector
            this.slider_month.selected_value = this.getMonthFromNumber(this.date.getMonth())
            this.slider_year.selected_value = this.date.getFullYear()
            this.window_year.visible = true
        })

        this.button_wy_ok.addEventListener('click', (e) => { //  Slider Selector "Confirm button"
            if (this.window_year.visible) {
                this.window_year.visible = false;
            }
            this.date.setMonth(this.slider_month.int_start)
            this.date.setFullYear(this.slider_year.selected_value)
            this.dispatchEvent(this.event_confirm_slider)
            this.render()
        })
        this.button_wy_cancel.addEventListener('click', (e) => { // Year Slider Selector "Cancel Button"
            if (this.window_year.visible) {
                this.window_year.visible = false
            }
            this.dispatchEvent(this.event_cancel_slider)
        })

        this.button_switch_keyboard.addEventListener('click', (e) => { // "Switch to Keyboard input" button
            if (!this.window_keyboard.visible) {
                this.window_keyboard.visible = true
            }
        })

        this.button_wk_ok.addEventListener('click', (e) => { // Keyboard Input "Confirm button"
            if (this.window_keyboard.visible) {
                this.window_keyboard.visible = false
            }
            if (this.isDate(this.input_keyboard.value)) { // Valid Date Input
                this.date = new Date(this.input_keyboard.value)
                this.selected_date = new Date(this.date)
                this.dispatchEvent(this.event_confirm_keyboard_succesfull)
                this.dispatchEvent(this.event_date_changed)
                this.render()
            }
            else { // Invalid Date Input
                // alert("ERROR : Invalid Date")
                this.dispatchEvent(this.event_confirm_keyboard_wrong)
            }
        })
        this.button_wk_cancel.addEventListener('click', (e) => { // Keyboard Input "Cancel Button"
            if (this.window_keyboard.visible) {
                this.window_keyboard.visible = false
            }
        })
    }

    connectedCallback() {
        if (!this.lang) {
            this.lang = "EN"
        }
        if (this.lang == "fr") {
            this.lang = "FR"
        }
        this.render()
    }

    // Define methods for date picker 'lang' attribute (String)
    get lang() {
        return this.getAttribute('lang')
    }

    set lang(value) {
        this.setAttribute('lang', value)
    }

    // Re-render the whole date-picker
    render() {
        this.reset()

        if (this.lang == "FR") {
            this.toggleFR()
        }

        // Create offset days
        for (let i = 0; i < this.firstDayOfTheWeek; i++) {
            let newDay = document.createElement('div')
            this.date_content.appendChild(newDay)
            this.days.push(newDay)
        }
        // Create days
        for (let i = 0; i < this.nbDaysInMonth(this.date.getMonth(), this.date.getFullYear()); i++) {
            let newDay = document.createElement('div')
            newDay.innerHTML = `${i+1}`
            newDay.classList.add('gus_dp_day')
            if (this.date.getMonth() === this.selected_date.getMonth() && this.date.getFullYear() === this.selected_date.getFullYear() && i + 1 === this.selected_date.getDate()) {
                newDay.classList.add('gus_dp_actual_day')
            }
            newDay.addEventListener('click', (e) => {
                let nbDay = parseInt(e.target.innerHTML)
                this.selected_date = new Date(this.date.setDate(nbDay))
                this.dispatchEvent(this.event_date_changed);
                this.render()
            })
            this.days.push(newDay)
            this.date_content.appendChild(newDay)
        }
        // Set the selected date
        this.date_selected.innerHTML = `${this.selected_date.toDateString().substring(0, 3)}, ${this.selected_date.toDateString().substring(4, 7)} ${this.date.getDate()}`
        // Set the selected year
        this.year_selected.innerHTML = `${this.getMonthFromNumber(this.date.getMonth())} ${this.date.getFullYear()}`
    }

    // Reset the date-picker
    reset() {
        this.firstDayOfTheWeek = this.getFirstDayOfDate(this.date.getMonth(), this.date.getFullYear())
        for (let i = 0; i < this.days.length; i++) {
            this.days[i].remove()
        }
        this.days = []

        this.date_content.innerHTML = `
        <div class="gus_dp_day dp_weekday">S</div>
        <div class="gus_dp_day dp_weekday">M</div>
        <div class="gus_dp_day dp_weekday">T</div>
        <div class="gus_dp_day dp_weekday">W</div>
        <div class="gus_dp_day dp_weekday">T</div>
        <div class="gus_dp_day dp_weekday">F</div>
        <div class="gus_dp_day dp_weekday">S</div>
        `
        this.date_title.innerHTML = "Select date"
        this.button_ok.innerHTML = "Confirm"
        this.button_cancel.innerHTML = "Cancel"
    }

    nbDaysInMonth(month, year) {
        if ( (month % 2 === 0 && month <= 6) || (month % 2 !== 0 && month > 6) ) {
            return 31
        }
        else {
            if (month === 1) {
                if ( (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                    return 29
                }
                return 28
            }
        }
        return 30
    }

    getFirstDayOfDate(month, year) {
        var firstDay = new Date(`${this.getMonthFromNumber(month)} 1 ${year}`)
        
        if (this.lang == "FR") {
            if (firstDay.getDay() !== 0) {
                return firstDay.getDay() - 1
            }
            else {
                return 6
            }
        }
        else {
            return firstDay.getDay()
        }
    }

    getCenturyOfyear(year) {
        return Math.floor(year / 100)
    }

    getMonthFromNumber(month) {
        switch (month) {
            case 0 :
                return 'January'
            case 1 :
                return 'February'
            case 2 :
                return 'March'
            case 3 :
                return 'April'
            case 4 :
                return 'May'
            case 5 :
                return 'June'
            case 6 :
                return 'July'
            case 7 :
                return 'August'
            case 8 :
                return 'September'
            case 9 :
                return 'October'
            case 10 :
                return 'November'
            case 11 :
                return 'December'
        }
    }

    isDate(string) {
        let test_date = new Date(string)
        return test_date.toString() !== "Invalid Date"
    }

    toggleFR() {
        this.date_content.innerHTML = `
        <div class="gus_dp_day dp_weekday">L</div>
        <div class="gus_dp_day dp_weekday">M</div>
        <div class="gus_dp_day dp_weekday">M</div>
        <div class="gus_dp_day dp_weekday">J</div>
        <div class="gus_dp_day dp_weekday">V</div>
        <div class="gus_dp_day dp_weekday">S</div>
        <div class="gus_dp_day dp_weekday">D</div>
        `
        this.date_title.innerHTML = "Sélectionnez une date"
        this.button_ok.innerHTML = "Confirmer"
        this.button_cancel.innerHTML = "Annuler"
    }
}

window.customElements.define('gus-date-picker', GusDatePicker)

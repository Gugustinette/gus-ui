const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_countdown {
    font-size: 2em;
    color: var(--gus-ui-color-on-surface);
}
</style>
<div class="gus_countdown" part="countdown">
00:00:00
</div>
`

export class GusCountdown extends HTMLElement {
    static get observedAttributes() {
        return ['days', 'hours', 'minutes', 'seconds', 'milliseconds', 'show-days', 'show-hours', 'show-milliseconds'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.countdown = shadowRoot.querySelector('.gus_countdown')


        this.event_finished = new Event("finished")

        this.remainingMilliseconds = 0
        this.remainingSeconds = 0
        this.remainingMinutes = 0
        this.remainingHours = 0
        this.remainingDays = 0
    }

    connectedCallback() {
        if (!this.milliseconds) {
            this.milliseconds = 0
        }
        else {
            this.showMilliseconds = true
        }
        if (!this.seconds) {
            this.seconds = 10
        }
        if (!this.minutes) {
            this.minutes = 0
        }
        if (!this.hours) {
            this.hours = 0
        }
        else {
            this.showHours = true
        }
        if (!this.days) {
            this.days = 0
        }
        else {
            this.showHours = true
            this.showDays = true
        }
        this.render()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'milliseconds':
                    this.milliseconds = newVal
                    break;
                case 'seconds':
                    this.seconds = newVal
                    break;
                case 'minutes':
                    this.minutes = newVal
                    break;
                case 'hours':
                    this.hours = newVal
                    break;
                case 'days':
                    this.days = newVal
                    break;
                case 'show-milliseconds':
                    this.showMilliseconds = newVal
                    break;
                case 'show-hours':
                    this.showHours = newVal
                    break;
                case 'show-days':
                    this.showDays = newVal
                    break;
            }
        }
    }

    // Define methods for countdown 'days' attribute (Int)
    get days() {
        return parseInt(this.getAttribute('days'))
    }

    set days(value) {
        this.setAttribute('days', value)
    }

    // Define methods for countdown 'hours' attribute (Int)
    get hours() {
        return parseInt(this.getAttribute('hours'))
    }

    set hours(value) {
        this.setAttribute('hours', value)
    }

    // Define methods for countdown 'minutes' attribute (Int)
    get minutes() {
        return parseInt(this.getAttribute('minutes'))
    }

    set minutes(value) {
        this.setAttribute('minutes', value)
    }

    // Define methods for countdown 'seconds' attribute (Int)
    get seconds() {
        return parseInt(this.getAttribute('seconds'))
    }

    set seconds(value) {
        this.setAttribute('seconds', value)
    }

    // Define methods for countdown 'milliseconds' attribute (Int)
    get milliseconds() {
        return parseInt(this.getAttribute('milliseconds'))
    }

    set milliseconds(value) {
        this.setAttribute('milliseconds', value)
    }

    // Define methods for countdown 'show-days' attribute (Boolean)
    get showDays() {
        return this.getAttribute('show-days') === 'true'
    }

    set showDays(value) {
        this.setAttribute('show-days', value)
    }

    // Define methods for countdown 'show-hours' attribute (Boolean)
    get showHours() {
        return this.getAttribute('show-hours') === 'true'
    }

    set showHours(value) {
        this.setAttribute('show-hours', value)
    }

    // Define methods for countdown 'show-milliseconds' attribute (Boolean)
    get showMilliseconds() {
        return this.getAttribute('show-milliseconds') === 'true'
    }

    set showMilliseconds(value) {
        this.setAttribute('show-milliseconds', value)
    }

    reformatData() {
        // Milliseconds
        if (this.milliseconds > 999) {
            var offset = Math.ceil(this.milliseconds / 1000) - 1

            this.remainingMilliseconds = this.milliseconds - offset * 1000
            this.seconds += offset
        } else {
            this.remainingMilliseconds = this.milliseconds
        }

        // Seconds
        if (this.seconds > 59) {
            var offset = Math.ceil(this.seconds / 60) - 1

            this.remainingSeconds = this.seconds - offset * 60
            this.minutes += offset
        } else {
            this.remainingSeconds = this.seconds
        }

        // Minutes
        if (this.minutes > 59) {
            var offset = Math.ceil(this.minutes / 60) - 1

            this.remainingMinutes = this.minutes - offset * 60
            this.hours += offset
        } else {
            this.remainingMinutes = this.minutes
        }

        // Hours
        if (this.hours > 23) {
            var offset = Math.ceil(this.hours / 24) - 1

            this.remainingHours = this.hours - offset * 24
            this.days += offset
        }
        else {
            this.remainingHours = this.hours
        }

        // Days
        this.remainingDays = this.days
    }

    calculate() {
        if (this.remainingMilliseconds < 0) {
            var offset = this.remainingMilliseconds
            this.remainingMilliseconds = this.remainingSeconds > 0 ? 999 : 0
            this.remainingMilliseconds -= offset
            this.remainingSeconds -= 1
        }

        if (this.remainingSeconds === -1) {
            this.remainingSeconds = this.remainingMinutes > 0 ? 59 : 0
            this.remainingMilliseconds = 999
            this.remainingMinutes -= 1
        }

        if (this.remainingMinutes === -1) {
            this.remainingMinutes = this.remainingHours > 0 ? 59 : 0
            this.remainingSeconds = 59
            this.remainingMilliseconds = 999
            this.remainingHours -= 1
        }

        if (this.remainingHours === -1) {
            this.remainingHours = this.remainingDays > 0 ? 23 : 0
            this.remainingMinutes = 59
            this.remainingSeconds = 59
            this.remainingMilliseconds = 999
            this.remainingDays -= 1
        }

        if (this.remainingDays === -1) {
            this.remainingHours = 23
            this.remainingMinutes = 59
            this.remainingSeconds = 59
            this.remainingMilliseconds = 999
            this.remainingDays = 0
        }
    }

    getDisplay() {
        var daysDisplay = ""
        var hoursDisplay = ""
        var minutesDisplay = ""
        var secondsDisplay = ""
        var millisecondsDisplay = ""

        if (this.showDays) {
            daysDisplay = `${this.remainingDays}:`
        }
        if (this.showHours) {
            hoursDisplay = `${this.remainingHours > 9 ? this.remainingHours : `0${this.remainingHours}`}:`
        }

        minutesDisplay = `${this.remainingMinutes > 9 ? this.remainingMinutes : `0${this.remainingMinutes}`}:`

        secondsDisplay = `${this.remainingSeconds > 9 ? this.remainingSeconds : `0${this.remainingSeconds}`}`

        if (this.showMilliseconds) {
            secondsDisplay = `${secondsDisplay}:`
            millisecondsDisplay = this.remainingMilliseconds < 10 ? "0" : ""
            millisecondsDisplay = `${this.remainingMilliseconds < 100 ? "0" : ""}${millisecondsDisplay}${this.remainingMilliseconds}`
        }

        return daysDisplay + hoursDisplay + minutesDisplay + secondsDisplay + millisecondsDisplay
    }

    isFinished() {
        return this.remainingDays === 0
        && this.remainingHours === 0
        && this.remainingMinutes === 0
        && this.remainingSeconds === 0
        && this.remainingMilliseconds === 0
    }

    // Re-render the whole countdown
    render() {
        this.reformatData()

        this.calculate()

        this.countdown.innerHTML = this.getDisplay()

        if (this.showMilliseconds) {
            let timer = setInterval((e) => {
                this.remainingMilliseconds -= 25
                this.calculate()
                this.countdown.innerHTML = this.getDisplay()
                if (this.isFinished()) {
                    this.dispatchEvent(this.event_finished)
                    clearInterval(timer)
                }
            }, 25)
        }
        else {
            let timer = setInterval((e) => {
                this.remainingSeconds -= 1
                this.calculate()
                this.countdown.innerHTML = this.getDisplay()
                if (this.isFinished()) {
                    this.dispatchEvent(this.event_finished)
                    clearInterval(timer)
                }
            }, 1000)
        }
    }
}

window.customElements.define('gus-countdown', GusCountdown)

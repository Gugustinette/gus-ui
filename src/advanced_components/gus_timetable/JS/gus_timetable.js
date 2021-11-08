const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_timetable {
    min-height: 100px;
    min-width: 200px;

    background: var(--gus-ui-color-surface);

    display: flex;
    flex-direction: row;
    align-items: stretch;

    color: var(--gus-ui-color-on-surface);

    box-shadow: var(--gus-ui-color-component-shadow);
}



.hours-holder {
    min-width: 30px;

    padding-left: 20px;

    border-right: solid 1px grey;
    padding-right: 5px;

    display: flex;
    flex-direction: column;
}

.cell-hour {
    height: 40px;
    width: 100%;

    display: grid;

    justify-content: right;
    align-content: center;

    margin-top: 1px;
}

.days-and-content-holder {
    width: 100%;

    display: grid;

    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
.content-holder {
    position: relative;

    display: flex;
    flex-direction: column;

    border-right: solid 1px grey;
}

.cell-day {
    height: 40px;
    width: 100%;

    display: grid;
    place-content: center;

    text-align: center;

    border-bottom: solid 1px grey;
}
.cell-content {
    height: 40px;
    width: 100%;

    border-bottom: solid 1px var(--gus-ui-color-surface-hover);

    color: var(--gus-ui-color-on-primary);
}

.task {
    position: absolute;

    height: 40px;
    width: 100%;

    display: grid;

    place-content: center;
    text-align: center;

    color: var(--gus-ui-color-on-primary);

    background: var(--gus-ui-color-primary);
}
</style>
<div class="gus_timetable" part="timetable">
    <div class="hours-holder" part="hours-holder">
    </div>
    <div class="days-and-content-holder" >
    </div>
</div>
`

export class GusTimeTable extends HTMLElement {
    static get observedAttributes() {
        return ['content', 'days', 'hours', 'cell-height'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.timetable = shadowRoot.querySelector('.gus_timetable')

        this.timetableHoursHolder = shadowRoot.querySelector('.hours-holder')
        this.timetableDaysContentHolder = shadowRoot.querySelector('.days-and-content-holder')

        // VARIABLES
        this.daysElement = []
        this.firstRenderDone = false
    }

    connectedCallback() {
        if (!this.content) {
            this.content = JSON.stringify([
                /*

                // Day 1
                [
                    {
                        title: "Task 1",
                        startHour: "8h",
                        endHour: "10h"
                    }
                ],

                // Day 2
                [
                    {
                        title: "Task 2",
                        startHour: "9h",
                        startMinutes: "15",
                        endHour: "11h",
                        endMinutes: "15"
                    }
                ]
                */
            ])
        }
        if (!this.days) {
            this.days = JSON.stringify(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
        }
        if (!this.hours) {
            this.hours = JSON.stringify(['8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'])
        }
        if (!this.cellHeight) {
            this.cellHeight = 40
        }
        this.render()
        this.firstRenderDone = true
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'content':
                    this.content = newVal
                    break;
                case 'days':
                    this.days = newVal
                    break;
                case 'hours':
                    this.hours = newVal
                    break;
                case 'cell-height':
                    this.cellHeight = newVal
                    break;
            }
            if (this.firstRenderDone) {
                this.render()
            }
        }
    }

    // Define methods for timetable 'content' attribute (JSON Array of JSON Array)
    get content() {
        return JSON.parse(this.getAttribute('content'))
    }

    set content(value) {
        this.setAttribute('content', value)
    }

    // Define methods for timetable 'days' attribute (JSON Array)
    get days() {
        return JSON.parse(this.getAttribute('days'))
    }

    set days(value) {
        this.setAttribute('days', value)
    }

    // Define methods for timetable 'hours' attribute (JSON Array)
    get hours() {
        return JSON.parse(this.getAttribute('hours'))
    }

    set hours(value) {
        this.setAttribute('hours', value)
    }

    // Define methods for timetable 'cell-height' attribute (JSON Array)
    get cellHeight() {
        return parseInt(this.getAttribute('cell-height'))
    }

    set cellHeight(value) {
        this.setAttribute('cell-height', value)
    }

    // Re-render the whole timetable
    render() {
        this.reset()
        this.renderHours()
        this.renderDays()
        this.renderContent()
    }

    renderHours() {
        for (var i = 0; i < this.hours.length; i++) {
            var hour = document.createElement('div')
            hour.classList.add('cell-hour')
            hour.style.height = `${this.cellHeight}px`
            hour.innerHTML = this.hours[i]
            if (i == 0) {
                hour.style.marginTop = `${this.cellHeight / 2}px`
            }
            this.timetableHoursHolder.appendChild(hour)
        }
    }

    renderDays() {
        var gridTemplate = ""

        for (var i = 0; i < this.days.length; i++) {
            gridTemplate += "1fr "
        }

        this.timetableDaysContentHolder.style.gridTemplateColumns = gridTemplate

        for (var i = 0; i < this.days.length; i++) {
            var day = document.createElement('div')
            day.classList.add('content-holder')

            day.innerHTML = `
            <div class="cell-day" part="days" style="height: ${this.cellHeight}px">
            ${this.days[i]}
            </div>
            `

            day.setAttribute('part', 'day-column')

            for (var h = 0; h < this.hours.length; h++) {
                var contentCell = document.createElement('div')
                contentCell.classList.add('cell-content')
                contentCell.setAttribute('part', 'content-cell')
                contentCell.style.height = `${this.cellHeight}px`
                day.appendChild(contentCell)
            }

            if (i == this.days.length - 1) {
                day.style.borderRight = "none"
            }

            this.timetableDaysContentHolder.appendChild(day)
            this.daysElement.push(day)
        }


    }

    renderContent() {

        for (var i = 0; i < this.days.length; i++) { // For each days
            if (this.content[i]) { // If day exist in content array
                for (var n = 0; n < this.content[i].length; n++) { // For each task of the day

                    // Create task
                    var task = document.createElement('div')
                    task.classList.add('task')
    
                    // Task content
                    task.innerHTML = `
                    ${this.content[i][n].title}
                    `
    
                    // Task start
                    task.style.marginTop = `${this.getTaskMarginTop(this.content[i][n].startHour, this.content[i][n].startMinutes)}px`
    
                    // Task end
                    task.style.height = `${this.getTaskLength(
                        this.content[i][n].startHour,
                        this.content[i][n].startMinutes,
                        this.content[i][n].endHour,
                        this.content[i][n].endMinutes
                    )}px`
    
                    task.setAttribute('part', 'task')
    
                    // Add the task to the day
                    this.daysElement[i].appendChild(task)
                }        
            }
        }
    }

    reset() {
        this.timetableHoursHolder.innerHTML = ""
        this.timetableDaysContentHolder.innerHTML = ""
        this.daysElement = []
    }

    getTaskMarginTop(startHour, startMinutes) {

        for (var i = 0; i < this.timetableHoursHolder.children.length; i++) {
            if (startHour === this.timetableHoursHolder.children[i].innerHTML) {
                if (startMinutes) {
                    return (i + 1) * this.cellHeight + (i + 1) + (parseInt(startMinutes) / 60 * this.cellHeight)
                }
                else {
                    return (i + 1) * this.cellHeight + (i + 1)
                }
            }
        }

        return 0
    }

    getTaskLength(startHour, startMinutes, endHour, endMinutes) {
        var start = 0
        var end = 0
        
        for (var i = 0; i < this.timetableHoursHolder.children.length; i++) {
            if (startHour === this.timetableHoursHolder.children[i].innerHTML) {
                start = i
            }
            if (endHour === this.timetableHoursHolder.children[i].innerHTML) {
                end = i
            }
        }

        var length = end - start
        if (endMinutes) {
            length += endMinutes / 60
        }
        length *= this.cellHeight
        length += (end - start) - 1
        if (startMinutes) {
            length -= (startMinutes / 60 * this.cellHeight)
        }
        return length
    }

    getTasks() {
        var tasks = []
        for (var i = 0; i < this.daysElement.length; i++) {
            tasks.push([])
            for (var n = 0; n < this.daysElement[i].children.length; n++) {
                if (this.daysElement[i].children[n].classList.contains("task")) {
                    tasks[i].push(this.daysElement[i].children[n])
                }
            }
        }
        return tasks
    }

}

window.customElements.define('gus-timetable', GusTimeTable)

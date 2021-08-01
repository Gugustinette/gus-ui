const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_data_table {
    min-height: 100px;
    min-width: 400px;

    background: #242424;

    width: 800px;

    display: flex;
    flex-direction: column;
}

.gus_dt_header {
    height: 40px;
    width: 100%;

    display: flex;
    flex-direction: row;

    border-bottom: solid 1px grey;
}

.gus_dt_content {
    min-height: 120px;
    width: 100%;

    display: flex;
    flex-direction: column;
}

.gus_dt_pagination {
    height: 40px;
    width: 100%;

    display: flex;
    flex-direction: row-reverse;
    align-items: center;

    border-top: solid 1px grey;
}
.gus_dt_pagination > div {
    margin-right: 10px;
    cursor: pointer;
}
.gus_dt_pagination svg {
    height: 18px;
}
.gus_dt_previous_page svg {
    transform: rotate(180deg);
}

</style>
<div class="gus_data_table" part="data-table">
    <div class="gus_dt_header">
    </div>
    <div class="gus_dt_content">
    </div>
    <div class="gus_dt_pagination">
        <div class="gus_dt_next_page">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#F5F5F5" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
        </div>
        <div class="gus_dt_previous_page">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#F5F5F5" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
        </div>
    </div>
</div>
`

export class GusDataTable extends HTMLElement {
    static get observedAttributes() {
        return ['data', 'display-limit'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.data_table = shadowRoot.querySelector('.gus_data_table')

        this.header = shadowRoot.querySelector('.gus_dt_header')

        this.content = shadowRoot.querySelector('.gus_dt_content')
        
        this.previous_button = shadowRoot.querySelector('.gus_dt_previous_page')
        this.next_button = shadowRoot.querySelector('.gus_dt_next_page')

        // VARIABLES
        this.actualPage = 0;

        // LISTENERS
        this.previous_button.addEventListener("click", (e) => {
            this.previousPage()
        })

        this.next_button.addEventListener("click", (e) => {
            this.nextPage()
        })
    }

    connectedCallback() {
        if (!this.displayLimit) {
            this.displayLimit = this.data.length;
        }
        this.render()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'data':
                    this.data = newVal;
                    break;
                case 'display-limit':
                    this.displayLimit = newVal;
                    break;
            }
        }
    }

    // Define methods for data table 'data' attribute (JSON)
    get data() {
        return JSON.parse(this.getAttribute('data'))
    }

    set data(value) {
        this.setAttribute('data', value)
    }

    // Define methods for data table 'display-limit' attribute (int)
    get displayLimit() {
        return parseInt(this.getAttribute('display-limit'))
    }

    set displayLimit(value) {
        this.setAttribute('display-limit', value)
    }

    // Re-render the whole data table
    render() {
        var allKeys = Object.keys(this.data[0])

        // Create columns names (from keys)
        for (var i = 0; i < allKeys.length; i++) {
            var newKey = document.createElement('div')
            newKey.innerHTML = `
            <style>
            .gus_dt_key {
                height: 100%;
                min-width: 80px;

                margin-left: 10px;

                display: grid;
                align-content: center;
            }
            </style>
            <div class="gus_dt_key" part="column-name">
                ${allKeys[i]}
            </div>
            `
            this.header.appendChild(newKey)
        }

        // Display the elements
        for (var i = 0; i < this.displayLimit; i++) {
            var newRow = this.createRow()
            var rowInsert = newRow.children[1]
            // Add the cells to the row
            for (var n = 0; n < allKeys.length; n++) {
                var newCell = this.createCell(this.data[i][allKeys[n]])
                rowInsert.appendChild(newCell)
            }
            this.content.appendChild(newRow)
        }

        // Resize the cells
        for (var i = 0; i < allKeys.length; i++) { // For each column
            var largestCellSize = 0;

            // Get the largest cell
            for (var cell = 0; cell < this.displayLimit; cell++) { // For each cell
                // Get the cell
                var actualCell = this.content.children[cell].children[1].children[i]

                // Compare its size
                if (actualCell.clientWidth > largestCellSize) {
                    largestCellSize = actualCell.clientWidth
                }
            }

            // Apply the biggest width to each cell
            for (var cell = 0; cell < this.displayLimit; cell++) { // For each cell
                // Get the cell
                var actualCell = this.content.children[cell].children[1].children[i]

                actualCell.style.width = `${largestCellSize + 10}px`

                this.header.children[i].style.width = `${largestCellSize + 10}px`
            }
        }
    }

    nextPage() {
        if ( (this.actualPage + 1) * this.displayLimit < this.data.length) {
            this.actualPage += 1
            this.renderNewPage()
        }
    }

    previousPage() {
        if (this.actualPage > 0) {
            this.actualPage -= 1
            this.renderNewPage()
        }
    }

    renderNewPage() {
        this.clearPage()

        // Get all the keys
        var allKeys = Object.keys(this.data[0])

        // Display the elements
        for (var i = 0; i < this.displayLimit; i++) {
            var rowId = (this.displayLimit * this.actualPage) + i

            if (rowId < this.data.length && rowId > -1) {
                var newRow = this.createRow()
                var rowInsert = newRow.children[1]

                // Add the cells to the row
                for (var n = 0; n < allKeys.length; n++) {
                    var newCell = this.createCell(this.data[rowId][allKeys[n]])
                    rowInsert.appendChild(newCell)
                }
                
                this.content.appendChild(newRow)
            }
        }

        // Resize the cells
        for (var i = 0; i < allKeys.length; i++) { // For each column

            var largestCellSize = 0;

            // Get the largest cell
            for (var cell = 0; cell < this.displayLimit; cell++) { // For each cell

                var rowId = (this.displayLimit * this.actualPage) + cell
                if (rowId < this.data.length && rowId > -1) {
                    // Get the cell
                    var actualCell = this.content.children[cell].children[1].children[i]

                    // Compare its size
                    if (actualCell.clientWidth > largestCellSize) {
                        largestCellSize = actualCell.clientWidth
                    }
                }
            }

            // Apply the biggest width to each cell
            for (var cell = 0; cell < this.displayLimit; cell++) { // For each cell

                var rowId = (this.displayLimit * this.actualPage) + cell
                if (rowId < this.data.length && rowId > -1) {
                    // Get the cell
                    var actualCell = this.content.children[cell].children[1].children[i]

                    actualCell.style.width = `${largestCellSize + 10}px`

                    this.header.children[i].style.width = `${largestCellSize + 10}px`
                }
            }
        }
    }

    clearPage() {
        this.content.innerHTML = ""
    }

    createRow() {
        var newRow = document.createElement('div')
        newRow.innerHTML = `
        <style>
        .gus_dt_row {
            height: 40px;
            width: 100%;

            display: flex;
            align-items: center;
        }
        </style>
        <div class="gus_dt_row" part="row">
        </div>
        `
        return newRow
    }

    createCell(cellContent) {
        var newCell = document.createElement('div')
        newCell.innerHTML = `
        <style>
        .gus_dt_row_element {
            height: 100%;
            min-width: 80px;

            max-width: 280px;

            margin-left: 10px;

            display: grid;
            align-content: center;
            
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        </style>
        <div class="gus_dt_row_element" part="cell">
            ${cellContent}
        </div>
        `
        return newCell
    }
}

window.customElements.define('gus-data-table', GusDataTable)

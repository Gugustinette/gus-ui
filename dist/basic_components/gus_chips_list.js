const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_chips_list {
    display: flex;
}
</style>
<div class="gus_chips_list" part="chips-list">
    <slot></slot>
</div>
`

export class GusChipsList extends HTMLElement {
    static get observedAttributes() {
        return ['type'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.chips_list = shadowRoot.querySelector('.gus_chips_list')

        // VARIABLES
        this.selectedValues = []
        this.values = []

        // EVENTS
        this.event_valueChanged = new Event("value-changed")

        // LISTENERS
        this.chips_list.addEventListener("click", (e) => {

            if (this.type == "check-chips") {
                var clickedChip = e.target.content

                if(this.selectedValues.indexOf(clickedChip) === -1) {
                    this.selectedValues.push(clickedChip)
                }
                else {
                    this.selectedValues[this.selectedValues.indexOf(clickedChip)] = this.selectedValues[this.selectedValues.length - 1]

                    this.selectedValues[this.selectedValues.length - 1] = clickedChip
                    
                    this.selectedValues.pop()
                }

                this.dispatchEvent(this.event_valueChanged)
            }
            else {
                if (this.type == "cross-chips") {
                    var allChips = []

                    for (var i = 0; i < this.children.length; i++) {
                        allChips.push(this.children[i].content)
                    }

                    if (!this.arraysEqual(this.values, allChips)) {
                        this.values = allChips
                        this.dispatchEvent(this.event_valueChanged)
                    }
                }
            }
        })
    }

    connectedCallback() {
        if (!this.type) {
            this.type = "normal"
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
            }
        }
        this.render()
    }

    // Define methods for chips list "type" attribute (String)
    get type() {
        return this.getAttribute('type')
    }

    set type(value) {
        this.setAttribute('type', value)
    }

    // Re-render the whole chips list
    render() {
        var allChips = []

        for (var i = 0; i < this.children.length; i++) {
            allChips.push(this.children[i].content)
        }

        this.values = allChips
    }

    getSelectedValues() {
        return this.selectedValues
    }

    getValues() {
        return this.values
    }

    arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
      
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
      }
      
}

window.customElements.define('gus-chips-list', GusChipsList)

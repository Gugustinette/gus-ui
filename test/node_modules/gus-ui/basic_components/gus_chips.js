const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_chips {
    min-width: 50px;
    padding-left: 20px;
    padding-right: 20px;
    height: 38px;
    background: var(--gus-ui-color-surface-hover);
    border-radius: 20px;
    display: flex;
    transition: 0.2s;
    color: var(--gus-ui-color-on-surface);
}
.gus_chips_interactible:hover {
    background: var(--gus-ui-color-surface-focus);
    cursor: pointer;
    transition: 0.2s;
}

.gus_chips_checked {
    background: var(--gus-ui-color-surface-focus);
    transition: 0.2s;
}
.gus_chips_checked:hover {
    background: var(--gus-ui-color-surface-focus);
    transition: 0.2s;
}

.gus_chips_content {
    font-size: 1em;
}

p {
    margin: auto;
}

.gus_chips_cross {
    margin: auto;
    padding-left: 10px;

    fill: var(--gus-ui-color-on-surface);
    cursor: pointer;
}

.gus_chips_check {
    margin: auto;
    fill: var(--gus-ui-color-on-surface);
    padding-right: 10px;
}

</style>
<div class="gus_chips" part="chips">
    <svg class="gus_chips_check" part="chips-check" xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24" fill="#F5F5F5"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
    <p class="gus_chips_content" part="chips-content"></p>
    <svg class="gus_chips_cross" part="chips-cross" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#F5F5F5"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z"/></svg>
</div>
`

export class GusChips extends HTMLElement {
    static get observedAttributes() {
        return ['checked', 'content', 'cross-visible', 'check-visible', 'auto-delete'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.chips = shadowRoot.querySelector('.gus_chips')
        this.chips_content = shadowRoot.querySelector('.gus_chips_content')
        this.chips_cross = shadowRoot.querySelector('.gus_chips_cross')
        this.chips_check = shadowRoot.querySelector('.gus_chips_check')

        // EVENTS
        this.event_valueChanged = new Event("value-changed")
        this.event_close = new Event("close")

        // LISTENERS
        this.chips.addEventListener('click', () => {
            if (this.check_visible) {
                this.checked = (this.checked == false)
                this.dispatchEvent(this.event_valueChanged)
            }
        })

        this.chips_cross.addEventListener("click", (e) => {
            this.dispatchEvent(this.event_close)
            if (this.autoDelete) {
                this.remove()
            }
        })

    }

    connectedCallback() {
        if (!this.checked) {
            this.checked = false
        }
        if (!this.cross_visible) {
            this.cross_visible = false
        }
        if (!this.check_visible) {
            this.check_visible = false
        }
        if (!this.autoDelete) {
            this.autoDelete = false
        }
        if (!this.content) {
            this.content = ''
        }
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'checked':
                    this.checked = newVal
                    break;
                case 'cross-visible':
                    this.cross_visible = newVal
                    break;
                case 'check-visible':
                    this.check_visible = newVal
                    break;
                case 'content':
                    this.content = newVal
                    break;
                case 'auto-delete':
                    this.autoDelete = newVal
                    break;
            }
        }
        this.render()
    }

    // Define methods for chips 'checked' attribute (boolean)
    get checked() {
        return this.getAttribute('checked') === 'true'
    }

    set checked(value) {
        this.setAttribute('checked', value)
    }

    // Define methods for chips 'content' attribute (string)
    get content() {
        return this.getAttribute('content')
    }

    set content(value) {
        this.setAttribute('content', value)
    }

    // Define methods for chips 'cross-visible' attribute (boolean)
    get cross_visible() {
        return this.getAttribute('cross-visible') === 'true'
    }

    set cross_visible(value) {
        this.setAttribute('cross-visible', value)
    }

    // Define methods for chips 'check-visible' attribute (boolean)
    get check_visible() {
        return this.getAttribute('check-visible') === 'true'
    }

    set check_visible(value) {
        this.setAttribute('check-visible', value)
    }

    // Define methods for chips 'auto-delete' attribute (boolean)
    get autoDelete() {
        return this.getAttribute('auto-delete') === 'true'
    }

    set autoDelete(value) {
        this.setAttribute('auto-delete', value)
    }

    // Re-render the whole chips
    render() {
        if (this.check_visible) {
            this.chips.classList.add('gus_chips_interactible')
        }
        if (this.checked && !this.cross_visible) {
            this.chips.classList.add("gus_chips_checked")
            if (this.check_visible) {
                this.chips_check.style.display = 'block'
            }
        }
        else {
            this.chips.classList.remove("gus_chips_checked")
            this.chips_check.style.display = 'none'
        }
        this.chips_content.innerHTML = `${this.content}`
        if (this.cross_visible) {
            this.chips_cross.style.display = 'auto'
        }
        else {
            this.chips_cross.style.display = 'none'
        }
    }
}

window.customElements.define('gus-chips', GusChips)

const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_drop_down_section {
    height: 50px;
    width: 300px;
    overflow: hidden;
    transition: 0.4s;

    color: var(--gus-ui-color-on-background);
}

.gus_drop_down_section_active {
    height: 400px;
    overflow: visible;
    transition: 0.4s;
}

.gus_drop_down_section_title {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
}

.gus_drop_down_section_title_text {
    width: 100%;
    margin-left: 20px;
}

.gus_drop_down_section_title_arrow {
    height: 16px;
    fill: var(--gus-ui-color-on-background);
    transform: rotate(180deg);
    transition: 0.2s;
    margin-right: 20px;
    margin-left: 20px;
}

.gus_drop_down_section_title_arrow_active {
    transform: rotate(90deg);
    transition: 0.2s;
}

.gus_drop_down_section_content {
    max-height: 100%;
    overflow: scroll;
}

</style>
<div class="gus_drop_down_section" part="drop_down_section">
    <div class="gus_drop_down_section_title" part="drop_down_section_title">
        <p class="gus_drop_down_section_title_text">Menu</p>
        <svg class="gus_drop_down_section_title_arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 12l-18 12v-24z"/></svg>
    </div>
    <div class="gus_drop_down_section_content" part="drop_down_section_content">
        <slot></slot>
    </div>
</div>
`

export class GusDropDownSection extends HTMLElement {
    static get observedAttributes() {
        return ['content'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.drop_down_section = shadowRoot.querySelector('.gus_drop_down_section')
        this.drop_down_section_title_div = shadowRoot.querySelector('.gus_drop_down_section_title')
        this.drop_down_section_title = shadowRoot.querySelector('.gus_drop_down_section_title_text')
        this.drop_down_section_content = shadowRoot.querySelector('.gus_drop_down_section_content')
        this.drop_down_section_arrow = shadowRoot.querySelector('.gus_drop_down_section_title_arrow')

        // VARIABLES
        this.visible = false

        // EVENTS
        this.event_statutChanged = new Event("statut-changed")

        // LISTENERS
        this.drop_down_section_title_div.addEventListener('click', (e) => {
            if (this.visible) {
                this.drop_down_section.classList.remove('gus_drop_down_section_active')
                this.drop_down_section_arrow.classList.remove('gus_drop_down_section_title_arrow_active')
                this.visible = false;
            }
            else {
                this.drop_down_section.classList.add('gus_drop_down_section_active')
                this.drop_down_section_arrow.classList.add('gus_drop_down_section_title_arrow_active')
                this.visible = true;
            }
            this.dispatchEvent(this.event_statutChanged)
        })
    }

    connectedCallback() {
        if (!this.content) {
            this.content = 'Drop-down section'
        }
        this.render()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'content':
                    this.content = newVal
                    break;
            }
        }
    }

    // Define methods for Drop-down section 'content' attribute (string)
    get content() {
        return this.getAttribute('content')
    }

    set content(value) {
        this.setAttribute('content', value)
    }

    // Re-render the whole Drop-down section
    render() {
        this.drop_down_section_title.innerHTML = `${this.content}`
    }

}

window.customElements.define('gus-drop-down-section', GusDropDownSection)

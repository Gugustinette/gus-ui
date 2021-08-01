const template = document.createElement('template')

template.innerHTML = `
<style>

.gus_alert_box {
    position: fixed;

    right: 40px;
    bottom: 40px;

    min-height: 80px;
    width: 500px;

    background: var(--gus-ui-color-surface);

    border-radius: 5px;

    display: grid;
    grid-template-columns: 1fr 4fr 0.5fr;

    color: var(--gus-ui-color-on-surface);
    opacity: 1;

    overflow: hidden;

    box-shadow: var(--gus-ui-color-surface-shadow);
}
.gus_alert_box * {
    margin: 0;
    padding: 0;
}
.gus_alert_box_hidden {
    opacity: 0;
    transition: 0.4s;
}
.gus_alert_box:hover .gus_ab_close_cross {
    opacity: 1;
    transition: 0.1s;
}

.gus_ab_icon {
    background: var(--gus-ui-color-surface-focus);

    display: grid;
    place-items: center;
}

.gus_ab_icon_svg {
    height: 30px;
    width: 30px;
}

.gus_ab_content {
    display: grid;
}

.gus_ab_content * {
    margin-left: 40px;
}

.gus_ab_content_line {
    width: 80%;
    height: 0;

    color: inherit;
}

.gus_ab_content_title {
    font-size: 1.2em;
    margin-top: 10px;
    margin-bottom: 10px;
}

.gus_ab_content_description {
    font-size: 1em;
    margin-top: 10px;
    margin-bottom: 10px;
}

.gus_ab_close {
    display: grid;

    justify-items: center;
}
.gus_ab_close_cross {
    height: 20px;
    width: 20px;

    margin-top: 10px;

    opacity: 0;
    transition: 0.1s;

    cursor: pointer;
}

</style>
<div class="gus_alert_box" part="alert-box">
    <slot class="gus_ab_icon" name="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--gus-ui-color-on-surface)" class="gus_ab_icon_svg" part="icon"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"/></svg>
    </slot>
    <div class="gus_ab_content">
        <p class="gus_ab_content_title" part="title">Title</p>
        <hr class="gus_ab_content_line" part="line">
        <p class="gus_ab_content_description" part="description">Description absolument importante et intéressante</p>
    </div>
    <div class="gus_ab_close">
        <slot name="close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--gus-ui-color-on-surface)" class="gus_ab_close_cross" part="close-icon"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
        </slot>
    </div>
</div>
`

export class GusAlertBox extends HTMLElement {
    static get observedAttributes() {
        return ['label-title', 'label-description'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.alert_box = shadowRoot.querySelector('.gus_alert_box')

        this.content_title = shadowRoot.querySelector('.gus_ab_content_title')
        this.content_description = shadowRoot.querySelector('.gus_ab_content_description')

        this.close_cross = shadowRoot.querySelector('.gus_ab_close')

        // LISTENERS
        this.close_cross.addEventListener("click", (e) => {
            this.alert_box.classList.add('gus_alert_box_hidden')
            setTimeout((e) => {
                this.remove()
            }, 400)
        })
    }

    connectedCallback() {
        this.render()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'label-title':
                    this.title = newVal;
                    break;
                case 'label-description':
                    this.description = newVal;
                    break;
            }
        }
        this.render()
    }

    // Define methods for alert box 'label-title' attribute (string)
    get title() {
        return this.getAttribute('label-title')
    }

    set title(value) {
        this.setAttribute('label-title', value)
    }

    // Define methods for alert box 'label-description' attribute (string)
    get description() {
        return this.getAttribute('label-description')
    }

    set description(value) {
        this.setAttribute('label-description', value)
    }

    // Re-render the whole switch
    render() {
        this.content_title.innerHTML = this.title
        this.content_description.innerHTML = this.description
    }
}

window.customElements.define('gus-alert-box', GusAlertBox)
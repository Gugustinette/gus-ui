const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_dialog_holder {
    position: fixed;

    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    display: grid;

    place-items: center;
}
.gus_dialog {
    width: 250px;
    min-height: 40px;

    background: var(--gus-ui-color-surface);
    border-radius: 5px;

    border-bottom: solid 1px #000000;

    color: whitesmoke;

    display: flex;
    flex-direction: column;

    overflow: hidden;

    box-shadow: var(--gus-ui-color-surface-shadow);
}
.gus_dialog * {
    margin: 0;
    padding: 0;
}

.gus_dialog_media {
    height: 160px;
    width: 100%;

    display: grid;
}

.gus_dialog_content {
    height: 80px;
    width: 100%;

    display: grid;
    align-items: center;
}
.gus_dialog_content > div {
    margin-left: 25px;
}
.gus_dialog_content_title {
    color: var(--gus-ui-color-on-surface);
    font-size: 1.1em;
}
.gus_dialog_content_description {
    margin-top: 10px;
    color: var(--gus-ui-color-on-surface-secondary);

    font-size: 0.9em;
}

.gus_dialog_text {
    height: 80px;
    width: 100%;

    display: grid;
}

.gus_dialog_buttons {
    display: flex;
    align-self: end;

    margin-top: 10px;
}

</style>
<div class="gus_dialog_holder">
    <div class="gus_dialog" part="dialog">
        <div class="gus_dialog_content" part="content">
            <div>
                <p class="gus_dialog_content_title" part="content-title"></p>
                <p class="gus_dialog_content_description" part="content-description"></p>
            </div>
        </div>
        <div class="gus_dialog_buttons" part="buttons">
            <slot></slot>
        </div>
    </div>
</div>
`

export class GusDialog extends HTMLElement {
    static get observedAttributes() {
        return ['label-title', 'label-description'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.dialog = shadowRoot.querySelector('.gus_dialog')

        this.dialog_title = shadowRoot.querySelector('.gus_dialog_content_title')
        this.dialog_description = shadowRoot.querySelector('.gus_dialog_content_description')

    }

    connectedCallback() {
        if (!this.labelTitle) {
            this.labelTitle = 'Dialog title'
        }
        if (!this.labelDescription) {
            this.labelDescription = 'Secondary text'
        }
        this.render()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'label-title':
                    this.labelTitle = newVal
                    break;
                case 'label-description':
                    this.labelDescription = newVal
                    break;
            }
        }
    }

    // Define methods for card 'label-title' attribute (String)
    get labelTitle() {
        return this.getAttribute('label-title')
    }

    set labelTitle(value) {
        this.setAttribute('label-title', value)
    }

    // Define methods for card 'label-description' attribute (String)
    get labelDescription() {
        return this.getAttribute('label-description')
    }

    set labelDescription(value) {
        this.setAttribute('label-description', value)
    }

    // Re-render the whole card
    render() {
        this.dialog_title.innerHTML = this.labelTitle
        this.dialog_description.innerHTML = this.labelDescription
    }
}

window.customElements.define('gus-dialog', GusDialog)
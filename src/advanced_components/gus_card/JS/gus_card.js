const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_card {
    width: 300px;
    min-height: 40px;

    background: var(--gus-ui-color-surface);
    border-radius: 5px;

    border-bottom: solid 1px #000000;

    color: var(--gus-ui-color-on-surface);

    display: flex;
    flex-direction: column;

    overflow: hidden;
    box-shadow: var(--gus-ui-color-surface-shadow);
}
.gus_card * {
    margin: 0;
    padding: 0;
}

.gus_card_media {
    height: 160px;
    width: 100%;

    display: grid;
}

.gus_card_content {
    height: 80px;
    width: 100%;

    display: grid;
    align-items: center;
}
.gus_card_content > div {
    margin-left: 10px;
}
.gus_card_content_title {
    font-size: 1.1em;
}
.gus_card_content_description {
    margin-top: 5px;
    color: var(--gus-ui-color-on-surface-secondary);
}

.gus_card_text {
    height: 80px;
    width: 100%;

    display: grid;
}

.gus_card_buttons {
    display: flex;
    align-self: end;
}

</style>
<div class="gus_card" part="card">
    <div class="gus_card_media" part="media">
    </div>
    <div class="gus_card_content" part="content">
        <div>
            <p class="gus_card_content_title" part="content-title"></p>
            <p class="gus_card_content_description" part="content-description"></p>
        </div>
    </div>
    <div class="gus_card_text" part="text">
    </div>
    <div class="gus_card_buttons" part="buttons">
        <slot></slot>
    </div>
</div>
`

export class GusCard extends HTMLElement {
    static get observedAttributes() {
        return ['label-title', 'label-description', 'label-text', 'media'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // ELEMENTS
        this.card = shadowRoot.querySelector('.gus_card')

        this.card_media = shadowRoot.querySelector('.gus_card_media')

        this.card_title = shadowRoot.querySelector('.gus_card_content_title')
        this.card_description = shadowRoot.querySelector('.gus_card_content_description')

        this.card_text = shadowRoot.querySelector('.gus_card_text')

    }

    connectedCallback() {
        if (!this.labelTitle) {
            this.labelTitle = 'Card title'
        }
        if (!this.labelDescription) {
            this.labelDescription = 'Secondary text'
        }
        if (!this.labelText) {
            this.labelText = null
        }
        if (!this.media) {
            this.media = null
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
                case 'label-text':
                    this.labelText = newVal
                    break;
                case 'media':
                    this.media = newVal
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

    // Define methods for card 'label-text' attribute (String)
    get labelText() {
        return this.getAttribute('label-text')
    }

    set labelText(value) {
        this.setAttribute('label-text', value)
    }

    // Define methods for card 'media' attribute (Image Path)
    get media() {
        return this.getAttribute('media')
    }

    set media(value) {
        this.setAttribute('media', value)
    }

    // Re-render the whole card
    render() {

        if (this.media !== "null") {
            var newMedia = document.createElement('div')
            newMedia.innerHTML = `
            <style>
            .gus_card_media_background {
                height: 100%;
                width: 100%;

                background: url(${this.media});
                background-position: center;
                background-size: cover;
            }
            </style>
            <div class="gus_card_media_background">
            </div>
            `
            this.card_media.appendChild(newMedia)
        }
        else {
            this.card_media.style.display = "none"
        }

        this.card_title.innerHTML = this.labelTitle
        this.card_description.innerHTML = this.labelDescription

        if (this.labelText !== "null") {
            var newText = document.createElement('div')
            newText.innerHTML = `
            <style>
            .gus_card_text_content {
                height: 100%;
                width: 100%;

                color: grey;

                margin-left: 10px;

                font-size: 0.8em;
            }
            </style>
            <div class="gus_card_text_content">
                ${this.labelText}
            </div>
            `
            this.card_text.appendChild(newText)
        }
        else {
            this.card_text.style.display = "none"
        }
    }
}

window.customElements.define('gus-card', GusCard)
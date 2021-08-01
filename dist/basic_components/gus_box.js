const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_box {
    min-height: 30px;
    min-width: 200px;
    display: grid;
    justify-content: center;
    align-content: center;
    justify-items: center;
    align-items: center;
    transition: 0.2s;
    color: var(--gus-ui-color-on-background);
}
.gus_box_clickable {
    cursor: pointer;
}
.gus_box_clickable:hover {
    background: var(--gus-ui-color-background-hover);
    transition: 0.2s;
}

</style>
<div class="gus_box" part="box">
    <slot></slot>
</div>
`

export class GusBox extends HTMLElement {
    static get observedAttributes() {
        return ['content', 'href', 'onclick'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // Assign elements to variables
        this.box = shadowRoot.querySelector('.gus_box')
    }

    connectedCallback() {
        if (!this.content) {
            this.content = ""
        }
        if (!this.href) {
            this.href = ""
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
                case 'href':
                    this.href = newVal
                    break;
            }
        }
    }

    // Define methods for box 'content' attribute (String)
    get content() {
        return this.getAttribute('content')
    }

    set content(value) {
        this.setAttribute('content', value)
    }

    // Define methods for box 'href' attribute (String)
    get href() {
        return this.getAttribute('href')
    }

    set href(value) {
        this.setAttribute('href', value)
    }

    // Re-render the whole box
    render() {
        if (this.content) {
            this.box.innerHTML = `${this.content}`
        }
        if (this.href) {
            this.box.classList.add("gus_box_clickable")
            this.box.addEventListener('click', (e) => {
                window.location = this.href;
            })
        }
        if (this.onclick) {
            this.box.classList.add("gus_box_clickable")
        }
    }

}

window.customElements.define('gus-box', GusBox)

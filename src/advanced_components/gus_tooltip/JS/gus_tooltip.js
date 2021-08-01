const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_tooltip_container {
    position: relative;
}
.gus_tooltip {

    position: absolute;

    min-height: 30px;
    min-width: 70px;
    width: auto;

    background: var(--gus-ui-color-surface);
    color: var(--gus-ui-color-on-surface);

    top: 0;
    left: 0;

    margin-top: 5px;
    padding-left: 10px;
    padding-right: 10px;

    display: grid;
    justify-content: center;
    align-content: center;

    transition: 0.2s;

    border-radius: 10px;

    visibility: hidden;

    z-index: 100;
}
</style>
<div class="gus_tooltip_container">
    <slot></slot>
    <div class="gus_tooltip" part="tooltip"></div>
</div>
`

export class GusToolTip extends HTMLElement {
    static get observedAttributes() {
        return ['content', 'delay', 'follow-cursor'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // Assign elements to variables
        this.tooltip_container = shadowRoot.querySelector('.gus_tooltip_container')
        this.tooltip = shadowRoot.querySelector('.gus_tooltip')

        this.shouldBeVisible = false;


        // Listeners
        this.tooltip_container.addEventListener("mouseenter", (e) => {
            this.shouldBeVisible = true;
            setTimeout((e) => {
                if (this.shouldBeVisible) {
                    this.tooltip.style.visibility = "visible"
                }
            }, this.delay)
        })

        this.tooltip_container.addEventListener("mouseleave", (e) => {
            this.tooltip.style.visibility = "hidden"
            this.shouldBeVisible = false
        })
    }

    connectedCallback() {
        if (!this.content) {
            this.content = ""
        }
        if (!this.delay) {
            this.delay = 0
        }
        if (!this.follow_cursor) {
            this.follow_cursor = true
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
                case 'delay':
                    this.delay = newVal
                    break;
                case 'follow-cursor':
                    this.follow_cursor = newVal
                    break;
            }
        }
        this.render()
    }

    // Define methods for tooltip 'content' attribute (String)
    get content() {
        return this.getAttribute('content')
    }

    set content(value) {
        this.setAttribute('content', value)
    }

    // Define methods for tooltip 'delay' attribute (Int)
    get delay() {
        return parseInt(this.getAttribute('delay'))
    }

    set delay(value) {
        this.setAttribute('delay', value)
    }

    // Define methods for tooltip 'follow-cursor' attribute (Boolean)
    get follow_cursor() {
        return this.getAttribute('follow-cursor') === 'true'
    }

    set follow_cursor(value) {
        this.setAttribute('follow-cursor', value)
    }

    // Re-render the whole tooltip
    render() {
        this.tooltip.style.top = `${this.tooltip_container.getBoundingClientRect().height}px`
        this.tooltip.style.left = `${(this.tooltip_container.getBoundingClientRect().width / 2) - (this.tooltip.clientWidth / 2)}px`
        if (this.content) {
            this.tooltip.innerHTML = `${this.content}`
        }
    }

}

window.customElements.define('gus-tooltip', GusToolTip)

window.addEventListener('resize', function() {
    let all_gus_tooltip = document.querySelectorAll('gus-tooltip')

    for (var i = 0; i < all_gus_tooltip.length; i++) {
        all_gus_tooltip[i].render()
    }
});

// Make sure tooltips are in the right place
setTimeout(function() {
    let all_gus_tooltip = document.querySelectorAll('gus-tooltip')

    for (var i = 0; i < all_gus_tooltip.length; i++) {
        all_gus_tooltip[i].render()
    }
}, 200)
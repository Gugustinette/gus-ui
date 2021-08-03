const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_navbar {
    height: 100px;
    width: 100vw;

    background: #242424;

    position: fixed;
    top: 0;
    left: 0;

    display: flex;
}

.gus_navbar_mobile_active {
    top: 0 !important;
    transition: 0.2s;
}

.gus_navbar_mobile {
    display: none;
    height: 120px;

    display: grid;

    align-items: center;
    justify-items: right;
}

.gus_navbar_mobile_button {
    display: none;
    height: 70px;
    width: 70px;
    border-radius: 15px;
    margin-right: 20px;

    cursor: pointer;
}

.gus_navbar_mobile_icon {
    height: 100%;
    width: 100%;
    transform: rotate(90deg);
    transition: 0.2s;
}

.gus_navbar_mobile_icon_active {
    transform: rotate(270deg);
    transition: 0.2s;
}

@media screen and (max-aspect-ratio: 9/9) {
    .gus_navbar {
        background: rgba(0, 0, 0, 0);

        height: auto;
        width: 50vw;

        flex-direction: column;

        left: auto;
        right: 0;

        transition: 0.2s;
    }

    .gus_navbar_mobile {
        display: grid;
    }
    
    .gus_navbar_mobile_button {
        display: unset;
    }
}
</style>
<div class="gus_navbar" part="navbar">
    <div class="gus_navbar_insert"></div>
    <div class="gus_navbar_mobile">
        <slot class="gus_navbar_mobile_button" name="navbar-mobile-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="gus_navbar_mobile_icon" width="24" height="24" viewBox="0 0 24 24" fill="#F5F5F5"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 18v-12l9 6-9 6z"/></svg>
        </slot>
    </div>
</div>
`

export class GusNavBar extends HTMLElement {
    static get observedAttributes() {
        return ['nb-element'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        // Assign elements to variables
        this.navbar = shadowRoot.querySelector('.gus_navbar')
        this.navbar_insert = shadowRoot.querySelector('.gus_navbar_insert')
        this.navbar_button = shadowRoot.querySelector('.gus_navbar_mobile_button')
        this.navbar_icon = shadowRoot.querySelector('.gus_navbar_mobile_icon')

        let mobile_visible = false;

        this.navbar_button.addEventListener('click', (e) => {
            this.renderMobile()
        })
    }

    connectedCallback() {
        if (!this.nb_element) {
            this.nb_element = 1
        }
        this.render()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'nb-element':
                    this.nb_element = newVal
                    break;
            }
        }
    }

    // Define methods for navbar 'nb-element' attribute (int)
    get nb_element() {
        return parseInt(this.getAttribute('nb-element'))
    }

    set nb_element(value) {
        this.setAttribute('nb-element', value)
    }

    // Re-render the whole navbar
    render() {
        for (let i = 0; i < this.nb_element; i++) {
            let newElement = document.createElement('slot')
            this.navbar.insertBefore(newElement, this.navbar_insert)
        }
        this.renderMobile()
    }

    renderMobile() {
        if (!this.mobile_visible) {
            this.navbar.classList.add('gus_navbar_mobile_active')
            this.navbar_icon.classList.add('gus_navbar_mobile_icon_active')
            this.mobile_visible = true;
        }
        else {
            this.navbar.classList.remove('gus_navbar_mobile_active')
            this.navbar_icon.classList.remove('gus_navbar_mobile_icon_active')
            this.navbar.style.top = `-${this.navbar.clientHeight - 120}px`
            this.mobile_visible = false;
        }
    }

    reset() {
        if (this.getScreenRatio() > 1) {
            this.navbar.classList.remove('gus_navbar_mobile_active')
            this.navbar_icon.classList.remove('gus_navbar_mobile_icon_active')
            this.navbar.style.top = `-${this.navbar.clientHeight - 120}px`
            this.mobile_visible = false;
        }
        else {
            this.navbar.classList.remove('gus_navbar_mobile_active')
            this.navbar_icon.classList.remove('gus_navbar_mobile_icon_active')
            this.navbar.style.top = `0`
            this.mobile_visible = false;
        }
    }

    getScreenRatio() {
        var w = window.innerHeight
        var h = window.innerWidth

        var r = this.gcd(w, h)

        return (w / r) /  (h / r)
    }

    gcd(a, b) {
        return (b == 0) ? a : this.gcd(b, a%b);
    }

}

window.customElements.define('gus-navbar', GusNavBar)

window.addEventListener('resize', function() {
    let all_gus_navbar = document.querySelector('gus-navbar')

    if (all_gus_navbar) {
        all_gus_navbar.reset()
    }
});

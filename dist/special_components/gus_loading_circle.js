const template = document.createElement('template')

template.innerHTML = `
<style>

@keyframes infiniteloop {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.gus_loading_circle {
    height:100px;
    width: 100px;
    position: relative;
}

.gus_loading_circle .gus_lc_inner {
    position: absolute;
    z-index: 6;
    top: 50%;
    left: 50%;
    height: 80px;
    width: 80px;
    margin: -40px 0 0 -40px;
    background: var(--gus-ui-color-background);
    border-radius: 100%;
}

.gus_loading_circle .gus_lc_value {
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    z-index:10;
    font-size:18px;
    font-weight:500;
    color: var(--gus-ui-color-on-background);
}

.gus_loading_circle .gus_lc_bar {
    position: absolute;
    height: 100%;
    width: 100%;
    -webkit-border-radius: 100%;
    clip: rect(0px, 100px, 100px, 50px);
}

.gus_lc_circle .gus_lc_bar * {
    position: absolute;
    height: 100%;
    width: 100%;
    -webkit-border-radius: 100%;
    clip: rect(0px, 50px, 100px, 0px);
    background: var(--gus-ui-color-primary);
}



.gus_lc_circle .left .progress_left {
    z-index:1;
    transition: 0.4s;
}


.gus_lc_circle .right {
    transform: rotate(180deg);
    z-index:3;
}

.gus_lc_circle .right .progress_right {
    transition: 0.4s;
}

.gus_infinite_loop {
    animation: 1.2s linear infinite running infiniteloop;
}

</style>
<div class="gus_loading_circle" part="loading-circle">
  <div class="gus_lc_inner"></div>
  <div class="gus_lc_value" part="value">100%</div>
  <div class="gus_lc_circle">
     <div class="gus_lc_bar left">
        <div class="progress_left" part="circle"></div>
     </div>
     <div class="gus_lc_bar right">
        <div class="progress_right" part="circle"></div>
     </div>
   </div>
</div>
`

export class GusLoadingCircle extends HTMLElement {
    static get observedAttributes() {
        return ['percentage', 'infinite'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.last_percentage = 0

        this.progress_circle = shadowRoot.querySelector('.gus_loading_circle')

        this.progress_value = shadowRoot.querySelector('.gus_lc_value')

        this.progress_right = shadowRoot.querySelector('.progress_left')
        this.progress_left = shadowRoot.querySelector('.progress_right')

    }

    connectedCallback() {
        if (!this.infinite) {
            this.infinite = false
        }
        if (!this.percentage) {
            this.percentage = 25
        }
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'percentage':
                    this.percentage = newVal
                    break;
                case 'infinite' :
                    this.infinite = newVal
                    break;
            }
        }
        this.render()
    }

    // Define methods for loading circle 'percentage' attribute (int)
    get percentage() {
        return parseInt(this.getAttribute('percentage'))
    }

    set percentage(value) {
        this.setAttribute('percentage', value)
    }

    // Define methods for loading circle 'infinite' attribute (boolean)
    get infinite() {
        return this.getAttribute('infinite') === "true"
    }

    set infinite(value) {
        this.setAttribute('infinite', value)
    }

    // Re-render the whole switch
    render() {
        if (this.infinite) {
            this.renderPercentage()
            this.progress_value.innerHTML = ""
            this.progress_circle.classList.add('gus_infinite_loop')
        }
        else {
            this.renderPercentage()
        }
    }

    renderPercentage() {

        if (this.last_percentage > 50) {
            this.progress_left.style.transform = `rotate(${Math.min(Math.max((this.percentage - 50) * 180 / 50, 0), 180)}deg)`
            setTimeout((e) => {
                this.progress_right.style.transform = `rotate(${Math.min(Math.max(this.percentage * 180 / 50, 0), 180)}deg)`
            }, 400)
        }
        else {
            this.progress_right.style.transform = `rotate(${Math.min(Math.max(this.percentage * 180 / 50, 0), 180)}deg)`
            setTimeout((e) => {
                this.progress_left.style.transform = `rotate(${Math.min(Math.max((this.percentage - 50) * 180 / 50, 0), 180)}deg)`
            }, 400)
        }

        this.progress_value.innerHTML = `${this.percentage}%`

        this.last_percentage = this.percentage
    }
}

window.customElements.define('gus-loading-circle', GusLoadingCircle)
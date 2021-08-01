const template = document.createElement('template')

template.innerHTML = `
<style>
.gus_carousel {
    position: relative;

    height: 500px;
    width: 800px;

    display: flex;
    flex-direction: row;

    overflow: hidden;
}

.gus_carousel_left_button_slot {
    position: absolute;

    height: 100%;
}
.gus_carousel_left_button {
    position: absolute;

    height: 100%;
    width: 100px;

    display: grid;
    place-items: center;

    background: rgba(0, 0, 0, 0);
    transition: 0.1s;

    cursor: pointer;
}
.gus_carousel_left_button:hover {
    background: rgba(0, 0, 0, 0.5);
    transition: 0.1s;
}
.gus_carousel_left_button svg {
    transform: rotate(180deg);
    fill: rgba(250, 250, 250, 0.3);
    transition: 0.1s;
}
.gus_carousel_left_button:hover svg {
    fill: #F5F5F5;
    transition: 0.1s;
}


.gus_carousel_right_button_slot {
    position: absolute;

    right: 0;

    height: 100%;
}
.gus_carousel_right_button {
    position: absolute;

    height: 100%;
    width: 100px;

    right: 0;

    display: grid;
    place-items: center;

    background: rgba(0, 0, 0, 0);
    transition: 0.1s;

    cursor: pointer;
}
.gus_carousel_right_button:hover {
    background: rgba(0, 0, 0, 0.3);
    transition: 0.1s;
}
.gus_carousel_right_button svg {
    fill: rgba(250, 250, 250, 0.5);
    transition: 0.1s;
}
.gus_carousel_right_button:hover svg {
    fill: #F5F5F5;
    transition: 0.1s;
}


.gus_carousel_bar_holder {
    position: absolute;

    width: 100%;

    bottom: 0;

    display: grid;

    place-items: center;
}

.gus_carousel_bar {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
}

</style>
<div class="gus_carousel" part="carousel">
    <div class="gus_carousel_left_button_slot">
        <slot name="left-button">
            <div class="gus_carousel_left_button" part="left-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
            </div>
        </slot>
    </div>
    <div class="gus_carousel_bar_holder">
        <slot name="bar">
            <div class="gus_carousel_bar" part="bar"></div>
        </slot>
    </div>
    <div class="gus_carousel_right_button_slot">
        <slot name="right-button">
            <div class="gus_carousel_right_button" part="right-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
            </div>
        </slot>
    </div>
</div>
`

export class GusCarousel extends HTMLElement {
    static get observedAttributes() {
        return ['image-collection', 'infinite', 'auto-scrolling', 'auto-scrolling-delay', 'hide-arrows', 'hide-bar'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.carousel = shadowRoot.querySelector('.gus_carousel')

        this.carousel_bar = shadowRoot.querySelector('.gus_carousel_bar')

        this.carousel_button_left = shadowRoot.querySelector('.gus_carousel_left_button_slot')
        this.carousel_button_right = shadowRoot.querySelector('.gus_carousel_right_button_slot')

        // The ID of the actual image to show
        this.actual_image = 0;

        // Auto-Scrolling Function
        this.autoScrollFunc = null;
        
        // Number of child nodes in the carousel that correspond to an UI element
        // Basically every element which is not an image
        this.numberOfUiElement = 3;

        // EVENTS
        this.event_next_image = new Event("next-image") // Fired when the "nextImage()" function is called successfully
        this.event_previous_image = new Event("previous-image") // Fired when the "previousImage()" function is called successfully

        // LISTENERS
        this.carousel_button_right.addEventListener("click", (e) => {
            this.nextImage()
        })

        this.carousel_button_left.addEventListener("click", (e) => {
            this.previousImage()
        })
    }

    connectedCallback() {
        if (this.infinite === null) {
            this.infinite = false
        }
        if (this.autoScroll === null) {
            this.autoScroll = false
        }
        if (!this.autoScrollDelay) {
            this.autoScrollDelay = 5000
        }
        if (this.hideArrows == null) {
            this.hideArrows = true
        }
        if (this.hideBar == null) {
            this.hideBar = true
        }
        this.render()
        this.initCarouselBar()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'image-collection':
                    this.image_collection = newVal;
                    break;
                case 'infinite':
                    this.infinite = newVal;
                    break;
                case 'auto-scrolling':
                    this.autoScroll = newVal;
                    break;
                case 'auto-scrolling-delay':
                    this.autoScrollDelay = newVal;
                    break;
                case 'hide-arrows':
                    this.hideArrows = newVal;
                    break;
                case 'hide-bar':
                    this.hideBar = newVal;
                    break;
            }
        }
    }

    // Define methods for carousel 'image-collection' attribute (JSON)
    get image_collection() {
        return JSON.parse(this.getAttribute('image-collection'))
    }

    set image_collection(value) {
        this.setAttribute('image-collection', value)
    }

    // Define methods for carousel 'infinite' attribute (boolean)
    get infinite() {
        return this.getAttribute('infinite') === "true"
    }

    set infinite(value) {
        this.setAttribute('infinite', value)
    }

    // Define methods for carousel 'auto-scrolling' attribute (boolean)
    get autoScroll() {
        return this.getAttribute('auto-scrolling') === "true"
    }

    set autoScroll(value) {
        this.setAttribute('auto-scrolling', value)
    }

    // Define methods for carousel 'auto-scrolling-delay' attribute (int)
    get autoScrollDelay() {
        return parseInt(this.getAttribute('auto-scrolling-delay'))
    }

    set autoScrollDelay(value) {
        this.setAttribute('auto-scrolling-delay', value)
    }

    // Define methods for carousel 'hide-arrows' attribute (boolean)
    get hideArrows() {
        return this.getAttribute('hide-arrows') === "true"
    }

    set hideArrows(value) {
        this.setAttribute('hide-arrows', value)
    }

    // Define methods for carousel 'hide-bar' attribute (boolean)
    get hideBar() {
        return this.getAttribute('hide-bar') === "true"
    }

    set hideBar(value) {
        this.setAttribute('hide-bar', value)
    }

    // Define method for carousel 'length' attribute (int)
    // Correspond to the number of images in the carousel
    get length() {
        return this.image_collection.length
    }

    // Re-render the whole carousel
    render() {
        this.clear()

        for (var i = 0; i < this.image_collection.length; i++) {
            var image = document.createElement('div')
            image.innerHTML = image.innerHTML + `
            <style>
            .gus_carousel_element {
                height: ${this.carousel.clientHeight}px;
                width: ${this.carousel.clientWidth}px;

                background-size: cover;
                background-position: center;

                margin-left: 0;
                transition: 0.4s;
            }
            .gus_carousel_element_inactive {
                margin-left: 0px;
                transition: 0.4s;
            }
            .gus_carousel_element_active {
                margin-left: -${this.carousel.clientWidth}px;
                transition: 0.4s;
            }
            </style>
            <div class="gus_carousel_element" style="background-image: url(${this.image_collection[i]});"></div>
            `
            if (i < this.actual_image) {
                image.classList.add("gus_carousel_element_active")
            }
            this.carousel.appendChild(image)

            
        }

        if (this.autoScroll) {
            this.autoScrollFunc = setInterval((e) => {
                this.nextImage()
            }, this.autoScrollDelay);
        }
        else {
            this.autoScrollFunc = null
        }

        if (this.hideArrows) {
            this.carousel_button_left.style.display = "none"
            this.carousel_button_right.style.display = "none"
        }
        else {
            this.carousel_button_left.style.display = "auto"
            this.carousel_button_right.style.display = "auto"
        }

        if (this.hideBar) {
            this.carousel_bar.style.display = "none"
        }
        else {
            this.carousel_bar.style.display = "auto"
        }
    }

    clear() {
        // Carousel Image
        if (this.carousel.children.length > this.numberOfUiElement) {
            for (var i = 0; i < this.carousel.children.length; i++) {
                this.carousel.removeChild(this.carousel.children[this.numberOfUiElement])
            }
        }
        // Carousel Bar
        if (this.carousel_bar.children.length > this.numberOfUiElement) {
            for (var i = 0; i < this.carousel_bar.children.length; i++) {
                this.carousel_bar.removeChild(this.carousel_bar.children[0])
            }
        }
    }

    initCarouselBar() {
        for (var i = 0; i < this.length; i++) {
            var imageCase = document.createElement('div')
            imageCase.innerHTML = imageCase.innerHTML + `
            <style>
            .gus_carousel_bar_element {
                height: 10px;
                width: 10px;
                background: rgba(250, 250, 250, 0.3);
                margin-left: 5px;
                cursor: pointer;
                color: rgba(0, 0, 0, 0);
            }
            .gus_carousel_bar_element_active > div{
                background: rgba(250, 250, 250, 0.8);
            }
            </style>
            <div class="gus_carousel_bar_element" part="bar-element">${i}</div>
            `
            if (i === 0) {
                imageCase.classList.add("gus_carousel_bar_element_active")
            }
            imageCase.addEventListener("click", (e) => {
                if (Number.isInteger(parseInt(e.target.innerHTML))) {
                    this.actual_image = parseInt(e.target.innerHTML)
                    this.renderCarouselBar()
                }
            })
            this.carousel_bar.appendChild(imageCase)
        }
    }

    renderCarouselBar() {
        for (var i = 0; i < this.image_collection.length; i++) {
            if (i === this.actual_image) {
                this.carousel_bar.children[i].classList.add("gus_carousel_bar_element_active")
            } else {
                this.carousel_bar.children[i].classList.remove("gus_carousel_bar_element_active")
            }

            if (i < this.actual_image) {
                this.carousel.children[this.numberOfUiElement + i].classList.add('gus_carousel_element_active')
                this.carousel.children[this.numberOfUiElement + i].classList.remove('gus_carousel_element_inactive')
            }
            else {
                this.carousel.children[this.numberOfUiElement + i].classList.add('gus_carousel_element_inactive')
                this.carousel.children[this.numberOfUiElement + i].classList.remove('gus_carousel_element_active')
            }
        }
    }

    nextImage() {
        if (this.actual_image < this.carousel.children.length - this.numberOfUiElement - 1) {
            this.carousel.children[this.numberOfUiElement + this.actual_image].classList.add('gus_carousel_element_active')
            this.carousel.children[this.numberOfUiElement + this.actual_image].classList.remove('gus_carousel_element_inactive')
            this.actual_image += 1;

            this.carousel_bar.children[this.actual_image].classList.add('gus_carousel_bar_element_active')
            this.carousel_bar.children[this.actual_image - 1].classList.remove('gus_carousel_bar_element_active')
            this.dispatchEvent(this.event_next_image)
        }
        else {
            if (this.infinite) {
                this.actual_image = 0
                this.renderCarouselBar()
                this.dispatchEvent(this.event_next_image)
            }
        }
    }

    previousImage() {
        if (this.actual_image > 0) {
            this.carousel.children[this.numberOfUiElement + this.actual_image - 1].classList.remove('gus_carousel_element_active')
            this.carousel.children[this.numberOfUiElement + this.actual_image - 1].classList.add('gus_carousel_element_inactive')
            this.actual_image -= 1;

            this.carousel_bar.children[this.actual_image].classList.add('gus_carousel_bar_element_active')
            this.carousel_bar.children[this.actual_image + 1].classList.remove('gus_carousel_bar_element_active')
            this.dispatchEvent(this.event_previous_image)
        }
        else {
            if (this.infinite) {
                this.actual_image = this.length - 1
                this.renderCarouselBar()
                this.dispatchEvent(this.event_previous_image)
            }
        }
    }
}

window.customElements.define('gus-carousel', GusCarousel)

window.addEventListener('resize', function() {
    let all_gus_carousel = document.querySelectorAll('gus-carousel')

    for (var i = 0; i < all_gus_carousel.length; i++) {
        all_gus_carousel[i].render()
    }
});

let exampleSlider = document.querySelector('#range-slider-example')

let valueDisplay = document.querySelector('#range-slider-value')

exampleSlider.addEventListener("selected-value-changed", (e) => {
    valueDisplay.innerHTML = exampleSlider.value
})

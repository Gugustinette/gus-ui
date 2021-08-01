let slider_example = document.getElementById("slider_example")

let selected_value = document.getElementById("selected_value")

selected_value.innerHTML = `Selected Value : ${slider_example.selected_value}`

slider_example.addEventListener('click', function() {
    selected_value.innerHTML = `Selected Value : ${slider_example.selected_value}`
})

slider_example.addEventListener('selected-value-changed', function() {
    console.log('selected-value-changed')
})

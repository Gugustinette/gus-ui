let textfield = document.querySelector("#textfield")

textfield.addEventListener("text-modif", (e) => {
    console.log(textfield.value)
})
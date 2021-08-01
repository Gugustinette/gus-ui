let textfield = document.querySelector("#textarea")

textfield.addEventListener("text-modif", (e) => {
    console.log(textfield.value)
})
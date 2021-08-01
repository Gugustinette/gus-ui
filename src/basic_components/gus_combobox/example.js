let combobox = document.querySelector("#combobox-example")

combobox.addEventListener("value-changed", (e) => {
    console.log(combobox.selectedValue)
})

/*
setTimeout((e) => {
    combobox.content = JSON.stringify(
        ["Element 1", "Test 2", "Test 3", "Ok"]
    )
}, 5000)
*/
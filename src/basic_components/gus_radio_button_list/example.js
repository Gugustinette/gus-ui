let rblist = document.querySelector("#rblist-example")

rblist.addEventListener("value-changed", function(e) {
    console.log("New Value : " + rblist.value)
})

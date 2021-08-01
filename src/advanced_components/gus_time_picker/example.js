let time_picker = document.querySelector('#gus-tp-example')

time_picker.addEventListener("confirm", function(e) {
    console.log("confirm")
    console.log(time_picker.time)
    console.log(time_picker.period)
})

time_picker.addEventListener("cancel", function(e) {
    console.log("cancel")
})

time_picker.addEventListener("confirm-keyboard", function(e) {
    console.log("confirm-keyboard")
})

time_picker.addEventListener("cancel-keyboard", function(e) {
    console.log("cancel-keyboard")
})

time_picker.addEventListener("confirm-keyboard-scfl", function(e) {
    console.log("confirm-keyboard-scfl")
    console.log(time_picker.time)
    console.log(time_picker.period)
})

time_picker.addEventListener("confirm-keyboard-wrong", function(e) {
    console.log("confirm-keyboard-wrong")
})

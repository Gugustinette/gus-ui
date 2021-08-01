let focus_window = document.getElementById("focus_window_example")
let button = document.getElementById("button")

button.addEventListener('click', function() {
    focus_window.visible = focus_window.visible == false;
})

focus_window.addEventListener('closed-window', function() {
    console.log('closed-window')
})

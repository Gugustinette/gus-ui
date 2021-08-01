let sidebar = document.querySelector("gus-sidebar")

let container = document.getElementById("container")
let box = document.getElementById("box")

box.addEventListener('click', function(e) {
    if (!sidebar.visible) {
        sidebar.visible = true
    }
    else {
        sidebar.visible = false
    }
    e.stopPropagation()
})

container.addEventListener('click', function(e) {
    if (sidebar.visible) {
        sidebar.visible = false
    }
})
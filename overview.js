import { GusButton } from "./dist/basic_components/gus_button.js"
import { GusDialog } from "./dist/advanced_components/gus_dialog.js"

import { GusAlertBox } from "./dist/advanced_components/gus_alert_box.js"

// Side Bar
let container = document.querySelector('#main')
let clickable_box_sb = document.querySelector('#show-sidebar')
let sidebar = document.querySelector('#sidebar')

clickable_box_sb.addEventListener('click', function(e) {
    sidebar.visible = sidebar.visible == false 
    e.stopPropagation()
})

container.addEventListener('click', function(e) {
    if (sidebar.visible) {
        sidebar.visible = false
    }
})

// ?
let clickable_box_fw = document.querySelector('#show-focus-window')
let focus_window = document.querySelector('#focus-window')

clickable_box_fw.addEventListener('click', function(e) {
    focus_window.visible = focus_window.visible == false 
    e.stopPropagation()
})

container.addEventListener('click', function(e) {
    if (focus_window.visible) {
        focus_window.visible = false
    }
})

// Dialog
let button_dialog = document.querySelector("#button-dialog")

button_dialog.addEventListener('click', (e) => {

    var dialog = new GusDialog()

    var okButton = new GusButton()

    okButton.content = "Ok"
    okButton.noBorder = true

    okButton.addEventListener("click", (e) => {
        dialog.remove()
    })

    dialog.appendChild(okButton)

    document.body.appendChild(dialog)
})

// Alert Box
let button_alert = document.querySelector("#button-alertbox")

button_alert.addEventListener('click', (e) => {

    var alertBox = new GusAlertBox()

    alertBox.title = "New Alert Box"
    alertBox.description = "This is an alert box description"

    document.body.appendChild(alertBox)
})
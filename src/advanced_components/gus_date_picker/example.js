let date_picker = document.getElementById("date_picker")
let date_picker_status = document.getElementById("date_picker_status")

date_picker.addEventListener('date-changed', function() {
    date_picker_status.innerHTML = `Selected Date : ${date_picker.selected_date}`
})

date_picker.addEventListener('confirm', function() {
    console.log('confirm')
})

date_picker.addEventListener('cancel', function() {
    console.log('cancel')
})


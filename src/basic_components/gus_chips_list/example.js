let chipsListCheck = document.querySelector("#chips-list-example-check")

chipsListCheck.addEventListener("value-changed", (e) => {
    console.log("All values in chips list : ")
    console.log(chipsListCheck.getValues())

    console.log("All selected values in chips list (check-chips only) : ")
    console.log(chipsListCheck.getSelectedValues())
})

let chipsListCross = document.querySelector("#chips-list-example-cross")

chipsListCross.addEventListener("value-changed", (e) => {
    console.log("All values in chips list : ")
    console.log(chipsListCross.getValues())

    console.log("All selected values in chips list (check-chips only) : ")
    console.log(chipsListCross.getSelectedValues())
})

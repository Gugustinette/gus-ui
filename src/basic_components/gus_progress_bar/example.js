window.customElements.whenDefined('gus-progress-bar').then(() => {
    let progress_bar = document.querySelector("#progress_bar_example_1")

    progress_bar.filling = 40

    setTimeout(function() {
        progress_bar.filling = 80
    }, 2000)
})

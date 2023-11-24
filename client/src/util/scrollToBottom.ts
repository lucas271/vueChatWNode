const scrollToBottom = (element: HTMLElement) => {
    if(!element) return
    const newd = new ResizeObserver(function() {
        element.scrollTo(0, element.scrollHeight)
    })

    newd.observe(element)
}

export default scrollToBottom
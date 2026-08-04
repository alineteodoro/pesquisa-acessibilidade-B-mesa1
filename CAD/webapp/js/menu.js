document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".menu nav")
    const indicator = nav?.querySelector(".active-indicator")
    const activeLink = nav?.querySelector("a.active, a[aria-current='page']")

    if (!nav || !indicator || !activeLink) {
        return
    }

    const updateIndicator = () => {
        const navRect = nav.getBoundingClientRect()
        const linkRect = activeLink.getBoundingClientRect()
        const top = linkRect.top - navRect.top

        indicator.style.top = `${top}px`
        indicator.style.height = `${linkRect.height}px`
    }

    updateIndicator()
    window.addEventListener("resize", updateIndicator)
})

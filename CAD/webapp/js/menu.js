document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".menu nav")
    const indicator = nav?.querySelector(".active-indicator")
    const links = nav ? Array.from(nav.querySelectorAll("a")) : []
    let activeLink = nav?.querySelector("a.active, a[aria-current='page']") || links[0]

    if (!nav || !indicator || !activeLink) {
        return
    }

    const updateIndicator = (link = activeLink) => {
        const navRect = nav.getBoundingClientRect()
        const linkRect = link.getBoundingClientRect()
        const top = linkRect.top - navRect.top

        indicator.style.top = `${top}px`
        indicator.style.height = `${linkRect.height}px`
    }

    const setActiveLink = (link) => {
        if (!link || link === activeLink) {
            return
        }

        links.forEach((item) => {
            item.classList.toggle("active", item === link)
            if (item === link) {
                item.setAttribute("aria-current", "page")
            } else {
                item.removeAttribute("aria-current")
            }
        })

        activeLink = link
        indicator.classList.add("animate")
        updateIndicator(link)
    }

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            setActiveLink(link)
        })
    })

    updateIndicator()
    window.addEventListener("resize", () => updateIndicator(activeLink))
})

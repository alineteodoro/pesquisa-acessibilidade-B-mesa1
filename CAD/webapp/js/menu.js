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
        const communityLink = nav.querySelector("a[href$='comunidade.html']")
        const communityRect = communityLink ? communityLink.getBoundingClientRect() : linkRect

        const topPx = linkRect.top - navRect.top
        const sidePaddingPx = 8
        const desiredWidthPx = Math.max(linkRect.width, communityRect.width) + sidePaddingPx * 2
        const maxWidthPx = Math.max(0, navRect.width - sidePaddingPx * 2)
        const widthPx = Math.min(desiredWidthPx, maxWidthPx)

        const rootFontPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
        const topRem = (topPx / rootFontPx).toFixed(3)
        const leftRem = (sidePaddingPx / rootFontPx).toFixed(3)
        const widthRem = (widthPx / rootFontPx).toFixed(3)
        const heightRem = (linkRect.height / rootFontPx).toFixed(3)

        indicator.style.top = `${topRem}rem`
        indicator.style.left = `${leftRem}rem`
        indicator.style.width = `${widthRem}rem`
        indicator.style.height = `${heightRem}rem`
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

document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu")
    const toggle = document.getElementById("menuToggle")
    const scrim = document.getElementById("menuScrim")

    if (!menu || !toggle) {
        return
    }

    const isMobile = () => window.innerWidth <= 900

    const syncInert = () => {
        menu.inert = isMobile() && !menu.classList.contains("open")
    }

    const closeMenu = () => {
        menu.classList.remove("open")
        toggle.setAttribute("aria-expanded", "false")
        scrim?.setAttribute("hidden", "")
        syncInert()
    }

    const openMenu = () => {
        menu.classList.add("open")
        toggle.setAttribute("aria-expanded", "true")
        scrim?.removeAttribute("hidden")
        syncInert()
    }

    toggle.addEventListener("click", () => {
        if (menu.classList.contains("open")) {
            closeMenu()
        } else {
            openMenu()
        }
    })

    scrim?.addEventListener("click", closeMenu)

    menu.querySelectorAll("nav a").forEach((link) => {
        link.addEventListener("click", closeMenu)
    })

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menu.classList.contains("open")) {
            closeMenu()
            toggle.focus()
        }
    })

    window.addEventListener("resize", () => {
        if (!isMobile()) {
            closeMenu()
        } else {
            syncInert()
        }
    })

    syncInert()
})

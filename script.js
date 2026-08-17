(() => {
  const $ = (selector, root = document) => root.querySelector(selector)
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector))

  const menuButton = $('#menuButton')
  const mobileMenu = $('#mobileMenu')

  menuButton?.addEventListener('click', () => {
    const open = mobileMenu.hasAttribute('hidden')
    if (open) mobileMenu.removeAttribute('hidden')
    else mobileMenu.setAttribute('hidden', '')
    menuButton.textContent = open ? 'CLOSE' : 'MENU'
    menuButton.setAttribute('aria-expanded', String(open))
  })

  const goToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    mobileMenu?.setAttribute('hidden', '')
    if (menuButton) {
      menuButton.textContent = 'MENU'
      menuButton.setAttribute('aria-expanded', 'false')
    }
  }

  $$('[data-go]').forEach((button) => {
    button.addEventListener('click', () => goToSection(button.dataset.go))
  })

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const revealItems = $$('[data-reveal]')
  const sections = $$('[data-mission-section]')

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'))
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14 })
    revealItems.forEach((item) => revealObserver.observe(item))
  }

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visible?.target.id) return
      $$('.story-nav button').forEach((button) => button.classList.toggle('active', button.dataset.go === visible.target.id))
    }, { rootMargin: '-28% 0px -48% 0px', threshold: [0.05, 0.2, 0.4, 0.7] })
    sections.forEach((section) => sectionObserver.observe(section))
  }

  $$('.photo-card').forEach((card) => {
    card.addEventListener('click', () => card.classList.toggle('is-open'))
    card.addEventListener('mousemove', (event) => {
      if (reduceMotion) return
      const rect = card.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      card.style.setProperty('--rx', `${((0.5 - y) * 4).toFixed(2)}deg`)
      card.style.setProperty('--ry', `${((x - 0.5) * 4).toFixed(2)}deg`)
    })
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg')
      card.style.setProperty('--ry', '0deg')
    })
  })
})()

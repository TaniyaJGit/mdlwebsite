(() => {
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector))

  $$('.scroll-button').forEach((button) => {
    button.addEventListener('click', () => {
      document.getElementById(button.dataset.go)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  })

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const revealItems = $$('[data-reveal]')

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

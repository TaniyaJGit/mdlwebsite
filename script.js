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

})()

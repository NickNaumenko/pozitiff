window.onload = () => {
  function toggle(element) {
    element.classList.toggle('open');
  }

  function toggleDescription(e) {
    const { target } = e;
    if (target.closest('.site__button')) {
      const site = target.closest('.site');
      if (!site) return;

      toggle(site);
    }
  }

  const examples = document.querySelector('.examples');
  examples.addEventListener('click', toggleDescription);
};
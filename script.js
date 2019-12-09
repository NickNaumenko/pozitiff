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

  function openModal() {
    document.body.classList.add('modal-opened');
    setTimeout(() => {
      document.body.addEventListener('click', handleCloseModal);
    });    
  }

  function closeModal() {
    document.body.classList.remove('modal-opened');
  }

  function handleCloseModal(e) {
    const { target } = e;
    if (target.closest('.modal__close')) {
      closeModal();
      document.body.removeEventListener('click', handleCloseModal);
    }    
  }

  const examples = document.querySelector('.examples');
  examples.addEventListener('click', toggleDescription);

  const modalButton = document.querySelector('.show-modal-button');
  modalButton.addEventListener('click', openModal);
};
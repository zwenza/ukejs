import UkeVdom from '../uke-vdom/index';

export default function UkeCore() {
  const self = {};
  self._rootElement = null;
  self._router = {};

  function mount(element) {
    const mountElement = document.getElementById(element);

    if (!mountElement) {
      console.log('ERR: Could not mount application! Element not found...');
    } else {
      self._rootElement = mountElement;
    }

    run();
  }

  function run() {
    const path = window.document.location.pathname;
    const activeComponent = self._router.find(path).component;

    self._rootElement.appendChild(
      UkeVdom().createElement(
        activeComponent.render(activeComponent.defaultProps),
        activeComponent
      )
    );
  }

  function router(router) {
    self._router = router;
  }

  return {
    mount,
    router
  };
}

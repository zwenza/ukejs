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

    activeComponent.node = UkeVdom().createElement(
      activeComponent.render(
        Object.freeze(activeComponent.defaultProps),
        activeComponent.state
      ),
      activeComponent
    );

    self._rootElement.appendChild(activeComponent.node);
  }

  function rerender() {
    self._rootElement.removeChild(self._rootElement.children[0]);
    run();
  }

  function router(router) {
    self._router = router;
  }

  return {
    mount,
    router,
    rerender
  };
}

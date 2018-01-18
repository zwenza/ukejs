import UkeVdom from './uke-vdom/index';

export default () => {
  const self = {};
  self._rootElement = null;
  self._registeredComponents = [];
  self._router = {};

  /**
   * Mounts the application on the given element
   */
  self.mount = function(element) {
    const mountElement = document.getElementById(element);

    if (!mountElement) {
      console.log('ERR: Could not mount application! Element not found...');
    } else {
      self._rootElement = mountElement;
    }

    self.run();
  };

  /**
   * Registers a new component and returns it
   */
  self.component = function(component) {
    self._registeredComponents.push(component);
    return component;
  };

  /**
   * Starts the application
   */
  self.run = function() {
    const path = window.document.location.pathname;
    const activeRoute = self._router.find(path);

    self._rootElement.appendChild(
      UkeVdom(self._registeredComponents).createElement(
        activeRoute.component.render(activeRoute.component.props)
      )
    );
  };

  self.router = function(router) {
    self._router = router;
  };

  return self;
};

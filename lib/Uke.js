export function component(config) {
  if (!config.render) {
    throw new Error(
      'You tried to register a component without render function! Make sure to declare a render function in all your components.'
    );
  }
  config.$$type = 'uke_component'; // type for component detection
  return config;
}

export function isComponent(obj) {
  return obj && obj.hasOwnProperty('$$type') && obj.$$type === 'uke_component';
}

/**
 * JSX creator function (like React.createElement)
 *
 * @param {*} type
 * @param {*} props
 * @param {*} children
 */
export function u(type, props, ...children) {
  return {
    type: type,
    props: props || {},
    children: children
  };
}

export function setState(fn, oldState, app) {
  fn(oldState);
  app.rerender();
}

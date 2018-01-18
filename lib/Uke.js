export function component(config) {
  if (!config.selector || config.selector === '') {
    throw new Error(
      'You tried to register a component without selector! Make sure to give all your components a selector.'
    );
  }
  if (!config.render) {
    throw new Error(
      'You tried to register a component without render function! Make sure to declare a render function in all your components.'
    );
  }
  return config;
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

/**
 * Sets the given prop (name, value) on the target element
 *
 * @param {*} target
 * @param {*} name
 * @param {*} value
 */
export function setProp(target, name, component, value) {
  if (name === 'className') {
    // class cannot be used with JSX so we need extra handling
    target.setAttribute('class', value);
  } else if (typeof value === 'boolean') {
    if (value) {
      target.setAttribute(name, value);
      target[name] = true;
    } else {
      target[name] = false;
    }
  } else {
    component.props = {
      name: value
    };
    target.setAttribute(name, value);
  }
}

/**
 * Sets the given props on the target element
 *
 * @param {*} target
 * @param {*} props
 */
export function setProps(target, component, props) {
  Object.keys(props).forEach(name =>
    setProp(target, name, component, props[name])
  );
}

/**
 * Updates the prop with the given name with the newValue
 *
 * @param {*} target
 * @param {*} name
 * @param {*} newVal
 * @param {*} oldVal
 */
export function updateProp(target, name, newVal, oldVal) {
  if (oldVal && !newVal) {
    removeProp(target, name, oldVal);
  } else if (!oldVal || newVal !== oldVal) {
    setProp(target, name, newVal);
  }
}

/**
 * Updates the props of the targetElement with the newProps
 *
 * @param {*} target
 * @param {*} oldProps
 * @param {*} newProps
 */
export function updateProps(target, oldProps, newProps) {
  var props = Object.assign({}, newProps, oldProps);

  Object.keys(props).forEach(name =>
    updateProp(target, name, newProps[name], oldProps[name])
  );
}

/**
 * Removes the prop with the given name from the target element
 */
export function removeProp(target, name) {
  if (name === 'className') {
    target.removeAttribute('class');
  } else if (typeof value === 'boolean') {
    target.removeAttribute(name);
    target[name] = false;
  } else {
    target.removeAttribute(name);
  }
}

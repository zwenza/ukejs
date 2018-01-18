/**
 * Sets the given prop (name, value) on the target element
 *
 * @param {*} target
 * @param {*} name
 * @param {*} value
 */
export function setProp(target, name, value) {
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
    target.setAttribute(name, value);
  }
}

export function setProps(target, props) {
  Object.keys(props).forEach(name => setProp(target, name, props[name]));
}

export function updateProp(target, name, newVal, oldVal) {
  if (oldVal && !newVal) {
    removeProp(target, name, oldVal);
  } else if (!oldVal || newVal !== oldVal) {
    setProp(target, name, newVal);
  }
}

export function updateProps(target, oldProps, newProps) {
  var props = Object.assign({}, newProps, oldProps);

  Object.keys(props).forEach(name =>
    updateProp(target, name, newProps[name], oldProps[name])
  );
}

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

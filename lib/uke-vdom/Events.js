export function addEventListeners(target, props) {
  Object.keys(props).forEach(name => {
    if (isEventProp(name)) {
      target.addEventListener(extractEventName(name), props[name]);
    }
  });
}

function isEventProp(name) {
  return /^on/.test(name);
}

function extractEventName(name) {
  return name.slice(2).toLowerCase();
}

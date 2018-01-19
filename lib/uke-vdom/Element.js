import * as Props from './Props';

/**
 * Creates a DOM node out of a virtual node.
 *
 * @param {*} node
 */
export function createElement(node, component, components) {
  // TODO check of undefined node -> propably misspelled props in child component
  if (typeof node === 'string') {
    // check if the node is just a text node we return it (cannot have children)
    return document.createTextNode(node);
  } else if (!isHtmlElement(node.type)) {
    // the given node should be a user defined component
    const customComponent = components.find(
      component => component.selector === node.type
    );
    if (!customComponent) {
      console.log('Cannot find component with selector: ', node.type);
    } else {
      const props = Object.assign(node.props, customComponent.defaultProps); // merge default and node props
      return createElement(customComponent.render(props));
    }
  } else {
    // the given node is a HTML node
    const element = document.createElement(node.type);
    Props.setProps(element, component, node.props);

    if (node.children) {
      if (node.children instanceof Array) {
        for (let child of node.children) {
          if (child && child.type && !isHtmlElement(child.type)) {
            element.appendChild(
              createElement(
                child,
                components.find(component => component.selector === child.type),
                components
              )
            );
          } else {
            element.appendChild(createElement(child, undefined, components));
          }
        }
      } else {
        if (child.type && !isHtmlElement(child.type)) {
          element.appendChild(
            createElement(
              child,
              components.find(component => component.selector === child.type),
              components
            )
          );
        } else {
          element.appendChild(createElement(child, undefined, components));
        }
      }
    }

    return element;
  }
}

/**
 * Compares and updates the two given nodes and their children.
 *
 * @param {object} parent
 * @param {object} newNode
 * @param {object} oldNode
 * @param {number} index
 */
function updateElement(parent, newNode, oldNode, index) {
  if (!index) {
    index = 0;
  }

  if (!oldNode) {
    parent.appendChild(newNode);
  } else if (!newNode) {
    parent.removeChild(parent.childNodes[index]);
  } else if (elementChanged(newNode, oldNode)) {
    parent.replaceChild(self.createElement(newNode), parent.childNodes[index]);
  } else if (newNode.type) {
    // nodes are the same -> check child nodes & props
    Props.updateProps(parent.childNodes[index], newNode.props, oldNode.props);

    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;

    for (let i = 0; i < newLength || i < oldLength; i++) {
      //update child node
      self.updateElement(
        parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}

/**
 * Compares the two given nodes if they are the same of changed.
 *
 * @param {object} node1
 * @param {object} node2
 */
function elementChanged(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === 'string' && node1 !== node2) ||
    node1.type !== node2.type
  );
}

/**
 * Checks if the given type is a valid HTML element
 *
 * @param {*} type
 */
function isHtmlElement(type) {
  // TODO this should check for all valid html elements
  return type === 'div' || type === 'h1' || type === 'p';
}

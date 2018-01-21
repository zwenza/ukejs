import * as Props from './Props';
import * as Uke from '../Uke';

/**
 * Creates a DOM node out of a virtual node.
 *
 * @param {*} node
 */
export function createElement(node, component) {
  // TODO check of undefined node -> propably misspelled props in child component
  if (typeof node === 'string') {
    // check if the node is just a text node we return it (cannot have children)
    return document.createTextNode(node);
  } else if (Uke.isComponent(node.type)) {
    const props = Object.assign(node.props, customComponent.defaultProps); // merge default and node props
    return createElement(component.type.render(props), component.type);
  } else {
    // the given node is a HTML node
    const element = document.createElement(node.type);
    Props.setProps(element, component, node.props);

    if (node.children) {
      for (let child of node.children) {
        if (child && Uke.isComponent(child.type)) {
          element.appendChild(
            createElement(
              child.type.render(
                Object.assign(child.props, child.type.defaultProps)
              ),
              child.type
            )
          );
        } else {
          element.appendChild(createElement(child, undefined));
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

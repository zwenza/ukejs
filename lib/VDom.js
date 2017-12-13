
/**
 * Creates a virtual DOM node.
 * 
 * @param {string} type 
 * @param {object} props 
 * @param {array} children 
 */
function u(type, props, children) {
    return {
        type: type,
        props: props,
        children: children
    }
}

/**
 * Creates a DOM node out of a virtual node.
 * 
 * @param {*} node 
 */
function createElement(node) {
    if(typeof node === 'string') {
        // check if the node is just a text node we return it (cannot have children)         
        return document.createTextNode(node);
    }

    const element = document.createElement(node.type);
    
    for(let child of node.children) {
        element.appendChild(createElement(child));
    }

    return element;
}
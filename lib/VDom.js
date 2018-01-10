/**
 * Creates a virtual DOM node.
 * 
 * @param {string} type 
 * @param {object} props 
 * @param {array} children 
 */
function u(type, props, ...children) {
    return {
        type: type,
        props: props || {},
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
    setProps(element, node.props);
    
    if(node.children) {
        if(node.children instanceof Array) {
            for(let child of node.children) {
                element.appendChild(createElement(child));
            }
        } else {
            element.appendChild(createElement(node.children));
        }
    }

    return element;
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
        parent.removeChild(
            parent.childNodes[index]
        );
    } else if (elementChanged(newNode, oldNode)) {
        parent.replaceChild(
            createElement(newNode),
            parent.childNodes[index]
        );
    } else if (newNode.type) {
        // nodes are the same -> check child nodes & props
        updateProps(parent.childNodes[index], newNode.props, oldNode.props);

        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;

        for (let i = 0; i < newLength || i < oldLength; i++) {
            //update child node
            updateElement(
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
    return typeof node1 !== typeof node2 || typeof node1 === 'string' && node1 !== node2 || node1.type !== node2.type
}

/**
 * Sets the given prop (name, value) on the target element
 * 
 * @param {*} target 
 * @param {*} name 
 * @param {*} value 
 */
function setProp(target, name, value) {
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

function setProps(target, props) {
    Object.keys(props)
        .forEach(name => setProp(target, name, props[name]))
}

function removeProp(target, name) {
    if (name === 'className') {
        target.removeAttribute('class');
    } else if (typeof value === 'boolean') {
        target.removeAttribute(name);
        target[name] = false;
    } else {
        target.removeAttribute(name);
    }
}

function updateProp(target, name, newVal, oldVal) {
    if (oldVal && !newVal) {
        removeProp(target, name, oldVal);
    } else if (!oldVal || newVal !== oldVal) {
        setProp(target, name, newVal);
    }
}

function updateProps(target, oldProps, newProps) {
    var props = Object.assign({}, newProps, oldProps);

    Object.keys(props)
        .forEach(name => updateProp(target, name, newProps[name], oldProps[name]));
}
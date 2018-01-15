export function Uke(config) {
    //TODO do more fancy stuff here
    return config;
}

export function u(type, props, ...children) {
    return {
        type: type,
        props: props || {},
        children: children
    }
}
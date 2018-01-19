import * as Element from './Element';
import * as Props from './Props';

export default function UkeVdom(components) {
  const self = {};

  self.createElement = (node, component) => {
    return Element.createElement(node, component, components);
  };

  return self;
}

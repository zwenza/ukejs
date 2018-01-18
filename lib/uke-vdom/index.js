import * as Element from './Element';
import * as Props from './Props';

export default function UkeVdom(components) {
  const self = {};

  self.createElement = node => {
    return Element.createElement(node, components);
  };

  return self;
}

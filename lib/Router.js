import * as Uke from './Uke';

export default () => {
  const self = {};
  self.routes = [];
  self.notFoundSite = {
    path: '404',
    component: Uke.component({
      selector: 'notfound',
      render: function() {
        return '<h3>404 Not Found<h3>';
      }
    })
  };

  self.route = function(path, component) {
    const newRoute = {
      path: path,
      component: component
    };

    self.routes.push(newRoute);
  };

  self.find = function(path) {
    for (var route of self.routes) {
      if (route.path === path) {
        return route;
      }
    }

    return self.notFoundSite;
  };

  return self;
};

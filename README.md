![UkeJS Logo](assets/logo.png)

# Uke

Uke is a small javascript library to write javascript application.

## Purpose

I write this library to improve my vanilla javascript knowledge and to learn
how modern javascript frameworks like React, Vue or Angular works.

This library has (and will never have) any dependencies on other libraries, because I want to build everything I need on my own.

‼ This library is not intended to use in real world applications! ‼

If you have questions, feel free to open issues and i will try to answer them 😊!

## Features

* components system
* props
* virtual dom
* JSX support!
* very (very!) basic routing

Upcoming:

* state handling
* redux reimplementation
* better routing

## Example

This maybe outdated because the API currently changes everyday basically 🤷

```
import { Lib, Router, Uke } from 'ukejs';

var app = Lib();
var router = Router();

const HelloComponent = Uke.component({
  selector: 'hello',
  props: {
    greetings: 'Hola!'
  },
  render: props => {
    return (
      <div>
        <h1>Hello World!</h1>
        {props.greetings}
        <test />
      </div>
    );
  }
});

const TestComponent = Uke.component({
  selector: 'test',
  render: props => {
    return <h1>Test</h1>;
  }
});

app.component(HelloComponent);
app.component(TestComponent);

router.route('/', HelloComponent);

app.router(router);
app.mount('app');
```

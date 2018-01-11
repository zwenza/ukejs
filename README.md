# Uke
Uke is a small javascript library to write javascript application. 

## Purpose
I write this library to improve my vanilla javascript knowledge and to learn
how modern javascript frameworks like React, Vue or Angular works.

This library has (and will never have) any dependencies on other libraries, because I want to build everything I need on my own.

‼ This library is not intended to use in real world applications! ‼

If you have questions, feel free to open issues and i will try to answer them 😊!

## Features

- components system
- props
- virtual dom
- JSX support!
- very (very!) basic routing

Upcoming:

- state handling
- redux reimplementation
- better routing

## Example
This maybe outdated because the API currently changes everyday basically 🤷

```
// create a new uke-app
var app = UkeApp();
var router = Router();  // router provided by Uke

const HelloComponent = new Uke({
    selector: 'hello',
    props: {
        greetings: 'Hola!'
    },
    render: props => {
        return <div>
            <h1>Hello World!</h1>
            { props.greetings }
            <test></test>
        </div>
    }
});

const TestComponent = new Uke({
    selector: 'test',
    render: () => {
        return <h1>Test</h1>
    }
});

// register the component in the Uke-App
app.component(HelloComponent);

// basic route declaration
router.route('/', HelloComponent);

app.router(router);

// mount the app on the element with the given id
app.mount('app');

```
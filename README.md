![UkeJS Logo](assets/logo.png)

[![CircleCI](https://circleci.com/gh/zwenza/ukejs/tree/master.svg?style=svg)](https://circleci.com/gh/zwenza/ukejs/tree/master)

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
* event handling
* very (very!) basic routing
* state handling

Upcoming:

* partial node updates after state changes
* redux reimplementation
* better routing

## Example

This maybe outdated because the API currently changes everyday basically 🤷

```js
import { UkeCore, UkeRouter, Uke } from 'ukejs';

var app = UkeCore();
var router = UkeRouter();

const Concert = Uke.component({
  state: {
    playing: true
  },
  defaultProps: {
    song: 'Somewhere Over The Rainbow'
  },
  render: (props, state) => {
    return (
      <div>
        <h1>Welcome!</h1>
        <Ukulele type="supran" playing={state.playing} />
      </div>
    );
  }
});

const Ukulele = Uke.component({
  state: {
    volume: 'silent'
  },
  defaultProps: {
    name: 'David'
  },
  render: (props, state) => {
    return (
      <div>
        <p>
          My name is {props.name} and i {props.playing ? 'do' : "don't"} play{' '}
          {props.type} Ukulele! The ukulele is {state.volume}
        </p>
        <p />
        <button
          onClick={() => {
            Uke.setState(
              state => {
                state.volume = 'loud';
              },
              state,
              app
            );
          }}
        >
          louder!!!!
        </button>
      </div>
    );
  }
});

router.route('/', Concert);

app.router(router);
app.mount('app');
```

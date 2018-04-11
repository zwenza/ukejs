import { UkeCore, UkeRouter, Uke } from 'ukejs';

var app = UkeCore();
var router = UkeRouter();

const Concert = Uke.component({
  state: {
    playing: true
  },
  defaultProps: {
    song: 'Somewhere Over The Rainbow',
    age: 21
  },
  render: (props, state) => {
    return (
      <div>
        <h1>Welcome!</h1>
        <Ukulele type="supran" playing={state.playing} age={props.age} />
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
          {props.type} Ukulele! The ukulele is {state.volume}. I am {props.age} years old.
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

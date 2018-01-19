import { UkeCore, UkeRouter, Uke } from 'ukejs';

var app = UkeCore();
var router = UkeRouter();

const Concert = Uke.component({
  selector: 'Concert',
  defaultProps: {
    song: 'Somewhere Over The Rainbow'
  },
  render: props => {
    return (
      <div>
        <h1>Welcome!</h1>
        <ukulele type="supran" />
      </div>
    );
  }
});

const Ukulele = Uke.component({
  selector: 'ukulele',
  defaultProps: {
    name: 'David'
  },
  render: props => {
    return (
      <div>
        <p>
          My name is {props.name} and i play {props.type} Ukulele!
        </p>
      </div>
    );
  }
});

app.component(Concert);
app.component(Ukulele);

router.route('/', Concert);

app.router(router);
app.mount('app');

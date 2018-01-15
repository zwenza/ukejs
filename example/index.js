import {Lib, Router, Uke} from 'ukejs';

var app = Lib();
var router = Router();

const HelloComponent = Uke.Uke({
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

const TestComponent = Uke.Uke({
    selector: 'test',
    render: props => {
        return <h1>Test</h1>
    }
});

app.component(HelloComponent);
app.component(TestComponent);

router.route('/', HelloComponent);

app.router(router);
app.mount('app');

var app = UkeApp();
var router = Router();

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
    render: props => {
        return <h1>Test</h1>
    }
});

app.component(HelloComponent);

router.route('/', HelloComponent);

app.router(router);
app.mount('app');

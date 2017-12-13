var app = UkeApp();
var router = Router();

const HelloComponent = new Uke({
    selector: 'hello',
    render: function () {
        return u('div', null, [
            u('h1', null, [
                'Hello World!!!'
            ]),
            u('h3', null, [
                'Virtual DOM works!'
            ])
        ])
    }
});

router.route('/', HelloComponent);

app.router(router);
app.mount('app');
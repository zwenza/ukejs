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

const WorldComponent = new Uke({
    selector: 'world',
    render: function () {
        return u('h2', null, [
            'You pressed the button!'
        ])
    }
});

router.route('/', HelloComponent);

app.router(router);
app.mount('app');

const btn = document.getElementById('btn1');
btn.addEventListener('click', function() {
    updateElement(document.getElementById('app'), WorldComponent.render(), HelloComponent.render());
});
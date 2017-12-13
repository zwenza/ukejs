var app = UkeApp();
var router = Router();

const HelloComponent = new Uke({
    selector: 'hello',
    render: function () {
        return <div>
            <h1>Hello</h1>
            <h2>JSX World!</h2>
        </div>
    }
});

const WorldComponent = new Uke({
    selector: 'world',
    render: function () {
        return <h2>You pressed it!</h2>
    }
});

router.route('/', HelloComponent);

app.router(router);
app.mount('app');

const btn = document.getElementById('btn1');
btn.addEventListener('click', function() {
    updateElement(document.getElementById('app'), WorldComponent.render(), HelloComponent.render());
});
var app = UkeApp();
var router = Router();

const HelloComponent = new Uke({
    selector: 'hello',
    render: function () {
        return '<h1>hello world</h1>';
    }
});

const BlubComponent = new Uke({
    selector: 'blub',
    render: function () {
        return '<h2>blub</h2>';
    }
});

router.route('/', HelloComponent);
router.route('/blub', BlubComponent);

app.router(router);
app.mount('app');
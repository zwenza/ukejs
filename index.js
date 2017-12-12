var app = Lib();
var router = Router();

const HelloComponent = app.component('hello', function() {
    return '<h1>hello world!</h1>';
});

const BlubComponent = app.component('blub', function() {
    return '<h2>blub</h2';
})

router.route('/', HelloComponent);
router.route('/blub', BlubComponent);

app.router(router);
app.mount('app');
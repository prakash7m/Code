window.onload = function () {
    var s = new Code.Scene();
    var c = new Code.Actor({
        dimension: {
            left: 100, top: 10, width: 50, height: 50
        },
        acceleration: 3
    });
    var one = new Code.Movables({
        dimension: {
            left: 200,
            top: 100,
            width: 50,
            height: 50
        },
        acceleration: 2,
        movingStyle: {
            type: 'fixedRange',
            prop: {
                left: 0, right: 800
            }
        },
        xdir: 'right'
    });

    c.on('keydown', function (comp, e) {
        if (e.keyCode == 37)
            comp.xdir = 'left'

        if (e.keyCode == 38)
            comp.setTop(comp.getTop() + comp.acceleration);

        if (e.keyCode == 39)
            comp.xdir = 'right';

        if (e.keyCode == 40)
            comp.setTop(comp.getTop() - comp.acceleration);

    })
    c.on('keyup', function (comp, e) {
        comp.xdir = 'still'
    })
    s.add([one, c]);
    var manager = new Code.Manager();
    manager.start(s);
}
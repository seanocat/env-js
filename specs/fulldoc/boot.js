
/**
 * @author thatcher
 */
var myprint = print;
load('dist/env.rhino.js');


Envjs({
    scriptTypes: { "text/javascript": true },
});
window.location = 'specs/fulldoc/index.html';

var div = window.document.getElementById('qunit-testresult');
print("DIV = " + div);
var spans = div.getElementsByTagName('SPAN')

var summary = {};
for (var i = 0; i < spans.length; ++i) {
    var clazz = spans[i].getAttribute('class');
    summary[clazz] = parseInt(spans[i].textContent);
    print(clazz + ' = ' + summary[clazz]);
}


/**
 * @author thatcher
 */

var QUnit 	= require('specs/qunit').QUnit,
	start 	= require('specs/qunit').start;

require('specs/env.qunit');
QUnit.init();
location = 'specs/fulldoc/index.html';
start();

var myprint = Envjs.log,
	div = window.document.getElementById('qunit-testresult'),
	spans = div.getElementsByTagName('SPAN'),
	summary = {},
	clazz,
	i;
	
for (i = 0; i < spans.length; ++i) {
    clazz = spans[i].getAttribute('class');
    summary[clazz] = parseInt(spans[i].textContent);
    myprint(clazz + ' = ' + summary[clazz]);
}

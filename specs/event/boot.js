/**
 * @author thatcher
 */
QUnit 	= require('specs/qunit').QUnit,
module 	= require('specs/qunit').module,
expect 	= require('specs/qunit').expect,
equals 	= require('specs/qunit').equals,
assert 	= require('specs/qunit').assert,
start 	= require('specs/qunit').start,
test 	= require('specs/qunit').test,
ok 		= require('specs/qunit').ok;

// mock the global document object
document = new Document(new DOMImplementation());

xmlserializer = new XMLSerializer();
domparser = new DOMParser();

require('specs/env.qunit');
QUnit.init();

require('specs/event/level2');
start();


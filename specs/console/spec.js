
/**
 * @todo: document
 */
//console.log('Envjs console specs beginning');

var QUnit 	= require('specs/qunit').QUnit,
	module 	= require('specs/qunit').module,
	expect 	= require('specs/qunit').expect,
	test 	= require('specs/qunit').test,
	ok 		= require('specs/qunit').ok;

QUnit.module('console');

test('Console Interfaces Available', function(){
    
    expect(1);
    ok(console,         'console');
    
});

//console.log('Envjs console specs complete');


/**
 * @author thatcher
 */

var QUnit 	= require('specs/qunit').QUnit,
	start 	= require('specs/qunit').start;

require('specs/env.qunit');
QUnit.init();

require('specs/parser/spec');
start();


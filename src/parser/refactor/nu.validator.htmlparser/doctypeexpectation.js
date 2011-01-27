function equalsWithNullCheck(a, b){
  return (a == null?null:a) === (b == null?null:b) || a != null && equals__devirtual$(a, b);
}

function $clinit_112(){
  $clinit_112 = nullMethod;
  HTML = $DoctypeExpectation(new DoctypeExpectation, 'HTML', 0);
  HTML401_TRANSITIONAL = $DoctypeExpectation(new DoctypeExpectation, 'HTML401_TRANSITIONAL', 1);
  HTML401_STRICT = $DoctypeExpectation(new DoctypeExpectation, 'HTML401_STRICT', 2);
  AUTO = $DoctypeExpectation(new DoctypeExpectation, 'AUTO', 3);
  NO_DOCTYPE_ERRORS = $DoctypeExpectation(new DoctypeExpectation, 'NO_DOCTYPE_ERRORS', 4);
}

function $DoctypeExpectation(this$static, enum$name, enum$ordinal){
  $clinit_112();
  this$static.name_0 = enum$name;
  this$static.ordinal = enum$ordinal;
  return this$static;
}

function getClass_57(){
  return Lnu_validator_htmlparser_common_DoctypeExpectation_2_classLit;
}

function values_0(){
  $clinit_112();
  return initValues(_3Lnu_validator_htmlparser_common_DoctypeExpectation_2_classLit, 57, 10, [HTML, HTML401_TRANSITIONAL, HTML401_STRICT, AUTO, NO_DOCTYPE_ERRORS]);
}

function DoctypeExpectation(){
}

_ = DoctypeExpectation.prototype = new Enum;
_.getClass$ = getClass_57;
_.typeId$ = 34;
var AUTO, HTML, HTML401_STRICT, HTML401_TRANSITIONAL, NO_DOCTYPE_ERRORS;

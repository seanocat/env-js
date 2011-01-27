function $clinit_113(){
  $clinit_113 = nullMethod;
  STANDARDS_MODE = $DocumentMode(new DocumentMode, 'STANDARDS_MODE', 0);
  ALMOST_STANDARDS_MODE = $DocumentMode(new DocumentMode, 'ALMOST_STANDARDS_MODE', 1);
  QUIRKS_MODE = $DocumentMode(new DocumentMode, 'QUIRKS_MODE', 2);
}

function $DocumentMode(this$static, enum$name, enum$ordinal){
  $clinit_113();
  this$static.name_0 = enum$name;
  this$static.ordinal = enum$ordinal;
  return this$static;
}

function getClass_58(){
  return Lnu_validator_htmlparser_common_DocumentMode_2_classLit;
}

function values_1(){
  $clinit_113();
  return initValues(_3Lnu_validator_htmlparser_common_DocumentMode_2_classLit, 58, 11, [STANDARDS_MODE, ALMOST_STANDARDS_MODE, QUIRKS_MODE]);
}

function DocumentMode(){
}

_ = DocumentMode.prototype = new Enum;
_.getClass$ = getClass_58;
_.typeId$ = 35;
var ALMOST_STANDARDS_MODE, QUIRKS_MODE, STANDARDS_MODE;
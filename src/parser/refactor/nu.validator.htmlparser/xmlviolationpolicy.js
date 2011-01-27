function $clinit_115(){
  $clinit_115 = nullMethod;
  ALLOW = $XmlViolationPolicy(new XmlViolationPolicy, 'ALLOW', 0);
  FATAL = $XmlViolationPolicy(new XmlViolationPolicy, 'FATAL', 1);
  ALTER_INFOSET = $XmlViolationPolicy(new XmlViolationPolicy, 'ALTER_INFOSET', 2);
}

function $XmlViolationPolicy(this$static, enum$name, enum$ordinal){
  $clinit_115();
  this$static.name_0 = enum$name;
  this$static.ordinal = enum$ordinal;
  return this$static;
}

function getClass_59(){
  return Lnu_validator_htmlparser_common_XmlViolationPolicy_2_classLit;
}

function values_2(){
  $clinit_115();
  return initValues(_3Lnu_validator_htmlparser_common_XmlViolationPolicy_2_classLit, 59, 12, [ALLOW, FATAL, ALTER_INFOSET]);
}

function XmlViolationPolicy(){
}

_ = XmlViolationPolicy.prototype = new Enum;
_.getClass$ = getClass_59;
_.typeId$ = 36;
 
var ALLOW, ALTER_INFOSET, FATAL;
function $UTF16Buffer(this$static, buffer, start, end){
  this$static.buffer = buffer;
  this$static.start = start;
  this$static.end = end;
  return this$static;
}

function $adjust(this$static, lastWasCR){
  lastWasCR && this$static.buffer[this$static.start] == 10 && ++this$static.start;
}

function getClass_74(){
  return Lnu_validator_htmlparser_impl_UTF16Buffer_2_classLit;
}

function UTF16Buffer(){
}

_ = UTF16Buffer.prototype = new Object_0;
_.getClass$ = getClass_74;
_.typeId$ = 42;
_.buffer = null;
_.end = 0;
_.start = 0;
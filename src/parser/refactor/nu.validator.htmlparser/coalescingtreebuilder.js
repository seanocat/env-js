
 function $clinit_117(){
  $clinit_117 = nullMethod;
  $clinit_116();
}

function $accumulateCharacters(this$static, buf, start, length_0){
  var newBuf, newLen;
  newLen = this$static.charBufferLen + length_0;
  if (newLen > this$static.charBuffer.length) {
    newBuf = initDim(_3C_classLit, 47, -1, newLen, 1);
    arraycopy(this$static.charBuffer, 0, newBuf, 0, this$static.charBufferLen);
    this$static.charBuffer = newBuf;
  }
  arraycopy(buf, start, this$static.charBuffer, this$static.charBufferLen, length_0);
  this$static.charBufferLen = newLen;
}

function $insertFosterParentedCharacters(this$static, buf, start, length_0, table, stackParent){
  var end;
  $insertFosterParentedCharacters_0(this$static, (end = start + length_0 , __checkBounds(buf.length, start, end) , __valueOf(buf, start, end)), table, stackParent);
}

function getClass_61(){
  return Lnu_validator_htmlparser_impl_CoalescingTreeBuilder_2_classLit;
}

function CoalescingTreeBuilder(){
}

_ = CoalescingTreeBuilder.prototype = new TreeBuilder;
_.getClass$ = getClass_61;
_.typeId$ = 0;

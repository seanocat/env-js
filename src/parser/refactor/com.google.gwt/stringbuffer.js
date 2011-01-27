
function getClass_10(){
  return Lcom_google_gwt_core_client_impl_StringBufferImpl_2_classLit;
}

function StringBufferImpl(){
}

_ = StringBufferImpl.prototype = new Object_0;
_.getClass$ = getClass_10;
_.typeId$ = 0;
function $replace(this$static, start, end, toInsert){
  this$static.string = this$static.string.substr(0, start - 0) + toInsert + $substring(this$static.string, end);
}

function getClass_11(){
  return Lcom_google_gwt_core_client_impl_StringBufferImplAppend_2_classLit;
}

function StringBufferImplAppend(){
}

_ = StringBufferImplAppend.prototype = new StringBufferImpl;
_.getClass$ = getClass_11;
_.typeId$ = 0;
_.string = '';

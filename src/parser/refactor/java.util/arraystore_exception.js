
function $ArrayStoreException(this$static){
  $fillInStackTrace();
  return this$static;
}

function $ArrayStoreException_0(this$static, message){
  $fillInStackTrace();
  this$static.detailMessage = message;
  return this$static;
}

function getClass_24(){
  return Ljava_lang_ArrayStoreException_2_classLit;
}

function ArrayStoreException(){
}

_ = ArrayStoreException.prototype = new RuntimeException;
_.getClass$ = getClass_24;
_.typeId$ = 10;

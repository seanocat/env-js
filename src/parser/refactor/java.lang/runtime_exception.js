
function $RuntimeException(this$static, message){
  $fillInStackTrace();
  this$static.detailMessage = message;
  return this$static;
}

 
function getClass_3(){
  return Ljava_lang_RuntimeException_2_classLit;
}

function RuntimeException(){
}

_ = RuntimeException.prototype = new Exception;
_.getClass$ = getClass_3;
_.typeId$ = 5;

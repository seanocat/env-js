function $SAXException(this$static, message){
  $fillInStackTrace();
  this$static.detailMessage = message;
  this$static.exception = null;
  return this$static;
}

function $getMessage_1(this$static){
  var message;
  message = this$static.detailMessage;
  if (message == null && !!this$static.exception) {
    return $getMessage_0(this$static.exception);
  }
   else {
    return message;
  }
}

function getClass_75(){
  return Lorg_xml_sax_SAXException_2_classLit;
}

function getMessage_1(){
  return $getMessage_1(this);
}

function toString_15(){
  if (this.exception) {
    return $toString(this.exception);
  }
   else {
    return $toString(this);
  }
}

function SAXException(){
}

_ = SAXException.prototype = new Exception;
_.getClass$ = getClass_75;
_.getMessage = getMessage_1;
_.toString$ = toString_15;
_.typeId$ = 43;
_.exception = null;
function $SAXParseException(this$static, message, locator){
  $fillInStackTrace();
  this$static.detailMessage = message;
  this$static.exception = null;
  if (locator) {
    $getLineNumber(locator);
    $getColumnNumber(locator);
  }
  return this$static;
}

function $SAXParseException_0(this$static, message, locator, e){
  $fillInStackTrace();
  this$static.detailMessage = message;
  this$static.exception = e;
  if (locator) {
    $getLineNumber(locator);
    $getColumnNumber(locator);
  }
  return this$static;
}

function getClass_76(){
  return Lorg_xml_sax_SAXParseException_2_classLit;
}

function SAXParseException(){
}

_ = SAXParseException.prototype = new SAXException;
_.getClass$ = getClass_76;
_.typeId$ = 44;

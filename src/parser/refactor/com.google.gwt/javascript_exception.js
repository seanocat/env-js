
 function $JavaScriptException(this$static, e){
  $fillInStackTrace();
  this$static.e = e;
  $createStackTrace(this$static);
  return this$static;
}

function $getMessage_0(this$static){
  this$static.message_0 == null && (this$static.name_0 = getName(this$static.e) , this$static.description = getDescription(this$static.e) , this$static.message_0 = '(' + this$static.name_0 + '): ' + this$static.description + getProperties(this$static.e) , undefined);
  return this$static.message_0;
}

function getClass_4(){
  return Lcom_google_gwt_core_client_JavaScriptException_2_classLit;
}

function getDescription(e){
  if (e != null && e.typeMarker$ != nullMethod && e.typeId$ != 2) {
    return getDescription0(dynamicCastJso(e));
  }
   else {
    return e + '';
  }
}

function getDescription0(e){
  return e == null?null:e.message;
}

function getMessage_0(){
  return $getMessage_0(this);
}

function getName(e){
  if (e == null) {
    return 'null';
  }
   else if (e != null && e.typeMarker$ != nullMethod && e.typeId$ != 2) {
    return getName0(dynamicCastJso(e));
  }
   else if (e != null && canCast(e.typeId$, 1)) {
    return 'String';
  }
   else {
    return (e.typeMarker$ == nullMethod || e.typeId$ == 2?e.getClass$():Lcom_google_gwt_core_client_JavaScriptObject_2_classLit).typeName;
  }
}

function getName0(e){
  return e == null?null:e.name;
}

function getProperties(e){
  return e != null && e.typeMarker$ != nullMethod && e.typeId$ != 2?getProperties0(dynamicCastJso(e)):'';
}

function getProperties0(e){
  var result = '';
  try {
    for (prop in e) {
      if (prop != 'name' && prop != 'message' && prop != 'toString') {
        try {
          result += '\n ' + prop + ': ' + e[prop];
        }
         catch (ignored) {
        }
      }
    }
  }
   catch (ignored) {
  }
  return result;
}

function JavaScriptException(){
}

_ = JavaScriptException.prototype = new RuntimeException;
_.getClass$ = getClass_4;
_.getMessage = getMessage_0;
_.typeId$ = 6;
_.description = null;
_.e = null;
_.message_0 = null;
_.name_0 = null;

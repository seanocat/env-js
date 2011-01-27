
 function createForArray(packageName, className, componentType){
  var clazz;
  clazz = new Class;
  clazz.typeName = packageName + className;
  clazz.modifiers = 4;
  clazz.componentType = componentType;
  return clazz;
}

function createForClass(packageName, className){
  var clazz;
  clazz = new Class;
  clazz.typeName = packageName + className;
  return clazz;
}

function createForEnum(packageName, className, enumConstantsFunc){
  var clazz;
  clazz = new Class;
  clazz.typeName = packageName + className;
  clazz.modifiers = enumConstantsFunc?8:0;
  return clazz;
}

function createForPrimitive(packageName, className){
  var clazz;
  clazz = new Class;
  clazz.typeName = packageName + className;
  clazz.modifiers = 1;
  return clazz;
}

function getClass_25(){
  return Ljava_lang_Class_2_classLit;
}

function toString_5(){
  return ((this.modifiers & 2) != 0?'interface ':(this.modifiers & 1) != 0?'':'class ') + this.typeName;
}

function Class(){
}

_ = Class.prototype = new Object_0;
_.getClass$ = getClass_25;
_.toString$ = toString_5;
_.typeId$ = 0;
_.componentType = null;
_.modifiers = 0;
_.typeName = null;


 function $ClassCastException(this$static){
  $fillInStackTrace();
  return this$static;
}

function getClass_26(){
  return Ljava_lang_ClassCastException_2_classLit;
}

function ClassCastException(){
}

_ = ClassCastException.prototype = new RuntimeException;
_.getClass$ = getClass_26;
_.typeId$ = 13;

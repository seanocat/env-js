
function canCast(srcId, dstId){
  return srcId && !!typeIdArray[srcId][dstId];
}

function canCastUnsafe(srcId, dstId){
  return srcId && typeIdArray[srcId][dstId];
}

function dynamicCast(src, dstId){
  if (src != null && !canCastUnsafe(src.typeId$, dstId)) {
    throw $ClassCastException(new ClassCastException);
  }
  return src;
}

function dynamicCastJso(src){
  if (src != null && (src.typeMarker$ == nullMethod || src.typeId$ == 2)) {
    throw $ClassCastException(new ClassCastException);
  }
  return src;
}

function instanceOf(src, dstId){
  return src != null && canCast(src.typeId$, dstId);
}

function instanceOfJso(src){
  return src != null && src.typeMarker$ != nullMethod && src.typeId$ != 2;
}

function throwClassCastExceptionUnlessNull(o){
  if (o != null) {
    throw $ClassCastException(new ClassCastException);
  }
  return o;
}

var typeIdArray = [{}, {}, {1:1, 5:1, 6:1, 7:1}, {5:1, 21:1}, {5:1, 21:1}, {2:1, 5:1, 21:1}, {2:1, 5:1, 21:1, 29:1}, {3:1}, {20:1}, {2:1, 5:1, 21:1}, {2:1, 5:1, 21:1}, {5:1, 21:1}, {5:1, 21:1}, {2:1, 5:1, 21:1}, {5:1, 7:1, 8:1}, {2:1, 5:1, 21:1}, {2:1, 5:1, 21:1}, {2:1, 5:1, 21:1}, {5:1, 9:1}, {6:1}, {6:1}, {2:1, 5:1, 21:1}, {2:1, 5:1, 21:1}, {28:1}, {24:1}, {24:1}, {24:1}, {25:1}, {25:1}, {4:1, 5:1, 25:1}, {5:1, 26:1}, {5:1, 25:1}, {24:1}, {2:1, 5:1, 21:1, 27:1}, {5:1, 7:1, 8:1, 10:1}, {5:1, 7:1, 8:1, 11:1}, {5:1, 7:1, 8:1, 12:1}, {30:1}, {22:1}, {13:1}, {14:1}, {15:1}, {32:1}, {5:1, 21:1, 31:1}, {5:1, 21:1, 31:1}, {5:1}, {5:1, 16:1}, {5:1, 17:1}, {5:1, 18:1}, {5:1, 19:1}, {5:1, 23:1}, {5:1, 23:1}, {5:1, 23:1}, {5:1, 23:1}, {5:1, 23:1}, {5:1, 23:1}, {5:1, 23:1}, {5:1, 23:1}, {5:1, 23:1}, {5:1, 23:1}, {5:1, 23:1}, {5:1, 23:1}, {5:1, 23:1}, {5:1, 23:1}, {5:1, 23:1}, {5:1, 23:1}, {5:1, 23:1}];
function init(){
  !!$stats && $stats({moduleName:$moduleName, sessionId:$sessionId, subSystem:'startup', evtGroup:'moduleStartup', millis:(new Date).getTime(), type:'onModuleLoadStart', className:'nu.validator.htmlparser.gwt.HtmlParserModule'});
  Envjs.parseHtmlDocument = parseHtmlDocument;
}

function caught(e){
  if (e != null && canCast(e.typeId$, 21)) {
    return e;
  }
  return $JavaScriptException(new JavaScriptException, e);
}

function create(valueLow, valueHigh){
  var diffHigh, diffLow;
  valueHigh %= 1.8446744073709552E19;
  valueLow %= 1.8446744073709552E19;
  diffHigh = valueHigh % 4294967296;
  diffLow = Math.floor(valueLow / 4294967296) * 4294967296;
  valueHigh = valueHigh - diffHigh + diffLow;
  valueLow = valueLow - diffLow + diffHigh;
  while (valueLow < 0) {
    valueLow += 4294967296;
    valueHigh -= 4294967296;
  }
  while (valueLow > 4294967295) {
    valueLow -= 4294967296;
    valueHigh += 4294967296;
  }
  valueHigh = valueHigh % 1.8446744073709552E19;
  while (valueHigh > 9223372032559808512) {
    valueHigh -= 1.8446744073709552E19;
  }
  while (valueHigh < -9223372036854775808) {
    valueHigh += 1.8446744073709552E19;
  }
  return [valueLow, valueHigh];
}

function fromDouble(value){
  if (isNaN(value)) {
    return $clinit_44() , ZERO;
  }
  if (value < -9223372036854775808) {
    return $clinit_44() , MIN_VALUE;
  }
  if (value >= 9223372036854775807) {
    return $clinit_44() , MAX_VALUE;
  }
  if (value > 0) {
    return create(Math.floor(value), 0);
  }
   else {
    return create(Math.ceil(value), 0);
  }
}

function fromInt(value){
  var rebase, result;
  if (value > -129 && value < 128) {
    rebase = value + 128;
    result = ($clinit_43() , boxedValues)[rebase];
    result == null && (result = boxedValues[rebase] = internalFromInt(value));
    return result;
  }
  return internalFromInt(value);
}

function internalFromInt(value){
  if (value >= 0) {
    return [value, 0];
  }
   else {
    return [value + 4294967296, -4294967296];
  }
}

function $clinit_43(){
  $clinit_43 = nullMethod;
  boxedValues = initDim(_3_3D_classLit, 65, 18, 256, 0);
}

var boxedValues;
function $clinit_44(){
  $clinit_44 = nullMethod;
  Math.log(2);
  MAX_VALUE = P7fffffffffffffff_longLit;
  MIN_VALUE = N8000000000000000_longLit;
  fromInt(-1);
  fromInt(1);
  fromInt(2);
  ZERO = fromInt(0);
}

var MAX_VALUE, MIN_VALUE, ZERO;

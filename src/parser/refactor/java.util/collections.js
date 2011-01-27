 
 function equals_1(other){
  return this === (other == null?null:other);
}

function getClass_27(){
  return Ljava_lang_Enum_2_classLit;
}

function hashCode_3(){
  return this.$H || (this.$H = ++sNextHashId);
}

function toString_6(){
  return this.name_0;
}

function Enum(){
}

_ = Enum.prototype = new Object_0;
_.equals$ = equals_1;
_.getClass$ = getClass_27;
_.hashCode$ = hashCode_3;
_.toString$ = toString_6;
_.typeId$ = 14;
_.name_0 = null;
_.ordinal = 0;
function $IllegalArgumentException(this$static, message){
  $fillInStackTrace();
  this$static.detailMessage = message;
  return this$static;
}

function getClass_28(){
  return Ljava_lang_IllegalArgumentException_2_classLit;
}

function IllegalArgumentException(){
}

_ = IllegalArgumentException.prototype = new RuntimeException;
_.getClass$ = getClass_28;
_.typeId$ = 15;
function $IndexOutOfBoundsException(this$static){
  $fillInStackTrace();
  return this$static;
}

function $IndexOutOfBoundsException_0(this$static, message){
  $fillInStackTrace();
  this$static.detailMessage = message;
  return this$static;
}

function getClass_29(){
  return Ljava_lang_IndexOutOfBoundsException_2_classLit;
}

function IndexOutOfBoundsException(){
}

_ = IndexOutOfBoundsException.prototype = new RuntimeException;
_.getClass$ = getClass_29;
_.typeId$ = 16;
function toPowerOfTwoString(value, shift){
  var bitMask, buf, bufSize, digits, pos;
  bufSize = ~~(32 / shift);
  bitMask = (1 << shift) - 1;
  buf = initDim(_3C_classLit, 47, -1, bufSize, 1);
  digits = ($clinit_70() , digits_0);
  pos = bufSize - 1;
  if (value >= 0) {
    while (value > bitMask) {
      buf[pos--] = digits[value & bitMask];
      value >>= shift;
    }
  }
   else {
    while (pos > 0) {
      buf[pos--] = digits[value & bitMask];
      value >>= shift;
    }
  }
  buf[pos] = digits[value & bitMask];
  return __valueOf(buf, pos, bufSize);
}

function $NullPointerException(this$static){
  $fillInStackTrace();
  return this$static;
}

function getClass_30(){
  return Ljava_lang_NullPointerException_2_classLit;
}

function NullPointerException(){
}

_ = NullPointerException.prototype = new RuntimeException;
_.getClass$ = getClass_30;
_.typeId$ = 17;
function $clinit_70(){
  $clinit_70 = nullMethod;
  digits_0 = initValues(_3C_classLit, 47, -1, [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122]);
}

var digits_0;
function $StackTraceElement(this$static, className, methodName, fileName, lineNumber){
  this$static.className = className;
  this$static.methodName = methodName;
  this$static.fileName = fileName;
  this$static.lineNumber = lineNumber;
  return this$static;
}

function getClass_31(){
  return Ljava_lang_StackTraceElement_2_classLit;
}

function toString_7(){
  return this.className + '.' + this.methodName + '(' + this.fileName + ':' + this.lineNumber + ')';
}

function StackTraceElement(){
}

_ = StackTraceElement.prototype = new Object_0;
_.getClass$ = getClass_31;
_.toString$ = toString_7;
_.typeId$ = 18;
_.className = null;
_.fileName = null;
_.lineNumber = 0;
_.methodName = null;
function $equals_1(this$static, other){
  if (!(other != null && canCast(other.typeId$, 1))) {
    return false;
  }
  return String(this$static) == other;
}

function $getChars(this$static, srcBegin, srcEnd, dst, dstBegin){
  var srcIdx;
  for (srcIdx = srcBegin; srcIdx < srcEnd; ++srcIdx) {
    dst[dstBegin++] = this$static.charCodeAt(srcIdx);
  }
}

function $substring(this$static, beginIndex){
  return this$static.substr(beginIndex, this$static.length - beginIndex);
}

function $toCharArray(this$static){
  var charArr, n;
  n = this$static.length;
  charArr = initDim(_3C_classLit, 47, -1, n, 1);
  $getChars(this$static, 0, n, charArr, 0);
  return charArr;
}

function $trim(this$static){
  if (this$static.length == 0 || this$static[0] > ' ' && this$static[this$static.length - 1] > ' ') {
    return this$static;
  }
  var r1 = this$static.replace(/^(\s*)/, '');
  var r2 = r1.replace(/\s*$/, '');
  return r2;
}

function __checkBounds(legalCount, start, end){
  if (start < 0) {
    throw $StringIndexOutOfBoundsException(new StringIndexOutOfBoundsException, start);
  }
  if (end < start) {
    throw $StringIndexOutOfBoundsException(new StringIndexOutOfBoundsException, end - start);
  }
  if (end > legalCount) {
    throw $StringIndexOutOfBoundsException(new StringIndexOutOfBoundsException, end);
  }
}

function __valueOf(x, start, end){
  x = x.slice(start, end);
  return String.fromCharCode.apply(null, x);
}

function compareTo(thisStr, otherStr){
  thisStr = String(thisStr);
  if (thisStr == otherStr) {
    return 0;
  }
  return thisStr < otherStr?-1:1;
}

function equals_2(other){
  return $equals_1(this, other);
}

function getClass_32(){
  return Ljava_lang_String_2_classLit;
}

function hashCode_4(){
  return getHashCode_0(this);
}

function toString_8(){
  return this;
}

function valueOf_0(x, offset, count){
  var end;
  end = offset + count;
  __checkBounds(x.length, offset, end);
  return __valueOf(x, offset, end);
}

_ = String.prototype;
_.equals$ = equals_2;
_.getClass$ = getClass_32;
_.hashCode$ = hashCode_4;
_.toString$ = toString_8;
_.typeId$ = 2;
function $clinit_73(){
  $clinit_73 = nullMethod;
  back = {};
  front = {};
}

function compute(str){
  var hashCode, i, n, nBatch;
  hashCode = 0;
  n = str.length;
  nBatch = n - 4;
  i = 0;
  while (i < nBatch) {
    hashCode = str.charCodeAt(i + 3) + 31 * (str.charCodeAt(i + 2) + 31 * (str.charCodeAt(i + 1) + 31 * (str.charCodeAt(i) + 31 * hashCode))) | 0;
    i += 4;
  }
  while (i < n) {
    hashCode = hashCode * 31 + str.charCodeAt(i++);
  }
  return hashCode | 0;
}

function getHashCode_0(str){
  $clinit_73();
  var key = ':' + str;
  var result = front[key];
  if (result != null) {
    return result;
  }
  result = back[key];
  result == null && (result = compute(str));
  increment();
  return front[key] = result;
}

function increment(){
  if (count_0 == 256) {
    back = front;
    front = {};
    count_0 = 0;
  }
  ++count_0;
}

var back, count_0 = 0, front;
function $StringBuffer(this$static){
  this$static.impl = new StringBufferImplAppend;
  return this$static;
}

function $append_0(this$static, x){
  this$static.impl.string += x;
  return this$static;
}

function getClass_33(){
  return Ljava_lang_StringBuffer_2_classLit;
}

function toString_9(){
  return this.impl.string;
}

function StringBuffer(){
}

_ = StringBuffer.prototype = new Object_0;
_.getClass$ = getClass_33;
_.toString$ = toString_9;
_.typeId$ = 19;
function $StringBuilder(this$static){
  this$static.impl = new StringBufferImplAppend;
  return this$static;
}

function $append_1(this$static, x){
  this$static.impl.string += String.fromCharCode(x);
  return this$static;
}

function $append_2(this$static, x){
  this$static.impl.string += String.fromCharCode.apply(null, x);
  return this$static;
}

function $getChars_0(this$static, srcStart, srcEnd, dst, dstStart){
  var s;
  __checkBounds(this$static.impl.string.length, srcStart, srcEnd);
  __checkBounds(dst.length, dstStart, dstStart + (srcEnd - srcStart));
  s = this$static.impl.string;
  while (srcStart < srcEnd) {
    dst[dstStart++] = s.charCodeAt(srcStart++);
  }
}

function $setLength(this$static, newLength){
  var oldLength;
  oldLength = this$static.impl.string.length;
  newLength < oldLength?$replace(this$static.impl, newLength, oldLength, ''):newLength > oldLength && $append_2(this$static, initDim(_3C_classLit, 47, -1, newLength - oldLength, 1));
}

function getClass_34(){
  return Ljava_lang_StringBuilder_2_classLit;
}

function toString_10(){
  return this.impl.string;
}

function StringBuilder(){
}

_ = StringBuilder.prototype = new Object_0;
_.getClass$ = getClass_34;
_.toString$ = toString_10;
_.typeId$ = 20;
function $StringIndexOutOfBoundsException(this$static, index){
  $fillInStackTrace();
  this$static.detailMessage = 'String index out of range: ' + index;
  return this$static;
}

function getClass_35(){
  return Ljava_lang_StringIndexOutOfBoundsException_2_classLit;
}

function StringIndexOutOfBoundsException(){
}

_ = StringIndexOutOfBoundsException.prototype = new IndexOutOfBoundsException;
_.getClass$ = getClass_35;
_.typeId$ = 21;
function arrayTypeMatch(srcComp, destComp){
  if ((srcComp.modifiers & 1) != 0) {
    return srcComp == destComp;
  }
   else {
    return (destComp.modifiers & 1) == 0;
  }
}

function arraycopy(src, srcOfs, dest, destOfs, len){
  var destArray, destComp, destEnd, destType, destlen, srcArray, srcComp, srcType, srclen;
  if (src == null || dest == null) {
    throw $NullPointerException(new NullPointerException);
  }
  srcType = src.typeMarker$ == nullMethod || src.typeId$ == 2?src.getClass$():Lcom_google_gwt_core_client_JavaScriptObject_2_classLit;
  destType = dest.typeMarker$ == nullMethod || dest.typeId$ == 2?dest.getClass$():Lcom_google_gwt_core_client_JavaScriptObject_2_classLit;
  if ((srcType.modifiers & 4) == 0 || (destType.modifiers & 4) == 0) {
    throw $ArrayStoreException_0(new ArrayStoreException, 'Must be array types');
  }
  srcComp = srcType.componentType;
  destComp = destType.componentType;
  if (!arrayTypeMatch(srcComp, destComp)) {
    throw $ArrayStoreException_0(new ArrayStoreException, 'Array types must match');
  }
  srclen = src.length;
  destlen = dest.length;
  if (srcOfs < 0 || destOfs < 0 || len < 0 || srcOfs + len > srclen || destOfs + len > destlen) {
    throw $IndexOutOfBoundsException(new IndexOutOfBoundsException);
  }
  if (((srcComp.modifiers & 1) == 0 || (srcComp.modifiers & 4) != 0) && srcType != destType) {
    srcArray = dynamicCast(src, 23);
    destArray = dynamicCast(dest, 23);
    if ((src == null?null:src) === (dest == null?null:dest) && srcOfs < destOfs) {
      srcOfs += len;
      for (destEnd = destOfs + len; destEnd-- > destOfs;) {
        setCheck(destArray, destEnd, srcArray[--srcOfs]);
      }
    }
     else {
      for (destEnd = destOfs + len; destOfs < destEnd;) {
        setCheck(destArray, destOfs++, srcArray[srcOfs++]);
      }
    }
  }
   else {
    Array.prototype.splice.apply(dest, [destOfs, len].concat(src.slice(srcOfs, srcOfs + len)));
  }
}

function $UnsupportedOperationException(this$static, message){
  $fillInStackTrace();
  this$static.detailMessage = message;
  return this$static;
}

function getClass_36(){
  return Ljava_lang_UnsupportedOperationException_2_classLit;
}

function UnsupportedOperationException(){
}

_ = UnsupportedOperationException.prototype = new RuntimeException;
_.getClass$ = getClass_36;
_.typeId$ = 22;
function $advanceToFind(iter, o){
  var t;
  while (iter.hasNext()) {
    t = iter.next_0();
    if (o == null?t == null:equals__devirtual$(o, t)) {
      return iter;
    }
  }
  return null;
}

function add(o){
  throw $UnsupportedOperationException(new UnsupportedOperationException, 'Add not supported on this collection');
}

function contains(o){
  var iter;
  iter = $advanceToFind(this.iterator(), o);
  return !!iter;
}

function getClass_37(){
  return Ljava_util_AbstractCollection_2_classLit;
}

function toString_11(){
  var comma, iter, sb;
  sb = $StringBuffer(new StringBuffer);
  comma = null;
  sb.impl.string += '[';
  iter = this.iterator();
  while (iter.hasNext()) {
    comma != null?(sb.impl.string += comma , undefined):(comma = ', ');
    $append_0(sb, '' + iter.next_0());
  }
  sb.impl.string += ']';
  return sb.impl.string;
}

function AbstractCollection(){
}

_ = AbstractCollection.prototype = new Object_0;
_.add_0 = add;
_.contains = contains;
_.getClass$ = getClass_37;
_.toString$ = toString_11;
_.typeId$ = 0;
function equals_3(obj){
  var entry, entry$iterator, otherKey, otherMap, otherValue;
  if ((obj == null?null:obj) === this) {
    return true;
  }
  if (!(obj != null && canCast(obj.typeId$, 26))) {
    return false;
  }
  otherMap = dynamicCast(obj, 26);
  if (dynamicCast(this, 26).size != otherMap.size) {
    return false;
  }
  for (entry$iterator = $AbstractHashMap$EntrySetIterator(new AbstractHashMap$EntrySetIterator, $AbstractHashMap$EntrySet(new AbstractHashMap$EntrySet, otherMap).this$0); $hasNext_0(entry$iterator.iter);) {
    entry = dynamicCast($next_0(entry$iterator.iter), 24);
    otherKey = entry.getKey();
    otherValue = entry.getValue();
    if (!(otherKey == null?dynamicCast(this, 26).nullSlotLive:otherKey != null && canCast(otherKey.typeId$, 1)?$hasStringValue(dynamicCast(this, 26), dynamicCast(otherKey, 1)):$hasHashValue(dynamicCast(this, 26), otherKey, ~~hashCode__devirtual$(otherKey)))) {
      return false;
    }
    if (!equalsWithNullCheck(otherValue, otherKey == null?dynamicCast(this, 26).nullSlot:otherKey != null && canCast(otherKey.typeId$, 1)?dynamicCast(this, 26).stringMap[':' + dynamicCast(otherKey, 1)]:$getHashValue(dynamicCast(this, 26), otherKey, ~~hashCode__devirtual$(otherKey)))) {
      return false;
    }
  }
  return true;
}

function getClass_38(){
  return Ljava_util_AbstractMap_2_classLit;
}

function hashCode_5(){
  var entry, entry$iterator, hashCode;
  hashCode = 0;
  for (entry$iterator = $AbstractHashMap$EntrySetIterator(new AbstractHashMap$EntrySetIterator, $AbstractHashMap$EntrySet(new AbstractHashMap$EntrySet, dynamicCast(this, 26)).this$0); $hasNext_0(entry$iterator.iter);) {
    entry = dynamicCast($next_0(entry$iterator.iter), 24);
    hashCode += entry.hashCode$();
    hashCode = ~~hashCode;
  }
  return hashCode;
}

function toString_12(){
  var comma, entry, iter, s;
  s = '{';
  comma = false;
  for (iter = $AbstractHashMap$EntrySetIterator(new AbstractHashMap$EntrySetIterator, $AbstractHashMap$EntrySet(new AbstractHashMap$EntrySet, dynamicCast(this, 26)).this$0); $hasNext_0(iter.iter);) {
    entry = dynamicCast($next_0(iter.iter), 24);
    comma?(s += ', '):(comma = true);
    s += '' + entry.getKey();
    s += '=';
    s += '' + entry.getValue();
  }
  return s + '}';
}

function AbstractMap(){
}

_ = AbstractMap.prototype = new Object_0;
_.equals$ = equals_3;
_.getClass$ = getClass_38;
_.hashCode$ = hashCode_5;
_.toString$ = toString_12;
_.typeId$ = 0;
function $addAllHashEntries(this$static, dest){
  var hashCodeMap = this$static.hashCodeMap;
  for (var hashCode in hashCodeMap) {
    if (hashCode == parseInt(hashCode)) {
      var array = hashCodeMap[hashCode];
      for (var i = 0, c = array.length; i < c; ++i) {
        dest.add_0(array[i]);
      }
    }
  }
}

function $addAllStringEntries(this$static, dest){
  var stringMap = this$static.stringMap;
  for (var key in stringMap) {
    if (key.charCodeAt(0) == 58) {
      var entry = new_$(this$static, key.substring(1));
      dest.add_0(entry);
    }
  }
}

function $clearImpl(this$static){
  this$static.hashCodeMap = [];
  this$static.stringMap = {};
  this$static.nullSlotLive = false;
  this$static.nullSlot = null;
  this$static.size = 0;
}

function $containsKey(this$static, key){
  return key == null?this$static.nullSlotLive:key != null && canCast(key.typeId$, 1)?$hasStringValue(this$static, dynamicCast(key, 1)):$hasHashValue(this$static, key, ~~hashCode__devirtual$(key));
}

function $get_1(this$static, key){
  return key == null?this$static.nullSlot:key != null && canCast(key.typeId$, 1)?this$static.stringMap[':' + dynamicCast(key, 1)]:$getHashValue(this$static, key, ~~hashCode__devirtual$(key));
}

function $getHashValue(this$static, key, hashCode){
  var array = this$static.hashCodeMap[hashCode];
  if (array) {
    for (var i = 0, c = array.length; i < c; ++i) {
      var entry = array[i];
      var entryKey = entry.getKey();
      if (this$static.equalsBridge(key, entryKey)) {
        return entry.getValue();
      }
    }
  }
  return null;
}

function $hasHashValue(this$static, key, hashCode){
  var array = this$static.hashCodeMap[hashCode];
  if (array) {
    for (var i = 0, c = array.length; i < c; ++i) {
      var entry = array[i];
      var entryKey = entry.getKey();
      if (this$static.equalsBridge(key, entryKey)) {
        return true;
      }
    }
  }
  return false;
}

function $hasStringValue(this$static, key){
  return ':' + key in this$static.stringMap;
}

function $put(this$static, key, value){
  return !key?$putNullSlot(this$static, value):$putHashValue(this$static, key, value, ~~key.index);
}

function $putHashValue(this$static, key, value, hashCode){
  var array = this$static.hashCodeMap[hashCode];
  if (array) {
    for (var i = 0, c = array.length; i < c; ++i) {
      var entry = array[i];
      var entryKey = entry.getKey();
      if (this$static.equalsBridge(key, entryKey)) {
        var previous = entry.getValue();
        entry.setValue(value);
        return previous;
      }
    }
  }
   else {
    array = this$static.hashCodeMap[hashCode] = [];
  }
  var entry = $MapEntryImpl(new MapEntryImpl, key, value);
  array.push(entry);
  ++this$static.size;
  return null;
}

function $putNullSlot(this$static, value){
  var result;
  result = this$static.nullSlot;
  this$static.nullSlot = value;
  if (!this$static.nullSlotLive) {
    this$static.nullSlotLive = true;
    ++this$static.size;
  }
  return result;
}

function $putStringValue(this$static, key, value){
  var result, stringMap = this$static.stringMap;
  key = ':' + key;
  key in stringMap?(result = stringMap[key]):++this$static.size;
  stringMap[key] = value;
  return result;
}

function equalsBridge(value1, value2){
  return (value1 == null?null:value1) === (value2 == null?null:value2) || value1 != null && equals__devirtual$(value1, value2);
}

function getClass_39(){
  return Ljava_util_AbstractHashMap_2_classLit;
}

function AbstractHashMap(){
}

_ = AbstractHashMap.prototype = new AbstractMap;
_.equalsBridge = equalsBridge;
_.getClass$ = getClass_39;
_.typeId$ = 0;
_.hashCodeMap = null;
_.nullSlot = null;
_.nullSlotLive = false;
_.size = 0;
_.stringMap = null;
function equals_4(o){
  var iter, other, otherItem;
  if ((o == null?null:o) === this) {
    return true;
  }
  if (!(o != null && canCast(o.typeId$, 28))) {
    return false;
  }
  other = dynamicCast(o, 28);
  if (other.this$0.size != this.size_0()) {
    return false;
  }
  for (iter = $AbstractHashMap$EntrySetIterator(new AbstractHashMap$EntrySetIterator, other.this$0); $hasNext_0(iter.iter);) {
    otherItem = dynamicCast($next_0(iter.iter), 24);
    if (!this.contains(otherItem)) {
      return false;
    }
  }
  return true;
}

function getClass_40(){
  return Ljava_util_AbstractSet_2_classLit;
}

function hashCode_6(){
  var hashCode, iter, next;
  hashCode = 0;
  for (iter = this.iterator(); iter.hasNext();) {
    next = iter.next_0();
    if (next != null) {
      hashCode += hashCode__devirtual$(next);
      hashCode = ~~hashCode;
    }
  }
  return hashCode;
}

function AbstractSet(){
}

_ = AbstractSet.prototype = new AbstractCollection;
_.equals$ = equals_4;
_.getClass$ = getClass_40;
_.hashCode$ = hashCode_6;
_.typeId$ = 0;
function $AbstractHashMap$EntrySet(this$static, this$0){
  this$static.this$0 = this$0;
  return this$static;
}

function contains_0(o){
  var entry, key, value;
  if (o != null && canCast(o.typeId$, 24)) {
    entry = dynamicCast(o, 24);
    key = entry.getKey();
    if ($containsKey(this.this$0, key)) {
      value = $get_1(this.this$0, key);
      return $equals_2(entry.getValue(), value);
    }
  }
  return false;
}

function getClass_41(){
  return Ljava_util_AbstractHashMap$EntrySet_2_classLit;
}

function iterator(){
  return $AbstractHashMap$EntrySetIterator(new AbstractHashMap$EntrySetIterator, this.this$0);
}

function size_0(){
  return this.this$0.size;
}

function AbstractHashMap$EntrySet(){
}

_ = AbstractHashMap$EntrySet.prototype = new AbstractSet;
_.contains = contains_0;
_.getClass$ = getClass_41;
_.iterator = iterator;
_.size_0 = size_0;
_.typeId$ = 23;
_.this$0 = null;
function $AbstractHashMap$EntrySetIterator(this$static, this$0){
  var list;
  this$static.this$0 = this$0;
  list = $ArrayList(new ArrayList);
  this$static.this$0.nullSlotLive && $add(list, $AbstractHashMap$MapEntryNull(new AbstractHashMap$MapEntryNull, this$static.this$0));
  $addAllStringEntries(this$static.this$0, list);
  $addAllHashEntries(this$static.this$0, list);
  this$static.iter = $AbstractList$IteratorImpl(new AbstractList$IteratorImpl, list);
  return this$static;
}

function getClass_42(){
  return Ljava_util_AbstractHashMap$EntrySetIterator_2_classLit;
}

function hasNext(){
  return $hasNext_0(this.iter);
}

function next_0(){
  return dynamicCast($next_0(this.iter), 24);
}

function AbstractHashMap$EntrySetIterator(){
}

_ = AbstractHashMap$EntrySetIterator.prototype = new Object_0;
_.getClass$ = getClass_42;
_.hasNext = hasNext;
_.next_0 = next_0;
_.typeId$ = 0;
_.iter = null;
_.this$0 = null;
function equals_5(other){
  var entry;
  if (other != null && canCast(other.typeId$, 24)) {
    entry = dynamicCast(other, 24);
    if (equalsWithNullCheck(this.getKey(), entry.getKey()) && equalsWithNullCheck(this.getValue(), entry.getValue())) {
      return true;
    }
  }
  return false;
}

function getClass_43(){
  return Ljava_util_AbstractMapEntry_2_classLit;
}

function hashCode_7(){
  var keyHash, valueHash;
  keyHash = 0;
  valueHash = 0;
  this.getKey() != null && (keyHash = hashCode__devirtual$(this.getKey()));
  this.getValue() != null && (valueHash = hashCode__devirtual$(this.getValue()));
  return keyHash ^ valueHash;
}

function toString_13(){
  return this.getKey() + '=' + this.getValue();
}

function AbstractMapEntry(){
}

_ = AbstractMapEntry.prototype = new Object_0;
_.equals$ = equals_5;
_.getClass$ = getClass_43;
_.hashCode$ = hashCode_7;
_.toString$ = toString_13;
_.typeId$ = 24;
function $AbstractHashMap$MapEntryNull(this$static, this$0){
  this$static.this$0 = this$0;
  return this$static;
}

function getClass_44(){
  return Ljava_util_AbstractHashMap$MapEntryNull_2_classLit;
}

function getKey(){
  return null;
}

function getValue(){
  return this.this$0.nullSlot;
}

function setValue(object){
  return $putNullSlot(this.this$0, object);
}

function AbstractHashMap$MapEntryNull(){
}

_ = AbstractHashMap$MapEntryNull.prototype = new AbstractMapEntry;
_.getClass$ = getClass_44;
_.getKey = getKey;
_.getValue = getValue;
_.setValue = setValue;
_.typeId$ = 25;
_.this$0 = null;
function $AbstractHashMap$MapEntryString(this$static, key, this$0){
  this$static.this$0 = this$0;
  this$static.key = key;
  return this$static;
}

function getClass_45(){
  return Ljava_util_AbstractHashMap$MapEntryString_2_classLit;
}

function getKey_0(){
  return this.key;
}

function getValue_0(){
  return this.this$0.stringMap[':' + this.key];
}

function new_$(this$outer, key){
  return $AbstractHashMap$MapEntryString(new AbstractHashMap$MapEntryString, key, this$outer);
}

function setValue_0(object){
  return $putStringValue(this.this$0, this.key, object);
}

function AbstractHashMap$MapEntryString(){
}

_ = AbstractHashMap$MapEntryString.prototype = new AbstractMapEntry;
_.getClass$ = getClass_45;
_.getKey = getKey_0;
_.getValue = getValue_0;
_.setValue = setValue_0;
_.typeId$ = 26;
_.key = null;
_.this$0 = null;
function add_0(obj){
  this.add_1(this.size_0(), obj);
  return true;
}

function add_1(index, element){
  throw $UnsupportedOperationException(new UnsupportedOperationException, 'Add not supported on this list');
}

function checkIndex(index, size){
  (index < 0 || index >= size) && indexOutOfBounds(index, size);
}

function equals_6(o){
  var elem, elemOther, iter, iterOther, other;
  if ((o == null?null:o) === this) {
    return true;
  }
  if (!(o != null && canCast(o.typeId$, 25))) {
    return false;
  }
  other = dynamicCast(o, 25);
  if (this.size_0() != other.size_0()) {
    return false;
  }
  iter = this.iterator();
  iterOther = other.iterator();
  while (iter.hasNext()) {
    elem = iter.next_0();
    elemOther = iterOther.next_0();
    if (!(elem == null?elemOther == null:equals__devirtual$(elem, elemOther))) {
      return false;
    }
  }
  return true;
}

function getClass_46(){
  return Ljava_util_AbstractList_2_classLit;
}

function hashCode_8(){
  var iter, k, obj;
  k = 1;
  iter = this.iterator();
  while (iter.hasNext()) {
    obj = iter.next_0();
    k = 31 * k + (obj == null?0:hashCode__devirtual$(obj));
    k = ~~k;
  }
  return k;
}

function indexOutOfBounds(index, size){
  throw $IndexOutOfBoundsException_0(new IndexOutOfBoundsException, 'Index: ' + index + ', Size: ' + size);
}

function iterator_0(){
  return $AbstractList$IteratorImpl(new AbstractList$IteratorImpl, this);
}

function AbstractList(){
}

_ = AbstractList.prototype = new AbstractCollection;
_.add_0 = add_0;
_.add_1 = add_1;
_.equals$ = equals_6;
_.getClass$ = getClass_46;
_.hashCode$ = hashCode_8;
_.iterator = iterator_0;
_.typeId$ = 27;
function $AbstractList$IteratorImpl(this$static, this$0){
  this$static.this$0 = this$0;
  return this$static;
}

function $hasNext_0(this$static){
  return this$static.i < this$static.this$0.size_0();
}

function $next_0(this$static){
  if (this$static.i >= this$static.this$0.size_0()) {
    throw $NoSuchElementException(new NoSuchElementException);
  }
  return this$static.this$0.get(this$static.i++);
}

function getClass_47(){
  return Ljava_util_AbstractList$IteratorImpl_2_classLit;
}

function hasNext_0(){
  return this.i < this.this$0.size_0();
}

function next_1(){
  return $next_0(this);
}

function AbstractList$IteratorImpl(){
}

_ = AbstractList$IteratorImpl.prototype = new Object_0;
_.getClass$ = getClass_47;
_.hasNext = hasNext_0;
_.next_0 = next_1;
_.typeId$ = 0;
_.i = 0;
_.this$0 = null;
function add_2(index, element){
  var iter;
  iter = $listIterator(this, index);
  $addBefore(iter.this$0, element, iter.currentNode);
  ++iter.currentIndex;
  iter.lastNode = null;
}

function get(index){
  var $e0, iter;
  iter = $listIterator(this, index);
  try {
    return $next_1(iter);
  }
   catch ($e0) {
    $e0 = caught($e0);
    if (instanceOf($e0, 27)) {
      throw $IndexOutOfBoundsException_0(new IndexOutOfBoundsException, "Can't get element " + index);
    }
     else 
      throw $e0;
  }
}

function getClass_48(){
  return Ljava_util_AbstractSequentialList_2_classLit;
}

function iterator_1(){
  return $listIterator(this, 0);
}

function AbstractSequentialList(){
}

_ = AbstractSequentialList.prototype = new AbstractList;
_.add_1 = add_2;
_.get = get;
_.getClass$ = getClass_48;
_.iterator = iterator_1;
_.typeId$ = 28;
function $ArrayList(this$static){
  this$static.array = initDim(_3Ljava_lang_Object_2_classLit, 54, 0, 0, 0);
  return this$static;
}

function $add(this$static, o){
  setCheck(this$static.array, this$static.size++, o);
  return true;
}

function $get_2(this$static, index){
  checkIndex(index, this$static.size);
  return this$static.array[index];
}

function $indexOf_0(this$static, o, index){
  for (; index < this$static.size; ++index) {
    if (equalsWithNullCheck(o, this$static.array[index])) {
      return index;
    }
  }
  return -1;
}

function $remove_0(this$static, o){
  var i, previous;
  i = $indexOf_0(this$static, o, 0);
  if (i == -1) {
    return false;
  }
  previous = (checkIndex(i, this$static.size) , this$static.array[i]);
  this$static.array.splice(i, 1);
  --this$static.size;
  return true;
}

function add_3(o){
  return setCheck(this.array, this.size++, o) , true;
}

function add_4(index, o){
  (index < 0 || index > this.size) && indexOutOfBounds(index, this.size);
  this.array.splice(index, 0, o);
  ++this.size;
}

function contains_1(o){
  return $indexOf_0(this, o, 0) != -1;
}

function get_0(index){
  return checkIndex(index, this.size) , this.array[index];
}

function getClass_49(){
  return Ljava_util_ArrayList_2_classLit;
}

function size_1(){
  return this.size;
}

function ArrayList(){
}

_ = ArrayList.prototype = new AbstractList;
_.add_0 = add_3;
_.add_1 = add_4;
_.contains = contains_1;
_.get = get_0;
_.getClass$ = getClass_49;
_.size_0 = size_1;
_.typeId$ = 29;
_.size = 0;
function binarySearch(sortedArray, key){
  var high, low, mid, midVal;
  low = 0;
  high = sortedArray.length - 1;
  while (low <= high) {
    mid = low + (high - low >> 1);
    midVal = sortedArray[mid];
    if (midVal < key) {
      low = mid + 1;
    }
     else if (midVal > key) {
      high = mid - 1;
    }
     else {
      return mid;
    }
  }
  return -low - 1;
}

function binarySearch_0(sortedArray, key, comparator){
  var compareResult, high, low, mid, midVal;
  !comparator && (comparator = ($clinit_95() , $clinit_95() , NATURAL));
  low = 0;
  high = sortedArray.length - 1;
  while (low <= high) {
    mid = low + (high - low >> 1);
    midVal = sortedArray[mid];
    compareResult = compareTo(midVal, key);
    if (compareResult < 0) {
      low = mid + 1;
    }
     else if (compareResult > 0) {
      high = mid - 1;
    }
     else {
      return mid;
    }
  }
  return -low - 1;
}

function $clinit_95(){
  $clinit_95 = nullMethod;
  NATURAL = new Comparators$1;
}

var NATURAL;
function getClass_50(){
  return Ljava_util_Comparators$1_2_classLit;
}

function Comparators$1(){
}

_ = Comparators$1.prototype = new Object_0;
_.getClass$ = getClass_50;
_.typeId$ = 0;
function $HashMap(this$static){
  $clearImpl(this$static);
  return this$static;
}

function $equals_2(value1, value2){
  return (value1 == null?null:value1) === (value2 == null?null:value2) || value1 != null && equals__devirtual$(value1, value2);
}

function getClass_51(){
  return Ljava_util_HashMap_2_classLit;
}

function HashMap(){
}

_ = HashMap.prototype = new AbstractHashMap;
_.getClass$ = getClass_51;
_.typeId$ = 30;
function $LinkedList(this$static){
  this$static.header = $LinkedList$Node(new LinkedList$Node);
  this$static.size = 0;
  return this$static;
}

function $addBefore(this$static, o, target){
  $LinkedList$Node_0(new LinkedList$Node, o, target);
  ++this$static.size;
}

function $addLast(this$static, o){
  $LinkedList$Node_0(new LinkedList$Node, o, this$static.header);
  ++this$static.size;
}

function $clear(this$static){
  this$static.header = $LinkedList$Node(new LinkedList$Node);
  this$static.size = 0;
}

function $getLast(this$static){
  $throwEmptyException(this$static);
  return this$static.header.prev.value;
}

function $listIterator(this$static, index){
  var i, node;
  (index < 0 || index > this$static.size) && indexOutOfBounds(index, this$static.size);
  if (index >= this$static.size >> 1) {
    node = this$static.header;
    for (i = this$static.size; i > index; --i) {
      node = node.prev;
    }
  }
   else {
    node = this$static.header.next;
    for (i = 0; i < index; ++i) {
      node = node.next;
    }
  }
  return $LinkedList$ListIteratorImpl(new LinkedList$ListIteratorImpl, index, node, this$static);
}

function $removeLast(this$static){
  var node;
  $throwEmptyException(this$static);
  --this$static.size;
  node = this$static.header.prev;
  node.next.prev = node.prev;
  node.prev.next = node.next;
  node.next = node.prev = node;
  return node.value;
}

function $throwEmptyException(this$static){
  if (this$static.size == 0) {
    throw $NoSuchElementException(new NoSuchElementException);
  }
}

function add_5(o){
  $LinkedList$Node_0(new LinkedList$Node, o, this.header);
  ++this.size;
  return true;
}

function getClass_52(){
  return Ljava_util_LinkedList_2_classLit;
}

function size_2(){
  return this.size;
}

function LinkedList(){
}

_ = LinkedList.prototype = new AbstractSequentialList;
_.add_0 = add_5;
_.getClass$ = getClass_52;
_.size_0 = size_2;
_.typeId$ = 31;
_.header = null;
_.size = 0;
function $LinkedList$ListIteratorImpl(this$static, index, startNode, this$0){
  this$static.this$0 = this$0;
  this$static.currentNode = startNode;
  this$static.currentIndex = index;
  return this$static;
}

function $next_1(this$static){
  if (this$static.currentNode == this$static.this$0.header) {
    throw $NoSuchElementException(new NoSuchElementException);
  }
  this$static.lastNode = this$static.currentNode;
  this$static.currentNode = this$static.currentNode.next;
  ++this$static.currentIndex;
  return this$static.lastNode.value;
}

function getClass_53(){
  return Ljava_util_LinkedList$ListIteratorImpl_2_classLit;
}

function hasNext_1(){
  return this.currentNode != this.this$0.header;
}

function next_2(){
  return $next_1(this);
}

function LinkedList$ListIteratorImpl(){
}

_ = LinkedList$ListIteratorImpl.prototype = new Object_0;
_.getClass$ = getClass_53;
_.hasNext = hasNext_1;
_.next_0 = next_2;
_.typeId$ = 0;
_.currentIndex = 0;
_.currentNode = null;
_.lastNode = null;
_.this$0 = null;
function $LinkedList$Node(this$static){
  this$static.next = this$static.prev = this$static;
  return this$static;
}

function $LinkedList$Node_0(this$static, value, nextNode){
  this$static.value = value;
  this$static.next = nextNode;
  this$static.prev = nextNode.prev;
  nextNode.prev.next = this$static;
  nextNode.prev = this$static;
  return this$static;
}

function getClass_54(){
  return Ljava_util_LinkedList$Node_2_classLit;
}

function LinkedList$Node(){
}

_ = LinkedList$Node.prototype = new Object_0;
_.getClass$ = getClass_54;
_.typeId$ = 0;
_.next = null;
_.prev = null;
_.value = null;
function $MapEntryImpl(this$static, key, value){
  this$static.key = key;
  this$static.value = value;
  return this$static;
}

function getClass_55(){
  return Ljava_util_MapEntryImpl_2_classLit;
}

function getKey_1(){
  return this.key;
}

function getValue_1(){
  return this.value;
}

function setValue_1(value){
  var old;
  old = this.value;
  this.value = value;
  return old;
}

function MapEntryImpl(){
}

_ = MapEntryImpl.prototype = new AbstractMapEntry;
_.getClass$ = getClass_55;
_.getKey = getKey_1;
_.getValue = getValue_1;
_.setValue = setValue_1;
_.typeId$ = 32;
_.key = null;
_.value = null;
function $NoSuchElementException(this$static){
  $fillInStackTrace();
  return this$static;
}

function getClass_56(){
  return Ljava_util_NoSuchElementException_2_classLit;
}

function NoSuchElementException(){
}

_ = NoSuchElementException.prototype = new RuntimeException;
_.getClass$ = getClass_56;
_.typeId$ = 33;

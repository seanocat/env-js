function $clinit_128(){
  $clinit_128 = nullMethod;
  EMPTY_ATTRIBUTENAMES = initDim(_3Lnu_validator_htmlparser_impl_AttributeName_2_classLit, 60, 13, 0, 0);
  EMPTY_STRINGS = initDim(_3Ljava_lang_String_2_classLit, 56, 1, 0, 0);
  EMPTY_ATTRIBUTES = $HtmlAttributes(new HtmlAttributes, 0);
}

function $HtmlAttributes(this$static, mode){
  $clinit_128();
  this$static.mode = mode;
  this$static.length_0 = 0;
  this$static.names = initDim(_3Lnu_validator_htmlparser_impl_AttributeName_2_classLit, 60, 13, 5, 0);
  this$static.values = initDim(_3Ljava_lang_String_2_classLit, 56, 1, 5, 0);
  this$static.xmlnsLength = 0;
  this$static.xmlnsNames = EMPTY_ATTRIBUTENAMES;
  this$static.xmlnsValues = EMPTY_STRINGS;
  return this$static;
}

function $addAttribute(this$static, name_0, value, xmlnsPolicy){
  var newLen, newNames, newValues;
  name_0 == ($clinit_124() , ID);
  if (name_0.xmlns) {
    if (this$static.xmlnsNames.length == this$static.xmlnsLength) {
      newLen = this$static.xmlnsLength == 0?2:this$static.xmlnsLength << 1;
      newNames = initDim(_3Lnu_validator_htmlparser_impl_AttributeName_2_classLit, 60, 13, newLen, 0);
      arraycopy(this$static.xmlnsNames, 0, newNames, 0, this$static.xmlnsNames.length);
      this$static.xmlnsNames = newNames;
      newValues = initDim(_3Ljava_lang_String_2_classLit, 56, 1, newLen, 0);
      arraycopy(this$static.xmlnsValues, 0, newValues, 0, this$static.xmlnsValues.length);
      this$static.xmlnsValues = newValues;
    }
    this$static.xmlnsNames[this$static.xmlnsLength] = name_0;
    this$static.xmlnsValues[this$static.xmlnsLength] = value;
    ++this$static.xmlnsLength;
    switch (xmlnsPolicy.ordinal) {
      case 1:
        throw $SAXException(new SAXException, 'Saw an xmlns attribute.');
      case 2:
        return;
    }
  }
  if (this$static.names.length == this$static.length_0) {
    newLen = this$static.length_0 << 1;
    newNames = initDim(_3Lnu_validator_htmlparser_impl_AttributeName_2_classLit, 60, 13, newLen, 0);
    arraycopy(this$static.names, 0, newNames, 0, this$static.names.length);
    this$static.names = newNames;
    newValues = initDim(_3Ljava_lang_String_2_classLit, 56, 1, newLen, 0);
    arraycopy(this$static.values, 0, newValues, 0, this$static.values.length);
    this$static.values = newValues;
  }
  this$static.names[this$static.length_0] = name_0;
  this$static.values[this$static.length_0] = value;
  ++this$static.length_0;
}

function $clear_0(this$static, m){
  var i;
  for (i = 0; i < this$static.length_0; ++i) {
    setCheck(this$static.names, i, null);
    setCheck(this$static.values, i, null);
  }
  this$static.length_0 = 0;
  this$static.mode = m;
  for (i = 0; i < this$static.xmlnsLength; ++i) {
    setCheck(this$static.xmlnsNames, i, null);
    setCheck(this$static.xmlnsValues, i, null);
  }
  this$static.xmlnsLength = 0;
}

function $clearWithoutReleasingContents(this$static){
  var i;
  for (i = 0; i < this$static.length_0; ++i) {
    setCheck(this$static.names, i, null);
    setCheck(this$static.values, i, null);
  }
  this$static.length_0 = 0;
}

function $cloneAttributes(this$static){
  var clone, i;
  clone = $HtmlAttributes(new HtmlAttributes, 0);
  for (i = 0; i < this$static.length_0; ++i) {
    $addAttribute(clone, this$static.names[i], this$static.values[i], ($clinit_115() , ALLOW));
  }
  for (i = 0; i < this$static.xmlnsLength; ++i) {
    $addAttribute(clone, this$static.xmlnsNames[i], this$static.xmlnsValues[i], ($clinit_115() , ALLOW));
  }
  return clone;
}

function $contains(this$static, name_0){
  var i;
  for (i = 0; i < this$static.length_0; ++i) {
    if (name_0.local[0] == this$static.names[i].local[0]) {
      return true;
    }
  }
  for (i = 0; i < this$static.xmlnsLength; ++i) {
    if (name_0.local[0] == this$static.xmlnsNames[i].local[0]) {
      return true;
    }
  }
  return false;
}

function $getAttributeName(this$static, index){
  if (index < this$static.length_0 && index >= 0) {
    return this$static.names[index];
  }
   else {
    return null;
  }
}

function $getIndex(this$static, name_0){
  var i;
  for (i = 0; i < this$static.length_0; ++i) {
    if (this$static.names[i] == name_0) {
      return i;
    }
  }
  return -1;
}

function $getLocalName(this$static, index){
  if (index < this$static.length_0 && index >= 0) {
    return this$static.names[index].local[this$static.mode];
  }
   else {
    return null;
  }
}

function $getURI(this$static, index){
  if (index < this$static.length_0 && index >= 0) {
    return this$static.names[index].uri[this$static.mode];
  }
   else {
    return null;
  }
}

function $getValue_0(this$static, index){
  if (index < this$static.length_0 && index >= 0) {
    return this$static.values[index];
  }
   else {
    return null;
  }
}

function $getValue_1(this$static, name_0){
  var index;
  index = $getIndex(this$static, name_0);
  if (index == -1) {
    return null;
  }
   else {
    return $getValue_0(this$static, index);
  }
}

function $processNonNcNames(this$static, treeBuilder, namePolicy){
  var attName, i, name_0;
  for (i = 0; i < this$static.length_0; ++i) {
    attName = this$static.names[i];
    if (!attName.ncname[this$static.mode]) {
      name_0 = attName.local[this$static.mode];
      switch (namePolicy.ordinal) {
        case 2:
          this$static.names[i] = ($clinit_124() , $AttributeName_0(new AttributeName, ALL_NO_NS, SAME_LOCAL(escapeName(name_0)), ALL_NO_PREFIX, ALL_NCNAME, false));
        case 0:
          attName != ($clinit_124() , XML_LANG);
          break;
        case 1:
          $fatal_0(treeBuilder, 'Attribute \u201C' + name_0 + '\u201D is not serializable as XML 1.0.');
      }
    }
  }
}

function getClass_71(){
  return Lnu_validator_htmlparser_impl_HtmlAttributes_2_classLit;
}

function HtmlAttributes(){
}

_ = HtmlAttributes.prototype = new Object_0;
_.getClass$ = getClass_71;
_.typeId$ = 0;
_.length_0 = 0;
_.mode = 0;
_.names = null;
_.values = null;
_.xmlnsLength = 0;
_.xmlnsNames = null;
_.xmlnsValues = null;
var EMPTY_ATTRIBUTENAMES, EMPTY_ATTRIBUTES, EMPTY_STRINGS;

function $clinit_127(){
  $clinit_127 = nullMethod;
  $clinit_126();
}

function $ErrorReportingTokenizer(this$static, tokenHandler){
  $clinit_127();
  this$static.contentSpacePolicy = ($clinit_115() , ALTER_INFOSET);
  this$static.commentPolicy = ALTER_INFOSET;
  this$static.xmlnsPolicy = ALTER_INFOSET;
  this$static.namePolicy = ALTER_INFOSET;
  this$static.tokenHandler = tokenHandler;
  this$static.newAttributesEachTime = false;
  this$static.bmpChar = initDim(_3C_classLit, 47, -1, 1, 1);
  this$static.astralChar = initDim(_3C_classLit, 47, -1, 2, 1);
  this$static.tagName = null;
  this$static.attributeName = null;
  this$static.doctypeName = null;
  this$static.publicIdentifier = null;
  this$static.systemIdentifier = null;
  this$static.attributes = null;
  this$static.contentNonXmlCharPolicy = ALTER_INFOSET;
  return this$static;
}

function $checkChar(this$static, buf, pos){
  var c, intVal;
  this$static.linePrev = this$static.line;
  this$static.colPrev = this$static.col;
  if (this$static.nextCharOnNewLine) {
    ++this$static.line;
    this$static.col = 1;
    this$static.nextCharOnNewLine = false;
  }
   else {
    ++this$static.col;
  }
  c = buf[pos];
  !this$static.confident && !this$static.alreadyComplainedAboutNonAscii && c > 127 && (this$static.alreadyComplainedAboutNonAscii = true);
  switch (c) {
    case 0:
    case 9:
    case 13:
    case 10:
      break;
    case 12:
      if (this$static.contentNonXmlCharPolicy == ($clinit_115() , FATAL)) {
        $fatal_1(this$static, 'This document is not mappable to XML 1.0 without data loss due to ' + $toUPlusString(c) + ' which is not a legal XML 1.0 character.');
      }
       else {
        this$static.contentNonXmlCharPolicy == ALTER_INFOSET && (c = buf[pos] = 32);
        $warn('This document is not mappable to XML 1.0 without data loss due to ' + $toUPlusString(c) + ' which is not a legal XML 1.0 character.');
      }

      break;
    default:if ((c & 64512) == 56320) {
        if ((this$static.prev & 64512) == 55296) {
          intVal = (this$static.prev << 10) + c + -56613888;
          (intVal >= 983040 && intVal <= 1048573 || intVal >= 1048576 && intVal <= 1114109) && (!this$static.alreadyWarnedAboutPrivateUseCharacters && (this$static.alreadyWarnedAboutPrivateUseCharacters = true) , undefined);
        }
      }
       else if (c < 32 || (c & 65534) == 65534) {
        switch (this$static.contentNonXmlCharPolicy.ordinal) {
          case 1:
            $fatal_1(this$static, 'Forbidden code point ' + $toUPlusString(c) + '.');
            break;
          case 2:
            c = buf[pos] = 65533;
          case 0:
            $err('Forbidden code point ' + $toUPlusString(c) + '.');
        }
      }
       else 
        c >= 127 && c <= 159 || c >= 64976 && c <= 65007?$err('Forbidden code point ' + $toUPlusString(c) + '.'):c >= 57344 && c <= 63743 && (!this$static.alreadyWarnedAboutPrivateUseCharacters && (this$static.alreadyWarnedAboutPrivateUseCharacters = true) , undefined);
  }
  this$static.prev = c;
  return c;
}

function $errLtOrEqualsOrGraveInUnquotedAttributeOrNull(c){
  switch (c) {
    case 61:
      return;
    case 60:
      return;
    case 96:
      return;
  }
}

function $errNcrControlChar(this$static, ch){
  switch (this$static.contentNonXmlCharPolicy.ordinal) {
    case 1:
      $fatal_1(this$static, 'Character reference expands to a control character (' + $toUPlusString(this$static.value & 65535) + ').');
      break;
    case 2:
      ch = 65533;
    case 0:
      $err('Character reference expands to a control character (' + $toUPlusString(this$static.value & 65535) + ').');
  }
  return ch;
}

function $errNcrNonCharacter(this$static, ch){
  switch (this$static.contentNonXmlCharPolicy.ordinal) {
    case 1:
      $fatal_1(this$static, 'Character reference expands to a non-character (' + $toUPlusString(this$static.value & 65535) + ').');
      break;
    case 2:
      ch = 65533;
    case 0:
      $err('Character reference expands to a non-character (' + $toUPlusString(this$static.value & 65535) + ').');
  }
  return ch;
}

function $errUnquotedAttributeValOrNull(c){
  switch (c) {
    case 60:
      return;
    case 96:
      return;
    case 65533:
      return;
    default:return;
  }
}

function $flushChars(this$static, buf, pos){
  var currCol, currLine;
  if (pos > this$static.cstart) {
    currLine = this$static.line;
    currCol = this$static.col;
    this$static.line = this$static.linePrev;
    this$static.col = this$static.colPrev;
    $characters(this$static.tokenHandler, buf, this$static.cstart, pos - this$static.cstart);
    this$static.line = currLine;
    this$static.col = currCol;
  }
  this$static.cstart = 2147483647;
}

function $getColumnNumber(this$static){
  if (this$static.col > 0) {
    return this$static.col;
  }
   else {
    return -1;
  }
}

function $getLineNumber(this$static){
  if (this$static.line > 0) {
    return this$static.line;
  }
   else {
    return -1;
  }
}

function $toUPlusString(c){
  var hexString;
  hexString = toPowerOfTwoString(c, 4);
  switch (hexString.length) {
    case 1:
      return 'U+000' + hexString;
    case 2:
      return 'U+00' + hexString;
    case 3:
      return 'U+0' + hexString;
    default:return 'U+' + hexString;
  }
}

function getClass_70(){
  return Lnu_validator_htmlparser_impl_ErrorReportingTokenizer_2_classLit;
}

function ErrorReportingTokenizer(){
}

_ = ErrorReportingTokenizer.prototype = new Tokenizer;
_.getClass$ = getClass_70;
_.typeId$ = 0;
_.alreadyComplainedAboutNonAscii = false;
_.alreadyWarnedAboutPrivateUseCharacters = false;
_.col = 0;
_.colPrev = 0;
_.line = 0;
_.linePrev = 0;
_.nextCharOnNewLine = false;
_.prev = 0;

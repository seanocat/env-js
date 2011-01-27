function $clinit_126(){
  $clinit_126 = nullMethod;
  LT_GT = initValues(_3C_classLit, 47, -1, [60, 62]);
  LT_SOLIDUS = initValues(_3C_classLit, 47, -1, [60, 47]);
  RSQB_RSQB = initValues(_3C_classLit, 47, -1, [93, 93]);
  REPLACEMENT_CHARACTER_0 = initValues(_3C_classLit, 47, -1, [65533]);
  SPACE = initValues(_3C_classLit, 47, -1, [32]);
  LF = initValues(_3C_classLit, 47, -1, [10]);
  CDATA_LSQB = $toCharArray('CDATA[');
  OCTYPE = $toCharArray('octype');
  UBLIC = $toCharArray('ublic');
  YSTEM = $toCharArray('ystem');
  TITLE_ARR = initValues(_3C_classLit, 47, -1, [116, 105, 116, 108, 101]);
  SCRIPT_ARR = initValues(_3C_classLit, 47, -1, [115, 99, 114, 105, 112, 116]);
  STYLE_ARR = initValues(_3C_classLit, 47, -1, [115, 116, 121, 108, 101]);
  PLAINTEXT_ARR = initValues(_3C_classLit, 47, -1, [112, 108, 97, 105, 110, 116, 101, 120, 116]);
  XMP_ARR = initValues(_3C_classLit, 47, -1, [120, 109, 112]);
  TEXTAREA_ARR = initValues(_3C_classLit, 47, -1, [116, 101, 120, 116, 97, 114, 101, 97]);
  IFRAME_ARR = initValues(_3C_classLit, 47, -1, [105, 102, 114, 97, 109, 101]);
  NOEMBED_ARR = initValues(_3C_classLit, 47, -1, [110, 111, 101, 109, 98, 101, 100]);
  NOSCRIPT_ARR = initValues(_3C_classLit, 47, -1, [110, 111, 115, 99, 114, 105, 112, 116]);
  NOFRAMES_ARR = initValues(_3C_classLit, 47, -1, [110, 111, 102, 114, 97, 109, 101, 115]);
}

function $addAttributeWithValue(this$static){
  var val;
  this$static.metaBoundaryPassed && ($clinit_125() , META) == this$static.tagName && ($clinit_124() , CHARSET) == this$static.attributeName;
  if (this$static.attributeName) {
    val = valueOf_0(this$static.longStrBuf, 0, this$static.longStrBufLen);
    !this$static.endTag && this$static.html4 && this$static.html4ModeCompatibleWithXhtml1Schemata && $isCaseFolded(this$static.attributeName) && (val = newAsciiLowerCaseStringFromString(val));
    $addAttribute(this$static.attributes, this$static.attributeName, val, this$static.xmlnsPolicy);
    this$static.attributeName = null;
  }
}

function $addAttributeWithoutValue(this$static){
  this$static.metaBoundaryPassed && ($clinit_124() , CHARSET) == this$static.attributeName && ($clinit_125() , META) == this$static.tagName;
  if (this$static.attributeName) {
    if (this$static.html4) {
      $isBoolean(this$static.attributeName)?this$static.html4ModeCompatibleWithXhtml1Schemata?$addAttribute(this$static.attributes, this$static.attributeName, this$static.attributeName.local[0], this$static.xmlnsPolicy):$addAttribute(this$static.attributes, this$static.attributeName, '', this$static.xmlnsPolicy):$addAttribute(this$static.attributes, this$static.attributeName, '', this$static.xmlnsPolicy);
    }
     else {
      (($clinit_124() , SRC) == this$static.attributeName || HREF == this$static.attributeName) && $warn('Attribute \u201C' + this$static.attributeName.local[0] + '\u201D without an explicit value seen. The attribute may be dropped by IE7.');
      $addAttribute(this$static.attributes, this$static.attributeName, '', this$static.xmlnsPolicy);
    }
    this$static.attributeName = null;
  }
}

function $adjustDoubleHyphenAndAppendToLongStrBufAndErr(this$static, c){
  switch (this$static.commentPolicy.ordinal) {
    case 2:
      --this$static.longStrBufLen;
      $appendLongStrBuf(this$static, 32);
      $appendLongStrBuf(this$static, 45);
    case 0:
      $appendLongStrBuf(this$static, c);
      break;
    case 1:
      $fatal_1(this$static, 'The document is not mappable to XML 1.0 due to two consecutive hyphens in a comment.');
  }
}

function $appendLongStrBuf(this$static, c){
  var newBuf;
  if (this$static.longStrBufLen == this$static.longStrBuf.length) {
    newBuf = initDim(_3C_classLit, 47, -1, this$static.longStrBufLen + (this$static.longStrBufLen >> 1), 1);
    arraycopy(this$static.longStrBuf, 0, newBuf, 0, this$static.longStrBuf.length);
    this$static.longStrBuf = newBuf;
  }
  this$static.longStrBuf[this$static.longStrBufLen++] = c;
}

function $appendLongStrBuf_0(this$static, buffer, offset, length_0){
  var newBuf, reqLen;
  reqLen = this$static.longStrBufLen + length_0;
  if (this$static.longStrBuf.length < reqLen) {
    newBuf = initDim(_3C_classLit, 47, -1, reqLen + (reqLen >> 1), 1);
    arraycopy(this$static.longStrBuf, 0, newBuf, 0, this$static.longStrBuf.length);
    this$static.longStrBuf = newBuf;
  }
  arraycopy(buffer, offset, this$static.longStrBuf, this$static.longStrBufLen, length_0);
  this$static.longStrBufLen = reqLen;
}

function $appendSecondHyphenToBogusComment(this$static){
  switch (this$static.commentPolicy.ordinal) {
    case 2:
      $appendLongStrBuf(this$static, 32);
    case 0:
      $appendLongStrBuf(this$static, 45);
      break;
    case 1:
      $fatal_1(this$static, 'The document is not mappable to XML 1.0 due to two consecutive hyphens in a comment.');
  }
}

function $appendStrBuf(this$static, c){
  var newBuf;
  if (this$static.strBufLen == this$static.strBuf.length) {
    newBuf = initDim(_3C_classLit, 47, -1, this$static.strBuf.length + 1024, 1);
    arraycopy(this$static.strBuf, 0, newBuf, 0, this$static.strBuf.length);
    this$static.strBuf = newBuf;
  }
  this$static.strBuf[this$static.strBufLen++] = c;
}

function $attributeNameComplete(this$static){
  this$static.attributeName = nameByBuffer(this$static.strBuf, 0, this$static.strBufLen, this$static.namePolicy != ($clinit_115() , ALLOW));
  !this$static.attributes && (this$static.attributes = $HtmlAttributes(new HtmlAttributes, this$static.mappingLangToXmlLang));
  if ($contains(this$static.attributes, this$static.attributeName)) {
    $err('Duplicate attribute \u201C' + this$static.attributeName.local[0] + '\u201D.');
    this$static.attributeName = null;
  }
}

function $emitCarriageReturn(this$static, buf, pos){
  this$static.nextCharOnNewLine = true;
  this$static.lastCR = true;
  $flushChars(this$static, buf, pos);
  $characters(this$static.tokenHandler, LF, 0, 1);
  this$static.cstart = 2147483647;
}

function $emitCurrentTagToken(this$static, selfClosing, pos){
  var attrs;
  this$static.cstart = pos + 1;
  this$static.stateSave = 0;
  attrs = !this$static.attributes?($clinit_128() , EMPTY_ATTRIBUTES):this$static.attributes;
  this$static.endTag?$endTag(this$static.tokenHandler, this$static.tagName):$startTag(this$static.tokenHandler, this$static.tagName, attrs, selfClosing);
  this$static.tagName = null;
  this$static.newAttributesEachTime?(this$static.attributes = null):$clear_0(this$static.attributes, this$static.mappingLangToXmlLang);
  return this$static.stateSave;
}

function $emitDoctypeToken(this$static, pos){
  this$static.cstart = pos + 1;
  $doctype(this$static.tokenHandler, this$static.doctypeName, this$static.publicIdentifier, this$static.systemIdentifier, this$static.forceQuirks);
  this$static.doctypeName = null;
  this$static.publicIdentifier = null;
  this$static.systemIdentifier = null;
}

function $emitOrAppendOne(this$static, val, returnState){
  (returnState & -2) != 0?$appendLongStrBuf(this$static, val[0]):$characters(this$static.tokenHandler, val, 0, 1);
}

function $emitOrAppendTwo(this$static, val, returnState){
  if ((returnState & -2) != 0) {
    $appendLongStrBuf(this$static, val[0]);
    $appendLongStrBuf(this$static, val[1]);
  }
   else {
    $characters(this$static.tokenHandler, val, 0, 2);
  }
}

function $emitStrBuf(this$static){
  this$static.strBufLen > 0 && $characters(this$static.tokenHandler, this$static.strBuf, 0, this$static.strBufLen);
}

function $emptyAttributes(this$static){
  if (this$static.newAttributesEachTime) {
    return $HtmlAttributes(new HtmlAttributes, this$static.mappingLangToXmlLang);
  }
   else {
    return $clinit_128() , EMPTY_ATTRIBUTES;
  }
}

function $end(this$static){
  this$static.strBuf = null;
  this$static.longStrBuf = null;
  this$static.doctypeName = null;
  this$static.systemIdentifier != null && (this$static.systemIdentifier = null);
  this$static.publicIdentifier != null && (this$static.publicIdentifier = null);
  !!this$static.tagName && (this$static.tagName = null);
  !!this$static.attributeName && (this$static.attributeName = null);
  $endTokenization(this$static.tokenHandler);
  if (this$static.attributes) {
    $clear_0(this$static.attributes, this$static.mappingLangToXmlLang);
    this$static.attributes = null;
  }
}

function $endTagExpectationToArray(this$static){
  switch (this$static.endTagExpectation.group) {
    case 36:
      this$static.endTagExpectationAsArray = TITLE_ARR;
      return;
    case 31:
      this$static.endTagExpectationAsArray = SCRIPT_ARR;
      return;
    case 33:
      this$static.endTagExpectationAsArray = STYLE_ARR;
      return;
    case 30:
      this$static.endTagExpectationAsArray = PLAINTEXT_ARR;
      return;
    case 38:
      this$static.endTagExpectationAsArray = XMP_ARR;
      return;
    case 35:
      this$static.endTagExpectationAsArray = TEXTAREA_ARR;
      return;
    case 47:
      this$static.endTagExpectationAsArray = IFRAME_ARR;
      return;
    case 60:
      this$static.endTagExpectationAsArray = NOEMBED_ARR;
      return;
    case 26:
      this$static.endTagExpectationAsArray = NOSCRIPT_ARR;
      return;
    case 25:
      this$static.endTagExpectationAsArray = NOFRAMES_ARR;
      return;
    default:return;
  }
}

function $eof_0(this$static){
  var candidateArr, ch, i, returnState, state, val;
  state = this$static.stateSave;
  returnState = this$static.returnStateSave;
  eofloop: for (;;) {
    switch (state) {
      case 53:
      case 65:
        $characters(this$static.tokenHandler, LT_GT, 0, 1);
        break eofloop;
      case 4:
        $characters(this$static.tokenHandler, LT_GT, 0, 1);
        break eofloop;
      case 61:
        $characters(this$static.tokenHandler, LT_GT, 0, 1);
        break eofloop;
      case 37:
        $characters(this$static.tokenHandler, LT_SOLIDUS, 0, 2);
        $emitStrBuf(this$static);
        break eofloop;
      case 5:
        $characters(this$static.tokenHandler, LT_SOLIDUS, 0, 2);
        break eofloop;
      case 6:
        break eofloop;
      case 7:
      case 14:
      case 48:
        break eofloop;
      case 8:
        break eofloop;
      case 9:
      case 10:
        break eofloop;
      case 11:
      case 12:
      case 13:
        break eofloop;
      case 15:
        this$static.wantsComments && $comment(this$static.tokenHandler, this$static.longStrBuf, 0, this$static.longStrBufLen - 0);
        this$static.cstart = 1;
        break eofloop;
      case 59:
        $maybeAppendSpaceToBogusComment(this$static);
        this$static.wantsComments && $comment(this$static.tokenHandler, this$static.longStrBuf, 0, this$static.longStrBufLen - 0);
        this$static.cstart = 1;
        break eofloop;
      case 16:
        this$static.longStrBufLen = 0;
        this$static.wantsComments && $comment(this$static.tokenHandler, this$static.longStrBuf, 0, this$static.longStrBufLen - 0);
        this$static.cstart = 1;
        break eofloop;
      case 38:
        this$static.wantsComments && $comment(this$static.tokenHandler, this$static.longStrBuf, 0, this$static.longStrBufLen - 0);
        this$static.cstart = 1;
        break eofloop;
      case 39:
        if (this$static.index < 6) {
          this$static.wantsComments && $comment(this$static.tokenHandler, this$static.longStrBuf, 0, this$static.longStrBufLen - 0);
          this$static.cstart = 1;
        }
         else {
          this$static.doctypeName = '';
          this$static.systemIdentifier != null && (this$static.systemIdentifier = null);
          this$static.publicIdentifier != null && (this$static.publicIdentifier = null);
          this$static.forceQuirks = true;
          $emitDoctypeToken(this$static, 0);
          break eofloop;
        }

        break eofloop;
      case 30:
      case 32:
      case 35:
        this$static.wantsComments && $comment(this$static.tokenHandler, this$static.longStrBuf, 0, this$static.longStrBufLen - 0);
        this$static.cstart = 1;
        break eofloop;
      case 34:
        this$static.wantsComments && $comment(this$static.tokenHandler, this$static.longStrBuf, 0, this$static.longStrBufLen - 2);
        this$static.cstart = 1;
        break eofloop;
      case 33:
      case 31:
        this$static.wantsComments && $comment(this$static.tokenHandler, this$static.longStrBuf, 0, this$static.longStrBufLen - 1);
        this$static.cstart = 1;
        break eofloop;
      case 36:
        this$static.wantsComments && $comment(this$static.tokenHandler, this$static.longStrBuf, 0, this$static.longStrBufLen - 3);
        this$static.cstart = 1;
        break eofloop;
      case 17:
      case 18:
        this$static.forceQuirks = true;
        $emitDoctypeToken(this$static, 0);
        break eofloop;
      case 19:
        this$static.doctypeName = String(valueOf_0(this$static.strBuf, 0, this$static.strBufLen));
        this$static.forceQuirks = true;
        $emitDoctypeToken(this$static, 0);
        break eofloop;
      case 40:
      case 41:
      case 20:
      case 62:
      case 64:
      case 21:
        this$static.forceQuirks = true;
        $emitDoctypeToken(this$static, 0);
        break eofloop;
      case 22:
      case 23:
        this$static.forceQuirks = true;
        this$static.publicIdentifier = valueOf_0(this$static.longStrBuf, 0, this$static.longStrBufLen);
        $emitDoctypeToken(this$static, 0);
        break eofloop;
      case 24:
      case 25:
      case 63:
        this$static.forceQuirks = true;
        $emitDoctypeToken(this$static, 0);
        break eofloop;
      case 26:
      case 27:
        this$static.forceQuirks = true;
        this$static.systemIdentifier = valueOf_0(this$static.longStrBuf, 0, this$static.longStrBufLen);
        $emitDoctypeToken(this$static, 0);
        break eofloop;
      case 28:
        this$static.forceQuirks = true;
        $emitDoctypeToken(this$static, 0);
        break eofloop;
      case 29:
        $emitDoctypeToken(this$static, 0);
        break eofloop;
      case 42:
        (returnState & -2) != 0?$appendLongStrBuf_0(this$static, this$static.strBuf, 0, this$static.strBufLen):$emitStrBuf(this$static);
        state = returnState;
        continue;
      case 72:
        (returnState & -2) != 0?$appendLongStrBuf_0(this$static, this$static.strBuf, 0, this$static.strBufLen):$emitStrBuf(this$static);
        state = returnState;
        continue;
      case 44:
        outer: for (;;) {
          ++this$static.entCol;
          hiloop: for (;;) {
            if (this$static.hi == -1) {
              break hiloop;
            }
            if (this$static.entCol == ($clinit_131() , NAMES)[this$static.hi].length) {
              break hiloop;
            }
            if (this$static.entCol > NAMES[this$static.hi].length) {
              break outer;
            }
             else if (0 < NAMES[this$static.hi][this$static.entCol]) {
              --this$static.hi;
            }
             else {
              break hiloop;
            }
          }
          loloop: for (;;) {
            if (this$static.hi < this$static.lo) {
              break outer;
            }
            if (this$static.entCol == ($clinit_131() , NAMES)[this$static.lo].length) {
              this$static.candidate = this$static.lo;
              this$static.strBufMark = this$static.strBufLen;
              ++this$static.lo;
            }
             else if (this$static.entCol > NAMES[this$static.lo].length) {
              break outer;
            }
             else if (0 > NAMES[this$static.lo][this$static.entCol]) {
              ++this$static.lo;
            }
             else {
              break loloop;
            }
          }
          if (this$static.hi < this$static.lo) {
            break outer;
          }
          continue;
        }

        if (this$static.candidate == -1) {
          (returnState & -2) != 0?$appendLongStrBuf_0(this$static, this$static.strBuf, 0, this$static.strBufLen):$emitStrBuf(this$static);
          state = returnState;
          continue eofloop;
        }
         else {
          candidateArr = ($clinit_131() , NAMES)[this$static.candidate];
          if (candidateArr.length == 0 || candidateArr[candidateArr.length - 1] != 59) {
            if ((returnState & -2) != 0) {
              this$static.strBufMark == this$static.strBufLen?(ch = 0):(ch = this$static.strBuf[this$static.strBufMark]);
              if (ch >= 48 && ch <= 57 || ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122) {
                $appendLongStrBuf_0(this$static, this$static.strBuf, 0, this$static.strBufLen);
                state = returnState;
                continue eofloop;
              }
            }
          }
          val = VALUES_0[this$static.candidate];
          (val[0] & 64512) == 55296?$emitOrAppendTwo(this$static, val, returnState):((returnState & -2) != 0?$appendLongStrBuf(this$static, val[0]):$characters(this$static.tokenHandler, val, 0, 1) , undefined);
          if (this$static.strBufMark < this$static.strBufLen) {
            if ((returnState & -2) != 0) {
              for (i = this$static.strBufMark; i < this$static.strBufLen; ++i) {
                $appendLongStrBuf(this$static, this$static.strBuf[i]);
              }
            }
             else {
              $characters(this$static.tokenHandler, this$static.strBuf, this$static.strBufMark, this$static.strBufLen - this$static.strBufMark);
            }
          }
          state = returnState;
          continue eofloop;
        }

      case 43:
      case 46:
      case 45:
        if (!this$static.seenDigits) {
          $err('No digits after \u201C' + valueOf_0(this$static.strBuf, 0, this$static.strBufLen) + '\u201D.');
          (returnState & -2) != 0?$appendLongStrBuf_0(this$static, this$static.strBuf, 0, this$static.strBufLen):$emitStrBuf(this$static);
          state = returnState;
          continue;
        }

        $handleNcrValue(this$static, returnState);
        state = returnState;
        continue;
      case 0:
      default:break eofloop;
    }
  }
  $eof(this$static.tokenHandler);
  return;
}

function $err(){
  return;
}

function $fatal_1(this$static, message){
  var spe;
  spe = $SAXParseException(new SAXParseException, message, this$static);
  throw spe;
}

function $handleNcrValue(this$static, returnState){
  var ch, val;
  if (this$static.value <= 65535) {
    if (this$static.value >= 128 && this$static.value <= 159) {
      val = ($clinit_131() , WINDOWS_1252)[this$static.value - 128];
      (returnState & -2) != 0?$appendLongStrBuf(this$static, val[0]):$characters(this$static.tokenHandler, val, 0, 1);
    }
     else if (this$static.value == 12 && this$static.contentSpacePolicy != ($clinit_115() , ALLOW)) {
      this$static.contentSpacePolicy == ($clinit_115() , ALTER_INFOSET)?$emitOrAppendOne(this$static, SPACE, returnState):this$static.contentSpacePolicy == FATAL && $fatal_1(this$static, 'A character reference expanded to a form feed which is not legal XML 1.0 white space.');
    }
     else if (this$static.value == 0) {
      $emitOrAppendOne(this$static, REPLACEMENT_CHARACTER_0, returnState);
    }
     else if ((this$static.value & 63488) == 55296) {
      $emitOrAppendOne(this$static, REPLACEMENT_CHARACTER_0, returnState);
    }
     else {
      ch = this$static.value & 65535;
      this$static.value == 13 || (this$static.value <= 8 || this$static.value == 11 || this$static.value >= 14 && this$static.value <= 31?(ch = $errNcrControlChar(this$static, ch)):this$static.value >= 64976 && this$static.value <= 65007 || ((this$static.value & 65534) == 65534?(ch = $errNcrNonCharacter(this$static, ch)):this$static.value >= 127 && this$static.value <= 159 && $err('Character reference expands to a control character (' + $toUPlusString(this$static.value & 65535) + ').')));
      this$static.bmpChar[0] = ch;
      $emitOrAppendOne(this$static, this$static.bmpChar, returnState);
    }
  }
   else if (this$static.value <= 1114111) {
    (this$static.value & 65534) == 65534 && $err('Character reference expands to an astral non-character (' + $toUPlusString(this$static.value) + ').');
    this$static.astralChar[0] = 55232 + (this$static.value >> 10) & 65535;
    this$static.astralChar[1] = 56320 + (this$static.value & 1023) & 65535;
    $emitOrAppendTwo(this$static, this$static.astralChar, returnState);
  }
   else {
    $emitOrAppendOne(this$static, REPLACEMENT_CHARACTER_0, returnState);
  }
}

function $initDoctypeFields(this$static){
  this$static.doctypeName = '';
  this$static.systemIdentifier != null && (this$static.systemIdentifier = null);
  this$static.publicIdentifier != null && (this$static.publicIdentifier = null);
  this$static.forceQuirks = false;
}

function $maybeAppendSpaceToBogusComment(this$static){
  switch (this$static.commentPolicy.ordinal) {
    case 2:
      $appendLongStrBuf(this$static, 32);
      break;
    case 1:
      $fatal_1(this$static, 'The document is not mappable to XML 1.0 due to a trailing hyphen in a comment.');
  }
}

function $setStateAndEndTagExpectation(this$static, specialTokenizerState){
  var asArray;
  this$static.stateSave = specialTokenizerState;
  if (specialTokenizerState == 0) {
    return;
  }
  asArray = null.nullMethod();
  this$static.endTagExpectation = elementNameByBuffer(asArray, 0, null.nullField);
  $endTagExpectationToArray(this$static);
}

function $setStateAndEndTagExpectation_0(this$static, specialTokenizerState, endTagExpectation){
  this$static.stateSave = specialTokenizerState;
  this$static.endTagExpectation = endTagExpectation;
  $endTagExpectationToArray(this$static);
}

function $setXmlnsPolicy(this$static, xmlnsPolicy){
  if (xmlnsPolicy == ($clinit_115() , FATAL)) {
    throw $IllegalArgumentException(new IllegalArgumentException, "Can't use FATAL here.");
  }
  this$static.xmlnsPolicy = xmlnsPolicy;
}

function $start_0(this$static){
  this$static.confident = false;
  this$static.strBuf = initDim(_3C_classLit, 47, -1, 64, 1);
  this$static.longStrBuf = initDim(_3C_classLit, 47, -1, 1024, 1);
  this$static.html4 = false;
  this$static.metaBoundaryPassed = false;
  this$static.wantsComments = this$static.tokenHandler.wantingComments;
  !this$static.newAttributesEachTime && (this$static.attributes = $HtmlAttributes(new HtmlAttributes, this$static.mappingLangToXmlLang));
  this$static.strBufLen = 0;
  this$static.longStrBufLen = 0;
  this$static.stateSave = 0;
  this$static.lastCR = false;
  this$static.index = 0;
  this$static.forceQuirks = false;
  this$static.additional = 0;
  this$static.entCol = -1;
  this$static.firstCharKey = -1;
  this$static.lo = 0;
  this$static.hi = ($clinit_131() , NAMES).length - 1;
  this$static.candidate = -1;
  this$static.strBufMark = 0;
  this$static.prevValue = -1;
  this$static.value = 0;
  this$static.seenDigits = false;
  this$static.endTag = false;
  this$static.shouldSuspend = false;
  $initDoctypeFields(this$static);
  !!this$static.tagName && (this$static.tagName = null);
  !!this$static.attributeName && (this$static.attributeName = null);
  this$static.newAttributesEachTime && !!this$static.attributes && (this$static.attributes = null);
  $startTokenization(this$static.tokenHandler, this$static);
  this$static.alreadyComplainedAboutNonAscii = false;
  this$static.line = this$static.linePrev = 0;
  this$static.col = this$static.colPrev = 1;
  this$static.nextCharOnNewLine = true;
  this$static.prev = 0;
  this$static.alreadyWarnedAboutPrivateUseCharacters = false;
}

function $stateLoop(this$static, state, c, pos, buf, reconsume, returnState, endPos){
  var candidateArr, ch, e, folded, hilo, i, row, val;
  stateloop: for (;;) {
    switch (state) {
      case 0:
        dataloop: for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          switch (c) {
            case 38:
              $flushChars(this$static, buf, pos);
              this$static.strBuf[0] = c;
              this$static.strBufLen = 1;
              this$static.additional = 0;
              $LocatorImpl(new LocatorImpl, this$static);
              returnState = state;
              state = 42;
              continue stateloop;
            case 60:
              $flushChars(this$static, buf, pos);
              state = 4;
              break dataloop;
            case 0:
              $flushChars(this$static, buf, pos);
              $zeroOriginatingReplacementCharacter(this$static.tokenHandler);
              this$static.cstart = pos + 1;
              continue;
            case 13:
              $emitCarriageReturn(this$static, buf, pos);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            default:continue;
          }
        }

      case 4:
        tagopenloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          if (c >= 65 && c <= 90) {
            this$static.endTag = false;
            this$static.strBuf[0] = c + 32 & 65535;
            this$static.strBufLen = 1;
            state = 6;
            break tagopenloop;
          }
           else if (c >= 97 && c <= 122) {
            this$static.endTag = false;
            this$static.strBuf[0] = c;
            this$static.strBufLen = 1;
            state = 6;
            break tagopenloop;
          }
          switch (c) {
            case 33:
              state = 16;
              continue stateloop;
            case 47:
              state = 5;
              continue stateloop;
            case 63:
              this$static.longStrBuf[0] = c;
              this$static.longStrBufLen = 1;
              state = 15;
              continue stateloop;
            case 62:
              $characters(this$static.tokenHandler, LT_GT, 0, 2);
              this$static.cstart = pos + 1;
              state = 0;
              continue stateloop;
            default:$characters(this$static.tokenHandler, LT_GT, 0, 1);
              this$static.cstart = pos;
              state = 0;
              reconsume = true;
              continue stateloop;
          }
        }

      case 6:
        tagnameloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              this$static.tagName = elementNameByBuffer(this$static.strBuf, 0, this$static.strBufLen);
              state = 7;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              this$static.tagName = elementNameByBuffer(this$static.strBuf, 0, this$static.strBufLen);
              state = 7;
              break tagnameloop;
            case 47:
              this$static.tagName = elementNameByBuffer(this$static.strBuf, 0, this$static.strBufLen);
              state = 48;
              continue stateloop;
            case 62:
              this$static.tagName = elementNameByBuffer(this$static.strBuf, 0, this$static.strBufLen);
              state = $emitCurrentTagToken(this$static, false, pos);
              if (this$static.shouldSuspend) {
                break stateloop;
              }

              continue stateloop;
            case 0:
              c = 65533;
            default:c >= 65 && c <= 90 && (c += 32);
              $appendStrBuf(this$static, c);
              continue;
          }
        }

      case 7:
        beforeattributenameloop: for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              continue;
            case 47:
              state = 48;
              continue stateloop;
            case 62:
              state = $emitCurrentTagToken(this$static, false, pos);
              if (this$static.shouldSuspend) {
                break stateloop;
              }

              continue stateloop;
            case 0:
              c = 65533;
            case 34:
            case 39:
            case 60:
            case 61:
            default:c >= 65 && c <= 90 && (c += 32);
              this$static.strBuf[0] = c;
              this$static.strBufLen = 1;
              state = 8;
              break beforeattributenameloop;
          }
        }

      case 8:
        attributenameloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              $attributeNameComplete(this$static);
              state = 9;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              $attributeNameComplete(this$static);
              state = 9;
              continue stateloop;
            case 47:
              $attributeNameComplete(this$static);
              $addAttributeWithoutValue(this$static);
              state = 48;
              continue stateloop;
            case 61:
              $attributeNameComplete(this$static);
              state = 10;
              break attributenameloop;
            case 62:
              $attributeNameComplete(this$static);
              $addAttributeWithoutValue(this$static);
              state = $emitCurrentTagToken(this$static, false, pos);
              if (this$static.shouldSuspend) {
                break stateloop;
              }

              continue stateloop;
            case 0:
              c = 65533;
            case 34:
            case 39:
            case 60:
            default:c >= 65 && c <= 90 && (c += 32);
              $appendStrBuf(this$static, c);
              continue;
          }
        }

      case 10:
        beforeattributevalueloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              continue;
            case 34:
              this$static.longStrBufLen = 0;
              state = 11;
              break beforeattributevalueloop;
            case 38:
              this$static.longStrBufLen = 0;
              state = 13;
              reconsume = true;
              continue stateloop;
            case 39:
              this$static.longStrBufLen = 0;
              state = 12;
              continue stateloop;
            case 62:
              $addAttributeWithoutValue(this$static);
              state = $emitCurrentTagToken(this$static, false, pos);
              if (this$static.shouldSuspend) {
                break stateloop;
              }

              continue stateloop;
            case 0:
              c = 65533;
            case 60:
            case 61:
            case 96:
              $errLtOrEqualsOrGraveInUnquotedAttributeOrNull(c);
            default:this$static.longStrBuf[0] = c;
              this$static.longStrBufLen = 1;
              state = 13;
              continue stateloop;
          }
        }

      case 11:
        attributevaluedoublequotedloop: for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          switch (c) {
            case 34:
              $addAttributeWithValue(this$static);
              state = 14;
              break attributevaluedoublequotedloop;
            case 38:
              this$static.strBuf[0] = c;
              this$static.strBufLen = 1;
              this$static.additional = 34;
              $LocatorImpl(new LocatorImpl, this$static);
              returnState = state;
              state = 42;
              continue stateloop;
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              $appendLongStrBuf(this$static, 10);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
              $appendLongStrBuf(this$static, 10);
              continue;
            case 0:
              c = 65533;
            default:$appendLongStrBuf(this$static, c);
              continue;
          }
        }

      case 14:
        afterattributevaluequotedloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              state = 7;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              state = 7;
              continue stateloop;
            case 47:
              state = 48;
              break afterattributevaluequotedloop;
            case 62:
              state = $emitCurrentTagToken(this$static, false, pos);
              if (this$static.shouldSuspend) {
                break stateloop;
              }

              continue stateloop;
            default:state = 7;
              reconsume = true;
              continue stateloop;
          }
        }

      case 48:
        if (++pos == endPos) {
          break stateloop;
        }

        c = $checkChar(this$static, buf, pos);
        switch (c) {
          case 62:
            state = $emitCurrentTagToken(this$static, true, pos);
            if (this$static.shouldSuspend) {
              break stateloop;
            }

            continue stateloop;
          default:state = 7;
            reconsume = true;
            continue stateloop;
        }

      case 13:
        for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              $addAttributeWithValue(this$static);
              state = 7;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              $addAttributeWithValue(this$static);
              state = 7;
              continue stateloop;
            case 38:
              this$static.strBuf[0] = c;
              this$static.strBufLen = 1;
              this$static.additional = 62;
              $LocatorImpl(new LocatorImpl, this$static);
              returnState = state;
              state = 42;
              continue stateloop;
            case 62:
              $addAttributeWithValue(this$static);
              state = $emitCurrentTagToken(this$static, false, pos);
              if (this$static.shouldSuspend) {
                break stateloop;
              }

              continue stateloop;
            case 0:
              c = 65533;
            case 60:
            case 34:
            case 39:
            case 61:
            case 96:
              $errUnquotedAttributeValOrNull(c);
            default:$appendLongStrBuf(this$static, c);
              continue;
          }
        }

      case 9:
        for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              continue;
            case 47:
              $addAttributeWithoutValue(this$static);
              state = 48;
              continue stateloop;
            case 61:
              state = 10;
              continue stateloop;
            case 62:
              $addAttributeWithoutValue(this$static);
              state = $emitCurrentTagToken(this$static, false, pos);
              if (this$static.shouldSuspend) {
                break stateloop;
              }

              continue stateloop;
            case 0:
              c = 65533;
            case 34:
            case 39:
            case 60:
            default:$addAttributeWithoutValue(this$static);
              c >= 65 && c <= 90 && (c += 32);
              this$static.strBuf[0] = c;
              this$static.strBufLen = 1;
              state = 8;
              continue stateloop;
          }
        }

      case 16:
        markupdeclarationopenloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 45:
              this$static.longStrBuf[0] = c;
              this$static.longStrBufLen = 1;
              state = 38;
              break markupdeclarationopenloop;
            case 100:
            case 68:
              this$static.longStrBuf[0] = c;
              this$static.longStrBufLen = 1;
              this$static.index = 0;
              state = 39;
              continue stateloop;
            case 91:
              if (this$static.tokenHandler.inForeign) {
                this$static.longStrBuf[0] = c;
                this$static.longStrBufLen = 1;
                this$static.index = 0;
                state = 49;
                continue stateloop;
              }

            default:this$static.longStrBufLen = 0;
              state = 15;
              reconsume = true;
              continue stateloop;
          }
        }

      case 38:
        markupdeclarationhyphenloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 0:
              break stateloop;
            case 45:
              this$static.longStrBufLen = 0;
              state = 30;
              break markupdeclarationhyphenloop;
            default:state = 15;
              reconsume = true;
              continue stateloop;
          }
        }

      case 30:
        commentstartloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 45:
              $appendLongStrBuf(this$static, c);
              state = 31;
              continue stateloop;
            case 62:
              this$static.wantsComments && $comment(this$static.tokenHandler, this$static.longStrBuf, 0, this$static.longStrBufLen - 0);
              this$static.cstart = pos + 1;
              state = 0;
              continue stateloop;
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              $appendLongStrBuf(this$static, 10);
              state = 32;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
              $appendLongStrBuf(this$static, 10);
              state = 32;
              break commentstartloop;
            case 0:
              c = 65533;
            default:$appendLongStrBuf(this$static, c);
              state = 32;
              break commentstartloop;
          }
        }

      case 32:
        commentloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 45:
              $appendLongStrBuf(this$static, c);
              state = 33;
              break commentloop;
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              $appendLongStrBuf(this$static, 10);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
              $appendLongStrBuf(this$static, 10);
              continue;
            case 0:
              c = 65533;
            default:$appendLongStrBuf(this$static, c);
              continue;
          }
        }

      case 33:
        commentenddashloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 45:
              $appendLongStrBuf(this$static, c);
              state = 34;
              break commentenddashloop;
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              $appendLongStrBuf(this$static, 10);
              state = 32;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
              $appendLongStrBuf(this$static, 10);
              state = 32;
              continue stateloop;
            case 0:
              c = 65533;
            default:$appendLongStrBuf(this$static, c);
              state = 32;
              continue stateloop;
          }
        }

      case 34:
        commentendloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 62:
              this$static.wantsComments && $comment(this$static.tokenHandler, this$static.longStrBuf, 0, this$static.longStrBufLen - 2);
              this$static.cstart = pos + 1;
              state = 0;
              continue stateloop;
            case 45:
              $adjustDoubleHyphenAndAppendToLongStrBufAndErr(this$static, c);
              continue;
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              $adjustDoubleHyphenAndAppendToLongStrBufAndErr(this$static, 10);
              state = 32;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
              $adjustDoubleHyphenAndAppendToLongStrBufAndErr(this$static, 10);
              state = 32;
              continue stateloop;
            case 33:
              $appendLongStrBuf(this$static, c);
              state = 36;
              continue stateloop;
            case 0:
              c = 65533;
            default:$adjustDoubleHyphenAndAppendToLongStrBufAndErr(this$static, c);
              state = 32;
              continue stateloop;
          }
        }

      case 35:
        for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 62:
              this$static.wantsComments && $comment(this$static.tokenHandler, this$static.longStrBuf, 0, this$static.longStrBufLen - 0);
              this$static.cstart = pos + 1;
              state = 0;
              continue stateloop;
            case 45:
              $appendLongStrBuf(this$static, c);
              state = 33;
              continue stateloop;
            case 32:
            case 9:
            case 12:
              $appendLongStrBuf(this$static, c);
              continue;
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              $appendLongStrBuf(this$static, 10);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
              $appendLongStrBuf(this$static, 10);
              continue;
            case 0:
              c = 65533;
            default:$appendLongStrBuf(this$static, c);
              state = 32;
              continue stateloop;
          }
        }

      case 36:
        for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 62:
              this$static.wantsComments && $comment(this$static.tokenHandler, this$static.longStrBuf, 0, this$static.longStrBufLen - 3);
              this$static.cstart = pos + 1;
              state = 0;
              continue stateloop;
            case 45:
              $appendLongStrBuf(this$static, c);
              state = 33;
              continue stateloop;
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              $appendLongStrBuf(this$static, 10);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
              $appendLongStrBuf(this$static, 10);
              continue;
            case 0:
              c = 65533;
            default:$appendLongStrBuf(this$static, c);
              state = 32;
              continue stateloop;
          }
        }

      case 31:
        if (++pos == endPos) {
          break stateloop;
        }

        c = $checkChar(this$static, buf, pos);
        switch (c) {
          case 45:
            $appendLongStrBuf(this$static, c);
            state = 34;
            continue stateloop;
          case 62:
            this$static.wantsComments && $comment(this$static.tokenHandler, this$static.longStrBuf, 0, this$static.longStrBufLen - 1);
            this$static.cstart = pos + 1;
            state = 0;
            continue stateloop;
          case 13:
            this$static.nextCharOnNewLine = true;
            this$static.lastCR = true;
            $appendLongStrBuf(this$static, 10);
            state = 32;
            break stateloop;
          case 10:
            this$static.nextCharOnNewLine = true;
            $appendLongStrBuf(this$static, 10);
            state = 32;
            continue stateloop;
          case 0:
            c = 65533;
          default:$appendLongStrBuf(this$static, c);
            state = 32;
            continue stateloop;
        }

      case 49:
        for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          if (this$static.index < 6) {
            if (c == CDATA_LSQB[this$static.index]) {
              $appendLongStrBuf(this$static, c);
            }
             else {
              state = 15;
              reconsume = true;
              continue stateloop;
            }
            ++this$static.index;
            continue;
          }
           else {
            this$static.cstart = pos;
            state = 50;
            reconsume = true;
            break;
          }
        }

      case 50:
        cdatasectionloop: for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          switch (c) {
            case 93:
              $flushChars(this$static, buf, pos);
              state = 51;
              break cdatasectionloop;
            case 0:
              $flushChars(this$static, buf, pos);
              $zeroOriginatingReplacementCharacter(this$static.tokenHandler);
              this$static.cstart = pos + 1;
              continue;
            case 13:
              $emitCarriageReturn(this$static, buf, pos);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            default:continue;
          }
        }

      case 51:
        cdatarsqb: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 93:
              state = 52;
              break cdatarsqb;
            default:$characters(this$static.tokenHandler, RSQB_RSQB, 0, 1);
              this$static.cstart = pos;
              state = 50;
              reconsume = true;
              continue stateloop;
          }
        }

      case 52:
        if (++pos == endPos) {
          break stateloop;
        }

        c = $checkChar(this$static, buf, pos);
        switch (c) {
          case 62:
            this$static.cstart = pos + 1;
            state = 0;
            continue stateloop;
          default:$characters(this$static.tokenHandler, RSQB_RSQB, 0, 2);
            this$static.cstart = pos;
            state = 50;
            reconsume = true;
            continue stateloop;
        }

      case 12:
        attributevaluesinglequotedloop: for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          switch (c) {
            case 39:
              $addAttributeWithValue(this$static);
              state = 14;
              continue stateloop;
            case 38:
              this$static.strBuf[0] = c;
              this$static.strBufLen = 1;
              this$static.additional = 39;
              $LocatorImpl(new LocatorImpl, this$static);
              returnState = state;
              state = 42;
              break attributevaluesinglequotedloop;
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              $appendLongStrBuf(this$static, 10);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
              $appendLongStrBuf(this$static, 10);
              continue;
            case 0:
              c = 65533;
            default:$appendLongStrBuf(this$static, c);
              continue;
          }
        }

      case 42:
        if (++pos == endPos) {
          break stateloop;
        }

        c = $checkChar(this$static, buf, pos);
        if (c == 0) {
          break stateloop;
        }

        switch (c) {
          case 32:
          case 9:
          case 10:
          case 13:
          case 12:
          case 60:
          case 38:
            (returnState & -2) != 0?$appendLongStrBuf_0(this$static, this$static.strBuf, 0, this$static.strBufLen):$emitStrBuf(this$static);
            (returnState & -2) == 0 && (this$static.cstart = pos);
            state = returnState;
            reconsume = true;
            continue stateloop;
          case 35:
            $appendStrBuf(this$static, 35);
            state = 43;
            continue stateloop;
          default:if (c == this$static.additional) {
              (returnState & -2) != 0?$appendLongStrBuf_0(this$static, this$static.strBuf, 0, this$static.strBufLen):$emitStrBuf(this$static);
              state = returnState;
              reconsume = true;
              continue stateloop;
            }

            if (c >= 97 && c <= 122) {
              this$static.firstCharKey = c - 97 + 26;
            }
             else if (c >= 65 && c <= 90) {
              this$static.firstCharKey = c - 65;
            }
             else {
              (returnState & -2) != 0?$appendLongStrBuf_0(this$static, this$static.strBuf, 0, this$static.strBufLen):$emitStrBuf(this$static);
              (returnState & -2) == 0 && (this$static.cstart = pos);
              state = returnState;
              reconsume = true;
              continue stateloop;
            }

            $appendStrBuf(this$static, c);
            state = 72;
        }

      case 72:
        {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          if (c == 0) {
            break stateloop;
          }
          hilo = 0;
          if (c <= 122) {
            row = ($clinit_132() , HILO_ACCEL)[c];
            row != null && (hilo = row[this$static.firstCharKey]);
          }
          if (hilo == 0) {
            (returnState & -2) != 0?$appendLongStrBuf_0(this$static, this$static.strBuf, 0, this$static.strBufLen):$emitStrBuf(this$static);
            (returnState & -2) == 0 && (this$static.cstart = pos);
            state = returnState;
            reconsume = true;
            continue stateloop;
          }
          $appendStrBuf(this$static, c);
          this$static.lo = hilo & 65535;
          this$static.hi = hilo >> 16;
          this$static.entCol = -1;
          this$static.candidate = -1;
          this$static.strBufMark = 0;
          state = 44;
        }

      case 44:
        outer: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          if (c == 0) {
            break stateloop;
          }
          ++this$static.entCol;
          loloop: for (;;) {
            if (this$static.hi < this$static.lo) {
              break outer;
            }
            if (this$static.entCol == ($clinit_131() , NAMES)[this$static.lo].length) {
              this$static.candidate = this$static.lo;
              this$static.strBufMark = this$static.strBufLen;
              ++this$static.lo;
            }
             else if (this$static.entCol > NAMES[this$static.lo].length) {
              break outer;
            }
             else if (c > NAMES[this$static.lo][this$static.entCol]) {
              ++this$static.lo;
            }
             else {
              break loloop;
            }
          }
          hiloop: for (;;) {
            if (this$static.hi < this$static.lo) {
              break outer;
            }
            if (this$static.entCol == ($clinit_131() , NAMES)[this$static.hi].length) {
              break hiloop;
            }
            if (this$static.entCol > NAMES[this$static.hi].length) {
              break outer;
            }
             else if (c < NAMES[this$static.hi][this$static.entCol]) {
              --this$static.hi;
            }
             else {
              break hiloop;
            }
          }
          if (this$static.hi < this$static.lo) {
            break outer;
          }
          $appendStrBuf(this$static, c);
          continue;
        }

        if (this$static.candidate == -1) {
          (returnState & -2) != 0?$appendLongStrBuf_0(this$static, this$static.strBuf, 0, this$static.strBufLen):$emitStrBuf(this$static);
          (returnState & -2) == 0 && (this$static.cstart = pos);
          state = returnState;
          reconsume = true;
          continue stateloop;
        }
         else {
          candidateArr = ($clinit_131() , NAMES)[this$static.candidate];
          if (candidateArr.length == 0 || candidateArr[candidateArr.length - 1] != 59) {
            if ((returnState & -2) != 0) {
              this$static.strBufMark == this$static.strBufLen?(ch = c):(ch = this$static.strBuf[this$static.strBufMark]);
              if (ch == 61 || ch >= 48 && ch <= 57 || ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122) {
                $appendLongStrBuf_0(this$static, this$static.strBuf, 0, this$static.strBufLen);
                state = returnState;
                reconsume = true;
                continue stateloop;
              }
            }
          }
          val = VALUES_0[this$static.candidate];
          (val[0] & 64512) == 55296?$emitOrAppendTwo(this$static, val, returnState):((returnState & -2) != 0?$appendLongStrBuf(this$static, val[0]):$characters(this$static.tokenHandler, val, 0, 1) , undefined);
          if (this$static.strBufMark < this$static.strBufLen) {
            if ((returnState & -2) != 0) {
              for (i = this$static.strBufMark; i < this$static.strBufLen; ++i) {
                $appendLongStrBuf(this$static, this$static.strBuf[i]);
              }
            }
             else {
              $characters(this$static.tokenHandler, this$static.strBuf, this$static.strBufMark, this$static.strBufLen - this$static.strBufMark);
            }
          }
          (returnState & -2) == 0 && (this$static.cstart = pos);
          state = returnState;
          reconsume = true;
          continue stateloop;
        }

      case 43:
        if (++pos == endPos) {
          break stateloop;
        }

        c = $checkChar(this$static, buf, pos);
        this$static.prevValue = -1;
        this$static.value = 0;
        this$static.seenDigits = false;
        switch (c) {
          case 120:
          case 88:
            $appendStrBuf(this$static, c);
            state = 45;
            continue stateloop;
          default:state = 46;
            reconsume = true;
        }

      case 46:
        decimalloop: for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          this$static.value < this$static.prevValue && (this$static.value = 1114112);
          this$static.prevValue = this$static.value;
          if (c >= 48 && c <= 57) {
            this$static.seenDigits = true;
            this$static.value *= 10;
            this$static.value += c - 48;
            continue;
          }
           else if (c == 59) {
            if (this$static.seenDigits) {
              (returnState & -2) == 0 && (this$static.cstart = pos + 1);
              state = 47;
              break decimalloop;
            }
             else {
              $err('No digits after \u201C' + valueOf_0(this$static.strBuf, 0, this$static.strBufLen) + '\u201D.');
              $appendStrBuf(this$static, 59);
              (returnState & -2) != 0?$appendLongStrBuf_0(this$static, this$static.strBuf, 0, this$static.strBufLen):$emitStrBuf(this$static);
              (returnState & -2) == 0 && (this$static.cstart = pos + 1);
              state = returnState;
              continue stateloop;
            }
          }
           else {
            if (this$static.seenDigits) {
              (returnState & -2) == 0 && (this$static.cstart = pos);
              state = 47;
              reconsume = true;
              break decimalloop;
            }
             else {
              $err('No digits after \u201C' + valueOf_0(this$static.strBuf, 0, this$static.strBufLen) + '\u201D.');
              (returnState & -2) != 0?$appendLongStrBuf_0(this$static, this$static.strBuf, 0, this$static.strBufLen):$emitStrBuf(this$static);
              (returnState & -2) == 0 && (this$static.cstart = pos);
              state = returnState;
              reconsume = true;
              continue stateloop;
            }
          }
        }

      case 47:
        $handleNcrValue(this$static, returnState);
        state = returnState;
        continue stateloop;
      case 45:
        for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          this$static.value < this$static.prevValue && (this$static.value = 1114112);
          this$static.prevValue = this$static.value;
          if (c >= 48 && c <= 57) {
            this$static.seenDigits = true;
            this$static.value *= 16;
            this$static.value += c - 48;
            continue;
          }
           else if (c >= 65 && c <= 70) {
            this$static.seenDigits = true;
            this$static.value *= 16;
            this$static.value += c - 65 + 10;
            continue;
          }
           else if (c >= 97 && c <= 102) {
            this$static.seenDigits = true;
            this$static.value *= 16;
            this$static.value += c - 97 + 10;
            continue;
          }
           else if (c == 59) {
            if (this$static.seenDigits) {
              (returnState & -2) == 0 && (this$static.cstart = pos + 1);
              state = 47;
              continue stateloop;
            }
             else {
              $err('No digits after \u201C' + valueOf_0(this$static.strBuf, 0, this$static.strBufLen) + '\u201D.');
              $appendStrBuf(this$static, 59);
              (returnState & -2) != 0?$appendLongStrBuf_0(this$static, this$static.strBuf, 0, this$static.strBufLen):$emitStrBuf(this$static);
              (returnState & -2) == 0 && (this$static.cstart = pos + 1);
              state = returnState;
              continue stateloop;
            }
          }
           else {
            if (this$static.seenDigits) {
              (returnState & -2) == 0 && (this$static.cstart = pos);
              state = 47;
              reconsume = true;
              continue stateloop;
            }
             else {
              $err('No digits after \u201C' + valueOf_0(this$static.strBuf, 0, this$static.strBufLen) + '\u201D.');
              (returnState & -2) != 0?$appendLongStrBuf_0(this$static, this$static.strBuf, 0, this$static.strBufLen):$emitStrBuf(this$static);
              (returnState & -2) == 0 && (this$static.cstart = pos);
              state = returnState;
              reconsume = true;
              continue stateloop;
            }
          }
        }

      case 3:
        plaintextloop: for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          switch (c) {
            case 0:
              $flushChars(this$static, buf, pos);
              $zeroOriginatingReplacementCharacter(this$static.tokenHandler);
              this$static.cstart = pos + 1;
              continue;
            case 13:
              $emitCarriageReturn(this$static, buf, pos);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            default:continue;
          }
        }

      case 5:
        if (++pos == endPos) {
          break stateloop;
        }

        c = $checkChar(this$static, buf, pos);
        switch (c) {
          case 62:
            this$static.cstart = pos + 1;
            state = 0;
            continue stateloop;
          case 13:
            this$static.nextCharOnNewLine = true;
            this$static.lastCR = true;
            this$static.longStrBuf[0] = 10;
            this$static.longStrBufLen = 1;
            state = 15;
            break stateloop;
          case 10:
            this$static.nextCharOnNewLine = true;
            this$static.longStrBuf[0] = 10;
            this$static.longStrBufLen = 1;
            state = 15;
            continue stateloop;
          case 0:
            c = 65533;
          default:c >= 65 && c <= 90 && (c += 32);
            if (c >= 97 && c <= 122) {
              this$static.endTag = true;
              this$static.strBuf[0] = c;
              this$static.strBufLen = 1;
              state = 6;
              continue stateloop;
            }
             else {
              this$static.longStrBuf[0] = c;
              this$static.longStrBufLen = 1;
              state = 15;
              continue stateloop;
            }

        }

      case 1:
        rcdataloop: for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          switch (c) {
            case 38:
              $flushChars(this$static, buf, pos);
              this$static.strBuf[0] = c;
              this$static.strBufLen = 1;
              this$static.additional = 0;
              returnState = state;
              state = 42;
              continue stateloop;
            case 60:
              $flushChars(this$static, buf, pos);
              returnState = state;
              state = 61;
              continue stateloop;
            case 0:
              $flushChars(this$static, buf, pos);
              $zeroOriginatingReplacementCharacter(this$static.tokenHandler);
              this$static.cstart = pos + 1;
              continue;
            case 13:
              $emitCarriageReturn(this$static, buf, pos);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            default:continue;
          }
        }

      case 60:
        rawtextloop: for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          switch (c) {
            case 60:
              $flushChars(this$static, buf, pos);
              returnState = state;
              state = 61;
              break rawtextloop;
            case 0:
              $flushChars(this$static, buf, pos);
              $zeroOriginatingReplacementCharacter(this$static.tokenHandler);
              this$static.cstart = pos + 1;
              continue;
            case 13:
              $emitCarriageReturn(this$static, buf, pos);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            default:continue;
          }
        }

      case 61:
        rawtextrcdatalessthansignloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 47:
              this$static.index = 0;
              this$static.strBufLen = 0;
              state = 37;
              break rawtextrcdatalessthansignloop;
            default:$characters(this$static.tokenHandler, LT_GT, 0, 1);
              this$static.cstart = pos;
              state = returnState;
              reconsume = true;
              continue stateloop;
          }
        }

      case 37:
        for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          if (this$static.index < this$static.endTagExpectationAsArray.length) {
            e = this$static.endTagExpectationAsArray[this$static.index];
            folded = c;
            c >= 65 && c <= 90 && (folded += 32);
            if (folded != e) {
              this$static.html4 && (this$static.index > 0 || folded >= 97 && folded <= 122) && ($clinit_125() , IFRAME) != this$static.endTagExpectation;
              $characters(this$static.tokenHandler, LT_SOLIDUS, 0, 2);
              $emitStrBuf(this$static);
              this$static.cstart = pos;
              state = returnState;
              reconsume = true;
              continue stateloop;
            }
            $appendStrBuf(this$static, c);
            ++this$static.index;
            continue;
          }
           else {
            this$static.endTag = true;
            this$static.tagName = this$static.endTagExpectation;
            switch (c) {
              case 13:
                this$static.nextCharOnNewLine = true;
                this$static.lastCR = true;
                state = 7;
                break stateloop;
              case 10:
                this$static.nextCharOnNewLine = true;
              case 32:
              case 9:
              case 12:
                state = 7;
                continue stateloop;
              case 47:
                state = 48;
                continue stateloop;
              case 62:
                state = $emitCurrentTagToken(this$static, false, pos);
                if (this$static.shouldSuspend) {
                  break stateloop;
                }

                continue stateloop;
              default:$characters(this$static.tokenHandler, LT_SOLIDUS, 0, 2);
                $emitStrBuf(this$static);
                c == 0?($flushChars(this$static, buf, pos) , $zeroOriginatingReplacementCharacter(this$static.tokenHandler) , this$static.cstart = pos + 1 , undefined):(this$static.cstart = pos);
                state = returnState;
                continue stateloop;
            }
          }
        }

      case 15:
        boguscommentloop: for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          switch (c) {
            case 62:
              this$static.wantsComments && $comment(this$static.tokenHandler, this$static.longStrBuf, 0, this$static.longStrBufLen - 0);
              this$static.cstart = pos + 1;
              state = 0;
              continue stateloop;
            case 45:
              $appendLongStrBuf(this$static, c);
              state = 59;
              break boguscommentloop;
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              $appendLongStrBuf(this$static, 10);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
              $appendLongStrBuf(this$static, 10);
              continue;
            case 0:
              c = 65533;
            default:$appendLongStrBuf(this$static, c);
              continue;
          }
        }

      case 59:
        boguscommenthyphenloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 62:
              $maybeAppendSpaceToBogusComment(this$static);
              this$static.wantsComments && $comment(this$static.tokenHandler, this$static.longStrBuf, 0, this$static.longStrBufLen - 0);
              this$static.cstart = pos + 1;
              state = 0;
              continue stateloop;
            case 45:
              $appendSecondHyphenToBogusComment(this$static);
              continue boguscommenthyphenloop;
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              $appendLongStrBuf(this$static, 10);
              state = 15;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
              $appendLongStrBuf(this$static, 10);
              state = 15;
              continue stateloop;
            case 0:
              c = 65533;
            default:$appendLongStrBuf(this$static, c);
              state = 15;
              continue stateloop;
          }
        }

      case 2:
        scriptdataloop: for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          switch (c) {
            case 60:
              $flushChars(this$static, buf, pos);
              returnState = state;
              state = 53;
              break scriptdataloop;
            case 0:
              $flushChars(this$static, buf, pos);
              $zeroOriginatingReplacementCharacter(this$static.tokenHandler);
              this$static.cstart = pos + 1;
              continue;
            case 13:
              $emitCarriageReturn(this$static, buf, pos);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            default:continue;
          }
        }

      case 53:
        scriptdatalessthansignloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 47:
              this$static.index = 0;
              this$static.strBufLen = 0;
              state = 37;
              continue stateloop;
            case 33:
              $characters(this$static.tokenHandler, LT_GT, 0, 1);
              this$static.cstart = pos;
              state = 54;
              break scriptdatalessthansignloop;
            default:$characters(this$static.tokenHandler, LT_GT, 0, 1);
              this$static.cstart = pos;
              state = 2;
              reconsume = true;
              continue stateloop;
          }
        }

      case 54:
        scriptdataescapestartloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 45:
              state = 55;
              break scriptdataescapestartloop;
            default:state = 2;
              reconsume = true;
              continue stateloop;
          }
        }

      case 55:
        scriptdataescapestartdashloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 45:
              state = 58;
              break scriptdataescapestartdashloop;
            default:state = 2;
              reconsume = true;
              continue stateloop;
          }
        }

      case 58:
        scriptdataescapeddashdashloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 45:
              continue;
            case 60:
              $flushChars(this$static, buf, pos);
              state = 65;
              continue stateloop;
            case 62:
              state = 2;
              continue stateloop;
            case 0:
              $flushChars(this$static, buf, pos);
              $zeroOriginatingReplacementCharacter(this$static.tokenHandler);
              this$static.cstart = pos + 1;
              state = 56;
              break scriptdataescapeddashdashloop;
            case 13:
              $emitCarriageReturn(this$static, buf, pos);
              state = 56;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            default:state = 56;
              break scriptdataescapeddashdashloop;
          }
        }

      case 56:
        scriptdataescapedloop: for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          switch (c) {
            case 45:
              state = 57;
              break scriptdataescapedloop;
            case 60:
              $flushChars(this$static, buf, pos);
              state = 65;
              continue stateloop;
            case 0:
              $flushChars(this$static, buf, pos);
              $zeroOriginatingReplacementCharacter(this$static.tokenHandler);
              this$static.cstart = pos + 1;
              continue;
            case 13:
              $emitCarriageReturn(this$static, buf, pos);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            default:continue;
          }
        }

      case 57:
        scriptdataescapeddashloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 45:
              state = 58;
              continue stateloop;
            case 60:
              $flushChars(this$static, buf, pos);
              state = 65;
              break scriptdataescapeddashloop;
            case 0:
              $flushChars(this$static, buf, pos);
              $zeroOriginatingReplacementCharacter(this$static.tokenHandler);
              this$static.cstart = pos + 1;
              state = 56;
              continue stateloop;
            case 13:
              $emitCarriageReturn(this$static, buf, pos);
              state = 56;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            default:state = 56;
              continue stateloop;
          }
        }

      case 65:
        scriptdataescapedlessthanloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 47:
              this$static.index = 0;
              this$static.strBufLen = 0;
              returnState = 56;
              state = 37;
              continue stateloop;
            case 83:
            case 115:
              $characters(this$static.tokenHandler, LT_GT, 0, 1);
              this$static.cstart = pos;
              this$static.index = 1;
              state = 66;
              break scriptdataescapedlessthanloop;
            default:$characters(this$static.tokenHandler, LT_GT, 0, 1);
              this$static.cstart = pos;
              reconsume = true;
              state = 56;
              continue stateloop;
          }
        }

      case 66:
        scriptdatadoubleescapestartloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          if (this$static.index < 6) {
            folded = c;
            c >= 65 && c <= 90 && (folded += 32);
            if (folded != SCRIPT_ARR[this$static.index]) {
              reconsume = true;
              state = 56;
              continue stateloop;
            }
            ++this$static.index;
            continue;
          }
          switch (c) {
            case 13:
              $emitCarriageReturn(this$static, buf, pos);
              state = 67;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
            case 47:
            case 62:
              state = 67;
              break scriptdatadoubleescapestartloop;
            default:reconsume = true;
              state = 56;
              continue stateloop;
          }
        }

      case 67:
        scriptdatadoubleescapedloop: for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          switch (c) {
            case 45:
              state = 69;
              break scriptdatadoubleescapedloop;
            case 60:
              state = 68;
              continue stateloop;
            case 0:
              $flushChars(this$static, buf, pos);
              $zeroOriginatingReplacementCharacter(this$static.tokenHandler);
              this$static.cstart = pos + 1;
              continue;
            case 13:
              $emitCarriageReturn(this$static, buf, pos);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            default:continue;
          }
        }

      case 69:
        scriptdatadoubleescapeddashloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 45:
              state = 70;
              break scriptdatadoubleescapeddashloop;
            case 60:
              state = 68;
              continue stateloop;
            case 0:
              $flushChars(this$static, buf, pos);
              $zeroOriginatingReplacementCharacter(this$static.tokenHandler);
              this$static.cstart = pos + 1;
              state = 67;
              continue stateloop;
            case 13:
              $emitCarriageReturn(this$static, buf, pos);
              state = 67;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            default:state = 67;
              continue stateloop;
          }
        }

      case 70:
        scriptdatadoubleescapeddashdashloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 45:
              continue;
            case 60:
              state = 68;
              break scriptdatadoubleescapeddashdashloop;
            case 62:
              state = 2;
              continue stateloop;
            case 0:
              $flushChars(this$static, buf, pos);
              $zeroOriginatingReplacementCharacter(this$static.tokenHandler);
              this$static.cstart = pos + 1;
              state = 67;
              continue stateloop;
            case 13:
              $emitCarriageReturn(this$static, buf, pos);
              state = 67;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            default:state = 67;
              continue stateloop;
          }
        }

      case 68:
        scriptdatadoubleescapedlessthanloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 47:
              this$static.index = 0;
              state = 71;
              break scriptdatadoubleescapedlessthanloop;
            default:reconsume = true;
              state = 67;
              continue stateloop;
          }
        }

      case 71:
        scriptdatadoubleescapeendloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          if (this$static.index < 6) {
            folded = c;
            c >= 65 && c <= 90 && (folded += 32);
            if (folded != SCRIPT_ARR[this$static.index]) {
              reconsume = true;
              state = 67;
              continue stateloop;
            }
            ++this$static.index;
            continue;
          }
          switch (c) {
            case 13:
              $emitCarriageReturn(this$static, buf, pos);
              state = 56;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
            case 47:
            case 62:
              state = 56;
              continue stateloop;
            default:reconsume = true;
              state = 67;
              continue stateloop;
          }
        }

      case 39:
        markupdeclarationdoctypeloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          if (this$static.index < 6) {
            folded = c;
            c >= 65 && c <= 90 && (folded += 32);
            if (folded == OCTYPE[this$static.index]) {
              $appendLongStrBuf(this$static, c);
            }
             else {
              state = 15;
              reconsume = true;
              continue stateloop;
            }
            ++this$static.index;
            continue;
          }
           else {
            state = 17;
            reconsume = true;
            break markupdeclarationdoctypeloop;
          }
        }

      case 17:
        doctypeloop: for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          $initDoctypeFields(this$static);
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              state = 18;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              state = 18;
              break doctypeloop;
            default:state = 18;
              reconsume = true;
              break doctypeloop;
          }
        }

      case 18:
        beforedoctypenameloop: for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              continue;
            case 62:
              this$static.forceQuirks = true;
              $emitDoctypeToken(this$static, pos);
              state = 0;
              continue stateloop;
            case 0:
              c = 65533;
            default:c >= 65 && c <= 90 && (c += 32);
              this$static.strBuf[0] = c;
              this$static.strBufLen = 1;
              state = 19;
              break beforedoctypenameloop;
          }
        }

      case 19:
        doctypenameloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              this$static.doctypeName = String(valueOf_0(this$static.strBuf, 0, this$static.strBufLen));
              state = 20;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              this$static.doctypeName = String(valueOf_0(this$static.strBuf, 0, this$static.strBufLen));
              state = 20;
              break doctypenameloop;
            case 62:
              this$static.doctypeName = String(valueOf_0(this$static.strBuf, 0, this$static.strBufLen));
              $emitDoctypeToken(this$static, pos);
              state = 0;
              continue stateloop;
            case 0:
              c = 65533;
            default:c >= 65 && c <= 90 && (c += 32);
              $appendStrBuf(this$static, c);
              continue;
          }
        }

      case 20:
        afterdoctypenameloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              continue;
            case 62:
              $emitDoctypeToken(this$static, pos);
              state = 0;
              continue stateloop;
            case 112:
            case 80:
              this$static.index = 0;
              state = 40;
              break afterdoctypenameloop;
            case 115:
            case 83:
              this$static.index = 0;
              state = 41;
              continue stateloop;
            default:this$static.forceQuirks = true;
              state = 29;
              continue stateloop;
          }
        }

      case 40:
        doctypeublicloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          if (this$static.index < 5) {
            folded = c;
            c >= 65 && c <= 90 && (folded += 32);
            if (folded != UBLIC[this$static.index]) {
              this$static.forceQuirks = true;
              state = 29;
              reconsume = true;
              continue stateloop;
            }
            ++this$static.index;
            continue;
          }
           else {
            state = 62;
            reconsume = true;
            break doctypeublicloop;
          }
        }

      case 62:
        afterdoctypepublickeywordloop: for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              state = 21;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              state = 21;
              break afterdoctypepublickeywordloop;
            case 34:
              this$static.longStrBufLen = 0;
              state = 22;
              continue stateloop;
            case 39:
              this$static.longStrBufLen = 0;
              state = 23;
              continue stateloop;
            case 62:
              this$static.forceQuirks = true;
              $emitDoctypeToken(this$static, pos);
              state = 0;
              continue stateloop;
            default:this$static.forceQuirks = true;
              state = 29;
              continue stateloop;
          }
        }

      case 21:
        beforedoctypepublicidentifierloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              continue;
            case 34:
              this$static.longStrBufLen = 0;
              state = 22;
              break beforedoctypepublicidentifierloop;
            case 39:
              this$static.longStrBufLen = 0;
              state = 23;
              continue stateloop;
            case 62:
              this$static.forceQuirks = true;
              $emitDoctypeToken(this$static, pos);
              state = 0;
              continue stateloop;
            default:this$static.forceQuirks = true;
              state = 29;
              continue stateloop;
          }
        }

      case 22:
        doctypepublicidentifierdoublequotedloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 34:
              this$static.publicIdentifier = valueOf_0(this$static.longStrBuf, 0, this$static.longStrBufLen);
              state = 24;
              break doctypepublicidentifierdoublequotedloop;
            case 62:
              this$static.forceQuirks = true;
              this$static.publicIdentifier = valueOf_0(this$static.longStrBuf, 0, this$static.longStrBufLen);
              $emitDoctypeToken(this$static, pos);
              state = 0;
              continue stateloop;
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              $appendLongStrBuf(this$static, 10);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
              $appendLongStrBuf(this$static, 10);
              continue;
            case 0:
              c = 65533;
            default:$appendLongStrBuf(this$static, c);
              continue;
          }
        }

      case 24:
        afterdoctypepublicidentifierloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              state = 63;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              state = 63;
              break afterdoctypepublicidentifierloop;
            case 62:
              $emitDoctypeToken(this$static, pos);
              state = 0;
              continue stateloop;
            case 34:
              this$static.longStrBufLen = 0;
              state = 26;
              continue stateloop;
            case 39:
              this$static.longStrBufLen = 0;
              state = 27;
              continue stateloop;
            default:this$static.forceQuirks = true;
              state = 29;
              continue stateloop;
          }
        }

      case 63:
        betweendoctypepublicandsystemidentifiersloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              continue;
            case 62:
              $emitDoctypeToken(this$static, pos);
              state = 0;
              continue stateloop;
            case 34:
              this$static.longStrBufLen = 0;
              state = 26;
              break betweendoctypepublicandsystemidentifiersloop;
            case 39:
              this$static.longStrBufLen = 0;
              state = 27;
              continue stateloop;
            default:this$static.forceQuirks = true;
              state = 29;
              continue stateloop;
          }
        }

      case 26:
        doctypesystemidentifierdoublequotedloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 34:
              this$static.systemIdentifier = valueOf_0(this$static.longStrBuf, 0, this$static.longStrBufLen);
              state = 28;
              continue stateloop;
            case 62:
              this$static.forceQuirks = true;
              this$static.systemIdentifier = valueOf_0(this$static.longStrBuf, 0, this$static.longStrBufLen);
              $emitDoctypeToken(this$static, pos);
              state = 0;
              continue stateloop;
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              $appendLongStrBuf(this$static, 10);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
              $appendLongStrBuf(this$static, 10);
              continue;
            case 0:
              c = 65533;
            default:$appendLongStrBuf(this$static, c);
              continue;
          }
        }

      case 28:
        afterdoctypesystemidentifierloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              continue;
            case 62:
              $emitDoctypeToken(this$static, pos);
              state = 0;
              continue stateloop;
            default:this$static.forceQuirks = false;
              state = 29;
              break afterdoctypesystemidentifierloop;
          }
        }

      case 29:
        for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          switch (c) {
            case 62:
              $emitDoctypeToken(this$static, pos);
              state = 0;
              continue stateloop;
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            default:continue;
          }
        }

      case 41:
        doctypeystemloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          if (this$static.index < 5) {
            folded = c;
            c >= 65 && c <= 90 && (folded += 32);
            if (folded != YSTEM[this$static.index]) {
              this$static.forceQuirks = true;
              state = 29;
              reconsume = true;
              continue stateloop;
            }
            ++this$static.index;
            continue stateloop;
          }
           else {
            state = 64;
            reconsume = true;
            break doctypeystemloop;
          }
        }

      case 64:
        afterdoctypesystemkeywordloop: for (;;) {
          if (reconsume) {
            reconsume = false;
          }
           else {
            if (++pos == endPos) {
              break stateloop;
            }
            c = $checkChar(this$static, buf, pos);
          }
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              state = 25;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              state = 25;
              break afterdoctypesystemkeywordloop;
            case 34:
              this$static.longStrBufLen = 0;
              state = 26;
              continue stateloop;
            case 39:
              this$static.longStrBufLen = 0;
              state = 27;
              continue stateloop;
            case 62:
              this$static.forceQuirks = true;
              $emitDoctypeToken(this$static, pos);
              state = 0;
              continue stateloop;
            default:this$static.forceQuirks = true;
              state = 29;
              continue stateloop;
          }
        }

      case 25:
        beforedoctypesystemidentifierloop: for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
            case 32:
            case 9:
            case 12:
              continue;
            case 34:
              this$static.longStrBufLen = 0;
              state = 26;
              continue stateloop;
            case 39:
              this$static.longStrBufLen = 0;
              state = 27;
              break beforedoctypesystemidentifierloop;
            case 62:
              this$static.forceQuirks = true;
              $emitDoctypeToken(this$static, pos);
              state = 0;
              continue stateloop;
            default:this$static.forceQuirks = true;
              state = 29;
              continue stateloop;
          }
        }

      case 27:
        for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 39:
              this$static.systemIdentifier = valueOf_0(this$static.longStrBuf, 0, this$static.longStrBufLen);
              state = 28;
              continue stateloop;
            case 62:
              this$static.forceQuirks = true;
              this$static.systemIdentifier = valueOf_0(this$static.longStrBuf, 0, this$static.longStrBufLen);
              $emitDoctypeToken(this$static, pos);
              state = 0;
              continue stateloop;
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              $appendLongStrBuf(this$static, 10);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
              $appendLongStrBuf(this$static, 10);
              continue;
            case 0:
              c = 65533;
            default:$appendLongStrBuf(this$static, c);
              continue;
          }
        }

      case 23:
        for (;;) {
          if (++pos == endPos) {
            break stateloop;
          }
          c = $checkChar(this$static, buf, pos);
          switch (c) {
            case 39:
              this$static.publicIdentifier = valueOf_0(this$static.longStrBuf, 0, this$static.longStrBufLen);
              state = 24;
              continue stateloop;
            case 62:
              this$static.forceQuirks = true;
              this$static.publicIdentifier = valueOf_0(this$static.longStrBuf, 0, this$static.longStrBufLen);
              $emitDoctypeToken(this$static, pos);
              state = 0;
              continue stateloop;
            case 13:
              this$static.nextCharOnNewLine = true;
              this$static.lastCR = true;
              $appendLongStrBuf(this$static, 10);
              break stateloop;
            case 10:
              this$static.nextCharOnNewLine = true;
              $appendLongStrBuf(this$static, 10);
              continue;
            case 0:
              c = 65533;
            default:$appendLongStrBuf(this$static, c);
              continue;
          }
        }

    }
  }
  $flushChars(this$static, buf, pos);
  this$static.stateSave = state;
  this$static.returnStateSave = returnState;
  return pos;
}

function $tokenizeBuffer(this$static, buffer){
  var pos, returnState, start, state;
  state = this$static.stateSave;
  returnState = this$static.returnStateSave;
  this$static.shouldSuspend = false;
  this$static.lastCR = false;
  start = buffer.start;
  pos = start - 1;
  switch (state) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 60:
    case 50:
    case 56:
    case 54:
    case 55:
    case 57:
    case 58:
    case 66:
    case 67:
    case 68:
    case 69:
    case 70:
    case 71:
      this$static.cstart = start;
      break;
    default:this$static.cstart = 2147483647;
  }
  pos = $stateLoop(this$static, state, 0, pos, buffer.buffer, false, returnState, buffer.end);
  pos == buffer.end?(buffer.start = pos):(buffer.start = pos + 1);
  return this$static.lastCR;
}

function $warn(){
  return;
}

function getClass_69(){
  return Lnu_validator_htmlparser_impl_Tokenizer_2_classLit;
}

function newAsciiLowerCaseStringFromString(str){
  var buf, c, i;
  if (str == null) {
    return null;
  }
  buf = initDim(_3C_classLit, 47, -1, str.length, 1);
  for (i = 0; i < str.length; ++i) {
    c = str.charCodeAt(i);
    c >= 65 && c <= 90 && (c += 32);
    buf[i] = c;
  }
  return String.fromCharCode.apply(null, buf);
}

function Tokenizer(){
}

_ = Tokenizer.prototype = new Object_0;
_.getClass$ = getClass_69;
_.typeId$ = 0;
_.additional = 0;
_.astralChar = null;
_.attributeName = null;
_.attributes = null;
_.bmpChar = null;
_.candidate = 0;
_.confident = false;
_.cstart = 0;
_.doctypeName = null;
_.endTag = false;
_.endTagExpectation = null;
_.endTagExpectationAsArray = null;
_.entCol = 0;
_.firstCharKey = 0;
_.forceQuirks = false;
_.hi = 0;
_.html4 = false;
_.html4ModeCompatibleWithXhtml1Schemata = false;
_.index = 0;
_.lastCR = false;
_.lo = 0;
_.longStrBuf = null;
_.longStrBufLen = 0;
_.mappingLangToXmlLang = 0;
_.metaBoundaryPassed = false;
_.newAttributesEachTime = false;
_.prevValue = 0;
_.publicIdentifier = null;
_.returnStateSave = 0;
_.seenDigits = false;
_.shouldSuspend = false;
_.stateSave = 0;
_.strBuf = null;
_.strBufLen = 0;
_.strBufMark = 0;
_.systemIdentifier = null;
_.tagName = null;
_.tokenHandler = null;
_.value = 0;
_.wantsComments = false;
var CDATA_LSQB, IFRAME_ARR, LF, LT_GT, LT_SOLIDUS, NOEMBED_ARR, NOFRAMES_ARR, NOSCRIPT_ARR, OCTYPE, PLAINTEXT_ARR, REPLACEMENT_CHARACTER_0, RSQB_RSQB, SCRIPT_ARR, SPACE, STYLE_ARR, TEXTAREA_ARR, TITLE_ARR, UBLIC, XMP_ARR, YSTEM;

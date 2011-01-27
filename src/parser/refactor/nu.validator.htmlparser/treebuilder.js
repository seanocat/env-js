
function $clinit_116(){
  $clinit_116 = nullMethod;
  REPLACEMENT_CHARACTER = initValues(_3C_classLit, 47, -1, [65533]);
  HTML4_PUBLIC_IDS = initValues(_3Ljava_lang_String_2_classLit, 56, 1, ['-//W3C//DTD HTML 4.0 Frameset//EN', '-//W3C//DTD HTML 4.0 Transitional//EN', '-//W3C//DTD HTML 4.0//EN', '-//W3C//DTD HTML 4.01 Frameset//EN', '-//W3C//DTD HTML 4.01 Transitional//EN', '-//W3C//DTD HTML 4.01//EN']);
  QUIRKY_PUBLIC_IDS = initValues(_3Ljava_lang_String_2_classLit, 56, 1, ['+//silmaril//dtd html pro v0r11 19970101//', '-//advasoft ltd//dtd html 3.0 aswedit + extensions//', '-//as//dtd html 3.0 aswedit + extensions//', '-//ietf//dtd html 2.0 level 1//', '-//ietf//dtd html 2.0 level 2//', '-//ietf//dtd html 2.0 strict level 1//', '-//ietf//dtd html 2.0 strict level 2//', '-//ietf//dtd html 2.0 strict//', '-//ietf//dtd html 2.0//', '-//ietf//dtd html 2.1e//', '-//ietf//dtd html 3.0//', '-//ietf//dtd html 3.2 final//', '-//ietf//dtd html 3.2//', '-//ietf//dtd html 3//', '-//ietf//dtd html level 0//', '-//ietf//dtd html level 1//', '-//ietf//dtd html level 2//', '-//ietf//dtd html level 3//', '-//ietf//dtd html strict level 0//', '-//ietf//dtd html strict level 1//', '-//ietf//dtd html strict level 2//', '-//ietf//dtd html strict level 3//', '-//ietf//dtd html strict//', '-//ietf//dtd html//', '-//metrius//dtd metrius presentational//', '-//microsoft//dtd internet explorer 2.0 html strict//', '-//microsoft//dtd internet explorer 2.0 html//', '-//microsoft//dtd internet explorer 2.0 tables//', '-//microsoft//dtd internet explorer 3.0 html strict//', '-//microsoft//dtd internet explorer 3.0 html//', '-//microsoft//dtd internet explorer 3.0 tables//', '-//netscape comm. corp.//dtd html//', '-//netscape comm. corp.//dtd strict html//', "-//o'reilly and associates//dtd html 2.0//", "-//o'reilly and associates//dtd html extended 1.0//", "-//o'reilly and associates//dtd html extended relaxed 1.0//", '-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//', '-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//', '-//spyglass//dtd html 2.0 extended//', '-//sq//dtd html 2.0 hotmetal + extensions//', '-//sun microsystems corp.//dtd hotjava html//', '-//sun microsystems corp.//dtd hotjava strict html//', '-//w3c//dtd html 3 1995-03-24//', '-//w3c//dtd html 3.2 draft//', '-//w3c//dtd html 3.2 final//', '-//w3c//dtd html 3.2//', '-//w3c//dtd html 3.2s draft//', '-//w3c//dtd html 4.0 frameset//', '-//w3c//dtd html 4.0 transitional//', '-//w3c//dtd html experimental 19960712//', '-//w3c//dtd html experimental 970421//', '-//w3c//dtd w3 html//', '-//w3o//dtd w3 html 3.0//', '-//webtechs//dtd mozilla html 2.0//', '-//webtechs//dtd mozilla html//']);
}

function $accumulateCharacter(this$static, c){
  var newBuf, newLen;
  newLen = this$static.charBufferLen + 1;
  if (newLen > this$static.charBuffer.length) {
    newBuf = initDim(_3C_classLit, 47, -1, newLen, 1);
    arraycopy(this$static.charBuffer, 0, newBuf, 0, this$static.charBufferLen);
    this$static.charBuffer = newBuf;
  }
  this$static.charBuffer[this$static.charBufferLen] = c;
  this$static.charBufferLen = newLen;
}

function $addAttributesToBody(this$static, attributes){
  var body;
  $processNonNcNames(attributes, this$static, this$static.namePolicy);
  if (this$static.currentPtr >= 1) {
    body = this$static.stack_0[1];
    if (body.group == 3) {
      $addAttributesToElement(this$static, body.node, attributes);
      return true;
    }
  }
  return false;
}

function $adoptionAgencyEndTag(this$static, name_0){
  var bookmark, clone, commonAncestor, formattingClone, formattingElt, formattingEltListPos, formattingEltStackPos, furthestBlock, furthestBlockPos, inScope, lastNode, listNode, newNode, node, nodeListPos, nodePos;
  $flushCharacters(this$static);
  for (;;) {
    formattingEltListPos = this$static.listPtr;
    while (formattingEltListPos > -1) {
      listNode = this$static.listOfActiveFormattingElements[formattingEltListPos];
      if (!listNode) {
        formattingEltListPos = -1;
        break;
      }
       else if (listNode.name_0 == name_0) {
        break;
      }
      --formattingEltListPos;
    }
    if (formattingEltListPos == -1) {
      return;
    }
    formattingElt = this$static.listOfActiveFormattingElements[formattingEltListPos];
    formattingEltStackPos = this$static.currentPtr;
    inScope = true;
    while (formattingEltStackPos > -1) {
      node = this$static.stack_0[formattingEltStackPos];
      if (node == formattingElt) {
        break;
      }
       else 
        node.scoping && (inScope = false);
      --formattingEltStackPos;
    }
    if (formattingEltStackPos == -1) {
      $removeFromListOfActiveFormattingElements(this$static, formattingEltListPos);
      return;
    }
    if (!inScope) {
      return;
    }
    furthestBlockPos = formattingEltStackPos + 1;
    while (furthestBlockPos <= this$static.currentPtr) {
      node = this$static.stack_0[furthestBlockPos];
      if (node.scoping || node.special) {
        break;
      }
      ++furthestBlockPos;
    }
    if (furthestBlockPos > this$static.currentPtr) {
      while (this$static.currentPtr >= formattingEltStackPos) {
        $pop(this$static);
      }
      $removeFromListOfActiveFormattingElements(this$static, formattingEltListPos);
      return;
    }
    commonAncestor = this$static.stack_0[formattingEltStackPos - 1];
    furthestBlock = this$static.stack_0[furthestBlockPos];
    bookmark = formattingEltListPos;
    nodePos = furthestBlockPos;
    lastNode = furthestBlock;
    for (;;) {
      --nodePos;
      node = this$static.stack_0[nodePos];
      nodeListPos = $findInListOfActiveFormattingElements(this$static, node);
      if (nodeListPos == -1) {
        $removeFromStack(this$static, nodePos);
        --furthestBlockPos;
        continue;
      }
      if (nodePos == formattingEltStackPos) {
        break;
      }
      nodePos == furthestBlockPos && (bookmark = nodeListPos + 1);
      clone = $createElement(this$static, 'http://www.w3.org/1999/xhtml', node.name_0, $cloneAttributes(node.attributes));
      newNode = $StackNode(new StackNode, node.group, node.ns, node.name_0, clone, node.scoping, node.special, node.fosterParenting, node.popName, node.attributes);
      node.attributes = null;
      this$static.stack_0[nodePos] = newNode;
      ++newNode.refcount;
      this$static.listOfActiveFormattingElements[nodeListPos] = newNode;
      --node.refcount;
      --node.refcount;
      node = newNode;
      $detachFromParent(this$static, lastNode.node);
      $appendElement(this$static, lastNode.node, node.node);
      lastNode = node;
    }
    if (commonAncestor.fosterParenting) {
      $detachFromParent(this$static, lastNode.node);
      $insertIntoFosterParent(this$static, lastNode.node);
    }
     else {
      $detachFromParent(this$static, lastNode.node);
      $appendElement(this$static, lastNode.node, commonAncestor.node);
    }
    clone = $createElement(this$static, 'http://www.w3.org/1999/xhtml', formattingElt.name_0, $cloneAttributes(formattingElt.attributes));
    formattingClone = $StackNode(new StackNode, formattingElt.group, formattingElt.ns, formattingElt.name_0, clone, formattingElt.scoping, formattingElt.special, formattingElt.fosterParenting, formattingElt.popName, formattingElt.attributes);
    formattingElt.attributes = null;
    $appendChildrenToNewParent(this$static, furthestBlock.node, clone);
    $appendElement(this$static, clone, furthestBlock.node);
    $removeFromListOfActiveFormattingElements(this$static, formattingEltListPos);
    ++formattingClone.refcount;
    bookmark <= this$static.listPtr && arraycopy(this$static.listOfActiveFormattingElements, bookmark, this$static.listOfActiveFormattingElements, bookmark + 1, this$static.listPtr - bookmark + 1);
    ++this$static.listPtr;
    this$static.listOfActiveFormattingElements[bookmark] = formattingClone;
    $removeFromStack(this$static, formattingEltStackPos);
    $insertIntoStack(this$static, formattingClone, furthestBlockPos);
  }
}

function $append_3(this$static, node){
  var newList;
  ++this$static.listPtr;
  if (this$static.listPtr == this$static.listOfActiveFormattingElements.length) {
    newList = initDim(_3Lnu_validator_htmlparser_impl_StackNode_2_classLit, 62, 15, this$static.listOfActiveFormattingElements.length + 64, 0);
    arraycopy(this$static.listOfActiveFormattingElements, 0, newList, 0, this$static.listOfActiveFormattingElements.length);
    this$static.listOfActiveFormattingElements = newList;
  }
  this$static.listOfActiveFormattingElements[this$static.listPtr] = node;
}

function $appendHtmlElementToDocumentAndPush(this$static, attributes){
  var elt, node;
  $processNonNcNames(attributes, this$static, this$static.namePolicy);
  elt = $createHtmlElementSetAsRoot(this$static, attributes);
  node = $StackNode_0(new StackNode, 'http://www.w3.org/1999/xhtml', ($clinit_125() , HTML_0), elt);
  $push_0(this$static, node);
}

function $appendToCurrentNodeAndPushElement(this$static, ns, elementName, attributes){
  var elt, node;
  $flushCharacters(this$static);
  $processNonNcNames(attributes, this$static, this$static.namePolicy);
  elt = $createElement(this$static, ns, elementName.name_0, attributes);
  $appendElement(this$static, elt, this$static.stack_0[this$static.currentPtr].node);
  node = $StackNode_0(new StackNode, ns, elementName, elt);
  $push_0(this$static, node);
}

function $appendToCurrentNodeAndPushElementMayFoster(this$static, ns, elementName, attributes){
  var current, elt, node, popName;
  $flushCharacters(this$static);
  popName = elementName.name_0;
  $processNonNcNames(attributes, this$static, this$static.namePolicy);
  elementName.custom && (popName = $checkPopName(this$static, popName));
  elt = $createElement(this$static, ns, popName, attributes);
  current = this$static.stack_0[this$static.currentPtr];
  current.fosterParenting?$insertIntoFosterParent(this$static, elt):$appendElement(this$static, elt, current.node);
  node = $StackNode_2(new StackNode, ns, elementName, elt, popName);
  $push_0(this$static, node);
}

function $appendToCurrentNodeAndPushElementMayFoster_0(this$static, ns, elementName, attributes){
  var current, elt, node;
  $flushCharacters(this$static);
  $processNonNcNames(attributes, this$static, this$static.namePolicy);
  elt = $createElement_0(this$static, ns, elementName.name_0, attributes);
  current = this$static.stack_0[this$static.currentPtr];
  if (current) {
  current.fosterParenting?$insertIntoFosterParent(this$static, elt):$appendElement(this$static, elt, current.node);
  }
  node = $StackNode_0(new StackNode, ns, elementName, elt);
  $push_0(this$static, node);
}

function $appendToCurrentNodeAndPushFormElementMayFoster(this$static, attributes){
  var current, elt, node;
  $flushCharacters(this$static);
  $processNonNcNames(attributes, this$static, this$static.namePolicy);
  elt = $createElement(this$static, 'http://www.w3.org/1999/xhtml', 'form', attributes);
  this$static.formPointer = elt;
  current = this$static.stack_0[this$static.currentPtr];
  current.fosterParenting?$insertIntoFosterParent(this$static, elt):$appendElement(this$static, elt, current.node);
  node = $StackNode_0(new StackNode, 'http://www.w3.org/1999/xhtml', ($clinit_125() , FORM_0), elt);
  $push_0(this$static, node);
}

function $appendToCurrentNodeAndPushFormattingElementMayFoster(this$static, ns, elementName, attributes){
  var current, elt, node;
  $flushCharacters(this$static);
  $processNonNcNames(attributes, this$static, this$static.namePolicy);
  elt = $createElement(this$static, ns, elementName.name_0, attributes);
  current = this$static.stack_0[this$static.currentPtr];
  current.fosterParenting?$insertIntoFosterParent(this$static, elt):$appendElement(this$static, elt, current.node);
  node = $StackNode_1(new StackNode, ns, elementName, elt, $cloneAttributes(attributes));
  $push_0(this$static, node);
  $append_3(this$static, node);
  ++node.refcount;
}

function $appendToCurrentNodeAndPushHeadElement(this$static, attributes){
  var elt, node;
  $flushCharacters(this$static);
  $processNonNcNames(attributes, this$static, this$static.namePolicy);
  elt = $createElement(this$static, 'http://www.w3.org/1999/xhtml', 'head', attributes);
  $appendElement(this$static, elt, this$static.stack_0[this$static.currentPtr].node);
  this$static.headPointer = elt;
  node = $StackNode_0(new StackNode, 'http://www.w3.org/1999/xhtml', ($clinit_125() , HEAD), elt);
  $push_0(this$static, node);
}

function $appendVoidElementToCurrentMayFoster(this$static, ns, name_0, attributes){
  var current, elt;
  $flushCharacters(this$static);
  $processNonNcNames(attributes, this$static, this$static.namePolicy);
  elt = $createElement_0(this$static, ns, name_0, attributes);
  current = this$static.stack_0[this$static.currentPtr];
  current.fosterParenting?$insertIntoFosterParent(this$static, elt):$appendElement(this$static, elt, current.node);
  $elementPopped(this$static, ns, name_0, elt);
}

function $appendVoidElementToCurrentMayFoster_0(this$static, ns, elementName, attributes){
  var current, elt, popName;
  $flushCharacters(this$static);
  popName = elementName.name_0;
  $processNonNcNames(attributes, this$static, this$static.namePolicy);
  elementName.custom && (popName = $checkPopName(this$static, popName));
  elt = $createElement(this$static, ns, popName, attributes);
  current = this$static.stack_0[this$static.currentPtr];
  current.fosterParenting?$insertIntoFosterParent(this$static, elt):$appendElement(this$static, elt, current.node);
  $elementPopped(this$static, ns, popName, elt);
}

function $appendVoidElementToCurrentMayFosterCamelCase(this$static, ns, elementName, attributes){
  var current, elt, popName;
  $flushCharacters(this$static);
  popName = elementName.camelCaseName;
  $processNonNcNames(attributes, this$static, this$static.namePolicy);
  elementName.custom && (popName = $checkPopName(this$static, popName));
  elt = $createElement(this$static, ns, popName, attributes);
  current = this$static.stack_0[this$static.currentPtr];
  current.fosterParenting?$insertIntoFosterParent(this$static, elt):$appendElement(this$static, elt, current.node);
  $elementPopped(this$static, ns, popName, elt);
}

function $charBufferContainsNonWhitespace(this$static){
  var i;
  for (i = 0; i < this$static.charBufferLen; ++i) {
    switch (this$static.charBuffer[i]) {
      case 32:
      case 9:
      case 10:
      case 13:
      case 12:
        continue;
      default:return true;
    }
  }
  return false;
}

function $characters(this$static, buf, start, length_0){
  var end, i;
  if (this$static.needToDropLF) {
    if (buf[start] == 10) {
      ++start;
      --length_0;
      if (length_0 == 0) {
        return;
      }
    }
    this$static.needToDropLF = false;
  }
  if (this$static.inForeign) {
    $accumulateCharacters(this$static, buf, start, length_0);
    return;
  }
  switch (this$static.mode) {
    case 6:
    case 12:
    case 8:
      $reconstructTheActiveFormattingElements(this$static);
    case 20:
      $accumulateCharacters(this$static, buf, start, length_0);
      return;
    default:end = start + length_0;
      charactersloop: for (i = start; i < end; ++i) {
        switch (buf[i]) {
          case 32:
          case 9:
          case 10:
          case 13:
          case 12:
            switch (this$static.mode) {
              case 0:
              case 1:
              case 2:
                start = i + 1;
                continue;
              case 21:
              case 3:
              case 4:
              case 5:
              case 9:
              case 16:
              case 17:
                continue;
              case 6:
              case 12:
              case 8:
                if (start < i) {
                  $accumulateCharacters(this$static, buf, start, i - start);
                  start = i;
                }

                $reconstructTheActiveFormattingElements(this$static);
                break charactersloop;
              case 13:
              case 14:
                break charactersloop;
              case 7:
              case 10:
              case 11:
                $reconstructTheActiveFormattingElements(this$static);
                $accumulateCharacter(this$static, buf[i]);
                start = i + 1;
                continue;
              case 15:
                if (start < i) {
                  $accumulateCharacters(this$static, buf, start, i - start);
                  start = i;
                }

                $reconstructTheActiveFormattingElements(this$static);
                continue;
              case 18:
              case 19:
                if (start < i) {
                  $accumulateCharacters(this$static, buf, start, i - start);
                  start = i;
                }

                $reconstructTheActiveFormattingElements(this$static);
                continue;
            }

          default:switch (this$static.mode) {
              case 0:
                $documentModeInternal(this$static, ($clinit_113() , QUIRKS_MODE));
                this$static.mode = 1;
                --i;
                continue;
              case 1:
                $appendHtmlElementToDocumentAndPush(this$static, $emptyAttributes(this$static.tokenizer));
                this$static.mode = 2;
                --i;
                continue;
              case 2:
                if (start < i) {
                  $accumulateCharacters(this$static, buf, start, i - start);
                  start = i;
                }

                $appendToCurrentNodeAndPushHeadElement(this$static, ($clinit_128() , EMPTY_ATTRIBUTES));
                this$static.mode = 3;
                --i;
                continue;
              case 3:
                if (start < i) {
                  $accumulateCharacters(this$static, buf, start, i - start);
                  start = i;
                }

                $pop(this$static);
                this$static.mode = 5;
                --i;
                continue;
              case 4:
                if (start < i) {
                  $accumulateCharacters(this$static, buf, start, i - start);
                  start = i;
                }

                $pop(this$static);
                this$static.mode = 3;
                --i;
                continue;
              case 5:
                if (start < i) {
                  $accumulateCharacters(this$static, buf, start, i - start);
                  start = i;
                }

                $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', ($clinit_125() , BODY), $emptyAttributes(this$static.tokenizer));
                this$static.mode = 21;
                --i;
                continue;
              case 21:
                this$static.framesetOk = false;
                this$static.mode = 6;
                --i;
                continue;
              case 6:
              case 12:
              case 8:
                if (start < i) {
                  $accumulateCharacters(this$static, buf, start, i - start);
                  start = i;
                }

                $reconstructTheActiveFormattingElements(this$static);
                break charactersloop;
              case 7:
              case 10:
              case 11:
                $reconstructTheActiveFormattingElements(this$static);
                $accumulateCharacter(this$static, buf[i]);
                start = i + 1;
                continue;
              case 9:
                if (start < i) {
                  $accumulateCharacters(this$static, buf, start, i - start);
                  start = i;
                }

                if (this$static.currentPtr == 0) {
                  start = i + 1;
                  continue;
                }

                $pop(this$static);
                this$static.mode = 7;
                --i;
                continue;
              case 13:
              case 14:
                break charactersloop;
              case 15:
                this$static.mode = this$static.framesetOk?21:6;
                --i;
                continue;
              case 16:
                if (start < i) {
                  $accumulateCharacters(this$static, buf, start, i - start);
                  start = i;
                }

                start = i + 1;
                continue;
              case 17:
                if (start < i) {
                  $accumulateCharacters(this$static, buf, start, i - start);
                  start = i;
                }

                start = i + 1;
                continue;
              case 18:
                this$static.mode = this$static.framesetOk?21:6;
                --i;
                continue;
              case 19:
                this$static.mode = 16;
                --i;
                continue;
            }

        }
      }

      start < end && $accumulateCharacters(this$static, buf, start, end - start);
  }
}

function $checkMetaCharset(this$static, attributes){
  var content, internalCharsetHtml5, internalCharsetLegacy;
  content = $getValue_1(attributes, ($clinit_124() , CONTENT));
  internalCharsetLegacy = null;
  content != null && (internalCharsetLegacy = extractCharsetFromContent(content));
  if (internalCharsetLegacy == null) {
    internalCharsetHtml5 = $getValue_1(attributes, CHARSET);
    internalCharsetHtml5 != null && (this$static.tokenizer.shouldSuspend = true);
  }
   else {
    this$static.tokenizer.shouldSuspend = true;
  }
}

function $checkPopName(this$static, name_0){
  if (isNCName(name_0)) {
    return name_0;
  }
   else {
    switch (this$static.namePolicy.ordinal) {
      case 0:
        return name_0;
      case 2:
        return escapeName(name_0);
      case 1:
        $fatal_0(this$static, 'Element name \u201C' + name_0 + '\u201D cannot be represented as XML 1.0.');
    }
  }
  return null;
}

function $clearStackBackTo(this$static, eltPos){
  while (this$static.currentPtr > eltPos) {
    $pop(this$static);
  }
}

function $clearTheListOfActiveFormattingElementsUpToTheLastMarker(this$static){
  while (this$static.listPtr > -1) {
    if (!this$static.listOfActiveFormattingElements[this$static.listPtr]) {
      --this$static.listPtr;
      return;
    }
    --this$static.listOfActiveFormattingElements[this$static.listPtr].refcount;
    --this$static.listPtr;
  }
}

function $closeTheCell(this$static, eltPos){
  $generateImpliedEndTags(this$static);
  while (this$static.currentPtr >= eltPos) {
    $pop(this$static);
  }
  $clearTheListOfActiveFormattingElementsUpToTheLastMarker(this$static);
  this$static.mode = 11;
  return;
}

function $comment(this$static, buf, start, length_0){
  var end, end_0, end_1;
  this$static.needToDropLF = false;
  if (!this$static.wantingComments) {
    return;
  }
  if (!this$static.inForeign) {
    switch (this$static.mode) {
      case 0:
      case 1:
      case 18:
      case 19:
        $appendCommentToDocument(this$static, (end = start + length_0 , __checkBounds(buf.length, start, end) , __valueOf(buf, start, end)));
        return;
      case 15:
        $flushCharacters(this$static);
        $appendComment(this$static, this$static.stack_0[0].node, (end_0 = start + length_0 , __checkBounds(buf.length, start, end_0) , __valueOf(buf, start, end_0)));
        return;
    }
  }
  $flushCharacters(this$static);
  $appendComment(this$static, this$static.stack_0[this$static.currentPtr].node, (end_1 = start + length_0 , __checkBounds(buf.length, start, end_1) , __valueOf(buf, start, end_1)));
  return;
}

function $doctype(this$static, name_0, publicIdentifier, systemIdentifier, forceQuirks){
  this$static.needToDropLF = false;
  if (!this$static.inForeign) {
    switch (this$static.mode) {
      case 0:
        switch (this$static.doctypeExpectation.ordinal) {
          case 0:
            if ($isQuirky(name_0, publicIdentifier, systemIdentifier, forceQuirks)) {
              $documentModeInternal(this$static, ($clinit_113() , QUIRKS_MODE));
            }
             else if ($isAlmostStandards(publicIdentifier, systemIdentifier)) {
              $documentModeInternal(this$static, ($clinit_113() , ALMOST_STANDARDS_MODE));
            }
             else {
              $equals_1('-//W3C//DTD HTML 4.0//EN', publicIdentifier) && (systemIdentifier == null || $equals_1('http://www.w3.org/TR/REC-html40/strict.dtd', systemIdentifier)) || $equals_1('-//W3C//DTD HTML 4.01//EN', publicIdentifier) && (systemIdentifier == null || $equals_1('http://www.w3.org/TR/html4/strict.dtd', systemIdentifier)) || $equals_1('-//W3C//DTD XHTML 1.0 Strict//EN', publicIdentifier) && $equals_1('http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd', systemIdentifier) || $equals_1('-//W3C//DTD XHTML 1.1//EN', publicIdentifier) && $equals_1('http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd', systemIdentifier) || !((systemIdentifier == null || $equals_1('about:legacy-compat', systemIdentifier)) && publicIdentifier == null);
              $documentModeInternal(this$static, ($clinit_113() , STANDARDS_MODE));
            }

            break;
          case 2:
            this$static.html4 = true;
            this$static.tokenizer.html4 = true;
            if ($isQuirky(name_0, publicIdentifier, systemIdentifier, forceQuirks)) {
              $documentModeInternal(this$static, ($clinit_113() , QUIRKS_MODE));
            }
             else if ($isAlmostStandards(publicIdentifier, systemIdentifier)) {
              $documentModeInternal(this$static, ($clinit_113() , ALMOST_STANDARDS_MODE));
            }
             else {
              $equals_1('-//W3C//DTD HTML 4.01//EN', publicIdentifier) && !$equals_1('http://www.w3.org/TR/html4/strict.dtd', systemIdentifier);
              $documentModeInternal(this$static, ($clinit_113() , STANDARDS_MODE));
            }

            break;
          case 1:
            this$static.html4 = true;
            this$static.tokenizer.html4 = true;
            if ($isQuirky(name_0, publicIdentifier, systemIdentifier, forceQuirks)) {
              $documentModeInternal(this$static, ($clinit_113() , QUIRKS_MODE));
            }
             else if ($isAlmostStandards(publicIdentifier, systemIdentifier)) {
              $equals_1('-//W3C//DTD HTML 4.01 Transitional//EN', publicIdentifier) && systemIdentifier != null && !$equals_1('http://www.w3.org/TR/html4/loose.dtd', systemIdentifier);
              $documentModeInternal(this$static, ($clinit_113() , ALMOST_STANDARDS_MODE));
            }
             else {
              $documentModeInternal(this$static, ($clinit_113() , STANDARDS_MODE));
            }

            break;
          case 3:
            this$static.html4 = $isHtml4Doctype(publicIdentifier);
            this$static.html4 && (this$static.tokenizer.html4 = true);
            if ($isQuirky(name_0, publicIdentifier, systemIdentifier, forceQuirks)) {
              $documentModeInternal(this$static, ($clinit_113() , QUIRKS_MODE));
            }
             else if ($isAlmostStandards(publicIdentifier, systemIdentifier)) {
              $equals_1('-//W3C//DTD HTML 4.01 Transitional//EN', publicIdentifier) && !$equals_1('http://www.w3.org/TR/html4/loose.dtd', systemIdentifier);
              $documentModeInternal(this$static, ($clinit_113() , ALMOST_STANDARDS_MODE));
            }
             else {
              $equals_1('-//W3C//DTD HTML 4.01//EN', publicIdentifier) && !$equals_1('http://www.w3.org/TR/html4/strict.dtd', systemIdentifier);
              $documentModeInternal(this$static, ($clinit_113() , STANDARDS_MODE));
            }

            break;
          case 4:
            $isQuirky(name_0, publicIdentifier, systemIdentifier, forceQuirks)?$documentModeInternal(this$static, ($clinit_113() , QUIRKS_MODE)):$isAlmostStandards(publicIdentifier, systemIdentifier)?$documentModeInternal(this$static, ($clinit_113() , ALMOST_STANDARDS_MODE)):$documentModeInternal(this$static, ($clinit_113() , STANDARDS_MODE));
        }

        this$static.mode = 1;
        return;
    }
  }
  return;
}

function $documentModeInternal(this$static, m){
  this$static.quirks = m == ($clinit_113() , QUIRKS_MODE);
}

function $endTag(this$static, elementName){
  var eltPos, group, name_0, node, node_33;
  this$static.needToDropLF = false;
  group = elementName.group;
  name_0 = elementName.name_0;
  endtagloop: for (;;) {
    if (this$static.inForeign && this$static.stack_0[this$static.currentPtr].ns != 'http://www.w3.org/1999/xhtml') {
      eltPos = this$static.currentPtr;
      for (;;) {
        if (this$static.stack_0[eltPos].name_0 == name_0) {
          while (this$static.currentPtr >= eltPos) {
            $pop(this$static);
          }
          return;
        }
        if (this$static.stack_0[--eltPos].ns == 'http://www.w3.org/1999/xhtml') {
          break;
        }
      }
    }
    switch (this$static.mode) {
      case 11:
        switch (group) {
          case 37:
            eltPos = $findLastOrRoot_0(this$static, 37);
            if (eltPos == 0) {
              break endtagloop;
            }

            $clearStackBackTo(this$static, eltPos);
            $pop(this$static);
            this$static.mode = 10;
            break endtagloop;
          case 34:
            eltPos = $findLastOrRoot_0(this$static, 37);
            if (eltPos == 0) {
              break endtagloop;
            }

            $clearStackBackTo(this$static, eltPos);
            $pop(this$static);
            this$static.mode = 10;
            continue;
          case 39:
            if ($findLastInTableScope(this$static, name_0) == 2147483647) {
              break endtagloop;
            }

            eltPos = $findLastOrRoot_0(this$static, 37);
            if (eltPos == 0) {
              break endtagloop;
            }

            $clearStackBackTo(this$static, eltPos);
            $pop(this$static);
            this$static.mode = 10;
            continue;
          case 3:
          case 6:
          case 7:
          case 8:
          case 23:
          case 40:
            break endtagloop;
        }

      case 10:
        switch (group) {
          case 39:
            eltPos = $findLastOrRoot(this$static, name_0);
            if (eltPos == 0) {
              break endtagloop;
            }

            $clearStackBackTo(this$static, eltPos);
            $pop(this$static);
            this$static.mode = 7;
            break endtagloop;
          case 34:
            eltPos = $findLastInTableScopeOrRootTbodyTheadTfoot(this$static);
            if (eltPos == 0) {
              break endtagloop;
            }

            $clearStackBackTo(this$static, eltPos);
            $pop(this$static);
            this$static.mode = 7;
            continue;
          case 3:
          case 6:
          case 7:
          case 8:
          case 23:
          case 40:
          case 37:
            break endtagloop;
        }

      case 7:
        switch (group) {
          case 34:
            eltPos = $findLast(this$static, 'table');
            if (eltPos == 2147483647) {
              break endtagloop;
            }

            while (this$static.currentPtr >= eltPos) {
              $pop(this$static);
            }

            $resetTheInsertionMode(this$static);
            break endtagloop;
          case 3:
          case 6:
          case 7:
          case 8:
          case 23:
          case 39:
          case 40:
          case 37:
            break endtagloop;
        }

      case 8:
        switch (group) {
          case 6:
            eltPos = $findLastInTableScope(this$static, 'caption');
            if (eltPos == 2147483647) {
              break endtagloop;
            }

            $generateImpliedEndTags(this$static);
            while (this$static.currentPtr >= eltPos) {
              $pop(this$static);
            }

            $clearTheListOfActiveFormattingElementsUpToTheLastMarker(this$static);
            this$static.mode = 7;
            break endtagloop;
          case 34:
            eltPos = $findLastInTableScope(this$static, 'caption');
            if (eltPos == 2147483647) {
              break endtagloop;
            }

            $generateImpliedEndTags(this$static);
            while (this$static.currentPtr >= eltPos) {
              $pop(this$static);
            }

            $clearTheListOfActiveFormattingElementsUpToTheLastMarker(this$static);
            this$static.mode = 7;
            continue;
          case 3:
          case 7:
          case 8:
          case 23:
          case 39:
          case 40:
          case 37:
            break endtagloop;
        }

      case 12:
        switch (group) {
          case 40:
            eltPos = $findLastInTableScope(this$static, name_0);
            if (eltPos == 2147483647) {
              break endtagloop;
            }

            $generateImpliedEndTags(this$static);
            while (this$static.currentPtr >= eltPos) {
              $pop(this$static);
            }

            $clearTheListOfActiveFormattingElementsUpToTheLastMarker(this$static);
            this$static.mode = 11;
            break endtagloop;
          case 34:
          case 39:
          case 37:
            if ($findLastInTableScope(this$static, name_0) == 2147483647) {
              break endtagloop;
            }

            $closeTheCell(this$static, $findLastInTableScopeTdTh(this$static));
            continue;
          case 3:
          case 6:
          case 7:
          case 8:
          case 23:
            break endtagloop;
        }

      case 21:
      case 6:
        switch (group) {
          case 3:
            if (!(this$static.currentPtr >= 1 && this$static.stack_0[1].group == 3)) {
              break endtagloop;
            }

            this$static.mode = 15;
            break endtagloop;
          case 23:
            if (!(this$static.currentPtr >= 1 && this$static.stack_0[1].group == 3)) {
              break endtagloop;
            }

            this$static.mode = 15;
            continue;
          case 50:
          case 46:
          case 44:
          case 61:
          case 5:
          case 51:
            eltPos = $findLastInScope(this$static, name_0);
            if (!(eltPos == 2147483647)) {
              $generateImpliedEndTags(this$static);
              while (this$static.currentPtr >= eltPos) {
                $pop(this$static);
              }
            }

            break endtagloop;
          case 9:
            if (!this$static.formPointer) {
              break endtagloop;
            }

            this$static.formPointer = null;
            eltPos = $findLastInScope(this$static, name_0);
            if (eltPos == 2147483647) {
              break endtagloop;
            }

            $generateImpliedEndTags(this$static);
            $removeFromStack(this$static, eltPos);
            break endtagloop;
          case 29:
            eltPos = $findLastInScope(this$static, 'p');
            if (eltPos == 2147483647) {
              if (this$static.inForeign) {
                while (this$static.stack_0[this$static.currentPtr].ns != 'http://www.w3.org/1999/xhtml') {
                  $pop(this$static);
                }
                this$static.inForeign = false;
              }
              $appendVoidElementToCurrentMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, ($clinit_128() , EMPTY_ATTRIBUTES));
              break endtagloop;
            }

            $generateImpliedEndTagsExceptFor(this$static, 'p');
            while (this$static.currentPtr >= eltPos) {
              $pop(this$static);
            }

            break endtagloop;
          case 15:
            eltPos = $findLastInListScope(this$static, name_0);
            if (!(eltPos == 2147483647)) {
              $generateImpliedEndTagsExceptFor(this$static, name_0);
              while (this$static.currentPtr >= eltPos) {
                $pop(this$static);
              }
            }

            break endtagloop;
          case 41:
            eltPos = $findLastInScope(this$static, name_0);
            if (!(eltPos == 2147483647)) {
              $generateImpliedEndTagsExceptFor(this$static, name_0);
              while (this$static.currentPtr >= eltPos) {
                $pop(this$static);
              }
            }

            break endtagloop;
          case 42:
            eltPos = $findLastInScopeHn(this$static);
            if (!(eltPos == 2147483647)) {
              $generateImpliedEndTags(this$static);
              while (this$static.currentPtr >= eltPos) {
                $pop(this$static);
              }
            }

            break endtagloop;
          case 1:
          case 45:
          case 64:
          case 24:
            $adoptionAgencyEndTag(this$static, name_0);
            break endtagloop;
          case 63:
          case 43:
            eltPos = $findLastInScope(this$static, name_0);
            if (!(eltPos == 2147483647)) {
              $generateImpliedEndTags(this$static);
              while (this$static.currentPtr >= eltPos) {
                $pop(this$static);
              }
              $clearTheListOfActiveFormattingElementsUpToTheLastMarker(this$static);
            }

            break endtagloop;
          case 4:
            if (this$static.inForeign) {
              while (this$static.stack_0[this$static.currentPtr].ns != 'http://www.w3.org/1999/xhtml') {
                $pop(this$static);
              }
              this$static.inForeign = false;
            }

            $reconstructTheActiveFormattingElements(this$static);
            $appendVoidElementToCurrentMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, ($clinit_128() , EMPTY_ATTRIBUTES));
            break endtagloop;
          case 49:
          case 55:
          case 48:
          case 12:
          case 13:
          case 65:
          case 22:
          case 14:
          case 47:
          case 60:
          case 25:
          case 32:
          case 34:
          case 35:
            break endtagloop;
          case 26:
          default:if (name_0 == this$static.stack_0[this$static.currentPtr].name_0) {
              $pop(this$static);
              break endtagloop;
            }

            eltPos = this$static.currentPtr;
            for (;;) {
              node = this$static.stack_0[eltPos];
              if (node.name_0 == name_0) {
                $generateImpliedEndTags(this$static);
                while (this$static.currentPtr >= eltPos) {
                  $pop(this$static);
                }
                break endtagloop;
              }
               else if (node.scoping || node.special) {
                break endtagloop;
              }
              --eltPos;
            }

        }

      case 9:
        switch (group) {
          case 8:
            if (this$static.currentPtr == 0) {
              break endtagloop;
            }

            $pop(this$static);
            this$static.mode = 7;
            break endtagloop;
          case 7:
            break endtagloop;
          default:if (this$static.currentPtr == 0) {
              break endtagloop;
            }

            $pop(this$static);
            this$static.mode = 7;
            continue;
        }

      case 14:
        switch (group) {
          case 6:
          case 34:
          case 39:
          case 37:
          case 40:
            if ($findLastInTableScope(this$static, name_0) != 2147483647) {
              eltPos = $findLastInTableScope(this$static, 'select');
              if (eltPos == 2147483647) {
                break endtagloop;
              }
              while (this$static.currentPtr >= eltPos) {
                $pop(this$static);
              }
              $resetTheInsertionMode(this$static);
              continue;
            }
             else {
              break endtagloop;
            }

        }

      case 13:
        switch (group) {
          case 28:
            if ('option' == this$static.stack_0[this$static.currentPtr].name_0) {
              $pop(this$static);
              break endtagloop;
            }
             else {
              break endtagloop;
            }

          case 27:
            'option' == this$static.stack_0[this$static.currentPtr].name_0 && 'optgroup' == this$static.stack_0[this$static.currentPtr - 1].name_0 && $pop(this$static);
            'optgroup' == this$static.stack_0[this$static.currentPtr].name_0 && $pop(this$static);
            break endtagloop;
          case 32:
            eltPos = $findLastInTableScope(this$static, 'select');
            if (eltPos == 2147483647) {
              break endtagloop;
            }

            while (this$static.currentPtr >= eltPos) {
              $pop(this$static);
            }

            $resetTheInsertionMode(this$static);
            break endtagloop;
          default:break endtagloop;
        }

      case 15:
        switch (group) {
          case 23:
            if (this$static.fragment) {
              break endtagloop;
            }
             else {
              this$static.mode = 18;
              break endtagloop;
            }

          default:this$static.mode = this$static.framesetOk?21:6;
            continue;
        }

      case 16:
        switch (group) {
          case 11:
            if (this$static.currentPtr == 0) {
              break endtagloop;
            }

            $pop(this$static);
            !this$static.fragment && 'frameset' != this$static.stack_0[this$static.currentPtr].name_0 && (this$static.mode = 17);
            break endtagloop;
          default:break endtagloop;
        }

      case 17:
        switch (group) {
          case 23:
            this$static.mode = 19;
            break endtagloop;
          default:break endtagloop;
        }

      case 0:
        $documentModeInternal(this$static, ($clinit_113() , QUIRKS_MODE));
        this$static.mode = 1;
        continue;
      case 1:
        switch (group) {
          case 20:
          case 4:
          case 23:
          case 3:
            $appendHtmlElementToDocumentAndPush(this$static, $emptyAttributes(this$static.tokenizer));
            this$static.mode = 2;
            continue;
          default:break endtagloop;
        }

      case 2:
        switch (group) {
          case 20:
          case 4:
          case 23:
          case 3:
            $appendToCurrentNodeAndPushHeadElement(this$static, ($clinit_128() , EMPTY_ATTRIBUTES));
            this$static.mode = 3;
            continue;
          default:break endtagloop;
        }

      case 3:
        switch (group) {
          case 20:
            $pop(this$static);
            this$static.mode = 5;
            break endtagloop;
          case 4:
          case 23:
          case 3:
            $pop(this$static);
            this$static.mode = 5;
            continue;
          default:break endtagloop;
        }

      case 4:
        switch (group) {
          case 26:
            $pop(this$static);
            this$static.mode = 3;
            break endtagloop;
          case 4:
            $pop(this$static);
            this$static.mode = 3;
            continue;
          default:break endtagloop;
        }

      case 5:
        switch (group) {
          case 23:
          case 3:
          case 4:
            $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', ($clinit_125() , BODY), $emptyAttributes(this$static.tokenizer));
            this$static.mode = 21;
            continue;
          default:break endtagloop;
        }

      case 18:
        this$static.mode = this$static.framesetOk?21:6;
        continue;
      case 19:
        this$static.mode = 16;
        continue;
      case 20:
        $pop(this$static);
        this$static.originalMode == 5 && ($flushCharacters(this$static) , node_33 = this$static.stack_0[this$static.currentPtr] , --this$static.currentPtr , --node_33.refcount , undefined);
        this$static.mode = this$static.originalMode;
        break endtagloop;
    }
  }
  this$static.inForeign && !$hasForeignInScope(this$static) && (this$static.inForeign = false);
}

function $endTokenization(this$static){
  this$static.formPointer = null;
  this$static.headPointer = null;
  if (this$static.stack_0 != null) {
    while (this$static.currentPtr > -1) {
      --this$static.stack_0[this$static.currentPtr].refcount;
      --this$static.currentPtr;
    }
    this$static.stack_0 = null;
  }
  if (this$static.listOfActiveFormattingElements != null) {
    while (this$static.listPtr > -1) {
      !!this$static.listOfActiveFormattingElements[this$static.listPtr] && --this$static.listOfActiveFormattingElements[this$static.listPtr].refcount;
      --this$static.listPtr;
    }
    this$static.listOfActiveFormattingElements = null;
  }
  $clearImpl(this$static.idLocations);
  this$static.charBuffer != null && (this$static.charBuffer = null);
}

function $eof(this$static){
  var group, i;
  $flushCharacters(this$static);
  if (this$static.inForeign) {
    while (this$static.stack_0[this$static.currentPtr].ns != 'http://www.w3.org/1999/xhtml') {
      $popOnEof(this$static);
    }
    this$static.inForeign = false;
  }
  eofloop: for (;;) {
    switch (this$static.mode) {
      case 0:
        $documentModeInternal(this$static, ($clinit_113() , QUIRKS_MODE));
        this$static.mode = 1;
        continue;
      case 1:
        $appendHtmlElementToDocumentAndPush(this$static, $emptyAttributes(this$static.tokenizer));
        this$static.mode = 2;
        continue;
      case 2:
        $appendToCurrentNodeAndPushHeadElement(this$static, ($clinit_128() , EMPTY_ATTRIBUTES));
        this$static.mode = 3;
        continue;
      case 3:
        while (this$static.currentPtr > 0) {
          $popOnEof(this$static);
        }

        this$static.mode = 5;
        continue;
      case 4:
        while (this$static.currentPtr > 1) {
          $popOnEof(this$static);
        }

        this$static.mode = 3;
        continue;
      case 5:
        $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', ($clinit_125() , BODY), $emptyAttributes(this$static.tokenizer));
        this$static.mode = 6;
        continue;
      case 9:
        if (this$static.currentPtr == 0) {
          break eofloop;
        }
         else {
          $popOnEof(this$static);
          this$static.mode = 7;
          continue;
        }

      case 21:
      case 8:
      case 12:
      case 6:
        openelementloop: for (i = this$static.currentPtr; i >= 0; --i) {
          group = this$static.stack_0[i].group;
          switch (group) {
            case 41:
            case 15:
            case 29:
            case 39:
            case 40:
            case 3:
            case 23:
              break;
            default:break openelementloop;
          }
        }

        break eofloop;
      case 20:
        this$static.originalMode == 5 && $popOnEof(this$static);
        $popOnEof(this$static);
        this$static.mode = this$static.originalMode;
        continue;
      case 10:
      case 11:
      case 7:
      case 13:
      case 14:
      case 16:
        break eofloop;
      case 15:
      case 17:
      case 18:
      case 19:
      default:this$static.currentPtr == 0 && fromDouble((new Date).getTime());
        break eofloop;
    }
  }
  while (this$static.currentPtr > 0) {
    $popOnEof(this$static);
  }
  !this$static.fragment && $popOnEof(this$static);
}

function $fatal(this$static, e){
  var spe;
  spe = $SAXParseException_0(new SAXParseException, e.getMessage(), this$static.tokenizer, e);
  throw spe;
}

function $fatal_0(this$static, s){
  var spe;
  spe = $SAXParseException(new SAXParseException, s, this$static.tokenizer);
  throw spe;
}

function $findInListOfActiveFormattingElements(this$static, node){
  var i;
  for (i = this$static.listPtr; i >= 0; --i) {
    if (node == this$static.listOfActiveFormattingElements[i]) {
      return i;
    }
  }
  return -1;
}

function $findInListOfActiveFormattingElementsContainsBetweenEndAndLastMarker(this$static, name_0){
  var i, node;
  for (i = this$static.listPtr; i >= 0; --i) {
    node = this$static.listOfActiveFormattingElements[i];
    if (!node) {
      return -1;
    }
     else if (node.name_0 == name_0) {
      return i;
    }
  }
  return -1;
}

function $findLast(this$static, name_0){
  var i;
  for (i = this$static.currentPtr; i > 0; --i) {
    if (this$static.stack_0[i].name_0 == name_0) {
      return i;
    }
  }
  return 2147483647;
}

function $findLastInListScope(this$static, name_0){
  var i;
  for (i = this$static.currentPtr; i > 0; --i) {
    if (this$static.stack_0[i].name_0 == name_0) {
      return i;
    }
     else if (this$static.stack_0[i].scoping || this$static.stack_0[i].name_0 == 'ul' || this$static.stack_0[i].name_0 == 'ol') {
      return 2147483647;
    }
  }
  return 2147483647;
}

function $findLastInScope(this$static, name_0){
  var i;
  for (i = this$static.currentPtr; i > 0; --i) {
    if (this$static.stack_0[i].name_0 == name_0) {
      return i;
    }
     else if (this$static.stack_0[i].scoping) {
      return 2147483647;
    }
  }
  return 2147483647;
}

function $findLastInScopeHn(this$static){
  var i;
  for (i = this$static.currentPtr; i > 0; --i) {
    if (this$static.stack_0[i].group == 42) {
      return i;
    }
     else if (this$static.stack_0[i].scoping) {
      return 2147483647;
    }
  }
  return 2147483647;
}

function $findLastInTableScope(this$static, name_0){
  var i;
  for (i = this$static.currentPtr; i > 0; --i) {
    if (this$static.stack_0[i].name_0 == name_0) {
      return i;
    }
     else if (this$static.stack_0[i].name_0 == 'table') {
      return 2147483647;
    }
  }
  return 2147483647;
}

function $findLastInTableScopeOrRootTbodyTheadTfoot(this$static){
  var i;
  for (i = this$static.currentPtr; i > 0; --i) {
    if (this$static.stack_0[i].group == 39) {
      return i;
    }
  }
  return 0;
}

function $findLastInTableScopeTdTh(this$static){
  var i, name_0;
  for (i = this$static.currentPtr; i > 0; --i) {
    name_0 = this$static.stack_0[i].name_0;
    if ('td' == name_0 || 'th' == name_0) {
      return i;
    }
     else if (name_0 == 'table') {
      return 2147483647;
    }
  }
  return 2147483647;
}

function $findLastOrRoot(this$static, name_0){
  var i;
  for (i = this$static.currentPtr; i > 0; --i) {
    if (this$static.stack_0[i].name_0 == name_0) {
      return i;
    }
  }
  return 0;
}

function $findLastOrRoot_0(this$static, group){
  var i;
  for (i = this$static.currentPtr; i > 0; --i) {
    if (this$static.stack_0[i].group == group) {
      return i;
    }
  }
  return 0;
}

function $flushCharacters(this$static){
  var current, elt, eltPos, node;
  if (this$static.charBufferLen > 0) {
    current = this$static.stack_0[this$static.currentPtr];
    if (current.fosterParenting && $charBufferContainsNonWhitespace(this$static)) {
      eltPos = $findLastOrRoot_0(this$static, 34);
      node = this$static.stack_0[eltPos];
      elt = node.node;
      if (eltPos == 0) {
        $appendCharacters(this$static, elt, valueOf_0(this$static.charBuffer, 0, this$static.charBufferLen));
        this$static.charBufferLen = 0;
        return;
      }
      $insertFosterParentedCharacters(this$static, this$static.charBuffer, 0, this$static.charBufferLen, elt, this$static.stack_0[eltPos - 1].node);
      this$static.charBufferLen = 0;
      return;
    }
    $appendCharacters(this$static, this$static.stack_0[this$static.currentPtr].node, valueOf_0(this$static.charBuffer, 0, this$static.charBufferLen));
    this$static.charBufferLen = 0;
  }
}

function $generateImpliedEndTags(this$static){
  for (;;) {
    switch (this$static.stack_0[this$static.currentPtr].group) {
      case 29:
      case 15:
      case 41:
      case 28:
      case 27:
      case 53:
        $pop(this$static);
        continue;
      default:return;
    }
  }
}

function $generateImpliedEndTagsExceptFor(this$static, name_0){
  var node;
  for (;;) {
    node = this$static.stack_0[this$static.currentPtr];
    switch (node.group) {
      case 29:
      case 15:
      case 41:
      case 28:
      case 27:
      case 53:
        if (node.name_0 == name_0) {
          return;
        }

        $pop(this$static);
        continue;
      default:return;
    }
  }
}

function $hasForeignInScope(this$static){
  var i;
  for (i = this$static.currentPtr; i > 0; --i) {
    if (this$static.stack_0[i].ns != 'http://www.w3.org/1999/xhtml') {
      return true;
    }
     else if (this$static.stack_0[i].scoping) {
      return false;
    }
  }
  return false;
}

function $implicitlyCloseP(this$static){
  var eltPos;
  eltPos = $findLastInScope(this$static, 'p');
  if (eltPos == 2147483647) {
    return;
  }
  $generateImpliedEndTagsExceptFor(this$static, 'p');
  while (this$static.currentPtr >= eltPos) {
    $pop(this$static);
  }
}

function $insertIntoFosterParent(this$static, child){
  var elt, eltPos, node;
  eltPos = $findLastOrRoot_0(this$static, 34);
  node = this$static.stack_0[eltPos];
  elt = node.node;
  if (eltPos == 0) {
    $appendElement(this$static, child, elt);
    return;
  }
  $insertFosterParentedChild(this$static, child, elt, this$static.stack_0[eltPos - 1].node);
}

function $insertIntoStack(this$static, node, position){
  if (position == this$static.currentPtr + 1) {
    $flushCharacters(this$static);
    $push_0(this$static, node);
  }
   else {
    arraycopy(this$static.stack_0, position, this$static.stack_0, position + 1, this$static.currentPtr - position + 1);
    ++this$static.currentPtr;
    this$static.stack_0[position] = node;
  }
}

function $isAlmostStandards(publicIdentifier, systemIdentifier){
  if (lowerCaseLiteralEqualsIgnoreAsciiCaseString('-//w3c//dtd xhtml 1.0 transitional//en', publicIdentifier)) {
    return true;
  }
  if (lowerCaseLiteralEqualsIgnoreAsciiCaseString('-//w3c//dtd xhtml 1.0 frameset//en', publicIdentifier)) {
    return true;
  }
  if (systemIdentifier != null) {
    if (lowerCaseLiteralEqualsIgnoreAsciiCaseString('-//w3c//dtd html 4.01 transitional//en', publicIdentifier)) {
      return true;
    }
    if (lowerCaseLiteralEqualsIgnoreAsciiCaseString('-//w3c//dtd html 4.01 frameset//en', publicIdentifier)) {
      return true;
    }
  }
  return false;
}

function $isHtml4Doctype(publicIdentifier){
  if (publicIdentifier != null && binarySearch_0(HTML4_PUBLIC_IDS, publicIdentifier, ($clinit_95() , $clinit_95() , NATURAL)) > -1) {
    return true;
  }
  return false;
}

function $isInStack(this$static, node){
  var i;
  for (i = this$static.currentPtr; i >= 0; --i) {
    if (this$static.stack_0[i] == node) {
      return true;
    }
  }
  return false;
}

function $isQuirky(name_0, publicIdentifier, systemIdentifier, forceQuirks){
  var i;
  if (forceQuirks) {
    return true;
  }
  if (name_0 != 'html') {
    return true;
  }
  if (publicIdentifier != null) {
    for (i = 0; i < QUIRKY_PUBLIC_IDS.length; ++i) {
      if (lowerCaseLiteralIsPrefixOfIgnoreAsciiCaseString(QUIRKY_PUBLIC_IDS[i], publicIdentifier)) {
        return true;
      }
    }
    if (lowerCaseLiteralEqualsIgnoreAsciiCaseString('-//w3o//dtd w3 html strict 3.0//en//', publicIdentifier) || lowerCaseLiteralEqualsIgnoreAsciiCaseString('-/w3c/dtd html 4.0 transitional/en', publicIdentifier) || lowerCaseLiteralEqualsIgnoreAsciiCaseString('html', publicIdentifier)) {
      return true;
    }
  }
  if (systemIdentifier == null) {
    if (lowerCaseLiteralEqualsIgnoreAsciiCaseString('-//w3c//dtd html 4.01 transitional//en', publicIdentifier)) {
      return true;
    }
     else if (lowerCaseLiteralEqualsIgnoreAsciiCaseString('-//w3c//dtd html 4.01 frameset//en', publicIdentifier)) {
      return true;
    }
  }
   else if (lowerCaseLiteralEqualsIgnoreAsciiCaseString('http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd', systemIdentifier)) {
    return true;
  }
  return false;
}

function $pop(this$static){
  var node;
  $flushCharacters(this$static);
  node = this$static.stack_0[this$static.currentPtr];
  --this$static.currentPtr;
  $elementPopped(this$static, node.ns, node.popName, node.node);
  --node.refcount;
}

function $popOnEof(this$static){
  var node;
  $flushCharacters(this$static);
  node = this$static.stack_0[this$static.currentPtr];
  --this$static.currentPtr;
  $elementPopped(this$static, node.ns, node.popName, node.node);
  --node.refcount;
}

function $push_0(this$static, node){
  var newStack;
  ++this$static.currentPtr;
  if (this$static.currentPtr == this$static.stack_0.length) {
    newStack = initDim(_3Lnu_validator_htmlparser_impl_StackNode_2_classLit, 62, 15, this$static.stack_0.length + 64, 0);
    arraycopy(this$static.stack_0, 0, newStack, 0, this$static.stack_0.length);
    this$static.stack_0 = newStack;
  }
  this$static.stack_0[this$static.currentPtr] = node;
}

function $reconstructTheActiveFormattingElements(this$static){
  var clone, currentNode, entry, entryClone, entryPos, mostRecent;
  if (this$static.listPtr == -1) {
    return;
  }
  mostRecent = this$static.listOfActiveFormattingElements[this$static.listPtr];
  if (!mostRecent || $isInStack(this$static, mostRecent)) {
    return;
  }
  entryPos = this$static.listPtr;
  for (;;) {
    --entryPos;
    if (entryPos == -1) {
      break;
    }
    if (!this$static.listOfActiveFormattingElements[entryPos]) {
      break;
    }
    if ($isInStack(this$static, this$static.listOfActiveFormattingElements[entryPos])) {
      break;
    }
  }
  entryPos < this$static.listPtr && $flushCharacters(this$static);
  while (entryPos < this$static.listPtr) {
    ++entryPos;
    entry = this$static.listOfActiveFormattingElements[entryPos];
    clone = $createElement(this$static, 'http://www.w3.org/1999/xhtml', entry.name_0, $cloneAttributes(entry.attributes));
    entryClone = $StackNode(new StackNode, entry.group, entry.ns, entry.name_0, clone, entry.scoping, entry.special, entry.fosterParenting, entry.popName, entry.attributes);
    entry.attributes = null;
    currentNode = this$static.stack_0[this$static.currentPtr];
    currentNode.fosterParenting?$insertIntoFosterParent(this$static, clone):$appendElement(this$static, clone, currentNode.node);
    $push_0(this$static, entryClone);
    this$static.listOfActiveFormattingElements[entryPos] = entryClone;
    --entry.refcount;
    ++entryClone.refcount;
  }
}

function $removeFromListOfActiveFormattingElements(this$static, pos){
  --this$static.listOfActiveFormattingElements[pos].refcount;
  if (pos == this$static.listPtr) {
    --this$static.listPtr;
    return;
  }
  arraycopy(this$static.listOfActiveFormattingElements, pos + 1, this$static.listOfActiveFormattingElements, pos, this$static.listPtr - pos);
  --this$static.listPtr;
}

function $removeFromStack(this$static, pos){
  if (this$static.currentPtr == pos) {
    $pop(this$static);
  }
   else {
    --this$static.stack_0[pos].refcount;
    arraycopy(this$static.stack_0, pos + 1, this$static.stack_0, pos, this$static.currentPtr - pos);
    --this$static.currentPtr;
  }
}

function $removeFromStack_0(this$static, node){
  var pos;
  if (this$static.stack_0[this$static.currentPtr] == node) {
    $pop(this$static);
  }
   else {
    pos = this$static.currentPtr - 1;
    while (pos >= 0 && this$static.stack_0[pos] != node) {
      --pos;
    }
    if (pos == -1) {
      return;
    }
    --node.refcount;
    arraycopy(this$static.stack_0, pos + 1, this$static.stack_0, pos, this$static.currentPtr - pos);
    --this$static.currentPtr;
  }
}

function $resetTheInsertionMode(this$static){
  var i, name_0, node, ns;
  this$static.inForeign = false;
  for (i = this$static.currentPtr; i >= 0; --i) {
    node = this$static.stack_0[i];
    name_0 = node.name_0;
    ns = node.ns;
    if (i == 0) {
      if (this$static.contextNamespace == 'http://www.w3.org/1999/xhtml' && (this$static.contextName == 'td' || this$static.contextName == 'th')) {
        this$static.mode = this$static.framesetOk?21:6;
        return;
      }
       else {
        name_0 = this$static.contextName;
        ns = this$static.contextNamespace;
      }
    }
    if ('select' == name_0) {
      this$static.mode = 13;
      return;
    }
     else if ('td' == name_0 || 'th' == name_0) {
      this$static.mode = 12;
      return;
    }
     else if ('tr' == name_0) {
      this$static.mode = 11;
      return;
    }
     else if ('tbody' == name_0 || 'thead' == name_0 || 'tfoot' == name_0) {
      this$static.mode = 10;
      return;
    }
     else if ('caption' == name_0) {
      this$static.mode = 8;
      return;
    }
     else if ('colgroup' == name_0) {
      this$static.mode = 9;
      return;
    }
     else if ('table' == name_0) {
      this$static.mode = 7;
      return;
    }
     else if ('http://www.w3.org/1999/xhtml' != ns) {
      this$static.inForeign = true;
      this$static.mode = this$static.framesetOk?21:6;
      return;
    }
     else if ('head' == name_0) {
      this$static.mode = this$static.framesetOk?21:6;
      return;
    }
     else if ('body' == name_0) {
      this$static.mode = this$static.framesetOk?21:6;
      return;
    }
     else if ('frameset' == name_0) {
      this$static.mode = 16;
      return;
    }
     else if ('html' == name_0) {
      !this$static.headPointer?(this$static.mode = 2):(this$static.mode = 5);
      return;
    }
     else if (i == 0) {
      this$static.mode = this$static.framesetOk?21:6;
      return;
    }
  }
}

function $setFragmentContext(this$static, context){
  this$static.contextName = context;
  this$static.contextNamespace = 'http://www.w3.org/1999/xhtml';
  this$static.fragment = false;
  this$static.quirks = false;
}

function $silentPush(this$static, node){
  var newStack;
  ++this$static.currentPtr;
  if (this$static.currentPtr == this$static.stack_0.length) {
    newStack = initDim(_3Lnu_validator_htmlparser_impl_StackNode_2_classLit, 62, 15, this$static.stack_0.length + 64, 0);
    arraycopy(this$static.stack_0, 0, newStack, 0, this$static.stack_0.length);
    this$static.stack_0 = newStack;
  }
  this$static.stack_0[this$static.currentPtr] = node;
}

function $startTag(this$static, elementName, attributes, selfClosing){
  var actionIndex, activeA, activeAPos, attributeQName, currGroup, currNs, currentNode, eltPos, formAttrs, group, i, inputAttributes, name_0, needsPostProcessing, node, prompt_0, promptIndex, current_0, elt_0, node_2, popName_0, current_2, elt_2, node_3, popName_2, current_3, elt_10, current_4, elt_11;
  this$static.needToDropLF = false;
  needsPostProcessing = false;
  starttagloop: for (;;) {
    group = elementName.group;
    name_0 = elementName.name_0;
    if (this$static.inForeign) {
      currentNode = this$static.stack_0[this$static.currentPtr];
      currNs = currentNode.ns;
      currGroup = currentNode.group;
      if ('http://www.w3.org/1999/xhtml' == currNs || 'http://www.w3.org/1998/Math/MathML' == currNs && (56 != group && 57 == currGroup || 19 == group && 58 == currGroup) || 'http://www.w3.org/2000/svg' == currNs && (36 == currGroup || 59 == currGroup)) {
        needsPostProcessing = true;
      }
       else {
        switch (group) {
          case 45:
          case 50:
          case 3:
          case 4:
          case 52:
          case 41:
          case 46:
          case 48:
          case 42:
          case 20:
          case 22:
          case 15:
          case 18:
          case 24:
          case 29:
          case 44:
          case 34:
            while (this$static.stack_0[this$static.currentPtr].ns != 'http://www.w3.org/1999/xhtml') {
              $pop(this$static);
            }

            this$static.inForeign = false;
            continue starttagloop;
          case 64:
            if ($contains(attributes, ($clinit_124() , COLOR)) || $contains(attributes, FACE) || $contains(attributes, SIZE)) {
              while (this$static.stack_0[this$static.currentPtr].ns != 'http://www.w3.org/1999/xhtml') {
                $pop(this$static);
              }
              this$static.inForeign = false;
              continue starttagloop;
            }

          default:if ('http://www.w3.org/2000/svg' == currNs) {
              attributes.mode = 2;
              if (selfClosing) {
                $appendVoidElementToCurrentMayFosterCamelCase(this$static, currNs, elementName, attributes);
                selfClosing = false;
              }
               else {
                $flushCharacters(this$static);
                popName_0 = elementName.camelCaseName;
                $processNonNcNames(attributes, this$static, this$static.namePolicy);
                elementName.custom && (popName_0 = $checkPopName(this$static, popName_0));
                elt_0 = $createElement(this$static, currNs, popName_0, attributes);
                current_0 = this$static.stack_0[this$static.currentPtr];
                current_0.fosterParenting?$insertIntoFosterParent(this$static, elt_0):$appendElement(this$static, elt_0, current_0.node);
                node_2 = $StackNode_3(new StackNode, currNs, elementName, elt_0, popName_0, ($clinit_125() , FOREIGNOBJECT) == elementName);
                $push_0(this$static, node_2);
              }
              attributes = null;
              break starttagloop;
            }
             else {
              attributes.mode = 1;
              if (selfClosing) {
                $appendVoidElementToCurrentMayFoster_0(this$static, currNs, elementName, attributes);
                selfClosing = false;
              }
               else {
                $flushCharacters(this$static);
                popName_2 = elementName.name_0;
                $processNonNcNames(attributes, this$static, this$static.namePolicy);
                elementName.custom && (popName_2 = $checkPopName(this$static, popName_2));
                elt_2 = $createElement(this$static, currNs, popName_2, attributes);
                current_2 = this$static.stack_0[this$static.currentPtr];
                current_2.fosterParenting?$insertIntoFosterParent(this$static, elt_2):$appendElement(this$static, elt_2, current_2.node);
                node_3 = $StackNode_3(new StackNode, currNs, elementName, elt_2, popName_2, false);
                $push_0(this$static, node_3);
              }
              attributes = null;
              break starttagloop;
            }

        }
      }
    }
    switch (this$static.mode) {
      case 10:
        switch (group) {
          case 37:
            $clearStackBackTo(this$static, $findLastInTableScopeOrRootTbodyTheadTfoot(this$static));
            $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            this$static.mode = 11;
            attributes = null;
            break starttagloop;
          case 40:
            $clearStackBackTo(this$static, $findLastInTableScopeOrRootTbodyTheadTfoot(this$static));
            $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', ($clinit_125() , TR), ($clinit_128() , EMPTY_ATTRIBUTES));
            this$static.mode = 11;
            continue;
          case 6:
          case 7:
          case 8:
          case 39:
            eltPos = $findLastInTableScopeOrRootTbodyTheadTfoot(this$static);
            if (eltPos == 0) {
              break starttagloop;
            }
             else {
              $clearStackBackTo(this$static, eltPos);
              $pop(this$static);
              this$static.mode = 7;
              continue;
            }

        }

      case 11:
        switch (group) {
          case 40:
            $clearStackBackTo(this$static, $findLastOrRoot_0(this$static, 37));
            $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            this$static.mode = 12;
            $append_3(this$static, null);
            attributes = null;
            break starttagloop;
          case 6:
          case 7:
          case 8:
          case 39:
          case 37:
            eltPos = $findLastOrRoot_0(this$static, 37);
            if (eltPos == 0) {
              break starttagloop;
            }

            $clearStackBackTo(this$static, eltPos);
            $pop(this$static);
            this$static.mode = 10;
            continue;
        }

      case 7:
        intableloop: for (;;) {
          switch (group) {
            case 6:
              $clearStackBackTo(this$static, $findLastOrRoot_0(this$static, 34));
              $append_3(this$static, null);
              $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              this$static.mode = 8;
              attributes = null;
              break starttagloop;
            case 8:
              $clearStackBackTo(this$static, $findLastOrRoot_0(this$static, 34));
              $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              this$static.mode = 9;
              attributes = null;
              break starttagloop;
            case 7:
              $clearStackBackTo(this$static, $findLastOrRoot_0(this$static, 34));
              $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', ($clinit_125() , COLGROUP), ($clinit_128() , EMPTY_ATTRIBUTES));
              this$static.mode = 9;
              continue starttagloop;
            case 39:
              $clearStackBackTo(this$static, $findLastOrRoot_0(this$static, 34));
              $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              this$static.mode = 10;
              attributes = null;
              break starttagloop;
            case 37:
            case 40:
              $clearStackBackTo(this$static, $findLastOrRoot_0(this$static, 34));
              $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', ($clinit_125() , TBODY), ($clinit_128() , EMPTY_ATTRIBUTES));
              this$static.mode = 10;
              continue starttagloop;
            case 34:
              eltPos = $findLastInTableScope(this$static, name_0);
              if (eltPos == 2147483647) {
                break starttagloop;
              }

              $generateImpliedEndTags(this$static);
              while (this$static.currentPtr >= eltPos) {
                $pop(this$static);
              }

              $resetTheInsertionMode(this$static);
              continue starttagloop;
            case 31:
              $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              this$static.originalMode = this$static.mode;
              this$static.mode = 20;
              $setStateAndEndTagExpectation_0(this$static.tokenizer, 2, elementName);
              attributes = null;
              break starttagloop;
            case 33:
              $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              this$static.originalMode = this$static.mode;
              this$static.mode = 20;
              $setStateAndEndTagExpectation_0(this$static.tokenizer, 60, elementName);
              attributes = null;
              break starttagloop;
            case 13:
              if (!lowerCaseLiteralEqualsIgnoreAsciiCaseString('hidden', $getValue_1(attributes, ($clinit_124() , TYPE_1)))) {
                break intableloop;
              }

              $flushCharacters(this$static);
              $processNonNcNames(attributes, this$static, this$static.namePolicy);
              elt_10 = $createElement_0(this$static, 'http://www.w3.org/1999/xhtml', name_0, attributes);
              current_3 = this$static.stack_0[this$static.currentPtr];
              $appendElement(this$static, elt_10, current_3.node);
              $elementPopped(this$static, 'http://www.w3.org/1999/xhtml', name_0, elt_10);
              selfClosing = false;
              attributes = null;
              break starttagloop;
            case 9:
              if (this$static.formPointer) {
                break starttagloop;
              }
               else {
                $flushCharacters(this$static);
                $processNonNcNames(attributes, this$static, this$static.namePolicy);
                elt_11 = $createElement(this$static, 'http://www.w3.org/1999/xhtml', 'form', attributes);
                this$static.formPointer = elt_11;
                current_4 = this$static.stack_0[this$static.currentPtr];
                $appendElement(this$static, elt_11, current_4.node);
                $elementPopped(this$static, 'http://www.w3.org/1999/xhtml', 'form', elt_11);
                attributes = null;
                break starttagloop;
              }

            default:break intableloop;
          }
        }

      case 8:
        switch (group) {
          case 6:
          case 7:
          case 8:
          case 39:
          case 37:
          case 40:
            eltPos = $findLastInTableScope(this$static, 'caption');
            if (eltPos == 2147483647) {
              break starttagloop;
            }

            $generateImpliedEndTags(this$static);
            while (this$static.currentPtr >= eltPos) {
              $pop(this$static);
            }

            $clearTheListOfActiveFormattingElementsUpToTheLastMarker(this$static);
            this$static.mode = 7;
            continue;
        }

      case 12:
        switch (group) {
          case 6:
          case 7:
          case 8:
          case 39:
          case 37:
          case 40:
            eltPos = $findLastInTableScopeTdTh(this$static);
            if (eltPos == 2147483647) {
              break starttagloop;
            }
             else {
              $closeTheCell(this$static, eltPos);
              continue;
            }

        }

      case 21:
        switch (group) {
          case 11:
            if (this$static.mode == 21) {
              if (this$static.currentPtr == 0 || this$static.stack_0[1].group != 3) {
                break starttagloop;
              }
               else {
                $detachFromParent(this$static, this$static.stack_0[1].node);
                while (this$static.currentPtr > 0) {
                  $pop(this$static);
                }
                $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
                this$static.mode = 16;
                attributes = null;
                break starttagloop;
              }
            }
             else {
              break starttagloop;
            }

          case 44:
          case 15:
          case 41:
          case 5:
          case 43:
          case 63:
          case 34:
          case 49:
          case 4:
          case 48:
          case 13:
          case 65:
          case 22:
          case 35:
          case 38:
          case 47:
          case 32:
            if (this$static.mode == 21) {
              this$static.framesetOk = false;
              this$static.mode = 6;
            }

        }

      case 6:
        inbodyloop: for (;;) {
          switch (group) {
            case 23:
              if (!this$static.fragment) {
                $processNonNcNames(attributes, this$static, this$static.namePolicy);
                $addAttributesToElement(this$static, this$static.stack_0[0].node, attributes);
                attributes = null;
              }

              break starttagloop;
            case 2:
            case 16:
            case 18:
            case 33:
            case 31:
            case 36:
            case 54:
              break inbodyloop;
            case 3:
              $addAttributesToBody(this$static, attributes) && (attributes = null);
              break starttagloop;
            case 29:
            case 50:
            case 46:
            case 51:
              $implicitlyCloseP(this$static);
              $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              attributes = null;
              break starttagloop;
            case 42:
              $implicitlyCloseP(this$static);
              this$static.stack_0[this$static.currentPtr].group == 42 && $pop(this$static);
              $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              attributes = null;
              break starttagloop;
            case 61:
              $implicitlyCloseP(this$static);
              $appendToCurrentNodeAndPushElementMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              attributes = null;
              break starttagloop;
            case 44:
              $implicitlyCloseP(this$static);
              $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              this$static.needToDropLF = true;
              attributes = null;
              break starttagloop;
            case 9:
              if (this$static.formPointer) {
                break starttagloop;
              }
               else {
                $implicitlyCloseP(this$static);
                $appendToCurrentNodeAndPushFormElementMayFoster(this$static, attributes);
                attributes = null;
                break starttagloop;
              }

            case 15:
            case 41:
              eltPos = this$static.currentPtr;
              for (;;) {
                node = this$static.stack_0[eltPos];
                if (node.group == group) {
                  $generateImpliedEndTagsExceptFor(this$static, node.name_0);
                  while (this$static.currentPtr >= eltPos) {
                    $pop(this$static);
                  }
                  break;
                }
                 else if (node.scoping || node.special && node.name_0 != 'p' && node.name_0 != 'address' && node.name_0 != 'div') {
                  break;
                }
                --eltPos;
              }

              $implicitlyCloseP(this$static);
              $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              attributes = null;
              break starttagloop;
            case 30:
              $implicitlyCloseP(this$static);
              $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              $setStateAndEndTagExpectation_0(this$static.tokenizer, 3, elementName);
              attributes = null;
              break starttagloop;
            case 1:
              activeAPos = $findInListOfActiveFormattingElementsContainsBetweenEndAndLastMarker(this$static, 'a');
              if (activeAPos != -1) {
                activeA = this$static.listOfActiveFormattingElements[activeAPos];
                ++activeA.refcount;
                $adoptionAgencyEndTag(this$static, 'a');
                $removeFromStack_0(this$static, activeA);
                activeAPos = $findInListOfActiveFormattingElements(this$static, activeA);
                activeAPos != -1 && $removeFromListOfActiveFormattingElements(this$static, activeAPos);
                --activeA.refcount;
              }

              $reconstructTheActiveFormattingElements(this$static);
              $appendToCurrentNodeAndPushFormattingElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              attributes = null;
              break starttagloop;
            case 45:
            case 64:
              $reconstructTheActiveFormattingElements(this$static);
              $appendToCurrentNodeAndPushFormattingElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              attributes = null;
              break starttagloop;
            case 24:
              $reconstructTheActiveFormattingElements(this$static);
              2147483647 != $findLastInScope(this$static, 'nobr') && $adoptionAgencyEndTag(this$static, 'nobr');
              $appendToCurrentNodeAndPushFormattingElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              attributes = null;
              break starttagloop;
            case 5:
              eltPos = $findLastInScope(this$static, name_0);
              if (eltPos != 2147483647) {
                $generateImpliedEndTags(this$static);
                while (this$static.currentPtr >= eltPos) {
                  $pop(this$static);
                }
                continue starttagloop;
              }
               else {
                $reconstructTheActiveFormattingElements(this$static);
                $appendToCurrentNodeAndPushElementMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
                attributes = null;
                break starttagloop;
              }

            case 63:
              $reconstructTheActiveFormattingElements(this$static);
              $appendToCurrentNodeAndPushElementMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              $append_3(this$static, null);
              attributes = null;
              break starttagloop;
            case 43:
              $reconstructTheActiveFormattingElements(this$static);
              $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              $append_3(this$static, null);
              attributes = null;
              break starttagloop;
            case 34:
              !this$static.quirks && $implicitlyCloseP(this$static);
              $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              this$static.mode = 7;
              attributes = null;
              break starttagloop;
            case 4:
            case 48:
            case 49:
              $reconstructTheActiveFormattingElements(this$static);
            case 55:
              $appendVoidElementToCurrentMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              selfClosing = false;
              attributes = null;
              break starttagloop;
            case 22:
              $implicitlyCloseP(this$static);
              $appendVoidElementToCurrentMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              selfClosing = false;
              attributes = null;
              break starttagloop;
            case 12:
              elementName = ($clinit_125() , IMG);
              continue starttagloop;
            case 65:
            case 13:
              $reconstructTheActiveFormattingElements(this$static);
              $appendVoidElementToCurrentMayFoster(this$static, 'http://www.w3.org/1999/xhtml', name_0, attributes);
              selfClosing = false;
              attributes = null;
              break starttagloop;
            case 14:
              if (this$static.formPointer) {
                break starttagloop;
              }

              $implicitlyCloseP(this$static);
              formAttrs = $HtmlAttributes(new HtmlAttributes, 0);
              actionIndex = $getIndex(attributes, ($clinit_124() , ACTION));
              actionIndex > -1 && $addAttribute(formAttrs, ACTION, $getValue_0(attributes, actionIndex), ($clinit_115() , ALLOW));
              $appendToCurrentNodeAndPushFormElementMayFoster(this$static, formAttrs);
              $appendVoidElementToCurrentMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', ($clinit_125() , HR), ($clinit_128() , EMPTY_ATTRIBUTES));
              $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', LABEL_0, EMPTY_ATTRIBUTES);
              promptIndex = $getIndex(attributes, PROMPT);
              if (promptIndex > -1) {
                prompt_0 = $toCharArray($getValue_0(attributes, promptIndex));
                $appendCharacters(this$static, this$static.stack_0[this$static.currentPtr].node, valueOf_0(prompt_0, 0, prompt_0.length));
              }
               else {
                $appendCharacters(this$static, this$static.stack_0[this$static.currentPtr].node, 'This is a searchable index. Enter search keywords: ');
              }

              inputAttributes = $HtmlAttributes(new HtmlAttributes, 0);
              $addAttribute(inputAttributes, NAME, 'isindex', ($clinit_115() , ALLOW));
              for (i = 0; i < attributes.length_0; ++i) {
                attributeQName = $getAttributeName(attributes, i);
                NAME == attributeQName || PROMPT == attributeQName || ACTION != attributeQName && $addAttribute(inputAttributes, attributeQName, $getValue_0(attributes, i), ALLOW);
              }

              $clearWithoutReleasingContents(attributes);
              $appendVoidElementToCurrentMayFoster(this$static, 'http://www.w3.org/1999/xhtml', 'input', inputAttributes);
              $pop(this$static);
              $appendVoidElementToCurrentMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', HR, EMPTY_ATTRIBUTES);
              $pop(this$static);
              selfClosing = false;
              break starttagloop;
            case 35:
              $appendToCurrentNodeAndPushElementMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              $setStateAndEndTagExpectation_0(this$static.tokenizer, 1, elementName);
              this$static.originalMode = this$static.mode;
              this$static.mode = 20;
              this$static.needToDropLF = true;
              attributes = null;
              break starttagloop;
            case 38:
              $implicitlyCloseP(this$static);
              $reconstructTheActiveFormattingElements(this$static);
              $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              this$static.originalMode = this$static.mode;
              this$static.mode = 20;
              $setStateAndEndTagExpectation_0(this$static.tokenizer, 60, elementName);
              attributes = null;
              break starttagloop;
            case 26:
              {
                $reconstructTheActiveFormattingElements(this$static);
                $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
                attributes = null;
                break starttagloop;
              }

            case 25:
            case 47:
            case 60:
              $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              this$static.originalMode = this$static.mode;
              this$static.mode = 20;
              $setStateAndEndTagExpectation_0(this$static.tokenizer, 60, elementName);
              attributes = null;
              break starttagloop;
            case 32:
              $reconstructTheActiveFormattingElements(this$static);
              $appendToCurrentNodeAndPushElementMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              switch (this$static.mode) {
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                  this$static.mode = 14;
                  break;
                default:this$static.mode = 13;
              }

              attributes = null;
              break starttagloop;
            case 27:
            case 28:
              if ($findLastInScope(this$static, 'option') != 2147483647) {
                optionendtagloop: for (;;) {
                  if ('option' == this$static.stack_0[this$static.currentPtr].name_0) {
                    $pop(this$static);
                    break optionendtagloop;
                  }
                  eltPos = this$static.currentPtr;
                  for (;;) {
                    if (this$static.stack_0[eltPos].name_0 == 'option') {
                      $generateImpliedEndTags(this$static);
                      while (this$static.currentPtr >= eltPos) {
                        $pop(this$static);
                      }
                      break optionendtagloop;
                    }
                    --eltPos;
                  }
                }
              }

              $reconstructTheActiveFormattingElements(this$static);
              $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              attributes = null;
              break starttagloop;
            case 53:
              eltPos = $findLastInScope(this$static, 'ruby');
              eltPos != 2147483647 && $generateImpliedEndTags(this$static);
              if (eltPos != this$static.currentPtr) {
                while (this$static.currentPtr > eltPos) {
                  $pop(this$static);
                }
              }

              $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              attributes = null;
              break starttagloop;
            case 17:
              $reconstructTheActiveFormattingElements(this$static);
              attributes.mode = 1;
              if (selfClosing) {
                $appendVoidElementToCurrentMayFoster_0(this$static, 'http://www.w3.org/1998/Math/MathML', elementName, attributes);
                selfClosing = false;
              }
               else {
                $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1998/Math/MathML', elementName, attributes);
                this$static.inForeign = true;
              }

              attributes = null;
              break starttagloop;
            case 19:
              $reconstructTheActiveFormattingElements(this$static);
              attributes.mode = 2;
              if (selfClosing) {
                $appendVoidElementToCurrentMayFosterCamelCase(this$static, 'http://www.w3.org/2000/svg', elementName, attributes);
                selfClosing = false;
              }
               else {
                $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/2000/svg', elementName, attributes);
                this$static.inForeign = true;
              }

              attributes = null;
              break starttagloop;
            case 6:
            case 7:
            case 8:
            case 39:
            case 37:
            case 40:
            case 10:
            case 11:
            case 20:
              break starttagloop;
            case 62:
              $reconstructTheActiveFormattingElements(this$static);
              $appendToCurrentNodeAndPushElementMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              attributes = null;
              break starttagloop;
            default:$reconstructTheActiveFormattingElements(this$static);
              $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              attributes = null;
              break starttagloop;
          }
        }

      case 3:
        inheadloop: for (;;) {
          switch (group) {
            case 23:
              if (!this$static.fragment) {
                $processNonNcNames(attributes, this$static, this$static.namePolicy);
                $addAttributesToElement(this$static, this$static.stack_0[0].node, attributes);
                attributes = null;
              }

              break starttagloop;
            case 2:
            case 54:
              $appendVoidElementToCurrentMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              selfClosing = false;
              attributes = null;
              break starttagloop;
            case 18:
            case 16:
              break inheadloop;
            case 36:
              $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              this$static.originalMode = this$static.mode;
              this$static.mode = 20;
              $setStateAndEndTagExpectation_0(this$static.tokenizer, 1, elementName);
              attributes = null;
              break starttagloop;
            case 26:
              {
                $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
                this$static.mode = 4;
              }

              attributes = null;
              break starttagloop;
            case 31:
              $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              this$static.originalMode = this$static.mode;
              this$static.mode = 20;
              $setStateAndEndTagExpectation_0(this$static.tokenizer, 2, elementName);
              attributes = null;
              break starttagloop;
            case 33:
            case 25:
              $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
              this$static.originalMode = this$static.mode;
              this$static.mode = 20;
              $setStateAndEndTagExpectation_0(this$static.tokenizer, 60, elementName);
              attributes = null;
              break starttagloop;
            case 20:
              break starttagloop;
            default:$pop(this$static);
              this$static.mode = 5;
              continue starttagloop;
          }
        }

      case 4:
        switch (group) {
          case 23:
            if (!this$static.fragment) {
              $processNonNcNames(attributes, this$static, this$static.namePolicy);
              $addAttributesToElement(this$static, this$static.stack_0[0].node, attributes);
              attributes = null;
            }

            break starttagloop;
          case 16:
            $appendVoidElementToCurrentMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            selfClosing = false;
            attributes = null;
            break starttagloop;
          case 18:
            $checkMetaCharset(this$static, attributes);
            $appendVoidElementToCurrentMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            selfClosing = false;
            attributes = null;
            break starttagloop;
          case 33:
          case 25:
            $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            this$static.originalMode = this$static.mode;
            this$static.mode = 20;
            $setStateAndEndTagExpectation_0(this$static.tokenizer, 60, elementName);
            attributes = null;
            break starttagloop;
          case 20:
            break starttagloop;
          case 26:
            break starttagloop;
          default:$pop(this$static);
            this$static.mode = 3;
            continue;
        }

      case 9:
        switch (group) {
          case 23:
            if (!this$static.fragment) {
              $processNonNcNames(attributes, this$static, this$static.namePolicy);
              $addAttributesToElement(this$static, this$static.stack_0[0].node, attributes);
              attributes = null;
            }

            break starttagloop;
          case 7:
            $appendVoidElementToCurrentMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            selfClosing = false;
            attributes = null;
            break starttagloop;
          default:if (this$static.currentPtr == 0) {
              break starttagloop;
            }

            $pop(this$static);
            this$static.mode = 7;
            continue;
        }

      case 14:
        switch (group) {
          case 6:
          case 39:
          case 37:
          case 40:
          case 34:
            eltPos = $findLastInTableScope(this$static, 'select');
            if (eltPos == 2147483647) {
              break starttagloop;
            }

            while (this$static.currentPtr >= eltPos) {
              $pop(this$static);
            }

            $resetTheInsertionMode(this$static);
            continue;
        }

      case 13:
        switch (group) {
          case 23:
            if (!this$static.fragment) {
              $processNonNcNames(attributes, this$static, this$static.namePolicy);
              $addAttributesToElement(this$static, this$static.stack_0[0].node, attributes);
              attributes = null;
            }

            break starttagloop;
          case 28:
            'option' == this$static.stack_0[this$static.currentPtr].name_0 && $pop(this$static);
            $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            attributes = null;
            break starttagloop;
          case 27:
            'option' == this$static.stack_0[this$static.currentPtr].name_0 && $pop(this$static);
            'optgroup' == this$static.stack_0[this$static.currentPtr].name_0 && $pop(this$static);
            $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            attributes = null;
            break starttagloop;
          case 32:
            eltPos = $findLastInTableScope(this$static, name_0);
            if (eltPos == 2147483647) {
              break starttagloop;
            }
             else {
              while (this$static.currentPtr >= eltPos) {
                $pop(this$static);
              }
              $resetTheInsertionMode(this$static);
              break starttagloop;
            }

          case 13:
          case 35:
          case 65:
            eltPos = $findLastInTableScope(this$static, 'select');
            if (eltPos == 2147483647) {
              break starttagloop;
            }

            while (this$static.currentPtr >= eltPos) {
              $pop(this$static);
            }

            $resetTheInsertionMode(this$static);
            continue;
          case 31:
            $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            this$static.originalMode = this$static.mode;
            this$static.mode = 20;
            $setStateAndEndTagExpectation_0(this$static.tokenizer, 2, elementName);
            attributes = null;
            break starttagloop;
          default:break starttagloop;
        }

      case 15:
        switch (group) {
          case 23:
            if (!this$static.fragment) {
              $processNonNcNames(attributes, this$static, this$static.namePolicy);
              $addAttributesToElement(this$static, this$static.stack_0[0].node, attributes);
              attributes = null;
            }

            break starttagloop;
          default:this$static.mode = this$static.framesetOk?21:6;
            continue;
        }

      case 16:
        switch (group) {
          case 11:
            $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            attributes = null;
            break starttagloop;
          case 10:
            $appendVoidElementToCurrentMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            selfClosing = false;
            attributes = null;
            break starttagloop;
        }

      case 17:
        switch (group) {
          case 23:
            if (!this$static.fragment) {
              $processNonNcNames(attributes, this$static, this$static.namePolicy);
              $addAttributesToElement(this$static, this$static.stack_0[0].node, attributes);
              attributes = null;
            }

            break starttagloop;
          case 25:
            $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            this$static.originalMode = this$static.mode;
            this$static.mode = 20;
            $setStateAndEndTagExpectation_0(this$static.tokenizer, 60, elementName);
            attributes = null;
            break starttagloop;
          default:break starttagloop;
        }

      case 0:
        $documentModeInternal(this$static, ($clinit_113() , QUIRKS_MODE));
        this$static.mode = 1;
        continue;
      case 1:
        switch (group) {
          case 23:
            attributes == ($clinit_128() , EMPTY_ATTRIBUTES)?$appendHtmlElementToDocumentAndPush(this$static, $emptyAttributes(this$static.tokenizer)):$appendHtmlElementToDocumentAndPush(this$static, attributes);
            this$static.mode = 2;
            attributes = null;
            break starttagloop;
          default:$appendHtmlElementToDocumentAndPush(this$static, $emptyAttributes(this$static.tokenizer));
            this$static.mode = 2;
            continue;
        }

      case 2:
        switch (group) {
          case 23:
            if (!this$static.fragment) {
              $processNonNcNames(attributes, this$static, this$static.namePolicy);
              $addAttributesToElement(this$static, this$static.stack_0[0].node, attributes);
              attributes = null;
            }

            break starttagloop;
          case 20:
            $appendToCurrentNodeAndPushHeadElement(this$static, attributes);
            this$static.mode = 3;
            attributes = null;
            break starttagloop;
          default:$appendToCurrentNodeAndPushHeadElement(this$static, ($clinit_128() , EMPTY_ATTRIBUTES));
            this$static.mode = 3;
            continue;
        }

      case 5:
        switch (group) {
          case 23:
            if (!this$static.fragment) {
              $processNonNcNames(attributes, this$static, this$static.namePolicy);
              $addAttributesToElement(this$static, this$static.stack_0[0].node, attributes);
              attributes = null;
            }

            break starttagloop;
          case 3:
            attributes.length_0 == 0?($appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', ($clinit_125() , BODY), $emptyAttributes(this$static.tokenizer)) , undefined):$appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', ($clinit_125() , BODY), attributes);
            this$static.framesetOk = false;
            this$static.mode = 6;
            attributes = null;
            break starttagloop;
          case 11:
            $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            this$static.mode = 16;
            attributes = null;
            break starttagloop;
          case 2:
            $flushCharacters(this$static);
            $silentPush(this$static, $StackNode_0(new StackNode, 'http://www.w3.org/1999/xhtml', ($clinit_125() , HEAD), this$static.headPointer));
            $appendVoidElementToCurrentMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            selfClosing = false;
            $pop(this$static);
            attributes = null;
            break starttagloop;
          case 16:
            $flushCharacters(this$static);
            $silentPush(this$static, $StackNode_0(new StackNode, 'http://www.w3.org/1999/xhtml', ($clinit_125() , HEAD), this$static.headPointer));
            $appendVoidElementToCurrentMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            selfClosing = false;
            $pop(this$static);
            attributes = null;
            break starttagloop;
          case 18:
            $checkMetaCharset(this$static, attributes);
            $flushCharacters(this$static);
            $silentPush(this$static, $StackNode_0(new StackNode, 'http://www.w3.org/1999/xhtml', ($clinit_125() , HEAD), this$static.headPointer));
            $appendVoidElementToCurrentMayFoster_0(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            selfClosing = false;
            $pop(this$static);
            attributes = null;
            break starttagloop;
          case 31:
            $flushCharacters(this$static);
            $silentPush(this$static, $StackNode_0(new StackNode, 'http://www.w3.org/1999/xhtml', ($clinit_125() , HEAD), this$static.headPointer));
            $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            this$static.originalMode = this$static.mode;
            this$static.mode = 20;
            $setStateAndEndTagExpectation_0(this$static.tokenizer, 2, elementName);
            attributes = null;
            break starttagloop;
          case 33:
          case 25:
            $flushCharacters(this$static);
            $silentPush(this$static, $StackNode_0(new StackNode, 'http://www.w3.org/1999/xhtml', ($clinit_125() , HEAD), this$static.headPointer));
            $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            this$static.originalMode = this$static.mode;
            this$static.mode = 20;
            $setStateAndEndTagExpectation_0(this$static.tokenizer, 60, elementName);
            attributes = null;
            break starttagloop;
          case 36:
            $flushCharacters(this$static);
            $silentPush(this$static, $StackNode_0(new StackNode, 'http://www.w3.org/1999/xhtml', ($clinit_125() , HEAD), this$static.headPointer));
            $appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            this$static.originalMode = this$static.mode;
            this$static.mode = 20;
            $setStateAndEndTagExpectation_0(this$static.tokenizer, 1, elementName);
            attributes = null;
            break starttagloop;
          case 20:
            break starttagloop;
          default:$appendToCurrentNodeAndPushElement(this$static, 'http://www.w3.org/1999/xhtml', ($clinit_125() , BODY), $emptyAttributes(this$static.tokenizer));
            this$static.mode = 21;
            continue;
        }

      case 18:
        switch (group) {
          case 23:
            if (!this$static.fragment) {
              $processNonNcNames(attributes, this$static, this$static.namePolicy);
              $addAttributesToElement(this$static, this$static.stack_0[0].node, attributes);
              attributes = null;
            }

            break starttagloop;
          default:this$static.mode = this$static.framesetOk?21:6;
            continue;
        }

      case 19:
        switch (group) {
          case 25:
            $appendToCurrentNodeAndPushElementMayFoster(this$static, 'http://www.w3.org/1999/xhtml', elementName, attributes);
            this$static.originalMode = this$static.mode;
            this$static.mode = 20;
            $setStateAndEndTagExpectation_0(this$static.tokenizer, 2, elementName);
            attributes = null;
            break starttagloop;
          default:break starttagloop;
        }

      case 20:
        break starttagloop;
    }
  }
  needsPostProcessing && this$static.inForeign && !$hasForeignInScope(this$static) && (this$static.inForeign = false);
  attributes != ($clinit_128() , EMPTY_ATTRIBUTES);
}

function $startTokenization(this$static, self_0){
  var elt, node;
  this$static.tokenizer = self_0;
  this$static.stack_0 = initDim(_3Lnu_validator_htmlparser_impl_StackNode_2_classLit, 62, 15, 64, 0);
  this$static.listOfActiveFormattingElements = initDim(_3Lnu_validator_htmlparser_impl_StackNode_2_classLit, 62, 15, 64, 0);
  this$static.needToDropLF = false;
  this$static.originalMode = 0;
  this$static.currentPtr = -1;
  this$static.listPtr = -1;
  this$static.formPointer = null;
  this$static.headPointer = null;
  this$static.html4 = false;
  $clearImpl(this$static.idLocations);
  this$static.wantingComments = this$static.wantingComments;
  this$static.script = null;
  this$static.placeholder = null;
  this$static.readyToRun = false;
  this$static.charBufferLen = 0;
  this$static.charBuffer = initDim(_3C_classLit, 47, -1, 1024, 1);
  this$static.framesetOk = true;
  if (this$static.fragment) {
    elt = $createHtmlElementSetAsRoot(this$static, $emptyAttributes(this$static.tokenizer));
    node = $StackNode_0(new StackNode, 'http://www.w3.org/1999/xhtml', ($clinit_125() , HTML_0), elt);
    ++this$static.currentPtr;
    this$static.stack_0[this$static.currentPtr] = node;
    $resetTheInsertionMode(this$static);
    'title' == this$static.contextName || 'textarea' == this$static.contextName?$setStateAndEndTagExpectation(this$static.tokenizer, 1):'style' == this$static.contextName || 'xmp' == this$static.contextName || 'iframe' == this$static.contextName || 'noembed' == this$static.contextName || 'noframes' == this$static.contextName?$setStateAndEndTagExpectation(this$static.tokenizer, 60):'plaintext' == this$static.contextName?$setStateAndEndTagExpectation(this$static.tokenizer, 3):'script' == this$static.contextName?$setStateAndEndTagExpectation(this$static.tokenizer, 2):$setStateAndEndTagExpectation(this$static.tokenizer, 0);
    this$static.contextName = null;
  }
   else {
    this$static.mode = 0;
    this$static.inForeign = false;
  }
}

function $zeroOriginatingReplacementCharacter(this$static){
  (this$static.inForeign || this$static.mode == 20) && $characters(this$static, REPLACEMENT_CHARACTER, 0, 1);
}

function extractCharsetFromContent(attributeValue){
  var buffer, c, charset, charsetState, end, i, start;
  charsetState = 0;
  start = -1;
  end = -1;
  buffer = $toCharArray(attributeValue);
  charsetloop: for (i = 0; i < buffer.length; ++i) {
    c = buffer[i];
    switch (charsetState) {
      case 0:
        switch (c) {
          case 99:
          case 67:
            charsetState = 1;
            continue;
          default:continue;
        }

      case 1:
        switch (c) {
          case 104:
          case 72:
            charsetState = 2;
            continue;
          default:charsetState = 0;
            continue;
        }

      case 2:
        switch (c) {
          case 97:
          case 65:
            charsetState = 3;
            continue;
          default:charsetState = 0;
            continue;
        }

      case 3:
        switch (c) {
          case 114:
          case 82:
            charsetState = 4;
            continue;
          default:charsetState = 0;
            continue;
        }

      case 4:
        switch (c) {
          case 115:
          case 83:
            charsetState = 5;
            continue;
          default:charsetState = 0;
            continue;
        }

      case 5:
        switch (c) {
          case 101:
          case 69:
            charsetState = 6;
            continue;
          default:charsetState = 0;
            continue;
        }

      case 6:
        switch (c) {
          case 116:
          case 84:
            charsetState = 7;
            continue;
          default:charsetState = 0;
            continue;
        }

      case 7:
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 13:
          case 32:
            continue;
          case 61:
            charsetState = 8;
            continue;
          default:return null;
        }

      case 8:
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 13:
          case 32:
            continue;
          case 39:
            start = i + 1;
            charsetState = 9;
            continue;
          case 34:
            start = i + 1;
            charsetState = 10;
            continue;
          default:start = i;
            charsetState = 11;
            continue;
        }

      case 9:
        switch (c) {
          case 39:
            end = i;
            break charsetloop;
          default:continue;
        }

      case 10:
        switch (c) {
          case 34:
            end = i;
            break charsetloop;
          default:continue;
        }

      case 11:
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 13:
          case 32:
          case 59:
            end = i;
            break charsetloop;
          default:continue;
        }

    }
  }
  charset = null;
  if (start != -1) {
    end == -1 && (end = buffer.length);
    charset = valueOf_0(buffer, start, end - start);
  }
  return charset;
}

function getClass_60(){
  return Lnu_validator_htmlparser_impl_TreeBuilder_2_classLit;
}

function TreeBuilder(){
}

_ = TreeBuilder.prototype = new Object_0;
_.getClass$ = getClass_60;
_.typeId$ = 0;
_.charBuffer = null;
_.charBufferLen = 0;
_.contextName = null;
_.contextNamespace = null;
_.currentPtr = -1;
_.formPointer = null;
_.fragment = false;
_.framesetOk = true;
_.headPointer = null;
_.html4 = false;
_.inForeign = false;
_.listOfActiveFormattingElements = null;
_.listPtr = -1;
_.mode = 0;
_.needToDropLF = false;
_.originalMode = 0;
_.quirks = false;
_.stack_0 = null;
_.tokenizer = null;
_.wantingComments = false;
var HTML4_PUBLIC_IDS, QUIRKY_PUBLIC_IDS, REPLACEMENT_CHARACTER;

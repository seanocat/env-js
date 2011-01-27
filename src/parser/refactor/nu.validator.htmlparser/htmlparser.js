function $HtmlParser(this$static, document_0){
  this$static.documentWriteBuffer = $StringBuilder(new StringBuilder);
  this$static.bufferStack = $LinkedList(new LinkedList);
  this$static.domTreeBuilder = $BrowserTreeBuilder(new BrowserTreeBuilder, document_0);
  this$static.tokenizer = $ErrorReportingTokenizer(new ErrorReportingTokenizer, this$static.domTreeBuilder);
  this$static.domTreeBuilder.namePolicy = ($clinit_115() , ALTER_INFOSET);
  this$static.tokenizer.commentPolicy = ALTER_INFOSET;
  this$static.tokenizer.contentNonXmlCharPolicy = ALTER_INFOSET;
  this$static.tokenizer.contentSpacePolicy = ALTER_INFOSET;
  this$static.tokenizer.namePolicy = ALTER_INFOSET;
  $setXmlnsPolicy(this$static.tokenizer, ALTER_INFOSET);
  return this$static;
}

function $parse(this$static, source, useSetTimeouts, callback){
  this$static.parseEndListener = callback;
  $setFragmentContext(this$static.domTreeBuilder, null);
  this$static.lastWasCR = false;
  this$static.ending = false;
  $setLength(this$static.documentWriteBuffer, 0);
  this$static.streamLength = source.length;
  this$static.stream = $UTF16Buffer(new UTF16Buffer, $toCharArray(source), 0, this$static.streamLength < 512?this$static.streamLength:512);
  $clear(this$static.bufferStack);
  $addLast(this$static.bufferStack, this$static.stream);
  $setFragmentContext(this$static.domTreeBuilder, null);
  $start_0(this$static.tokenizer);
  $pump(this$static, useSetTimeouts);
}

function $pump(this$static, useSetTimeouts){
  var $e0, timer;
  if ($pumpcore(this$static)) {
    return;
  }
  if (useSetTimeouts) {
    timer = $HtmlParser$1(new HtmlParser$1, this$static);
    $schedule(timer, 1);
  }
   else {
    try {
      while (!$pumpcore(this$static)) {
      }
    }
     catch ($e0) {
      $e0 = caught($e0);
      if (instanceOf($e0, 31)) {
        this$static.ending = true;
      }
       else 
        throw $e0;
    }
  }
}

function $pumpcore(this$static){
  var buffer, docWriteLen, newBuf, newEnd;
  if (this$static.ending) {
    $end(this$static.tokenizer);
    $getDocument(this$static.domTreeBuilder);
    this$static.parseEndListener.callback();
    return true;
  }
  docWriteLen = this$static.documentWriteBuffer.impl.string.length;
  if (docWriteLen > 0) {
    newBuf = initDim(_3C_classLit, 47, -1, docWriteLen, 1);
    $getChars_0(this$static.documentWriteBuffer, 0, docWriteLen, newBuf, 0);
    $addLast(this$static.bufferStack, $UTF16Buffer(new UTF16Buffer, newBuf, 0, docWriteLen));
    $setLength(this$static.documentWriteBuffer, 0);
  }
  for (;;) {
    buffer = dynamicCast($getLast(this$static.bufferStack), 32);
    if (buffer.start >= buffer.end) {
      if (buffer == this$static.stream) {
        if (buffer.end == this$static.streamLength) {
          $eof_0(this$static.tokenizer);
          this$static.ending = true;
          break;
        }
         else {
          newEnd = buffer.start + 512;
          buffer.end = newEnd < this$static.streamLength?newEnd:this$static.streamLength;
          continue;
        }
      }
       else {
        $removeLast(this$static.bufferStack);
        continue;
      }
    }
    $adjust(buffer, this$static.lastWasCR);
    this$static.lastWasCR = false;
    if (buffer.start < buffer.end) {
      this$static.lastWasCR = $tokenizeBuffer(this$static.tokenizer, buffer);
      $maybeRunScript(this$static.domTreeBuilder);
      break;
    }
     else {
      continue;
    }
  }
  return false;
}

function documentWrite(text){
  var buffer;
  buffer = $UTF16Buffer(new UTF16Buffer, $toCharArray(text), 0, text.length);
  while (buffer.start < buffer.end) {
    $adjust(buffer, this.lastWasCR);
    this.lastWasCR = false;
    if (buffer.start < buffer.end) {
      this.lastWasCR = $tokenizeBuffer(this.tokenizer, buffer);
      $maybeRunScript(this.domTreeBuilder);
    }
  }
}

function getClass_64(){
  return Lnu_validator_htmlparser_gwt_HtmlParser_2_classLit;
}

function HtmlParser(){
}

_ = HtmlParser.prototype = new Object_0;
_.documentWrite = documentWrite;
_.getClass$ = getClass_64;
_.typeId$ = 0;
_.domTreeBuilder = null;
_.ending = false;
_.lastWasCR = false;
_.parseEndListener = null;
_.stream = null;
_.streamLength = 0;
_.tokenizer = null;
function $clinit_121(){
  $clinit_121 = nullMethod;
  $clinit_47();
}

function $HtmlParser$1(this$static, this$0){
  $clinit_121();
  this$static.this$0 = this$0;
  return this$static;
}

function $run(this$static){
  var $e0;
  try {
    $pump(this$static.this$0, true);
  }
   catch ($e0) {
    $e0 = caught($e0);
    if (instanceOf($e0, 31)) {
      this$static.this$0.ending = true;
    }
     else 
      throw $e0;
  }
}

function getClass_65(){
  return Lnu_validator_htmlparser_gwt_HtmlParser$1_2_classLit;
}

function HtmlParser$1(){
}

_ = HtmlParser$1.prototype = new Timer;
_.getClass$ = getClass_65;
_.typeId$ = 38;
_.this$0 = null;
function installDocWrite(doc, parser){
  doc.write = function(){
    if (arguments.length == 0) {
      return;
    }
    var text = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      text += arguments[i];
    }
    parser.documentWrite(text);
  }
  ;
  doc.writeln = function(){
    if (arguments.length == 0) {
      parser.documentWrite('\n');
      return;
    }
    var text = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      text += arguments[i];
    }
    text += '\n';
    parser.documentWrite(text);
  }
  ;
}

function parseHtmlDocument(source, document_0, useSetTimeouts, readyCallback, errorHandler){
  var parser;
  !readyCallback && (readyCallback = createFunction());
  zapChildren(document_0);
  parser = $HtmlParser(new HtmlParser, document_0);
  installDocWrite(document_0, parser);
  $parse(parser, source, useSetTimeouts, $ParseEndListener(new ParseEndListener, readyCallback));
}

function zapChildren(node){
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

function $ParseEndListener(this$static, callback){
  this$static.callback = callback;
  return this$static;
}

function getClass_66(){
  return Lnu_validator_htmlparser_gwt_ParseEndListener_2_classLit;
}

function ParseEndListener(){
}

_ = ParseEndListener.prototype = new Object_0;
_.getClass$ = getClass_66;
_.typeId$ = 0;
_.callback = null;

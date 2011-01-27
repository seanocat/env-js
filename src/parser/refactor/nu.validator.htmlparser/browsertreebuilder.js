 function $clinit_118(){
  $clinit_118 = nullMethod;
  $clinit_117();
}

function $BrowserTreeBuilder(this$static, document_0){
  $clinit_118();
  this$static.doctypeExpectation = ($clinit_112() , HTML);
  this$static.namePolicy = ($clinit_115() , ALTER_INFOSET);
  this$static.idLocations = $HashMap(new HashMap);
  this$static.fragment = false;
  this$static.scriptStack = $LinkedList(new LinkedList);
  this$static.document_0 = document_0;
  installExplorerCreateElementNS(document_0);
  return this$static;
}

function $addAttributesToElement(this$static, element, attributes){
  var $e0, e, i, localName, uri;
  try {
    for (i = 0; i < attributes.length_0; ++i) {
      localName = $getLocalName(attributes, i);
      uri = $getURI(attributes, i);
      !element.hasAttributeNS(uri, localName) && (element.setAttributeNS(uri, localName, $getValue_0(attributes, i)) , undefined);
    }
  }
   catch ($e0) {
    $e0 = caught($e0);
    if (instanceOf($e0, 29)) {
      e = $e0;
      $fatal(this$static, e);
    }
     else 
      throw $e0;
  }
}

function $appendCharacters(this$static, parent_0, text){
  var $e0, e;
  try {
    parent_0 == this$static.placeholder && (this$static.script.appendChild(this$static.document_0.createTextNode(text)) , undefined);
    parent_0.appendChild(this$static.document_0.createTextNode(text));
  }
   catch ($e0) {
    $e0 = caught($e0);
    if (instanceOf($e0, 29)) {
      e = $e0;
      $fatal(this$static, e);
    }
     else 
      throw $e0;
  }
}

function $appendChildrenToNewParent(this$static, oldParent, newParent){
  var $e0, e;
  try {
    while (oldParent.hasChildNodes()) {
      newParent.appendChild(oldParent.firstChild);
    }
  }
   catch ($e0) {
    $e0 = caught($e0);
    if (instanceOf($e0, 29)) {
      e = $e0;
      $fatal(this$static, e);
    }
     else 
      throw $e0;
  }
}

function $appendComment(this$static, parent_0, comment){
  var $e0, e;
  try {
    parent_0 == this$static.placeholder && (this$static.script.appendChild(this$static.document_0.createComment(comment)) , undefined);
    parent_0.appendChild(this$static.document_0.createComment(comment));
  }
   catch ($e0) {
    $e0 = caught($e0);
    if (instanceOf($e0, 29)) {
      e = $e0;
      $fatal(this$static, e);
    }
     else 
      throw $e0;
  }
}

function $appendCommentToDocument(this$static, comment){
  var $e0, e;
  try {
    this$static.document_0.appendChild(this$static.document_0.createComment(comment));
  }
   catch ($e0) {
    $e0 = caught($e0);
    if (instanceOf($e0, 29)) {
      e = $e0;
      $fatal(this$static, e);
    }
     else 
      throw $e0;
  }
}

function $appendElement(this$static, child, newParent){
  var $e0, e;
  try {
    newParent == this$static.placeholder && (this$static.script.appendChild(child.cloneNode(true)) , undefined);
    newParent.appendChild(child);
  }
   catch ($e0) {
    $e0 = caught($e0);
    if (instanceOf($e0, 29)) {
      e = $e0;
      $fatal(this$static, e);
    }
     else 
      throw $e0;
  }
}

function $createElement(this$static, ns, name_0, attributes){
  var $e0, e, i, rv;
  try {
    rv = this$static.document_0.createElementNS(ns, name_0);
    for (i = 0; i < attributes.length_0; ++i) {
      rv.setAttributeNS($getURI(attributes, i), $getLocalName(attributes, i), $getValue_0(attributes, i));
    }
    if ('script' == name_0) {
      !!this$static.placeholder && $addLast(this$static.scriptStack, $BrowserTreeBuilder$ScriptHolder(new BrowserTreeBuilder$ScriptHolder, this$static.script, this$static.placeholder));
      this$static.script = rv;
      this$static.placeholder = this$static.document_0.createElementNS('http://n.validator.nu/placeholder/', 'script');
      rv = this$static.placeholder;
      for (i = 0; i < attributes.length_0; ++i) {
        rv.setAttributeNS($getURI(attributes, i), $getLocalName(attributes, i), $getValue_0(attributes, i));
      }
    }
    return rv;
  }
   catch ($e0) {
    $e0 = caught($e0);
    if (instanceOf($e0, 29)) {
      e = $e0;
      $fatal(this$static, e);
      throw $RuntimeException(new RuntimeException, 'Unreachable');
    }
     else 
      throw $e0;
  }
}

function $createElement_0(this$static, ns, name_0, attributes){
  var $e0, e, rv;
  try {
    rv = $createElement(this$static, ns, name_0, attributes);
    return rv;
  }
   catch ($e0) {
    $e0 = caught($e0);
    if (instanceOf($e0, 29)) {
      e = $e0;
      $fatal(this$static, e);
      return null;
    }
     else 
      throw $e0;
  }
}

function $createHtmlElementSetAsRoot(this$static, attributes){
  var $e0, e, i, rv;
  try {
    rv = this$static.document_0.createElementNS('http://www.w3.org/1999/xhtml', 'html');
    for (i = 0; i < attributes.length_0; ++i) {
      rv.setAttributeNS($getURI(attributes, i), $getLocalName(attributes, i), $getValue_0(attributes, i));
    }
    this$static.document_0.appendChild(rv);
    return rv;
  }
   catch ($e0) {
    $e0 = caught($e0);
    if (instanceOf($e0, 29)) {
      e = $e0;
      $fatal(this$static, e);
      throw $RuntimeException(new RuntimeException, 'Unreachable');
    }
     else 
      throw $e0;
  }
}

function $detachFromParent(this$static, element){
  var $e0, e, parent_0;
  try {
    parent_0 = element.parentNode;
    !!parent_0 && (parent_0.removeChild(element) , undefined);
  }
   catch ($e0) {
    $e0 = caught($e0);
    if (instanceOf($e0, 29)) {
      e = $e0;
      $fatal(this$static, e);
    }
     else 
      throw $e0;
  }
}

function $elementPopped(this$static, ns, name_0, node){
  if (node == this$static.placeholder) {
    this$static.readyToRun = true;
    this$static.tokenizer.shouldSuspend = true;
  }
  __elementPopped__(ns, name_0, node);
}

function $getDocument(this$static){
  var rv;
  rv = this$static.document_0;
  this$static.document_0 = null;
  return rv;
}

function $insertFosterParentedCharacters_0(this$static, text, table, stackParent){
  var $e0, child, e, parent_0;
  try {
    child = this$static.document_0.createTextNode(text);
    parent_0 = table.parentNode;
    !!parent_0 && parent_0.nodeType == 1?(parent_0.insertBefore(child, table) , undefined):(stackParent.appendChild(child) , undefined);
  }
   catch ($e0) {
    $e0 = caught($e0);
    if (instanceOf($e0, 29)) {
      e = $e0;
      $fatal(this$static, e);
    }
     else 
      throw $e0;
  }
}

function $insertFosterParentedChild(this$static, child, table, stackParent){
  var $e0, e, parent_0;
  parent_0 = table.parentNode;
  try {
    !!parent_0 && parent_0.nodeType == 1?(parent_0.insertBefore(child, table) , undefined):(stackParent.appendChild(child) , undefined);
  }
   catch ($e0) {
    $e0 = caught($e0);
    if (instanceOf($e0, 29)) {
      e = $e0;
      $fatal(this$static, e);
    }
     else 
      throw $e0;
  }
}

function $maybeRunScript(this$static){
  var scriptHolder;
  if (this$static.readyToRun) {
    this$static.readyToRun = false;
    replace_0(this$static.placeholder, this$static.script);
    if (this$static.scriptStack.size == 0) {
      this$static.script = null;
      this$static.placeholder = null;
    }
     else {
      scriptHolder = dynamicCast($removeLast(this$static.scriptStack), 30);
      this$static.script = scriptHolder.script;
      this$static.placeholder = scriptHolder.placeholder;
    }
  }
}

function getClass_62(){
  return Lnu_validator_htmlparser_gwt_BrowserTreeBuilder_2_classLit;
}

function installExplorerCreateElementNS(doc){
  !doc.createElementNS && (doc.createElementNS = function(uri, local){
    if ('http://www.w3.org/1999/xhtml' == uri) {
      return doc.createElement(local);
    }
     else if ('http://www.w3.org/1998/Math/MathML' == uri) {
      if (!doc.mathplayerinitialized) {
        var obj = document.createElement('object');
        obj.setAttribute('id', 'mathplayer');
        obj.setAttribute('classid', 'clsid:32F66A20-7614-11D4-BD11-00104BD3F987');
        document.getElementsByTagName('head')[0].appendChild(obj);
        document.namespaces.add('m', 'http://www.w3.org/1998/Math/MathML', '#mathplayer');
        doc.mathplayerinitialized = true;
      }
      return doc.createElement('m:' + local);
    }
     else if ('http://www.w3.org/2000/svg' == uri) {
      if (!doc.renesisinitialized) {
        var obj = document.createElement('object');
        obj.setAttribute('id', 'renesis');
        obj.setAttribute('classid', 'clsid:AC159093-1683-4BA2-9DCF-0C350141D7F2');
        document.getElementsByTagName('head')[0].appendChild(obj);
        document.namespaces.add('s', 'http://www.w3.org/2000/svg', '#renesis');
        doc.renesisinitialized = true;
      }
      return doc.createElement('s:' + local);
    }
  }
  );
}

function replace_0(oldNode, newNode){
  oldNode.parentNode.replaceChild(newNode, oldNode);
  __elementPopped__('', newNode.nodeName, newNode);
}

function BrowserTreeBuilder(){
}

_ = BrowserTreeBuilder.prototype = new CoalescingTreeBuilder;
_.getClass$ = getClass_62;
_.typeId$ = 0;
_.document_0 = null;
_.placeholder = null;
_.readyToRun = false;
_.script = null;
function $BrowserTreeBuilder$ScriptHolder(this$static, script, placeholder){
  this$static.script = script;
  this$static.placeholder = placeholder;
  return this$static;
}

function getClass_63(){
  return Lnu_validator_htmlparser_gwt_BrowserTreeBuilder$ScriptHolder_2_classLit;
}

function BrowserTreeBuilder$ScriptHolder(){
}

_ = BrowserTreeBuilder$ScriptHolder.prototype = new Object_0;
_.getClass$ = getClass_63;
_.typeId$ = 37;
_.placeholder = null;
_.script = null;
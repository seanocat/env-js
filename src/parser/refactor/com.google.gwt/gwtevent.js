
 function getClass_12(){
  return Lcom_google_gwt_event_shared_GwtEvent_2_classLit;
}

function toString_3(){
  return 'An event type';
}

function GwtEvent(){
}

_ = GwtEvent.prototype = new Object_0;
_.getClass$ = getClass_12;
_.toString$ = toString_3;
_.typeId$ = 0;
_.dead = false;
_.source = null;
function dispatch(p0){
  $onClose();
}

function fire(source){
  var event_0;
  if (TYPE) {
    event_0 = new CloseEvent;
    $fireEvent(source, event_0);
  }
}

function getAssociatedType(){
  return TYPE;
}

function getClass_13(){
  return Lcom_google_gwt_event_logical_shared_CloseEvent_2_classLit;
}

function CloseEvent(){
}

_ = CloseEvent.prototype = new GwtEvent;
_.dispatch = dispatch;
_.getAssociatedType = getAssociatedType;
_.getClass$ = getClass_13;
_.typeId$ = 0;
var TYPE = null;
function getClass_14(){
  return Lcom_google_gwt_event_shared_DefaultHandlerRegistration_2_classLit;
}

function DefaultHandlerRegistration(){
}

_ = DefaultHandlerRegistration.prototype = new Object_0;
_.getClass$ = getClass_14;
_.typeId$ = 0;
function $GwtEvent$Type(this$static){
  this$static.index = ++nextHashCode;
  return this$static;
}

function getClass_15(){
  return Lcom_google_gwt_event_shared_GwtEvent$Type_2_classLit;
}

function hashCode_2(){
  return this.index;
}

function toString_4(){
  return 'Event type';
}

function GwtEvent$Type(){
}

_ = GwtEvent$Type.prototype = new Object_0;
_.getClass$ = getClass_15;
_.hashCode$ = hashCode_2;
_.toString$ = toString_4;
_.typeId$ = 0;
_.index = 0;
var nextHashCode = 0;
function $addHandler(this$static, type, handler){
  this$static.firingDepth > 0?$defer(this$static, $HandlerManager$1(new HandlerManager$1, this$static, type, handler)):$addHandler_0(this$static.registry, type, handler);
  return new DefaultHandlerRegistration;
}

function $defer(this$static, command){
  !this$static.deferredDeltas && (this$static.deferredDeltas = $ArrayList(new ArrayList));
  $add(this$static.deferredDeltas, command);
}

function $fireEvent(this$static, event_0){
  var oldSource;
  if (event_0.dead) {
    event_0.dead = false;
    event_0.source = null;
  }
  oldSource = event_0.source;
  event_0.source = this$static.source;
  try {
    ++this$static.firingDepth;
    $fireEvent_0(this$static.registry, event_0, this$static.isReverseOrder);
  }
   finally {
    --this$static.firingDepth;
    this$static.firingDepth == 0 && $handleQueuedAddsAndRemoves(this$static);
  }
  if (oldSource == null) {
    event_0.dead = true;
    event_0.source = null;
  }
   else {
    event_0.source = oldSource;
  }
}

function $handleQueuedAddsAndRemoves(this$static){
  var c, c$iterator;
  if (this$static.deferredDeltas) {
    try {
      for (c$iterator = $AbstractList$IteratorImpl(new AbstractList$IteratorImpl, this$static.deferredDeltas); c$iterator.i < c$iterator.this$0.size_0();) {
        c = dynamicCast($next_0(c$iterator), 3);
        $addHandler_0(c.this$0.registry, c.val$type, c.val$handler);
      }
    }
     finally {
      this$static.deferredDeltas = null;
    }
  }
}

function getClass_16(){
  return Lcom_google_gwt_event_shared_HandlerManager_2_classLit;
}

function HandlerManager(){
}

_ = HandlerManager.prototype = new Object_0;
_.getClass$ = getClass_16;
_.typeId$ = 0;
_.deferredDeltas = null;
_.firingDepth = 0;
_.isReverseOrder = false;
_.registry = null;
_.source = null;
function $HandlerManager$1(this$static, this$0, val$type, val$handler){
  this$static.this$0 = this$0;
  this$static.val$type = val$type;
  this$static.val$handler = val$handler;
  return this$static;
}

function getClass_17(){
  return Lcom_google_gwt_event_shared_HandlerManager$1_2_classLit;
}

function HandlerManager$1(){
}

_ = HandlerManager$1.prototype = new Object_0;
_.getClass$ = getClass_17;
_.typeId$ = 7;
_.this$0 = null;
_.val$handler = null;
_.val$type = null;
function $HandlerManager$HandlerRegistry(this$static){
  this$static.map = $HashMap(new HashMap);
  return this$static;
}

function $addHandler_0(this$static, type, handler){
  var l;
  l = dynamicCast($get_1(this$static.map, type), 4);
  if (!l) {
    l = $ArrayList(new ArrayList);
    $put(this$static.map, type, l);
  }
  setCheck(l.array, l.size++, handler);
}

function $fireEvent_0(this$static, event_0, isReverseOrder){
  var count, handler, i, type, l, l_0, l_1;
  type = event_0.getAssociatedType();
  count = (l = dynamicCast($get_1(this$static.map, type), 4) , !l?0:l.size);
  if (isReverseOrder) {
    for (i = count - 1; i >= 0; --i) {
      handler = (l_0 = dynamicCast($get_1(this$static.map, type), 4) , dynamicCast((checkIndex(i, l_0.size) , l_0.array[i]), 20));
      event_0.dispatch(handler);
    }
  }
   else {
    for (i = 0; i < count; ++i) {
      handler = (l_1 = dynamicCast($get_1(this$static.map, type), 4) , dynamicCast((checkIndex(i, l_1.size) , l_1.array[i]), 20));
      event_0.dispatch(handler);
    }
  }
}

function getClass_18(){
  return Lcom_google_gwt_event_shared_HandlerManager$HandlerRegistry_2_classLit;
}

function HandlerManager$HandlerRegistry(){
}

_ = HandlerManager$HandlerRegistry.prototype = new Object_0;
_.getClass$ = getClass_18;
_.typeId$ = 0;

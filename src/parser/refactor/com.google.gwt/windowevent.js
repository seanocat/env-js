
 function addCloseHandler(handler){
  maybeInitializeCloseHandlers();
  return addHandler(TYPE?TYPE:(TYPE = $GwtEvent$Type(new GwtEvent$Type)), handler);
}

function addHandler(type, handler){
  return $addHandler(getHandlers(), type, handler);
}

function getHandlers(){
  !handlers && (handlers = $Window$WindowHandlers(new Window$WindowHandlers));
  return handlers;
}

function maybeInitializeCloseHandlers(){
  if (!closeHandlersInitialized) {
    $initWindowCloseHandler();
    closeHandlersInitialized = true;
  }
}

function onClosing(){
  var event_0;
  if (closeHandlersInitialized) {
    event_0 = ($clinit_50() , new Window$ClosingEvent);
    !!handlers && $fireEvent(handlers, event_0);
    return null;
  }
  return null;
}

var closeHandlersInitialized = false, handlers = null;
function $clinit_50(){
  $clinit_50 = nullMethod;
  TYPE_0 = $GwtEvent$Type(new GwtEvent$Type);
}

function dispatch_0(p0){
  throwClassCastExceptionUnlessNull(p0);
  null.nullMethod();
}

function getAssociatedType_0(){
  return TYPE_0;
}

function getClass_22(){
  return Lcom_google_gwt_user_client_Window$ClosingEvent_2_classLit;
}

function Window$ClosingEvent(){
}

_ = Window$ClosingEvent.prototype = new GwtEvent;
_.dispatch = dispatch_0;
_.getAssociatedType = getAssociatedType_0;
_.getClass$ = getClass_22;
_.typeId$ = 0;
var TYPE_0;
function $Window$WindowHandlers(this$static){
  this$static.registry = $HandlerManager$HandlerRegistry(new HandlerManager$HandlerRegistry);
  this$static.source = null;
  this$static.isReverseOrder = false;
  return this$static;
}

function getClass_23(){
  return Lcom_google_gwt_user_client_Window$WindowHandlers_2_classLit;
}

function Window$WindowHandlers(){
}

_ = Window$WindowHandlers.prototype = new HandlerManager;
_.getClass$ = getClass_23;
_.typeId$ = 0;
function $initWindowCloseHandler(){
  var oldOnBeforeUnload = $wnd.onbeforeunload;
  var oldOnUnload = $wnd.onunload;
  $wnd.onbeforeunload = function(evt){
    var ret, oldRet;
    try {
      ret = $entry(onClosing)();
    }
     finally {
      oldRet = oldOnBeforeUnload && oldOnBeforeUnload(evt);
    }
    if (ret != null) {
      return ret;
    }
    if (oldRet != null) {
      return oldRet;
    }
  }
  ;
  $wnd.onunload = $entry(function(evt){
    try {
      closeHandlersInitialized && fire(getHandlers());
    }
     finally {
      oldOnUnload && oldOnUnload(evt);
      $wnd.onresize = null;
      $wnd.onscroll = null;
      $wnd.onbeforeunload = null;
      $wnd.onunload = null;
    }
  }
  );
}

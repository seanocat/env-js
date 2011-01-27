function $clinit_47(){
  $clinit_47 = nullMethod;
  timers = $ArrayList(new ArrayList);
  addCloseHandler(new Timer$1);
}

function $cancel(this$static){
  this$static.isRepeating?($wnd.clearInterval(this$static.timerId) , undefined):($wnd.clearTimeout(this$static.timerId) , undefined);
  $remove_0(timers, this$static);
}

function $schedule(this$static, delayMillis){
  if (delayMillis <= 0) {
    throw $IllegalArgumentException(new IllegalArgumentException, 'must be positive');
  }
  $cancel(this$static);
  this$static.isRepeating = false;
  this$static.timerId = createTimeout(this$static, delayMillis);
  $add(timers, this$static);
}

function createTimeout(timer, delay){
  return $wnd.setTimeout($entry(function(){
    timer.fire();
  }
  ), delay);
}

function fire_0(){
  !this.isRepeating && $remove_0(timers, this);
  $run(this);
}

function getClass_20(){
  return Lcom_google_gwt_user_client_Timer_2_classLit;
}

function Timer(){
}

_ = Timer.prototype = new Object_0;
_.fire = fire_0;
_.getClass$ = getClass_20;
_.typeId$ = 0;
_.isRepeating = false;
_.timerId = 0;
var timers;
function $onClose(){
  while (($clinit_47() , timers).size > 0) {
    $cancel(dynamicCast($get_2(timers, 0), 22));
  }
}

function getClass_21(){
  return Lcom_google_gwt_user_client_Timer$1_2_classLit;
}

function Timer$1(){
}

_ = Timer$1.prototype = new Object_0;
_.getClass$ = getClass_21;
_.typeId$ = 8;

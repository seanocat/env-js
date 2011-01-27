function nullMethod(){
}

function equals(other){
	return this === (other == null?null:other);
}

function getClass_0(){
	return Ljava_lang_Object_2_classLit;
}

function hashCode_0(){
	return this.$H || (this.$H = ++sNextHashId);
}

function toString_0(){
	return (this.typeMarker$ == nullMethod || this.typeId$ == 2?this.getClass$():Lcom_google_gwt_core_client_JavaScriptObject_2_classLit).typeName + '@' + toPowerOfTwoString(this.typeMarker$ == nullMethod || this.typeId$ == 2?this.hashCode$():this.$H || (this.$H = ++sNextHashId), 4);
}

function Object_0(){
}

_ = Object_0.prototype = {};
_.equals$ = equals;
_.getClass$ = getClass_0;
_.hashCode$ = hashCode_0;
_.toString$ = toString_0;
_.toString = function(){
	return this.toString$();
}
;
_.typeMarker$ = nullMethod;
_.typeId$ = 1;

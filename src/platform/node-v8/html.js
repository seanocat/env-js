var Script = require('vm');

Envjs.eval = function(context, source, name, warming){
	if(context === global){
		return warming ? 
			eval(source) :
			Script.runInThisContext(source, name);
	}else{
		return Script.runInNewContext(source, context, name);
	}
};

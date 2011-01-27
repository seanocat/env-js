/**
 * @author thatcher
 */
document.location =  './specs/window/index.html';

document.addEventListener('load', function(){
	console.log('document.title %s', document.title);
	console.log('document.body %s', document.body.innerHTML);
});


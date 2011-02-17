var now = Date.now();

document.location = 'http://www.zope.com/';

document.addEventListener('DOMContentLoaded', function(){
    console.log('%s (loaded in %s)', document.title, Date.now() - now);
}, true);


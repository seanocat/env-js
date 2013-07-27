var now = Date.now();

// document.location = 'http://www.zope.com/';
// document.location = 'http://en.wikipedia.org/wiki/Special:Search';
// document.location = 'http://www.ubuntu.com';
document.location = 'http://nodejs-kr.org';

document.addEventListener('DOMContentLoaded', function(){
    console.log('%s (loaded in %s)', document.title, Date.now() - now);
}, true);


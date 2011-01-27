
var testurl = 'http://localhost:8080/';

var check_urls = function(event){
	console.log('Sample: document %s loaded in %s', document.title, Date.now()-start);
	document.removeEventListener('load', check_urls);
	jQuery('a').each(function(){
		console.log('a -> %s', $(this).attr('href'));
	});
	jQuery.ajax({
	    type:'get',
	    url: '/?fo=json',
	    dataType: 'json',
	    success: function(data){
	        console.log('loaded json via ajax %s', data);
	    },
	    error: function(xhr, status, e){
	        console.log('failed to load json via ajax %s %s \n%s', 
				xhr.status, xhr.url, e);
	    }
	});
	console.log('loading json via ajax');
};

document.addEventListener('load', check_urls);

var start = Date.now();
console.log('Sample: loading %s', testurl);
document.location = testurl;

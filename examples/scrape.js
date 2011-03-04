/**
 * @author thatcher
 */
require('plugins/jquery');

var site = 'http://www.envjs.com/';

console.log('SCRAPING SITE %s', site);

document.location = site;

function scrape(url, links){
    
    // scrape text from current document which we will
    // assign weights to in our search index
    var data = {
        $id: encodeURIComponent(url),
        url: url,
        title: document.title,
        headings: $('h1, h2, h3, h4, h5, h6').map(function(){
            return $(this).text();
        }),
        keywords: $('meta[name=keywords]').attr('content'),
        links: [],
        description: $('meta[name=description]').attr('content'),
        full_text: $(document.body).text()
    };
    
    data.keywords = data.keywords ? data.keywords.split(',') : [];
    $(data.keywords).each(function(i){ data.keywords[i] = $.trim(this);});
    data.headings = data.headings ? $.makeArray(data.headings) : '';
    $(data.headings).each(function(i){ data.headings[i] = $.trim(this);});
    data.full_text = data.full_text ? data.full_text.replace(/\s+/g, ' ') : '';
    
    // find all the relavant links, but don't include any we
    // already have in our link array
    $('a[href]').each(function(){
        var href = $.trim($(this).attr('href'));
        data.links.push(Envjs.uri(href));
        if($.inArray(href, links) == -1 && 
           $.inArray(Envjs.uri(href), links) == -1 && 
           !href.match(/^(\s)*http|#/) && 
           !href.match(/(.jar|.zip|.tgz|.gz|.tar|.js)\s*$/)){
            //we only want to crawl local links
            console.log('ADDING LINK TO LIST: %s', Envjs.uri(href));
            links.push(href);
        }
    });
    
    // write the record to console (probably would want to post
    // to a restful db like couchdb, mongodb or elasticsearch)
    console.log("SCRAPED DATA: %s", JSON.stringify(data, null, '  '));
};

// create an array which we'll use
// to store relavant links to crawl
var links = [site],
    current_link = 1,
    page;
    
var next = function(){
    // index this document 
    scrape(document.location.toString(), links);
    
    // now crawl our links
    if(current_link < links.length){
        try{
            // replaces this document with the document
            // from the link
            page = Envjs.uri(links[current_link++]);
            console.log('LOADING PAGE %s', page);
            document.location = page;
        }catch(e){
            console.log('FAILED TO LOAD PAGE %s \n %s', page, e);
        }
    }else{
        console.log('SITE SCRAPE COMPLETE: %s of %s', current_link, links.length);
    }

};

//This is basically our initial page load event handler
$(document).bind('load', next);

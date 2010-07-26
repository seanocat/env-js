/**
 * @author thatcher
 */
load('lib/env.rhino.js');
load('lib/jquery-1.4.2.js');
load('local_settings.js');

// All we are using to geocode the record is the item title
// and in particular the last 4 parts of the comma separted
// title parts
function get_item_title(i){
    var title;
    $.ajax({
        url:XMLDB_HHH_DUMP,
        contentType:'application/xml',
        dataType:'xml',
        type:'get',
        data:{
            _query: '/collection/document/item_title',
            _howmany: 1,
            _wrap: false,
            _start: i
        },
        async: false,
        success: function(xml){
            title = $(xml).text();
            console.log('item %s title %s', i ,title);
        }
    });
    return title;
};


function get_document_id(i){
    var id;
    $.ajax({
        url:XMLDB_HHH_DUMP,
        contentType:'application/xml',
        dataType:'xml',
        type:'get',
        data:{
            _query: '/collection/document/document_id',
            _howmany: 1,
            _wrap: false,
            _start: i
        },
        async: false,
        success: function(xml){
            id = $(xml).text();
            console.log('document %s id %s', i ,id);
        }
    });
    return id;
};

function geocode_by_title(title, id){
    
    var geocode;
            
    title = title.split(',');
    if(title.length > 3){
        title = title.slice(title.length - 4, title.length).join(',');
    }else{
        title = title.join(',');
    }
    
    $.ajax({
        url:"http://maps.google.com/maps/api/geocode/json",
        dataType:'text',
        type:'get',
        data:{
            address: title,
            sensor: false
        },
        async: false,
        success: function(json_text){
            //save it out to flat file 
            var flat_file = Envjs.uri(DATADIR_HHH + id + '.json');
            Envjs.writeToFile(json_text, flat_file);
            geocode = JSON.parse(json_text);
            console.log('got geocodes for %s %s', title, geocode.status);
        }
    });
    
    return geocode;
};

$(function(){
    var current_item_title,
        current_document_id, 
        current_post;
    //create the domain just in case its not create yet
    $.ajax({
        url:JSONDB_HHH,
        contentType:'application/json',
        dataType:'json',
        type:'put',
        async: false,
        success: function(){
            console.log('created domain %s', JSONDB_HHH);
        },
        error: function(xhr, status, e){
            console.log('failed to create domain', JSONDB_HHH);
        },
        beforeSend: function(xhr){
            xhr.setRequestHeader('Content-Length', 0);
        }
    });
    
    // now crawl our xmldb
    for(var i = GEOCODE_HHH_START; i <= GEOCODE_HHH_END; i++){
        try{
            current_document_id = get_document_id(i);
            current_item_title = get_item_title(i);
            geocode = geocode_by_title(
                current_item_title, 
                current_document_id
            );
            if(geocode.status == "OK"){
                // only save to json rest db if it was a successful
                // geocoding.  we have the raw response in a local
                // file anyway
                $(geocode.results).each(function(index, result){
                    current_post = {
                        $id: current_document_id+'-'+index,
                        title: current_item_title,
                        formatted_address : result.formatted_address,
                        status: "OK",
                        types: result.types,
                        latitude: result.geometry.location.lat,
                        longitude : result.geometry.location.lng,
                        location_type : result.geometry.location_type
                    };
                    current_post = JSON.stringify(current_post, null, '');
                    $.ajax({
                        url: JSONDB_HHH + '/' + current_document_id + '-' + index,
                        contentType: 'application/json',
                        dataType:'json',
                        type:'post',
                        async: false,
                        data: current_post,
                        success: function(){
                            console.log('saved record %s', current_document_id);
                        },
                        beforeSend: function(xhr){
                            xhr.setRequestHeader('Content-Length', current_post.length);
                        }
                    });
                });
            }else if(geocode.status == "OVER_QUERY_LIMIT"){
                console.log(
                    'over query limit [start %i] [current %s]', 
                    GEOCODE_HHH_START, 
                    i
                );
                break;
            }else{
                current_post = {
                    $id: current_document_id,
                    title: current_item_title,
                    status: geocode.status
                };
                current_post = JSON.stringify(current_post, null, '');
                $.ajax({
                    url: JSONDB_HHH + '/' + current_document_id,
                    contentType: 'application/json',
                    dataType:'json',
                    type:'post',
                    async: false,
                    data: current_post,
                    success: function(){
                        console.log('saved record %s', current_document_id);
                    },
                    beforeSend: function(xhr){
                        xhr.setRequestHeader('Content-Length', current_post.length);
                    }
                });
            }
        }catch(e){
            console.log('failed to geocode document %s \n %s', i, e);
        }
    }
    

});

window.location = 'http://localhost:8001/eup/';

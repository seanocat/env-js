/**
 *
 * This file is a component of env.js,
 *     http://github.com/thatcher/env-js/
 * a Pure JavaScript Browser Environment
 * Copyright 2010 John Resig, licensed under the MIT License
 *     http://www.opensource.org/licenses/mit-license.php
 *
 * @author gleneivey
 */

QUnit.module('scope');


test("Basic window object/global scope identity", function(){

    fred = "This is a known string with a sentence in it.";
    ok( window.fred === fred, 'Global variables appear as window members' );
    delete window.fred;

    window.barney = "This is another known string.";
    ok( window.barney === barney, 'Window members appear as global variables' );
    delete window.barney;

    ok( Math, 'Standard JavaScript language built-in objects are globals' );
    ok( window.Math, 'JS language built-ins also appear as window members' );

    // defined in specs/fixtures/define-some-variables.js, loaded in index.html
    ok( aGlobalVariable == "is aGlobalVariable",
        'global variables defined in external files visible' );
    ok( window.aGlobalVariable == "is aGlobalVariable",
        'global variables defined in external files are window members' );
    ok( aTopLevelVarVariable == "is aTopLevelVarVariable",
        '"var" variables defined in external files visible' );
    ok( window.aTopLevelVarVariable == "is aTopLevelVarVariable",
        '"var" variables defined in external files are window members' );
});


asyncTest("Basic iframe behaviors", function(){
    var adjustExpect = runningUnderEnvjs() ? 0 : -3;
/* should be this
    expect( 8+8+8 + 0 + adjustExpect );
 * but asserts commented out in ok_accessToIFrame1x() mean we do this for now:
*/  expect( 7+7+7 + 0 + adjustExpect );


        // check for things loaded directly by index.html
    // iframeXa.html loaded via src= attribute when index.html was parsed
    var iframe = document.getElementById('loaded-iframe');
    ok_accessToIFrame1x(iframe, contentOfIFrameA,
        'iframe loads with page load');


        // for dynamically-loaded iframes, we need to use QUnit's
        // async testing features
    // test dynamic loading of an empty iframe
    var emptyIFrame = document.getElementById('empty-iframe');
    emptyIFrame.onload = function(){
        ok_accessToIFrame1x(emptyIFrame, contentOfIFrameA,
            'empty iframe loads on .src=');
    };
    emptyIFrame.src = "../fixtures/scope/iframeXa.html";

    // test dynamic reloading of an already-populated iframe
    iframe.onload = function(){
        ok_accessToIFrame1x(iframe, contentOfIFrameB,
            'iframe reloads on .src=');
    }
    iframe.src = "../fixtures/scope/iframeXb.html";

    setTimeout(function(){
        start();
    }, 300);     // short should be fine as long as tests are always
                 // run via "file:" or from a web server on same host
});

// iframe1a and iframe1b are identical in structure (so we can use the
//   same assertions against both), but different in content text (so
//   that we can tell which one is currently loaded).  So, create an
//   object (associative array) that is specific to the content of each.
contentOfIFrameA = {
    urlRE : /scope.iframeXa.html$/,
    titleRE : /IFRAME/,
    elementId : 'anElementWithText',
    elementRE : /content of a paragraph/
};
contentOfIFrameB = {
    urlRE : /scope.iframeXb.html$/,
    titleRE : /iframeXb.html/,
    elementId : 'anotherElementWithText',
    elementRE : /block-quote element/
};


// add 7-or-8 to your expect() call's argument for each call to this function
function ok_accessToIFrame1x(iframe, contentOf, message){
    ok( iframe.src.match(contentOf.urlRE),
        message + ": Initial iframe src matches test page source" );

    var idoc = iframe.contentDocument;
    ok( idoc, message + ": Can get 'document' object from test iframe" );
    ok( idoc.title.match(contentOf.titleRE),
        message + ": iframe's title is correct" );

    var para = idoc.getElementById(contentOf.elementId);
    ok( para, message + ": can get paragraph by ID" );
    ok( para.innerHTML.match(contentOf.elementRE),
        message + ": iframe's conent is correct" );


    if (window.top.allTestsAreBeingRunWithinAnExtraIFrame)
        equals( iframe.contentWindow.top, window.parent, message +
            ": '.top' from iframe does point to top window" );
    else
        equals( iframe.contentWindow.top, window, message +
            ": '.top' from iframe does point to top window" );


    // document.parentWindow is IE-specific extension implemented by env.js
    if (runningUnderEnvjs()){
        equals( idoc.parentWindow, iframe.contentWindow, message +
            ": iframe doc's .parentWindow points to iframe's .contentWindow");
/* re-enable this once the preceding passes
        equals( idoc.parentWindow.parent, window, message +
            ": Can follow chain from iframe's doc to containing window");
*/
    }
}


asyncTest("Iframe nesting", function(){
    var startingDepth = 3;
    // if you change 'endingDepth', you'll have to adjust the set of
    // iframe#.html symbolic links in specs/fixtures/scope and will
    // probably want to change the frame-height constant in
    // recursivelyInsertIFrames() in the style="" attribute.
    var endingDepth   = 7;

    expect(
        // firstOnloadHandlerContainingTests
        4
        // secondOnloadHandlerContainingTests
        + 2 + (6*((endingDepth - startingDepth)+1))
    );

    window.top.numberNestedIframeLoads = 2;
    window.top.windowLoadCount = 0;


    var topNestingIFrame = document.getElementById('nesting-iframe');
    var secondOnloadHandlerContainingTests;
    var firstOnloadHandlerContainingTests = function(){
// iframe1.html contains a static <iframe> element that loads iframe2.html,
// now we should have both loaded, with the structure that
//     index.html --contains--> iframe1.html --contains--> iframe2.html
// w/ id's =     nesting-iframe              nested1Level

        // verify we have as described above
        ok( topNestingIFrame.contentDocument.title.match(/nested-IFRAME/),
            "top-level IFRAME loaded from correct source" );
        var iframeNested1 = topNestingIFrame.contentDocument.
            getElementById('nested1Level');
        ok( iframeNested1.contentDocument.title.match(/IFRAME loading/),
            "can access content of one IFRAME nested in another" );
        equals( iframeNested1.contentWindow.parent.parent, window,
            "can follow 'parent' path from nested IFRAME to root window");

        if (top.allTestsAreBeingRunWithinAnExtraIFrame)
            equals( iframeNested1.contentWindow.top, window.parent,
                "nested IFRAME has correct .top");
        else
            equals( iframeNested1.contentWindow.top, window,
                "nested IFRAME has correct .top");


        // now, we'll programatically extend the nesting depth from 2 to many
        recursivelyInsertIFrames( startingDepth, endingDepth, iframeNested1,
            secondOnloadHandlerContainingTests );
    };

    secondOnloadHandlerContainingTests = function(){
        var iframe = document.getElementById('nesting-iframe');
        iframe = iframe.contentDocument.getElementById('nested1Level');

        for (var c = startingDepth; c <= endingDepth; c++){
            iframe = iframe.contentDocument.
                getElementById("iframe_of_depth_" + c);

            var doc = iframe.contentDocument;
            var matchResult = doc.getElementById('nestingLevel').
                innerHTML.match(/[0-9]+/);
            ok( matchResult, "can access content " + c + " levels deep" );
            equals( parseInt(matchResult[0]), c,
                "content " + c + " levels deep is correct" );

            matchResult = doc.getElementById("pCreatedIframeOnload" + c).
                innerHTML.match(/para window onload ([0-9]+)/);
            ok( matchResult,
                "found paragraph created by level " + c + " window load" );
            equals( parseInt(matchResult[1]), c, "paragraph count is correct" );

            var aWindow = iframe.contentWindow;
            if (window.top.allTestsAreBeingRunWithinAnExtraIFrame)
                equals( aWindow.top, window.top,
                    "window " + c + " levels down has correct '.top'" );
            else
                equals( aWindow.top, window,
                    "window " + c + " levels down has correct '.top'" );
            for (var cn = c; cn > 0; cn--)
                aWindow = aWindow.parent;
            equals( aWindow, window,
                "can follow parent pointers " + c + " levels to root" );
        }

        equals( window.top.numberNestedIframeLoads, endingDepth,
            "all window onload events counted" );
        equals( window.top.windowLoadCount,
                (endingDepth - startingDepth)+2,
            "all iframe onload events counted" );
    };


    // trigger testing to start
    topNestingIFrame.onload = firstOnloadHandlerContainingTests;
    topNestingIFrame.src = "../fixtures/scope/iframe1.html";

    // restart QUnit framework once all frames loaded/asserts called
    setTimeout(function(){
        start();
    }, 1000);
});


function recursivelyInsertIFrames(
        depth, finalDepth, existingIframe, finalOnloadHandler ){
    var newIframe;
    newIframe = existingIframe.contentDocument.createElement("iframe");
    newIframe.setAttribute("id", "iframe_of_depth_" + depth);
    newIframe.setAttribute("style", "border: 3px solid blue; padding: 1em; " +
        "width: 95%; height: " + (1100-(140*depth)) + "px;");
    newIframe.src = "/env-js/specs/fixtures/scope/iframe" + depth + ".html";

    if (depth < finalDepth)
        newIframe.onload = function(){
            recursivelyInsertIFrames( depth+1, finalDepth, newIframe,
                finalOnloadHandler );
        };
    else
        newIframe.onload = finalOnloadHandler;

    existingIframe.contentDocument.getElementsByTagName('body')[0].
        appendChild(newIframe);
}


test("Scoping of JS inline in HTML", function(){
    expect(3);

    var idoc = document.getElementById('scope-iframe').contentDocument;
    ok( idoc.getElementById('js_generated_p').innerHTML.match(/Dynamic/),
        "Can get content from dynamically-generate p element" );

    ok( idoc.getElementById('internalDocRefResult').innerHTML.
            match(/exists-found/),
        "Got confirmation of access to 'document' object in iframe" );

    ok( idoc.getElementById('appended').innerHTML.match(/appended para/),
        "Got confirmation of body-onload execution in iframe" );
});


// the following tests depend on '../fixtures/scope/attribute.html'
//   being loaded into the iframe 'attribute-iframe' in
//   scope/index.html'.  Each test must only execute once.  Otherwise,
//   there are no test order dependencies except those noted on
//   individual tests.

test("Event handler attributes have access to correct scopes", function(){
    expect(3+3+3+3+2+2);

    // test:  img1.onclick creates p1
    var idoc = document.getElementById('attribute-iframe').contentDocument;
    ok( !(idoc.getElementById('p1')),
        "img1 event handler didn't execute early" );

    var img1 = idoc.getElementById('img1');
    ok( img1, "can find 'img1' in iframe" );
    dispatchClick(img1);
    ok( idoc.getElementById('p1').innerHTML.match(/img1 click/),
        "img1 event handler executed correctly" );


    // test:  div1.onclick creates p2
    ok( !(idoc.getElementById('p2')),
        "div1 event handler didn't execute early" );
    var div1 = idoc.getElementById('div1');
    ok( div1, "can find 'div1' in iframe" );
    dispatchClick(div1);
    ok( idoc.getElementById('p2').innerHTML.match(/div1 click/),
        "div1 event handler executed correctly" );


    // test:  text1.onchange creates p3 containing values from several elements
    ok( !(idoc.getElementById('p3')),
        "text1 event handler didn't execute early" );
    var text1 = idoc.getElementById('text1');
    ok( text1, "can find 'text1' in iframe" );

    text1.value = "a New Input Value";
    dispatchChange(text1);

    var goodRE = /components:\s+--text1--\s+--a New Input Value--\s+--text--\s+--42--\s+--.*post-url--\s+--post--\s+--0--\s+----/;
    // other DOM object members:
    //--Table Caption--\s+--all--\s+
    ok( idoc.getElementById('p3').innerHTML.match(goodRE),
        "text1 event handler executed correctly" );


    // test:  div2.onclick creates paragraph 'lex' at end of div2
    aVar = "very bad"; // handler must *not* pick up this version of 'aVar'

    ok( !(idoc.getElementById('lex')),
        "div2 event handler didn't execute early" );
    var div2 = idoc.getElementById('div2');
    dispatchClick(div2);
    var lex = idoc.getElementById('lex');
    ok( lex.innerHTML.match(/Lexical scoping is Overridden/),
        "div2 click handler generated correct content" );
    equals( div2, lex.parentNode,
        "div2 click handler generated p in correct location" );


    // test:  div3.onclick creates a p with values from iframe's global scope
    var p4 = idoc.getElementById('p4');
    ok( !(p4.innerHTML.match(/Third sentence/)),
        "div3 event handler didn't execute early");

    bVar = 13; // handler should *not* pick up this version of 'bVar'
    dispatchClick(p4);  // should bubble to div3 and its handler
    ok( p4.innerHTML.match(/number 42/),
        "div3 event handler executed correctly" );

    // test:  create an onclick fn in this scope, attach/execute in iframe
    var p4 = idoc.getElementById('p4');
    var div3 = idoc.getElementById('div3');
    var checkValue = "contains good text";
    div3.onclick = function(){ p4.appendChild(idoc.createTextNode(
        "  Fourth sentence " + checkValue + "."));
    }

    ok( !(p4.innerHTML.match(/Fourth sentence/)),
        "new div3 event handler didn't execute early" );
    dispatchClick(div3);
    ok( p4.innerHTML.match(/contains good text/),
        "new div3 event handler executed correctly" );
});

function dispatchClick(element){
    var event = element.ownerDocument.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    element.dispatchEvent(event);
}

function dispatchChange(element){
    var event = element.ownerDocument.createEvent("HTMLEvents");
    event.initEvent("change", true, true);
    element.dispatchEvent(event);
}


asyncTest("window.open() operates correctly", function(){
    expect(29);

    top.functionToCallFromSubwindowOnload = null;
    top.shouldntIncrementCounter = 0;
    var shouldntExecuteHandler = function(){
        var originalWin = opener ? opener.top : top;
        originalWin.shouldntIncrementCounter++;
    };


          // setup for event handler functions containing asserts
    var secondWindowPassCounter = 1;
    var secondWindowFirstAsserts;
    var secondWindowSecondAsserts;
    var secondWindowThirdAsserts;
    var thirdWindowFirstAsserts;
    var thirdWindowSecondAsserts;

    var anotherWin;
    var thirdWin;


    secondWindowFirstAsserts = function(){
        ok( anotherWin, "'window.open' returns new object" );
        equals( anotherWin.closed, false,
            "2nd window knows that it isn't closed" );
        ok( anotherWin.document.getElementById('oneP').innerHTML.
                match(/Nearly-empty HTML/),
            "2nd window has correct contents" );
        equals( anotherWin.opener, window,
            "2nd window's .opener is original window" );
        equals( anotherWin.top, anotherWin, "2nd window's .top is itself" );
        equals( anotherWin.parent, anotherWin,
            "2nd window's .parent is itself" );
        equals( anotherWin.document.referrer, location.href,
            "2nd window's document.referrer points to this one" );

        top.functionToCallFromSubwindowOnload = secondWindowSecondAsserts;
        anotherWin.onload = shouldntExecuteHandler;
        anotherWin.location = "with_js.html";
    };

    secondWindowSecondAsserts = function(){
        ok( anotherWin.location, "1st explicit '.location=' completed");
        ok( anotherWin.document.getElementById('HeaderLevel1').
                innerHTML.match(/Hello/),
            "location setter-loaded content is correct" );

        top.functionToCallFromSubwindowOnload = secondWindowThirdAsserts;
        anotherWin.onload = shouldntExecuteHandler;
        anotherWin.location = "trivial.html";
    };

    secondWindowThirdAsserts = function(){
        ok( anotherWin.document.getElementById('oneP').innerHTML.
                match(/Nearly-empty HTML/),
            "2nd location setter-loaded content is correct" );

        top.functionToCallFromSubwindowOnload = null;
        thirdWin = window.open("with_js.html", "thirdWin");
        ok( thirdWin, "2nd 'window.open' returns 3rd window" );
        thirdWin.onload = thirdWindowFirstAsserts;
    };

    thirdWindowFirstAsserts = function(){
        ok( thirdWin.document.getElementById('HeaderLevel1').
                innerHTML.match(/Hello/),
            "3rd window's content is correct" );
        ok( anotherWin.document.getElementById('oneP').innerHTML.
                match(/Nearly-empty HTML/),
            "after 3rd window, 2nd's content still correct" );
        equals( document.title, "Envjs Scope Spec",
            "after 3rd window, original's content still correct" );

        equals( thirdWin.getTestVariables()[0], "hello, scope",
            "function from open()'ed window's scope callable");
        equals( thirdWin.getTestVariables()[1], null,
            "dynamically-created test variable in 3rd win doesn't exist yet");

        thirdWin.setTestVariable(42);
        equals( thirdWin.getTestVariables()[1], 42,
            "variable in other window's scope created correctly");
        equals( thirdWin.notAlwaysPresentVariable, 42,
            "variable in other window's scope accessible directly, too");

        top.functionToCallFromSubwindowOnload = thirdWindowSecondAsserts;
        thirdWin.onload = shouldntExecuteHandler;
        thirdWin.location = "with_js.html"
    };

    thirdWindowSecondAsserts = function(){
        equals( thirdWin.getTestVariables()[1], null,
            "reloaded window has clean variable scope" );

        thirdWin.notAlwaysPresentVariable = 55;
        equals( thirdWin.getTestVariables()[1], 55,
            "directly-set variable visible to code executing in other scope" );

        equals( typeof window.notAlwaysPresentVariable, "undefined",
"creating variable in 3rd window scope doesn't affect original window" );
        equals( typeof anotherWin.notAlwaysPresentVariable, "undefined",
            "creating variable in 3rd window scope doesn't affect 2nd window" );


        anotherWin.close();
        equals( anotherWin.closed, true,
            "after closing 2nd window, '.closed' is true" );
        equals( window.closed, false,
            "closing 2nd window doesn't affect original window" );
        equals( thirdWin.closed, false,
            "closing 2nd window doesn't affect 3rd window");

        thirdWin.close();
        equals( thirdWin.closed, true,
            "after closing 3rd window, '.closed' is true" );
        equals( window.closed, false,
            "closing 3rd window doesn't affect original window" );
        equals( thirdWin.closed, true,
            "3rd window still closed");


            // do end-of-test checks
        equals( top.shouldntIncrementCounter, 0,
            "No events-that-shouldn't-happen counted" );
        start();
    };


        // start test and first (anonymous) batch of asserts
    anotherWin = window.open("../fixtures/scope/trivial.html", "secondWin");
    anotherWin.onload = secondWindowFirstAsserts;
});

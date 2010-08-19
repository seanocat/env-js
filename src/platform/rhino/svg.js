Envjs.renderSVG = function(svgstring, url){
        //console.log("svg template url %s", templateSVG);
        // Create a JPEG transcoder
        var t = new Packages.org.apache.batik.transcoder.image.JPEGTranscoder();

        // Set the transcoding hints.
        t.addTranscodingHint(
            Packages.org.apache.batik.transcoder.image.JPEGTranscoder.KEY_QUALITY,
            new java.lang.Float(1.0));
        // Create the transcoder input.
        var input = new Packages.org.apache.batik.transcoder.TranscoderInput(
            new java.io.StringReader(svgstring));

        // Create the transcoder output.
        var ostream = new java.io.ByteArrayOutputStream();
        var output = new Packages.org.apache.batik.transcoder.TranscoderOutput(ostream);

        // Save the image.
        t.transcode(input, output);

        // Flush and close the stream.
        ostream.flush();
        ostream.close();
        
		var out = new java.io.FileWriter(
	        new java.io.File(
	            new java.net.URI(url.toString())));
		var bytes = ostream.toByteArray(); 
	    out.write( bytes, 0, bytes.size() );
	    out.flush();
	    out.close();
    }
};
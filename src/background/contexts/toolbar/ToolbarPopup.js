
var ToolbarPopup = function( properties ) {

	OPromise.call( this );

	this.properties = {
	  href: "",
	  width: 300,
	  height: 300
	};
	
	// internal properties
	this.isExternalHref = false;
	
	this.href = properties.href;
	this.width = properties.width;
	this.height = properties.height;
	
	this.applyHrefVal = function() {
		// If href points to a http or https resource we need to load it via an iframe
		if(this.isExternalHref === true) {
			return "/oex_shim/popup_resourceloader.html?href=" + global.btoa(this.properties.href) +
              "&w=" + this.properties.width + "&h=" + this.properties.height;
		}
		
		return this.properties.href + (this.properties.href.indexOf('?') > 0 ? '&' : '?' ) + 
		        "w=" + this.properties.width + "&h=" + this.properties.height;
	};

};

ToolbarPopup.prototype = Object.create( OPromise.prototype );

ToolbarPopup.prototype.apply = function() {
  
  if(this.properties.href && this.properties.href !== "undefined" && this.properties.href !== "null" && this.properties.href !== "") {

	  chrome.browserAction.setPopup({ "popup": this.applyHrefVal() });
	
  } else {
    
    chrome.browserAction.setPopup({ "popup": "" });
    
  }

};

// API

ToolbarPopup.prototype.__defineGetter__("href", function() {
	return this.properties.href;
});

ToolbarPopup.prototype.__defineSetter__("href", function( val ) {
	val = val + ""; // force to type string
	
	// Check if we have an external href path
	if(val.match(/^(https?:\/\/|data:)/)) {
		this.isExternalHref = true;
	} else {
		this.isExternalHref = false;
	}
	
	this.properties.href = val;

  if(this.properties.href && this.properties.href !== "undefined" && this.properties.href !== "null" && this.properties.href !== "") {

  	Queue.enqueue(this, function(done) {

  		chrome.browserAction.setPopup({ "popup": this.applyHrefVal() });

  		done();

  	}.bind(this));
	
  } else {

    chrome.browserAction.setPopup({ "popup": "" });

  }
});

ToolbarPopup.prototype.__defineGetter__("width", function() {
	return this.properties.width;
});

ToolbarPopup.prototype.__defineSetter__("width", function( val ) {
	val = (val + "").replace(/\D/g, '');
	
	if(val == '') {
		this.properties.width = 300; // default width
	} else {
		this.properties.width = val < 800 ? val : 800; // enforce max width
	}
	
  if(this.properties.href && this.properties.href !== "undefined" && this.properties.href !== "null" && this.properties.href !== "") {

  	Queue.enqueue(this, function(done) {

  		chrome.browserAction.setPopup({ "popup": this.applyHrefVal() });

  		done();

  	}.bind(this));
	
  } else {

    chrome.browserAction.setPopup({ "popup": "" });

  }
});

ToolbarPopup.prototype.__defineGetter__("height", function() {
	return this.properties.height;
});

ToolbarPopup.prototype.__defineSetter__("height", function( val ) {
	val = (val + "").replace(/\D/g, '');
	
	if(val == '') {
		this.properties.height = 300; // default height
	} else {
	  this.properties.height = val < 600 ? val : 600; // enforce max height
	}
	
	if(this.properties.href && this.properties.href !== "undefined" && this.properties.href !== "null" && this.properties.href !== "") {

  	Queue.enqueue(this, function(done) {

  		chrome.browserAction.setPopup({ "popup": this.applyHrefVal() });

  		done();

  	}.bind(this));
	
  } else {

    chrome.browserAction.setPopup({ "popup": "" });

  }
});

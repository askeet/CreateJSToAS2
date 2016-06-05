(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes
var rect; // used to reference frame bounds

// library properties:
lib.properties = {
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	manifest: []
};



// symbols:



(lib.LibMovie = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// Слой 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(2,1,1).p("AoqmUIRVAAIAAMpIxVAAg");
	this.shape.setTransform(55.5,40.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#111111").s().p("AoqGVIAAspIRUAAIAAMpg");
	this.shape_1.setTransform(55.5,40.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#333333").ss(2,1,1).p("ArtnzIXbAAIAAPnI3bAAg");
	this.shape_2.setTransform(75,50);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#666666").s().p("ArtHzIAAvmIXbAAIAAPmg");
	this.shape_3.setTransform(75,50);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-1,-1,113,83);
p.frameBounds = [rect, new cjs.Rectangle(-1,-1,152,102)];


// stage content:
(lib.AS2ToAS3_Canvas = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.Movie1 = new lib.LibMovie();
	this.Movie1.setTransform(145.5,97.5,1,1,0,0,0,55.5,40.5);

	this.timeline.addTween(cjs.Tween.get(this.Movie1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(364,256,113,83);
p.frameBounds = [rect];

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;
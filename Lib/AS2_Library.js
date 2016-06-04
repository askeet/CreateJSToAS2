/* Copyright (c) 2016 https://github.com/askeet/.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/



var _root;
function InitAS2() {
	SetDefaultNames();
	_root = exportRoot;
	Test();
}
// Library AS2

function SetDefaultNames() {
	var i, key;
	var clip = exportRoot; // movieclip content to be processed
	var clipch = clip.children; // movieclip's children
	// iterate over every property name in the clip
	for (key in clip) {
		// is this a CreateJS container object?
		if (clip[key] instanceof createjs.Container) {
			// scan the clip's list of children
			for (i = 0; i < clipch.length; i++) {
				// are they both pointing to the same object?
				if (clip[key] === clipch[i]) {
					// assign key value to "name" property
					clip[key].name = key;
					break;
				}
			}
		}
	}
}

var arrChildByName = [];
function eval(Value) {
	//trace(arrChildByName[Value]);
	var Obj = null;
	arr = Value.split(".");
	if (arr.length === 1) {
		if (!arrChildByName[Value]) {
			Obj = _root.getChildByName(Value);
			if (!Obj) {				
				Obj = _root[Value];
			}else{
				_root[Value] = Obj;
			}
		} else {			
			Obj = arrChildByName[Value];
		}
	} else {
		if (!arrChildByName[Value]) {

			Obj = (!arrChildByName[arr[0]]) ? _root.getChildByName(arr[0]) : arrChildByName[arr[0]];
			

			if (!Obj) {
				Obj = _root[arr[0]];
			}else{
			   _root[arr[0]] = Obj;	
			}
						
			for (var i = 1; i < arr.length; i++) {
				if (Obj != null) {
					var Obj_Temp = Obj.getChildByName(arr[i]);

					if (!Obj_Temp) {
						Obj = Obj[arr[i]];
						if (!Obj)
							break;
					} else {
						Obj[arr[i]] = Obj_Temp;
						Obj = Obj_Temp;
					}
				}
			}
		} else {
			Obj = arrChildByName[Value];
		}
	}
	if (Obj)
		arrChildByName[Value] = Obj;
	return Obj;
}

var removeObject = createjs.DisplayObject.prototype.removeObject = function () {
	var path = (this.parent) ? this.parent : this;
	var fullPath = this.GetAbsolutePath();
	
	findBeginStr(arrChildByName, fullPath, function (elem) {
		RemoveShape(arrChildByName[elem]);
		delete arrChildByName[elem];
	});
	
	RemoveShape(this);
	var ret = path.removeChild(this);
	path[this.name] = undefined;
	return ret;
}

var findBeginStr = function (array, value, callback, fullConsilience) {
	var findElem = false;

	if (value != "") {
		for (arr in array) {
			if (
				(!fullConsilience && String(arr).indexOf(value) === 0) ||
			    (fullConsilience && String(arr)===value)			
			) {
				findElem = true;
				//alert("find "+String(arr) + " "+value)
				if (callback(arr)) {
					break;
				}
			}
		}
	}
	return findElem;
}

var GetAbsolutePath = createjs.DisplayObject.prototype.GetAbsolutePath = function () {
	var Name = (this.name) ? this.name : "";
	if (Name) {
		//if(yyyy) alert(this.parent.name);
		var Parent = this.parent;
		while (Parent && Parent.name) {
			Name = Parent.name + "." + Name;
			Parent = Parent.parent;
		}
	}
	return Name;
}

var createEmptyMovieClip = createjs.DisplayObject.prototype.createEmptyMovieClip = function (NameMovieClip, depth) {	
	var FindName = this.GetAbsolutePath();
	FindName = (FindName != "") ? FindName + "." + NameMovieClip : NameMovieClip;
	var myMC = new createjs.MovieClip();
	myMC.name = NameMovieClip;
	if (!findBeginStr(arrChildByName, FindName, function (elem) {
			return true;
		})) {		
		(!depth && depth != 0) ? this.addChild(myMC) : this.addChildAt(myMC, depth);
		eval(FindName);
		arrChildByName[FindName] = myMC;
		
		
	}else{
		myMC = eval(FindName); 
	}
	return myMC;
}
//

var createTextField = createjs.DisplayObject.prototype.createTextField = function (NameTextField, depth, X, Y, Font, MaxWidth, MaxHeight) {

	var FindName = this.GetAbsolutePath();
	//alert(FindName + " " +  NameTextField);
	FindName = (FindName != "") ? FindName + "." + NameTextField : NameTextField;

	
	var tf = new createjs.Text('', (Font) ? Font : 'Arial 12px');
	tf.name = NameTextField;
	tf.x = X;
	tf.y = Y;
	tf.maxHeigth = MaxHeight;
	tf.maxWidth = MaxWidth;
	if (!findBeginStr(arrChildByName, FindName, function (elem) {
			return true;
		}), true) {
		(!depth && depth != 0) ? this.addChild(tf) : this.addChildAt(tf, depth);
		eval(FindName);
		arrChildByName[FindName] = tf;		
	}else{		
		tf = eval(FindName);
	}
	return tf;
}

var attachMovie = createjs.DisplayObject.prototype.attachMovie = function (idName, newName, depth, initObject) {
	var FindName = this.GetAbsolutePath();
	FindName = (FindName != "") ? FindName + "." + newName : newName;

	var classDefintion = lib[idName]; //stage.getDefinitionByName( idName );
	var instance = new classDefintion();
	instance.name = newName;
	if (initObject)
		for (var key in initObject)
			instance[key] = initObject[key];

	if (!findBeginStr(arrChildByName, FindName, function (elem) {
			return true;
		})) {
		(!depth && depth != 0) ? this.addChild(instance) : this.addChildAt(instance, depth);
		eval(FindName);
		arrChildByName[FindName] = instance;
	}else{
		instance = eval(FindName);
	}	
	return instance;
}

var duplicateMovieClip = createjs.DisplayObject.prototype.duplicateMovieClip = function (newname, depth ,initObject){
	var path = (this.parent) ? this.parent : this;
	var cm = path.createEmptyMovieClip(newname, depth ,initObject);
	var Shape =  this.UserShape;
    if(Shape){  
		cm.UserShape = Shape.clone(true);
		cm.addChild(cm.UserShape);
	}
	return cm;
}


function trace(Value){
	console.log(Value);
}

var addProperty = createjs.DisplayObject.prototype.addProperty = function (NameProperty, GetStatus, SetStatus){
	Object.defineProperty(this, NameProperty, {
		get: GetStatus,
		set: SetStatus,
		enumerable: true,
		configurable: true
	});	
}

function GetShape(Value){
	if(!Value.UserShape){
		Value.UserShape = new createjs.Shape();
		Value.addChild(Value.UserShape);
	}
	return Value.UserShape;
}

function RemoveShape(Value){
	if(Value.UserShape){
		Value.removeChild(Value.UserShape);
		Value.UserShape = undefined;
	}
}

//my_mc.lineTo(x:Number, y:Number) : Void
var lineTo = createjs.DisplayObject.prototype.lineTo = function (x,y){
	GetShape(this).graphics.lineTo(x,y);
}
//my_mc.moveTo(x:Number, y:Number) : Void
var moveTo = createjs.DisplayObject.prototype.moveTo = function (x,y){
	GetShape(this).graphics.moveTo(x,y);
}

//my_mc.lineStyle([thickness:Number[, rgb:Number[, alpha:Number]]]) : Void
var lineStyle = createjs.DisplayObject.prototype.lineStyle = function (thickness,rgb,alpha){
	var Shape = GetShape(this);
	
	if(thickness!=undefined){
		Shape.graphics.setStrokeStyle(thickness);
	}
	if(rgb!=undefined){
		Shape.graphics.endStroke();
		var color = createjs.Graphics.getRGB(rgb, alpha);	
		Shape.graphics.beginStroke(color);
	}
}

//my_mc.beginFill([rgb:Number[, alpha:Number]]) : Void
var beginFill = createjs.DisplayObject.prototype.beginFill = function (rgb,alpha){
	var r = (rgb & 0xFF0000) >> 16; 
	var g = (rgb & 0x00FF00) >> 8;
	var b = (rgb & 0x0000FF) >> 0;
	var color = (alpha)? 'rgba(' +r+','+g+','+b+','+alpha+')': 'rgb(' +r+','+g+','+b+')'; 
	GetShape(this).graphics.beginFill(color);
}
//endFill ()
var endFill = createjs.DisplayObject.prototype.endFill = function (rgb,alpha){ 
	GetShape(this).graphics.endFill();
}
var clear = createjs.DisplayObject.prototype.clear = function (){ 
	GetShape(this).graphics.clear();
}
// Property
function  AddNewProperty(CurNameProperty,NewNameProperty, Class ){
	if(Class == undefined) Class = createjs.DisplayObject.prototype;
	Object.defineProperty(Class, NewNameProperty, {
		get: function(){ return this[CurNameProperty] ; },
		set: function (value){ this[CurNameProperty] = value; },
		enumerable: true,
		configurable: true
    });	
}
AddNewProperty('alpha','_alpha');
AddNewProperty('x','_x');
AddNewProperty('y','_y');
AddNewProperty('rotation','_rotation');
//AddNewProperty('width','_width');
//AddNewProperty('height','_height');
AddNewProperty('xscale','_xscale');
AddNewProperty('yscale','_yscale');
AddNewProperty('parrent','_parrent');
AddNewProperty('visible','_visible');
AddNewProperty('currentFrame','_currentframe',createjs.MovieClip.prototype); 





function Test(){	


}

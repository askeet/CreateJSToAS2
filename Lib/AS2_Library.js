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

var isStop = false;
function SetFPS(value){

	if(value ===0){ 
	    if(!isStop){
			createjs.Ticker.removeEventListener("tick", stage);
			isStop = true;
			UpdatePaint();
		}
	}
	else{
		createjs.Ticker.setFPS(value);
	    if(isStop){
			createjs.Ticker.addEventListener("tick", stage);
			isStop = false;
		}
	}
}

function UpdatePaint(){
   if(isStop){ 
        var event1 = new Object();
	event1.paused = false;
	handleTick(event1); 
   }
   stage.update();   
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

function fscommand(arg,command){
	if(window.external!=null &&  typeof window.external.EventForFSCommand!=='undefined')
		window.external.EventForFSCommand(arg,command);
}

var arrChildByName = [];
function eval(Value) {
	var object = GetValue(Value);
	if(object) arrChildByName[Value] = object;
	return object;
}

function SetValue( nameProperty ,  value , isGotoAndStop ){
        nameProperty = nameProperty.replace( "_root.",'');
	arr = nameProperty.split(".");
	var object = null;

	for (var i = 0; i < arr.length-1; i++) {
	    if(i===0)
		object = _root[arr[0]];
	    else
		if(object)				
			object = object[arr[i]];                				
		}
	if(arr.length > 1 && object ){
		if(!isGotoAndStop){
			object[ arr[arr.length-1]] = value;
		}else{
			object[ arr[arr.length-1]].gotoAndStop(value);
		}
	}
	else{
		if(arr.length === 1){
		    if(!isGotoAndStop){	
				_root[arr[0]] = value;
		    }else{
				_root[arr[0]].gotoAndStop(value);
		    }
		}
	}
}


function GetValue( nameProperty){
    nameProperty = nameProperty.replace( "_root.",'');
    arr = nameProperty.split(".");
	var object = null;

	for (var i = 0; i < arr.length; i++) {
	    if(i===0){
		object = _root[arr[0]];
	    	if(!object){  
			object = _root.getChildByName(arr[0]); 
			if(object){
				_root[arr[0]] = object;
				//object[arr[0]] = object;
			}else{											
				break;
			}						
		}
	      }
    	      else
		if(object){				
			var obj = object[arr[i]];
			if(!obj){ // not find  
				obj = object.getChildByName(arr[i]);
			}

			if(obj){
				object[arr[i]] = obj;
				object = obj;
			}else{	
				object = undefined;						 
				break;	
			}
		}					
	}

	return (arr.length > 0 && object )? object : undefined;
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

	var classDefintion = (idName)?lib[idName]:this.constructor; 
	if(!classDefintion) classDefintion = this.constructor;
	var instance = new classDefintion();
	instance.idName = idName;
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
	var cm;
	if(this.idName){
		cm = path.attachMovie(this.idName,newname,depth,initObject);
		if(this.paused);
			cm.gotoAndStop(this.currentFrame);
		cm.x = this.x;
		cm.y = this.y;
	}
	else
		cm = path.createEmptyMovieClip(newname, depth ,initObject);
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
function  AddNewProperty(CurNameProperty,NewNameProperty, Class, funcGet,funcSet ){
	if(Class == undefined) Class = createjs.DisplayObject.prototype;
	Object.defineProperty(Class, NewNameProperty, {
		get: (!funcGet)? function(){ return (CurNameProperty)? this[CurNameProperty] : undefined; }      : funcGet,
		set: (!funcSet)? function (value){ if(CurNameProperty)this[CurNameProperty] = value; }: funcSet,
		enumerable: true,
		configurable: true
    });	
}

var addProperty = createjs.DisplayObject.prototype.addProperty = function (NameProperty, GetStatus, SetStatus){
	AddNewProperty(undefined,NameProperty,this,GetStatus,SetStatus);
	/*Object.defineProperty(this, NameProperty, {
		get: GetStatus,
		set: SetStatus,
		enumerable: true,
		configurable: true
	});	*/
}

AddNewProperty('alpha','_alpha');
AddNewProperty('x','_x');
AddNewProperty('y','_y');
AddNewProperty('rotation','_rotation');
AddNewProperty('xscale','_xscale');
AddNewProperty('yscale','_yscale');
AddNewProperty('parrent','_parrent');
AddNewProperty('visible','_visible');
AddNewProperty('currentFrame','_currentframe',createjs.MovieClip.prototype); 

AddNewProperty(undefined,"_width", undefined, 
	function(){ 
		if(this.getTransformedBounds){
			var bounds = this.getTransformedBounds(); 
			if(bounds) return bounds.width;
			else{
				if(this.currentFrame == 0 && this.nominalBounds)
					return this.nominalBounds.width;
			}			
			return undefined;
		}
	},
	function(value){
		if(this.getTransformedBounds){
			var bounds = this.getTransformedBounds(); 
			if(bounds){
				this.setTransform(bounds.x,bounds.y,value/bounds.width,1);
			}
		}	
	}
	
);

AddNewProperty(undefined,"_height", undefined, 
	function(){ 
		if(this.getTransformedBounds){
			var bounds = this.getTransformedBounds(); 
			if(bounds) return bounds.height;
			else{
				if(this.currentFrame == 0 && this.nominalBounds)
					return this.nominalBounds.height;
			} 			
			return undefined;
		}		
	},
	function(value){
		if(this.getTransformedBounds){
			var bounds = this.getTransformedBounds(); 
			if(bounds){
				this.setTransform(bounds.x,bounds.y,1,value/bounds.height);
			}
		}	
	} 
);


function Test(){	


}

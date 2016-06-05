# CreateJSToAS2
It's library for simple convert code from Action Script 2 to CreateJS

1. Open Adobe Animate CC.  
2. Create HTML5 Canvas 
2. Draw something there.
3. Save as "[MyName].fla"
3  Press Ctrl+Enter
4. Open [MyName].html in your Editor
5. Add library in file <script src="[Path]\AS2_Library.js"></script>
6  At the end function init() add call InitAS2(); 
7. Use exportRoot like _root. 
8. Write JS code how you would use library ActionScript 2.0.
8. Example how it works you can see in file AS2ToAS3_Canvas.html


It's library include  
methods ActionScript 2.0
  eval("targetMovie")
  MovieClip.createEmptyMovieClip()
  MovieClip.createTextField() // You don't need create class TextField
  MovieClip.attachMovie()
  MovieClip.duplicateMovieClip()
  MovieClip.lineTo
  MovieClip.moveTo()
  MovieClip.lineStyle()
  MovieClip.beginFill()
  MovieClip.endFill()
  MovieClip.clear()
  MovieClip.addProperty()
  trace()
  MovieClip.removeObject() // works like MovieClip.removeMovieClip() or TextField.removeTextField()  
property ActionScript 2.0
  MovieClip._alpha
  MovieClip._x
  MovieClip._rotation
  MovieClip._xscale
  MovieClip._yscale
  MovieClip._parrent
  MovieClip._visible
  MovieClip._width // works read and write 
  MovieClip._height // works read and write 
  
  
  
  
  
  
  
  
  



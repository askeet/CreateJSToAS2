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
  1. eval("targetMovie");
  2. MovieClip.createEmptyMovieClip();
  3. MovieClip.createTextField(); // You don't need create class TextField
  4. MovieClip.attachMovie();
  5. MovieClip.duplicateMovieClip();
  6. MovieClip.lineTo();
  7. MovieClip.moveTo();
  8. MovieClip.lineStyle();
  9. MovieClip.beginFill();
  10. MovieClip.endFill();
  11. MovieClip.clear();
  12. MovieClip.addProperty();
  13. trace();
  14. MovieClip.removeObject() // works like MovieClip.removeMovieClip() or TextField.removeTextField()  
property ActionScript 2.0
  1. MovieClip._alpha
  2. MovieClip._x
  3. MovieClip._rotation
  4. MovieClip._xscale
  5. MovieClip._yscale
  6. MovieClip._parrent
  7. MovieClip._visible
  8. MovieClip._width // works read and write 
  9. MovieClip._height // works read and write 


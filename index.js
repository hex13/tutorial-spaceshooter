var images = {};  

function loadImages(directory, fileNames, onComplete) {
    var imagesLeft = fileNames.length;
    
    fileNames.forEach(function(fileName) {
        var img = new Image();
        img.onload = function() {
            imagesLeft--;
            if (imagesLeft <= 0) 
                onComplete();
        };
        img.src = directory + '/' + fileName;
        
        // z "spaceship.png" uzyskamy "spaceship", za pomoca funkcji substring
        var unitName = fileName.substring(0, fileName.lastIndexOf('.')); 
        
        images[unitName] = img;       
    });
};
 
function initialize() {
    console.log('initialize()');
    console.log(images['player']);
    console.log(images['ufo']);    
};
 
 
$(document).ready(function() {
    loadImages('images', ['player.png', 'ufo.png'], initialize);    
});

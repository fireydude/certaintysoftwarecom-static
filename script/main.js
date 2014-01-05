function initialize() {
    var pos = new google.maps.LatLng(52.8382, -2.327815);
    var mapOptions = {
        centre: pos,
        zoom: 6,
        offsetWidth: 0,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    
    var marker = new google.maps.Marker({
        position: pos,
    });

    marker.setMap(map);
}

function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBPJIGNlQbjcY6hQlnapmAsNNefIIyF198&sensor=false&callback=initialize";
    document.body.appendChild(script);
}

window.onload = loadScript;
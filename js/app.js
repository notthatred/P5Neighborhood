/* Creating a BetweenBetweenViewModel Class as inspector between the View and the Model.*/
var BetweenViewModel = function() {
    var project = this;
    project.map = null; 
    project.latlong = null; 
    project.infowindow = new google.maps.InfoWindow(); 
    project.locations = ko.observableArray([]); 
    project.filteredLocations = ko.observableArray([]); 
    project.locationTypes = ko.observableArray([]); 
    project.selectedLocationType = ko.observable(); 
    project.showMap = ko.observable(true); 
    project.showList = ko.observable(false); 
    project.selectedPlaceId = ko.observable(false);

    /* Create an initializeMap function*/
    project.initializeMap = function() {
        project.latlong = new google.maps.LatLng(46.786678, -92.100495);

        var mapOptions = {
            center: project.latlong,
            zoom: 18,
            panControl: true,
            panControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            scaleControl: true,
            streetViewControl: true,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            }
        };
        project.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        project.searchLocations();
        project.map.setCenter(project.latlong);
    };

    
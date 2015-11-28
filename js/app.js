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

    /* Create an searchLocations function using Google Places Service. In the end the nearbySearch method from Google(Thnx bigG!) will call the locationCallback services when locations are retrieved.*/
    project.searchLocations = function() {
        var request = {
            location: project.latlong,
            radius: 500,
            types: ['store', 'bar', 'food', 'restaurant', 'cafe', 'florist', 'hair_care', 'spa', 'pharmacy']

        };

        var service = new google.maps.places.PlacesService(project.map);
        service.nearbySearch(request, project.locationCallback);
    };

    /* Creating a locationCallback function to manage the data from search, adding the more detailed info retrieved from yp api.*/
    project.locationCallback = function(results, status) {
        var marker;
        var location;
        var tempTypes = [];
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                marker = project.createMarker(results[i]);
                location = new Location(results[i], marker);
                project.setYellowPageInfo(location);
                project.locations.push(location);
                tempTypes = tempTypes.concat(location.types.filter(function(item) {
                    return tempTypes.indexOf(item) < 0;
                }));
            }
            tempTypes.unshift("all");
            ko.utils.arrayPushAll(project.locationTypes(), tempTypes);
            project.locationTypes.sort();
            project.locationTypes.valueHasMutated();
            project.selectedLocationType("all");
        }
    };
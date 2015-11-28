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


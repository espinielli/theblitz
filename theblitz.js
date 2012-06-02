
// London...
var thespot = {"lat": 51.49463582758311, "lon": -0.04628918457023179 }


// the first day of the blitz started after 16:44, the time
// German airplanes entered British airspance.
//
// The data entries should be shifted accordingly and the start of
// the animation should be minute 1004, the first drop at 16:57 will
// be 13 minutes later (data[84]) and continue into next day:
// time=h:m
// minutes from start of raid: (h*60+m - 1004) % 1440
var minutes = function(d) {
  // transform a time of day string [H]H:MM, i.e. "1:08"
  // in minutes from midnight, i.e. 68.
  reggie = /(\d):(\d{2})/g;
  t = reggie.exec(d.value.time);
  t = parseInt(t[1]) * 60 + parseInt(t[2]);
  // shift so that 16:44 is the start of time
  // (1440 = 24 * 60, the number of minutes in 1 day)
  t = (2*(t + 1440 - 1004)) % 1440;
  return 20 * t + 30;
};

// Create the Google Map
var map = new google.maps.Map(d3.select("#map").node(), {
    zoom: 12,
    center: new google.maps.LatLng(thespot.lat, thespot.lon),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

// Load the station data. When the data comes back, create an overlay.
d3.json("drops.json", function(data) {
    var overlay = new google.maps.OverlayView();

    // Add the container when the overlay is added to the map.
    overlay.onAdd = function() {
        var layer = d3.select(this.getPanes().overlayLayer).append("div")
            .attr("class", "drops");

        // Draw each marker as a separate SVG element.
        // We could use a single SVG, but what size would it have?
        overlay.draw = function() {
            var projection = this.getProjection(),
                padding = 10;

            var marker = layer.selectAll("svg")
                .data(d3.entries(data))
                .each(transform) // update existing markers
                    .enter().append("svg:svg")
                .each(transform)
                    .attr("class", "marker");

            // Add a circle.
            marker.append("svg:circle")
                .attr("r", 4.5)
                .attr("cx", padding)
                .attr("cy", padding)
              .transition()
            .delay(minutes)
                .duration(2000)
                .style("fill", "black");;

            // Add a label.
            // marker.append("svg:text")
            //     .attr("x", padding + 7)
            //     .attr("y", padding)
            //     .attr("dy", ".31em")
            //     .text(function(d) { return d.value.time; });

            function transform(d) {
                d = new google.maps.LatLng(d.value.location.lat, d.value.location.lon);
                d = projection.fromLatLngToDivPixel(d);
                return d3.select(this)
                    .style("left", (d.x - padding) + "px")
                    .style("top",  (d.y - padding) + "px");
            }
        };
    };

    // Bind our overlay to the map
    overlay.setMap(map);
});

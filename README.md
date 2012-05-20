theblitz
========

An attempt to map the bombs of the blitz over London.
The idea is to learn to use d3.js and have a video-like effect as in
the [the wealth of nations example](http://bost.ocks.org/mike/nations/).
(Or make a stop motion video out of it...)

The Data
========
The nice article and datablog entry of The Guardian --
['London Blitz 1940: the first day's bomb attacks listed in full'][the first day of the London Blitz]
provides access to the historical records of the first air raid over London in 1940.
It is a spreadsheet listing for 843 drops, the time, the address, the type of
bomb and the damage caused.
The times are for 7th Sep 1940.

The addresses can be reverse geocoded using [nominatim-python][] a python
library for [Nominatim][].
For example the lookup of the 73rd entry in [the data][] file, 

> Royal Arsenal, Woolwich, SE18, London, UK

gives


> import nominatim
> nominatim.Geocoder().geocode('Royal Arsenal, Woolwich, SE18, London, UK')
> [{'display_name': 'Royal Arsenal Woolwich Pier, Woolwich, London Borough of Greenwich, Greater London, London, England, SE18, United Kingdom', 'place_id': '2112469544', 'lon': '0.070824870400824', 'lat': '51.4956072184614', 'osm_type': 'way', 'licence': 'Data Copyright OpenStreetMap Contributors, Some Rights Reserved. CC-BY-SA 2.0.', 'osm_id': '103128361', 'boundingbox': ['51.4951553344727', '51.495906829834', '0.0705746933817863', '0.0711841061711311'], 'type': 'pedestrian', 'class': 'highway', 'address': {'city': 'London Borough of Greenwich', 'state_district': 'London', 'suburb': 'Woolwich', 'country': 'United Kingdom', 'county': 'Greater London', 'pedestrian': 'Royal Arsenal Woolwich Pier', 'state': 'England', 'postcode': 'SE18', 'country_code': 'gb'}}]


Timeline
========
like for d3.js

[the first day of the London Blitz]:
http://www.guardian.co.uk/news/datablog/2010/sep/06/london-blitz-bomb-map-september-7-1940
"The first day of the London Blitz"

[nominatim]: http://wiki.openstreetmap.org/wiki/Nominatim
"nominatim reverse geocoding"

[nominatim-python]:
https://github.com/agabel/python-nominatim
"nominatim "

[the data]:
<https://docs.google.com/spreadsheet/ccc?key=0AonYZs4MzlZbdGZyNDJtd0d0ZFhvRTBxOFAyMkRFeUE&hl=en#gid=0>
"the spreadsheet for the bombs of first day of London Blitz"

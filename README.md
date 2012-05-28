# theblitz Project #
An attempt to map the bombs of the blitz over London.
The idea is to learn to use d3.js and have a video-like effect as in
the [the wealth of nations example][TWoN].
(Or make a stop motion video out of it...)

# The Data #
The nice article and datablog entry of The Guardian --
['London Blitz 1940: the first day's bomb attacks listed in full'][the first day of the London Blitz]
provides access to the historical records of the first air raid over London in 1940.
It is a spreadsheet listing for 843 drops, the time, the address, the type of
bomb and the damage caused.
The times are for 7th Sep 1940.
I converted it to CSV - with ';' as separator - and stored the result
in this project.

## Obtaining lat/lon for the drops ##
I tried various approaches to geocode the addresses in the data set:
* using [nominatim-python][], a python library for [Nominatim][].

### Geocoding via Nominatim ###
The lookup of the 73rd entry in [the data][] file, 

> Royal Arsenal, Woolwich, SE18, London, UK

gives

<<<<<<< HEAD

> import nominatim
> nominatim.Geocoder().geocode('Royal Arsenal, Woolwich, SE18, London, UK')
> [{'display_name': 'Royal Arsenal Woolwich Pier, Woolwich, London Borough of Greenwich, Greater London, London, England, SE18, United Kingdom', 'place_id': '2112469544', 'lon': '0.070824870400824', 'lat': '51.4956072184614', 'osm_type': 'way', 'licence': 'Data Copyright OpenStreetMap Contributors, Some Rights Reserved. CC-BY-SA 2.0.', 'osm_id': '103128361', 'boundingbox': ['51.4951553344727', '51.495906829834', '0.0705746933817863', '0.0711841061711311'], 'type': 'pedestrian', 'class': 'highway', 'address': {'city': 'London Borough of Greenwich', 'state_district': 'London', 'suburb': 'Woolwich', 'country': 'United Kingdom', 'county': 'Greater London', 'pedestrian': 'Royal Arsenal Woolwich Pier', 'state': 'England', 'postcode': 'SE18', 'country_code': 'gb'}}]

=======
```python
>>> import nominatim
>>> import json
>>> address_lookup=nominatim.Geocoder().geocode('Royal Arsenal, Woolwich, SE18, London, UK')
>>> print json.dumps(address_lookup)
[
    {
        "display_name": "Royal Arsenal Woolwich Pier, Woolwich, London Borough of Greenwich, Greater London, London, England, SE18, United Kingdom", 
        "place_id": "2112469544", 
        "lon": "0.070824870400824", 
        "lat": "51.4956072184614", 
        "osm_type": "way", 
        "licence": "Data Copyright OpenStreetMap Contributors, Some Rights Reserved. CC-BY-SA 2.0.", 
        "osm_id": "103128361", 
        "boundingbox": [
            "51.4951553344727", 
            "51.495906829834", 
            "0.0705746933817863", 
            "0.0711841061711311"
        ], 
        "type": "pedestrian", 
        "class": "highway", 
        "address": {
            "city": "London Borough of Greenwich", 
            "state_district": "London", 
            "suburb": "Woolwich", 
            "country": "United Kingdom", 
            "county": "Greater London", 
            "pedestrian": "Royal Arsenal Woolwich Pier", 
            "state": "England", 
            "postcode": "SE18", 
            "country_code": "gb"
        }
    }
]
```

### Geocoding via Google Maps v3 ###
It turns out that a lot of addresses are not geocoded by Nominatim,
for example entry 225 
> 128 Aylward Street, Stepney E1, London, UK

So I tried Google Maps v3 using [pygeocoder][] library:
```python
>>> import pygeocoder as geo
>>> import json
>>> drop = '128 Aylward Street, Stepney E1, London, UK'
>>> gm_lookup = pygeocoder.Geocoder.geocode(drop)
>>> print json.dumps(gm_lookup.raw, indent=4)
[
    {
        "geometry": {
            "location": {
                "lat": 51.5159781, 
                "lng": -0.0462063
            }, 
            "viewport": {
                "northeast": {
                    "lat": 51.5173270802915, 
                    "lng": -0.04485731970849797
                }, 
                "southwest": {
                    "lat": 51.5146291197085, 
                    "lng": -0.04755528029150203
                }
            }, 
            "location_type": "ROOFTOP"
        }, 
        "address_components": [
            {
                "long_name": "128", 
                "types": [
                    "street_number"
                ], 
                "short_name": "128"
            }, 
            {
                "long_name": "Aylward St", 
                "types": [
                    "route"
                ], 
                "short_name": "Aylward St"
            }, 
            {
                "long_name": "London", 
                "types": [
                    "locality", 
                    "political"
                ], 
                "short_name": "London"
            }, 
            {
                "long_name": "Greater London", 
                "types": [
                    "administrative_area_level_2", 
                    "political"
                ], 
                "short_name": "Gt Lon"
            }, 
            {
                "long_name": "United Kingdom", 
                "types": [
                    "country", 
                    "political"
                ], 
                "short_name": "GB"
            }, 
            {
                "long_name": "E1 0QW", 
                "types": [
                    "postal_code"
                ], 
                "short_name": "E1 0QW"
            }, 
            {
                "long_name": "London", 
                "types": [
                    "postal_town"
                ], 
                "short_name": "London"
            }
        ], 
        "partial_match": true, 
        "formatted_address": "128 Aylward St, London, Greater London E1 0QW, UK", 
        "types": [
            "street_address"
        ]
    }
]
```

But even Google Maps fails, for example on entry 224
> 12 Jewel Street, Stepney E1, London, UK
This street probably does not exist any more.

File addressesNotFound.txt lists the addresses I could not geocode automagically. 
I did spot some of them using scanned maps of London from [1908][London1908] and
[1940][London1940] or guessed.


# Timeline #
========
I would like to use [d3.js][d3js] like in
[the wealth of nations][TWoN] example, i.e. with an animation.
The raid started after 16:14 when the German bombers entered British airspace.
So the times from in the Guardian spreadsheet need to be date stamped.



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

[pygeocoder]:
http://code.xster.net/pygeocoder
"pygeocoder"

[d3js]:
http://d3js.org/
"Data-Driven Documents javascript library"

[TWoN]:
http://bost.ocks.org/mike/nations/
"The Wealth of Nations "

[London1940]:
http://www.maps-of-london.com/
"London map ca. 1940"

[London1908]:
http://mapco.net/bart1908/bart38b.htm
"London map ca. 1908"

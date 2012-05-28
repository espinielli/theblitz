import csv
import json
import nominatim
import pygeocoder

with open('September7th1940_A_first_night_of_the_Blitz.csv') as src:
    data = list(csv.reader(src, delimiter=';'))

keys=tuple(data[0])
drops=data[1:]

jsondata=[]
for d in drops:
    dd = dict(zip(keys,d))
    dd['order'] = int(dd['order'])
    address = {'display_name': dd['location'],
               'lon': "",
               'lat': "",
               }
    geocoder = nominatim.Geocoder()
    try:
        nm_lookup = nominatim.Geocoder().geocode(dd['location'])
    except:
        nm_lookup = []
        pass
    
    if len(nm_lookup) == 0:
        try:
            gm_lookup = pygeocoder.Geocoder.geocode(dd['location'])
            if gm_lookup.len == 0:
                print "Google Maps and Nominatim not able to find address %d: %s" % (dd['order'], dd['location'])
                break
            else:
                address['display_name'] = gm_lookup.formatted_address
                address['lon'], address['lat'] = gm_lookup.coordinates
        except pygeocoder.GeocoderError:
            print "No way to find address %d: %s" % (dd['order'], dd['location'])
            pass
    else:
        address['display_name'] = nm_lookup[0]['display_name']
        address['lon'] = nm_lookup[0]['lon']
        address['lat'] = nm_lookup[0]['lat']
    
    dd['location'] = {
        'display_name': address['display_name'],
        'lon': address['lon'],
        'lat': address['lat'],
        }
    jsondata.append(dd)

with open('September7th1940_A_first_night_of_the_Blitz.json', 'w+') as dest:
    json.dump(jsondata, dest)

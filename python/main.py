import pandas as pd
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import googlemaps

gmaps = googlemaps.Client(key='AIzaSyC5f0ZMMaX0ZaDGt7iCq2Zl2y4i3RHLMxk')

cred = credentials.Certificate('python/drinks-3822f-firebase-adminsdk-kse8g-7539f22f9c.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

drinks_ref = db.collection(u'TestDrinks')

xls = pd.ExcelFile('python/AddDrink.xls')
df = pd.read_excel(xls, 'AddDrink')
venues_df = pd.read_excel(xls, 'Venues')

def get_venue_id(name):
    for i in range(len(venues_df)):
        if venues_df['VenueName'][i] == name:
            return venues_df['VenueId'][i]

def get_venue_address(name):
    for i in range(len(venues_df)):
        if venues_df['VenueName'][i] == name:
            return venues_df['Address'][i]

def get_venue_location(name):
    address = get_venue_address(name)
    geocode_result = gmaps.geocode(address)

    lat = geocode_result[0]['geometry']['location']['lat']
    lng = geocode_result[0]['geometry']['location']['lng']

    return firestore.GeoPoint(lat, lng)

for i in range(len(df)):
    availability = []
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    for day in days:
        if not pd.isna(df[day + ' Start'][i]) and not pd.isna(df[day + ' End'][i]):
            availability.append({
                'Day': day,
                'Times': [str(df[day + ' Start'][i]), str(df[day + ' End'][i])]
            })
    drinks_ref.add({
        'Name': df['Name'][i],
        'Price': df['Price'][i],
        'Description': df['Description'][i],
        'Location': get_venue_location(df['Select Venue'][i]),
        'Venue': df['Select Venue'][i],
        'VenueId': get_venue_id(df['Select Venue'][i]),
        'Type': df['Select Type'][i],
        'Category': df['Drink Category'][i],
        'Rating': {
            'Average': 0,
            'Total': 0,
        },
        'Availability': availability,
    })

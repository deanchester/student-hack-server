import json
import urllib2
import requests
from random import randrange

__access_token_url__ = "https://staging-cws.autotrader.co.uk/CoordinatedWebService/application/crs/connect/hacks/zDk2wtYF"


__access_classified_ads__ = "https://staging-cws.autotrader.co.uk/CoordinatedWebService/application/crs/sss/classified-adverts"
def getAccessToken():
    """
    This method returns a new access token for accessing the API.
    """
    resp = urllib2.urlopen(__access_token_url__)
    return resp.read()

def getFirstClassifiedAds(access_token):
    headers = {'Access-Token': access_token}
    req = requests.get(__access_classified_ads__, headers=headers)
    reqJson = req.json()
    print type(reqJson)
    print reqJson['searchResults']['classifiedAdverts'][0]

def getRandomAds(access_token, number_to_return):
    """
    This method returns number_to_return random ads as a dict
    """
    headers = {'Access-Token': access_token}
    ads = {}
    for i in range(0, number_to_return):
        parameters = {"Page_Size": 100, "Page_Number": i}
        req = requests.get(__access_classified_ads__, params=parameters, headers=headers)
        reqJson = req.json()
        reqJson = convert(reqJson)
        ads.update({str(i):reqJson['searchResults']['classifiedAdverts'][randrange(100)]})
    return ads


def convert(input):
    if isinstance(input, dict):
        return {convert(key): convert(value) for key, value in input.iteritems()}
    elif isinstance(input, list):
        return [convert(element) for element in input]
    elif isinstance(input, unicode):
        return input.encode('utf-8')
    else:
        return input

if __name__ == "__main__":
    accessToken = getAccessToken()
    ads = getRandomAds(accessToken, 2)
    print json.dumps(ads)

__author__ = 'Dean Chester'
__email__ = 'dean.g.chester@gmail.com'

import tornado.ioloop
import tornado.web
import apiServer
import json

__str_cookie_name__ = "iteriation"


carsSelected = []

class HandleComms(tornado.web.RequestHandler):
    def get(self):
        accessToken = apiServer.getAccessToken()
        randomAdverts = apiServer.getRandomAds(accessToken, 8)
        self.write(json.dumps(randomAdverts))
        self.set_cookie(__str_cookie_name__, str(1))


    def post(self):
        iteriation = self.get_cookie(__str_cookie_name__)
        accessToken = apiServer.getAccessToken()
        car = json.loads(self.request.body)
        carsSelected.append(car)
        if(len(carsSelected) >= 3):
            nextAdverts = apiServer.getUpdatedAds(accessToken, carsSelected, 8)
            self.write(json.dumps(nextAdverts))
        else:
            randomAdverts = apiServer.getRandomAds(accessToken, 8)
            self.write(json.dumps(randomAdverts))
            self.set_cookie(__str_cookie_name__, str(len(carsSelected)))



if __name__ == "__main__":
    application = tornado.web.Application([
        (r"/cars", HandleComms),
    ])
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
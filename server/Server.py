__author__ = 'Dean Chester'
__email__ = 'dean.g.chester@gmail.com'

import tornado.ioloop
import tornado.web
import tornado.escape
import apiServer
import json

__str_cookie_name__ = "cars"

class HandleComms(tornado.web.RequestHandler):
    def get(self):
        accessToken = apiServer.getAccessToken()
        randomAdverts = apiServer.getRandomAds(accessToken, 8)
        self.write(tornado.escape.json_encode(randomAdverts))


    def post(self):
        car = tornado.escape.json_decode(self.request.body)
        car = apiServer.convert(car)
        if(self.get_cookie(__str_cookie_name__) == None):
            self.set_cookie(__str_cookie_name__, tornado.escape.json_encode([car]))
        else:
            self.set_cookie(__str_cookie_name__, tornado.escape.json_encode([self.get_cookie(__str_cookie_name__), car]))
        accessToken = apiServer.getAccessToken()
        cars = tornado.escape.json_decode(self.get_cookie(__str_cookie_name__))
        if(len(cars) >= 3):
            nextAdverts = apiServer.getUpdatedAds(accessToken, cars, 8)
            self.write(tornado.escape.json_encode(nextAdverts))
        else:
            randomAdverts = apiServer.getRandomAds(accessToken, 8)
            self.write(tornado.escape.json_encode(randomAdverts))
            self.set_cookie(__str_cookie_name__, str(len(carsSelected)))



if __name__ == "__main__":
    application = tornado.web.Application([
        (r"/cars", HandleComms),
    ])
    application.listen(80)
    tornado.ioloop.IOLoop.instance().start()
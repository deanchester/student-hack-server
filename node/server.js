var http = require('http');
var https = require('https');
var express = require('express');
var app = express();

var images = ["http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=ca6c3828108f6efe9245a38902d046f9", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=e825475f7dea395bd2a154d30d56c217", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=505c2809947741979c833964f0fe53a9", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=982d47b34d545a10516d7b2bf0703522", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=230c0723e253afc18eef8a1e5606634b", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=13c267394cede452ebdbef5ae4313bc8", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=c49dc2b2806d3154a274783494e69730", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=754b722f8038a4349dc7d4e31d775a77", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=5f2088042505973fff45478d3523ce1a", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=796831fb86875de0abf5c3606ad4ec29", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=796831fb86875de0abf5c3606ad4ec29", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=ce90b7bb20e7278923eed41ed8a6e0e8", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=af9b5db930d5bd91086e4f68f24b4713", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=80a5f7935a206a3607ae2ecbd30fd3d6", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=74f4ce0fe0a6980ae42aaaabe1d53bca", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=7ee580158bb1e5f0bc6b81d30c91b5f1", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=855312abcdd4e3b6b6acde24bf78843e", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=26f3ff397feb0ef56bb353cf37a40afd", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=555ffa1b79f36b71299d0f9c12bdc8d8", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=d6bf14f479153397f58707fa48052917", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=b7c96915b02cd9d3008b86f121811c39", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=4abc0dfb20a455239f323ed1c65b6b00", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=df7ca2c9bcd7bd9eb61a581ac3fdcb13", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=568bc623afef3126fc43bc1518fed0d2", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=27ad8b7df05080bd80d9f71ea2376913", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=0b0f611eb6636dde844d491e9124d8ea", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=0e069b271575bcb8352cb448b448e85d", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=32ce0376ebefbd2ea40381055cfa9edb", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=f4eb0cce0536e612927381ba83cf57ec", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=7b064bb2a7fc8d5aaf7e6e17f09a5fc5", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=7036a107031fa1f950d1ecc4429a651c", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=4d481e92ac494625b67d34ef92637f9f", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=b8d3eb1d3e7de7de693634e9d37d94de", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=03c30a798ecdea5d7c88f6a35c7eccc6", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=81a7d64976fd3725da9b7b689793f004", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=6f05141dfa3947e23dfd300d2c4f5a85", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=57e96e5a4e26458d33b2fad5d16f3ab6", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=5580aebdcc1bb38aa0ce4911b5ab57d4", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=0326ed870ebbfdbdae877dbc42162086", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=475aa77d75e7ff879e91db41efe2ffeb", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=adbd1554fa9365fc071ad80bcb7f9863", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=115bc95113c0122631669368020be60c", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=da7a21fa1b6a88980bacea0c777026ae", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=ae84efe38c4806d9e81d7e3d1a9a6b57", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=d2a9ee1b2a19ab37fd0ec06c6f903375", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=35eaebe532bf050d5f758848e5247893", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=ae931b902626d94693c42f3cb591720a", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=5d2e04640f4ff8072f5dcd736bf6e39b", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=2da85ac8bab2887773634c6ca366ddac", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=df9f665c5b5913432ba369947a88dcda", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=f3f4bf90f76d5cfb066b9db7b286a40e", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=538643448faefc14794df32b00cfb56d", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=66dcf9aa3da568ec8ef99dd5f6c69b54", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=29e9d814136e54667ac58c62466a5a26", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=50d33e938c6c7495b751faeaacda6be0", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=f1653c8be9c83cc97b9f92da84655971", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=1cb238996194574d9d60d499c5c372ea", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=af0e2a07a2cf1d4f650eabf2feef9fca", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=cabc80150387e2773fb950f5fc76e218", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=764e5698cddbd686ffc13f4987c9c309", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=a0c802f02ce685565572968a62c5cac9", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=424f25c5e4ba267a7d6242c238487e96", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=c216cee543f6f0ab0f4f814066be7c23", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=d66f32f54fc7c949b98214a823b28fff", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=0ff06afa3adcb330e9f4dd910c346e6e", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=54f1f6c159d8c0e05013a774b3a2f9db", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=161937ac2d4dda336371a1ec2782174d", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=cad21bcaf969a65cb4b33f4a28c518e2", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=5b8a8b60319aa841d9c9955650bd80ef", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=d07b00e824de5ea95086fc56923f064c", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=6e80cd266d09ca820d4673848054ab02", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=abeef4d3564a65236e6fc9b357e5e261", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=04b55ece19e3a4d68eea0040028ef3c5", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=ea54827f32234441081d8e79b93da02c", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=50f567779ae1fb32fa3ba385382e92ea", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=d73f3798e4e9b3d4fe247edf83214157", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=24eb994600440cdf8c34761e58d0923d", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=72c6ce803e0912136ad87c16d075c1bf", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=61e47635cc015eb026e188015953154e", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=2dcc82f561776b9c32ade3558e9bc289", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=431cf1f02d5f90292af52ce16c5da74c", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=974ec52d9bd246638521c69c6d6ef63d", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=d503f3550ea67a32ea8a8493ed27643a", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=34494340d11134080efe628584ec9c9f", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=0aa4cfa4dc335a8f0be77a10ec8f66ae", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=12aceb52476f3b3cd02d5198ee1fdfcf", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=b8ec65c868fc4fb3879d6edcf43592d1", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=3d4797a7903ec46d90f5026fb6f770dc", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=bdd3d10f3b8f1dce75f3588fc3510b38", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=14ff419793848495c6c3b34fa4eb56e3", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=8fa9d7a4e892e3f63b4f3fbc91bf6db3", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=d3771b5e655bd3e753d7ff989cf3218b", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=202c352c8a887cbd536d18111f924402", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=9cda8cca3f56d3b3fde650d817c9f6d8", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=286e5d94f8f67941b9a2beae96e7a760", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=d9fe06de40d4045fa1b829c58687a4a6", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=9f7a241f5c598045db7c485433f14a27", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=4c14a60d83390e5c122da3ef56858f80", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=9c93e301667660dda83c8e0378933477", "http://pictures2.autotrader.co.uk/imgser-uk/servlet/media?id=79dddbc368a54f44a11afcd25dda2978"]


app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'fdasfdghrtt5454fwefd'}));

app.get('/', function(req, res){

	req.session.chosenCars = [];

	getToken(function(token){
		getRandom(token, function(data){
			res.end(JSON.stringify(addImage(data)));
		});
	});
});
  


app.post('/', function(req, res){
	var body = req.body;

	req.session.chosenCars.push(body);

	getToken(function(token){
		getSimilar(req.session.chosenCars, token, function(data){
			res.end(JSON.stringify(data));
		});
	});
});

app.listen(1337);
console.log('Listening on port 1337');


function getSimilar(cars, token, callback)
{
	var price = 0;
	cars.forEach(function(car){
		price += car.advertAttributes.price | 0;
	});

	var mean = price / cars.length;

	var sum = 0;
	cars.forEach(function(car){
		sum += (car.price - mean)^2;
	});

	var dev = Math.sqrt(sum / cars.length);
	
	var max = Math.round(mean + dev);
	var min = Math.round(mean - dev);

	console.log("min: " + min);
	console.log("max: " + max);

	https.get({hostname:"staging-cws.autotrader.co.uk",path:"/CoordinatedWebService/application/crs/sss/classified-adverts?Page_Size=8&AT2_Maximum_Price_GBP="+max+"&AT2_Minimum_Price_GBP="+min,headers:{'Access-Token':token}}, function(data){
		var body = '';
		data.on('data', function (chunk) {
			body = body + chunk;
		  });
		data.on('end', function(){
			callback(body);
		});
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});

}

function getRandom(token, callback)
{
	https.get({hostname:"staging-cws.autotrader.co.uk",path:"/CoordinatedWebService/application/crs/sss/classified-adverts?Page_Size=8&Page_Number="+Math.ceil(Math.random()*150),headers:{'Access-Token':token}}, function(data){
		var body = '';
		data.on('data', function (chunk) {
			body = body + chunk;
		  });
		data.on('end', function(){
			callback(JSON.parse(body).searchResults.classifiedAdverts);
		});
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
}

function addImage(carArray)
{
	carArray.forEach(function(car){
		car.imageUrl = images[Math.round(Math.random()*(images.length-1))];
	});
	return carArray;
}

function getToken(callback)
{
	https.get("https://staging-cws.autotrader.co.uk/CoordinatedWebService/application/crs/connect/hacks/zDk2wtYF", function(data) {
		data.on('data', function (chunk) {
		    callback(chunk);
		  });
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
}
'use strict';

var AVATAR_LINK_BEGIN = 'img/avatars/user0';
var AVATAR_LINK_FILE_EXTENSION = '.png';

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_LINKS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var generatePlace = function () {
  var xCoordinate = generateRandomNumber(300, 900);
  var yCoordinate = generateRandomNumber(150, 500);

  return {
    'author': {
      'avatar': ''
    },
    'offer': {
      'title': '',
      'address': xCoordinate + ', ' + yCoordinate,
      'price': generateRandomNumber(1000, 1000000),
      'type': generateRandomNumber(0, TYPES.length - 1) + '',
      'rooms': generateRandomNumber(1, 5),
      'guests': '',
      'checkin': generateRandomNumber(0, TIMES.length - 1) + '',
      'checkout': generateRandomNumber(0, TIMES.length - 1) + '',
      'features': '',
      'description': '',
      'photos': ''
    },
    'location': {
      'x': xCoordinate,
      'y': yCoordinate
    }
  };
};

var shuffleArray = function (currentArray) {
  var newArray = [];
  var partArray = null;
  var randomNumber = null;

  while (currentArray.length > 0) {
    randomNumber = generateRandomNumber(0, currentArray.length - 1);
    partArray = currentArray.splice(randomNumber, 1)[0];
    newArray.push(partArray);
  }

  return newArray;
};

shuffleArray(FEATURES);

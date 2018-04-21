'use strict';

var AVATAR_LINKS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
];

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
var X_COORDINATE_BEGIN = 300;
var X_COORDINATE_END = 900;
var Y_COORDINATE_BEGIN = 150;
var Y_COORDINATE_END = 500;
var ROOMS_NUMBER = 5;
var GUESTS_FOR_ROOM = 2;
var ADVERTISEMENTS_NUMBER = 8;
var xCoordinate = 0;
var yCoordinate = 0;
var i = 0;
var roomsNumber = 0;
var guestNumber = 0;
var advertisements = [];

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomArrayElement = function (currentArray) {
  var randomNumber = 0;

  if (currentArray.length === 1) {
    return currentArray[0];
  } else {
    randomNumber = generateRandomNumber(0, currentArray.length - 1);
    return currentArray.splice(randomNumber, 1)[0];
  }
};

var shuffleArray = function (currentArray) {
  var newArray = [];
  var partArray = null;
  var randomNumber = 0;

  while (currentArray.length > 0) {
    randomNumber = generateRandomNumber(0, currentArray.length - 1);
    partArray = currentArray.splice(randomNumber, 1)[0];
    newArray.push(partArray);
  }

  return newArray;
};

var getRandomLengthArray = function (currentArray, arrayLength) {
  var newArray = [];
  var partArray = null;
  var randomNumber = 0;

  if (arrayLength <= currentArray.length) {
    for (i = 0; i < arrayLength; i++) {
      randomNumber = generateRandomNumber(0, currentArray.length - 1);
      partArray = currentArray.splice(randomNumber, 1)[0];
      newArray.push(partArray);
    }
  }

  return newArray;
};

var generatePlace = function () {
  xCoordinate = generateRandomNumber(X_COORDINATE_BEGIN, X_COORDINATE_END);
  yCoordinate = generateRandomNumber(Y_COORDINATE_BEGIN, Y_COORDINATE_END);
  roomsNumber = generateRandomNumber(1, ROOMS_NUMBER);
  guestNumber = generateRandomNumber(1, roomsNumber * GUESTS_FOR_ROOM);
  // shuffleArray(FEATURES);

  return {
    'author': {
      'avatar': getRandomArrayElement(AVATAR_LINKS)
    },
    'offer': {
      'title': getRandomArrayElement(TITLES),
      'address': xCoordinate + ', ' + yCoordinate,
      'price': generateRandomNumber(1000, 1000000),
      'type': getRandomArrayElement(TYPES),
      'rooms': roomsNumber,
      'guests': guestNumber,
      'checkin': getRandomArrayElement(TIMES),
      'checkout': getRandomArrayElement(TIMES),
      'features': getRandomLengthArray(FEATURES, generateRandomNumber(0, FEATURES.length - 1)),
      'description': '',
      'photos': shuffleArray(PHOTOS_LINKS)
    },
    'location': {
      'x': xCoordinate,
      'y': yCoordinate
    }
  };
};

var generateAdvertisements = function () {
  // for (i = 0; i < ADVERTISEMENTS_NUMBER; i++) {
  advertisements.push(generatePlace());
  // }
};

// shuffleArray(AVATAR_LINKS);
generateAdvertisements();
console.log(advertisements);
// console.log(generatePlace());
// console.log(AVATAR_LINKS);
// console.log(TITLES);

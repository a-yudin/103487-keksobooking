'use strict';

var avatarNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
var titles = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TYPES_IN_RUSSIAN = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTO_LINKS = [
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
var advertisements = [];
var mapElement = document.querySelector('.map');
var templateElement = document.querySelector('template');
var mapPinTemplate = templateElement.content.querySelector('.map__pin');
var mapPopupTemplate = templateElement.content.querySelector('.map__card');

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomArrayElement = function (currentArray, copy) {
  var randomNumber = generateRandomNumber(0, currentArray.length - 1);

  return copy ? currentArray[randomNumber] : currentArray.splice(randomNumber, 1)[0];
};

var getRandomLengthArray = function (currentArray, arrayLength) {
  var copiedArray = currentArray.slice();
  var newArray = [];
  var partArray = null;
  var randomNumber = 0;

  if (arrayLength > 0 && arrayLength <= copiedArray.length) {
    for (var i = 0; i < arrayLength; i++) {
      randomNumber = generateRandomNumber(0, copiedArray.length - 1);
      partArray = copiedArray.splice(randomNumber, 1)[0];
      newArray.push(partArray);
    }
  }

  return newArray;
};

var generatePlace = function () {
  var xCoordinate = generateRandomNumber(X_COORDINATE_BEGIN, X_COORDINATE_END);
  var yCoordinate = generateRandomNumber(Y_COORDINATE_BEGIN, Y_COORDINATE_END);
  var roomsNumber = generateRandomNumber(1, ROOMS_NUMBER);
  var guestNumber = generateRandomNumber(1, roomsNumber * GUESTS_FOR_ROOM);

  return {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomArrayElement(avatarNumbers, false) + '.png'
    },
    'offer': {
      'title': getRandomArrayElement(titles, false),
      'address': xCoordinate + ', ' + yCoordinate,
      'price': generateRandomNumber(1000, 1000000),
      'type': getRandomArrayElement(TYPES, true),
      'rooms': roomsNumber,
      'guests': guestNumber,
      'checkin': getRandomArrayElement(TIMES, true),
      'checkout': getRandomArrayElement(TIMES, true),
      'features': getRandomLengthArray(FEATURES, generateRandomNumber(0, FEATURES.length - 1)),
      'description': '',
      'photos': PHOTO_LINKS
    },
    'location': {
      'x': xCoordinate,
      'y': yCoordinate
    }
  };
};

var generateAdvertisements = function () {

  for (var i = 0; i < ADVERTISEMENTS_NUMBER; i++) {
    advertisements.push(generatePlace());
  }
};

var createMapPin = function (index) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  var mapPinImage = mapPinElement.querySelector('img');
  var pinWidth = mapPinImage.offsetWidth;
  var pinHeight = mapPinImage.offsetHeight;
  var leftCoordinate = advertisements[index].location.x - pinWidth / 2;
  var topCoordinate = advertisements[index].location.y - pinHeight;

  mapPinElement.style.left = leftCoordinate + 'px';
  mapPinElement.style.top = topCoordinate + 'px';
  mapPinImage.src = advertisements[index].author.avatar;
  mapPinImage.alt = advertisements[index].offer.title;

  return mapPinElement;
};

var renderMapPins = function () {
  var fragment = document.createDocumentFragment();

  advertisements.forEach(function (advertisement, i) {
    fragment.appendChild(createMapPin(i));
  });

  document.querySelector('.map__pins').appendChild(fragment);
};

var renderAdvertisement = function (advertisement) {
  var mapPopupElement = mapPopupTemplate.cloneNode(true);
  // var photosBlock = mapPopupElement.querySelector('.popup__photos');

  mapPopupElement.querySelector('.popup__title').textContent = advertisement.offer.title;
  mapPopupElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  mapPopupElement.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
  mapPopupElement.querySelector('.popup__type').textContent = TYPES_IN_RUSSIAN[advertisement.offer.type];
  mapPopupElement.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  mapPopupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

  mapPopupElement.querySelector('.popup__description').textContent = advertisement.offer.description;

  mapPopupElement.querySelector('.popup__avatar').src = advertisement.author.avatar;

  mapElement.insertBefore(mapPopupElement, mapElement.querySelector('.map__filters-container'));
};

generateAdvertisements();
mapElement.classList.remove('map--faded');
renderMapPins();
renderAdvertisement(advertisements[0]);



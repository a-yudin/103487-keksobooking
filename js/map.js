'use strict';

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
var TYPES_COMPARE = {
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
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var advertisements = [];
var mapElement = document.querySelector('.map');
var templateElement = document.querySelector('template');
var mapPinTemplate = templateElement.content.querySelector('.map__pin');
var advertisementTemplate = templateElement.content.querySelector('.map__card');

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var generatePlace = function (index) {
  var xCoordinate = generateRandomNumber(X_COORDINATE_BEGIN, X_COORDINATE_END);
  var yCoordinate = generateRandomNumber(Y_COORDINATE_BEGIN, Y_COORDINATE_END);
  var roomsNumber = generateRandomNumber(1, ROOMS_NUMBER);
  var guestNumber = generateRandomNumber(1, roomsNumber * GUESTS_FOR_ROOM);

  return {
    'author': {
      'avatar': 'img/avatars/user0' + (index + 1) + '.png'
    },
    'offer': {
      'title': titles.splice(generateRandomNumber(0, titles.length - 1), 1)[0],
      'address': xCoordinate + ', ' + yCoordinate,
      'price': generateRandomNumber(1000, 1000000),
      'type': TYPES[generateRandomNumber(0, TYPES.length - 1)],
      'rooms': roomsNumber,
      'guests': guestNumber,
      'checkin': TIMES[generateRandomNumber(0, TIMES.length - 1)],
      'checkout': TIMES[generateRandomNumber(0, TIMES.length - 1)],
      'features': FEATURES.slice(0, generateRandomNumber(0, FEATURES.length - 1)),
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
    advertisements.push(generatePlace(i));
  }
};

var createMapPin = function (index) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  var mapPinImage = mapPinElement.querySelector('img');
  var leftCoordinate = advertisements[index].location.x - PIN_WIDTH / 2;
  var topCoordinate = advertisements[index].location.y - PIN_HEIGHT;

  mapPinElement.style.left = leftCoordinate + 'px';
  mapPinElement.style.top = topCoordinate + 'px';
  mapPinImage.src = advertisements[index].author.avatar;
  mapPinImage.alt = advertisements[index].offer.title;

  return mapPinElement;
};

var renderMapPins = function (currentArray) {
  var fragment = document.createDocumentFragment();

  currentArray.forEach(function (element, i) {
    fragment.appendChild(createMapPin(i));
  });

  document.querySelector('.map__pins').appendChild(fragment);
};

var generatePhotoElements = function (elementsArray) {
  var fragment = document.createDocumentFragment();
  var img = null;

  for (var i = 0; i < elementsArray.length; i++) {
    img = new Image(45, 40);
    img.src = elementsArray[i];
    img.classList.add('popup__photo');
    img.alt = 'Фотография жилья';
    fragment.appendChild(img);
  }

  return fragment;
};

var deleteFeatureElements = function (blockElements) {
  while (blockElements.firstChild) {
    blockElements.removeChild(blockElements.firstChild);
  }
};

var createFeatureElements = function (featuresArray) {
  var fragment = document.createDocumentFragment();

  featuresArray.forEach(function (featuresItem) {
    var li = document.createElement('li');
    li.classList.add('popup__feature', 'popup__feature--' + featuresItem);
    fragment.appendChild(li);
  });

  return fragment;
};


var insertAdvertisement = function (advertisement) {
  var advertisementElement = advertisementTemplate.cloneNode(true);
  var photoBlock = advertisementElement.querySelector('.popup__photos');
  var featuresBlock = advertisementElement.querySelector('.popup__features');

  advertisementElement.querySelector('.popup__title').textContent = advertisement.offer.title;
  advertisementElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  advertisementElement.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
  advertisementElement.querySelector('.popup__type').textContent = TYPES_COMPARE[advertisement.offer.type];
  advertisementElement
      .querySelector('.popup__text--capacity')
      .textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  advertisementElement
      .querySelector('.popup__text--time')
      .textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  advertisementElement.querySelector('.popup__description').textContent = advertisement.offer.description;
  advertisementElement.querySelector('.popup__avatar').src = advertisement.author.avatar;
  photoBlock.appendChild(generatePhotoElements(advertisement.offer.photos));
  deleteFeatureElements(featuresBlock);
  featuresBlock.appendChild(createFeatureElements(advertisement.offer.features));

  mapElement.insertBefore(advertisementElement, mapElement.querySelector('.map__filters-container'));
};

generateAdvertisements();
mapElement.classList.remove('map--faded');
renderMapPins(advertisements);
insertAdvertisement(advertisements[0]);

'use strict';

var TITLES = ['Большая уютная квартира',
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
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
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
var map = document.querySelector('.map');
var template = document.querySelector('template');
var pinTemplate = template.content.querySelector('.map__pin');
var advertisementTemplate = template.content.querySelector('.map__card');
var titlesCopy = TITLES.slice();

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var generatePlace = function (index) {
  var xCoordinate = generateRandomNumber(X_COORDINATE_BEGIN, X_COORDINATE_END);
  var yCoordinate = generateRandomNumber(Y_COORDINATE_BEGIN, Y_COORDINATE_END);
  var roomsNumber = generateRandomNumber(1, ROOMS_NUMBER);

  return {
    'author': {
      'avatar': 'img/avatars/user0' + (index + 1) + '.png'
    },
    'offer': {
      'title': titlesCopy.splice(
          generateRandomNumber(0, titlesCopy.length - 1), 1)[0],
      'address': xCoordinate + ', ' + yCoordinate,
      'price': generateRandomNumber(1000, 1000000),
      'type': TYPES[generateRandomNumber(0, TYPES.length - 1)],
      'rooms': roomsNumber,
      'guests': generateRandomNumber(1, roomsNumber * GUESTS_FOR_ROOM),
      'checkin': TIMES[generateRandomNumber(0, TIMES.length - 1)],
      'checkout': TIMES[generateRandomNumber(0, TIMES.length - 1)],
      'features': FEATURES.slice(0,
          generateRandomNumber(0, FEATURES.length - 1)),
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
  var pin = pinTemplate.cloneNode(true);
  var pinImage = pin.querySelector('img');
  var leftCoordinate = advertisements[index].location.x - PIN_WIDTH / 2;
  var topCoordinate = advertisements[index].location.y - PIN_HEIGHT;

  pin.style.left = leftCoordinate + 'px';
  pin.style.top = topCoordinate + 'px';
  pinImage.src = advertisements[index].author.avatar;
  pinImage.alt = advertisements[index].offer.title;

  return pin;
};

var renderMapPins = function (currentArray) {
  var fragment = document.createDocumentFragment();

  currentArray.forEach(function (element, i) {
    fragment.appendChild(createMapPin(i));
  });

  document.querySelector('.map__pins').appendChild(fragment);
};

var generatePhotos = function (photosArray) {
  var fragment = document.createDocumentFragment();

  photosArray.forEach(function (photo) {
    var img = new Image(45, 40);
    img.src = photo;
    img.classList.add('popup__photo');
    img.alt = 'Фотография жилья';
    fragment.appendChild(img);
  });

  return fragment;
};

var deleteFeatures = function (blockElements) {
  while (blockElements.firstChild) {
    blockElements.removeChild(blockElements.firstChild);
  }
};

var createFeatures = function (featuresArray) {
  var fragment = document.createDocumentFragment();

  featuresArray.forEach(function (featuresItem) {
    var li = document.createElement('li');
    li.classList.add('popup__feature', 'popup__feature--' + featuresItem);
    fragment.appendChild(li);
  });

  return fragment;
};


var insertAdvertisement = function (advertisement) {
  var advertisementCard = advertisementTemplate.cloneNode(true);
  var photoBlock = advertisementCard.querySelector('.popup__photos');
  var featuresBlock = advertisementCard.querySelector('.popup__features');

  advertisementCard.querySelector(
      '.popup__title').textContent = advertisement.offer.title;
  advertisementCard.querySelector(
      '.popup__text--address').textContent = advertisement.offer.address;
  advertisementCard.querySelector(
      '.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
  advertisementCard.querySelector(
      '.popup__type').textContent = TYPES_COMPARE[advertisement.offer.type];
  advertisementCard.querySelector(
      '.popup__text--capacity').textContent = advertisement.offer.rooms +
      ' комнаты для ' + advertisement.offer.guests + ' гостей';
  advertisementCard.querySelector(
      '.popup__text--time').textContent = 'Заезд после ' +
      advertisement.offer.checkin +
      ', выезд до ' + advertisement.offer.checkout;
  advertisementCard.querySelector(
      '.popup__description').textContent = advertisement.offer.description;
  advertisementCard.querySelector(
      '.popup__avatar').src = advertisement.author.avatar;
  photoBlock.appendChild(generatePhotos(advertisement.offer.photos));
  deleteFeatures(featuresBlock);
  featuresBlock.appendChild(
      createFeatures(advertisement.offer.features));

  map.insertBefore(
      advertisementCard,
      map.querySelector('.map__filters-container'));
};

generateAdvertisements();
map.classList.remove('map--faded');
renderMapPins(advertisements);
insertAdvertisement(advertisements[0]);

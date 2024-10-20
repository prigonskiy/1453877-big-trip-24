import { createElement } from '../render.js';
import { getElementById, humanizeDateForPointDate, humanizeDateForPointTime, humanizeDateForTimeDifference, returnTypeOffers } from '../utils.js';

const returnPointDateFromTemplate = (point) =>
  `<time class="event__date" datetime="${point.date_from}">${humanizeDateForPointDate(point.date_from)}</time>`;

const returnPointTypeTemplate = (point) =>
  `<div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
  </div>`;

const returnPointTitleTemplate = (point, destinationsList) => {
  const pointDestination = getElementById(point.destination, destinationsList);
  return `<h3 class="event__title">${point.type} ${pointDestination.name}</h3>`;
};

const returnPointScheduleTemplate = (point) =>
  `<div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${point.date_from}">${humanizeDateForPointTime(point.date_from)}</time>
    —
      <time class="event__end-time" datetime="${point.date_to}">${humanizeDateForPointTime(point.date_to)}</time>
    </p>
    <p class="event__duration">${humanizeDateForTimeDifference(point.date_from, point.date_to)}</p>
  </div>`;

const returnPointOfferTemplate = (pointOffer) =>
  `<li class="event__offer">
    <span class="event__offer-title">${pointOffer.title}</span>
    +€&nbsp;
    <span class="event__offer-price">${pointOffer.price}</span>
  </li>`;

const returnPointOffersTemplate = (point, offersList) => {
  const typeOffers = returnTypeOffers(point, offersList);
  return (
    `<ul class="event__selected-offers">
      ${point.offers.map((pointOffer) => returnPointOfferTemplate(getElementById(pointOffer, typeOffers))).join('')}
    </ul>`
  );
};

const createPointTemplate = (point, destinationsList, offersList) =>
  `<li class="trip-events__item">
    <div class="event">
      ${returnPointDateFromTemplate(point)}
      ${returnPointTypeTemplate(point)}
      ${returnPointTitleTemplate(point, destinationsList)}
      ${returnPointScheduleTemplate(point)}
      <p class="event__price">
        €&nbsp;<span class="event__price-value">${point.base_price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      ${returnPointOffersTemplate(point, offersList)}
      <button class="event__favorite-btn ${point.isFavourite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;

export default class PointView {
  constructor({
    point,
    destinationsList,
    offersList
  }) {
    this.point = point;
    this.destinationsList = destinationsList;
    this.offersList = offersList;
  }

  getTemplate() {
    return createPointTemplate(this.point, this.destinationsList, this.offersList);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}


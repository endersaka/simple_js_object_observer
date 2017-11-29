/**
 * Observed - a class that implements a simple Object Observer Mechanism.
 * @author Marco Frisan, ender.saka@gmail.com
 * @copyright Marco Frisan 2017
 */

import * as util from './utilities';

class Observed {
  constructor(observers = []) {
    this.property = {};
    this.observers = observers;
  }

  addSingleObserver(observer) {
    if (observer.observedPropertyHasChanged) {
      this.observers.push(observer);
    } else {
      console.log('This object does not implement observation protocol.', observer);
    }
  }

  addObserver(observer) {
    if (util.exists(observer)) {
      if (Array.isArray(observer)) {
        observer.forEach(function (element) {
          this.addSingleObserver(element);
        });
      } else {
        this.addSingleObserver(observer);
      }
    }
  }

  notifyObservers() {
    console.log('notifyObservers has been called...');
    this.observers.forEach(function (observer, index) {
      console.log('\tI am going to notify observer %i %o ...', index, observer);
      console.log('\tParanoid checking if observer has a function named "observedPropertyHasChanged".');
      if (observer.observedPropertyHasChanged) {
        console.log('\t\tSending notification to observer...');
        observer.observedPropertyHasChanged(this.property);
      }
    }, this);
  }

  get observedProperty() {
    return this.property;
  }

  set observedProperty(property) {
    console.log('observedProperty setter has been called...');
    this.property = property;

    console.log('\tI am going to notify observers.');
    this.notifyObservers();
  }
}

export default Observed;

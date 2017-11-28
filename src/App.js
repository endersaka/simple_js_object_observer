import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/**
 * Wraps this.setState() and simplify it.
 * @param {Object} obj
 */
Component.prototype.fastSetState = function (obj) {
  this.setState((prevState, props) => {
    return obj;
  });
};

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
    if (exists(observer)) {
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
var observedObject = new Observed();

var httpRequest = require('request');

/* Definisco la funzione callback che verrà invocata in seguito al resposo del
 * server HTTP. */
var requestCallback = function (error, response, body) {
  console.log('requestCallback: just received response...');

  /* Se non c'e' alcun errore e lo status code e' uguale a 200, posso procedere. */
  if (error === null && response.statusCode === 200) {
    console.log('\tTake a look at response body:', JSON.stringify(body).replace(/[ \n\t\r]/g, ''));
    console.log('\tThe loaded JSON is of type ', (typeof body));

    console.log('\tI will check if observedObject does exist...');
    if (exists(observedObject)) {
      console.log('\t\tobservedObject does exist: ', observedObject);
      console.log('\t\tI am going to assign body to the observed property...');
      observedObject.observedProperty = body;
    }
  } else if (error === null) {
    console.log('Got: ', response.statusCode);
  } else {
    console.log('Error: ', error.code);
  }
}

// Load JSON file.
/* Definizione delle componenti che costituiscono la richiesta HTTP. */
const scheme = 'http';
const domain = 'localhost';
const port = '3000';
const path = 'json/app.json';

/* Costruzione della richiesta HTTP. */
const requestStr = scheme + '://' + domain + ':' + port + '/' + path;

/* Utilities */
const undefinedStr = 'undefined';

function exists(obj) {
  return typeof obj !== undefinedStr && obj !== null;
}

function objecOwnsPropertyWithName(obj, propertyName) {
  return obj.hasOwnProperty(propertyName) && exists(obj[propertyName]);
}

class JSONComponent extends Component {
  constructor(props, json) {
    super(props);

    if (exists(json)) {
      if (objecOwnsPropertyWithName(json, 'props')) {

      }

      if (objecOwnsPropertyWithName(json, 'state')) {

      }
    } else {

    }
  }

  render() {
    return (
      // Insert JSX Here
      <div></div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    if (exists(observedObject)) {
      observedObject.addObserver(this);
    }

    // Invio della richiesta HTTP.
    var request = httpRequest.get({uri: requestStr, json: true}, requestCallback);
  }

  observedPropertyHasChanged(property) {
    console.log('notification received with object: ', property);

    this.fastSetState({ json: property });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          L'obbietivo di questo progetto è quello di creare un sistema che usi
          JSON per generare Componenti React.
        </p>
        <ul className="App-goals-list">
          <li>
            Caricare un file JSON (loading) e trasformarlo in un oggetto JavaScript (parsing).
          </li>
          <li>
            Creare una classe generica che estende React.Component e che si
            puo' autoinizializzare a partire da poche proprieta' definite nel file JSON.
          </li>
        </ul>
        { this.state &&
          this.state.json.components.map(function (component) {
            return <component.tag></component.tag>;
          })
        }
      </div>
    );
  }
}

export default App;

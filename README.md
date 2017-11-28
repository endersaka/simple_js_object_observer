This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This project requires:

* React
* create-react-app (for dev)
* request

It implements a simple system to generate React components defined in a JSON file.
It includes a simple Object Observer mechanism used (at current stage) to check
when JSON is loaded and ready to be used. Object Observer mechanism was necessary
to avoid incapsulation of the React App inside the 'request' callback.
Furthermore I wanted to prepare a mechanism to keep track of UI changes in the
future.

The project is still at an early stage of testing.

Marco Frisan 

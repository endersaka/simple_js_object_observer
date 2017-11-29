/**
 * Utilities - is a set of utilities that comes from Observed project.
 * @author Marco Frisan, ender.saka@gmail.com
 * @copyright Marco Frisan
 */
const undefinedStr = 'undefined';

function exists(obj) {
  return typeof obj !== undefinedStr && obj !== null;
}

function objecOwnsPropertyWithName(obj, propertyName) {
  return obj.hasOwnProperty(propertyName) && exists(obj[propertyName]);
}

export {undefinedStr, objecOwnsPropertyWithName, exists};

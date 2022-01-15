/**
 * get the value of the property
 * @param {String} path - the object path ie. 'address.office.state'
 * @obj {Object} the object
 */
export function getObjValue(path, obj) {
  if (path && typeof obj === "object" && obj !== null && !Array.isArray(obj)) {
    let pathArray = path.split(".");
    if (pathArray.length > 1) {
      let prop = pathArray.shift(),
        nextPath = pathArray.join(".");
      let nextObj = obj[prop];
      return getObjValue(nextPath, nextObj);
    } else {
      return obj[pathArray[0]];
    }
  }
  return "params are not valid";
}

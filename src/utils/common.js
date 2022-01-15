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
/**
 *
 * @param {string} url
 * @param { get | post | delete| put } method
 * @param {obj} data
 * @returns { Promise }
 */
export function requestForData(url, method, data) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let result = JSON.parse(xhr.responseText);
        resolve(result);
      } else {
        let result = JSON.parse(xhr.responseText);
        reject(result);
      }
    };
    xhr.onerror = (err) => {
      reject(err);
    };
  });
}

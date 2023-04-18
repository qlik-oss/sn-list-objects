import extend from 'extend';

const { isArray } = Array;

const isObject = (v) => !!v && typeof v === 'object' && !isArray(v);

const isUndef = (v) => typeof v === 'undefined';

const isFunction = (v) => typeof v === 'function';

const clone = (obj) => extend(true, {}, obj);

/**
 * An additional type checker used to determine if the property is of internal
 * use or not a type that can be translated into JSON (like functions).
 *
 * @private
 * @param {Object} obj The object which has the property to check
 * @param {String} The property name to check
 * @returns {Boolean} Whether the property is deemed special or not
 */
function isSpecialProperty(obj, key) {
  return isFunction(obj[key]) || key.substring(0, 2) === '$$' || key.substring(0, 1) === '_';
}

/**
 * Finds the parent object from a JSON-Pointer ("/foo/bar/baz" = "bar" is "baz" parent),
 * also creates the object structure needed.
 *
 * @private
 * @param {Object} data The root object to traverse through
 * @param {String} The JSON-Pointer string to use when traversing
 * @returns {Object} The parent object
 */
function getParent(data, str) {
  const seperator = '/';
  const parts = str.substring(1).split(seperator).slice(0, -1);
  let numPart;

  parts.forEach((part, i) => {
    if (i === parts.length) {
      return;
    }
    numPart = +part;
    // eslint-disable-next-line no-nested-ternary, no-param-reassign
    data[numPart || part] = isUndef(data[numPart || part]) ? (!Number.isNaN(+numPart) ? [] : {}) : data[part];
    // eslint-disable-next-line no-nested-ternary, no-param-reassign
    data = data[numPart || part];
  });

  return data;
}

/**
 * Cleans an object of all its properties, unless they're deemed special or
 * cannot be removed by configuration.
 *
 * @private
 * @param {Object} obj The object to clean
 */
function emptyObject(obj) {
  Object.keys(obj).forEach((key) => {
    const config = Object.getOwnPropertyDescriptor(obj, key);

    if (config.configurable && !isSpecialProperty(obj, key)) {
      delete obj[key];
    }
  });
}

/**
 * Compare an object with another, could be object, array, number, string, bool.
 *
 * @param {Object} a The first object to compare
 * @param {Object} b The second object to compare
 * @returns {Boolean} Whether the objects are identical
 */
function objectsAreIdentical(a, b) {
  if (isObject(a) && isObject(b)) {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }
    const someAreNotSame = Object.keys(a).some((key) => !objectsAreIdentical(a[key], b[key]));
    return !someAreNotSame;
  }
  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    const someAreNotSame = a.some((key) => !objectsAreIdentical(a[key], b[key]));
    return !someAreNotSame;
  }
  return a === b;
}

/**
 * Generates patches by comparing two arrays.
 *
 * @private
 * @param {Array} oldA The old (original) array, which will be patched
 * @param {Array} newA The new array, which will be used to compare against
 * @returns {Array} An array of patches (if any)
 */
function patchArray(original, newA, basePath) {
  let patches = [];
  const oldA = original.slice();
  let i;
  let l;
  let tmpIdx = -1;

  function findIndex(a, id, idx) {
    if (a[idx] && isUndef(a[idx].qInfo)) {
      return null;
    }
    if (a[idx] && a[idx].qInfo.qId === id) {
      // shortcut if identical
      return idx;
    }
    for (let i = 0, l = a.length; i < l; i++) {
      if (a[i] && a[i].qInfo.qId === id) {
        return i;
      }
    }
    return -1;
  }

  if (objectsAreIdentical(newA, oldA)) {
    // array is unchanged
    return patches;
  }

  if (newA[0] === null || (!isUndef(newA[0]) && isUndef(newA[0].qInfo))) {
    // we cannot create patches without unique identifiers, replace array...
    patches.push({
      op: 'replace',
      path: basePath,
      value: newA,
    });
    return patches;
  }

  for (i = oldA.length - 1; i >= 0; --i) {
    tmpIdx = findIndex(newA, oldA[i] && oldA[i].qInfo && oldA[i].qInfo.qId, i);
    if (tmpIdx === -1) {
      patches.push({
        op: 'remove',
        path: `${basePath}/${i}`,
      });
      oldA.splice(i, 1);
    } else {
      // eslint-disable-next-line no-use-before-define
      patches = patches.concat(generateJsonPatch(oldA[i], newA[tmpIdx], `${basePath}/${i}`));
    }
  }

  for (i = 0, l = newA.length; i < l; ++i) {
    tmpIdx = findIndex(oldA, newA[i] && newA[i].qInfo && newA[i].qInfo.qId);
    if (tmpIdx === -1) {
      patches.push({
        op: 'add',
        path: `${basePath}/${i}`,
        value: newA[i],
      });
      oldA.splice(i, 0, newA[i]);
    } else if (tmpIdx !== i) {
      patches.push({
        op: 'move',
        path: `${basePath}/${i}`,
        from: `${basePath}/${tmpIdx}`,
      });
      oldA.splice(i, 0, oldA.splice(tmpIdx, 1)[0]);
    }
  }
  return patches;
}

/**
 * Generate an array of JSON-Patch:es following the JSON-Patch Specification Draft.
 *
 * See [specification draft](http://tools.ietf.org/html/draft-ietf-appsawg-json-patch-10)
 *
 * Does NOT currently generate patches for arrays (will replace them)
 *
 * @param {Object} original The object to patch to
 * @param {Object} newData The object to patch from
 * @param {String} [basePath] The base path to use when generating the paths for the patches (normally not used)
 * @returns {Array} An array of patches
 */
export function generateJsonPatch(original = {}, newData = {}, basePath = '') {
  let patches = [];

  Object.keys(newData).forEach((key) => {
    const val = clone(newData[key]);
    const oldVal = original[key];
    const tmpPath = `${basePath}/${key}`;

    if (objectsAreIdentical(val, oldVal) || isSpecialProperty(newData, key)) {
      return;
    }
    if (isUndef(oldVal)) {
      // property does not previously exist
      patches.push({
        op: 'add',
        path: tmpPath,
        value: val,
      });
    } else if (isObject(val) && isObject(oldVal)) {
      // we need to generate sub-patches for this, since it already exist
      patches = patches.concat(generateJsonPatch(oldVal, val, tmpPath));
    } else if (isArray(val) && isArray(oldVal)) {
      patches = patches.concat(patchArray(oldVal, val, tmpPath));
    } else {
      // it's a simple property (bool, string, number)
      patches.push({
        op: 'replace',
        path: `${basePath}/${key}`,
        value: val,
      });
    }
  });

  Object.keys(original).forEach((key) => {
    if (isUndef(newData[key]) && !isSpecialProperty(original, key)) {
      // this property does not exist anymore
      patches.push({
        op: 'remove',
        path: `${basePath}/${key}`,
      });
    }
  });

  return patches;
}

/**
 * Apply a list of patches to an object.
 *
 * @param {Object} original The object to patch
 * @param {Array} patches The list of patches to apply
 */
export function applyJsonPatch(original, patches) {
  patches.forEach((patch) => {
    const parent = getParent(original, patch.path);
    let key = patch.path.split('/').splice(-1)[0];
    const target = key && Number.isNaN(+key) ? parent[key] : parent[+key] || parent;
    const from = patch.from ? patch.from.split('/').splice(-1)[0] : null;

    if (patch.op === 'add' || patch.op === 'replace') {
      if (isArray(parent)) {
        // trust indexes from patches, so don't replace the index if it's an add
        if (key === '-') {
          key = parent.length;
        }
        parent.splice(+key, patch.op === 'add' ? 0 : 1, patch.value);
      } else if (isArray(target) && isArray(patch.value)) {
        const newValues = patch.value.slice();
        // keep array reference if possible...
        target.length = 0;
        target.push(target, ...newValues);
      } else if (isObject(target) && isObject(patch.value)) {
        // keep object reference if possible...
        emptyObject(target);
        extend(true, target, patch.value);
      } else {
        // simple value
        parent[key] = patch.value;
      }
    } else if (patch.op === 'move') {
      const oldParent = getParent(original, patch.from);
      if (isArray(parent)) {
        parent.splice(+key, 0, oldParent.splice(+from, 1)[0]);
      } else {
        parent[key] = oldParent[from];
        delete oldParent[from];
      }
    } else if (patch.op === 'remove') {
      if (isArray(parent)) {
        parent.splice(+key, 1);
      } else {
        delete parent[key];
      }
    }
  });
}

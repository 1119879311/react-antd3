export function get(souce, Arrkey = [], defaultValue) {
  if (!Arrkey || !souce || typeof souce != "object") {
    return defaultValue ? defaultValue : souce;
  }
  if (typeof Arrkey === "string") {
    Arrkey = Arrkey.split(".");
  }
  let resKey = Arrkey.slice();
  let _get = (_souce) => {
    try {
      if (_souce === undefined || typeof _souce !== "object" || !resKey.length)
        return _souce !== undefined ? _souce : defaultValue;
      let _key = resKey.splice(0, 1);
      let result = _souce[_key[0]];
      return _get(result);
    } catch (error) {
      return defaultValue ? defaultValue : undefined;
    }
  };

  return _get(souce);
}

// 非即时执行,在触发事件后，n秒后执行，如果不停触发事件，则重新计算
export function debounce(fn, awit = 1000) {
  let timeer;
  return function () {
    let context = this;
    let args = arguments;
    if (timeer) clearInterval(timeer);
    timeer = setTimeout(function () {
      fn.apply(context, args);
    }, awit);
  };
}

function isPlainObject(obj) {
  var proto, Ctor;
  if (!obj || Object.prototype.toString.call(obj) !== "[object Object]") {
    return false;
  }
  proto = Object.getPrototypeOf(obj);
  if (!proto) return true;
  Ctor =
    Object.prototype.hasOwnProperty.call(proto, "constructor") &&
    proto.constructor;
  return (
    typeof Ctor === "function" &&
    Function.prototype.toString.call(Ctor) ===
      Function.prototype.toString.call(Object)
  );
}

// 浅合拼
/**
 * 会改变obj1 的数据
 * @param {*} obj1
 * @param {*} obj2
 * @returns
 */
function shallowMerge(obj1, obj2) {
  var isPlain1 = isPlainObject(obj1);
  var isPlain2 = isPlainObject(obj2); //只要obj1不是对象，那么不管obj2是不是对象，都用obj2直接替换obj1
  if (!isPlain1) return obj2; //走到这一步时，说明obj1肯定是对象，那如果obj2不是对象，则还是以obj1为主
  if (!isPlain2) return obj1; //如果上面两个条件都不成立，那说明obj1和obj2肯定都是对象， 则遍历obj2 进行合并
  let keys = [...Object.keys(obj2), ...Object.getOwnPropertySymbols(obj2)];
  keys.forEach(function (key) {
    obj1[key] = obj2[key];
  });
  return obj1;
}

// 深合拼
/**
 * 会改变obj1 的数据
 * @param {*} obj1
 * @param {*} obj2
 * @param {*} cache
 * @returns
 */
export function deepMerge(obj1, obj2, cache) {
  //防止死循环，这里需要把循环过的对象添加到数组中
  cache = !Array.isArray(cache) ? [] : cache;
  //因为后面只对obj2进行遍历，所以这里只要判断obj2就可以了，
  //如果obj2已经比较合并过了则直接返回obj2，
  //否则在继续合并
  if (cache.indexOf(obj2)) return obj2;
  cache.push(obj2);
  var isPlain1 = isPlainObject(obj1);
  var isPlain2 = isPlainObject(obj2); //obj1或obj2中只要其中一个不是对象，则按照浅合并的规则进行合并
  if (!isPlain1 || !isPlain2) return shallowMerge(obj1, obj2); //如果都是对象，则进行每一层级的递归合并
  let keys = [...Object.keys(obj2), ...Object.getOwnPropertySymbols(obj2)];
  keys.forEach(function (key) {
    obj1[key] = deepMerge(obj1[key], obj2[key], cache); //这里递归调用
  });
  return obj1;
}

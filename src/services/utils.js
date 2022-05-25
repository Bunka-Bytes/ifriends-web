import axios from 'axios';

export function ROOT_URL() {
  return 'https://ifriends-api.herokuapp.com';
}

export function postResource(resource, body, config, newInstance) {
  return getAxiosInstance(newInstance).post(ROOT_URL() + resource, body, config).then(response => {
    return response;
  });
}

export function putResource(resource, body, config, newInstance) {
  return getAxiosInstance(newInstance).put(ROOT_URL() + resource, body, config).then(response => {
    return response;
  });
}

export function getResource(resource, config, newInstance) {
  return getAxiosInstance(newInstance).get(ROOT_URL() + resource, config).then(response => {
    return response;
  });
}

export function deleteResource(resource, config, newInstance) {
  return getAxiosInstance(newInstance).delete(ROOT_URL() + resource, config).then(response => {
    return response;
  });
}

function getAxiosInstance(newInstance) {
  let axiosInstance = axios;
  if (newInstance) {
    axiosInstance = axios.create();
  }
  return axiosInstance;
}


export function serializeObjectToParam(filtro, first) {
  var str = first ? "?" : "";
  for (var key in filtro) {
    if (!filtro[key] && typeof filtro[key] !== 'boolean') {
      continue;
    }
    if (Array.isArray(filtro[key])) {
      filtro[key].forEach(x => {
        if (str != "") {
          str += "&";
        }
        str += key + "=" + x;
      });
    } else {
      if (str != "") {
        str += "&";
      }
      str += key + "=" + filtro[key];
    }
  }
  return str;
}

export const geraUrlComPathParams = (url = '', ...params) => {
  if (!params) {
    return url;
  }
  return params.reduce((acc, param) => {
    return acc.replace(`{${param.name}}`, param.value)
  }, url)
}

export function promiseResolve(promise, callback) {
  if (callback) {
    promise.then(response => callback(response.data))
  }
  return promise;
}

export function resolveAllResquests(chamadas = [], callback) {
  axios.all(chamadas).then(axios.spread((...responses) => {
    if (callback) {
      callback(responses.map(r => r.data));
    }
  }))
}
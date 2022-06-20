import axios from 'axios';
import { getToken } from './auth';

export const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080'
});

api.interceptors.request.use(async config => {
	const token = getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export function postResource(resource, body, config) {
	return api.post(resource, body, config).then(response => {
		return response;
	});
}

export function putResource(resource, body, config) {
	return api.put(resource, body, config).then(response => {
		return response;
	});
}

export function getResource(resource, config) {
	return api.get(resource, config).then(response => {
		return response;
	});
}

export function deleteResource(resource, config) {
	return api.delete(resource, config).then(response => {
		return response;
	});
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

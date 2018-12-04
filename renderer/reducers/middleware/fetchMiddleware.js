import axios from 'axios';

export const FETCH = 'FETCH';
export const FETCH_IMAGE = 'FETCH_IMAGE';
export const FETCH_MIDDLEWARE = 'FETCH_MIDDLEWARE';

export const defaultOptions = {
  credentials: 'same-origin'
};

export const jsonHeader = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export const fileHeader = {
  'content-type': 'multipart/form-data'
};

// FETCH mode
// in any action just add fetch object like:
// {
//  fetch: {
//    type: 'FETCH',
//    actionTypes: {
//      request: 'TYPE_FOR_REQUEST',
//      success: 'TYPE_FOR_RECEIVED',
//      fail: 'TYPE_FOR_ERROR',
//    },
//    url: 'an url',
//    method: 'get',  // lower case, one of 'get', 'post'...
//    headers: {}     // OPTIONAL CONTENT like: data: { someprop: 'value ...}
//    options: {}     // OPTIONAL CONTENT like: Authorization: 'Bearer _A_TOKEN_'
//  }
// }

const fetchMiddleware = store => next => action => {
  if (!action.fetch) {
    return next(action);
  }

  if (!action.fetch.type ||
    !action.fetch.type === FETCH) {
    return next(action);
  }

  if (!action.fetch.actionTypes) {
    return next(action);
  }

  if (action.fetch.type === FETCH) {
    const {
      actionTypes: { request, success, fail },
      url,
      method,
      headers,
      options,
      params,
      data
    } = action.fetch;

    // request
    if (request) {
      store.dispatch({ type: request });
    }

    // fetch server (success or fail)
    // returns a Promise
    return axios.request({
      method,
      url,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...headers
      },
      params,
      data,
      ...options,
    })
      .then(data => {
        if (success) {
          store.dispatch({ type: success, payload: data });
        }
        return ({ payload: data });
      })
      .catch(
        err => {
          if (fail) {
            store.dispatch({ type: fail, error: err.response });
          }
          return Promise.reject(err.response);
        }
      );
  }

  else if (action.fetch.type === FETCH_IMAGE) {
    const {
      actionTypes: { success, fail },
      url,
      method,
      headers,
      options,
      uuid,
      count
    } = action.fetch;

    return axios.request({
      method,
      url,
      withCredentials: false,
      ...headers,
      ...options
    }).then(response => {
      store.dispatch({ type: success, image: response.data })
      if (count) { store.dispatch({ type: count.decrease }); }
    }).catch(error => {
      store.dispatch({ type: fail, error, uuid });
      if (count) { store.dispatch({ type: count.decrease }); }
      Promise.reject(error)
    });
  }
  return next(action);
};

export default fetchMiddleware;

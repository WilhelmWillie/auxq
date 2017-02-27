// import React from 'react';

function createQueue(cb) {
  fetch('/api/q/create', {
      method: 'POST'
    })
    .then(parseJSON)
    .then(cb);
}

function getSongQueue(id, cb) {
  fetch('/api/q/' + id)
    .then(parseJSON)
    .then(cb);
}

function checkMasterKey(id, key, cb) {
  fetch('/api/q/' + id + '/master/' + key)
    .then(parseJSON)
    .then(cb);
}

function parseJSON(response) {
  return response.json();
}

const Client = { createQueue, getSongQueue, checkMasterKey }

export default Client;
const AmfLoader = {};
AmfLoader.load = function(endpointIndex, methodIndex, compact) {
  endpointIndex = endpointIndex || 0;
  methodIndex = methodIndex || 0;
  const file = '/demo-api' + (compact ? '-compact' : '') + '.json';
  const url = location.protocol + '//' + location.host +
    location.pathname.substr(0, location.pathname.lastIndexOf('/'))
    .replace('/test', '/demo') + file;
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', (e) => {
      let data;
      try {
        data = JSON.parse(e.target.response);
      } catch (e) {
        reject(e);
        return;
      }
      const original = data;
      if (data instanceof Array) {
        data = data[0];
      }
      const encKey = compact ? 'doc:encodes' : 'http://a.ml/vocabularies/document#encodes';
      let encodes = data[encKey];
      if (encodes instanceof Array) {
        encodes = encodes[0];
      }
      const endKey = compact ? 'raml-http:endpoint' : 'http://a.ml/vocabularies/http#endpoint';
      let endpoints = encodes[endKey];
      if (endpoints && !(endpoints instanceof Array)) {
        endpoints = [endpoints];
      }
      const endpoint = endpoints[endpointIndex];
      const opKey = compact ? 'hydra:supportedOperation':
        'http://www.w3.org/ns/hydra/core#supportedOperation';
      let methods = endpoint[opKey];
      if (methods && !(methods instanceof Array)) {
        methods = [methods];
      }
      const method = methods[methodIndex];
      const expKey = compact ? 'hydra:expects' : 'http://www.w3.org/ns/hydra/core#expects';
      let request = method[expKey];
      if (request instanceof Array) {
        request = request[0];
      }
      const heKey = compact ? 'raml-http:header' : 'http://a.ml/vocabularies/http#header';
      let headers = request[heKey];
      if (headers && !(headers instanceof Array)) {
        headers = [headers];
      }
      resolve([original, headers]);
    });
    xhr.addEventListener('error',
      () => reject(new Error('Unable to load model file')));
    xhr.open('GET', url);
    xhr.send();
  });
};

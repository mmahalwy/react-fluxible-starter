import request from 'request';

export const getItenerary = function(actionContext, payload, done) {
  if (actionContext.getStore('IteneraryStore').getIteneraries().length > 0) {
    return done();
  }

  return request('http://localhost:3002/api/iteneraries', (error, response, body) => {
    actionContext.dispatch('itenerariesReceived', JSON.parse(body));
    done();
  })
}

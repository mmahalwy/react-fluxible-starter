import request from 'request';
import debugLib from 'debug';
const debug = debugLib('new-pirate');

export const getSurahs = function(actionContext, payload, done) {
  if (actionContext.getStore('SurahsStore').getSurahs().length > 0) {
    // return done();
  }
  // debug(done)
  return request('http://localhost:3002/api/surahs', (error, response, body) => {
    debug('Data recieved')
    actionContext.dispatch('surahsReceived', JSON.parse(body));
    return done();
  });
}

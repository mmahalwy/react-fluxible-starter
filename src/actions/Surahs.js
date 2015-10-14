import request from 'request';

export const getSurahs = function(actionContext, payload, done) {
  if (actionContext.getStore('SurahsStore').getSurahs().length > 0) {
    return done();
  }

  return request('http://localhost:3002/api/surahs', (error, response, body) => {
    actionContext.dispatch('surahsReceived', JSON.parse(body));
    done();
  })
}

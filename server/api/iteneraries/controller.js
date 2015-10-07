import request from 'request';

export function index(req, res) {
  request('http://localhost:3000/region_activities?region_id=4f9efd0f9fc73e000100001e', (error, response, body) => {
    res.json(200, JSON.parse(body).home);
  });
}

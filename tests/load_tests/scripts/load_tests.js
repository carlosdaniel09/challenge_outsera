import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { check, sleep } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    test_minutes: {
      executor: 'ramping-vus',
      stages: [
        { duration: '1m', target: 100 },
        { duration: '3m', target: 500 },
        { duration: '1m', target: 0 },
      ],
      exec: 'testMinutes',
    },
    test_seconds: {
      executor: 'ramping-vus',
      stages: [
        { duration: '2s', target: 250 },
        { duration: '3s', target: 500 },
        { duration: '2s', target: 0 },
      ],
      exec: 'testSeconds',
    },
  },
};

export function testMinutes() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const res = http.get(url);

  check(res, {
    'status é 200': (r) => r.status === 200,
    'tempo de resposta menor que 500ms': (r) => r.timings.duration < 500,
    'header Content-Type é application/json': (r) => r.headers['Content-Type'] === 'application/json; charset=utf-8',
    'resposta tem pelo menos um item': (r) => r.json().length > 0,
    'primeiro item contém um campo userId': (r) => r.json()[0].hasOwnProperty('userId'),
  });

  sleep(1);
};

export function testSeconds() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const res = http.get(url);

  check(res, {
    'status é 200': (r) => r.status === 200,
    'tempo de resposta menor que 500ms': (r) => r.timings.duration < 500,
    'header Content-Type é application/json': (r) => r.headers['Content-Type'] === 'application/json; charset=utf-8',
    'resposta tem pelo menos um item': (r) => r.json().length > 0,
    'primeiro item contém um campo userId': (r) => r.json()[0].hasOwnProperty('userId'),
  });

  sleep(1);
};

export function handleSummary(data) {
  return {
    'tests/load_tests/reports/summary.html': htmlReport(data),
  };
};

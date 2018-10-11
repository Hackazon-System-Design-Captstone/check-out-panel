import http from 'k6/http';
import { check } from "k6";

export let options = {
  vus: 130,
  duration: "10s",
  // rps: 1200,
};


export default function() {
  let random = Math.random();
  if (random > 0.2) {
    let res = http.get(`http://localhost:3000/${Math.floor(Math.random() * 1000) + 9998999}`);
    check(res, {
      "status was 200": (r) => r.status == 200,
      "transaction time OK": (r) => r.timings.duration < 1000
    });
  } else {
    let res = http.get(`http://localhost:3000/${Math.floor(Math.random() * 10000000) + 1}`);
    check(res, {
      "status was 200": (r) => r.status == 200,
      "transaction time OK": (r) => r.timings.duration < 1000
    });
  }
}

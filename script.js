import http from 'k6/http';
import { check } from "k6";

export let options = {
  vus: 200,
  duration: "10s",
  rps: 1000,
};


export default function() {
  let res = http.get(`http://localhost:3003/checkout/${Math.floor(Math.random() * 10000000) + 1}`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 1000
  });
}

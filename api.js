import axios from "axios";

// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2Jyem9za2E5N0BnbWFpbC5jb20iLCJpYXQiOjE1ODQ4MDU1MjUsImV4cCI6MTU4NTQxMDMyNX0.BhNNxGUcWcB2DeBHx_7huZVLWyDnS3k-fCL-Pq_U7Zo";
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdHVzZXJAZ21haWwuY29tIiwiaWF0IjoxNTg0ODI2MzE1LCJleHAiOjE1ODU0MzExMTV9.DDbaBlEePFx1xmZxV9nTtCP3IwGS365amegI_4G5E5w"
// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY292dW5pb25AZ21haWwuY29tIiwiaWF0IjoxNTg0ODI2NTI2LCJleHAiOjE1ODU0MzEzMjZ9.JiWRUMNq3d7rl-keIIlN2Cpb_Njw8Ti0X42FmwE3P5I"

export default async (endpoint, method, data = {}) => {
  return new Promise((resolve, reject) => {
    axios("http://localhost:3005/" + endpoint, {
      method: method,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      data: data
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(er => reject(er));
  });
};

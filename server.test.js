const request = require("supertest");
// app is supposed to point to the app.js file
const express = require("express");
const app = require("./server");

const data={message:'Hello',lang:'hi'}

describe("POST /translate", () => {
  describe("Sendig data to translate", () => {
    it("Posting data to translate",async () => {
      return await request(app)
        .post("/translate").send(data)
        .expect(200)
        .then((response) => {
          expect(response.text).toEqual('नमस्ते')
        });
    });

    it("fetching from cache",async () => {
      return await request(app)
        .post("/translate").send({message:'Hello',lang:'mr'})
        .expect(200)
        .then((response) => {
          expect(response.text).toEqual('नमस्कार')
        });
    });
  });

  describe("Sendig data to translate", () => {});
});

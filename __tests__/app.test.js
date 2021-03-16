const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const apis = require("../routes.json");
process.env.NODE_ENV = "test";

afterAll(() => {
  return connection.destroy();
});

beforeEach(() => {
  return connection.seed.run();
});

describe("/", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/").expect(200);
  });
});

describe("/api", () => {
  test("GET:200 responds with all routes", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.apis).toEqual(apis);
      });
  });
});

describe("/api/login", () => {
  test("POST:200 responds with user details", () => {
    return request(app)
      .post("/api/login")
      .send({ username: "test123", password: "password123", isUser: true })
      .expect(200);
  });
  test("POST:400 responds with error", () => {
    return request(app)
      .post("/api/login")
      .send({ username: "NOTAUSER", password: "NOTAPASSWORD", isUser: true })
      .expect(400);
  });
});

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

describe("/api/products", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/products").expect(200);
  });
  test("GET:200 responds with all products", () => {
    return request(app)
      .get("/api/products")
      .expect(200)
      .then(({ body: { products } }) => {
        expect(products).toHaveLength(2);
        expect(products[0]).toEqual(
          expect.objectContaining({
            item_name: expect.any(String),
            price: expect.any(String),
            img_url: expect.any(String),
            description: expect.any(String),
            seller: expect.any(String),
            item_type: expect.any(String),
          })
        );
      });
  });
  test("POST:201 responds with correct status code", () => {
    const input = {
      item_name: "Airpods",
      price: "100.99",
      img_url:
        "https://brain-images-ssl.cdn.dixons.com/7/5/10191857/u_10191857.jpg",
      description:
        "2020 apple airpods, you can listen to music without any wires",
      seller: "apple",
      item_type: "Electronics",
    };
    return request(app).post("/api/products").send(input).expect(201);
  });
  test("POST:201 adds new product to products table", () => {
    const input = {
      item_name: "Airpods",
      price: "100.99",
      img_url:
        "https://brain-images-ssl.cdn.dixons.com/7/5/10191857/u_10191857.jpg",
      description:
        "2020 apple airpods, you can listen to music without any wires",
      seller: "apple",
      item_type: "Electronics",
    };
    const expected = {
      item_name: "Airpods",
      price: "100.99",
      img_url:
        "https://brain-images-ssl.cdn.dixons.com/7/5/10191857/u_10191857.jpg",
      description:
        "2020 apple airpods, you can listen to music without any wires",
      seller: "apple",
      item_type: "Electronics",
    };
    return request(app)
      .post("/api/products")
      .send(input)
      .expect(201)
      .then(({ body }) => {
        expect(body.product).toEqual(expected);
      });
  });
});

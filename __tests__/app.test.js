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
        expect(products).toHaveLength(4);
        expect(products[0]).toEqual(
          expect.objectContaining({
            item_name: expect.any(String),
            price: expect.any(String),
            img_url: expect.any(String),
            description: expect.any(String),
            seller_name: expect.any(String),
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
      seller_name: "apple",
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
      seller_name: "apple",
      item_type: "Electronics",
    };
    const expected = {
      item_name: "Airpods",
      price: "100.99",
      img_url:
        "https://brain-images-ssl.cdn.dixons.com/7/5/10191857/u_10191857.jpg",
      description:
        "2020 apple airpods, you can listen to music without any wires",
      seller_name: "apple",
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

describe("/api/products/type/:item_type", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get(`/api/products/type/electronics`).expect(200);
  });
  test("GET:200 responds with all type:electronic products", () => {
    return request(app)
      .get(`/api/products/type/electronics`)
      .expect(200)
      .then(({ body: { products } }) => {
        expect(products).toHaveLength(3);
      });
  });
  test("GET:200 responds with all type:collectables products", () => {
    return request(app)
      .get(`/api/products/type/collectables`)
      .expect(200)
      .then(({ body: { products } }) => {
        expect(products).toHaveLength(1);
      });
  });
});

describe("/api/products/:item_name", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/products/MacBook_Pro").expect(200);
  });
  test("GET:200 responds with product of passed item_name", () => {
    const param = "MacBook_Pro";
    return request(app)
      .get(`/api/products/${param}`)
      .expect(200)
      .then(({ body: { product } }) => {
        expect(product).toHaveLength(1);
        expect(product[0]).toEqual(
          expect.objectContaining({
            item_name: param,
            price: expect.any(String),
            img_url: expect.any(String),
            description: expect.any(String),
            seller_name: expect.any(String),
            item_type: expect.any(String),
          })
        );
      });
  });
  test("DELETE: 200 responds with correct status code", () => {
    const input = { item_name: "MacBook_Pro" };
    return request(app).delete("/api/products/MacBook_Pro").expect(200);
  });
  test("DELETE: 200 responds with correct error code if passed incorrect item_name", () => {
    return request(app)
      .delete("/api/products/MacBook_Pro_NAAAT")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No item found");
      });
  });
});

describe("/api/sellers", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/sellers").expect(200);
  });
  test("GET:200 responds with array of objects with all sellers", () => {
    return request(app)
      .get("/api/sellers")
      .expect(200)
      .then(({ body: { sellers } }) => {
        expect(sellers).toHaveLength(3);
        expect(sellers[0]).toEqual(
          expect.objectContaining({
            seller_name: expect.any(String),
            avatar_url: expect.any(String),
            amount_of_products: expect.any(Number),
            reviews: expect.any(String),
            year_joined: expect.any(Number),
            location: expect.any(String),
          })
        );
      });
  });
});
describe("/api/sellers/:seller_name", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/sellers/sony").expect(200);
  });
  test("GET:200 responds with seller info", () => {
    return request(app)
      .get("/api/sellers/sony")
      .expect(200)
      .then(({ body: { seller } }) => {
        expect(seller).toHaveLength(1);
        expect(seller[0]).toEqual(
          expect.objectContaining({
            seller_name: expect.any(String),
            avatar_url: expect.any(String),
            amount_of_products: expect.any(Number),
            reviews: expect.any(String),
            year_joined: expect.any(Number),
            location: expect.any(String),
          })
        );
      });
  });
});

describe("/api/sellers/:seller_name/products", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/sellers/sony/products").expect(200);
  });
  test("GET:200 responds with all items of passed seller", () => {
    return request(app)
      .get("/api/sellers/sony/products")
      .expect(200)
      .then(({ body: { products } }) => {
        expect(products).toHaveLength(2);
        expect(products[0]).toEqual(
          expect.objectContaining({
            item_name: expect.any(String),
            price: expect.any(String),
            img_url: expect.any(String),
            description: expect.any(String),
            seller_name: expect.any(String),
            item_type: expect.any(String),
            reviews: expect.any(String),
            year_joined: expect.any(Number),
            location: expect.any(String),
            avatar_url: expect.any(String),
          })
        );
      });
  });
});

describe("/api/users", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/users").expect(200);
  });
  test("GET:200 responds with all users info", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users[0]).toEqual(
          expect.objectContaining({
            username: expect.any(String),
            firstname: expect.any(String),
            lastname: expect.any(String),
            avatar_url: expect.any(String),
          })
        );
      });
  });
  test("POST: 201 responds with correct status code", () => {
    const input = {
      username: "test2",
      password: "test2password",
      first_name: "test2firstname",
      surname: "test2surname",
      avatar_url: "www.google.com",
    };
    return request(app).post("/api/users").send(input).expect(201);
  });
  test("POST: 400 responds with error status code if user already exists", () => {
    const input = {
      username: "test123",
      password: "password123",
      first_name: "test",
      surname: "tester",
      avatar_url: "https://i.redd.it/w3kr4m2fi3111.png",
    };
    return request(app)
      .post("/api/users")
      .send(input)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Key (username)=(test123) already exists.");
      });
  });
});

describe.only("/api/products/types/all", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/products/types/all").expect(200);
  });
  test("GET:200 responds with all item types", () => {
    return request(app)
      .get("/api/products/types/all")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body).toHaveLength(2);
      });
  });
});

import request from "supertest";
import app from "../src/app";

describe("Branch API Tests", () => {
  it("should return all branches", async () => {
    const res = await request(app).get("/api/v1/branches");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return a branch by ID", async () => {
    const res = await request(app).get("/api/v1/branches/1");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it("should return 404 for invalid branch ID", async () => {
    const res = await request(app).get("/api/v1/branches/9999");
    expect(res.status).toBe(404);
  });

  it("should create a branch", async () => {
    const res = await request(app)
      .post("/api/v1/branches")
      .send({
        name: "Test Branch",
        address: "123 Test St",
        phone: "555-555-0000",
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Test Branch");
  });

  it("should update a branch", async () => {
    const res = await request(app)
      .put("/api/v1/branches/1")
      .send({ phone: "555-888-9999" });

    expect(res.status).toBe(200);
  });

  it("should delete a branch", async () => {
    const res = await request(app).delete("/api/v1/branches/1");
    expect(res.status).toBe(200);
  });
});

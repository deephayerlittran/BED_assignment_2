import request from "supertest";
import app from "../src/app";

describe("Branch API Tests", () => {
  let createdBranchId = "";

  it("should create a branch", async () => {
    const res = await request(app)
      .post("/api/v1/branches")
      .send({
        name: "Test Branch",
        address: "123 Testing Rd",
        phone: "5555555555",
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);

    createdBranchId = res.body.data.id;
    expect(typeof createdBranchId).toBe("string");
  });

  it("should return all branches", async () => {
    const res = await request(app).get("/api/v1/branches");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should return a branch by ID", async () => {
    const res = await request(app).get(`/api/v1/branches/${createdBranchId}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(createdBranchId);
  });

  it("should return 404 for invalid branch ID", async () => {
    const res = await request(app).get("/api/v1/branches/invalid-id-123");

    expect(res.status).toBe(404);
  });

  it("should update a branch", async () => {
    const res = await request(app)
      .put(`/api/v1/branches/${createdBranchId}`)
      .send({ phone: "1112223333" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should delete a branch", async () => {
    const res = await request(app).delete(`/api/v1/branches/${createdBranchId}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

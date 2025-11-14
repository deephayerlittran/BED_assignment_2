import request from "supertest";
import app from "../src/app";

describe("Employee API Tests", () => {
  it("should return all employees", async () => {
    const res = await request(app).get("/api/v1/employees");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return an employee by ID", async () => {
    const res = await request(app).get("/api/v1/employees/1");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it("should return 404 for invalid employee ID", async () => {
    const res = await request(app).get("/api/v1/employees/9999");
    expect(res.status).toBe(404);
  });

  it("should create a new employee", async () => {
    const res = await request(app)
      .post("/api/v1/employees")
      .send({
        name: "Test User",
        position: "Tester",
        department: "QA",
        email: "test@pixell-river.com",
        phone: "555-555-5555",
        branchId: 1,
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Test User");
  });

  it("should return 200 when updating employee", async () => {
    const res = await request(app)
      .put("/api/v1/employees/1")
      .send({ phone: "555-123-1234" });

    expect(res.status).toBe(200);
  });

  it("should delete an employee", async () => {
    const res = await request(app).delete("/api/v1/employees/1");
    expect(res.status).toBe(200);
  });
});

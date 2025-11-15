import request from "supertest";
import app from "../src/app";

describe("Employee API Tests", () => {
  let createdBranchId = "";
  let createdEmployeeId = "";

  beforeAll(async () => {
    // create a branch first because employees require branchId
    const branchRes = await request(app)
      .post("/api/v1/branches")
      .send({
        name: "EmployeeTestBranch",
        address: "99 Branch Way",
        phone: "7777777777",
      });

    createdBranchId = branchRes.body.data.id;
  });

  it("should create an employee", async () => {
    const res = await request(app)
      .post("/api/v1/employees")
      .send({
        name: "Test User",
        email: "test@example.com",
        position: "Tester",
        branchId: createdBranchId,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);

    createdEmployeeId = res.body.data.id;
  });

  it("should return all employees", async () => {
    const res = await request(app).get("/api/v1/employees");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should return an employee by ID", async () => {
    const res = await request(app).get(`/api/v1/employees/${createdEmployeeId}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(createdEmployeeId);
  });

  it("should return 404 for invalid employee ID", async () => {
    const res = await request(app).get("/api/v1/employees/invalid-id-123");

    expect(res.status).toBe(404);
  });

  it("should update an employee", async () => {
    const res = await request(app)
      .put(`/api/v1/employees/${createdEmployeeId}`)
      .send({ position: "Senior Tester" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should delete an employee", async () => {
    const res = await request(app).delete(
      `/api/v1/employees/${createdEmployeeId}`
    );

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

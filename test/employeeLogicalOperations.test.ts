import request from "supertest";
import app from "../app";

describe("Employee Logical Operations", () => {
  it("should return employees for a specific branch", async () => {
    const res = await request(app).get("/api/v1/logic/branch/1");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return empty array for branch with no employees", async () => {
    const res = await request(app).get("/api/v1/logic/branch/999");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it("should return employees in a department", async () => {
    const res = await request(app).get("/api/v1/logic/department/IT");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return 200 even if no employees found for department", async () => {
    const res = await request(app).get("/api/v1/logic/department/Unknown");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

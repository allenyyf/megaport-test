import { getObjValue } from "@/utils/common.js";

describe("test for get nest value in object function", () => {
  const testData = {
    name: "Megaport",
    address: {
      office: {
        unit: "Level 3",
        street: "825 Ann Street",
        suburb: "Fortitude Valley",
        city: "Brisbane",
        state: "Queensland",
        postcode: 4006,
      },
    },
    industry: {
      type: "Internet and telecommunications",
      asxListed: true,
    },
  };
  test("not valid param", () => {
    const path = "";
    const val = "params are not valid";
    let getVal = getObjValue(path, testData);
    expect(getVal).toBe(val);
  });
  test("not valid param", () => {
    const path = "name";
    const val = "params are not valid";
    let getVal = getObjValue(path, []);
    expect(getVal).toBe(val);
  });
  test("prop not in the obj", () => {
    const path = "address.office.test";
    const val = undefined;
    let getVal = getObjValue(path, testData);
    expect(getVal).toBe(val);
  });
  test("getObjValue function Three-level nested", () => {
    const path = "address.office.suburb";
    const val = "Fortitude Valley";
    let getVal = getObjValue(path, testData);
    expect(getVal).toBe(val);
  });
  test("getObjValue function Two-level nested", () => {
    const path = "industry.asxListed";
    const val = true;
    let getVal = getObjValue(path, testData);
    expect(getVal).toBe(val);
  });
  test("getObjValue function One-level", () => {
    const path = "name";
    const val = "Megaport";
    let getVal = getObjValue(path, testData);
    expect(getVal).toBe(val);
  });
});

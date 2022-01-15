import { getObjValue, requestForData } from "@/utils/common.js";

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

describe("test for getMegaportEnabledLocations function", () => {
  const url = "https://api.megaport.com/v2/locations",
    method = "get";

  test("request success", () => {
    return requestForData(url, method)
      .then((res) => {
        expect(res).toEqual(
          expect.objectContaining({
            data: expect.any(Array),
            message: expect.any(String),
            terms: expect.any(String),
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("request error", () => {
    return requestForData(url + "error", method).catch((err) => {
      expect(err).toEqual(
        expect.objectContaining({
          terms: expect.any(String),
          message: expect.any(String),
        })
      );
    });
  });
});

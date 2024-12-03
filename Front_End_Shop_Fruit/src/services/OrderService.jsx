import * as http from "../common/http-common";

const URLAPI = process.env.REACT_APP_API_ASP;

export const findAll = async () => {
  try {
    const res = await http.get(`${URLAPI}/order`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const findById = async (id) => {
    try {
      const res = await http.get(`${URLAPI}/order/id/${id}`);
      return [res, null];
    } catch (error) {
      return [null, error];
    }
  };

  export const update = async (id, data) => {
    try {
      const res = await http.put(`${URLAPI}/order/${id}`, data);
      return [res, null];
    } catch (error) {
      return [null, error];
    }
  };
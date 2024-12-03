import * as http from "../common/http-common";

const URLAPI = process.env.REACT_APP_API_ASP;


export const addToCart = async (cartData) => {
  try {
    const res = await http.save(`${URLAPI}/cart`, cartData);
    return [res.status, null];
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Lỗi không xác định";
    return [null, errorMessage];
  }
};

export const findById = async (userId) => {
  try {
    const res = await http.get(`${URLAPI}/cart/${userId}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const search = async (name, sort, page) => {
  try {
    const params = new URLSearchParams();
    if (name != null) params.append('name', name);
    if (sort != null) params.append('sort', sort);
    if (page != 1) params.append('page', page);
    
    const queryString = params.toString() ? `?${params}` : '';
    const res = await http.get(`${URLAPI}/cart${queryString}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const upload = async (data) => {
  try {
    const res = await http.save(`${URLAPI}/upload-image/cart`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const save = async (data) => {
  try {
    const res = await http.save(`${URLAPI}/cart`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const placeOrder = async (accountId) => {
  try {
    const response = await http.get(`${URLAPI}/order/${accountId}`);
    return [response, null];
  } catch (error) {
    throw error.response ? error.response.data : { message: "Lỗi kết nối đến server" };
  }
};

export const update = async (id, quantity) => {
  try {
    const res = await http.put(`${URLAPI}/cart/${id}/${quantity}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const remove = async (id) => {
  try {
    const res = await http.remove(`${URLAPI}/cart/${id}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

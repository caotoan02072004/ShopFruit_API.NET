import * as http from "../common/http-common";

const URLAPI = process.env.REACT_APP_API_ASP;

export const findAll = async () => {
  try {
    const res = await http.get(`${URLAPI}/banner`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const findTakeBanner = async () => {
  try {
    const res = await http.get(`${URLAPI}/banner/getbanner`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const findById = async (id) => {
  try {
    const res = await http.get(`${URLAPI}/banner/${id}`);
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
    const res = await http.get(`${URLAPI}/banner${queryString}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const upload = async (data) => {
  try {
    const res = await http.save(`${URLAPI}/upload-image/banner`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const save = async (data) => {
  try {
    console.log("first", data)
    const res = await http.save(`${URLAPI}/banner`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const update = async (id, data) => {
  try {
    const res = await http.put(`${URLAPI}/banner/${id}`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const remove = async (id) => {
  try {
    const res = await http.remove(`${URLAPI}/banner/${id}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

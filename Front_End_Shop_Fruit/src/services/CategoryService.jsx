import * as http from "../common/http-common";

const URLAPI = process.env.REACT_APP_API_ASP;

export const findAll = async () => {
  try {
    const res = await http.get(`${URLAPI}/category?sort=Id-DESC`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const findListAll = async () => {
  try {
    const res = await http.get(`${URLAPI}/category/all`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const findById = async (id) => {
  try {
    const res = await http.get(`${URLAPI}/category/${id}`);
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
    const res = await http.get(`${URLAPI}/category${queryString}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const save = async (data) => {
  try {
    const res = await http.save(`${URLAPI}/category`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const update = async (id, data) => {
  try {
    const res = await http.put(`${URLAPI}/category/${id}`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const remove = async (id) => {
  try {
    const res = await http.remove(`${URLAPI}/category/${id}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};
import axios from "axios";

const API =
  "https://6a13278b78d0434e0d5dd9da.mockapi.io/todo";

export const getTasks = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createTask = async (
  data
) => {
  const res = await axios.post(
    API,
    data
  );

  return res.data;
};

export const deleteTask = async (
  id
) => {
  const res =
    await axios.delete(
      `${API}/${id}`
    );

  return res.data;
};

export const updateTask = async (
  id,
  data
) => {
  const res = await axios.put(
    `${API}/${id}`,
    data
  );

  return res.data;
};
import axios from "axios";
import swal from "sweetalert";

export const getProducts = async (
  set,
  setfilter,
  setBeforeFilter,
  page,
  setError
) => {
  return await axios
    .get(`lab-scope/store-inside?page=${page}`)
    .then((res) => {
      set(res.data);
      setfilter(res.data);
      setBeforeFilter(res.data);
    })
    .catch((err) => {
      // setError(err.response.data);
    });
};

export const getAllTestUnits = async (set, setError) => {
  return await axios
    .get(`lab-scope/get-TestUnits`)
    .then((response) => {
      set(response.data);
    })
    .catch((err) => {
      // console.log("data");
    });
};

export const outProduct = async (id, data, setError) => {
  return await axios
    .post(`lab-scope/quantity-update/${id}`, data)
    .then((response) => {
      // set(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteProduct = async (id, set, setError) => {
  return await axios
    .delete(`lab-scope/store-delete/${id}`)
    .then((response) => {
      // set(response.data);
      set(true);
      swal("Great!", `Well Done`, "success");
    })
    .catch((err) => {
      set(true);
      console.log("data");
    });
};

export const updateProduct = async (id, data, set, setError) => {
  return await axios
    .post(`lab-scope/store-update/${id}`, data)
    .then((response) => {
      // set(response.data);
      swal("Great!", `Well Done`, "success");
      set(true);
    })
    .catch((err) => {
      // console.log("data");
    });
};

export const getProductById = async (id, set, setError) => {
  return await axios.get(`lab-scope/store-show/${id}`);
  // .then((response) => {
  //   // set(response.data);
  // })
  // .catch((err) => {
  //   // console.log("data");
  // });
};

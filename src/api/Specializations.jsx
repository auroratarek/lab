import axios from "axios";

export const getAllSpecialization = async () => {
  await axios
    .get(`https://aurora-team.com/Labs/public/api/specializations`)
    .then((res) => {
      console.log(res, "AllSpecialization");
    });
};

export const StoreSpecialization = async () => {
  await axios
    .post(`https://aurora-team.com/Labs/public/api/specialization-store`)
    .then((res) => {
      console.log(res, "StoreSpecialization");
    });
};

export const ShowSpecialization = async (id) => {
  await axios
    .get(`https://aurora-team.com/Labs/public/api/specialization-show/${id}`)
    .then((res) => {
      console.log(res, "ShowSpecialization");
    });
};

export const UpdateSpecialization = async (id) => {
  await axios
    .post(`https://aurora-team.com/Labs/public/api/specialization-update/${id}`)
    .then((res) => {
      console.log(res, "UpdateSpecialization");
    });
};

export const DeleteSpecialization = async (id) => {
  await axios
    .delete(
      `https://aurora-team.com/Labs/public/api/specialization-delete/${id}`
    )
    .then((res) => {
      console.log(res, "DeleteSpecialization");
    });
};

import axios from "axios";

export const getMyLab = async () => {
  await axios
    .get(`https://aurora-team.com/Labs/public/api/labs`)
    .then((res) => {
      console.log(res, "MyLab");
    });
};

export const StoreLab = async () => {
  await axios
    .post(`https://aurora-team.com/Labs/public/api/lab-store`)
    .then((res) => {
      console.log(res, "StoreLab");
    });
};

export const ShowLab = async (id) => {
  await axios
    .get(`https://aurora-team.com/Labs/public/api/lab-show/${id}`)
    .then((res) => {
      console.log(res, "ShowLab");
    });
};

export const UpdateLab = async (id) => {
  await axios
    .post(`https://aurora-team.com/Labs/public/api/lab-update/${id}`)
    .then((res) => {
      console.log(res, "UpdateLab");
    });
};

export const DeleteLab = async (id) => {
  await axios
    .delete(`https://aurora-team.com/Labs/public/api/lab-delete/${id}`)
    .then((res) => {
      console.log(res, "DeleteLab");
    });
};

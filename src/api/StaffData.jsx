import axios from "axios";

export const getMyStaff = async () => {
  await axios
    .get(`https://aurora-team.com/Labs/public/api/staff`)
    .then((res) => {
      console.log(res, "MyStaff");
    });
};

export const StoreStaff = async () => {
  await axios
    .post(`https://aurora-team.com/Labs/public/api/staff-store`)
    .then((res) => {
      console.log(res, "StoreStaff");
    });
};

export const ShowStaff = async (id) => {
  await axios
    .get(`https://aurora-team.com/Labs/public/api/staff-show/${id}`)
    .then((res) => {
      console.log(res, "ShowStaff");
    });
};

export const UpdateStaff = async (id) => {
  await axios
    .post(`https://aurora-team.com/Labs/public/api/staff-update/${id}`)
    .then((res) => {
      console.log(res, "UpdateStaff");
    });
};

export const DeleteStaff = async (id) => {
  await axios
    .delete(`https://aurora-team.com/Labs/public/api/staff-delete/${id}`)
    .then((res) => {
      console.log(res, "DeleteStaff");
    });
};

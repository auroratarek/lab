import axios from "axios";

export const getMyDoctors = async () => {
  await axios
    .get(`https://aurora-team.com/Labs/public/api/doctors`)
    .then((res) => {
      console.log(res, "MyDoctors");
    });
};

export const StoreDoctor = async () => {
  await axios
    .post(`https://aurora-team.com/Labs/public/api/doctor-store`)
    .then((res) => {
      console.log(res, "StoreDoctor");
    });
};

export const ShowDoctor = async (id) => {
  await axios
    .get(`https://aurora-team.com/Labs/public/api/doctor-show/${id}`)
    .then((res) => {
      console.log(res, "ShowDoctor");
    });
};

export const UpdateDoctor = async (id) => {
  await axios
    .post(`https://aurora-team.com/Labs/public/api/doctor-update/${id}`)
    .then((res) => {
      console.log(res, "UpdateDoctor");
    });
};

export const DeleteDoctor = async (id) => {
  await axios
    .delete(`https://aurora-team.com/Labs/public/api/doctor-delete/${id}`)
    .then((res) => {
      console.log(res, "DeleteDoctor");
    });
};

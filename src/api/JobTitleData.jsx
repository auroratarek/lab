import axios from "axios";

export const getMyLab = async () => {
  await axios
    .get(`https://aurora-team.com/Labs/public/api/job-titles`)
    .then((res) => {
      console.log(res, "JobTitles");
    });
};

export const StoreLab = async () => {
  await axios
    .post(`https://aurora-team.com/Labs/public/api/job-title-store`)
    .then((res) => {
      console.log(res, "StoreJobTitle");
    });
};

export const ShowLab = async (id) => {
  await axios
    .get(`https://aurora-team.com/Labs/public/api/job-title-show/${id}`)
    .then((res) => {
      console.log(res, "ShowJobTitle");
    });
};

export const UpdateLab = async (id) => {
  await axios
    .post(`https://aurora-team.com/Labs/public/api/job-title-update/${id}`)
    .then((res) => {
      console.log(res, "UpdateJobTitle");
    });
};

export const DeleteLab = async (id) => {
  await axios
    .delete(`https://aurora-team.com/Labs/public/api/job-title-delete/${id}`)
    .then((res) => {
      console.log(res, "DeleteJobTitle");
    });
};

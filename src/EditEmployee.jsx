import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import "react-datepicker/dist/react-datepicker.css";
import profile from "./Images/profile.jpg";
import { IoIosClose } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import { VscListFlat } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import Header from "./components/Header";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import DeleteEmployee from "./components/Staff/DeleteEmployee";
function EditEmployee() {
  const params = useParams();
  const { t, i18n } = useTranslation();

  const [BirthDate, setBirthDate] = useState(new Date());
  const [WorkDate, setWorkDate] = useState(new Date());

  const [To, ToonChange] = useState("00:00");
  const [From, FromonChange] = useState("00:00");

  const BirthInput = React.forwardRef((props, ref) => {
    return (
      <div className=" p-3  justify-between   outline-0  border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4  relative m-auto border-[1px] rounded-xl ">
        <label className="text-[#98A2B3] text-xs mr-20 font-Poppins-Medium">
          {t("Date of birth")}
        </label>
        <div className=" flex items-center">
          <label
            onClick={props.onClick}
            ref={ref}
            className="text-black text-xs font-Poppins-Medium"
          >
            {props.value || props.placeholder}
          </label>
          <IoCalendarOutline
            onClick={props.onClick}
            className="ml-5 text-[#98A2B3]"
          />
        </div>
      </div>
    );
  });

  const WorkInput = React.forwardRef((props, ref) => {
    return (
      <div className="flex bg-[#F9FAFF] p-3 py-4 rounded-xl justify-between items-center w-full outline-0 border-2 ">
        <label className="text-[#98A2B3] text-xs mr-20 font-Poppins-Medium">
          {t("Work start")}
        </label>
        <div className=" flex items-center">
          <label
            onClick={props.onClick}
            ref={ref}
            className="text-black text-xs font-Poppins-Medium"
          >
            {props.value || props.placeholder}
          </label>
          <IoCalendarOutline
            onClick={props.onClick}
            className="ml-5 text-[#98A2B3]"
          />
        </div>
      </div>
    );
  });
  const [imageUrl, setImageUrl] = useState();
  const navigate = useNavigate();
  const [getSpecializations, setGetSpecializations] = useState();
  const [getJobTitle, setGetJobTitle] = useState();
  const [error, setError] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: "",
    DOB: "",
    work_start: "",
    job_title_id: -1,
    specialization_id: -1,
    note: "",
    salary: "",
    experiance: "",
    collage: "",
    work_time_start: "",
    work_time_end: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: "",
    DOB: "",
    work_start: "",
    job_title_id: -1,
    specialization_id: -1,
    note: "",
    salary: "",
    experiance: "",
    collage: "",
    work_time_start: "",
    work_time_end: "",
  });
  const getImage = (e) => {
    let type = e.target.files[0].type;
    let files = e.target.files[0];
    let ext = type.substring(type.indexOf("/") + 1);
    if (type.substring(0, type.indexOf("/")) === "image") {
      setImageProfile(window.URL.createObjectURL(new Blob(e.target.files)));
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };
  const [imageProfile, setImageProfile] = useState();
  useEffect(() => {
    axios
      .get("lab-scope/specializations")
      .then((res) => {
        console.log(res.data);
        setGetSpecializations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("lab-scope/job-titles")
      .then((res) => {
        console.log(res.data);
        setGetJobTitle(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`lab-scope/staff-show/${params.id}`)
      .then((res) => {
        // console.log(`https://aurora-team.com/labs-obada/public/${res.data.image}`)
        setImageProfile(
          `https://aurora-team.com/labs-obada/public/${res.data.image}`
        );
        setImageUrl(res.data.image);
        setFormData({
          name: res.data.name ? res.data.name : "",
          email: res.data.email ? res.data.email : "",
          phone: res.data.phone ? res.data.phone : "",
          address: res.data.address ? res.data.address : "",
          image: res.data.image ? res.data.image : "",
          DOB: res.data.DOB ? res.data.DOB : "",
          work_start: res.data.work_start ? res.data.work_start : "",
          job_title_id: res.data.job ? res.data.job.id : -1,
          specialization_id: res.data.spec ? res.data.spec.id : -1,
          note: res.data.note ? res.data.note : "",
          salary: res.data.salary ? res.data.salary : "",
          experiance: res.data.experiance ? res.data.experiance : "",
          collage: res.data.collage ? res.data.collage : "",
          work_time_start: res.data.work_time_start
            ? res.data.work_time_start
            : "",
          work_time_end: res.data.work_time_end ? res.data.work_time_end : "",
        });
        // setGetJobTitle(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleChangeName = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };
  const handleChangeEmail = (e) => {
    setFormData({
      ...formData,
      email: e.target.value,
    });
  };
  const handleChangePhone = (e) => {
    setFormData({
      ...formData,
      phone: e.target.value,
    });
  };
  const handleChangeBirthDate = (e) => {
    setFormData({
      ...formData,
      DOB: moment(`${e}`).format("YYYY-MM-DD"),
    });
  };
  const handleChangeExperience = (e) => {
    setFormData({
      ...formData,
      experiance: e.target.value,
    });
  };
  const handleChangeCollege = (e) => {
    setFormData({
      ...formData,
      collage: e.target.value,
    });
  };
  const handleChangeSalary = (e) => {
    setFormData({
      ...formData,
      salary: e.target.value,
    });
  };
  const handleChangeAddress = (e) => {
    setFormData({
      ...formData,
      address: e.target.value,
    });
  };
  const handleChangeJobTitle = (e) => {
    console.log(e.target.value);
    setFormData({
      ...formData,
      job_title_id: parseInt(e.target.value),
    });
  };
  const handleChangeWorkDate = (e) => {
    setFormData({
      ...formData,
      work_start: moment(`${e}`).format("YYYY-MM-DD"),
    });
  };
  const handleChangeSpecialization = (e) => {
    // console.log(e.target.id)
    setFormData({
      ...formData,
      specialization_id: parseInt(e.target.value),
    });
  };
  const handleChangeNotes = (e) => {
    setFormData({
      ...formData,
      note: e.target.value,
    });
  };
  const handleChangeTimeStart = (e) => {
    console.log(e);
    setFormData({
      ...formData,
      work_time_start: e,
    });
  };
  const handleChangeTimeEnd = (e) => {
    setFormData({
      ...formData,
      work_time_end: e,
    });
  };
  const handleSendData = (e) => {
    e.preventDefault();

    const data = {};
    if (formData.name) {
      data["name"] = formData.name;
    }
    if (formData.email) {
      data["email"] = formData.email;
    }
    if (formData.phone) {
      data["phone"] = formData.phone;
    }
    if (formData.address) {
      data["address"] = formData.address;
    }
    if (formData.image !== imageUrl) {
      data["image"] = formData.image;
    }
    if (formData.DOB) {
      data["DOB"] = formData.DOB;
    }
    if (formData.work_start) {
      data["work_start"] = formData.work_start;
    }
    if (formData.job_title_id !== -1) {
      data["job_title_id"] = formData.job_title_id;
    }
    if (formData.specialization_id !== -1) {
      data["specialization_id"] = formData.specialization_id;
    }
    if (formData.note) {
      data["note"] = formData.note;
    }
    if (formData.salary) {
      data["salary"] = formData.salary;
    }
    if (formData.experiance) {
      data["experiance"] = formData.experiance;
    }
    if (formData.collage) {
      data["collage"] = formData.collage;
    }
    if (formData.work_time_start) {
      data["work_time_start"] = formData.work_time_start;
      console.log(formData.work_time_start + ":00");
    }
    if (formData.work_time_end) {
      data["work_time_end"] = formData.work_time_end;
    }

    axios
      .post(`lab-scope/staff-update/${params.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        // setFormData({
        //   ...formData,
        //   name:""
        // })
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          image: "",
          DOB: "",
          work_start: "",
          job_title_id: -1,
          specialization_id: -1,
          note: "",
          salary: "",
          experiance: "",
          collage: "",
          work_time_start: "",
          work_time_end: "",
        });
        navigate("/Staff");
      })
      .catch((err) => {
        console.log(err);
        // setError({
        //   ...error,
        //   name:,
        //   email
        // })
      });
  };
  function printPage() {
    window.print();
  }
  const filebrowser = (e) => {
    e.preventDefault();
    document.getElementById("fileInput").click();
  };

  const [OpenDeleteEmployss, setOpenDeleteEmployss] = useState(false);

  return (
    <div className="w-full h-full pr-5 p-5">
      <DeleteEmployee
        page={1}
        id={params.id}
        name={formData.name && formData.name}
        open={OpenDeleteEmployss}
        setOpen={setOpenDeleteEmployss}
      />
      <div className="w-full flex ">
        <Header />
      </div>
      <div className="flex ">
        <SideBar page="Staff" />
        <div className="w-full h-full ml-8 mt-10">
          <div className="flex flex-col w-full justify-between">
            <div className="flex flex-col md:flex-row w-full space-x-2 justify-between border-b-[1px] pb-5">
              <div className="w-fit pr-2  rounded-lg flex items-center mr-5 space-x-5">
                <img
                  src={imageProfile}
                  className="rounded-full w-[56px] h-[56px]  ml-2"
                />
                <h1 className="font-Poppins-Bold  text-xl">{formData.name}</h1>
              </div>

              <div className="flex space-x-5 justify-between items-center">
                <div className="flex items-center">
                  <p className="font-Poppins-Medium text-[#98A2B3] text-sm font-medium">
                    Added on 26/10/2022
                  </p>
                </div>
                <div
                  onClick={() => setOpenDeleteEmployss(true)}
                  className="bg-[#F04438] print:hidden w-fit py-3  flex items-center justify-center px-10 md:px-20 rounded-xl cursor-pointer "
                >
                  <p className="text-sm flex print:hidden  items-center justify-center font-Poppins-Medium text-white">
                    {t("Delete")}
                  </p>
                </div>
              </div>
            </div>

            <div className=" mt-5">
              <div className="flex space-y-5 lg:space-y-0  lg:flex-row flex-col lg:space-x-5 w-full">
                <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 lg:w-[60%]">
                  <div className="relative mx-auto w-fit h-full rounded-2xl flex   bg-no-repeat">
                    <img
                      src={imageProfile}
                      className="w-[270px] h-[270px] bg-cover rounded-2xl "
                    />
                    <div className="w-full h-full pt-3 absolute flex justify-end ">
                      <IoIosClose
                        onClick={(e) => filebrowser(e)}
                        className=" text-2xl  text-[#F04438] bg-[#FFFFFF] rounded-full  mr-2"
                      />
                      <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => getImage(e)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-5 md:w-1/2 flex-grow">
                    <div className="bg-[#F9FAFF]  border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-4 px-4    relative  border-[1px] rounded-xl ">
                      <input
                        name="Name"
                        value={formData.name}
                        onChange={handleChangeName}
                        placeholder={t("Name")}
                        type="text"
                        className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                      />
                    </div>
                    <div className="bg-[#F9FAFF]  border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-4 px-4    relative  border-[1px] rounded-xl ">
                      <input
                        name="Email"
                        value={formData.email}
                        onChange={handleChangeEmail}
                        placeholder={t("Email")}
                        type="email"
                        className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                      />
                    </div>
                    <div className="bg-[#F9FAFF]  border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-4 px-4    relative  border-[1px] rounded-xl ">
                      <input
                        name="Phone number"
                        value={formData.phone}
                        onChange={handleChangePhone}
                        placeholder={t("Phone number")}
                        type="tel"
                        className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                      />
                    </div>
                    <div className="">
                      <ReactDatePicker
                        id="date"
                        value={formData.DOB}
                        onChange={handleChangeBirthDate}
                        dateFormat="yyyy/MM/dd"
                        className=" "
                        customInput={<BirthInput />}
                        selected={BirthDate}
                        // onChange={(date) => setBirthDate(date)}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 lg:w-[40%]">
                  <textarea
                    value={formData.experiance}
                    onChange={handleChangeExperience}
                    placeholder={t("Experience")}
                    name="Experience"
                    className=" bg-[#F9FAFF] row-span-2 text-xs border-[#E4E7EC] w-full h-full  flex  items-center py-3 px-4 outline-0 ring-0   relative  border-[1px] rounded-xl "
                    rows={6}
                  />
                  <div className="bg-[#F9FAFF]  border-[#E4E7EC] w-full h-fit  flex  items-center py-4 px-4    relative  border-[1px] rounded-xl ">
                    <input
                      value={formData.collage}
                      onChange={handleChangeCollege}
                      name="College"
                      placeholder={t("College")}
                      type="text"
                      className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                    />
                  </div>
                  <div className="bg-[#F9FAFF]  border-[#E4E7EC] w-full h-fit  flex  items-center py-4 px-4    relative  border-[1px] rounded-xl ">
                    <input
                      name="Salary rate"
                      value={formData.salary}
                      onChange={handleChangeSalary}
                      placeholder={t("Salary rate")}
                      type="text"
                      className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                    />
                  </div>
                </div>
              </div>
              <div className="flex space-y-5 lg:space-y-0  lg:space-x-5 lg:flex-row flex-col  mt-5">
                <div className="flex flex-col space-y-5 lg:w-[60%]">
                  <div className=" bg-[#F9FAFF] border-[#E4E7EC] w-full h-fit  flex  items-center py-4 px-4    relative  border-[1px] rounded-xl ">
                    <input
                      name="Address"
                      value={formData.address}
                      onChange={handleChangeAddress}
                      placeholder={t("Address")}
                      type="text"
                      className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                    />
                  </div>
                  <div className=" flex space-x-5 justify-between">
                    <div className="w-1/4 lg:w-full pr-2  bg-[#F9FAFF] rounded-lg flex border-[1px] border-[#E4E7EC]  items-center lg:mr-5">
                      <select
                        value={formData.job_title_id}
                        onChange={handleChangeJobTitle}
                        name="JobTitle"
                        className={` w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Medium ${
                          formData.job_title_id === -1 ? "text-[#98A2B3]" : ""
                        }  text-xs  outline-none px-4 py-2 cursor-pointer`}
                      >
                        <option selected hidden className="">
                          Job Title
                        </option>
                        {getJobTitle &&
                          getJobTitle.map((item) => (
                            <option
                              key={item.id}
                              id={item.id}
                              value={item.id}
                              selected={
                                formData.job_title_id &&
                                formData.job_title_id === item.id
                                  ? "selected"
                                  : ""
                              }
                              className=""
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="w-full">
                      <ReactDatePicker
                        id="date"
                        value={formData.work_start}
                        onChange={handleChangeWorkDate}
                        dateFormat="yyyy-MM-dd"
                        className=" "
                        customInput={<WorkInput />}
                        selected={WorkDate}
                        // onChange={(date) => setWorkDate(date)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-5 lg:w-[40%]">
                  <div className="w-full py-1 lg:py-0 flex-grow pr-2 bg-[#F9FAFF] rounded-lg flex border-[1px] border-[#E4E7EC]  items-center mr-5">
                    <select
                      value={formData.specialization_id}
                      onChange={handleChangeSpecialization}
                      name="Specialization"
                      className={` w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Medium ${
                        formData.specialization_id === -1
                          ? "text-[#98A2B3]"
                          : ""
                      }  text-xs  outline-none px-4 py-2 cursor-pointer`}
                    >
                      <option selected hidden className="">
                        Specialization
                      </option>
                      {getSpecializations &&
                        getSpecializations.map((item) => (
                          <option
                            key={item.id}
                            id={item.id}
                            value={item.id}
                            selected={
                              formData.specialization_id &&
                              formData.specialization_id === item.id
                                ? "selected"
                                : ""
                            }
                            className=""
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex py-2 lg:py-0  bg-[#F9FAFF] items-center justify-end rounded-xl flex-grow">
                    <p className="bg-[#F9FAFF] opacity-80 font-Poppins-Medium text-xs text-[#98A2B3] pl-5">
                      {t("Worktime")}
                    </p>
                    <div className="flex x items-center justify-end rounded-xl flex-grow">
                      <div className="bg-[#F9FAFF] border-[#E4E7EC] px-4 py-2  h-fit  flex  items-center   border-r-[1px] rounded-l-xl">
                        <TimePicker
                          onChange={handleChangeTimeStart}
                          disableClock={true}
                          format="HH:mm"
                          locale="tr-tr"
                          // onChange={FromonChange}
                          value={formData.work_time_start || From}
                          // value={}
                          clearIcon={""}
                          className="w-fit text-xs"
                        />
                        <IoMdTime className="text-[#98A2B3] w-[20px] h-[20px]" />
                      </div>
                      <div className="bg-[#F9FAFF] border-[#E4E7EC] px-4  h-fit  flex  items-center   border-l-[1px] rounded-r-xl">
                        <TimePicker
                          disableClock={true}
                          locale="sv-sv"
                          format="HH:mm"
                          // onChange={ToonChange}
                          value={formData.work_time_end || To}
                          onChange={handleChangeTimeEnd}
                          clearIcon={""}
                          // value={To}
                          className="w-fit text-xs"
                        />
                        <IoMdTime className="text-[#98A2B3] w-[20px] h-[20px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <textarea
                onChange={handleChangeNotes}
                placeholder={t("Notes")}
                value={formData.note}
                name="Notes"
                className="mt-8  text-xs font-Poppins-Medium placeholder:text-[#98A2B3] bg-[#F9FAFF] border-[#E4E7EC] w-full h-full  flex  items-center py-3 px-4 outline-0 ring-0   relative  border-[1px] rounded-xl "
                rows={5}
              />
              <div className="flex md:col-start-1 md:col-end-3 lg:col-start-1 lg:col-end-6 justify-end space-x-2 mt-20">
                <Link
                  to="/Staff"
                  className="bg-transparent print:hidden border-[1px]  border-[#D0D5DD] w-fit  flex items-center justify-center lg:px-16 px-8 py-2 rounded-xl cursor-pointer "
                >
                  <p className="text-sm flex items-center justify-center text-black font-Poppins-Regular">
                    {t("Cancel")}
                  </p>
                </Link>
                <div
                  id="printbtn"
                  onClick={printPage}
                  className="bg-transparent print:hidden border-[1px] border-[#D0D5DD] w-fit  flex items-center justify-center lg:px-16 px-8 py-2 rounded-xl cursor-pointer "
                >
                  <p className="text-sm flex items-center justify-center text-black font-Poppins-Regular">
                    {t("Print")}
                  </p>
                </div>
                <div
                  onClick={handleSendData}
                  className="bg-[#B7C835] print:hidden w-fit  flex items-center justify-center lg:px-32 px-16 py-3 rounded-xl cursor-pointer "
                >
                  <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
                    {t("Add")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;

/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useRef, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosClose } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { t } from "i18next";
import moment from "moment";
import axios from "axios";

export default function AddEmployee({
  setDataBeforeFilter,
  page,
  setData,
  open,
  setOpen,
}) {
  const cancelButtonRef = useRef(null);
  const [BirthDate, setBirthDate] = useState(new Date());
  const [WorkDate, setWorkDate] = useState(new Date());
  const [Image, SetImage] = useState();
  const [getJobTitle, setGetJobTitle] = useState("");
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    email: "",
    DOB: moment(`${new Date()}`).format("YYYY-MM-DD"),
    work_start: moment(`${new Date()}`).format("YYYY-MM-DD"),
    job_title_id: -1,
    phone: "",
    address: "",
    note: "",
  });

  const [addressError, setAddressError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [imageError, setImageError] = useState("");
  const [jobError, setJobError] = useState("");
  const [nameError, setNameError] = useState("");
  const [noteError, setNoteError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const BirthInput = React.forwardRef((props, ref) => {
    return (
      <div
        onClick={props.onClick}
        className=" p-2  justify-between   outline-0  border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4  relative m-auto border-[1px] rounded-xl "
      >
        <label className="text-[#98A2B3] text-xs mr-20 font-Poppins-Regular">
          {t("Date of birth")}
        </label>
        <div className=" flex items-center">
          <label
            onClick={props.onClick}
            ref={ref}
            className="text-black font-Poppins-Regular"
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
      <div
        onClick={props.onClick}
        className=" p-2  justify-between   outline-0  border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4   relative m-auto border-[1px] rounded-xl "
      >
        <label className="text-[#98A2B3] text-xs mr-20 font-Poppins-Regular">
          {t("Work start")}
        </label>
        <div className=" flex items-center">
          <label
            onClick={props.onClick}
            ref={ref}
            className="text-black font-Poppins-Regular"
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

  const filebrowser = (e) => {
    e.preventDefault();
    document.getElementById("fileInput").click();
  };
  const getImage = (e) => {
    let type = e.target.files[0].type;
    let files = e.target.files[0];
    let ext = type.substring(type.indexOf("/") + 1);
    if (type.substring(0, type.indexOf("/")) === "image") {
      SetImage(window.URL.createObjectURL(new Blob(e.target.files)));
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
      //   if (!document.getElementById('ImageMessage').classList.contains("hidden")) {
      //     document.getElementById('ImageMessage').classList.add("hidden");
      //   }

      // } else {
      //   document.getElementById('ImageMessage').classList.remove("hidden");
      //   document.getElementById('ImageMessage').textContent = "الرجاء الانتباه على اختيار صورة فقط";
      //   SetImage(null);
    }
  };

  const NameClicked = () => {
    document.getElementById("Name").classList.remove("hidden");
    document
      .getElementById("NameContainer")
      .classList.remove("border-[#E4E7EC]");
    document.getElementById("NameContainer").classList.remove("bg-[#F9FAFF]");
    document.getElementById("NameContainer").classList.add("border-[#B7C835]");
    document.getElementById("NameContainer").classList.add("bg-white");
    document.getElementById("NameInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("NameInput").classList.add("bg-white");
  };

  const EmailClicked = () => {
    document.getElementById("Email").classList.remove("hidden");
    document
      .getElementById("EmailContainer")
      .classList.remove("border-[#E4E7EC]");
    document.getElementById("EmailContainer").classList.remove("bg-[#F9FAFF]");
    document.getElementById("EmailContainer").classList.add("border-[#B7C835]");
    document.getElementById("EmailContainer").classList.add("bg-white");
    document.getElementById("EmailInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("EmailInput").classList.add("bg-white");
  };

  const PhoneClicked = () => {
    document.getElementById("Phone").classList.remove("hidden");
    document
      .getElementById("PhoneContainer")
      .classList.remove("border-[#E4E7EC]");
    document.getElementById("PhoneContainer").classList.remove("bg-[#F9FAFF]");
    document.getElementById("PhoneContainer").classList.add("border-[#B7C835]");
    document.getElementById("PhoneContainer").classList.add("bg-white");
    document.getElementById("PhoneInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("PhoneInput").classList.add("bg-white");
  };

  const AddressClicked = () => {
    document.getElementById("Address").classList.remove("hidden");
    document
      .getElementById("AddressContainer")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("AddressContainer")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("AddressContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("AddressContainer").classList.add("bg-white");
    document.getElementById("AddressInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("AddressInput").classList.add("bg-white");
  };

  const NotesClicked = () => {
    document.getElementById("Notes").classList.remove("hidden");
    document.getElementById("NotesInput").classList.remove("border-[#E4E7EC]");
    document.getElementById("NotesInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("NotesInput").classList.add("border-[#B7C835]");
    document.getElementById("NotesInput").classList.add("bg-white");
    document.getElementById("NotesInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("NotesInput").classList.add("bg-white");
  };

  const JobTitleChanged = () => {
    document.getElementById("JobTitle").classList.remove("hidden");
    document
      .getElementById("JobTitleContainer")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("JobTitleContainer")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("JobTitleContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("JobTitleContainer").classList.add("bg-white");
    document.getElementById("JobTitleInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("JobTitleInput").classList.add("bg-white");
  };

  const GetStaff = async (page) => {
    console.log(page);
    // document.getElementById("Loader").classList.remove("hidden");
    // document.getElementById("Loader").classList.add("flex");

    await axios.get(`lab-scope/staff?page=${page}`).then((response) => {
      setData(response.data);
      setDataBeforeFilter(response.data);
      //dispatch(addAllGender(response.data));
      // document.getElementById("Loader").classList.add("hidden");
      // document.getElementById("Loader").classList.remove("flex");
      console.log(response);
    });
  };
  function close() {
    setBirthDate(new Date());
    setWorkDate(new Date());
    setFormData({
      image: "",
      name: "",
      email: "",
      DOB: moment(`${new Date()}`).format("YYYY-MM-DD"),
      work_start: moment(`${new Date()}`).format("YYYY-MM-DD"),
      job_title_id: -1,
      phone: "",
      address: "",
      note: "",
    });
    SetImage();
    setOpen(false);
    setAddressError("");
    setEmailError("");
    setImageError("");
    setJobError("");
    setNameError("");
    setNoteError("");
    setPhoneError("");
  }
  const handleChangeName = (e) => {
    console.log(formData);

    setFormData({
      ...formData,
      name: e.target.value,
    });
  };
  const handleChangeEmail = (e) => {
    // console.log(BirthDate)
    setFormData({
      ...formData,
      email: e.target.value,
    });
  };
  const handleChangeWorkDate = (e) => {
    setWorkDate(e);
    setFormData({
      ...formData,
      work_start: moment(`${e}`).format("YYYY-MM-DD"),
    });
  };
  const handleChangePhone = (e) => {
    // console.log(BirthDate)
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setFormData({
        ...formData,
        phone: e.target.value,
      });
    }
  };
  const handleChangeAddress = (e) => {
    // console.log(BirthDate)
    setFormData({
      ...formData,
      address: e.target.value,
    });
  };
  const handleChangeNote = (e) => {
    // console.log(BirthDate)
    setFormData({
      ...formData,
      note: e.target.value,
    });
  };
  const handleChangeJobTitleID = (e) => {
    setFormData({
      ...formData,
      job_title_id: parseInt(e.target.value),
    });
  };
  const handleChangeBirthDate = (e) => {
    setBirthDate(e);
    setFormData({
      ...formData,
      DOB: moment(`${e}`).format("YYYY-MM-DD"),
    });
  };
  const handleSendData = () => {
    axios
      .post("lab-scope/staff-store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // console.log(res.data)
        GetStaff(page);

        setFormData({
          image: "",
          name: "",
          email: "",
          DOB: moment(`${new Date()}`).format("YYYY-MM-DD"),
          work_start: moment(`${new Date()}`).format("YYYY-MM-DD"),
          job_title_id: -1,
          phone: "",
          address: "",
          note: "",
        });

        setBirthDate(new Date());
        setWorkDate(new Date());
        SetImage();
        setOpen(false);
        setAddressError("");
        setEmailError("");
        setImageError("");
        setJobError("");
        setNameError("");
        setNoteError("");
        setPhoneError("");
      })
      .catch((err) => {
        if (err.response.data.errors.address) {
          setAddressError(err.response.data.errors.address[0]);
        }
        if (err.response.data.errors.email) {
          setEmailError(err.response.data.errors.email[0]);
        }
        if (err.response.data.errors.image) {
          setImageError(err.response.data.errors.image[0]);
        }
        if (err.response.data.errors.job_title_id) {
          setJobError(err.response.data.errors.job_title_id[0]);
        }
        if (err.response.data.errors.name) {
          setNameError(err.response.data.errors.name[0]);
        }
        if (err.response.data.errors.note) {
          setNoteError(err.response.data.errors.note[0]);
        }
        if (err.response.data.errors.phone) {
          setPhoneError(err.response.data.errors.phone[0]);
        }
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get("lab-scope/job-titles")
      .then((res) => {
        console.log(res);
        setGetJobTitle(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 "
          initialFocus={cancelButtonRef}
          onClose={() => close()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto ">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0 ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative px-10 pb-8 bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-2 sm:max-w-xl sm:w-full ">
                  <div className="bg-white ">
                    <div className="w-full flex  h-full items-center mt-5">
                      <p className=" font-semibold justify-center flex flex-grow text-2xl ml-10">
                        {t("Add employee")}
                      </p>
                      <IoIosClose
                        className=" text-4xl  text-black border-[1px] rounded-full cursor-pointer bg-[#E4E7EC] "
                        onClick={() => close()}
                      />
                    </div>

                    <div className="w-full m-auto mt-10">
                      <div
                        className={` ${
                          Image == null
                            ? "w-fit border-dashed border-2"
                            : "w-40 h-40"
                        }  flex items-center flex-col  m-auto rounded-full  py-12 px-5 bg-cover bg-no-repeat bg-center`}
                        style={{ backgroundImage: `url(${Image})` }}
                      >
                        <input
                          id="fileInput"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => getImage(e)}
                        />
                        <CiImageOn
                          className={`text-2xl mb-2 ${
                            Image == null ? "block" : "hidden"
                          }`}
                        />
                        <h1
                          className={`flex flex-col items-center text-[#101828] font-Poppins-Regular text-xs ${
                            Image == null ? "flex" : "hidden"
                          }`}
                        >
                          {t("Drop your here, or")}{" "}
                          <span
                            className="text-[#B7C835] mt-1 underline underline-[#B7C835] cursor-pointer"
                            onClick={(e) => filebrowser(e)}
                          >
                            {t("select click to browse")}
                          </span>
                        </h1>
                      </div>
                      <span className="text-sm text-red-600">{imageError}</span>
                      <div className="flex flex-col space-y-5 h-full mt-10">
                        <div className="w-full">
                          <div
                            id="NameContainer"
                            className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                            onClick={() => NameClicked()}
                          >
                            <input
                              name="name"
                              onChange={handleChangeName}
                              id="NameInput"
                              placeholder={t("Employee name")}
                              type="text"
                              className=" w-full  font-Poppins-Regular bg-[#F9FAFF] text-sm text-[#707070] outline-0 ring-0"
                            />
                            <p
                              id="Name"
                              className="hidden font-Poppins-Regular text-sm absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Employee name")}
                            </p>
                          </div>
                          <span className="text-sm text-red-600">
                            {nameError}
                          </span>
                        </div>
                        <div className="w-full">
                          <div
                            id="EmailContainer"
                            className="bg-[#F9FAFF] border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                            onClick={() => EmailClicked()}
                          >
                            <input
                              onChange={handleChangeEmail}
                              name="Email"
                              id="EmailInput"
                              placeholder={t("Email")}
                              type="email"
                              className="w-full bg-[#F9FAFF] font-Poppins-Regular text-sm text-[#707070] outline-0 ring-0"
                            />
                            <p
                              id="Email"
                              className="hidden font-Poppins-Regular text-sm absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Email")}
                            </p>
                          </div>
                          <span className="text-sm text-red-600">
                            {emailError}
                          </span>
                        </div>
                        <div className="w-full">
                          <div
                            id="PhoneContainer"
                            className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                            onClick={() => PhoneClicked()}
                          >
                            <input
                              onChange={handleChangePhone}
                              id="PhoneInput"
                              name="Phone"
                              value={formData.phone}
                              placeholder={t("Phone number")}
                              type="tel"
                              className="w-full bg-[#F9FAFF] font-Poppins-Regular text-sm text-[#707070] outline-0 ring-0"
                            />
                            <p
                              id="Phone"
                              className="hidden font-Poppins-Regular text-sm absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Phone number")}
                            </p>
                          </div>
                          <span className="text-sm text-red-600">
                            {phoneError}
                          </span>
                        </div>
                        <div>
                          <ReactDatePicker
                            // onChange={handleChangeBirthDate}
                            id="date"
                            dateFormat="yyyy-MM-dd"
                            className=" "
                            customInput={<BirthInput />}
                            selected={BirthDate}
                            onChange={handleChangeBirthDate}
                          />
                        </div>
                        <div className="w-full">
                          <div
                            id="AddressContainer"
                            className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                            onClick={() => AddressClicked()}
                          >
                            <input
                              onChange={handleChangeAddress}
                              id="AddressInput"
                              name="Address"
                              placeholder={t("Address")}
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Regular text-sm text-[#707070] outline-0 ring-0"
                            />
                            <p
                              id="Address"
                              className="hidden font-Poppins-Regular text-sm absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Address")}
                            </p>
                          </div>
                          <span className="text-sm text-red-600">
                            {addressError}
                          </span>
                        </div>
                        <div>
                          <ReactDatePicker
                            id="date"
                            dateFormat="yyyy/MM/dd"
                            className=" "
                            customInput={<WorkInput />}
                            selected={WorkDate}
                            onChange={handleChangeWorkDate}
                          />
                        </div>
                        <div className="w-full">
                          <div
                            id="JobTitleContainer"
                            className="w-full pr-2 bg-[#F9FAFF] rounded-lg flex border-[1px] border-[#E4E7EC]  items-center mr-5"
                          >
                            <select
                              id="NotesInput"
                              name="Notes"
                              className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Regular  text-[#98A2B3] text-xs  outline-none px-4 py-2 cursor-pointer"
                              // onChange={() => JobTitleChanged()}
                              onChange={handleChangeJobTitleID}
                            >
                              <option hidden disabled selected>
                                {t("Job title")}
                              </option>
                              {getJobTitle &&
                                getJobTitle.map((item) => (
                                  <option value={item.id} className="">
                                    {item.name}
                                  </option>
                                ))}
                            </select>
                            <p
                              id="JobTitle"
                              className="hidden font-Poppins-Regular text-sm absolute top-[-0.8rem] bg-white left-[0.9rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Job title")}
                            </p>
                          </div>
                          <span className="text-sm text-red-600">
                            {jobError}
                          </span>
                        </div>
                        <div className="w-full">
                          <div className="relative w-full">
                            <textarea
                              onChange={handleChangeNote}
                              id="NotesInput"
                              placeholder={t("Notes")}
                              className="bg-[#F9FAFF] text-xs border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-3 px-4 outline-0 ring-0   relative m-auto border-[1px] rounded-xl "
                              rows={3}
                              // onClick={() => NotesClicked()}
                            />
                            <p
                              id="Notes"
                              className="hidden font-Poppins-Regular text-sm absolute top-[-0.8rem] bg-white left-[0.9rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Notes")}
                            </p>
                          </div>
                          <span className="text-sm text-red-600">
                            {noteError}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white  py-3  flex sm:flex-row-reverse justify-between mt-10">
                    <button
                      onClick={handleSendData}
                      type="button"
                      className="flex flex-grow py-2 bg-[#B7C835] justify-center rounded-xl text-white"
                    >
                      {t("Add worker")}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

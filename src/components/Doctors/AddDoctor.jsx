/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosClose } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { MdOutlineMail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosMale } from "react-icons/io";
import { IoFemaleSharp } from "react-icons/io5";
import { BsPercent } from "react-icons/bs";
import { FiLock } from "react-icons/fi";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { t } from "i18next";
import axios from "axios";
import { addAllDoctor } from "../../GlobalData/DoctorsSlice";
import { useDispatch } from "react-redux";
import man from "../../Images/man.svg";
import woman from "../../Images/woman.svg";

export default function AddDoctor({
  setDataForFilter,
  SetDataBeforeFilter,
  page,
  open,
  setOpen,
}) {
  const cancelButtonRef = useRef(null);
  const [Image, SetImage] = useState();

  const [Gender, SetGender] = useState();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    ratio: "",
    gender: "",
    address: "",
  });

  const [nameError, setNameError] = useState("a");
  const [phoneError, setPhoneError] = useState("a");
  const [emailError, setEmailError] = useState("a");
  const [addressError, setAddressError] = useState("a");
  const [ratioError, setRatioError] = useState("a");
  const [srcError, setSrcError] = useState("a");
  const [genderError, setGenderError] = useState("a");

  const [passwordError, setPasswordError] = useState("a");

  const filebrowser = (e) => {
    e.preventDefault();
    document.getElementById("fileInput").click();
  };
  const getImage = (e) => {
    let type = e.target.files[0].type;
    let files = e.target.files[0];
    let ext = type.substring(type.indexOf("/") + 1);
    if (type.substring(0, type.indexOf("/")) === "image") {
      //   if (!document.getElementById('ImageMessage').classList.contains("hidden")) {
      //     document.getElementById('ImageMessage').classList.add("hidden");
      //   }
      // } else {
      //   document.getElementById('ImageMessage').classList.remove("hidden");
      //   document.getElementById('ImageMessage').textContent = "الرجاء الانتباه على اختيار صورة فقط";
      //   SetImage(null);
    }
  };
  function close() {
    setNameError("a");
    setPhoneError("a");
    setEmailError("a");
    setAddressError("a");
    setRatioError("a");
    setSrcError("a");
    setGenderError("a");
    setPasswordError("a");
    SetImage();
    setFormData({
      name: "",
      phone: "",
      email: "",
      password: "",
      ratio: "",
      gender: "",
      address: "",
    });
    setOpen(false);
  }
  const GenderChange = (e) => {
    console.log(e.target.id);

    if (e.target.value === "male") {
      SetImage(man);
    }
    if (e.target.value === "female") {
      SetImage(woman);
    }
    setFormData({
      ...formData,
      gender: e.target.value,
    });
    if (e.target.id === "radio-2") {
      document
        .getElementById("radio-2-text")
        .classList.remove("text-[#98A2B3]");
      document
        .getElementById("radio-1-text")
        .classList.remove("text-[#12B76A]");
      ///#9E77ED female
      ///#12B76A male
      ///#98A2B3 gray
      document.getElementById("radio-2-text").classList.add("text-[#9E77ED]");
      document.getElementById("radio-1-text").classList.add("text-[#98A2B3]");

      document
        .getElementById("radio-2-icon")
        .classList.remove("text-[#98A2B3]");
      document
        .getElementById("radio-1-icon")
        .classList.remove("text-[#12B76A]");

      document.getElementById("radio-2-icon").classList.add("text-[#9E77ED]");
      document.getElementById("radio-1-icon").classList.add("text-[#98A2B3]");
    } else if (e.target.id === "radio-1") {
      document
        .getElementById("radio-1-text")
        .classList.remove("text-[#98A2B3]");
      document
        .getElementById("radio-2-text")
        .classList.remove("text-[#9E77ED]");

      document.getElementById("radio-1-text").classList.add("text-[#12B76A]");
      document.getElementById("radio-2-text").classList.add("text-[#98A2B3]");

      document
        .getElementById("radio-1-icon")
        .classList.remove("text-[#98A2B3]");
      document
        .getElementById("radio-2-icon")
        .classList.remove("text-[#9E77ED]");

      document.getElementById("radio-1-icon").classList.add("text-[#12B76A]");
      document.getElementById("radio-2-icon").classList.add("text-[#98A2B3]");
    }
    if (e.target.checked) {
      SetGender(e.target.value);
    }
  };

  const NameClicked = () => {
    document.getElementById("Name").classList.remove("hidden");
    document
      .getElementById("NameContainer")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("NameIcon")
      .classList.remove("text-[#98A2B3]", "opacity-40");

    document.getElementById("NameContainer").classList.remove("bg-[#F9FAFF]");
    document.getElementById("NameContainer").classList.add("border-[#B7C835]");
    document.getElementById("NameContainer").classList.add("bg-white");
    document.getElementById("NameIcon").classList.add("text-[#B7C835]");

    document.getElementById("NameInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("NameInput").classList.add("bg-white");
  };

  const EmailClicked = () => {
    document.getElementById("Email").classList.remove("hidden");
    document
      .getElementById("EmailContainer")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("EmailIcon")
      .classList.remove("text-[#98A2B3]", "opacity-40");

    document.getElementById("EmailContainer").classList.remove("bg-[#F9FAFF]");
    document.getElementById("EmailContainer").classList.add("border-[#B7C835]");
    document.getElementById("EmailContainer").classList.add("bg-white");
    document.getElementById("EmailIcon").classList.add("text-[#B7C835]");

    document.getElementById("EmailInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("EmailInput").classList.add("bg-white");
  };

  const PhoneClicked = () => {
    document.getElementById("Phone").classList.remove("hidden");
    document
      .getElementById("PhoneContainer")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("PhoneIcon")
      .classList.remove("text-[#98A2B3]", "opacity-40");

    document.getElementById("PhoneContainer").classList.remove("bg-[#F9FAFF]");
    document.getElementById("PhoneContainer").classList.add("border-[#B7C835]");
    document.getElementById("PhoneContainer").classList.add("bg-white");
    document.getElementById("PhoneIcon").classList.add("text-[#B7C835]");

    document.getElementById("PhoneInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("PhoneInput").classList.add("bg-white");
  };

  const DoctorAddressClicked = () => {
    document.getElementById("DoctorAddress").classList.remove("hidden");
    document
      .getElementById("DoctorAddressContainer")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("DoctorAddressIcon")
      .classList.remove("text-[#98A2B3]", "opacity-40");

    document
      .getElementById("DoctorAddressContainer")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("DoctorAddressContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("DoctorAddressContainer").classList.add("bg-white");
    document
      .getElementById("DoctorAddressIcon")
      .classList.add("text-[#B7C835]");

    document
      .getElementById("DoctorAddressInput")
      .classList.remove("bg-[#F9FAFF]");
    document.getElementById("DoctorAddressInput").classList.add("bg-white");
  };

  const PasswordClicked = () => {
    document.getElementById("Password").classList.remove("hidden");
    document
      .getElementById("PasswordContainer")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("PasswordIcon")
      .classList.remove("text-[#98A2B3]", "opacity-40");

    document
      .getElementById("PasswordContainer")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("PasswordContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("PasswordContainer").classList.add("bg-white");
    document.getElementById("PasswordIcon").classList.add("text-[#B7C835]");

    document.getElementById("PasswordInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("PasswordInput").classList.add("bg-white");
  };

  const DoctorRatioClicked = () => {
    document.getElementById("DoctorRatio").classList.remove("hidden");
    document
      .getElementById("DoctorRatioContainer")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("DoctorRatioIcon")
      .classList.remove("text-[#98A2B3]", "opacity-40");

    document
      .getElementById("DoctorRatioBorder")
      .classList.remove("border-[#98A2B3]");

    document
      .getElementById("DoctorRatioContainer")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("DoctorRatioContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("DoctorRatioContainer").classList.add("bg-white");
    document.getElementById("DoctorRatioIcon").classList.add("text-[#B7C835]");
    document
      .getElementById("DoctorRatioBorder")
      .classList.add("border-[#B7C835]");

    document
      .getElementById("DoctorRatioInput")
      .classList.remove("bg-[#F9FAFF]");
    document.getElementById("DoctorRatioInput").classList.add("bg-white");
  };
  const handleChangeName = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };
  const handleChangePhone = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setFormData({ ...formData, phone: e.target.value });
    }
  };
  const handleChangeAddress = (e) => {
    setFormData({ ...formData, address: e.target.value });
  };
  const handleChangeEmail = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };
  const handleChangePassword = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };
  const handleChangeRatio = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setFormData({ ...formData, ratio: e.target.value });
    }
  };
  const [ready, setReady] = useState(true);
  const getDoctors = async () => {
    await axios.get(`lab-scope/myDoctors`).then((response) => {
      console.log(response.data, "hi");
      dispatch(addAllDoctor(response.data));
      SetDataBeforeFilter(response.data);
      setDataForFilter(response.data.data);
    });
  };
  const dispatch = useDispatch();
  const Save = async () => {
    setReady(false);
    await axios
      .post(
        "lab-scope/createDoctor",
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          ratio: formData.ratio,
          gender: formData.gender,
          address: formData.address,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setReady(true);

        setNameError("a");
        setPhoneError("a");
        setEmailError("a");
        setAddressError("a");
        setRatioError("a");
        setSrcError("a");
        setGenderError("a");
        setPasswordError("a");
        close();

        setFormData({
          name: "",
          phone: "",
          email: "",
          password: "",
          ratio: "",
          gender: "",
          address: "",
        });
        getDoctors();
      })
      .catch((err) => {
        setReady(true);

        if (err.response.data.errors.name) {
          setNameError(err.response.data.errors.name[0]);
        } else {
          setNameError("a");
        }
        if (err.response.data.errors.phone) {
          setPhoneError(err.response.data.errors.phone[0]);
        } else {
          setPhoneError("a");
        }
        if (err.response.data.errors.email) {
          setEmailError(err.response.data.errors.email[0]);
        } else {
          setEmailError("a");
        }
        if (err.response.data.errors.address) {
          setAddressError(err.response.data.errors.address[0]);
        } else {
          setAddressError("a");
        }
        if (err.response.data.errors.ratio) {
          setRatioError(err.response.data.errors.ratio[0]);
        } else {
          setRatioError("a");
        }
        if (err.response.data.errors.src) {
          setSrcError(err.response.data.errors.src[0]);
        } else {
          setSrcError("a");
        }
        if (err.response.data.errors.gender) {
          setGenderError(err.response.data.errors.gender[0]);
        } else {
          setGenderError("a");
        }
        if (err.response.data.errors.password) {
          setPasswordError(err.response.data.errors.password[0]);
        } else {
          setPasswordError("a");
        }
        console.log(err);
        // setError(err.response.data.errors.address);
      });
  };
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
                        {t("Add doctor")}
                      </p>
                      <IoIosClose
                        className=" text-4xl  text-black border-[1px] rounded-full cursor-pointer bg-[#E4E7EC] "
                        onClick={() => close()}
                      />
                    </div>

                    <div className="w-full m-auto mt-10">
                      <div
                        className={`  justify-center w-40 h-40 border-dashed border-2 flex items-center flex-col  m-auto rounded-full  py-12 px-5 bg-cover bg-no-repeat bg-center`}
                      >
                        <img src={Image} />
                      </div>
                      <span
                        className={`${
                          srcError === "a" ? "invisible" : ""
                        } w-full text-center flex justify-center text-sm text-red-600`}
                      >
                        {srcError}
                      </span>
                      <div className="flex flex-col space-y-4 h-full mt-10">
                        <div className="w-full">
                          <div
                            id="NameContainer"
                            className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                            onClick={() => NameClicked()}
                          >
                            <BsPersonCircle
                              id="NameIcon"
                              className="w-6 h-6 opacity-40 text-[#98A2B3]"
                            />
                            <input
                              placeholder={t("Doctor name")}
                              value={formData.name}
                              onChange={handleChangeName}
                              name="name"
                              id="NameInput"
                              type="text"
                              className=" w-full bg-[#F9FAFF]  font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                            />
                            <p
                              id="Name"
                              className="hidden font-Poppins-Medium text-xs absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Doctor name")}
                            </p>
                          </div>
                          <span
                            className={`${
                              nameError === "a" ? "invisible" : ""
                            } text-sm text-red-600`}
                          >
                            {nameError}
                          </span>
                        </div>
                        <div className="w-full">
                          <div
                            id="EmailContainer"
                            className="bg-[#F9FAFF] border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                            onClick={() => EmailClicked()}
                          >
                            <MdOutlineMail
                              id="EmailIcon"
                              className="w-6 h-6 opacity-40 text-[#98A2B3]"
                            />
                            <input
                              name="Email"
                              value={formData.email}
                              onChange={handleChangeEmail}
                              id="EmailInput"
                              placeholder={t("Email")}
                              type="email"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                            />
                            <p
                              id="Email"
                              className="hidden font-Poppins-Regular text-xs absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Email")}
                            </p>
                          </div>
                          <span
                            className={`${
                              emailError === "a" ? "invisible" : ""
                            } text-sm text-red-600`}
                          >
                            {emailError}
                          </span>
                        </div>
                        <div className="w-full">
                          <div
                            id="PhoneContainer"
                            className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                            onClick={() => PhoneClicked()}
                          >
                            <HiOutlineDevicePhoneMobile
                              id="PhoneIcon"
                              className="w-6 h-6 opacity-40 text-[#98A2B3]"
                            />
                            <input
                              value={formData.phone}
                              onChange={handleChangePhone}
                              id="PhoneIcon"
                              name="PhoneNumber"
                              placeholder={t("Phone number")}
                              type="tel"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                            />
                            <p
                              id="Phone"
                              className="hidden font-Poppins-Medium text-xs absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Phone number")}
                            </p>
                          </div>
                          <span
                            className={`${
                              phoneError === "a" ? "invisible" : ""
                            } text-sm text-red-600`}
                          >
                            {phoneError}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs col-start-1 col-end-3 border-[#E4E7EC] w-full h-fit bg-white flex space-x-2 items-center py-2 px-4    relative m-auto border-[1px] rounded-xl ">
                            <p className="font-Poppins-Medium text-xs absolute top-[-0.6rem] bg-white left-[0.9rem]  px-1 text-[#98A2B3] font-medium">
                              {t("Gender")}
                            </p>
                            <div className="justify-center items-center w-full flex">
                              <div class="flex p-2 space-x-8 rounded  ">
                                <div class="flex items-center ml-2 text-sm">
                                  <label
                                    for="radio-1"
                                    id="radio-1-text"
                                    class="font-medium text-[#98A2B3]  cursor-pointer"
                                  >
                                    <div className="flex items-center text-xs space-x-2">
                                      <IoIosMale
                                        id="radio-1-icon"
                                        className="w-[15.38px] h-[15.38px] text-[#98A2B3]"
                                      />
                                      <p>{t("Male")}</p>
                                    </div>
                                  </label>
                                </div>
                                <div class="flex items-center h-5">
                                  <input
                                    id="radio-1"
                                    name="radio"
                                    type="radio"
                                    value="male"
                                    class="w-[16.2px] h-[16.2px] cursor-pointer appearance-none border-[1px] border-gray-400 bg-clip-content p-[2px]  rounded-[50%]  checked:bg-[#12B76A] checked:border-[#12B76A]"
                                    onClick={(e) => GenderChange(e)}
                                  />
                                </div>
                              </div>

                              <div class="flex p-2 space-x-8 rounded  ">
                                <div class="ml-2 flex items-center text-sm">
                                  <label
                                    for="radio-2"
                                    id="radio-2-text"
                                    class="font-medium text-[#98A2B3] cursor-pointer"
                                  >
                                    <div className="flex items-center text-xs space-x-2">
                                      <IoFemaleSharp
                                        id="radio-2-icon"
                                        className="w-[15.38px] h-[15.38px] text-[#98A2B3]"
                                      />
                                      <p>{t("Female")}</p>
                                    </div>
                                  </label>
                                </div>
                                <div class="flex items-center  border-gray-500 h-5">
                                  <input
                                    id="radio-2"
                                    name="radio"
                                    type="radio"
                                    value="female"
                                    class="w-4 h-4 cursor-pointer  appearance-none border-[1px] border-gray-400 bg-clip-content p-[2px]  rounded-[50%]  checked:bg-[#9E77ED] checked:border-[#9E77ED] "
                                    onClick={(e) => GenderChange(e)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <span
                            className={`${
                              genderError === "a" ? "invisible" : ""
                            } text-sm text-red-600`}
                          >
                            {genderError}
                          </span>
                        </div>
                        <div className="w-full">
                          <div
                            id="DoctorAddressContainer"
                            className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                            onClick={() => DoctorAddressClicked()}
                          >
                            <CiLocationOn
                              id="DoctorAddressIcon"
                              className="w-6 h-6 text-[#98A2B3]"
                            />
                            <input
                              value={formData.address}
                              onChange={handleChangeAddress}
                              id="DoctorAddressInput"
                              name="DoctorAddress"
                              placeholder={t("Doctor address")}
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                            />
                            <p
                              id="DoctorAddress"
                              className="hidden font-Poppins-Medium text-xs absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Doctor Address")}
                            </p>
                          </div>
                          <span
                            className={`${
                              addressError === "a" ? "invisible" : ""
                            } text-sm text-red-600`}
                          >
                            {addressError}
                          </span>
                        </div>
                        <div className="w-full">
                          <div
                            id="DoctorRatioContainer"
                            className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                            onClick={() => DoctorRatioClicked()}
                          >
                            <div
                              id="DoctorRatioBorder"
                              className="w-6 h-6 border-[1px] rounded-lg border-[#98A2B3] p-[0.10rem] flex items-center mr-1"
                            >
                              <BsPercent
                                id="DoctorRatioIcon"
                                className=" text-[#98A2B3]  opacity-40"
                              />
                            </div>
                            <input
                              value={formData.ratio}
                              onChange={handleChangeRatio}
                              id="DoctorRatioInput"
                              name="DoctorRatio"
                              placeholder={t("Doctor ratio")}
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                            />
                            <p
                              id="DoctorRatio"
                              className="hidden font-Poppins-Medium text-xs absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Doctor's Ratio")}
                            </p>
                          </div>
                          <span
                            className={`${
                              ratioError === "a" ? "invisible" : ""
                            } text-sm text-red-600`}
                          >
                            {ratioError}
                          </span>
                        </div>
                        <div className="w-full">
                          <div
                            id="PasswordContainer"
                            className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                            onClick={() => PasswordClicked()}
                          >
                            <FiLock
                              id="PasswordIcon"
                              className=" text-[#98A2B3] opacity-40 w-6 h-6 mr-2"
                            />
                            <input
                              value={formData.password}
                              onChange={handleChangePassword}
                              id="PasswordInput"
                              name="Password"
                              placeholder={t("Password")}
                              type="password"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                            />
                            <p
                              id="Password"
                              className="hidden font-Poppins-Medium text-xs absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Password")}
                            </p>
                          </div>
                          <span
                            className={`${
                              passwordError === "a" ? "invisible" : ""
                            } text-sm text-red-600`}
                          >
                            {passwordError}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white  py-3  flex sm:flex-row-reverse justify-between mt-10">
                    <button
                      onClick={Save}
                      type="button"
                      disabled={!ready}
                      className={`text-sm font-Poppins-Medium flex flex-grow py-4 ${
                        ready ? "bg-[#B7C835]" : "bg-gray-600"
                      }  justify-center rounded-xl text-white`}
                    >
                      {t("Add doctor")}
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

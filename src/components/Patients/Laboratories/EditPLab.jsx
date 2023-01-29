/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosClose } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import { t } from "i18next";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AnalysisIDContainer from "../AddPatient/AnalysisIDContainer";
import AnalysisContainer from "../AddPatient/AnalysisContainer";

export default function EditPLab({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [AnalysisType, setAnalysisType] = useState(t("Analysis type"));

  const [VisitDate, setVisitDate] = useState(new Date());
  const [ReceiveDate, setReceiveDate] = useState(new Date());

  const [SendMethod, setSendMethod] = useState("Send method");
  const [CheckMulit, setCheckMulit] = useState([]);
  const [CheckMulitChild, setCheckMulitChild] = useState([]);

  const [Urgency, setUrgency] = useState("");

  const VisitInput = React.forwardRef((props, ref) => {
    return (
      <div
        onClick={props.onClick}
        className=" p-2  justify-between   outline-0  border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-[0.80rem] px-4  relative  border-[1px] rounded-xl "
      >
        <label className="text-[#98A2B3] text-xs mr-10 font-Poppins-Regular">
          Date of Visit
        </label>
        <div className=" flex items-center">
          <label
            onClick={props.onClick}
            ref={ref}
            className="text-black  text-xs font-Poppins-Medium"
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

  const ReceiveInput = React.forwardRef((props, ref) => {
    return (
      <div
        onClick={props.onClick}
        className=" p-2  justify-between   outline-0  border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-[0.80rem] px-4   relative  border-[1px] rounded-xl "
      >
        <label className="text-[#98A2B3] text-xs mr-10 font-Poppins-Regular">
          Receive of data
        </label>
        <div className=" flex items-center">
          <label
            onClick={props.onClick}
            ref={ref}
            className="text-black font-Poppins-Medium text-xs"
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

  const RadioList = () => {
    if (
      document
        .getElementById("dropdownDefaultRadio")
        .classList.contains("hidden")
    ) {
      document
        .getElementById("dropdownDefaultRadio")
        .classList.remove("hidden");
      document.getElementById("dropdownDefaultRadio").classList.add("absolute");
    } else if (
      !document
        .getElementById("dropdownDefaultRadio")
        .classList.contains("hidden")
    ) {
      document.getElementById("dropdownDefaultRadio").classList.add("hidden");
      document
        .getElementById("dropdownDefaultRadio")
        .classList.remove("absolute");
    }

    document.getElementById("SendMethod").classList.remove("hidden");
    document
      .getElementById("dropdownRadioHelperButton")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("dropdownRadioHelperButton")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("dropdownRadioHelperButton")
      .classList.add("border-[#B7C835]");
    document
      .getElementById("dropdownRadioHelperButton")
      .classList.add("bg-white");
    document
      .getElementById("dropdownRadioHelperButton")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("dropdownRadioHelperButton")
      .classList.add("bg-white");
  };

  const MethodSend = (e) => {
    if (e.target.checked) {
      setSendMethod(e.target.value);
    }
  };
  function close() {
    setOpen(false);
  }

  const UrgencyChange = (e) => {
    if (e.target.checked) {
      setUrgency(e.target.value);
    }
  };
  const AnalysisTypeFun = (e) => {
    if (e.target.checked) {
      setAnalysisType(e.target.value);
    }
  };
  const RadioAnalysisType = () => {
    if (
      !document
        .getElementById("dropdownDefaultCheckBoxChild")
        .classList.contains("hidden")
    ) {
      document
        .getElementById("dropdownDefaultCheckBoxChild")
        .classList.add("hidden");
    }
    if (
      document
        .getElementById("dropdownDefaultRadioAnalysis")
        .classList.contains("hidden")
    ) {
      document
        .getElementById("dropdownDefaultRadioAnalysis")
        .classList.remove("hidden");
      document
        .getElementById("dropdownDefaultRadioAnalysis")
        .classList.add("absolute");
    } else if (
      !document
        .getElementById("dropdownDefaultRadioAnalysis")
        .classList.contains("hidden")
    ) {
      document
        .getElementById("dropdownDefaultRadioAnalysis")
        .classList.add("hidden");
      document
        .getElementById("dropdownDefaultRadioAnalysis")
        .classList.remove("absolute");
    }

    document.getElementById("AnalysisType").classList.remove("hidden");
    document
      .getElementById("dropdownRadioHelperButtonAnalysis")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("dropdownRadioHelperButtonAnalysis")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("dropdownRadioHelperButtonAnalysis")
      .classList.add("border-[#B7C835]");
    document
      .getElementById("dropdownRadioHelperButtonAnalysis")
      .classList.add("bg-white");
    document
      .getElementById("dropdownRadioHelperButtonAnalysis")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("dropdownRadioHelperButtonAnalysis")
      .classList.add("bg-white");
  };

  const CheckBoxListChild = () => {
    if (
      document
        .getElementById("dropdownDefaultCheckBoxChild")
        .classList.contains("hidden")
    ) {
      document
        .getElementById("dropdownDefaultCheckBoxChild")
        .classList.remove("hidden");
      document
        .getElementById("dropdownDefaultCheckBoxChild")
        .classList.add("absolute");
    } else if (
      !document
        .getElementById("dropdownDefaultCheckBoxChild")
        .classList.contains("hidden")
    ) {
      document
        .getElementById("dropdownDefaultCheckBoxChild")
        .classList.add("hidden");
      document
        .getElementById("dropdownDefaultCheckBoxChild")
        .classList.remove("absolute");
    }

    document.getElementById("AnalysisTypeChild").classList.remove("hidden");
    document
      .getElementById("dropdownCheckBoxHelperChildButton")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("dropdownCheckBoxHelperChildButton")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("dropdownCheckBoxHelperChildButton")
      .classList.add("border-[#B7C835]");
    document
      .getElementById("dropdownCheckBoxHelperChildButton")
      .classList.add("bg-white");
    document
      .getElementById("dropdownCheckBoxHelperChildButton")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("dropdownCheckBoxHelperChildButton")
      .classList.add("bg-white");
  };

  const MultiCheckChild = (e) => {
    if (e.target.checked) {
      setCheckMulitChild((oldArray) => [...oldArray, e.target.value]);
    } else if (!e.target.checked) {
      for (let i = 0; i < CheckMulitChild.length; i++) {
        if (CheckMulitChild[i] === e.target.value) {
          CheckMulitChild.splice(i, 1);
          let arr = [...CheckMulitChild];
          setCheckMulitChild(arr);
        }
      }
    }

    console.log(CheckMulit);
  };

  const MultiCheck = (e) => {
    if (e.target.checked) {
      setCheckMulit((oldArray) => [...oldArray, e.target.value]);
    } else if (!e.target.checked) {
      for (let i = 0; i < CheckMulit.length; i++) {
        if (CheckMulit[i] === e.target.value) {
          CheckMulit.splice(i, 1);
          let arr = [...CheckMulit];
          setCheckMulit(arr);
        }
      }
    }

    console.log(CheckMulit);
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

  const AgeClicked = () => {
    document.getElementById("Age").classList.remove("hidden");
    document
      .getElementById("AgeContainer")
      .classList.remove("border-[#E4E7EC]");
    document.getElementById("AgeContainer").classList.remove("bg-[#F9FAFF]");
    document.getElementById("AgeContainer").classList.add("border-[#B7C835]");
    document.getElementById("AgeContainer").classList.add("bg-white");
    document.getElementById("AgeInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("AgeInput").classList.add("bg-white");
  };

  const PriceClicked = () => {
    document.getElementById("Price").classList.remove("hidden");
    document
      .getElementById("PriceContainer")
      .classList.remove("border-[#E4E7EC]");
    document.getElementById("PriceContainer").classList.remove("bg-[#F9FAFF]");
    document.getElementById("PriceContainer").classList.add("border-[#B7C835]");
    document.getElementById("PriceContainer").classList.add("bg-white");
    document.getElementById("PriceInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("PriceInput").classList.add("bg-white");
  };

  const RatioPriceClicked = () => {
    document.getElementById("RatioPrice").classList.remove("hidden");
    document
      .getElementById("RatioPriceContainer")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("RatioPriceContainer")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("RatioPriceContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("RatioPriceContainer").classList.add("bg-white");
    document.getElementById("RatioPriceInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("RatioPriceInput").classList.add("bg-white");
  };

  const PatientAddressClicked = () => {
    document.getElementById("PatientAddress").classList.remove("hidden");
    document
      .getElementById("PatientAddressContainer")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("PatientAddressContainer")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("PatientAddressContainer")
      .classList.add("border-[#B7C835]");
    document
      .getElementById("PatientAddressContainer")
      .classList.add("bg-white");
    document
      .getElementById("PatientAddressInput")
      .classList.remove("bg-[#F9FAFF]");
    document.getElementById("PatientAddressInput").classList.add("bg-white");
  };

  const LapIdClicked = () => {
    document.getElementById("LapId").classList.remove("hidden");
    document
      .getElementById("LapIdContainer")
      .classList.remove("border-[#E4E7EC]");
    document.getElementById("LapIdContainer").classList.remove("bg-[#F9FAFF]");
    document.getElementById("LapIdContainer").classList.add("border-[#B7C835]");
    document.getElementById("LapIdContainer").classList.add("bg-white");
    document.getElementById("LapIdInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("LapIdInput").classList.add("bg-white");
  };

  const CompanyIDClicked = () => {
    document.getElementById("CompanyID").classList.remove("hidden");
    document
      .getElementById("CompanyIDContainer")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("CompanyIDContainer")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("CompanyIDContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("CompanyIDContainer").classList.add("bg-white");
    document.getElementById("CompanyIDInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("CompanyIDInput").classList.add("bg-white");
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

  const AnalysisPriceClicked = () => {
    document.getElementById("AnalysisPrice").classList.remove("hidden");
    document
      .getElementById("AnalysisPriceContainer")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("AnalysisPriceContainer")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("AnalysisPriceContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("AnalysisPriceContainer").classList.add("bg-white");
    document
      .getElementById("AnalysisPriceInput")
      .classList.remove("bg-[#F9FAFF]");
    document.getElementById("AnalysisPriceInput").classList.add("bg-white");
  };

  const PaidUpClicked = () => {
    document.getElementById("PaidUp").classList.remove("hidden");
    document
      .getElementById("PaidUpContainer")
      .classList.remove("border-[#E4E7EC]");
    document.getElementById("PaidUpContainer").classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("PaidUpContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("PaidUpContainer").classList.add("bg-white");
    document.getElementById("PaidUpInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("PaidUpInput").classList.add("bg-white");
  };

  const DueClicked = () => {
    document.getElementById("Due").classList.remove("hidden");
    document
      .getElementById("DueContainer")
      .classList.remove("border-[#E4E7EC]");
    document.getElementById("DueContainer").classList.remove("bg-[#F9FAFF]");
    document.getElementById("DueContainer").classList.add("border-[#B7C835]");
    document.getElementById("DueContainer").classList.add("bg-white");
    document.getElementById("DueInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("DueInput").classList.add("bg-white");
  };

  const DiscountClicked = () => {
    document.getElementById("Discount").classList.remove("hidden");
    document
      .getElementById("DiscountContainer")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("DiscountContainer")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("DiscountContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("DiscountContainer").classList.add("bg-white");
    document.getElementById("DiscountInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("DiscountInput").classList.add("bg-white");
  };

  const GenderChanged = () => {
    document.getElementById("Gender").classList.remove("hidden");
    document
      .getElementById("GenderContainer")
      .classList.remove("border-[#E4E7EC]");
    document.getElementById("GenderContainer").classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("GenderContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("GenderContainer").classList.add("bg-white");
    document.getElementById("GenderInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("GenderInput").classList.add("bg-white");
  };

  const DoctorChanged = () => {
    document.getElementById("Doctor").classList.remove("hidden");
    document
      .getElementById("DoctorContainer")
      .classList.remove("border-[#E4E7EC]");
    document.getElementById("DoctorContainer").classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("DoctorContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("DoctorContainer").classList.add("bg-white");
    document.getElementById("DoctorInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("DoctorInput").classList.add("bg-white");
  };

  const SentLabChanged = () => {
    document.getElementById("SentLab").classList.remove("hidden");
    document
      .getElementById("SentLabContainer")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("SentLabContainer")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("SentLabContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("SentLabContainer").classList.add("bg-white");
    document.getElementById("SentLabInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("SentLabInput").classList.add("bg-white");
  };

  const CompanyChanged = () => {
    document.getElementById("Company").classList.remove("hidden");
    document
      .getElementById("CompanyContainer")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("CompanyContainer")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("CompanyContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("CompanyContainer").classList.add("bg-white");
    document.getElementById("CompanyInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("CompanyInput").classList.add("bg-white");
  };

  const PaymentTypeChanged = () => {
    document.getElementById("PaymentType").classList.remove("hidden");
    document
      .getElementById("PaymentTypeContainer")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("PaymentTypeContainer")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("PaymentTypeContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("PaymentTypeContainer").classList.add("bg-white");
    document
      .getElementById("PaymentTypeInput")
      .classList.remove("bg-[#F9FAFF]");
    document.getElementById("PaymentTypeInput").classList.add("bg-white");
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
                <Dialog.Panel className="relative px-10 pb-8 bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-2 sm:max-w-3xl sm:w-full ">
                  <div className="bg-white ">
                    <div className="w-full flex  h-full items-center mt-5">
                      <p className=" font-semibold justify-center flex flex-grow text-lg ml-10">
                        {t("Edit patient")}
                      </p>
                      <IoIosClose
                        className=" text-4xl  text-black border-[1px] rounded-full cursor-pointer bg-[#E4E7EC] "
                        onClick={() => close()}
                      />
                    </div>

                    <div className="w-full m-auto mt-10 ">
                      <div className="w-full  h-full mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div
                          id="NameContainer"
                          className="text-xs border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                          onClick={() => NameClicked()}
                        >
                          <input
                            name="name"
                            id="NameInput"
                            placeholder={t("Patient name")}
                            type="text"
                            className=" w-full  font-Poppins-Medium placeholder:text-[#98A2B3] bg-[#F9FAFF] outline-0 ring-0"
                          />
                          <p
                            id="Name"
                            className="hidden font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                          >
                            {t("Patient name")}
                          </p>
                        </div>
                        <div>
                          <ReactDatePicker
                            id="date"
                            dateFormat="yyyy/MM/dd"
                            className=" "
                            customInput={<VisitInput />}
                            selected={VisitDate}
                            onChange={(date) => setVisitDate(date)}
                          />
                        </div>
                        <div
                          id="EmailContainer"
                          className="bg-[#F9FAFF] border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                          onClick={() => EmailClicked()}
                        >
                          <input
                            name="Email"
                            id="EmailInput"
                            placeholder={t("Email")}
                            type="email"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder-[#98A2B3] outline-0 ring-0"
                          />
                          <p
                            id="Email"
                            className="hidden text-xs font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                          >
                            {t("Email")}
                          </p>
                        </div>

                        <div
                          id="PhoneContainer"
                          className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                          onClick={() => PhoneClicked()}
                        >
                          <input
                            name="Phone"
                            id="PhoneInput"
                            placeholder={t("Phone number")}
                            type="tel"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                          />
                          <p
                            id="Phone"
                            className="hidden text-xs font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                          >
                            {t("Phone number")}
                          </p>
                        </div>
                        <div className="w-full">
                          <ReactDatePicker
                            id="date"
                            dateFormat="yyyy/MM/dd"
                            className=" "
                            customInput={<ReceiveInput />}
                            selected={ReceiveDate}
                            onChange={(date) => setReceiveDate(date)}
                          />
                        </div>
                        <div
                          id="AgeContainer"
                          className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                          onClick={() => AgeClicked()}
                        >
                          <input
                            name="Age"
                            id="AgeInput"
                            placeholder={t("Age")}
                            type="text"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                          />
                          <p
                            id="Age"
                            className="hidden text-xs font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                          >
                            {t("Age")}
                          </p>
                        </div>

                        <div
                          id="GenderContainer"
                          className="w-full pr-2 bg-[#F9FAFF] rounded-lg flex border-[1px] border-[#E4E7EC]  items-center mr-5"
                        >
                          <select
                            id="GenderInput"
                            name="Gender"
                            className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Medium  text-[#98A2B3] text-xs  outline-none px-4 py-2 cursor-pointer"
                            onChange={() => GenderChanged()}
                          >
                            <option
                              value=""
                              selected
                              disabled
                              hidden
                              className=""
                            >
                              {t("Gender")}
                            </option>
                          </select>
                          <p
                            id="Gender"
                            className="hidden text-xs font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                          >
                            {t("Gender")}
                          </p>
                        </div>

                        <div className="flex space-y-5 lg:space-y-0 flex-col lg:flex-row w-full">
                          <div
                            id="DoctorContainer"
                            className="w-full lg:w-[40%] pr-2 bg-[#F9FAFF] rounded-lg flex border-[1px] border-[#E4E7EC]  items-center mr-5"
                            onChange={() => DoctorChanged()}
                          >
                            <select
                              id="DoctorInput"
                              name="Doctor"
                              className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Medium  text-[#98A2B3] text-xs  outline-none px-4 py-2 cursor-pointer"
                            >
                              <option
                                value=""
                                selected
                                disabled
                                hidden
                                className=""
                              >
                                {t("Doctor")}
                              </option>
                            </select>
                            <p
                              id="Doctor"
                              className="hidden text-xs font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Doctor")}
                            </p>
                          </div>
                          <div className="space-x-1 flex w-full lg:w-[60%]">
                            <div
                              id="PriceContainer"
                              className="w-[60%] border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                              onClick={() => PriceClicked()}
                            >
                              <input
                                id="PriceInput"
                                name="Price"
                                placeholder={t("Price")}
                                type="text"
                                className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                              />
                              <p
                                id="Price"
                                className="hidden text-xs font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                              >
                                {t("Price")}
                              </p>
                            </div>
                            <div
                              id="RatioPriceContainer"
                              className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                              onClick={() => RatioPriceClicked()}
                            >
                              <input
                                id="RatioPriceInput"
                                name="RatioPrice"
                                placeholder={t("Ratio price")}
                                type="text"
                                className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                              />
                              <p
                                id="RatioPrice"
                                className="hidden text-xs font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                              >
                                {t("Ratio price")}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div
                          id="PatientAddressContainer"
                          className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                          onClick={() => PatientAddressClicked()}
                        >
                          <input
                            name="PatientAddress"
                            id="PatientAddressInput"
                            placeholder={t("Patient address")}
                            type="text"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                          />
                          <p
                            id="PatientAddress"
                            className="hidden text-xs font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                          >
                            {t("Patient address")}
                          </p>
                        </div>
                        <div className="flex  w-full">
                          <div
                            id="SentLabContainer"
                            className="w-3/4 pr-2 bg-[#F9FAFF] rounded-lg flex border-[1px] border-[#E4E7EC]  items-center mr-5"
                            onChange={() => SentLabChanged()}
                          >
                            <select
                              name="SentLab"
                              id="SentLabInput"
                              className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Medium  text-[#98A2B3] text-xs  outline-none px-4 py-2 cursor-pointer"
                            >
                              <option
                                value=""
                                selected
                                disabled
                                hidden
                                className=""
                              >
                                {t("Sent lab")}
                              </option>
                            </select>
                            <p
                              id="SentLab"
                              className="hidden text-xs font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Sent lab")}
                            </p>
                          </div>

                          <div
                            id="LapIdContainer"
                            className="w-1/4 break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                            onClick={() => LapIdClicked()}
                          >
                            <input
                              id="LapIdInput"
                              name="LapId"
                              placeholder="0 ID"
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                            />
                            <p
                              id="LapId"
                              className="hidden text-xs font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Lap id")}
                            </p>
                          </div>
                        </div>

                        <div className="flex  w-full">
                          <div
                            id="CompanyContainer"
                            className="w-3/4 pr-2 bg-[#F9FAFF] rounded-lg flex border-[1px] border-[#E4E7EC]  items-center mr-5"
                          >
                            <select
                              id="CompanyInput"
                              name="Company"
                              className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Medium  text-[#98A2B3] text-xs  outline-none px-4 py-2 cursor-pointer"
                              onChange={() => CompanyChanged()}
                            >
                              <option
                                value=""
                                selected
                                disabled
                                hidden
                                className=""
                              >
                                {t("Company")}
                              </option>
                            </select>
                            <p
                              id="Company"
                              className="hidden text-xs font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Company")}
                            </p>
                          </div>

                          <div
                            id="CompanyIDContainer"
                            className="w-1/4 border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                            onClick={() => CompanyIDClicked()}
                          >
                            <input
                              id="CompanyIDInput"
                              name="ID_Company"
                              placeholder="0 ID"
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                            />
                            <p
                              id="CompanyID"
                              className="hidden text-[0.50rem] font-Poppins-Medium absolute top-[-0.8rem] bg-white left-0  px-1 text-[#B7C835] font-medium"
                            >
                              {t("CompanyID")}
                            </p>
                          </div>
                        </div>
                        <div className="w-full">
                          <button
                            id="dropdownRadioHelperButton"
                            data-dropdown-toggle="dropdownRadioHelper"
                            class="font-Poppins-Medium w-full justify-between text-xs text-[#98A2B3] border-[#E4E7EC]  h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl"
                            onClick={() => RadioList()}
                            type="button"
                          >
                            {SendMethod}
                            <svg
                              class="ml-2 w-4 h-4"
                              aria-hidden="true"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                              ></path>
                            </svg>
                            <p
                              id="SendMethod"
                              className="hidden text-xs font-Poppins-Regular absolute top-[-0.8rem] bg-white left-0  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Send method")}
                            </p>
                          </button>
                          <div
                            id="dropdownDefaultRadio"
                            class="hidden border-[#B7C835] border-[1px] rounded-b-xl border-t-0 z-10 w-[80%] sm:w-[42%] md:w-[89%] lg:w-[43%] bg-white rounded divide-y divide-gray-100 shadow "
                          >
                            <ul
                              class="p-3 space-y-1 text-sm text-gray-700 "
                              aria-labelledby="dropdownRadioHelperButton"
                            >
                              <li>
                                <div class="flex border-b-[1px] items-center border-[#F2F4F7] p-2 rounded  justify-between ">
                                  <div class="flex flex-row-reverse justify-between w-full items-center h-5">
                                    <input
                                      id="helper-radio-4"
                                      name="helper-radio"
                                      type="radio"
                                      value="Lorem1"
                                      class="w-[16.2px] peer h-[16.2px] cursor-pointer appearance-none border-[1px] checked:text-black border-gray-400 bg-clip-content p-[2px]  rounded-[50%]  checked:bg-[#B7C835] checked:border-[#B7C835]"
                                      onClick={(e) => MethodSend(e)}
                                    />
                                    <label
                                      for="helper-radio-4"
                                      class="font-medium ml-2 text-xs  peer-checked:text-black  font-Poppins-Regular text-[#98A2B3]"
                                    >
                                      <div>Lorem1</div>
                                    </label>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="flex border-b-[1px] p-2 items-center border-[#F2F4F7] rounded justify-between ">
                                  <div class="flex flex-row-reverse justify-between w-full items-center h-5">
                                    <input
                                      id="helper-radio-5"
                                      name="helper-radio"
                                      type="radio"
                                      value="Lorem2"
                                      class="w-[16.2px] h-[16.2px] peer cursor-pointer appearance-none border-[1px] border-gray-400 bg-clip-content p-[2px]  rounded-[50%]  checked:bg-[#B7C835] checked:border-[#B7C835]"
                                      onClick={(e) => MethodSend(e)}
                                    />
                                    <label
                                      for="helper-radio-5"
                                      class="ml-2 text-xs peer-checked:text-black font-medium font-Poppins-Regular text-[#98A2B3]"
                                    >
                                      <div>Lorem2</div>
                                    </label>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="flex border-b-[1px] items-center border-[#F2F4F7] p-2 rounded justify-between ">
                                  <div class="flex flex-row-reverse justify-between w-full items-center h-5">
                                    <input
                                      id="helper-radio-6"
                                      name="helper-radio"
                                      type="radio"
                                      value="Lorem3"
                                      class="w-[16.2px] h-[16.2px] peer cursor-pointer appearance-none border-[1px] border-gray-400 bg-clip-content p-[2px]  rounded-[50%]  checked:bg-[#B7C835] checked:border-[#B7C835]"
                                      onClick={(e) => MethodSend(e)}
                                    />
                                    <label
                                      for="helper-radio-6"
                                      class=" ml-2 text-xs peer-checked:text-black font-medium font-Poppins-Regular text-[#98A2B3]"
                                    >
                                      <div>Lorem3</div>
                                    </label>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="mt-2 lg:mt-0 text-xs lg:col-start-1 lg:col-end-3 border-[#E4E7EC] w-full h-fit bg-white flex space-x-2 items-center py-2 px-4    relative m-auto border-[1px] rounded-xl ">
                          <p className="font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#98A2B3] font-medium">
                            {t("Urgency")}
                          </p>
                          <div className="justify-center items-center w-full flex">
                            <div class="flex p-2   ">
                              <div class="flex space-x-2 items-center   flex-row-reverse  w-full  h-5">
                                <input
                                  id="radio-1"
                                  name="radio"
                                  type="radio"
                                  value="Emergency"
                                  class="w-[16.2px] h-[16.2px] peer cursor-pointer appearance-none border-[1px] border-gray-400 bg-clip-content p-[2px]  rounded-[50%]  checked:bg-[#B7C835] checked:border-[#B7C835]"
                                  onClick={(e) => UrgencyChange(e)}
                                />
                                <label
                                  for="radio-1"
                                  class="font-medium pr-5 peer-checked:text-black text-xs text-[#98A2B3] font-Poppins-Medium"
                                >
                                  <div>{t("Emergency")}</div>
                                </label>
                              </div>
                            </div>

                            <div class="flex p-2  ">
                              <div class="flex space-x-2  cursor-pointer  flex-row-reverse  w-full items-center h-5">
                                <input
                                  id="radio-2"
                                  name="radio"
                                  type="radio"
                                  value="Non emergency"
                                  class="w-[16.2px] h-[16.2px] peer appearance-none cursor-pointer border-[1px] border-gray-400 bg-clip-content p-[2px]  rounded-[50%]  checked:bg-[#B7C835] checked:border-[#B7C835]"
                                  onClick={(e) => UrgencyChange(e)}
                                />
                                <label
                                  for="radio-2"
                                  class="font-medium pr-5 peer-checked:text-black text-xs text-[#98A2B3] font-Poppins-Medium"
                                >
                                  <div>{t("Non emergency")}</div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="w-full relative lg:col-start-1 lg:col-end-3"
                          onClick={() => NotesClicked()}
                        >
                          <textarea
                            id="NotesInput"
                            className=" bg-[#F9FAFF] placeholder:text-[#98A2B3] font-Poppins-Medium border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-3 px-4 outline-0 ring-0   relative m-auto border-[1px] rounded-xl text-xs "
                            rows={4}
                            placeholder={t("Notes")}
                          />
                          <p
                            id="Notes"
                            className="hidden text-xs font-Poppins-Regular absolute top-[-0.5rem] bg-white left-[0.4rem]  px-1 text-[#B7C835] font-medium"
                          >
                            {t("Notes")}
                          </p>
                        </div>
                        <div className="w-full col-start-1 col-end-3">
                          <button
                            id="dropdownRadioHelperButtonAnalyiss"
                            data-dropdown-toggle="dropdownRadioHelperAnalyiss"
                            class="font-Poppins-Medium w-full justify-between text-xs text-[#98A2B3] border-[#E4E7EC]  h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl"
                            onClick={() => RadioAnalysisType()}
                            type="button"
                          >
                            {AnalysisType}
                            <svg
                              class="ml-2 w-4 h-4"
                              aria-hidden="true"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                              ></path>
                            </svg>
                            <p
                              id="AnalysisType"
                              className="hidden text-xs font-Poppins-Regular absolute top-[-0.8rem] bg-white left-0  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Analysis type")}
                            </p>
                          </button>
                          <div
                            id="dropdownDefaultRadioAnalysis"
                            class="hidden border-[#B7C835] border-[1px] rounded-b-xl border-t-0 z-10 w-[81%] sm:w-[86%] md:w-[89%] bg-white rounded divide-y divide-gray-100 shadow "
                          >
                            <ul
                              class="p-3 space-y-1 text-sm text-gray-700 "
                              aria-labelledby="dropdownRadioHelperButtonAnalysis"
                            >
                              <li>
                                <div class="flex border-b-[1px] items-center border-[#F2F4F7] p-2 rounded  justify-between ">
                                  <div class="flex flex-row-reverse justify-between w-full items-center h-5">
                                    <input
                                      id="helper-radio-4"
                                      name="helper-radio-Analysis"
                                      type="radio"
                                      value="Lorem1"
                                      class="w-[16.2px] peer h-[16.2px] cursor-pointer appearance-none border-[1px] checked:text-black border-gray-400 bg-clip-content p-[2px]  rounded-[50%]  checked:bg-[#B7C835] checked:border-[#B7C835]"
                                      onClick={(e) => AnalysisTypeFun(e)}
                                    />
                                    <label
                                      for="helper-radio-4"
                                      class="font-medium ml-2 text-xs  peer-checked:text-black  font-Poppins-Regular text-[#98A2B3]"
                                    >
                                      <div>Lorem1</div>
                                    </label>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="flex border-b-[1px] p-2 items-center border-[#F2F4F7] rounded justify-between ">
                                  <div class="flex flex-row-reverse justify-between w-full items-center h-5">
                                    <input
                                      id="helper-radio-5"
                                      name="helper-radio-Analysis"
                                      type="radio"
                                      value="Lorem2"
                                      class="w-[16.2px] h-[16.2px] peer cursor-pointer appearance-none border-[1px] border-gray-400 bg-clip-content p-[2px]  rounded-[50%]  checked:bg-[#B7C835] checked:border-[#B7C835]"
                                      onClick={(e) => AnalysisTypeFun(e)}
                                    />
                                    <label
                                      for="helper-radio-5"
                                      class="ml-2 text-xs peer-checked:text-black font-medium font-Poppins-Regular text-[#98A2B3]"
                                    >
                                      <div>Lorem2</div>
                                    </label>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="flex border-b-[1px] items-center border-[#F2F4F7] p-2 rounded justify-between ">
                                  <div class="flex flex-row-reverse justify-between w-full items-center h-5">
                                    <input
                                      id="helper-radio-6"
                                      name="helper-radio-Analysis"
                                      type="radio"
                                      value="Lorem3"
                                      class="w-[16.2px] h-[16.2px] peer cursor-pointer appearance-none border-[1px] border-gray-400 bg-clip-content p-[2px]  rounded-[50%]  checked:bg-[#B7C835] checked:border-[#B7C835]"
                                      onClick={(e) => AnalysisTypeFun(e)}
                                    />
                                    <label
                                      for="helper-radio-6"
                                      class=" ml-2 text-xs peer-checked:text-black font-medium font-Poppins-Regular text-[#98A2B3]"
                                    >
                                      <div>Lorem3</div>
                                    </label>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="w-full lg:col-start-1 lg:col-end-3">
                          <button
                            id="dropdownCheckBoxHelperChildButton"
                            data-dropdown-toggle="dropdownCheckBoxHelperChild"
                            class="w-full justify-between text-xs text-[#98A2B3] font-Poppins-Medium border-[#E4E7EC]  h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl"
                            onClick={() => CheckBoxListChild()}
                            type="button"
                          >
                            <p
                              className={`${
                                CheckMulitChild.length > 0 ? "hidden" : "block"
                              }`}
                            >
                              {t("Analysis type child")}
                            </p>
                            {CheckMulitChild.map((item) => (
                              <p>{item}</p>
                            ))}{" "}
                            <svg
                              class="ml-2 w-4 h-4"
                              aria-hidden="true"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                              ></path>
                            </svg>
                            <p
                              id="AnalysisTypeChild"
                              className="hidden text-xs font-Poppins-Medium absolute top-[-0.5rem] bg-white left-[0.1rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Analysis type Child")}
                            </p>
                          </button>
                          <div
                            id="dropdownDefaultCheckBoxChild"
                            class="hidden border-[#B7C835] font-Poppins-Regular border-[1px] rounded-b-xl border-t-0 z-10 w-[81%] sm:w-[86%] md:w-[89%] bg-white rounded divide-y divide-gray-100 shadow "
                          >
                            <ul
                              class="p-3 space-y-1 text-sm text-gray-700"
                              aria-labelledby="dropdownCheckBoxHelperChildButton"
                            >
                              <li>
                                <div class="flex p-2   ">
                                  <div class="flex flex-row-reverse justify-between w-full items-center h-5">
                                    <input
                                      id="helper-checkbox-4"
                                      name="helper-checkbox"
                                      type="checkbox"
                                      value="Lorem1"
                                      class="w-[15px] h-[15px] peer accent-[#B7C835]"
                                      onClick={(e) => MultiCheckChild(e)}
                                    />
                                    <label
                                      for="helper-checkbox-4"
                                      class="font-medium ml-2 peer-checked:text-black font-Poppins-Medium text-[#98A2B3] text-xs"
                                    >
                                      <div>Lorem1</div>
                                    </label>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="flex p-2 ">
                                  <div class="flex flex-row-reverse justify-between w-full items-center h-5">
                                    <input
                                      id="helper-checkbox-5"
                                      name="helper-checkbox"
                                      type="checkbox"
                                      value="Lorem2"
                                      class="w-[15px] h-[15px] peer accent-[#B7C835]"
                                      onClick={(e) => MultiCheckChild(e)}
                                    />
                                    <label
                                      for="helper-checkbox-5"
                                      class="font-medium ml-2 peer-checked:text-black font-Poppins-Medium text-[#98A2B3] text-xs "
                                    >
                                      <div>Lorem2</div>
                                    </label>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="flex p-2  ">
                                  <div class="flex  flex-row-reverse justify-between w-full items-center h-5">
                                    <input
                                      id="helper-checkbox-6"
                                      name="helper-checkbox"
                                      type="checkbox"
                                      value="Lorem3"
                                      class="w-[15px] h-[15px] peer accent-[#B7C835]  "
                                      onClick={(e) => MultiCheckChild(e)}
                                    />
                                    <label
                                      for="helper-checkbox-6"
                                      class="font-medium ml-2 peer-checked:text-black font-Poppins-Medium text-[#98A2B3] text-xs "
                                    >
                                      <div>Lorem3</div>
                                    </label>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 lg:col-start-1 lg:col-end-3 gap-5 ">
                          <AnalysisIDContainer />
                          <AnalysisIDContainer />
                          <AnalysisIDContainer />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 lg:col-start-1 lg:col-end-3 gap-5 ">
                          <div
                            id="AnalysisPriceContainer"
                            className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                            onClick={() => AnalysisPriceClicked()}
                          >
                            <input
                              id="AnalysisPriceInput"
                              name="AnalysisPrice"
                              placeholder={t("Analysis price")}
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs text-[#98A2B3] outline-0 ring-0"
                            />
                            <p
                              id="AnalysisPrice"
                              className="hidden text-xs font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.1rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Analysis price")}
                            </p>
                          </div>
                          <div
                            id="PaidUpContainer"
                            className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                            onClick={() => PaidUpClicked()}
                          >
                            <input
                              id="PaidUpInput"
                              name="PaidUp"
                              placeholder={t("Paid up")}
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs text-[#98A2B3] outline-0 ring-0"
                            />
                            <p
                              id="PaidUp"
                              className="hidden text-xs font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.1rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Paid up")}
                            </p>
                          </div>
                          <div
                            id="DueContainer"
                            className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                            onClick={() => DueClicked()}
                          >
                            <input
                              id="DueInput"
                              name="Due"
                              placeholder={t("Due")}
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs text-[#98A2B3] outline-0 ring-0"
                            />
                            <p
                              id="Due"
                              className="hidden text-xs font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.1rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Due")}
                            </p>
                          </div>
                        </div>

                        <div
                          id="PaymentTypeContainer"
                          className="w-full pr-2 bg-[#F9FAFF] rounded-lg flex border-[1px] border-[#E4E7EC]  items-center mr-5"
                        >
                          <select
                            id="PaymentTypeInput"
                            name="PaymentType"
                            onChange={() => PaymentTypeChanged()}
                            className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Medium  text-[#98A2B3] text-xs  outline-none px-4 py-2 cursor-pointer"
                          >
                            <option
                              value=""
                              selected
                              disabled
                              hidden
                              className=""
                            >
                              {t("Payment type")}
                            </option>
                          </select>
                          <p
                            id="PaymentType"
                            className="hidden text-xs font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.1rem]  px-1 text-[#B7C835] font-medium"
                          >
                            {t("PaymentType")}
                          </p>
                        </div>
                        <div
                          id="DiscountContainer"
                          className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                          onClick={() => DiscountClicked()}
                        >
                          <input
                            id="DiscountInput"
                            name="Discount"
                            placeholder={t("Discount")}
                            type="text"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs text-[#98A2B3] outline-0 ring-0"
                          />
                          <p
                            id="Discount"
                            className="hidden text-xs font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.1rem]  px-1 text-[#B7C835] font-medium"
                          >
                            {t("Discount")}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 lg:col-start-1 lg:col-end-3 gap-5 mt-20">
                          <AnalysisContainer />
                          <AnalysisContainer />
                          <AnalysisContainer />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 lg:col-start-1 lg:col-end-3 gap-5 mt-5">
                          <button
                            type="button"
                            className="flex  flex-grow py-3 font-Poppins-Medium text-sm  bg-[#B7C835] justify-center rounded-xl text-white"
                          >
                            {t("Save")}
                          </button>

                          <button
                            type="button"
                            className="flex border-[#D0D5DD] border-[1px] flex-grow py-3 font-Poppins-Medium text-sm  bg-[#FFFFFF] justify-center rounded-xl text-black"
                          >
                            {t("Print barcode")}
                          </button>

                          <button
                            type="button"
                            className="flex border-[#D0D5DD] border-[1px] flex-grow py-3 font-Poppins-Medium text-sm x  bg-[#FFFFFF] justify-center rounded-xl text-black"
                          >
                            {t("Print for patient")}
                          </button>

                          <button
                            type="button"
                            className="flex border-[#D0D5DD] border-[1px] flex-grow py-3 font-Poppins-Medium text-sm x  bg-[#FFFFFF] justify-center rounded-xl text-black"
                          >
                            {t("Print for lab")}
                          </button>

                          <button
                            type="button"
                            className="flex border-[#D0D5DD] border-[1px] flex-grow py-3 font-Poppins-Medium text-sm x  bg-[#FFFFFF] justify-center rounded-xl text-black"
                          >
                            {t("Print for drawing room")}
                          </button>

                          <button
                            type="button"
                            className="flex border-[#D0D5DD] border-[1px] flex-grow py-3 font-Poppins-Medium text-sm x  bg-[#FFFFFF] justify-center rounded-xl text-black"
                            onClick={() => close()}
                          >
                            {t("Cancel")}
                          </button>
                        </div>
                      </div>
                    </div>
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

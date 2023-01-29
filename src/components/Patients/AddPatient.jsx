/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useRef, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosClose } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AnalysisIDContainer from "./AddPatient/AnalysisIDContainer";
import AnalysisContainer from "./AddPatient/AnalysisContainer";
import { useTranslation } from "react-i18next";
import axios from "axios";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useFetcher } from "react-router-dom";

// import { addAnalaytic } from "../../GlobalData/SystemDashBoard/allAnalysis";
import profile from "../../Images/profile.jpg";
import { useInfiniteQuery } from "react-query";
export default function AddPatient({
  setGetAllPatients,
  setDataForFilter,
  open,
  setOpen,
}) {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);
  const { t, i18n } = useTranslation();
  const [VisitDate, setVisitDate] = useState(new Date());

  const [ReceiveDate, setReceiveDate] = useState(new Date());
  const [AnalysisType, setAnalysisType] = useState(t("Analysis type"));
  const [AnalysisChild, setAnalysisChild] = useState(t("Analysis Child"));
  const [AnalysisChildForShow, setAnalysisChildForShow] = useState(t(""));
  const [disable, setDisable] = useState(false);
  const [SendMethod, setSendMethod] = useState(t("Send method"));
  const [CheckMulit, setCheckMulit] = useState([]);
  const [CheckMulitChild, setCheckMulitChild] = useState([]);
  const [getGender, setGetGender] = useState();
  const [getDoctors, setGetDoctors] = useState();
  const [getLab, setGetLab] = useState();
  const [getCompanies, setGetCompanies] = useState();
  const [getSendMethods, setGetSendMethods] = useState();
  const [getPayemntMethods, setGetPayemntMethods] = useState();
  const [getSections, setGetSections] = useState();
  const [getChildAnalysis, setGetChildAnalysis] = useState();
  const [nameOfAnalysis, setNameOfAnalysis] = useState("");
  const [priceAnalysis, setPriceAnalysis] = useState("");
  const [st, setSt] = useState("");
  const [Urgency, setUrgency] = useState("");
  const [doctorArray, setDoctorArray] = useState([]);
  const [labArray, setLabArray] = useState([]);
  const [companyArray, setCompanyArray] = useState([]);

  const [arr, setArr] = useState([]);
  const [sectionName, setSectionName] = useState([]);
  const [analyzName, setAnalyzName] = useState([]);
  const [getSectionValue, setGetSectionValue] = useState();
  const [getAnalysisValue, setGetAnalysisValue] = useState();
  const [errorName, setErrorName] = useState("");
  const [errorVisitDate, setErrorVisitDate] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
  const [errorReciveDate, setErrorReciveDate] = useState("");
  const [errorAge, setErrorAge] = useState();
  const [errorGender, setErrorGender] = useState("");
  const [errorAddress, setErrorAddress] = useState("");

  const VisitInput = React.forwardRef((props, ref) => {
    return (
      <div
        onClick={props.onClick}
        className=" p-2  justify-between   outline-0  border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-[0.80rem] px-4  relative  border-[1px] rounded-xl "
      >
        <label className="text-[#98A2B3] text-xs mr-10 font-Poppins-Regular">
          {t("Date of Visit")}
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
          {t("Receive of data")}
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

  const AnalysisTypeFun = (e) => {
    if (e.target.checked) {
      setAnalysisType(e.target.value);
      if (
        !document
          .getElementById("dropdownDefaultRadioAnalysis")
          .classList.contains("hidden")
      ) {
        document
          .getElementById("dropdownDefaultRadioAnalysis")
          .classList.add("hidden");
      }
    }
  };
  const RadioAnalysisType = () => {
    if (
      !document
        .getElementById("dropdownDefaultRadioChild")
        .classList.contains("hidden")
    ) {
      document
        .getElementById("dropdownDefaultRadioChild")
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
    if (document.getElementById("dropdownRadioHelperButtonAnalysis"))
      document
        .getElementById("dropdownRadioHelperButtonAnalysis")
        .classList.remove("border-[#E4E7EC]");
    if (document.getElementById("dropdownRadioHelperButtonAnalysis"))
      document
        .getElementById("dropdownRadioHelperButtonAnalysis")
        .classList.remove("bg-[#F9FAFF]");
    if (document.getElementById("dropdownRadioHelperButtonAnalysis"))
      document
        .getElementById("dropdownRadioHelperButtonAnalysis")
        .classList.add("border-[#B7C835]");
    if (document.getElementById("dropdownRadioHelperButtonAnalysis"))
      document
        .getElementById("dropdownRadioHelperButtonAnalysis")
        .classList.add("bg-white");
    if (document.getElementById("dropdownRadioHelperButtonAnalysis"))
      document
        .getElementById("dropdownRadioHelperButtonAnalysis")
        .classList.remove("bg-[#F9FAFF]");
    if (document.getElementById("dropdownRadioHelperButtonAnalysis"))
      document
        .getElementById("dropdownRadioHelperButtonAnalysis")
        .classList.add("bg-white");
  };
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
      if (
        !document
          .getElementById("dropdownDefaultRadio")
          .classList.contains("hidden")
      ) {
        document.getElementById("dropdownDefaultRadio").classList.add("hidden");
      }
    }
  };
  function close() {
    setDisableBtn(true);
    setGetSectionValue("");
    setGetAnalysisValue("");
    setAnalysisType("Analysis type");
    setAnalysisChild("Analysis Child");
    setAnalysisChildForShow("");
    setAnalyz([]);
    setSendMethod("Send Method");
    setDoctorPrice("");
    setDoctorRatio("");
    setLapPrice("");
    setcompanyPrice("");
    setNameOfAnalysis("");
    setPriceAnalysis("");
    setFormData({
      date_of_visit: `${moment(`${new Date()}`).format("YYYY-MM-DD")}`,
      receive_of_date: `${moment(`${new Date()}`).format("YYYY-MM-DD")}`,
    });
    setSectionName([]);
    setOpen(false);
  }

  // const UrgencyChange = (e) => {
  //   if (e.target.checked) {
  //     setUrgency(e.target.value);
  //   }
  // };
  const handleChangeEmerGency = (e) => {
    // console.log(e.target.value);
  };
  const CheckBoxList = () => {
    if (
      document
        .getElementById("dropdownDefaultCheckBox")
        .classList.contains("hidden")
    ) {
      document
        .getElementById("dropdownDefaultCheckBox")
        .classList.remove("hidden");
      document
        .getElementById("dropdownDefaultCheckBox")
        .classList.add("absolute");
    } else if (
      !document
        .getElementById("dropdownDefaultCheckBox")
        .classList.contains("hidden")
    ) {
      document
        .getElementById("dropdownDefaultCheckBox")
        .classList.add("hidden");
      document
        .getElementById("dropdownDefaultCheckBox")
        .classList.remove("absolute");
    }

    document.getElementById("AnalysisType").classList.remove("hidden");
    document
      .getElementById("dropdownCheckBoxHelperButton")
      .classList.remove("border-[#E4E7EC]");
    document
      .getElementById("dropdownCheckBoxHelperButton")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("dropdownCheckBoxHelperButton")
      .classList.add("border-[#B7C835]");
    document
      .getElementById("dropdownCheckBoxHelperButton")
      .classList.add("bg-white");
    document
      .getElementById("dropdownCheckBoxHelperButton")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("dropdownCheckBoxHelperButton")
      .classList.add("bg-white");
  };

  const RadioListChild = () => {
    if (
      !document
        .getElementById("dropdownDefaultRadioAnalysis")
        .classList.contains("hidden")
    ) {
      document
        .getElementById("dropdownDefaultRadioAnalysis")
        .classList.add("hidden");
    }
    if (
      document
        .getElementById("dropdownDefaultRadioChild")
        .classList.contains("hidden")
    ) {
      document
        .getElementById("dropdownDefaultRadioChild")
        .classList.remove("hidden");
      document
        .getElementById("dropdownDefaultRadioChild")
        .classList.add("absolute");
    } else if (
      !document
        .getElementById("dropdownDefaultRadioChild")
        .classList.contains("hidden")
    ) {
      document
        .getElementById("dropdownDefaultRadioChild")
        .classList.add("hidden");
      document
        .getElementById("dropdownDefaultRadioChild")
        .classList.remove("absolute");
    }

    document.getElementById("AnalysisTypeChild").classList.remove("hidden");
    if (document.getElementById("dropdownCheckBoxHelperChildButton"))
      document
        .getElementById("dropdownCheckBoxHelperChildButton")
        .classList.remove("border-[#E4E7EC]");
    if (document.getElementById("dropdownCheckBoxHelperChildButton"))
      document
        .getElementById("dropdownCheckBoxHelperChildButton")
        .classList.remove("bg-[#F9FAFF]");
    if (document.getElementById("dropdownCheckBoxHelperChildButton"))
      document
        .getElementById("dropdownCheckBoxHelperChildButton")
        .classList.add("border-[#B7C835]");
    if (document.getElementById("dropdownCheckBoxHelperChildButton"))
      document
        .getElementById("dropdownCheckBoxHelperChildButton")
        .classList.add("bg-white");
    if (document.getElementById("dropdownCheckBoxHelperChildButton"))
      document
        .getElementById("dropdownCheckBoxHelperChildButton")
        .classList.remove("bg-[#F9FAFF]");
    if (document.getElementById("dropdownCheckBoxHelperChildButton"))
      document
        .getElementById("dropdownCheckBoxHelperChildButton")
        .classList.add("bg-white");
  };

  const CheckChild = (e) => {
    if (e.target.checked) {
      setAnalysisChild(e.target.value);
      setAnalysisChildForShow(e.target.value);
      if (
        !document
          .getElementById("dropdownDefaultRadioChild")
          .classList.contains("hidden")
      ) {
        document
          .getElementById("dropdownDefaultRadioChild")
          .classList.add("hidden");
      }
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: null,
    address: "",
    phone_number: null,
    gender_id: null,
    date_of_visit: `${moment(`${VisitDate}`).format("YYYY-MM-DD")}`,
    receive_of_date: `${moment(`${ReceiveDate}`).format("YYYY-MM-DD")}`,
    analyz: [],
  });

  // document.getElementById("company").value == -1 &&
  //   document.getElementById("lab").value == -1
  //   ?

  // console.log(document.getElementById("CompanyInput"));

  // if(st =="doctor")
  const [disableBtn, setDisableBtn] = useState(true);
  const [sectionValue, setSectionValue] = useState("");
  const [analyz, setAnalyz] = useState(
    st == "doctor"
      ? {
          send_method_id: null,

          doctor_id: null,
          price_doctor: "",
          ratio_price: null,

          emergency: false,
          section_id: null,
          analyz_id: null,
          notes: "",
          price_analysis: null,
          paid_up: null,
          duo: null,
          discount: null,
          payment_method_id: null,
        }
      : st == "lab"
      ? {
          send_method_id: null,

          lab_id: null,
          price_lab: null,

          emergency: false,
          section_id: null,
          analyz_id: null,
          notes: "",
          price_analysis: null,
          paid_up: null,
          duo: null,
          discount: null,
          payment_method_id: null,
        }
      : st == "company"
      ? {
          send_method_id: null,

          company_id: null,
          price_company: null,

          emergency: false,
          section_id: null,
          analyz_id: null,
          notes: "",
          price_analysis: null,
          paid_up: null,
          duo: null,
          discount: null,
          payment_method_id: null,
        }
      : ""
  );
  // lab_id: null,
  // price_lab: null,

  // company_id: null,
  // price_company: null,
  const handleSendData = (e) => {
    e.preventDefault();
    // console.log(formData.date_of_visit);
    // const dayafter = moment(`${VisitDate}`).format("YYYY-MM-DD");
    axios
      .post(`lab-scope/patient-create`, {
        name: formData.name,
        email: formData.email,
        age: formData.age,
        address: formData.address,
        phone_number: formData.phone_number,
        gender_id: parseInt(formData.gender_id),
        date_of_visit: formData.date_of_visit,
        receive_of_date: formData.receive_of_date,
        list_analys: arr,
      })
      .then((res) => {
        axios
          .get("lab-scope/all-patient")
          .then((res) => {
            setGetAllPatients(res.data);
            setDataForFilter(res.data);
          })
          .catch((err) => {
            console.log(err);
          });

        setFormData({
          name: "",
          email: "",
          age: null,
          address: "",
          phone_number: null,
          gender_id: null,
          date_of_visit: new Date(),
          receive_of_date: new Date(),
          analyz: [],
        });

        setArr([]);
        setAnalyz([]);
        setDoctorArray([]);
        setLabArray([]);
        setCompanyArray([]);
        setVisitDate(new Date());
        setReceiveDate(new Date());

        // setAnalyz({
        //   ...analyz,
        //   send_method_id: "",

        //   doctor_id: "",
        //   price_doctor: "",
        //   ratio_price: "",

        //   company_id: null,
        //   price_company: null,

        //   lab_id: null,
        //   price_lab: null,

        //   emergency: false,
        //   analyz_id: "",
        //   notes: "",
        //   price_analysis: "",
        //   paid_up: "",
        //   duo: "",
        //   discount: "",
        //   payment_method_id: "",
        // });
        setDoctorRatio("");
        setDoctorPrice("");
        setLapPrice("");
        setcompanyPrice("");
        setAnalysisType("Analysis type");
        setAnalysisChild("Analysis Child");
        setAnalysisChildForShow("");
        setNameOfAnalysis("");
        setPriceAnalysis("");
        setAmountPriceCompany("");
        setAmountPriceLab("");
        setAmountPricePatient("");
        setNameAnalyz([]);
        setErrorName("");
        setErrorVisitDate("");
        setErrorEmail("");
        setErrorPhoneNumber("");
        setErrorReciveDate("");
        setErrorAge("");
        setErrorGender("");
        setErrorAddress("");
        close();

        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.errors.name)
          setErrorName(err.response.data.errors.name[0]);
        else setErrorName("");
        if (err.response.data.errors.data_of_visit)
          setErrorVisitDate(err.response.data.errors.data_of_visit[0]);
        else setErrorVisitDate("");
        if (err.response.data.errors.email)
          setErrorEmail(err.response.data.errors.email[0]);
        else setErrorEmail("");
        if (err.response.data.errors.phone_number)
          setErrorPhoneNumber(err.response.data.errors.phone_number[0]);
        else setErrorPhoneNumber("");
        if (err.response.data.errors.receive_of_date)
          setErrorReciveDate(err.response.data.errors.receive_of_date[0]);
        else setErrorReciveDate("");
        if (err.response.data.errors.age)
          setErrorAge(err.response.data.errors.age[0]);
        else setErrorAge("");
        if (err.response.data.errors.gender_id)
          setErrorGender(err.response.data.errors.gender_id[0]);
        else setErrorGender("");
        if (err.response.data.errors.address)
          setErrorAddress(err.response.data.errors.address[0]);
        else setErrorAddress("");
      });
  };
  useEffect(() => {
    axios
      .get(`lab-scope/genders`)
      .then((res) => {
        // console.log(res);
        setGetGender(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`lab-scope/myDoctors`)
      .then((res) => {
        // console.log(res);
        setGetDoctors(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`lab-scope/labs`)
      .then((res) => {
        // console.log(res.data, "hi");

        setGetLab(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`lab-scope/companies`)
      .then((res) => {
        // console.log(res);
        setGetCompanies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`lab-scope/sendMethods`)
      .then((res) => {
        // console.log(res.data);
        setGetSendMethods(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`lab-scope/get-sections`)
      .then((res) => {
        // console.log(res.data, "Hello20");
        setGetSections(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`lab-scope/paymentMethods`)
      .then((res) => {
        // console.log(res.data);
        setGetPayemntMethods(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // basic fields
  const handleChangeName = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };
  const handleChangeVisitData = (e) => {
    setVisitDate(e);
    setFormData({
      ...formData,
      date_of_visit: moment(`${e}`).format("YYYY-MM-DD"),
    });
  };
  const handleChangeAge = (e) => {
    setFormData({
      ...formData,
      age: parseInt(e.target.value),
    });
  };
  const handleChangePatientAddress = (e) => {
    setFormData({
      ...formData,
      address: e.target.value,
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
      phone_number: e.target.value,
    });
  };
  const handleChangeReceiveDate = (e) => {
    setReceiveDate(e);
    setFormData({
      ...formData,
      receive_of_date: moment(`${e}`).format("YYYY-MM-DD"),
    });
  };
  const handleChangeGender = (e) => {
    if (
      document
        .getElementById("GenderInput")
        .classList.contains("text-[#98A2B3]")
    ) {
      document.getElementById("GenderInput").classList.remove("text-[#98A2B3]");
    }
    // console.log(e.target.value);
    setFormData({
      ...formData,
      gender_id: parseInt(e.target.value),
    });
  };

  const [doctorID, setDoctorID] = useState();
  const [doctorPrice, setDoctorPrice] = useState("");
  const [doctorRatio, setDoctorRatio] = useState("");

  const [lapID, setLapID] = useState();
  const [lapPrice, setLapPrice] = useState("");

  const [companyID, setCompanyID] = useState();
  const [companyPrice, setcompanyPrice] = useState();

  // Doctor
  const handleChangeDoctor = (e) => {
    let select = document.getElementById("DoctorInput");
    // console.log(e.target.options[select.selectedIndex].id);
    setDoctorID(e.target.value);
    setAnalyz({
      ...analyz,
      doctor_id: e.target.value,
    });
    // console.log(e.target.options[select.selectedIndex].id);
    setDoctorRatio(e.target.options[select.selectedIndex].id);
    let value = select.options[select.selectedIndex].value;
    let id = select.options[select.selectedIndex].id;
    if (id === "-1") {
      setDoctorRatio("");
      setDoctorPrice("");
    }

    if (
      document
        .getElementById("DoctorInput")
        .classList.contains("text-[#98A2B3]")
    ) {
      document.getElementById("DoctorInput").classList.remove("text-[#98A2B3]");
    }

    if (value === "-1") {
      document.getElementById("CompanyIDInput").disabled = false;
      document.getElementById("CompanyInput").disabled = false;
      document.getElementById("SentLabInput").disabled = false;
      document.getElementById("LapIdInput").disabled = false;
      // setAnalyz({
      //   ...analyz,
      //   doctor_id: "",
      //   // ratio_price: "",
      // });
    } else {
      document.getElementById("CompanyIDInput").disabled = true;
      document.getElementById("CompanyInput").disabled = true;
      document.getElementById("SentLabInput").disabled = true;
      document.getElementById("LapIdInput").disabled = true;
      setSt("doctor");
      // setAnalyz({
      //   ...analyz,
      //   doctor_id: parseInt(e.target.value),
      //   // ratio_price: e.target.options[select.selectedIndex].id,
      // });
    }
  };

  const handleChangePrice = (e) => {
    setDoctorPrice(e.target.value);
    setAmountPricePatient(e.target.value);

    // setAnalyz({
    //   ...analyz,
    //   price_doctor: e.target.value,
    // });
  };

  const handleChangeRatioPrice = (e) => {
    setDoctorRatio(e.target.value);

    // setAnalyz({
    //   ...analyz,
    //   ratio_price: e.target.value,
    // });
  };

  // Lab
  const handleChangeSentLab = (e) => {
    setLapID(e.target.value);
    setAnalysisChildForShow(e.target.value);
    setAnalyz({
      ...analyz,
      lab_id: e.target.value,
    });
    let select = document.getElementById("SentLabInput");
    let value = select.options[select.selectedIndex].value;
    if (select.options[select.selectedIndex].id) {
      setLapPrice("");
    }
    if (select.options[select.selectedIndex].value === "-1") {
      setAmountPriceLab("");
    }
    if (
      document
        .getElementById("SentLabInput")
        .classList.contains("text-[#98A2B3]")
    ) {
      document
        .getElementById("SentLabInput")
        .classList.remove("text-[#98A2B3]");
    }
    if (value === "-1") {
      document.getElementById("CompanyIDInput").disabled = false;
      document.getElementById("CompanyInput").disabled = false;
      document.getElementById("RatioPriceInput").disabled = false;
      document.getElementById("PriceInput").disabled = false;
      document.getElementById("DoctorInput").disabled = false;
      // setAnalyz({
      //   ...analyz,
      //   lab_id: "",
      // });
    } else {
      document.getElementById("CompanyIDInput").disabled = true;
      document.getElementById("CompanyInput").disabled = true;
      document.getElementById("RatioPriceInput").disabled = true;
      document.getElementById("PriceInput").disabled = true;
      document.getElementById("DoctorInput").disabled = true;
      setSt("lab");
      // setAnalyz({
      //   ...analyz,
      //   lab_id: parseInt(e.target.value),
      // });
    }
  };

  const handleChangeLab = (e) => {
    setAmountPriceLab(e.target.value);
    setLapPrice(e.target.value);
    // setAnalyz({
    //   ...analyz,
    //   price_lab: e.target.value,
    // });
  };

  // Companies

  const handleChangeCampany = (e) => {
    setCompanyID(e.target.value);
    setAnalyz({
      ...analyz,
      company_id: e.target.value,
    });
    let select = document.getElementById("CompanyInput");
    let value = select.options[select.selectedIndex].value;
    if (select.options[select.selectedIndex].id === "-1") {
      setcompanyPrice("");
    }

    if (
      document
        .getElementById("CompanyInput")
        .classList.contains("text-[#98A2B3]")
    ) {
      document
        .getElementById("CompanyInput")
        .classList.remove("text-[#98A2B3]");
    }
    if (value === "-1") {
      document.getElementById("DoctorInput").disabled = false;
      document.getElementById("PriceInput").disabled = false;
      document.getElementById("RatioPriceInput").disabled = false;
      document.getElementById("SentLabInput").disabled = false;
      document.getElementById("LapIdInput").disabled = false;
      // setAnalyz({
      //   ...analyz,
      //   company_id: "",
      // });
    } else {
      document.getElementById("DoctorInput").disabled = true;
      document.getElementById("PriceInput").disabled = true;
      document.getElementById("RatioPriceInput").disabled = true;
      document.getElementById("SentLabInput").disabled = true;
      document.getElementById("LapIdInput").disabled = true;
      setSt("company");
      // setAnalyz({
      //   ...analyz,
      //   company_id: parseInt(e.target.value),
      // });
    }
    // console.log(e.target.value);
  };
  const handleChangeCompanyPrice = (e) => {
    setcompanyPrice(e.target.value);
    setAmountPriceCompany(e.target.value);
    // setAnalyz({
    //   ...analyz,
    //   price_company: e.target.value,
    // });
    // console.log(this.price_company);
  };

  // Send Method
  const handleChangeSendMethod = (e) => {
    // console.log(e.target.id);
    setAnalyz({
      ...analyz,
      send_method_id: parseInt(e.target.id),
    });
  };

  const [amountPricePatient, setAmountPricePatient] = useState("");
  const [amountPriceLab, setAmountPriceLab] = useState("");
  const [amountPriceCompany, setAmountPriceCompany] = useState("");
  const [once, setOnce] = useState(true);
  const handleChangeSectionID = (
    e,
    once,
    priceForPatient,
    priceForLap,
    PriceForCompany
  ) => {
    setGetSectionValue(e.target.value);
    setAnalysisChild("Analysis Child");
    setAnalysisChildForShow("");
    setOnce(once);
    if (once) {
      setGetAnalysisValue(e.target.value);
      if (st === "doctor") {
        setDoctorPrice(priceForPatient);
        setLapPrice("");
        setcompanyPrice("");
      }
      if (st === "lab") {
        setDoctorPrice("");
        setLapPrice(priceForLap);
        setcompanyPrice("");
      }
      if (st === "company") {
        setDoctorPrice("");
        setLapPrice("");
        setcompanyPrice(PriceForCompany);
      }
    } else {
      setDoctorPrice("");
      setLapPrice("");
      setcompanyPrice("");
    }
    if (once === true) {
      // setNameAnalyz((current) => [...current, "-1"]);
      setAnalyz({
        ...analyz,
        analyz_id: null,
      });
      if (st === "doctor") {
        setAmountPricePatient(priceForPatient);

        document.getElementById("CompanyIDInput").disabled = true;
        document.getElementById("CompanyInput").disabled = true;
        document.getElementById("SentLabInput").disabled = true;
        document.getElementById("LapIdInput").disabled = true;
      }
      if (st === "lab") {
        setAmountPriceLab(priceForLap);

        document.getElementById("CompanyIDInput").disabled = true;
        document.getElementById("CompanyInput").disabled = true;
        document.getElementById("RatioPriceInput").disabled = true;
        document.getElementById("PriceInput").disabled = true;
        document.getElementById("DoctorInput").disabled = true;
      }
      if (st === "company") {
        setAmountPriceCompany(PriceForCompany);

        document.getElementById("DoctorInput").disabled = true;
        document.getElementById("PriceInput").disabled = true;
        document.getElementById("RatioPriceInput").disabled = true;
        document.getElementById("SentLabInput").disabled = true;
        document.getElementById("LapIdInput").disabled = true;
      }
    }
    setAnalyzName(e.target.value);

    setNameOfAnalysis(e.target.value);
    // setSectionName((current) => [...current, e.target.value]);
    if (!once)
      axios
        .get(`lab-scope/get-AnalysisFromSection?section_id=${e.target.id}`)
        .then((res) => {
          setGetChildAnalysis(res.data.data);
        })
        .catch((err) => {
          setGetChildAnalysis();
          setAnalysisChild("Analysis Child");
          setAnalysisChildForShow("");
          console.log(err);
        });
    setAnalyz({
      ...analyz,
      section_id: parseInt(e.target.id),
    });
    setSectionValue(e.target.value);
  };
  const [nameAnalyz, setNameAnalyz] = useState([]);
  const handleChangeAnalysis = (
    e,
    priceForPatient,
    price_for_lab,
    price_for_company,
    name
  ) => {
    // title
    setGetAnalysisValue(e.target.value);
    if (st === "doctor") {
      setDoctorPrice(priceForPatient);
      setLapPrice("");
      setcompanyPrice("");
    }
    if (st === "lab") {
      setDoctorPrice("");
      setLapPrice(price_for_lab);
      setcompanyPrice("");
    }
    if (st === "company") {
      setDoctorPrice("");
      setLapPrice("");
      setcompanyPrice(price_for_company);
    }

    setAnalyzName(e.target.title);
    setNameOfAnalysis(e.target.value);
    setAnalyz({
      ...analyz,
      analyz_id: parseInt(e.target.id),
    });
    if (st === "doctor") {
      setAmountPricePatient("");

      document.getElementById("CompanyIDInput").disabled = true;
      document.getElementById("CompanyInput").disabled = true;
      document.getElementById("SentLabInput").disabled = true;
      document.getElementById("LapIdInput").disabled = true;
    }
    if (st === "lab") {
      setAmountPriceLab("");

      document.getElementById("CompanyIDInput").disabled = true;
      document.getElementById("CompanyInput").disabled = true;
      document.getElementById("RatioPriceInput").disabled = true;
      document.getElementById("PriceInput").disabled = true;
      document.getElementById("DoctorInput").disabled = true;
    }
    if (st === "company") {
      setAmountPriceCompany("");

      document.getElementById("DoctorInput").disabled = true;
      document.getElementById("PriceInput").disabled = true;
      document.getElementById("RatioPriceInput").disabled = true;
      document.getElementById("SentLabInput").disabled = true;
      document.getElementById("LapIdInput").disabled = true;
    }
  };

  const UrgencyChange = (e) => {
    if (e.target.id === "radio-1")
      setAnalyz({
        ...analyz,
        emergency: true,
      });
    else {
      setAnalyz({
        ...analyz,
        emergency: false,
      });
    }
  };

  const handleChangeNotes = (e) => {
    setAnalyz({
      ...analyz,
      notes: e.target.value,
    });
  };

  // Additional fields
  const handleChangeAnalysisPrice = (e) => {
    setPriceAnalysis(e.target.value);
    setAnalyz({
      ...analyz,
      price_analysis: e.target.value,
    });
  };
  const handleChangePaidUp = (e) => {
    setAnalyz({
      ...analyz,
      paid_up: e.target.value,
    });
  };
  const handleChangeDue = (e) => {
    setAnalyz({
      ...analyz,
      duo: e.target.value,
    });
  };
  const handleChangeDiscount = (e) => {
    setAnalyz({
      ...analyz,
      discount: e.target.value,
    });
  };
  const handleChangePayemntMethods = (e) => {
    if (
      document
        .getElementById("PaymentTypeInput")
        .classList.contains("text-[#98A2B3]")
    ) {
      document
        .getElementById("PaymentTypeInput")
        .classList.remove("text-[#98A2B3]");
    }
    setAnalyz({
      ...analyz,
      payment_method_id: parseInt(e.target.value),
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setDisableBtn(false);
    // if (st === "doctor") setArr((current) => [...current, ...doctorArray]);
    // if (st === "lab") setArr((current) => [...current, ...labArray]);
    // if (st === "company") setArr((current) => [...current, ...companyArray]);
    setSectionName((current) => [...current, sectionValue]);
    setNameAnalyz((current) => [...current, AnalysisChildForShow]);
    if (st === "doctor")
      setArr((current) => [
        ...current,
        {
          doctor_id: doctorID,
          ratio_price: doctorRatio,
          price_doctor: doctorPrice,

          send_method_id: analyz.send_method_id,
          emergency: analyz.emergency,
          section_id: analyz.section_id,
          analyz_id: analyz.analyz_id,
          notes: analyz.notes,
          price_analysis: analyz.price_analysis,
          paid_up: analyz.paid_up,
          duo: analyz.duo,
          discount: analyz.discount,
          payment_method_id: analyz.payment_method_id,
        },
      ]);
    if (st === "lab")
      setArr((current) => [
        ...current,
        {
          lab_id: lapID,
          price_lab: lapPrice,

          send_method_id: analyz.send_method_id,
          emergency: analyz.emergency,
          section_id: analyz.section_id,
          analyz_id: analyz.analyz_id,
          notes: analyz.notes,
          price_analysis: analyz.price_analysis,
          paid_up: analyz.paid_up,
          duo: analyz.duo,
          discount: analyz.discount,
          payment_method_id: analyz.payment_method_id,
        },
      ]);
    if (st === "company")
      setArr((current) => [
        ...current,
        {
          company_id: companyID,
          price_company: companyPrice,

          send_method_id: analyz.send_method_id,
          emergency: analyz.emergency,
          section_id: analyz.section_id,
          analyz_id: analyz.analyz_id,
          notes: analyz.notes,
          price_analysis: analyz.price_analysis,
          paid_up: analyz.paid_up,
          duo: analyz.duo,
          discount: analyz.discount,
          payment_method_id: analyz.payment_method_id,
        },
      ]);

    let select = document.getElementById("DoctorInput");
    const data = select.options;

    setAnalyz([]);
    setDoctorArray([]);
    setLabArray([]);
    setCompanyArray([]);
    setAnalyz({
      ...analyz,
      price_analysis: "",
      paid_up: "",
      discount: "",
      duo: "",
      send_method_id: "-1",
      notes: "",
      analyz_id: "",
      payment_method_id: "-1",
      doctor_id: "-1",
      lab_id: "-1",
      company_id: "-1",
      emergency: "-1",
    });
    setSendMethod("Send method");
    setDoctorID("-1");
    setLapID("-1");
    setCompanyID("-1");
    setOnce(true);
    setDoctorRatio("");
    setDoctorPrice("");
    setLapPrice("");
    setcompanyPrice("");
    setAnalysisType("Analysis type");
    setAnalysisChild("Analysis Child");
    setNameOfAnalysis("");
    setPriceAnalysis("");
    setAmountPriceCompany("");
    setAmountPriceLab("");
    setAmountPricePatient("");
    setGetSectionValue("");
  };

  const x = Object.values(analyz);
  // const AddNew = (e) => {
  //   // e.preventDefault();
  //   // setSectionName((current) => [...current, sectionValue]);
  //   // setNameAnalyz((current) => [...current, AnalysisChildForShow]);
  //   // setDoctorArray((current) => [
  //   //   ...current,
  //   //   {
  //   //     doctor_id: doctorID,
  //   //     ratio_price: doctorRatio,
  //   //     price_doctor: doctorPrice,
  //   //     send_method_id: analyz.send_method_id,
  //   //     emergency: analyz.emergency,
  //   //     section_id: analyz.section_id,
  //   //     analyz_id: analyz.analyz_id,
  //   //     notes: analyz.notes,
  //   //     price_analysis: analyz.price_analysis,
  //   //     paid_up: analyz.paid_up,
  //   //     duo: analyz.duo,
  //   //     discount: analyz.discount,
  //   //     payment_method_id: analyz.payment_method_id,
  //   //   },
  //   // ]);
  //   // setLabArray((current) => [
  //   //   ...current,
  //   //   {
  //   //     lab_id: lapID,
  //   //     price_lab: lapPrice,
  //   //     send_method_id: analyz.send_method_id,
  //   //     emergency: analyz.emergency,
  //   //     section_id: analyz.section_id,
  //   //     analyz_id: analyz.analyz_id,
  //   //     notes: analyz.notes,
  //   //     price_analysis: analyz.price_analysis,
  //   //     paid_up: analyz.paid_up,
  //   //     duo: analyz.duo,
  //   //     discount: analyz.discount,
  //   //     payment_method_id: analyz.payment_method_id,
  //   //   },
  //   // ]);
  //   // setCompanyArray((current) => [
  //   //   ...current,
  //   //   {
  //   //     company_id: companyID,
  //   //     price_company: companyPrice,
  //   //     send_method_id: analyz.send_method_id,
  //   //     emergency: analyz.emergency,
  //   //     section_id: analyz.section_id,
  //   //     analyz_id: analyz.analyz_id,
  //   //     notes: analyz.notes,
  //   //     price_analysis: analyz.price_analysis,
  //   //     paid_up: analyz.paid_up,
  //   //     duo: analyz.duo,
  //   //     discount: analyz.discount,
  //   //     payment_method_id: analyz.payment_method_id,
  //   //   },
  //   // ]);
  // };
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
                        Add patient
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
                            value={formData.name}
                            disabled={disable}
                            onChange={handleChangeName}
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
                          <span>{errorName}</span>
                        </div>
                        <div>
                          <ReactDatePicker
                            disabled={disable}
                            id="VisitDate"
                            dateFormat="yyyy-MM-dd"
                            className=""
                            customInput={<VisitInput />}
                            selected={VisitDate}
                            onChange={handleChangeVisitData}
                          />
                          <span>{errorVisitDate}</span>
                        </div>
                        <div
                          id="EmailContainer"
                          className="bg-[#F9FAFF] border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                          onClick={() => EmailClicked()}
                        >
                          <input
                            disabled={disable}
                            name="Email"
                            value={formData.email}
                            onChange={handleChangeEmail}
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
                          <span>{errorEmail}</span>
                        </div>

                        <div
                          id="PhoneContainer"
                          className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                          onClick={() => PhoneClicked()}
                        >
                          <input
                            disabled={disable}
                            name="Phone"
                            id="PhoneInput"
                            value={formData.phone_number}
                            onChange={handleChangePhone}
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
                          <span>{errorPhoneNumber}</span>
                        </div>
                        <div className="w-full">
                          <ReactDatePicker
                            disabled={disable}
                            id="date"
                            dateFormat="yyyy-MM-dd"
                            className=" "
                            customInput={<ReceiveInput />}
                            selected={ReceiveDate}
                            onChange={handleChangeReceiveDate}
                          />
                          <span>{errorReciveDate}</span>
                        </div>
                        <div
                          id="Age200Container"
                          className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                          onClick={() => AgeClicked()}
                        >
                          <input
                            disabled={disable}
                            name="Age"
                            id="AgeInput"
                            onChange={handleChangeAge}
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
                          <span>{errorAge}</span>
                        </div>

                        <div
                          id="GenderContainer"
                          className="w-full pr-2 bg-[#F9FAFF] rounded-lg flex border-[1px] border-[#E4E7EC]  items-center mr-5"
                        >
                          <select
                            disabled={disable}
                            id="GenderInput"
                            onChange={handleChangeGender}
                            name="Gender"
                            className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Medium  text-[#98A2B3] text-xs  outline-none px-4 py-2 cursor-pointer"
                            // onChange={() => GenderChanged()}
                          >
                            <option
                              selected={
                                formData.gender_id === null ||
                                formData.gender_id === ""
                              }
                              hidden
                              value="-1"
                              id="-1"
                              className=""
                            >
                              Gender
                            </option>
                            {getGender &&
                              getGender.map((item) => (
                                <option
                                  key={item.id}
                                  value={item.id}
                                  className=""
                                >
                                  {item.name}
                                </option>
                              ))}
                          </select>
                          <p
                            id="Gender"
                            className="hidden text-xs font-Poppins-Medium absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                          >
                            {t("Gender")}
                          </p>
                          <span>{errorGender}</span>
                        </div>
                        <div
                          id="PatientAddressContainer"
                          className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                          onClick={() => PatientAddressClicked()}
                        >
                          <input
                            name="PatientAddress"
                            id="PatientAddressInput"
                            value={formData.address}
                            disabled={disable}
                            onChange={handleChangePatientAddress}
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
                          <span>{errorAddress}</span>
                        </div>
                        <div className="flex space-y-5 lg:space-y-0 flex-col lg:flex-row w-full">
                          <div
                            id="DoctorContainer"
                            className="w-full lg:w-[40%] pr-2 bg-[#F9FAFF] rounded-lg flex border-[1px] border-[#E4E7EC]  items-center mr-5"
                            onChange={() => DoctorChanged()}
                          >
                            <select
                              id="DoctorInput"
                              value={analyz.doctor_id}
                              ratio={analyz.ratio_price}
                              onChange={handleChangeDoctor}
                              name="Doctor"
                              className={` w-full   rounded-lg bg-[#F9FAFF] text-[#98A2B3]  font-Poppins-Medium   text-xs  outline-none px-4 py-2 cursor-pointer`}
                            >
                              <option
                                selected={analyz.doctor_id === ""}
                                value="-1"
                                id="-1"
                                className=""
                              >
                                Doctor
                              </option>

                              {getDoctors &&
                                getDoctors.map((item) => (
                                  <option
                                    key={item.id}
                                    value={item.id}
                                    id={item.ratio}
                                    className=""
                                  >
                                    {item.name}
                                  </option>
                                ))}
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
                                onChange={handleChangePrice}
                                value={
                                  doctorPrice
                                  // !amountPricePatient
                                  //   ? analyz.price_doctor
                                  //   : amountPricePatient
                                }
                                name="Price"
                                placeholder="Price"
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
                                disabled
                                value={doctorRatio}
                                onChange={handleChangeRatioPrice}
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

                        <div className="flex  w-full">
                          <div
                            id="SentLabContainer"
                            className="w-3/4 pr-2 bg-[#F9FAFF] rounded-lg  text-[#98A2B3] flex border-[1px] border-[#E4E7EC]  items-center mr-5"
                            onChange={() => SentLabChanged()}
                          >
                            <select
                              name="SentLab"
                              id="SentLabInput"
                              value={analyz.lab_id}
                              onChange={handleChangeSentLab}
                              className={` w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Medium   text-xs  outline-none px-4 py-2 cursor-pointer`}
                            >
                              <option
                                selected={analyz.lab_id === ""}
                                value="-1"
                                id="-1"
                                className=""
                              >
                                Sent Lab
                              </option>
                              {getLab &&
                                getLab.map((item) => (
                                  <option
                                    key={item.id}
                                    value={item.id}
                                    className=""
                                  >
                                    {item.lab_name}
                                  </option>
                                ))}
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
                              value={
                                lapPrice
                                // !amountPriceLab
                                //   ? analyz.price_lab
                                //   : amountPriceLab
                              }
                              onChange={handleChangeLab}
                              name="LapId"
                              placeholder="0 ID"
                              type="text"
                              className="lab w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
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
                              value={analyz.company_id}
                              onChange={handleChangeCampany}
                              name="Company"
                              className={` w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Medium text-[#98A2B3]  text-xs  outline-none px-4 py-2 cursor-pointer`}
                              // onChange={() => CompanyChanged()}
                            >
                              <option
                                selected={analyz.company_id === ""}
                                value="-1"
                                id="-1"
                                className=""
                              >
                                Company
                              </option>
                              {getCompanies &&
                                getCompanies.map((item) => (
                                  <option
                                    key={item.id}
                                    value={item.id}
                                    className=""
                                  >
                                    {item.name}
                                  </option>
                                ))}
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
                              onChange={handleChangeCompanyPrice}
                              value={
                                companyPrice
                                // !amountPriceCompany
                                //   ? analyz.price_company
                                //   : amountPriceCompany
                              }
                              name="ID_Company"
                              placeholder="0 ID"
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs text-[#98A2B3] outline-0 ring-0"
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
                            class={`font-Poppins-Medium w-full justify-between text-xs ${
                              !analyz.send_method_id ? "text-[#98A2B3]" : ""
                            } 
                                border-[#E4E7EC]  h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl`}
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
                            class="hidden border-[#B7C835] border-[1px] h-[20rem] overflow-y-scroll rounded-b-xl border-t-0 z-10 w-[80%] sm:w-[42%] md:w-[89%] lg:w-[43%] bg-white rounded divide-y divide-gray-100 shadow "
                          >
                            <ul
                              class="p-3 space-y-1 text-sm text-gray-700 "
                              aria-labelledby="dropdownRadioHelperButton"
                            >
                              {getSendMethods &&
                                getSendMethods.map((item) => (
                                  <li key={item.id}>
                                    <div class="flex border-b-[1px] items-center border-[#F2F4F7] p-2 rounded  justify-between ">
                                      <div class="flex flex-row-reverse justify-between w-full items-center h-5">
                                        <input
                                          id={item.id}
                                          onChange={handleChangeSendMethod}
                                          checked={false}
                                          name="helper-radio"
                                          type="radio"
                                          value={item.name}
                                          class="w-[16.2px] peer h-[16.2px] cursor-pointer appearance-none border-[1px] checked:text-black border-gray-400 bg-clip-content p-[2px]  rounded-[50%]  checked:bg-[#B7C835] checked:border-[#B7C835]"
                                          onClick={(e) => MethodSend(e)}
                                        />
                                        <label
                                          for="helper-radio-4"
                                          class="font-medium ml-2 text-xs  peer-checked:text-black  font-Poppins-Regular text-[#98A2B3]"
                                        >
                                          <div>{item.name}</div>
                                        </label>
                                      </div>
                                    </div>
                                  </li>
                                ))}
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
                                  checked={analyz.emergency == true}
                                  onChange={handleChangeEmerGency}
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
                                  checked={analyz.emergency == false}
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
                            onChange={handleChangeNotes}
                            value={analyz.notes}
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
                            class={`font-Poppins-Medium w-full justify-between text-xs ${
                              AnalysisType === "Analysis type"
                                ? "text-[#98A2B3]"
                                : ""
                            }  border-[#E4E7EC]  h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl`}
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
                            class="hidden h-[15rem] overflow-y-scroll border-[#B7C835] border-[1px] rounded-b-xl border-t-0 z-10 w-[81%] sm:w-[86%] md:w-[89%] bg-white rounded divide-y divide-gray-100 shadow "
                          >
                            <ul
                              class="p-3 space-y-1 text-sm text-gray-700 "
                              aria-labelledby="dropdownRadioHelperButtonAnalysis"
                            >
                              {getSections &&
                                getSections.map((item) => (
                                  <li>
                                    <div class="flex border-b-[1px] items-center border-[#F2F4F7] p-2 rounded  justify-between ">
                                      <div class="flex flex-row-reverse justify-between w-full items-center h-5">
                                        {console.log(getSectionValue)}
                                        <input
                                          checked={
                                            getSectionValue == item.name ||
                                            false
                                          }
                                          id={item.id}
                                          name="helper-radio-Analysis"
                                          type="radio"
                                          onChange={(e) =>
                                            handleChangeSectionID(
                                              e,
                                              item.once,
                                              item.price_for_patient,
                                              item.price_for_lap,
                                              item.price_for_company
                                            )
                                          }
                                          // pattern={item.name}
                                          value={item.name}
                                          class=" w-[16.2px] peer h-[16.2px] cursor-pointer appearance-none border-[1px] checked:text-black border-gray-400 bg-clip-content p-[2px]  rounded-[50%]  checked:bg-[#B7C835] checked:border-[#B7C835]"
                                          onClick={(e) => AnalysisTypeFun(e)}
                                        />
                                        <label
                                          for="helper-radio-4"
                                          class="font-medium ml-2 text-xs  peer-checked:text-black  font-Poppins-Regular text-[#98A2B3]"
                                        >
                                          <div>
                                            {item.name || item.test_print_name}
                                          </div>
                                        </label>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>

                        <div
                          className={`${
                            analyz.section_id === null ? "hidden" : ""
                          } w-full lg:col-start-1 lg:col-end-3`}
                        >
                          <button
                            id="dropdownRadioHelperChildButton"
                            data-dropdown-toggle="dropdownRadioHelperChild"
                            class={`w-full justify-between text-xs ${
                              AnalysisChild === "Analysis Child"
                                ? "text-[#98A2B3]"
                                : ""
                            }  font-Poppins-Medium border-[#E4E7EC]  h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl`}
                            onClick={() => RadioListChild()}
                            type="button"
                          >
                            {/* <p
                              className={`${
                                CheckMulitChild.length > 0 ? "hidden" : "block"
                              }`}
                            > */}
                            {AnalysisChild}
                            {/* </p> */}

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
                              className="hidden   text-xs font-Poppins-Medium absolute top-[-0.5rem] bg-white left-[0.1rem]  px-1 text-[#B7C835] font-medium"
                            >
                              {t("Analysis  Child")}
                            </p>
                          </button>
                          <div
                            id="dropdownDefaultRadioChild"
                            class="hidden border-[#B7C835] font-Poppins-Regular border-[1px] rounded-b-xl border-t-0 z-10 w-[81%] sm:w-[86%] md:w-[89%] bg-white rounded divide-y divide-gray-100 shadow "
                          >
                            <ul
                              class="p-3 space-y-1 text-sm text-gray-700"
                              aria-labelledby="dropdownRadioHelperChildButton"
                            >
                              {!once &&
                                getChildAnalysis &&
                                getChildAnalysis.map((item) => (
                                  <li>
                                    <div class="flex p-2   ">
                                      <div class="flex flex-row-reverse justify-between w-full items-center h-5">
                                        <input
                                          checked={
                                            getAnalysisValue == item.name ||
                                            false
                                          }
                                          id={item.id}
                                          name="Radio-Child"
                                          size={item.price_for_lab}
                                          pattern={item.price_for_company}
                                          type="Radio"
                                          onChange={(e) =>
                                            handleChangeAnalysis(
                                              e,
                                              item.price_for_patient,
                                              item.price_for_lab,
                                              item.price_for_company,
                                              item.name
                                            )
                                          }
                                          title={item.name}
                                          value={item.name}
                                          class="w-[16.2px] peer h-[16.2px] cursor-pointer appearance-none border-[1px] checked:text-black border-gray-400 bg-clip-content p-[2px]  rounded-[50%]  checked:bg-[#B7C835] checked:border-[#B7C835]"
                                          onClick={(e) => CheckChild(e)}
                                        />
                                        <label
                                        
                                          for="child-Radio-4"
                                          class="font-medium ml-2 peer-checked:text-black font-Poppins-Medium text-[#98A2B3] text-xs"
                                        >
                                          <div>{item.name}</div>
                                        </label>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 lg:col-start-1 lg:col-end-3 gap-5 ">
                          <AnalysisIDContainer
                            nameOfAnalysis={nameOfAnalysis}
                            priceAnalysis={priceAnalysis}
                          />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 lg:col-start-1 lg:col-end-3 gap-5 ">
                          <div
                            id="AnalysisPriceContainer"
                            className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                            onClick={() => AnalysisPriceClicked()}
                          >
                            <input
                              id="AnalysisPriceInput"
                              value={analyz.price_analysis}
                              onChange={handleChangeAnalysisPrice}
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
                              value={analyz.paid_up}
                              onChange={handleChangePaidUp}
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
                              value={analyz.duo}
                              onChange={handleChangeDue}
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
                            // value={analyz.payment_method_id}
                            value={analyz.payment_method_id}
                            onChange={handleChangePayemntMethods}
                            placeholder="new"
                            name="PaymentType"
                            // onChange={() => PaymentTypeChanged()}
                            className="form-control w-full rounded-lg bg-[#F9FAFF] font-Poppins-Medium text-[#98A2B3] text-xs outline-none px-4 py-2 cursor-pointer"
                          >
                            <option selected value="0" id="0" className="">
                              Payment Type
                            </option>
                            {/* getPayemntMethods */}
                            {getPayemntMethods &&
                              getPayemntMethods.map((item) => (
                                <option
                                  key={item.id}
                                  value={item.id}
                                  className=""
                                >
                                  {item.name}
                                </option>
                              ))}
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
                            value={analyz.discount}
                            onChange={handleChangeDiscount}
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
                        <div className="flex justify-end lg:grid-cols-3 lg:col-start-1 lg:col-end-3 gap-5 ">
                          {/* <div>
                            <button
                              onClick={AddNew}
                              type="button"
                              className="flex   flex-grow py-1 px-3 font-Poppins-Medium text-sm  bg-[#B7C835] justify-center rounded-xl text-white"
                            >
                              {t("Add New")}
                            </button>
                          </div> */}

                          <div className="flex text-red-700">
                            ملاحظة:الرجاء الضغط على هذا الزر لإضافة بياناتك
                            لحفظها لاحقا
                            <button
                              onClick={handleSave}
                              type="button"
                              className="flex ml-2 flex-grow py-1 px-3 font-Poppins-Medium text-sm  bg-[#B7C835] justify-center rounded-xl text-white"
                            >
                              {t("Save")}
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 lg:col-start-1 lg:col-end-3 gap-5 mt-20">
                          {/* <AnalysisContainer sectionValue={sectionValue}/> */}

                          {arr.length > 0 &&
                            arr.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center mt-2"
                              >
                                <img
                                  src={profile}
                                  className="rounded-2xl w-[44px] h-[44px] mr-2"
                                />
                                <div className=" flex flex-col space-y-2">
                                  <p className="text-[#101828] font-Poppins-SemiBold text-sm ">
                                    {/* {item.notes} */}
                                    {console.log(sectionName)}
                                    {sectionName[index]}
                                  </p>
                                  <p className="text-[#98A2B3] font-Poppins-Medium text-xs">
                                    {console.log(nameAnalyz)}
                                    {nameAnalyz[index] != "-1"
                                      ? nameAnalyz[index]
                                      : ""}
                                    {/* Analytical flask type */}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 lg:col-start-1 lg:col-end-3 gap-5 mt-5">
                          <button
                            onClick={handleSendData}
                            type="button"
                            disabled={disableBtn}
                            className={`flex  flex-g row py-3 font-Poppins-Medium text-sm  ${
                              disableBtn ? "bg-gray-500" : "bg-[#B7C835]"
                            }  justify-center rounded-xl text-white`}
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

import React, { useEffect, useState } from "react";
import CultureReport from "./ClassAnalysis/CultureReport";
import Histopathology from "./ClassAnalysis/Histopathology";
import ManeReport from "./ClassAnalysis/ManeReport";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import { t } from "i18next";
import EditIntrputik from "./ClassAnalysis/Intrputik/EditIntrputik";
import DeleteIntrputik from "./ClassAnalysis/Intrputik/DeleteIntrputik";

import { useDispatch, useSelector } from "react-redux";
import {
  addAllIntrputik,
  addToIntrputik,
  selectIntrputiks,
} from "../../GlobalData/Analytic/IntrputikSlice";
import axios from "axios";
import {
  addAllManeReport,
  selectManeReports,
} from "../../GlobalData/Analytic/ManeReportSlice";
import {
  addAllCultureReport,
  selectCultureReports,
} from "../../GlobalData/Analytic/CultureReportSlice";
import { getAnalaytics } from "../../GlobalData/Analytic/AnalayticSlice";
import swal from "sweetalert";
import { addAllAnalysis } from "../../GlobalData/Analytic/AnalysisSlice";
import { useFetcher } from "react-router-dom";

function Intrputik({ show }) {
  const [ClassAnalysis, SetClassAnalysis] = useState("");
  const [intrputik, SetIntrputik] = useState(false);
  const [OpenEditIntrputik, setOpenEditIntrputik] = useState(false);
  const [OpenDeleteIntrputik, setOpenDeleteIntrputik] = useState(false);
  const [Ready, setReady] = useState(true);
  const [histopathology, setHistopathology] = useState("");
  const [OpenResult, SetOpenResult] = useState(false);
  const ManeReportSelector = useSelector(selectManeReports);
  const CultureReportSelector = useSelector(selectCultureReports);
  const IntrputikSelector = useSelector(selectIntrputiks);

  const dispatch = useDispatch();
  const [id, SetId] = useState(0);
  const [getData, setgetData] = useState(false);

  const getSections = async (page) => {
    await axios.get(`lab-scope/get-sections`).then((response) => {
      console.log(response.data);
      dispatch(addAllAnalysis(response.data));
    });
  };

  const [formData, setFormData] = useState({
    once: 1,
    test_code: "",
    test_print_name: "",
    price_for_patient: "",
    price_for_lap: "",
    price_for_company: "",
    test_method_id: -1,
    test_unit_id: -1,
    class_report: "",
    tupe_id: -1,
  });

  const [error, setError] = useState({
    once: "",
    test_code: "",
    test_print_name: "",
    price_for_patient: "",
    price_for_lap: "",
    price_for_company: "",
    test_method_id: "",
    test_unit_id: "",
    class_report: "",
    tupe_id: "",
  });
  const [errorName, setErrorName] = useState("");
  const [errorTestCode, setErrorTestCode] = useState("");
  const [errorPriceForPatient, setErrorPriceForPatient] = useState("");
  const [errorPriceForLap, setErrorPriceForLap] = useState("");
  const [errorPriceForCompany, setErrorPriceForCompany] = useState("");
  const [errorTestMethod, setErrorTestMethod] = useState("");
  const [errorTestUnit, setErrorTestUnit] = useState("");
  const [errorTupe, setErrorTupe] = useState("");

  const [getTestMethods, setGetTestMethods] = useState();
  const [getTupe, setGetTupe] = useState();
  const [getTestUnits, setsetGetTestUnits] = useState();
  const [subjectTitle, setSubjectTitle] = useState("");
  const [getGenders, setGetGenders] = useState("");
  const [interputikError, setInterputikError] = useState("");
  const [MError, setMError] = useState("");
  const [HError, setHError] = useState("");
  const [Cerror, setCError] = useState("");

  useEffect(() => {
    axios
      .get(`lab-scope/get-TestMethods`)
      .then((res) => {
        console.log(res);
        setGetTestMethods(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`lab-scope/getTupes`)
      .then((res) => {
        console.log(res);
        setGetTupe(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`lab-scope/get-TestUnits`)
      .then((res) => {
        console.log(res);
        setsetGetTestUnits(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`lab-scope/genders`)
      .then((res) => {
        console.log(res);
        setGetGenders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const AddToTableIntrputik = () => {
    let Data = {
      id: IntrputikSelector.length + 1,
      name: document.getElementById("IntrputikName").value,
    };

    if (!Data.name) {
      document
        .getElementById("Intrputik_Redux_error")
        .classList.remove("invisible");
    } else {
      document
        .getElementById("Intrputik_Redux_error")
        .classList.add("invisible");
    }
    if (Data.name) {
      dispatch(addToIntrputik(Data));
      setSubjectTitle("");
    }
    console.log(IntrputikSelector);
  };
  const DeleteIntrputiks = (id) => {
    SetId(id);
    setOpenDeleteIntrputik(true);
  };
  const EditIntrputiks = (id) => {
    SetId(id);
    setOpenEditIntrputik(true);
  };

  const ClassAnalysisChange = (e) => {
    let select = document.getElementById("ClassAnalysis");
    let value = select.options[select.selectedIndex].value;
    SetClassAnalysis(value);
    if (
      document
        .getElementById("ClassAnalysis")
        .classList.contains("text-[#98A2B3]")
    ) {
      document
        .getElementById("ClassAnalysis")
        .classList.remove("text-[#98A2B3]");
    }
  };
  const IntrputikChange = () => {
    if (intrputik === true) {
      SetIntrputik(false);
    } else if (intrputik !== true) {
      SetIntrputik(true);
    }
    if (
      document.getElementById("intrputikDiv").classList.contains("bg-white")
    ) {
      document.getElementById("intrputikDiv").classList.remove("bg-white");
      document
        .getElementById("intrputikText")
        .classList.remove("text-[#101828]");

      document.getElementById("intrputikDiv").classList.add("bg-[#B7C835]");
      document.getElementById("intrputikText").classList.add("text-white");
    } else if (
      !document.getElementById("intrputikDiv").classList.contains("bg-white")
    ) {
      document.getElementById("intrputikDiv").classList.remove("bg-[#B7C835]");
      document.getElementById("intrputikText").classList.remove("text-white");

      document.getElementById("intrputikDiv").classList.add("bg-white");
      document.getElementById("intrputikText").classList.add("text-[#101828]");
    }
  };

  const handleChangeTupeID = (e) => {
    if (
      document.getElementById("IntakeTube").classList.contains("text-[#98A2B3]")
    ) {
      console.log("color");
      document.getElementById("IntakeTube").classList.remove("text-[#98A2B3]");
    }
    setFormData({
      ...formData,
      tupe_id: e.target.value,
    });
    dispatch(getAnalaytics(formData));
  };
  const handleChangeTestUnitID = (e) => {
    if (
      document
        .getElementById("test_unit_id")
        .classList.contains("text-[#98A2B3]")
    ) {
      document
        .getElementById("test_unit_id")
        .classList.remove("text-[#98A2B3]");
    }
    setFormData({
      ...formData,
      test_unit_id: e.target.value,
    });
    dispatch(getAnalaytics(formData));
  };
  const handleSubject = (e) => {
    setSubjectTitle(e.target.value);
  };

  // const handleClick = () => {
  //   console.log(arrayOfSubject);
  //   arrayOfSubject.push(subjectTitle);
  // };
  const handleChangeName = (e) => {
    setFormData(e.target.value);
    dispatch(getAnalaytics(formData));
  };
  // const handleClick = async () => {
  //   await axios
  //     .post(`admin-scope/create-section`, {})
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // setError(err.response.data.message)
  //     });
  // };
  const handleChangeTestCode = (e) => {
    setFormData({
      ...formData,
      test_code: e.target.value,
    });
    dispatch(getAnalaytics(formData));
  };
  const handleChangeTestPrintName = (e) => {
    setFormData({
      ...formData,
      test_print_name: e.target.value,
    });
    dispatch(getAnalaytics(formData));
  };
  const handleChangeTestMethodID = (e) => {
    if (
      document
        .getElementById("test_method_id")
        .classList.contains("text-[#98A2B3]")
    ) {
      document
        .getElementById("test_method_id")
        .classList.remove("text-[#98A2B3]");
    }
    setFormData({
      ...formData,
      test_method_id: e.target.value,
    });
    dispatch(getAnalaytics(formData));
  };

  const handleChangePriceForPatient = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setFormData({
        ...formData,
        price_for_patient: e.target.value,
      });
      dispatch(getAnalaytics(formData));
    }
  };
  const handleChangePriceForLap = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setFormData({
        ...formData,
        price_for_lap: e.target.value,
      });
    }
  };
  const handleChangePriceForCompany = (e) => {
    console.log(histopathology);
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setFormData({
        ...formData,
        price_for_company: e.target.value,
      });
      dispatch(getAnalaytics(formData));
    }
  };
  const handleChangeClassReport = (e) => {
    ClassAnalysisChange();
    document.getElementById("ClassMessage").classList.add("invisible");
    setFormData({
      ...formData,
      class_report: e.target.value,
    });
    dispatch(getAnalaytics(formData));
  };

  const Save = () => {
    console.log(IntrputikSelector);
    let Intrputik = [];
    for (let i = 0; i < IntrputikSelector.length; i++) {
      Intrputik[i] = IntrputikSelector[i].name;
    }
    //     Histopathology
    // Mane report
    // Culture report
    if (ClassAnalysis === "Histopathology") {
      setReady(false);
      axios
        .post("lab-scope/create-section", {
          once: 1,
          test_code: formData.test_code,
          test_print_name: formData.test_print_name,
          price_for_patient: formData.price_for_patient,
          price_for_lap: formData.price_for_lap,
          price_for_company: formData.price_for_company,
          test_method_id: formData.test_method_id,
          test_unit_id: formData.test_unit_id,
          hsitopology: [{ text: histopathology }],
          tupe_id: formData.tupe_id,
          antibiotic: 1,
          subject: Intrputik,
        })
        .then((res) => {
          SetOpenResult(true);
          setHistopathology("");
          dispatch(addAllIntrputik([]));
          setReady(true);
          setHError("");
          dispatch(getAnalaytics([]));
          setFormData({
            once: 1,
            test_code: "",
            test_print_name: "",
            price_for_patient: "",
            price_for_lap: "",
            price_for_company: "",
            test_method_id: -1,
            test_unit_id: -1,
            class_report: "",
            tupe_id: -1,
          });
          getSections();
          setErrorName("");

          setErrorTestCode("");
          setErrorPriceForPatient("");
          setErrorPriceForLap("");
          setErrorPriceForCompany("");
          setErrorTestMethod("");
          setErrorTestUnit("");
          setErrorTupe("");
          setInterputikError("");
          console.log(res);
        })
        .catch((err) => {
          setReady(true);
          const array = err.response.data.errors;
          if (array["hsitopology.0.text"]) {
            setHError(array["hsitopology.0.text"][0]);
          }

          if (err.response.data.errors.test_print_name) {
            setErrorName(err.response.data.errors.test_print_name[0]);
          } else {
            setErrorName("");
          }
          if (err.response.data.errors.test_code) {
            setErrorTestCode(err.response.data.errors.test_code[0]);
          } else {
            setErrorTestCode("");
          }
          if (err.response.data.errors.price_for_patient) {
            setErrorPriceForPatient(
              err.response.data.errors.price_for_patient[0]
            );
          } else {
            setErrorPriceForPatient("");
          }
          if (err.response.data.errors.price_for_lap) {
            setErrorPriceForLap(err.response.data.errors.price_for_lap[0]);
          } else {
            setErrorPriceForLap("");
          }
          if (err.response.data.errors.price_for_company) {
            setErrorPriceForCompany(
              err.response.data.errors.price_for_company[0]
            );
          } else {
            setErrorPriceForCompany("");
          }
          if (err.response.data.errors.test_method_id) {
            setErrorTestMethod(err.response.data.errors.test_method_id[0]);
          } else {
            setErrorTestMethod("");
          }
          if (err.response.data.errors.test_unit_id) {
            setErrorTestUnit(err.response.data.errors.test_unit_id[0]);
          } else {
            setErrorTestUnit("");
          }
          if (err.response.data.errors.tupe_id) {
            setErrorTupe(err.response.data.errors.tupe_id[0]);
          } else {
            setErrorTupe("");
          }
          if (err.response.data.errors.subject) {
            setInterputikError(err.response.data.errors.subject);
          } else {
            setInterputikError("");
          }
          swal("Oh noes!", `${err.response.data.message}`, "error");
        });
    }
    if (ClassAnalysis === "ManeReport") {
      setReady(false);

      axios
        .post("lab-scope/create-section", {
          once: 1,
          tupe_id: formData.tupe_id,
          test_code: formData.test_code,
          test_print_name: formData.test_print_name,
          price_for_patient: formData.price_for_patient,
          price_for_lap: formData.price_for_lap,
          price_for_company: formData.price_for_company,
          test_method_id: formData.test_method_id,
          test_unit_id: formData.test_unit_id,
          mane_report: ManeReportSelector,
          antibiotic: 1,
          subject: Intrputik,
        })
        .then((res) => {
          SetOpenResult(true);
          getSections();
          dispatch(getAnalaytics([]));
          dispatch(addAllIntrputik([]));
          dispatch(addAllManeReport([]));
          setReady(true);

          setMError("");
          setFormData({
            once: 1,
            test_code: "",
            test_print_name: "",
            price_for_patient: "",
            price_for_lap: "",
            price_for_company: "",
            test_method_id: -1,
            test_unit_id: -1,
            class_report: "",
            tupe_id: -1,
          });
          setErrorName("");

          setErrorTestCode("");
          setErrorPriceForPatient("");
          setErrorPriceForLap("");
          setErrorPriceForCompany("");
          setErrorTestMethod("");
          setErrorTestUnit("");
          setErrorTupe("");
          setInterputikError("");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          const array = err.response.data.errors;
          if (array["mane_report"]) setMError(array["mane_report"][0]);

          setReady(true);

          if (err.response.data.errors.test_print_name) {
            setErrorName(err.response.data.errors.test_print_name[0]);
          } else {
            setErrorName("");
          }
          if (err.response.data.errors.test_code) {
            setErrorTestCode(err.response.data.errors.test_code[0]);
          } else {
            setErrorTestCode("");
          }
          if (err.response.data.errors.price_for_patient) {
            setErrorPriceForPatient(
              err.response.data.errors.price_for_patient[0]
            );
          } else {
            setErrorPriceForPatient("");
          }
          if (err.response.data.errors.price_for_lap) {
            setErrorPriceForLap(err.response.data.errors.price_for_lap[0]);
          } else {
            setErrorPriceForLap("");
          }
          if (err.response.data.errors.price_for_company) {
            setErrorPriceForCompany(
              err.response.data.errors.price_for_company[0]
            );
          } else {
            setErrorPriceForCompany("");
          }
          if (err.response.data.errors.test_method_id) {
            setErrorTestMethod(err.response.data.errors.test_method_id[0]);
          } else {
            setErrorTestMethod("");
          }
          if (err.response.data.errors.test_unit_id) {
            setErrorTestUnit(err.response.data.errors.test_unit_id[0]);
          } else {
            setErrorTestUnit("");
          }
          if (err.response.data.errors.tupe_id) {
            setErrorTupe(err.response.data.errors.tupe_id[0]);
          } else {
            setErrorTupe("");
          }
          if (err.response.data.errors.subject) {
            setInterputikError(err.response.data.errors.subject);
          } else {
            setInterputikError("");
          }
          swal("Oh noes!", `${err.response.data.message}`, "error");
        });
    }
    if (ClassAnalysis === "CultureReport") {
      setReady(false);

      axios
        .post("lab-scope/create-section", {
          once: 1,
          tupe_id: formData.tupe_id,
          test_code: formData.test_code,
          test_print_name: formData.test_print_name,
          price_for_patient: formData.price_for_patient,
          price_for_lap: formData.price_for_lap,
          price_for_company: formData.price_for_company,
          test_method_id: formData.test_method_id,
          test_unit_id: formData.test_unit_id,
          culture_report: CultureReportSelector,
          antibiotic: 1,
          subject: Intrputik,
        })
        .then((res) => {
          SetOpenResult(true);
          dispatch(addAllIntrputik([]));
          dispatch(addAllCultureReport([]));
          setReady(true);

          getSections();
          setCError("");
          dispatch(getAnalaytics([]));
          setErrorName("");

          setErrorTestCode("");
          setErrorPriceForPatient("");
          setErrorPriceForLap("");
          setErrorPriceForCompany("");
          setErrorTestMethod("");
          setErrorTestUnit("");
          setErrorTupe("");

          setInterputikError("");
          setFormData({
            once: 1,
            test_code: "",
            test_print_name: "",
            price_for_patient: "",
            price_for_lap: "",
            price_for_company: "",
            test_method_id: -1,
            test_unit_id: -1,
            class_report: "",
            tupe_id: -1,
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          const array = err.response.data.errors;

          if (array["culture_report"]) {
            setCError(array["culture_report"][0]);
          }
          setReady(true);

          if (err.response.data.errors.test_print_name) {
            setErrorName(err.response.data.errors.test_print_name[0]);
          } else {
            setErrorName("");
          }
          if (err.response.data.errors.test_code) {
            setErrorTestCode(err.response.data.errors.test_code[0]);
          } else {
            setErrorTestCode("");
          }
          if (err.response.data.errors.price_for_patient) {
            setErrorPriceForPatient(
              err.response.data.errors.price_for_patient[0]
            );
          } else {
            setErrorPriceForPatient("");
          }
          if (err.response.data.errors.price_for_lap) {
            setErrorPriceForLap(err.response.data.errors.price_for_lap[0]);
          } else {
            setErrorPriceForLap("");
          }
          if (err.response.data.errors.price_for_company) {
            setErrorPriceForCompany(
              err.response.data.errors.price_for_company[0]
            );
          } else {
            setErrorPriceForCompany("");
          }
          if (err.response.data.errors.test_method_id) {
            setErrorTestMethod(err.response.data.errors.test_method_id[0]);
          } else {
            setErrorTestMethod("");
          }
          if (err.response.data.errors.test_unit_id) {
            setErrorTestUnit(err.response.data.errors.test_unit_id[0]);
          } else {
            setErrorTestUnit("");
          }
          if (err.response.data.errors.tupe_id) {
            setErrorTupe(err.response.data.errors.tupe_id[0]);
          } else {
            setErrorTupe("");
          }
          if (err.response.data.errors.subject) {
            setInterputikError(err.response.data.errors.subject);
          } else {
            setInterputikError("");
          }
          swal("Oh noes!", `${err.response.data.message}`, "error");
        });
    }
    if (ClassAnalysis.length === 0)
      document.getElementById("ClassMessage").classList.remove("invisible");
  };

  return (
    <div className={`${show ? "block" : "hidden"}`}>
      <div
        id="intrputikDiv"
        className="bg-white  w-fit  flex items-center justify-center px-5 py-3 rounded-lg cursor-pointer "
        onClick={() => IntrputikChange()}
      >
        <p
          id="intrputikText"
          className="text-sm flex items-center justify-center text-[#101828] font-Poppins-Regular"
        >
          {t("intrputik")}
        </p>
      </div>

      <div className={`mt-7`}>
        <div className="grid grid-cols-2 gap-5">
          <div className="w-full">
            <div className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4     relative m-auto border-[1px] rounded-xl ">
              <input
                name="CheckCode"
                value={formData.test_code}
                onChange={handleChangeTestCode}
                placeholder={t("Test code")}
                type="text"
                className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#98A2B3] text-black outline-0 ring-0"
              />
            </div>
            <span className="text-center flex justify-center items-center ml-1 text-red-600 text-xs font-Poppins-Regular">
              {errorTestCode}
            </span>
          </div>
          <div className="w-full">
            <div className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4     relative m-auto border-[1px] rounded-xl ">
              <input
                name="ExaminationName"
                value={formData.test_print_name}
                onChange={handleChangeTestPrintName}
                placeholder={t("Test name in print")}
                type="text"
                className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#98A2B3] text-black outline-0 ring-0"
              />
            </div>
            <span className=" ml-1 text-center flex justify-center items-center text-red-600 text-xs font-Poppins-Regular">
              {errorName}
            </span>
          </div>
          <div className="w-full">
            <div className="w-full pr-2 py-1 bg-[#F9FAFF] rounded-xl flex border-[1px] border-[#E4E7EC]  items-center mr-5">
              <select
                id="test_method_id"
                onChange={handleChangeTestMethodID}
                placeholder="Examination method"
                className={` w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Regular  ${
                  formData.test_method_id === -1
                    ? "text-[#98A2B3]"
                    : "text-black"
                } text-xs  outline-none px-4 py-2 cursor-pointer`}
              >
                <option
                  selected={formData.test_method_id === -1}
                  disabled
                  hidden
                >
                  {t("Test Method")}
                </option>
                {getTestMethods &&
                  getTestMethods.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.test_method}
                    </option>
                  ))}
              </select>
            </div>
            <span className="text-center flex justify-center items-center ml-1 text-red-600 text-xs font-Poppins-Regular">
              {errorTestMethod}
            </span>
          </div>
          <div className="w-full">
            <div className="w-full pr-2 py-1 bg-[#F9FAFF] rounded-xl flex border-[1px] border-[#E4E7EC]  items-center mr-5">
              <select
                id="IntakeTube"
                onChange={handleChangeTupeID}
                className={` w-full    rounded-lg bg-[#F9FAFF]   font-Poppins-Regular ${
                  formData.tupe_id === -1 ? "text-[#98A2B3]" : "text-black"
                } text-xs  outline-none px-4 py-2 cursor-pointer`}
              >
                <option selected={formData.tupe_id === -1} disabled hidden>
                  {t("Type of Tupe")}
                </option>
                {getTupe &&
                  getTupe.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.tupe}
                    </option>
                  ))}
              </select>
            </div>
            <span className="text-center flex justify-center items-center ml-1 text-red-600 text-xs font-Poppins-Regular">
              {errorTupe}
            </span>
          </div>
          <div className="w-full">
            <div className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4   relative m-auto border-[1px] rounded-xl ">
              <input
                name="ExaminationPrice"
                value={formData.price_for_patient}
                onChange={handleChangePriceForPatient}
                placeholder={t("Test price")}
                type="text"
                className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#98A2B3] text-black outline-0 ring-0"
              />
            </div>
            <span className=" text-center flex justify-center items-center ml-1 text-red-600 text-xs font-Poppins-Regular">
              {errorPriceForPatient}
            </span>
          </div>
          <div className="w-full">
            <div className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4     relative m-auto border-[1px] rounded-xl ">
              <input
                value={formData.price_for_lap}
                name="LabExaminationPrice"
                onChange={handleChangePriceForLap}
                placeholder={t("Laboratory Test price")}
                type="text"
                className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#98A2B3] text-black outline-0 ring-0"
              />
            </div>
            <span className="text-center flex justify-center items-center ml-1 text-red-600 text-xs font-Poppins-Regular">
              {errorPriceForLap}
            </span>
          </div>
          <div className="w-full">
            <div className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4     relative m-auto border-[1px] rounded-xl ">
              <input
                value={formData.price_for_company}
                name="ExaminationPriceCompanies"
                onChange={handleChangePriceForCompany}
                placeholder={t("Test price for companies")}
                type="text"
                className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#98A2B3] text-black outline-0 ring-0"
              />
            </div>
            <span className="text-center flex justify-center items-center ml-1 text-red-600 text-xs font-Poppins-Regular">
              {errorPriceForCompany}
            </span>
          </div>
          <div className="w-full">
            <div className="w-full pr-2 py-1 bg-[#F9FAFF] rounded-xl flex border-[1px] border-[#E4E7EC]  items-center mr-5">
              <select
                id="test_unit_id"
                onChange={handleChangeTestUnitID}
                className={` w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Regular  ${
                  formData.test_unit_id === -1 ? "text-[#98A2B3]" : "text-black"
                } text-xs  outline-none px-4 py-2 cursor-pointer`}
              >
                <option selected={formData.test_unit_id === -1} disabled hidden>
                  {t("Test Unit")}
                </option>
                {getTestUnits &&
                  getTestUnits.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.unit}
                    </option>
                  ))}
              </select>
            </div>
            <span className="text-center flex justify-center items-center ml-1 text-red-600 text-xs font-Poppins-Regular">
              {errorTestUnit}
            </span>
          </div>
          <div className="w-full col-start-1 col-end-3">
            <div className="w-full pr-2 py-1 bg-[#F9FAFF] rounded-xl flex border-[1px] border-[#E4E7EC]  items-center mr-5 ">
              <select
                id="ClassAnalysis"
                className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Regular  text-[#98A2B3] text-xs  outline-none px-4 py-2 cursor-pointer"
                onChange={handleChangeClassReport}
              >
                <option value="" selected disabled hidden className="">
                  {t("Class analysis")}
                </option>
                <option value="Histopathology">Histopathology</option>
                <option value="ManeReport">Mane report</option>
                <option value="CultureReport">Culture report</option>
              </select>
            </div>
            <span
              id="ClassMessage"
              className="invisible ml-1 text-red-600 text-xs font-Poppins-Regular"
            >
              {"Please Enter a Class Analysis"}
            </span>
          </div>
          <div className="mb-5 col-start-1 col-end-3">
            <Histopathology
              setError={setError}
              setErrorName={setErrorName}
              setErrorTupe={setErrorTupe}
              setErrorTestCode={setErrorTestCode}
              setErrorPriceForPatient={setErrorPriceForPatient}
              setErrorPriceForLap={setErrorPriceForLap}
              setErrorPriceForCompany={setErrorPriceForCompany}
              setErrorTestMethod={setErrorTestMethod}
              setErrorTestUnit={setErrorTestUnit}
              error={error}
              setHError={setHError}
              HError={HError}
              histopathology={histopathology}
              setHistopathology={setHistopathology}
              setFormData={setFormData}
              formData={formData}
              type={ClassAnalysis}
              intrputik={intrputik}
            />
            <ManeReport
              setError={setError}
              setErrorName={setErrorName}
              setErrorTupe={setErrorTupe}
              setErrorTestCode={setErrorTestCode}
              setErrorPriceForPatient={setErrorPriceForPatient}
              setErrorPriceForLap={setErrorPriceForLap}
              setErrorPriceForCompany={setErrorPriceForCompany}
              setErrorTestMethod={setErrorTestMethod}
              setErrorTestUnit={setErrorTestUnit}
              getGenders={getGenders}
              setMError={setMError}
              MError={MError}
              setFormData={setFormData}
              formData={formData}
              type={ClassAnalysis}
              intrputik={intrputik}
            />
            <CultureReport
              setError={setError}
              setErrorName={setErrorName}
              setErrorTupe={setErrorTupe}
              setErrorTestCode={setErrorTestCode}
              setErrorPriceForPatient={setErrorPriceForPatient}
              setErrorPriceForLap={setErrorPriceForLap}
              setErrorPriceForCompany={setErrorPriceForCompany}
              setErrorTestMethod={setErrorTestMethod}
              setErrorTestUnit={setErrorTestUnit}
              setCError={setCError}
              Cerror={Cerror}
              setFormData={setFormData}
              formData={formData}
              type={ClassAnalysis}
              intrputik={intrputik}
            />
          </div>
        </div>
      </div>

      <div
        className={`${
          intrputik ? "block" : "hidden"
        } col-start-1 col-end-3 mt-10 mb-10`}
      >
        <EditIntrputik
          id={id}
          open={OpenEditIntrputik}
          setOpen={setOpenEditIntrputik}
        />
        <DeleteIntrputik
          id={id}
          open={OpenDeleteIntrputik}
          setOpen={setOpenDeleteIntrputik}
        />
        <div className="flex w-full justify-start space-x-10 col-start-1 col-end-3">
          <div className="w-full">
            <div className="border-[#E4E7EC] w-[50%] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4  relative border-[1px] rounded-xl ">
              <input
                id="IntrputikName"
                onChange={handleSubject}
                value={subjectTitle}
                placeholder={t("Intrputik name")}
                type="text"
                className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#98A2B3] text-black outline-0 ring-0"
              />
            </div>
            <span
              id="Intrputik_Redux_error"
              className="invisible ml-1 text-red-600 text-xs font-Poppins-Regular"
            >
              {"Please Enter the Name"}
            </span>
          </div>
          <div
            onClick={() => AddToTableIntrputik()}
            className=" bg-[#0D2135] w-fit  md:w-[34%] h-fit  flex items-center justify-center lg:px-4  py-2 rounded-xl cursor-pointer "
          >
            <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
              {t("Add to table")}
            </p>
          </div>
        </div>

        <table className="w-full h-full mt-5  bg-white  rounded-2xl col-start-1 col-end-3 ">
          <tr className="border-b-[1px] w-full">
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-1 pl-8 w-[85%]">
              {t("name")}
            </td>
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-1 w-[15%]">
              {t("Action")}
            </td>
          </tr>
          {IntrputikSelector &&
            IntrputikSelector.map((intr) => (
              <tr className="border-b-[1px] w-full">
                <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-1 pl-8 ">
                  {intr.name}
                </td>
                <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-1 ">
                  <div className="flex space-x-2 ">
                    <TiEdit
                      className="text-2xl  opacity-50 cursor-pointer"
                      onClick={() => EditIntrputiks(intr.id)}
                    />
                    <IoTrashOutline
                      className="text-2xl text-[#F04438] cursor-pointer"
                      onClick={() => DeleteIntrputiks(intr.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
        </table>
        <span className="text-center flex justify-center items-center lg:justify-start lg:items-start ml-1 text-red-600 text-xs font-Poppins-Regular">
          {interputikError}
        </span>
        <div className=" flex justify-end space-x-8 mt-8 col-start-1 col-end-4">
          <div className="bg-[#F04438] border-[1px] border-[#D0D5DD] w-fit  flex items-center justify-center px-5 lg:px-16 py-2 rounded-xl cursor-pointer ">
            <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
              {t("Delete")}
            </p>
          </div>
          <div
            onClick={() => Save()}
            className={`${
              Ready ? "bg-[#B7C835]" : "bg-gray-600"
            }  w-fit  flex items-center justify-center px-5 lg:px-28 py-3 rounded-xl cursor-pointer `}
          >
            <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
              {t("Save")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intrputik;

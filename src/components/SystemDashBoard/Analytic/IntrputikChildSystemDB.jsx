import React, { useEffect, useState } from "react";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import HistopathologySystemDB from "./Class Analysis/HistopathologySystemDB";
import ManeReportSystemDB from "./Class Analysis/ManeReportSystemDB";
import CultureReportSystemDB from "./Class Analysis/CultureReportSystemDB";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllDBIntrputik,
  addToDBIntrputik,
  selectDBIntrputiks,
} from "../../../GlobalData/SystemDashBoard/IntrputikSDBSlice";
import EditIntrputikSDB from "./Class Analysis/IntrputikSDB/EditIntrputikSDB";
import DeleteIntrputikSDB from "./Class Analysis/IntrputikSDB/DeleteIntrputikSDB";
import axios from "axios";
import {
  addAllDBManeReport,
  selectDBManeReports,
} from "../../../GlobalData/SystemDashBoard/ManeReportSDBSlice";
import {
  addAllDBCultureReport,
  selectDBCultureReports,
} from "../../../GlobalData/SystemDashBoard/CultureReportSDBSlice";

import { getAnalayticChild } from "../../../GlobalData/SystemDashBoard/analayticChild";
import swal from "sweetalert";
import { selectErrorDBChilds } from "../../../GlobalData/SystemDashBoard/ErrorHandleChildDBSlice";
import ManeReportChildSystemDB from "./Class Analysis/ManeReportChildSystemDB";
import CultureReportChildSystemDB from "./Class Analysis/CultureReportChildSystemDB";
import HistopathologyChildSystemDB from "./Class Analysis/HistopathologyChildSystemDB";

function IntrputikChildSystemDB({ show, ide }) {
  {
    /* u have to get the Examination method and intake tube from api  to put them in the drop down*/
    /* formData i pust some of the input values inside it , but we need the values of Examination method and  intake tube*/
  }
  const [MError, setMError] = useState("");
  const [HError, setHError] = useState("");
  const [Cerror, setCError] = useState("");

  const [histopathology, setHistopathology] = useState("");
  const ManeReportSelector = useSelector(selectDBManeReports);
  const CultureReportSelector = useSelector(selectDBCultureReports);
  const IntrputikSelector = useSelector(selectDBIntrputiks);
  const dispatch = useDispatch();
  const [ClassAnalysis, SetClassAnalysis] = useState("");

  const [intrputik, SetIntrputik] = useState(false);
  const [id, SetId] = useState(0);
  const [OpenEditIntrputik, setOpenEditIntrputik] = useState(false);
  const [OpenDeleteIntrputik, setOpenDeleteIntrputik] = useState(false);
  const [getData, setgetData] = useState(false);
  const [MethodList, setMethodList] = useState();
  const [UnitList, setUnitList] = useState();
  const [Value, setValue] = useState();
  const [NormalRange, setNormalRange] = useState();
  const [subjectTitleChild, setSubjectTitleChild] = useState("");
  const [interputikError, setInterputikError] = useState("");

  const arrayOfSubject = [];
  // let formData = new FormData();
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
  const getErrors = useSelector(selectErrorDBChilds);

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
  const [getGenders, setsetGetGenders] = useState();

  const getManeReport = useSelector(selectDBManeReports);
  useEffect(() => {
    axios
      .get(`admin-scope/get-TestMethods`)
      .then((res) => {
        console.log(res);
        setGetTestMethods(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`admin-scope/tupes`)
      .then((res) => {
        setGetTupe(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`admin-scope/get-TestUnits`)
      .then((res) => {
        setsetGetTestUnits(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`admin-scope/get-genders`)
      .then((res) => {
        setsetGetGenders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [Data, SetData] = useState();
  const AddToTableIntrputik = () => {
    let Data = {
      id: IntrputikSelector.length + 1,
      name: document.getElementById("IntrputikNameChild").value,
    };

    if (!Data.name) {
      document
        .getElementById("Intrputik_Redux_error_Child")
        .classList.remove("invisible");
    } else {
      document
        .getElementById("Intrputik_Redux_error_Child")
        .classList.add("invisible");
    }
    if (Data.name) {
      dispatch(addToDBIntrputik(Data));
      setSubjectTitleChild("");
    }
    console.log(Data);
  };
  const DeleteIntrputik = (id) => {
    SetId(id);
    setOpenDeleteIntrputik(true);
  };
  const EditIntrputik = (id) => {
    SetId(id);
    setOpenEditIntrputik(true);
  };

  const ClassAnalysisChange = (e) => {
    let select = document.getElementById("ClassAnalysisC");
    let value = select.options[select.selectedIndex].value;
    SetClassAnalysis(value);
    console.log(value);
    if (
      document
        .getElementById("ClassAnalysisC")
        .classList.contains("text-[#98A2B3]")
    ) {
      document
        .getElementById("ClassAnalysisC")
        .classList.remove("text-[#98A2B3]");
    }

    let unit = document.getElementById("test_unit_id");
    let Unitvalue = unit.options[unit.selectedIndex].value;

    let method = document.getElementById("test_method_id");
    let Methodvalue = method.options[method.selectedIndex].value;
    // formData.append("once", 1);
    // formData.append("test_code", document.getElementById("test_code").value);
    // formData.append("test_unit_id", Unitvalue);
    // formData.append("test_method_id", Methodvalue);
    // formData.append(
    //   "test_print_name",
    //   document.getElementById("test_print_name").value
    // );
    // formData.append(
    //   "price_for_patient",
    //   document.getElementById("price_for_patient").value
    // );
    // formData.append(
    //   "price_for_lap",
    //   document.getElementById("price_for_lap").value
    // );
    // formData.append(
    //   "price_for_company",
    //   document.getElementById("price_for_company").value
    // );
  };

  const IntrputikChangeSub = () => {
    if (intrputik === true) {
      SetIntrputik(false);
    } else if (intrputik !== true) {
      SetIntrputik(true);
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
      console.log("dklfjsdlkfjsdklfjsdlkfjsdlksj");
      document.getElementById("intrputikDiv").classList.remove("bg-white");
      document.getElementById("intrputikDiv");
      console.log(document.getElementById("intrputikDiv").classList);
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

  const handleSubject = (e) => {
    setSubjectTitleChild(e.target.value);
  };

  // const handleClick = () => {
  //   console.log(arrayOfSubject);
  //   arrayOfSubject.push(subjectTitle);
  // };
  const handleChangeName = (e) => {
    // setFormData(e.target.value)
    dispatch(getAnalayticChild(formData));
  };
  // const handleClick = async () => {
  //   console.log(Data);
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
    dispatch(getAnalayticChild(formData));
  };
  const handleChangeTestPrintName = (e) => {
    setFormData({
      ...formData,
      test_print_name: e.target.value,
    });
    dispatch(getAnalayticChild(formData));
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
    dispatch(getAnalayticChild(formData));
  };
  const handleChangeTupeID = (e) => {
    if (
      document.getElementById("IntakeTube").classList.contains("text-[#98A2B3]")
    ) {
      document.getElementById("IntakeTube").classList.remove("text-[#98A2B3]");
    }
    setFormData({
      ...formData,
      tupe_id: e.target.value,
    });
    dispatch(getAnalayticChild(formData));
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
    dispatch(getAnalayticChild(formData));
  };
  const handleChangePriceForPatient = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setFormData({
        ...formData,
        price_for_patient: e.target.value,
      });
      dispatch(getAnalayticChild(formData));
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
      dispatch(getAnalayticChild(formData));
    }
  };
  const handleChangeClassReport = (e) => {
    ClassAnalysisChange();
    setFormData({
      ...formData,
      class_report: e.target.value,
    });
    dispatch(getAnalayticChild(formData));
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
    if (ClassAnalysis === "Histopathology")
      axios
        .post("admin-scope/create-analyzSection", {
          once: 1,
          section_id: ide,
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
          dispatch(getAnalayticChild([]));
          dispatch(addAllDBIntrputik([]));
          setHistopathology("");
          setHError("");

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
          // dispatch(getErrors());
          const array = err.response.data.errors;
          if (array["hsitopology.0.text"]) {
            setHError(array["hsitopology.0.text"][0]);
          }

          setErrorName(err.response.data.errors.test_print_name[0]);

          setErrorTestCode(err.response.data.errors.test_code[0]);
          setErrorPriceForPatient(
            err.response.data.errors.price_for_patient[0]
          );
          setErrorPriceForLap(err.response.data.errors.price_for_lap[0]);
          setErrorPriceForCompany(
            err.response.data.errors.price_for_company[0]
          );
          setErrorTestMethod(err.response.data.errors.test_method_id[0]);
          setErrorTestUnit(err.response.data.errors.test_unit_id[0]);
          setErrorTupe(err.response.data.errors.tupe_id[0]);
          setInterputikError(err.response.data.errors.subject);
          swal("Oh noes!", `${err.response.data.message}`, "error");
        });
    if (ClassAnalysis === "ManeReport")
      axios
        .post("admin-scope/create-analyzSection", {
          once: 1,
          section_id: ide,
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
          dispatch(getAnalayticChild([]));
          dispatch(addAllDBIntrputik([]));
          dispatch(addAllDBManeReport([]));
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
          const array = err.response.data.errors;
          if (array["mane_report"]) setMError(array["mane_report"][0]);

          console.log(err);
          setErrorName(err.response.data.errors.test_print_name[0]);

          setErrorTestCode(err.response.data.errors.test_code[0]);
          setErrorPriceForPatient(
            err.response.data.errors.price_for_patient[0]
          );
          setErrorPriceForLap(err.response.data.errors.price_for_lap[0]);
          setErrorPriceForCompany(
            err.response.data.errors.price_for_company[0]
          );
          setErrorTestMethod(err.response.data.errors.test_method_id[0]);
          setErrorTestUnit(err.response.data.errors.test_unit_id[0]);
          setErrorTupe(err.response.data.errors.tupe_id[0]);
          setInterputikError(err.response.data.errors.subject);
          swal("Oh noes!", `${err.response.data.message}`, "error");
        });
    if (ClassAnalysis === "CultureReport")
      axios
        .post("admin-scope/create-analyzSection", {
          once: 1,
          section_id: ide,
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
          dispatch(getAnalayticChild([]));
          dispatch(addAllDBIntrputik([]));
          dispatch(addAllDBCultureReport([]));
          setCError("");

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
          const array = err.response.data.errors;

          if (array["culture_report"]) {
            setCError(array["culture_report"][0]);
          }
          console.log(err);
          setErrorName(err.response.data.errors.test_print_name[0]);

          setErrorTestCode(err.response.data.errors.test_code[0]);
          setErrorPriceForPatient(
            err.response.data.errors.price_for_patient[0]
          );
          setErrorPriceForLap(err.response.data.errors.price_for_lap[0]);
          setErrorPriceForCompany(
            err.response.data.errors.price_for_company[0]
          );
          setErrorTestMethod(err.response.data.errors.test_method_id[0]);
          setErrorTestUnit(err.response.data.errors.test_unit_id[0]);
          setErrorTupe(err.response.data.errors.tupe_id[0]);
          setInterputikError(err.response.data.errors.subject);
          swal("Oh noes!", `${err.response.data.message}`, "error");
        });
  };
  return (
    <div className={`${show ? "block" : "hidden"}`}>
      <EditIntrputikSDB
        open={OpenEditIntrputik}
        setOpen={setOpenEditIntrputik}
        id={id}
      />
      <DeleteIntrputikSDB
        open={OpenDeleteIntrputik}
        setOpen={setOpenDeleteIntrputik}
        id={id}
      />

      <div className={`w-full flex space-x-5 justify-between mb-5 mt-10 pr-1`}>
        <div
          id="intrputikDivSub"
          className={` ${
            intrputik ? "bg-[#B7C835]" : "bg-white"
          }  w-fit  flex items-center justify-center px-5 py-3 rounded-lg cursor-pointer `}
          onClick={() => IntrputikChangeSub()}
        >
          <p
            id="intrputikTextSub"
            className={`text-sm ${
              intrputik ? "text-white" : "text-[#101828]"
            } flex items-center justify-center  font-Poppins-Regular`}
          >
            intrputik
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" />
          <label className="font-Poppins-Regular text-black text-xs">
            Single Print
          </label>
        </div>
      </div>
      <div className={`   mt-7`}>
        <div className="grid grid-cols-2 gap-3">
          <div className="w-full">
            <div className="flex-col space-y-1 border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4     relative m-auto border-[1px] rounded-xl ">
              <input
                id="test_code"
                onChange={handleChangeTestCode}
                value={formData.test_code}
                placeholder="Test code"
                type="text"
                className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#707070] outline-0 ring-0"
              />
            </div>
            <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
              {errorTestCode}
            </span>
          </div>
          <div className="w-full">
            <div className="flex-col space-y-1 border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4     relative m-auto border-[1px] rounded-xl ">
              <input
                id="test_print_name"
                value={formData.test_print_name}
                onChange={handleChangeTestPrintName}
                placeholder="Test name in print"
                type="text"
                className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#707070] outline-0 ring-0"
              />
            </div>
            <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
              {errorName}
            </span>
          </div>

          <div className="w-full">
            <div className="flex-col space-y-1 w-full pr-2 py-1 bg-[#F9FAFF] rounded-xl flex border-[1px] border-[#E4E7EC]  items-center mr-5">
              <select
                id="test_method_id"
                onChange={handleChangeTestMethodID}
                placeholder="Examination method"
                className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Regular  text-[#98A2B3] text-xs  outline-none px-4 py-2 cursor-pointer"
              >
                <option
                  selected={formData.test_method_id === -1}
                  disabled
                  hidden
                >
                  Test Method
                </option>
                {getTestMethods &&
                  getTestMethods.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.test_method}
                    </option>
                  ))}
              </select>
            </div>
            <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
              {errorTestMethod}
            </span>
          </div>
          <div className="w-full">
            <div className="flex-col space-y-1 w-full pr-2 py-1 bg-[#F9FAFF] rounded-xl flex border-[1px] border-[#E4E7EC]  items-center mr-5">
              <select
                id="IntakeTube"
                onChange={handleChangeTupeID}
                className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Regular  text-[#98A2B3] text-xs  outline-none px-4 py-2 cursor-pointer"
              >
                <option selected={formData.tupe_id === -1} disabled hidden>
                  Type of Tupe
                </option>
                {getTupe &&
                  getTupe.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.tupe}
                    </option>
                  ))}
              </select>
            </div>
            <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
              {errorTupe}
            </span>
          </div>
          <div className="w-full">
            <div className="flex-col space-y-1 border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4   relative m-auto border-[1px] rounded-xl ">
              <input
                value={formData.price_for_patient}
                id="price_for_patient"
                onChange={handleChangePriceForPatient}
                placeholder="Test price"
                type="text"
                className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#707070] outline-0 ring-0"
              />
            </div>
            <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
              {errorPriceForPatient}
            </span>
          </div>
          <div className="w-full">
            <div className="flex-col space-y-1 border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4     relative m-auto border-[1px] rounded-xl ">
              <input
                id="price_for_lap"
                value={formData.price_for_lap}
                onChange={handleChangePriceForLap}
                placeholder="Laboratory Test price"
                type="text"
                className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#707070] outline-0 ring-0"
              />
            </div>
            <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
              {errorPriceForLap}
            </span>
          </div>

          <div className="w-full">
            <div className="flex-col space-y-1 border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4     relative m-auto border-[1px] rounded-xl ">
              <input
                id="price_for_company"
                value={formData.price_for_company}
                onChange={handleChangePriceForCompany}
                placeholder="Test price for companies"
                type="text"
                className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#707070] outline-0 ring-0"
              />
            </div>
            <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
              {errorPriceForCompany}
            </span>
          </div>
          <div className="w-full">
            <div className="w-full flex-col space-y-1 pr-2 py-1 bg-[#F9FAFF] rounded-xl flex border-[1px] border-[#E4E7EC]  items-center mr-5">
              <select
                id="test_unit_id"
                onChange={handleChangeTestUnitID}
                className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Regular  text-[#98A2B3] text-xs  outline-none px-4 py-2 cursor-pointer"
              >
                <option selected={formData.test_unit_id === -1} disabled hidden>
                  Test Unit
                </option>
                {getTestUnits &&
                  getTestUnits.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.unit}
                    </option>
                  ))}
              </select>
            </div>
            <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
              {errorTestUnit}
            </span>
          </div>
          <div className="w-full pr-2 py-1 bg-[#F9FAFF] rounded-xl flex border-[1px] border-[#E4E7EC]  items-center mr-5 col-start-1 col-end-3">
            <select
              id="ClassAnalysisC"
              className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Regular  text-[#98A2B3] text-xs  outline-none px-4 py-2 cursor-pointer"
              onChange={handleChangeClassReport}
            >
              <option value="" selected disabled hidden className="">
                Class analysis
              </option>
              <option value="Histopathology">Histopathology</option>
              <option value="ManeReport">Mane report</option>
              <option value="CultureReport">Culture report</option>
            </select>
          </div>
          <div className="mb-5 col-start-1 col-end-3">
            <HistopathologyChildSystemDB
              setHistopathology={setHistopathology}
              histopathology={histopathology}
              type={ClassAnalysis}
              ide={ide}
              setHError={setHError}
              setFormData={setFormData}
              formData={formData}
              setError={setError}
              intrputik={intrputik}
              getData={getData}
              setValue={setValue}
            />
            <ManeReportChildSystemDB
              getGenders={getGenders}
              ide={ide}
              setError={setError}
              type={ClassAnalysis}
              formData={formData}
              setMError={setMError}
              MError={MError}
              setFormData={setFormData}
              intrputik={intrputik}
            />
            <CultureReportChildSystemDB
              ide={ide}
              setCError={setCError}
              Cerror={Cerror}
              setError={setError}
              type={ClassAnalysis}
              formData={formData}
              setFormData={setFormData}
              setNormalRange={setNormalRange}
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
        <div className="flex  w-full justify-start space-x-10 col-start-1 col-end-3">
          <div className="w-full">
            <div className="flex-col space-y-1 border-[#E4E7EC] w-[50%] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4  relative border-[1px] rounded-xl ">
              <input
                id="IntrputikNameChild"
                onChange={handleSubject}
                value={subjectTitleChild}
                placeholder="subject title"
                type="text"
                className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#707070] outline-0 ring-0"
              />
            </div>
            <span
              id="Intrputik_Redux_error_Child"
              className="invisible ml-1 text-red-600 text-xs font-Poppins-Regular"
            >
              {"Please Enter the Name"}
            </span>
          </div>
          <div
            className=" bg-[#0D2135] h-fit w-[34%]  flex items-center justify-center  px-2 lg:px-14  py-2 rounded-xl cursor-pointer "
            onClick={() => AddToTableIntrputik()}
          >
            <p
              // onClick={handleClick}
              className="text-sm flex items-center justify-center text-white font-Poppins-Regular"
            >
              Add to table
            </p>
          </div>
        </div>

        <table className="w-full h-full mt-5  bg-white  rounded-2xl col-start-1 col-end-3 ">
          <tr className="border-b-[1px] w-full">
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-1 pl-8 w-[85%]">
              name
            </td>
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-1 w-[15%]">
              Action
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
                      onClick={() => EditIntrputik(intr.id)}
                    />
                    <IoTrashOutline
                      className="text-2xl text-[#F04438] cursor-pointer"
                      onClick={() => DeleteIntrputik(intr.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
        </table>
        <span className="invisible ml-1 text-red-600 text-xs font-Poppins-Regular">
          {interputikError}
        </span>
        <div className=" flex justify-end space-x-8 mt-8 col-start-1 col-end-4">
          <div className="bg-[#F04438] border-[1px] border-[#D0D5DD] w-fit  flex items-center justify-center px-5 lg:px-16 py-2 rounded-xl cursor-pointer ">
            <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
              Delete
            </p>
          </div>
          <div
            className="bg-[#B7C835] w-fit  flex items-center justify-center px-5 lg:px-28 py-3 rounded-xl cursor-pointer "
            onClick={() => Save()}
          >
            <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
              Save
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntrputikChildSystemDB;

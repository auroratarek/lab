import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import { t } from "i18next";
import EditManeReport from "./ManeReport/EditManeReport";
import DeleteManeReport from "./ManeReport/DeleteManeReport";
import {
  addAllManeReport,
  addToManeReport,
  selectManeReports,
} from "../../../GlobalData/Analytic/ManeReportSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getAnalayticChilds,
  selectAnalayticChilds,
} from "../../../GlobalData/Analytic/AnalayticChildSlice";
import axios from "axios";
import { addAllAnalysis } from "../../../GlobalData/Analytic/AnalysisSlice";

function ManeReportChild({
  setError,
  getGenders,
  ide,
  setErrorName,
  setErrorTupe,
  setErrorTestCode,
  setErrorPriceForPatient,
  setErrorPriceForLap,
  setErrorPriceForCompany,
  setErrorTestMethod,
  setErrorTestUnit,
  setFormData,
  formData,
  type,
  intrputik,
  MError,
  setMError,
}) {
  const [OpenEditManeReport, setOpenEditManeReport] = useState(false);
  const [OpenDeleteManeReport, setOpenDeleteManeReport] = useState(false);
  const [Ready, setReady] = useState(true);
  const ManeReportSelector = useSelector(selectManeReports);
  const dispatch = useDispatch();
  const [id, SetId] = useState(0);
  const [text, setText] = useState("");

  const getAnalaytic = useSelector(selectAnalayticChilds);
  const [genderChild, setGenderChild] = useState(-1);

  const [high, setHigh] = useState("");
  const [low, setLow] = useState("");

  const Save = async (e) => {
    // e.preventDefault();
    console.log(getAnalaytic);
    setReady(false);
    await axios
      .post(`lab-scope/create-analyzForSection`, {
        section_id: ide,
        once: formData.once,
        test_code: formData.test_code,
        test_print_name: formData.test_print_name,
        price_for_patient: formData.price_for_patient,
        price_for_lap: formData.price_for_lap,
        price_for_company: formData.price_for_company,
        test_method_id: formData.test_method_id,
        test_unit_id: formData.test_unit_id,
        tupe_id: formData.tupe_id,
        mane_report: ManeReportSelector,
        antibiotic: 0,
      })
      .then((res) => {
        console.log(res);
        getSections();
        setReady(true);

        dispatch(getAnalayticChilds([]));
        dispatch(addAllManeReport([]));
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
      })
      .catch((err) => {
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
        // dispatch(getErrors());
      });
  };
  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  const Edit = (id) => {
    SetId(id);
    setOpenEditManeReport(true);
  };
  const Delete = (id) => {
    SetId(id);
    setOpenDeleteManeReport(true);
  };
  const getSections = async (page) => {
    await axios.get(`lab-scope/get-sections`).then((response) => {
      console.log(response.data);
      dispatch(addAllAnalysis(response.data));
    });
  };
  const AddNormal = () => {
    let select = document.getElementById("Gender_Child");
    let value = select.options[select.selectedIndex].value;
    let ID = select.options[select.selectedIndex].id;

    let Data = {
      id: ManeReportSelector.length + 1,
      normal_range: text,
      gender: ID,
      gender_name: value,
      h: document.getElementById("High_Child").value,
      l: document.getElementById("Low_Child").value,
    };
    if (!Data.h) {
      document.getElementById("High_error_Child").classList.remove("invisible");
    } else {
      document.getElementById("High_error_Child").classList.add("invisible");
    }
    if (!Data.l) {
      document.getElementById("Low_error_Child").classList.remove("invisible");
    } else {
      document.getElementById("Low_error_Child").classList.add("invisible");
    }
    if (!Data.gender) {
      document
        .getElementById("Gender_error_Child")
        .classList.remove("invisible");
    } else {
      document.getElementById("Gender_error_Child").classList.add("invisible");
    }
    if (!Data.normal_range) {
      document
        .getElementById("normal_range_error_Child")
        .classList.remove("invisible");
    } else {
      document
        .getElementById("normal_range_error_Child")
        .classList.add("invisible");
    }
    console.log(value);
    if (Data.gender && Data.l && Data.h && Data.normal_range) {
      dispatch(addToManeReport(Data));
      setText("");
      setHigh("");
      setLow("");
      setGenderChild(-1);
    }
  };
  const handleChangeGender = (e) => {
    if (
      document
        .getElementById("Gender_Child")
        .classList.contains("text-[#98A2B3]")
    ) {
      document
        .getElementById("Gender_Child")
        .classList.remove("text-[#98A2B3]");
    }
    setGenderChild(e.target.value);
  };

  const handleChangeHigh = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setHigh(e.target.value);
    }
  };

  const handleChangeLow = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setLow(e.target.value);
    }
  };
  return (
    <div
      className={`${
        type === "ManeReport" ? "block" : "hidden"
      } col-start-1 col-end-3`}
    >
      <EditManeReport
        getGenders={getGenders}
        id={id}
        open={OpenEditManeReport}
        setOpen={setOpenEditManeReport}
      />
      <DeleteManeReport
        id={id}
        open={OpenDeleteManeReport}
        setOpen={setOpenDeleteManeReport}
      />
      <div className="w-full">
        <div className="col-start-1 col-end-3">
          <textarea
            onChange={handleChangeText}
            value={text}
            placeholder={t("Normal range")}
            className="bg-[#F9FAFF] border-[#E4E7EC] w-full h-fit text-xs  flex space-x-2 items-center py-3 px-4 outline-0 ring-0   relative m-auto border-[1px] rounded-xl "
            rows={5}
          />
        </div>
        <span
          id="normal_range_error_Child"
          className="invisible ml-1 text-red-600 text-xs font-Poppins-Regular"
        >
          {"Please Enter the Normal Range"}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        <div className="w-full">
          <div className="w-full pr-2 py-1 bg-[#F9FAFF] rounded-xl flex border-[1px] border-[#E4E7EC]  items-center mr-5">
            <select
              id="Gender_Child"
              onChange={handleChangeGender}
              className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Regular  text-[#98A2B3] text-xs  outline-none px-4 py-2 cursor-pointer"
            >
              <option
                value=""
                selected={genderChild === -1}
                disabled
                hidden
                className=""
              >
                {t("Gender")}
              </option>
              {getGenders &&
                getGenders.map((item) => (
                  <option key={item.id} id={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <span
            id="Gender_error_Child"
            className="invisible ml-1 text-red-600 text-xs font-Poppins-Regular"
          >
            {"Please Enter the Gender"}
          </span>
        </div>
        <div className="w-full">
          <div className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4   relative m-auto border-[1px] rounded-xl ">
            <input
              value={high}
              onChange={handleChangeHigh}
              id="High_Child"
              placeholder={t("H")}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
            />
          </div>
          <span
            id="High_error_Child"
            className="invisible ml-1 text-red-600 text-xs font-Poppins-Regular"
          >
            {"Please Enter the High"}
          </span>
        </div>
        <div className="w-full">
          <div className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4     relative m-auto border-[1px] rounded-xl ">
            <input
              value={low}
              onChange={handleChangeLow}
              id="Low_Child"
              placeholder={t("L")}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
            />
          </div>
          <span
            id="Low_error_Child"
            className="invisible ml-1 text-red-600 text-xs font-Poppins-Regular"
          >
            {"Please Enter the Low"}
          </span>
        </div>
        <div
          onClick={() => AddNormal()}
          className="col-start-3 col-end-4 bg-[#0D2135]  h-fit  flex items-center justify-center lg:px-14 w-full py-2 rounded-xl cursor-pointer "
        >
          <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
            {t("Add normal")}
          </p>
        </div>

        <table className="w-full h-full mt-5  bg-white  rounded-2xl col-start-1 col-end-4 ">
          <tr className="border-b-[1px] w-full">
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-8 w-[30%]">
              {t("Gender")}
            </td>
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2  w-[30%]">
              {t("H")}
            </td>
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2  w-[30%]">
              {t("L")}
            </td>
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[10%]">
              {t("Action")}
            </td>
          </tr>
          {ManeReportSelector
            ? ManeReportSelector.map((Report) => (
                <tr className="border-b-[1px] w-full">
                  <td className="text-base text-[#101828] font-semibold font-Poppins-Regular py-2 pl-8 ">
                    {Report.gender_name}
                  </td>
                  <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-2 ">
                    {Report.h}
                  </td>
                  <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-2  ">
                    {Report.l}
                  </td>
                  <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-2 ">
                    <div className="flex space-x-2 ">
                      <TiEdit
                        className="text-2xl  opacity-50 cursor-pointer"
                        onClick={() => Edit(Report.id)}
                      />
                      <IoTrashOutline
                        className="text-2xl text-[#F04438] cursor-pointer"
                        onClick={() => Delete(Report.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            : "Loading"}
        </table>
        <span className="test-xs text-red-600">{MError}</span>
        <div
          className={`${
            intrputik ? " hidden" : "flex"
          }  justify-end space-x-8 mt-8 col-start-1 col-end-4`}
        >
          <div className="bg-[#F04438] border-[1px] border-[#D0D5DD] w-fit  flex items-center justify-center  px-5 lg:px-16 py-2 rounded-xl cursor-pointer ">
            <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
              {t("Delete")}
            </p>
          </div>
          <div
            onClick={() => Save()}
            className={`${
              Ready ? "bg-[#B7C835]" : "bg-gray-600"
            } w-fit  flex items-center justify-center px-5 lg:px-28 py-3 rounded-xl cursor-pointer `}
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

export default ManeReportChild;

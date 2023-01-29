import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllDBManeReport,
  addToDBManeReport,
  selectDBManeReports,
} from "../../../../GlobalData/SystemDashBoard/ManeReportSDBSlice";
import EditReportSDB from "./ManeReportSDB/EditReportSDB";
import { removeFromTupe } from "../../../../GlobalData/SystemDashBoard/TupeSlice";
import DeleteReportSDB from "./ManeReportSDB/DeleteReportSDB";
import axios from "axios";
import swal from "sweetalert";
import { useFetcher } from "react-router-dom";
import { selectErrorDBChilds } from "../../../../GlobalData/SystemDashBoard/ErrorHandleChildDBSlice";
import { addAllDBAnalysis } from "../../../../GlobalData/SystemDashBoard/AnalysisSBDSlice";
import { getAnalaytic } from "../../../../GlobalData/SystemDashBoard/analaytic";

function ManeReportSystemDB({
  getGenders,
  setFormData,
  type,
  ide,
  setErrorName,
  setErrorTupe,
  setErrorTestCode,
  setErrorPriceForPatient,
  setErrorPriceForLap,
  setErrorPriceForCompany,
  setErrorTestMethod,
  setErrorTestUnit,
  setError,
  formData,
  intrputik,
  setMError,
  MError,
}) {
  const getAnalaytics = useSelector((state) => state.analaytic.analaytic);
  {
    /* i was trying to make stateMangment for the table here  but if we have the intrputick get show u have to hide the div that has the buttons here*/
    /* the Save will be from the interputik div if the interputik shown */
  }
  const ManeReportSelector = useSelector(selectDBManeReports);
  const dispatch = useDispatch();
  const [OpenEditReport, SetOpenEditReport] = useState(false);
  const [OpenDeleteReport, SetOpenDeleteReport] = useState(false);
  const [id, SetId] = useState(0);
  const [text, setText] = useState("");
  const getErrors = useSelector(selectErrorDBChilds);
  const [gender, setGender] = useState(-1);
  const [Ready, SetReady] = useState(true);

  const [high, setHigh] = useState("");
  const [low, setLow] = useState("");

  const getSections = async (page) => {
    await axios.get(`admin-scope/sections?page=${page}`).then((response) => {
      dispatch(addAllDBAnalysis(response.data));
    });
  };
  const Save = async (e) => {
    // e.preventDefault();
    SetReady(false);
    await axios
      .post(`admin-scope/create-section`, {
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
        antibiotic:0,
      })
      .then((res) => {
        console.log(res);
        setText("");
        setMError("");
        SetReady(true);
        dispatch(getAnalaytic([]));
        dispatch(addAllDBManeReport([]));

        setErrorName("");

        setErrorTestCode("");
        setErrorPriceForPatient("");
        setErrorPriceForLap("");
        setErrorPriceForCompany("");
        setErrorTestMethod("");
        setErrorTestUnit("");
        setErrorTupe("");
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
        getSections(1);
      })
      .catch((err) => {
        // dispatch(getErrors());
        const array = err.response.data.errors;
        if (array["mane_report"]) setMError(array["mane_report"][0]);

        SetReady(true);

        setErrorName(err.response.data.errors.test_print_name[0]);

        setErrorTestCode(err.response.data.errors.test_code[0]);
        setErrorPriceForPatient(err.response.data.errors.price_for_patient[0]);
        setErrorPriceForLap(err.response.data.errors.price_for_lap[0]);
        setErrorPriceForCompany(err.response.data.errors.price_for_company[0]);
        setErrorTestMethod(err.response.data.errors.test_method_id[0]);
        setErrorTestUnit(err.response.data.errors.test_unit_id[0]);
        setErrorTupe(err.response.data.errors.tupe_id[0]);
        swal("Oh noes!", `${err.response.data.message}`, "error");
      });
  };
  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  const Edit = (id) => {
    SetId(id);
    SetOpenEditReport(true);
  };
  const Delete = (id) => {
    SetId(id);
    SetOpenDeleteReport(true);
  };

  const AddNormal = () => {
    let select = document.getElementById("Gender");
    let value = select.options[select.selectedIndex].value;
    let ID = select.options[select.selectedIndex].id;

    let Data = {
      id: ManeReportSelector.length + 1,
      normal_range: text,
      gender: ID,
      gender_name: value,
      h: document.getElementById("High").value,
      l: document.getElementById("Low").value,
    };
    if (!Data.h) {
      document.getElementById("High_error").classList.remove("invisible");
    } else {
      document.getElementById("High_error").classList.add("invisible");
    }
    if (!Data.l) {
      document.getElementById("Low_error").classList.remove("invisible");
    } else {
      document.getElementById("Low_error").classList.add("invisible");
    }
    if (!Data.gender) {
      document.getElementById("Gender_error").classList.remove("invisible");
    } else {
      document.getElementById("Gender_error").classList.add("invisible");
    }
    if (!Data.normal_range) {
      document
        .getElementById("normal_range_error")
        .classList.remove("invisible");
    } else {
      document.getElementById("normal_range_error").classList.add("invisible");
    }
    console.log(Data);
    if (Data.gender && Data.l && Data.h && Data.normal_range) {
      dispatch(addToDBManeReport(Data));
      setHigh("");
      setLow("");
      setText("");
      setGender(-1);
    }
  };
  const handleChangeGender = (e) => {
    if (
      document.getElementById("Gender").classList.contains("text-[#98A2B3]")
    ) {
      document.getElementById("Gender").classList.remove("text-[#98A2B3]");
    }
    setGender(e.target.value);
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
      <EditReportSDB
        open={OpenEditReport}
        getGenders={getGenders}
        setOpen={SetOpenEditReport}
        id={id}
      />
      <DeleteReportSDB
        open={OpenDeleteReport}
        setOpen={SetOpenDeleteReport}
        id={id}
      />
      <div className="w-full">
        <div className="col-start-1 col-end-3">
          <textarea
            onChange={handleChangeText}
            value={text}
            placeholder="Normal range"
            className="bg-[#F9FAFF] border-[#E4E7EC] w-full h-fit text-xs  flex space-x-2 items-center py-3 px-4 outline-0 ring-0   relative m-auto border-[1px] rounded-xl "
            rows={5}
          />
        </div>
        <span
          id="normal_range_error"
          className="invisible ml-1 text-red-600 text-xs font-Poppins-Regular"
        >
          {"Please Enter the Normal Range"}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        <div className="w-full">
          <div className="w-full pr-2 py-1 bg-[#F9FAFF] rounded-xl flex border-[1px] border-[#E4E7EC]  items-center mr-5">
            <select
              id={`Gender`}
              className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Regular  text-[#98A2B3] text-xs  outline-none px-4 py-2 cursor-pointer"
              onChange={handleChangeGender}
            >
              <option
                value=""
                selected={gender === -1}
                disabled
                hidden
                className=""
              >
                Gender
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
            id="Gender_error"
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
              id="High"
              placeholder="H"
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#707070] outline-0 ring-0"
            />
          </div>
          <span
            id="High_error"
            className="invisible ml-1 text-red-600 text-xs font-Poppins-Regular"
          >
            {"Please Enter the High"}
          </span>
        </div>
        <div className="w-full">
          <div className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4     relative m-auto border-[1px] rounded-xl ">
            <input
              id="Low"
              value={low}
              onChange={handleChangeLow}
              placeholder="L"
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#707070] outline-0 ring-0"
            />
          </div>
          <span
            id="Low_error"
            className="invisible ml-1 text-red-600 text-xs font-Poppins-Regular"
          >
            {"Please Enter the Low"}
          </span>
        </div>

        <div
          className="col-start-3 col-end-4 bg-[#0D2135]   flex items-center justify-center  lg:px-14 w-full py-2 rounded-xl cursor-pointer "
          onClick={() => AddNormal()}
        >
          <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
            Add normal
          </p>
        </div>

        <table className="w-full h-full mt-5  bg-white  rounded-2xl col-start-1 col-end-4 ">
          <tr className="border-b-[1px] w-full">
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-8 w-[30%]">
              Gender
            </td>
            <td
              onke
              className="text-sm text-[#98A2B3] font-Poppins-Regular py-2  w-[30%]"
            >
              H
            </td>
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2  w-[30%]">
              L
            </td>
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[10%]">
              Action
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
        <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
          {MError}
        </span>
        <div
          className={`${
            intrputik ? "hidden" : "flex"
          }  flex justify-end space-x-8 mt-8 col-start-1 col-end-4`}
        >
          <div className="bg-[#F04438] border-[1px] border-[#D0D5DD] w-fit  flex items-center justify-center px-5 lg:px-16 py-2 rounded-xl cursor-pointer ">
            <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
              Delete
            </p>
          </div>
          <div
            className={`${
              Ready ? "bg-[#B7C835]" : "bg-gray-600"
            } w-fit  flex items-center justify-center px-5 lg:px-28 py-3 rounded-xl cursor-pointer `}
          >
            <p
              className="text-sm flex items-center justify-center text-white font-Poppins-Regular"
              onClick={() => Save()}
            >
              Save
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManeReportSystemDB;

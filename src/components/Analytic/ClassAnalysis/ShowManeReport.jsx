import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import { t } from "i18next";
import EditManeReport from "./ManeReport/EditManeReport";
import DeleteManeReport from "./ManeReport/DeleteManeReport";
import { useDispatch, useSelector } from "react-redux";
import {
  getAnalaytics,
  selectAnalytics,
} from "../../../GlobalData/Analytic/AnalayticSlice";
import axios from "axios";
import { addAllAnalysis } from "../../../GlobalData/Analytic/AnalysisSlice";
import {
  addAllEditManeReport,
  addToEditManeReport,
  selectEditManeReportSlices,
} from "../../../GlobalData/Analytic/EditManeReportSlice";
import EditShowManeReport from "./EditManeReport/EditShowManeReport";
import DeleteShowManeReport from "./EditManeReport/DeleteShowManeReport";

function ShowManeReport({
  ide,
  Relation,
  setError,
  setShow,
  getGenders,
  formData,
  setFormData,
  setErrorName,
  setErrorTupe,
  setErrorTestCode,
  setErrorPriceForPatient,
  setErrorPriceForLap,
  setErrorPriceForCompany,
  setErrorTestMethod,
  setErrorTestUnit,
  type,
  intrputik,
  MError,
  setMError,
}) {
  const [OpenEditManeReport, setOpenEditManeReport] = useState(false);
  const [OpenDeleteManeReport, setOpenDeleteManeReport] = useState(false);
  const ManeReportSelector = useSelector(selectEditManeReportSlices);
  const dispatch = useDispatch();
  const [Ready, setReady] = useState(true);
  const getSections = async (page) => {
    await axios.get(`lab-scope/get-sections`).then((response) => {
      console.log(response.data);
      dispatch(addAllAnalysis(response.data));
    });
  };
  const [id, SetId] = useState(0);
  const [text, setText] = useState("");
  const [gender, setGender] = useState(-1);

  const [high, setHigh] = useState("");
  const [low, setLow] = useState("");

  const Save = async (e) => {
    // e.preventDefault();
    if (Relation === "Parent") {
      setReady(false);
      console.log(ManeReportSelector);

      // lab-scope
      await axios
        .post(`lab-scope/update-MainAnalys?section_id=${ide}`, {
          once: 1,
          test_code: formData.test_code,
          mainAnalys: true,
          test_print_name: formData.test_print_name,
          price_for_patient: formData.price_for_patient,
          price_for_lap: formData.price_for_lap,
          price_for_company: formData.price_for_company,
          test_method_id: formData.test_method_id,
          test_unit_id: formData.test_unit_id,
          tupe_id: formData.tupe_id,
          antibiotic: 0,
          mane_report: ManeReportSelector,
        })
        .then((res) => {
          console.log(res);
          // dispatch(addAllEditManeReport([]));
          setReady(true);
          setShow(false);
          setMError("");
          getSections();
          // setFormData({
          //   once: 1,
          //   test_code: "",
          //   test_print_name: "",
          //   price_for_patient: "",
          //   price_for_lap: "",
          //   price_for_company: "",
          //   test_method_id: -1,
          //   test_unit_id: -1,
          //   class_report: "",
          //   tupe_id: -1,
          // });
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
    } else if (Relation === "Child") {
      setReady(false);
      console.log(ManeReportSelector);

      // lab-scope
      await axios
        .post(`lab-scope/update-MainAnalys?analys_id=${ide}`, {
          once: 1,
          test_code: formData.test_code,
          test_print_name: formData.test_print_name,
          price_for_patient: formData.price_for_patient,
          price_for_lap: formData.price_for_lap,
          price_for_company: formData.price_for_company,
          test_method_id: formData.test_method_id,
          test_unit_id: formData.test_unit_id,
          tupe_id: formData.tupe_id,
          antibiotic: 0,
          mane_report: ManeReportSelector,
        })
        .then((res) => {
          console.log(res);
          // dispatch(addAllEditManeReport([]));
          setReady(true);
          setShow(false);
          setMError("");
          getSections();
          // setFormData({
          //   once: 1,
          //   test_code: "",
          //   test_print_name: "",
          //   price_for_patient: "",
          //   price_for_lap: "",
          //   price_for_company: "",
          //   test_method_id: -1,
          //   test_unit_id: -1,
          //   class_report: "",
          //   tupe_id: -1,
          // });
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
    }
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

  const AddNormal = () => {
    let select = document.getElementById("ShowGender");
    let value = select.options[select.selectedIndex].value;
    let ID = select.options[select.selectedIndex].id;

    let Data = {
      id: ManeReportSelector.length + 1,
      gender: ID,
      normal_range: text,
      gender_name: value,
      h: document.getElementById("ShowHigh").value,
      l: document.getElementById("ShowLow").value,
    };
    if (!Data.h) {
      document.getElementById("ShowHigh_error").classList.remove("invisible");
    } else {
      document.getElementById("ShowHigh_error").classList.add("invisible");
    }
    if (!Data.l) {
      document.getElementById("ShowLow_error").classList.remove("invisible");
    } else {
      document.getElementById("ShowLow_error").classList.add("invisible");
    }
    if (!Data.gender) {
      document.getElementById("ShowGender_error").classList.remove("invisible");
    } else {
      document.getElementById("ShowGender_error").classList.add("invisible");
    }
    if (!Data.normal_range) {
      document
        .getElementById("Shownormal_range_error")
        .classList.remove("invisible");
    } else {
      document
        .getElementById("Shownormal_range_error")
        .classList.add("invisible");
    }
    console.log(value);
    if (Data.gender && Data.l && Data.h && Data.normal_range) {
      dispatch(addToEditManeReport(Data));
      setText("");
      setHigh("");
      setLow("");

      setGender(-1);
    }
  };
  const handleChangeGender = (e) => {
    if (
      document.getElementById("ShowGender").classList.contains("text-[#98A2B3]")
    ) {
      document.getElementById("ShowGender").classList.remove("text-[#98A2B3]");
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
      <EditShowManeReport
        getGenders={getGenders}
        id={id}
        open={OpenEditManeReport}
        setOpen={setOpenEditManeReport}
      />
      <DeleteShowManeReport
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
          id="Shownormal_range_error"
          className="invisible ml-1 text-red-600 text-xs font-Poppins-Regular"
        >
          {"Please Enter the Normal Range"}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        <div className="w-full">
          <div className="w-full pr-2 py-1 bg-[#F9FAFF] rounded-xl flex border-[1px] border-[#E4E7EC]  items-center mr-5">
            <select
              id="ShowGender"
              onChange={handleChangeGender}
              className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Regular  text-[#98A2B3] text-xs  outline-none px-4 py-2 cursor-pointer"
            >
              <option
                value=""
                selected={gender === -1}
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
            id="ShowGender_error"
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
              id="ShowHigh"
              placeholder={t("H")}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
            />
          </div>
          <span
            id="ShowHigh_error"
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
              id="ShowLow"
              placeholder={t("L")}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
            />
          </div>
          <span
            id="ShowLow_error"
            className="invisible ml-1 text-red-600 text-xs font-Poppins-Regular"
          >
            {"Please Enter the Low"}
          </span>
        </div>
        <div
          onClick={() => AddNormal()}
          className="col-start-3 col-end-4 bg-[#0D2135]   flex items-center justify-center lg:px-14 w-full py-2 rounded-xl cursor-pointer "
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
        <span className="text-sm text-red-600">{MError}</span>
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
          <button
            type="button"
            onClick={() => Save()}
            disabled={!Ready}
            className={`${
              Ready ? "bg-[#B7C835]" : "bg-gray-600"
            }  w-fit  flex items-center justify-center px-5 lg:px-28 py-3 rounded-xl cursor-pointer `}
          >
            <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
              {t("Update")}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowManeReport;

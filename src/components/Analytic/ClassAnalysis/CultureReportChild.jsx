import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import { t } from "i18next";
import EditCultureReport from "./CultureReport/EditCultureReport";
import DeleteCultureReport from "./CultureReport/DeleteCultureReport";
import {
  addAllCultureReport,
  addToCultureReport,
  selectCultureReports,
} from "../../../GlobalData/Analytic/CultureReportSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import swal from "sweetalert";
import {
  getAnalayticChilds,
  selectAnalayticChilds,
} from "../../../GlobalData/Analytic/AnalayticChildSlice";
import ManeReport from "./ManeReport";
import { addAllAnalysis } from "../../../GlobalData/Analytic/AnalysisSlice";
function CultureReportChild({
  setError,
  formData,
  ide,
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
  Cerror,
  setCError,
}) {
  const CultureReportSelector = useSelector(selectCultureReports);
  const dispatch = useDispatch();
  const [Ready, setReady] = useState(true);
  const [text, setText] = useState("");
  const [OpenEditCultureReport, setOpenEditCultureReport] = useState(false);
  const [OpenDeleteCultureReport, setOpenDeleteCultureReport] = useState(false);
  const getAnalaytic = useSelector(selectAnalayticChilds);
  const getSections = async (page) => {
    await axios.get(`lab-scope/get-sections`).then((response) => {
      console.log(response.data);
      dispatch(addAllAnalysis(response.data));
    });
  };
  const [id, SetId] = useState(0);
  const Edit = (id) => {
    SetId(id);
    setOpenEditCultureReport(true);
  };
  const Delete = (id) => {
    SetId(id);
    setOpenDeleteCultureReport(true);
  };
  const AddToTable = () => {
    let Data = {
      id: CultureReportSelector.length + 1,
      text: document.getElementById("subjectTitle_Child").value,
    };
    if (!Data.text) {
      document
        .getElementById("Title_error_Child")
        .classList.remove("invisible");
    } else {
      document.getElementById("Title_error_Child").classList.add("invisible");
    }
    if (Data.text) {
      dispatch(addToCultureReport(Data));
      setText("");
    }
  };
  const textChange = (e) => {
    setText(e.target.value);
  };
  const Save = (e) => {
    setReady(false);
    console.log(getAnalaytic);
    axios
      .post(`lab-scope/create-analyzForSection`, {
        once: formData.once,
        section_id: ide,

        test_code: formData.test_code,
        test_print_name: formData.test_print_name,
        price_for_patient: formData.price_for_patient,
        price_for_lap: formData.price_for_lap,
        price_for_company: formData.price_for_company,
        test_method_id: formData.test_method_id,
        test_unit_id: formData.test_unit_id,
        tupe_id: formData.tupe_id,
        antibiotic: 0,

        culture_report: CultureReportSelector,
      })
      .then((res) => {
        console.log(res);
        getSections();
        setReady(true);

        setCError("");
        setText("");
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
        dispatch(getAnalayticChilds([]));
        dispatch(addAllCultureReport([]));
        // setError("");
      })
      .catch((err) => {
        const array = err.response.data.errors;

        if (array["culture_report"]) {
          setCError(array["culture_report"][0]);
        }
        // dispatch(getErrors());
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
        swal("Oh noes!", `${err.response.data.message}`, "error");
      });
  };
  return (
    <div
      className={`${
        type === "CultureReport" ? "block" : "hidden"
      } col-start-1 col-end-3 mt-10 mb-10`}
    >
      <EditCultureReport
        id={id}
        open={OpenEditCultureReport}
        setOpen={setOpenEditCultureReport}
      />
      <DeleteCultureReport
        id={id}
        open={OpenDeleteCultureReport}
        setOpen={setOpenDeleteCultureReport}
      />
      <div className="flex w-full justify-start space-x-10 col-start-1 col-end-3">
        <div className="w-full">
          <div className="border-[#E4E7EC] w-[50%] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4  relative border-[1px] rounded-xl ">
            <input
              id="subjectTitle_Child"
              value={text}
              onChange={(e) => textChange(e)}
              placeholder={t("subject title")}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
            />
          </div>
          <span
            id="Title_error_Child"
            className="invisible ml-1 text-red-600 text-xs font-Poppins-Regular"
          >
            {"Please Enter Title"}
          </span>
        </div>
        <div
          onClick={() => AddToTable()}
          className=" bg-[#0D2135] w-[34%] h-fit  flex items-center justify-center lg:px-14  py-2 rounded-xl cursor-pointer "
        >
          <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
            {t("Add to table")}
          </p>
        </div>
      </div>

      <table className="w-full h-full mt-5  bg-white  rounded-2xl col-start-1 col-end-3 ">
        <tr className="border-b-[1px] w-full">
          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-1 pl-8 w-[85%]">
            {t("First entry box")}
          </td>
          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-1 w-[15%]">
            {t("Action")}
          </td>
        </tr>
        {CultureReportSelector
          ? CultureReportSelector.map((Report) => (
              <tr className="border-b-[1px] w-full">
                <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-1 pl-8 ">
                  {Report.text}
                </td>
                <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-1 ">
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
      <span className="text-sm text-red-600">{Cerror}</span>
      <div
        className={`${
          intrputik ? " hidden" : "flex"
        }  justify-end space-x-8 mt-8 col-start-1 col-end-3`}
      >
        <div className="bg-[#F04438] border-[1px] border-[#D0D5DD] w-fit  flex items-center justify-center px-5 lg:px-16 py-2 rounded-xl cursor-pointer ">
          <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
            {t("Delete")}
          </p>
        </div>
        <div
          onClick={() => Save()}
          className={`${
            Ready ? "bg-[#B7C835]" : "bg-gray-600"
          }  w-fit  flex items-center justify-center px-5  lg:px-28 py-3 rounded-xl cursor-pointer `}
        >
          <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
            {t("Save")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CultureReportChild;

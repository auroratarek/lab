import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllDBCultureReport,
  addToDBCultureReport,
  selectDBCultureReports,
} from "../../../../GlobalData/SystemDashBoard/CultureReportSDBSlice";
import EditCReportSDB from "./CultureReports/EditCReportSDB";
import DeleteCReportSDB from "./CultureReports/DeleteCReportSDB";
import axios from "axios";
import swal from "sweetalert";
import { selectDBErrors } from "../../../../GlobalData/SystemDashBoard/ErrorHandleDBSlice";
import { addAllDBAnalysis } from "../../../../GlobalData/SystemDashBoard/AnalysisSBDSlice";
import { getAnalaytic } from "../../../../GlobalData/SystemDashBoard/analaytic";

function CultureReportSystemDB({
  setFormData,
  type,
  formData,
  setError,
  setErrorName,
  setErrorTupe,
  setErrorTestCode,
  setErrorPriceForPatient,
  setErrorPriceForLap,
  setErrorPriceForCompany,
  setErrorTestMethod,
  setErrorTestUnit,
  setNormalRange,
  intrputik,
  setCError,
  CError,
}) {
  const getAnalaytics = useSelector((state) => state.analaytic.analaytic);
  {
    /* have to do stateManagment For the table here too but if we have the intrputick get show u have to hide the div that has the buttons here */
    /* the Save will be from the interputik div if the interputik shown */
  }

  const [Ready, setReady] = useState(true);
  const CultureReportSelector = useSelector(selectDBCultureReports);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [OpenEditReport, SetOpenEditReport] = useState(false);
  const [OpenDeleteReport, SetOpenDeleteReport] = useState(false);
  const getErrors = useSelector(selectDBErrors);
  const [id, SetId] = useState(0);
  const Edit = (id) => {
    SetId(id);
    SetOpenEditReport(true);
  };
  const Delete = (id) => {
    SetId(id);
    SetOpenDeleteReport(true);
  };

  const AddToTable = () => {
    let Data = {
      id: CultureReportSelector.length + 1,
      text: document.getElementById("subjectTitle").value,
    };
    if (!Data.text) {
      document.getElementById("Title_error").classList.remove("invisible");
    } else {
      document.getElementById("Title_error").classList.add("invisible");
    }
    if (Data.text) {
      dispatch(addToDBCultureReport(Data));
      setText("");
    }
  };
  const textChange = (e) => {
    setText(e.target.value);
  };

  const getSections = async (page) => {
    await axios.get(`admin-scope/sections?page=${page}`).then((response) => {
      dispatch(addAllDBAnalysis(response.data));
    });
  };
  const Save = (e) => {
    setReady(false);
    axios
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
        culture_report: CultureReportSelector,
      })
      .then((res) => {
        console.log(res);
        setReady(true);
        setCError("");

        dispatch(getAnalaytic([]));
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
        const array = err.response.data.errors;

        if (array["culture_report"]) {
          setCError(array["culture_report"][0]);
        }
        // dispatch(getErrors());
        setReady(true);
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
  return (
    <div
      className={`${
        type === "CultureReport" ? "block" : "hidden"
      } col-start-1 col-end-3 mt-10 mb-10`}
    >
      <EditCReportSDB
        open={OpenEditReport}
        setOpen={SetOpenEditReport}
        id={id}
      />
      <DeleteCReportSDB
        open={OpenDeleteReport}
        setOpen={SetOpenDeleteReport}
        id={id}
      />
      <div className="flex w-full justify-start space-x-10 col-start-1 col-end-3">
        <div className="w-full">
          <div className="border-[#E4E7EC] w-[50%] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4  relative border-[1px] rounded-xl ">
            <input
              id="subjectTitle"
              placeholder="subject title"
              value={text}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs placeholder:text-[#707070] outline-0 ring-0"
              onChange={(e) => textChange(e)}
            />
          </div>
          <span
            id="Title_error"
            className="invisible ml-1 text-red-600 text-xs font-Poppins-Regular"
          >
            {"Please Enter Title"}
          </span>
        </div>
        <div
          className=" bg-[#0D2135] w-[34%] h-fit  flex items-center justify-center  lg:px-14  py-2 rounded-xl cursor-pointer "
          onClick={() => AddToTable()}
        >
          <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
            Add to table
          </p>
        </div>
      </div>

      <table className="w-full h-full   bg-white  rounded-2xl col-start-1 col-end-3 ">
        <tr className="border-b-[1px] w-full">
          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-1 pl-8 w-[85%]">
            First entry box
          </td>
          <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-1 w-[15%]">
            Action
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
      <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
        {CError}
      </span>
      <div
        className={`${
          intrputik ? "hidden" : "flex"
        }  flex justify-end space-x-8 mt-8 col-start-1 col-end-3`}
      >
        <div className="bg-[#F04438] border-[1px] border-[#D0D5DD] w-fit  flex items-center justify-center px-5 lg:px-16 py-2 rounded-xl cursor-pointer ">
          <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
            Delete
          </p>
        </div>
        <div
          onClick={() => Save()}
          className={`${
            Ready ? "bg-[#B7C835]" : "bg-gray-600"
          }  w-fit  flex items-center justify-center px-5 lg:px-28 py-3 rounded-xl cursor-pointer `}
        >
          <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
            Save
          </p>
        </div>
      </div>
    </div>
  );
}

export default CultureReportSystemDB;

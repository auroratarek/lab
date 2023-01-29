import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getHistopathology } from "../../../../GlobalData/SystemDashBoard/HistopathologySlice";
import swal from "sweetalert";
import { selectDBErrors } from "../../../../GlobalData/SystemDashBoard/ErrorHandleDBSlice";
import { addAllDBAnalysis } from "../../../../GlobalData/SystemDashBoard/AnalysisSBDSlice";
import { getAnalaytic } from "../../../../GlobalData/SystemDashBoard/analaytic";

function HistopathologySystemDB({
  setHistopathology,
  histopathology,
  setError,
  type,
  formData,
  intrputik,
  setFormData,
  setErrorName,
  setErrorTupe,
  setErrorTestCode,
  setErrorPriceForPatient,
  setErrorPriceForLap,
  setErrorPriceForCompany,
  setErrorTestMethod,
  setErrorTestUnit,
  ide,
  getData,
  setValue,
  HError,
  setHError,
}) {
  const getAnalaytics = useSelector((state) => state.analaytic.analaytic);
  const getErrors = useSelector(selectDBErrors);

  const dispatch = useDispatch();
  const [Ready, setReady] = useState(true);

  const getSections = async (page) => {
    await axios.get(`admin-scope/sections?page=${page}`).then((response) => {
      dispatch(addAllDBAnalysis(response.data));
    });
  };

  const Save = async () => {
    {
      setReady(false);
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
          hsitopology: [{ text: histopathology }],
        })
        .then((res) => {
          console.log(res);
          setHistopathology("");
          setHError("");

          setErrorName("");

          setErrorTestCode("");
          setErrorPriceForPatient("");
          setErrorPriceForLap("");
          setErrorPriceForCompany("");
          setErrorTestMethod("");
          setErrorTestUnit("");
          setErrorTupe("");
          dispatch(getAnalaytic([]));

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
          // dispatch(getAnalaytic(form));
          getSections(2);
          setReady(true);
        })
        .catch((err) => {
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
          // setHError(err.response.data.errors);
          swal("Oh noes!", `${err.response.data.message}`, "error");
          setReady(true);
        });
    }
    formData.append(
      "histopathology[0][text]",
      document.getElementById("histopathology").value
    );
  };
  const handleChangeHistopathology = (e) => {
    setHistopathology(e.target.value);
    dispatch(getHistopathology(e.target.value));
  };
  return (
    <div
      className={`${
        type === "Histopathology" ? "block" : "hidden"
      } col-start-1 col-end-3`}
    >
      <textarea
        id="histopathology"
        required
        placeholder="Type of resalt"
        className="bg-[#F9FAFF] border-[#E4E7EC] w-full h-fit text-xs  flex space-x-2 items-center py-3 px-4 outline-0 ring-0   relative m-auto border-[1px] rounded-xl "
        rows={5}
        onChange={handleChangeHistopathology}
        value={histopathology}
      />
      <span className="text-center  ml-1 text-red-600 text-xs font-Poppins-Regular">
        {HError}
      </span>
      <div
        className={`${
          intrputik ? "hidden" : "flex"
        }  justify-end space-x-8 mt-8 `}
      >
        <div className="bg-[#F04438] border-[1px] border-[#D0D5DD] w-fit  flex items-center justify-center px-5 lg:px-16 py-2 rounded-xl cursor-pointer ">
          <p className="text-sm flex items-center justify-center l text-white font-Poppins-Regular">
            Delete
          </p>
        </div>
        <div
          onClick={() => Save()}
          className={`${
            Ready ? "bg-[#B7C835]" : "bg-gray-700"
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

export default HistopathologySystemDB;

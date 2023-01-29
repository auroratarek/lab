import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getHistopathology } from "../../../../GlobalData/SystemDashBoard/HistopathologySlice";
import swal from "sweetalert";
import { selectErrorDBChilds } from "../../../../GlobalData/SystemDashBoard/ErrorHandleChildDBSlice";
import {
  getAnalayticChild,
  selectAnalayticChild,
} from "../../../../GlobalData/SystemDashBoard/analayticChild";

function HistopathologyChildSystemDB({
  setHistopathology,
  histopathology,
  type,
  formData,
  intrputik,
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
  getData,
  setValue,
  HError,
  setHError,
  setError,
}) {
  const getAnalaytic = useSelector(selectAnalayticChild);
  const getErrors = useSelector(selectErrorDBChilds);
  const [Ready, setReady] = useState(true);
  const dispatch = useDispatch();
  const Save = async () => {
    {
      setReady(false);
      await axios
        .post(`admin-scope/create-analyzSection`, {
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
          antibiotic: 0,
          hsitopology: [{ text: histopathology }],
        })
        .then((res) => {
          console.log(res);
          dispatch(getAnalayticChild([]));
          setHError("");
          setReady(true);

          setHistopathology("");
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
          if (array["hsitopology.0.text"]) {
            setHError(array["hsitopology.0.text"][0]);
          }
          setReady(true);

          // dispatch(getErrors());
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
          swal("Oh noes!", `${err.response.data.message}`, "error");
        });
    }
    formData.append(
      "histopathology[0][text]",
      document.getElementById("histopathologyChild").value
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
        id="histopathologyChild"
        placeholder="Type of resalt"
        className="bg-[#F9FAFF] border-[#E4E7EC] w-full h-fit text-xs  flex space-x-2 items-center py-3 px-4 outline-0 ring-0   relative m-auto border-[1px] rounded-xl "
        rows={5}
        value={histopathology}
        onChange={handleChangeHistopathology}
      />
      <span className=" ml-1 text-red-600 text-xs font-Poppins-Regular">
        {HError}
      </span>
      <div
        className={`${
          intrputik ? "hidden" : "flex"
        }  justify-end space-x-8 mt-8 `}
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

export default HistopathologyChildSystemDB;

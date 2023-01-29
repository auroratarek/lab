import { t } from "i18next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getHistopathologys } from "../../../GlobalData/Analytic/Histopathologys";
import swal from "sweetalert";
import {
  getAnalayticChilds,
  selectAnalayticChilds,
} from "../../../GlobalData/Analytic/AnalayticChildSlice";
import { addAllAnalysis } from "../../../GlobalData/Analytic/AnalysisSlice";

function HistopathologyChild({
  setFormData,
  setHistopathology,
  histopathology,
  ide,
  setErrorName,
  setErrorTupe,
  setErrorTestCode,
  setErrorPriceForPatient,
  setErrorPriceForLap,
  setErrorPriceForCompany,
  setErrorTestMethod,
  setErrorTestUnit,
  formData,
  type,
  setError,
  intrputik,
  HError,
  setHError,
}) {
  const getSections = async (page) => {
    await axios.get(`lab-scope/get-sections`).then((response) => {
      console.log(response.data);
      dispatch(addAllAnalysis(response.data));
    });
  };
  const getAnalaytic = useSelector(selectAnalayticChilds);
  const dispatch = useDispatch();

  const [Ready, setReady] = useState(true);
  const Save = async () => {
    {
      setReady(false);
      console.log(getAnalaytic);
      await axios
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

          hsitopology: [{ text: histopathology }],
        })
        .then((res) => {
          console.log(res);
          getSections();
          setHError("");
          setReady(true);

          setHistopathology("");
          dispatch(getAnalayticChilds([]));
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
       
          console.log(err.response.data.message);
          setReady(true);

          console.log("flksjkfljsdlkfsdjfklsdjfsld");
          // swal("Oh noes!", `${err.response.data.message}`, "error");
        });
      /* now we have to post after we get all values from  IntrputikSystemDB component but if we have the intrputick get show u have to hide the div that has the buttons here  */
      /* the Save will be from the interputik div if the interputik shown */
    }
    formData.append(
      "histopathology[0][text]",
      document.getElementById("histopathology").value
    );
  };
  const handleChangeHistopathology = (e) => {
    setHistopathology(e.target.value);
    dispatch(getHistopathologys(e.target.value));
  };

  return (
    <div
      className={`${
        type === "Histopathology" ? "block" : "hidden"
      } col-start-1 col-end-3`}
    >
      <textarea
        placeholder={t("Type of result")}
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
  );
}

export default HistopathologyChild;

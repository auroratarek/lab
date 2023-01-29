import { t } from "i18next";
import React, { useEffect, useState } from "react";
import Intrputik from "./Intrputik";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllAnalysis,
  addToAnalysis,
} from "../../GlobalData/Analytic/AnalysisSlice";
import swal from "sweetalert";

function EditSection({ show, setShow, id }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(true);
  const dispatch = useDispatch();
  const getSectionDetails = async (id) => {
    setName("Loading...");
    await axios
      .get(`lab-scope/mainSection?section_id=${id}`)
      .then((response) => {
        console.log(response.data);
        setName(response.data.name);
      });
  };

  useEffect(() => {
    getSectionDetails(id);
  }, [id]);

  const getSections = async (page) => {
    await axios.get(`lab-scope/get-sections`).then((response) => {
      console.log(response.data);
      dispatch(addAllAnalysis(response.data));
    });
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleClick = async () => {
    setReady(false);
    await axios
      .put(`lab-scope/update-mainSection?section_id=${id}`, { name })
      .then((res) => {
        setReady(true);

        setShow(false);

        console.log(res);
        setError("");
        setName("");
        getSections();
      })
      .catch((err) => {
        setReady(true);

        setError(err.response.data.message);
        // if (err)
        // swal("Oh noes!", `${err.response.data.message}`, "error");
      });
  };
  return (
    <div className={`${show === true ? "block" : "hidden"}`}>
      <div className="w-full flex space-x-5 justify-end mb-5 mt-16 pr-1">
        <div className="flex items-center space-x-2">
          <input type="checkbox" />
          <label className="font-Poppins-Regular text-black text-xs">
            {t("Single Print")}
          </label>
        </div>
      </div>
      <div
        className={` border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl `}
      >
        <input
          name="SectionName"
          value={name}
          onChange={handleChangeName}
          placeholder={t("Section name")}
          type="text"
          className="w-full bg-[#F9FAFF] font-Poppins-Regular text-sm text-[#707070] outline-0 ring-0"
        />
      </div>
      <span className="text-sm text-red-600">{error}</span>
      <div className={`flex justify-end space-x-8 mt-8 `}>
        {/* <div className="bg-[#F04438] border-[1px] border-[#D0D5DD] w-fit  flex items-center justify-center px-16 py-2 rounded-xl cursor-pointer ">
          <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
            {t("Delete")}
          </p>
        </div> */}
        <button
          onClick={handleClick}
          disabled={!ready}
          className={` ${
            ready ? "bg-[#B7C835]" : "bg-gray-600"
          } w-fit  flex items-center justify-center px-28 py-3 rounded-xl  `}
        >
          <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
            {t("update")}
          </p>
        </button>
      </div>
    </div>
  );
}

export default EditSection;

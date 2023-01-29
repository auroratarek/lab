import { t } from "i18next";
import React, { useState } from "react";
import Doctor from "./CollectedMoney/Doctor";
import ReceiveLab from "./CollectedMoney/ReceiveLab";
import SendLab from "./CollectedMoney/SendLab";

function CollectedMoney({ section }) {
  const [SubSection, setSubSection] = useState("Doctor");

  return (
    <div className={`${section === "Money" ? "block" : "hidden"}`}>
      <div className="flex space-x-2 mt-5">
        <div
          className={`${
            SubSection === "Doctor" ? "bg-[#B7C835]" : "bg-white"
          }  w-fit  flex items-center justify-center px-5 py-3 font-Poppins-Regular hover:bg-gray-100 rounded-xl cursor-pointer `}
          onClick={() => setSubSection("Doctor")}
        >
          <p
            className={`text-sm flex items-center justify-center ${
              SubSection === "Doctor" ? "text-white" : "text-black"
            } `}
          >
            {t("Doctors")}
          </p>
        </div>
        <div
          className={`${
            SubSection === "SendLab" ? "bg-[#B7C835]" : "bg-white"
          } w-fit  flex items-center justify-center px-5 py-3 font-Poppins-Regular hover:bg-gray-100 rounded-xl cursor-pointer `}
          onClick={() => setSubSection("SendLab")}
        >
          <p
            className={`text-sm flex items-center justify-center  ${
              SubSection === "SendLab" ? "text-white" : "text-black"
            } `}
          >
            {t("Send lab")}
          </p>
        </div>
        <div
          className={`${
            SubSection === "ReceiveLab" ? "bg-[#B7C835]" : "bg-white"
          } w-fit  flex items-center justify-center px-5 py-3 font-Poppins-Regular hover:bg-gray-100 rounded-xl cursor-pointer `}
          onClick={() => setSubSection("ReceiveLab")}
        >
          <p
            className={`text-sm flex items-center justify-center ${
              SubSection === "ReceiveLab" ? "text-white" : "text-black"
            } `}
          >
            {t("Receive lab")}
          </p>
        </div>
      </div>
      <Doctor SubSection={SubSection} />
      <SendLab SubSection={SubSection} />
      <ReceiveLab SubSection={SubSection} />
    </div>
  );
}

export default CollectedMoney;

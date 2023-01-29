/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useRef, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import LogoLog from "./Images/Login/LogoLog.svg";
import LabLog1 from "./Images/Login/LabLog1.jpg";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [meesage, SetMessage] = useState();

  // const LoginFun = async () => {
  //   let Data = {
  //     email: document.getElementById("Email").value,
  //     password: document.getElementById("password").value,
  //   };

  //   await axios.post(`/lab-login`, Data).then((res) => {
  //     document.getElementById("logbtn").disabled = true;
  //     if (res.data === "Email or password is incorrect") {
  //       document.getElementById("message").textContent = res.data;
  //       document.getElementById("logbtn").disabled = false;
  //     } else {
  //       cookies.set("token", res.data, { path: "/" });
  //       window.location.replace("/");
  //       document.getElementById("logbtn").disabled = false;
  //     }
  //   });
  // };
  const LoginFun = async () => {
    let formdata = new FormData();
    formdata.append("email", document.getElementById("Email").value);
    formdata.append("password", document.getElementById("password").value);

    await axios
      .get(
        `/lab-scope/auth-lab?email=${formdata.get(
          "email"
        )}&password=${formdata.get("password")}`
      )
      .then((res) => {
        document.getElementById("logbtn").disabled = true;
        cookies.set("token_lab", res.data, { path: "/" });

        localStorage.setItem("lab_token", res.data.token);
        localStorage.setItem("lab", true);
        localStorage.setItem("admin", false);
        //localStorage.setItem("token", JSON.stringify(res.data.token));
        window.location.replace("/");
        // navigate("/");
        console.log(res);
      })
      .catch((error) => {
        if (error.response) {
          document.getElementById("message").textContent =
            error.response.data.message;
          document.getElementById("logbtn").disabled = false;
          console.log(error);
        }
      });
  };
  return (
    <div className="flex w-full h-full items-center bg-white py-20">
      <div className="bg-white w-full h-full ">
        <div className="flex flex-col items-center justify-center w-full space-y-2">
          <img src={LogoLog} className="w-fit h-fit" />

          <p className="text-[#4A4A4A]  justify-center font-Roboto-Bold flex flex-grow text-2xl ">
            Welcome Back!
          </p>
        </div>

        <div className="flex flex-col space-y-5  w-full mt-10 px-5">
          <div className="w-full break-words border-[#E4E7EC] h-fit bg-white flex  items-center py-4 px-4    relative  border-[1px] rounded-xl ">
            <MdOutlineMail className="w-[20px] h-[20px] mx-2 text-[#667085]" />
            <input
              id="Email"
              placeholder="example@gmail.com"
              type="text"
              className="w-full bg-white font-Cairo-Regular  text-[#667085] outline-0 ring-0"
            />
            <p className=" text-xs font-Poppins-Medium absolute text-[#667085] top-[-0.8rem] bg-white left-[0.2rem]  px-1 ml-2 font-medium">
              Email
            </p>
          </div>
          <div className="w-full  break-words border-[#E4E7EC] h-fit bg-white flex  items-center py-4 px-4    relative  border-[1px] rounded-xl ">
            <FiLock className="w-[20px] h-[20px] mx-2 text-[#667085]" />
            <input
              id="password"
              placeholder="*********"
              type="password"
              className="w-full bg-white font-Cairo-Regular  text-[#667085] outline-0 ring-0"
            />
            <p className=" text-xs font-Poppins-Medium absolute text-[#667085] top-[-0.8rem] bg-white left-[0.2rem]  px-1 ml-2 font-medium">
              Password
            </p>
          </div>
          <p id="message"></p>
          <div className="bg-white  flex flex-col col-start-1 col-end-3 mt-5">
            <button
              id="logbtn"
              type="button"
              className="flex flex-grow py-4 text-xl bg-gradient-to-r from-[#4A5428] to-[#B7C933] font-Roboto-Regular justify-center rounded-xl text-white"
              onClick={() => LoginFun()}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="h-full w-full">
        <img src={LabLog1} />
      </div>
    </div>
  );
}

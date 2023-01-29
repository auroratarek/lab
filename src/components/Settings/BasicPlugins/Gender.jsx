import React, { useEffect, useState } from "react";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import DeleteGender from "./Gender/DeleteGender";
import EditGender from "./Gender/EditGender";
import { t } from "i18next";
import { Oval } from "react-loader-spinner";
import { addAllGender, selectGenders } from "./Gender/GenderSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Gender({ type }) {
  const [OpenDeleteGender, setOpenDeleteGender] = useState(false);
  const [OpenEditGender, setOpenEditGender] = useState(false);
  const dispatch = useDispatch();
  const GendersSelector = useSelector(selectGenders);
  const [id, SetId] = useState(0);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [ready, setReady] = useState(true);
  const GetGenders = async () => {
    document.getElementById("Loader").classList.remove("hidden");
    document.getElementById("Loader").classList.add("flex");
    await axios
      .get(`lab-scope/genders`)
      .then((response) => {
        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");
        dispatch(addAllGender(response.data));
      })
      .catch((err) => {
        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");
        console.log("data");
      });
  };
  useEffect(() => {
    GetGenders();
  }, []);

  const ADDToTheTable = async () => {
    setReady(false);
    document.getElementById("Loader").classList.remove("hidden");
    document.getElementById("Loader").classList.add("flex");
    await axios
      .post("lab-scope/create-gender", { name: name })
      .then((response) => {
        setReady(true);

        GetGenders();
        setError("");
        setName("");
      })
      .catch((err) => {
        setReady(true);

        setError(err.response.data.message);

        document.getElementById("Loader").classList.add("hidden");
        document.getElementById("Loader").classList.remove("flex");
      });
    // let Data = {
    //   id: CompaneisSelector.length + 1,
    //   name: document.getElementById("CompanyName").value,
    // };

    // dispatch(addToCompany(Data));
  };

  const Edit = (id) => {
    SetId(id);
    setOpenEditGender(true);
  };

  const Delete = (id) => {
    SetId(id);
    setOpenDeleteGender(true);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  return (
    <div className={`${type === "Gender" ? "block" : "hidden"} mt-10`}>
      <DeleteGender
        id={id}
        open={OpenDeleteGender}
        setOpen={setOpenDeleteGender}
      />
      <EditGender id={id} open={OpenEditGender} setOpen={setOpenEditGender} />
      <div className="">
        <div className="w-full">
          <div className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4     relative m-auto border-[1px] rounded-xl ">
            <input
              name=" GenderName"
              placeholder={t("Gender name")}
              onChange={handleChangeName}
              value={name}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs text-[#707070] outline-0 ring-0"
            />
          </div>
          <span className="ml-1 text-sm text-red-600">{error}</span>
        </div>

        <div className="w-full flex justify-end mt-5">
          <button
            disabled={!ready}
            type={"button"}
            onClick={() => ADDToTheTable()}
            className={`col-start-3 col-end-4 ${
              ready ? "bg-[#0D2135]" : "bg-gray-500"
            }    flex items-center justify-center px-10 w-fit py-2 rounded-xl `}
          >
            <p className="text-sm flex items-center justify-center text-white font-Poppins-Regular">
              {t("Add To the Table")}
            </p>
          </button>
        </div>
        <div
          id="Loader"
          className="hidden   justify-center items-center mt-5 w-full text-center mx-auto"
        >
          <Oval
            height={30}
            width={30}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
        <table className="w-full h-full mt-5  bg-white  rounded-2xl col-start-1 col-end-4 ">
          <tr className="border-b-[1px] w-full">
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-5 w-[90%]">
              {t("Gender name")}
            </td>
            <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[10%]">
              {t("Action")}
            </td>
          </tr>

          {GendersSelector
            ? GendersSelector.map((Gender) => (
                <tr className="border-b-[1px] w-full">
                  <td className="text-base text-[#101828] font-semibold font-Poppins-Regular py-2 pl-5 ">
                    {Gender.name}
                  </td>
                  <td className="text-sm text-[#101828] font-semibold font-Poppins-Regular py-2 ">
                    <div className="flex space-x-2 ">
                      <TiEdit
                        className="text-2xl  opacity-50 cursor-pointer"
                        onClick={() => Edit(Gender.id)}
                      />
                      <IoTrashOutline
                        className="text-2xl text-[#F04438] cursor-pointer"
                        onClick={() => Delete(Gender.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            : "Loading"}
        </table>
      </div>
    </div>
  );
}

export default Gender;

/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosClose } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { t } from "i18next";
import { getAllTestUnits, updateProduct } from "../../api/StoreData";
import axios from "axios";
import moment from "moment";

export default function EditoutsideProduct({
  id,
  outProducts,
  pageOutside,
  setOutProducts,
  open,
  setOpen,
}) {
  const cancelButtonRef = useRef(null);
  const [Datee, SetDatee] = useState(new Date());

  const [name, setName] = useState();
  const [Description, setDescription] = useState();
  const [Company, setCompany] = useState();
  const [Exp, setExp] = useState();
  const [Model, setModel] = useState();
  const [MeasuringUnit, setMeasuringUnit] = useState();
  const [Quantity, setQuantity] = useState();
  const [imageForm, setImageForm] = useState();

  const [allMeasuringUnit, setAllMeasuringUnit] = useState(false);
  const DateInput = React.forwardRef((props, ref) => {
    return (
      <div
        onClick={props.onClick}
        className=" p-2  justify-between   outline-0  border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-[0.80rem] px-4  relative  border-[1px] rounded-xl "
      >
        <label className="text-[#98A2B3] text-xs mr-10 font-Poppins-Regular">
          {t("Exp date")}
        </label>
        <div className=" flex items-center">
          <label
            onClick={props.onClick}
            ref={ref}
            className="text-black  text-xs font-Poppins-Medium"
          >
            {props.value || props.placeholder}
          </label>
          <IoCalendarOutline
            onClick={props.onClick}
            className="ml-5 text-[#98A2B3]"
          />
        </div>
      </div>
    );
  });
  const [BirthDate, setBirthDate] = useState(new Date());
  const [WorkDate, setWorkDate] = useState(new Date());
  const [Image, SetImage] = useState();
  const [ready, setReady] = useState(true);
  useEffect(() => {
    getAllTestUnits(setAllMeasuringUnit);
    console.log(
      outProducts.data
        ? outProducts.data[
            outProducts.data?.findIndex((unitItem) => unitItem.id === id)
          ]
        : ""
    );
    SetDatee(
      new Date(
        outProducts.data
          ? outProducts.data[
              outProducts.data?.findIndex((unitItem) => unitItem.id === id)
            ]?.out_date
          : ""
      )
    );
    SetImage(
      `https://aurora-team.com/labs-obada/public/${
        outProducts.data
          ? outProducts.data[
              outProducts.data?.findIndex((unitItem) => unitItem.id === id)
            ]?.image
          : ""
      }`
    );
    setName(
      outProducts.data
        ? outProducts.data[
            outProducts.data?.findIndex((unitItem) => unitItem.id === id)
          ]?.product_name
        : ""
    );
    setDescription(
      outProducts.data
        ? outProducts.data[
            outProducts.data?.findIndex((unitItem) => unitItem.id === id)
          ]?.description
        : ""
    );
    setCompany(
      outProducts.data
        ? outProducts.data[
            outProducts.data?.findIndex((unitItem) => unitItem.id === id)
          ]?.company
        : ""
    );
    setExp(
      outProducts.data
        ? outProducts.data[
            outProducts.data?.findIndex((unitItem) => unitItem.id === id)
          ]?.out_date
        : ""
    );
    setModel(
      outProducts.data
        ? outProducts.data[
            outProducts.data?.findIndex((unitItem) => unitItem.id === id)
          ]?.model
        : ""
    );
    setMeasuringUnit(
      outProducts.data
        ? outProducts.data[
            outProducts.data?.findIndex((unitItem) => unitItem.id === id)
          ]?.test_unit.id
        : ""
    );
    setQuantity(
      outProducts.data
        ? outProducts.data[
            outProducts.data?.findIndex((unitItem) => unitItem.id === id)
          ]?.quantity
        : ""
    );
  }, [id]);

  const filebrowser = (e) => {
    e.preventDefault();
    document.getElementById("fileInput").click();
  };
  const getImage = (e) => {
    let type = e.target.files[0].type;
    let files = e.target.files[0];
    let ext = type.substring(type.indexOf("/") + 1);
    if (type.substring(0, type.indexOf("/")) === "image") {
      SetImage(window.URL.createObjectURL(new Blob(e.target.files)));
      setImageForm(e.target.files[0]);
      //   if (!document.getElementById('ImageMessage').classList.contains("hidden")) {
      //     document.getElementById('ImageMessage').classList.add("hidden");
      //   }

      // } else {
      //   document.getElementById('ImageMessage').classList.remove("hidden");
      //   document.getElementById('ImageMessage').textContent = "الرجاء الانتباه على اختيار صورة فقط";
      //   SetImage(null);
    }
  };
  function close() {
    SetDatee(
      new Date(
        outProducts.data
          ? outProducts.data[
              outProducts.data?.findIndex((unitItem) => unitItem.id === id)
            ]?.out_date
          : ""
      )
    );
    SetImage(
      `https://aurora-team.com/labs-obada/public/${
        outProducts.data
          ? outProducts.data[
              outProducts.data?.findIndex((unitItem) => unitItem.id === id)
            ]?.image
          : ""
      }`
    );
    setName(
      outProducts.data
        ? outProducts.data[
            outProducts.data?.findIndex((unitItem) => unitItem.id === id)
          ]?.product_name
        : ""
    );
    setDescription(
      outProducts.data
        ? outProducts.data[
            outProducts.data?.findIndex((unitItem) => unitItem.id === id)
          ]?.description
        : ""
    );
    setCompany(
      outProducts.data
        ? outProducts.data[
            outProducts.data?.findIndex((unitItem) => unitItem.id === id)
          ]?.company
        : ""
    );
    setExp(
      outProducts.data
        ? outProducts.data[
            outProducts.data?.findIndex((unitItem) => unitItem.id === id)
          ]?.out_date
        : ""
    );
    setModel(
      outProducts.data
        ? outProducts.data[
            outProducts.data?.findIndex((unitItem) => unitItem.id === id)
          ]?.model
        : ""
    );
    setMeasuringUnit(
      outProducts.data
        ? outProducts.data[
            outProducts.data?.findIndex((unitItem) => unitItem.id === id)
          ]?.test_unit.id
        : ""
    );
    setQuantity(
      outProducts.data
        ? outProducts.data[
            outProducts.data?.findIndex((unitItem) => unitItem.id === id)
          ]?.quantity
        : ""
    );
    setOpen(false);
  }

  const NameClicked = () => {
    document.getElementById("Name").classList.remove("hidden");
    document
      .getElementById("NameContainer")
      .classList.remove("border-[#E4E7EC]");

    document.getElementById("NameContainer").classList.remove("bg-[#F9FAFF]");
    document.getElementById("NameContainer").classList.add("border-[#B7C835]");
    document.getElementById("NameContainer").classList.add("bg-white");

    document.getElementById("NameInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("NameInput").classList.add("bg-white");
  };

  const DescriptionClicked = () => {
    document.getElementById("Description").classList.remove("hidden");
    document
      .getElementById("DescriptionInput")
      .classList.remove("border-[#E4E7EC]");

    document
      .getElementById("DescriptionInput")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("DescriptionInput")
      .classList.add("border-[#B7C835]");
    document.getElementById("DescriptionInput").classList.add("bg-white");

    document
      .getElementById("DescriptionInput")
      .classList.remove("bg-[#F9FAFF]");
    document.getElementById("DescriptionInput").classList.add("bg-white");
  };

  const CompanyClicked = () => {
    document.getElementById("Company").classList.remove("hidden");
    document
      .getElementById("CompanyContainer")
      .classList.remove("border-[#E4E7EC]");

    document
      .getElementById("CompanyContainer")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("CompanyContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("CompanyContainer").classList.add("bg-white");

    document.getElementById("CompanyInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("CompanyInput").classList.add("bg-white");
  };

  const ModelClicked = () => {
    document.getElementById("Model").classList.remove("hidden");
    document
      .getElementById("ModelContainer")
      .classList.remove("border-[#E4E7EC]");

    document.getElementById("ModelContainer").classList.remove("bg-[#F9FAFF]");
    document.getElementById("ModelContainer").classList.add("border-[#B7C835]");
    document.getElementById("ModelContainer").classList.add("bg-white");

    document.getElementById("ModelInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("ModelInput").classList.add("bg-white");
  };

  const QuantityClicked = () => {
    document.getElementById("Quantity").classList.remove("hidden");
    document
      .getElementById("QuantityContainer")
      .classList.remove("border-[#E4E7EC]");

    document
      .getElementById("QuantityContainer")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("QuantityContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("QuantityContainer").classList.add("bg-white");

    document.getElementById("QuantityInput").classList.remove("bg-[#F9FAFF]");
    document.getElementById("QuantityInput").classList.add("bg-white");
  };

  const MeasuringUnitChanged = () => {
    document.getElementById("MeasuringUnit").classList.remove("hidden");
    document
      .getElementById("MeasuringUnitContainer")
      .classList.remove("border-[#E4E7EC]");

    document
      .getElementById("MeasuringUnitContainer")
      .classList.remove("bg-[#F9FAFF]");
    document
      .getElementById("MeasuringUnitContainer")
      .classList.add("border-[#B7C835]");
    document.getElementById("MeasuringUnitContainer").classList.add("bg-white");

    document
      .getElementById("MeasuringUnitInput")
      .classList.remove("bg-[#F9FAFF]");
    document.getElementById("MeasuringUnitInput").classList.add("bg-white");
  };
  const getOutProducts = async (page) => {
    await axios
      .get(`lab-scope/store-outside?page=${page}`)
      .then((res) => {
        setOutProducts(res.data);
      })
      .catch((err) => {
        // setError(err.response.data);
      });
  };
  const Edit = () => {
    setReady(false);
    const data = {};
    data["product_name"] = name;
    data["description"] = Description;
    data["company"] = Company;
    data["out_date"] = Exp;
    data["model"] = Model;
    data["test_unit_id"] = MeasuringUnit;
    data["quantity"] = Quantity;
    if (imageForm) {
      data["image"] = imageForm;
    }
    updateProduct(id, data, setReady).then(() => {
      getOutProducts(pageOutside);

      close();
    });
  };

  const handleChangeDate = (e) => {
    setExp(moment(`${e}`).format("YYYY-MM-DD"));

    SetDatee(e);
  };
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 "
          initialFocus={cancelButtonRef}
          onClose={() => close()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto ">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0 ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative px-10 pb-8 bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-2 sm:max-w-xl sm:w-full ">
                  <div className="bg-white ">
                    <div className="w-full flex  h-full items-center mt-5">
                      <p className=" font-semibold justify-center flex flex-grow text-2xl ml-10">
                        {t("Edit OutSide Product")}
                      </p>
                      <IoIosClose
                        className=" text-4xl  text-black border-[1px] rounded-full cursor-pointer bg-[#E4E7EC] "
                        onClick={() => close()}
                      />
                    </div>

                    <div className="w-full m-auto mt-10">
                      <div
                        className={` ${
                          Image == null
                            ? "w-fit border-dashed border-2"
                            : "w-40 h-40"
                        }  flex items-center flex-col  m-auto rounded-full  py-12 px-5 bg-cover bg-no-repeat bg-center`}
                        style={{ backgroundImage: `url(${Image})` }}
                      ></div>
                      <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          getImage(e);
                          setImageForm(e.target.files[0]);
                        }}
                      />
                      <div className="w-full flex justify-center items-center">
                        <button
                          className="text-white  py-2 px-5 rounded-xl mt-1  bg-[#B7C835] cursor-pointer"
                          onClick={(e) => filebrowser(e)}
                        >
                          {t("click to browse")}
                        </button>
                      </div>
                      <div className="flex flex-col space-y-5 h-full mt-10">
                        <div
                          id="NameContainer"
                          className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl "
                          onClick={() => NameClicked()}
                        >
                          <input
                            placeholder={t("Product name")}
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            id="NameInput"
                            type="text"
                            className=" w-full bg-[#F9FAFF]  font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                          />
                          <p
                            id="Name"
                            className="hidden font-Poppins-Medium text-xs absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                          >
                            {t("Product name")}
                          </p>
                        </div>
                        <div className="w-full relative">
                          <textarea
                            id="DescriptionInput"
                            placeholder={t("Description")}
                            className="bg-[#F9FAFF] font-Poppins-Medium placeholder:text-[#98A2B3] text-xs border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-4 px-4 outline-0 ring-0   relative m-auto border-[1px] rounded-xl "
                            rows={3}
                            onClick={() => DescriptionClicked()}
                            onChange={(e) => setDescription(e.target.value)}
                            value={Description}
                          />
                          <p
                            id="Description"
                            className="hidden font-Poppins-Medium text-xs absolute  top-[-0.8rem] bg-white left-[0.8rem]  px-1 text-[#B7C835] font-medium"
                          >
                            {t("Description")}
                          </p>
                        </div>
                        <div
                          id="CompanyContainer"
                          className="bg-[#F9FAFF] border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl "
                          onClick={() => CompanyClicked()}
                        >
                          <input
                            id="CompanyInput"
                            name="Company"
                            placeholder={t("Company")}
                            onChange={(e) => setCompany(e.target.value)}
                            value={Company}
                            type="text"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                          />
                          <p
                            id="Company"
                            className="hidden font-Poppins-Medium text-xs absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                          >
                            {t("Company")}
                          </p>
                        </div>
                        <div>
                          <ReactDatePicker
                            id="date"
                            dateFormat="yyyy/MM/dd"
                            className=" "
                            customInput={<DateInput />}
                            selected={Datee}
                            onChange={(date) => handleChangeDate(date)}
                          />
                        </div>

                        <div
                          id="ModelContainer"
                          className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl "
                          onClick={() => ModelClicked()}
                        >
                          <input
                            id="ModelInput"
                            name="Model"
                            placeholder={t("Model")}
                            onChange={(e) => setModel(e.target.value)}
                            value={Model}
                            type="text"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                          />
                          <p
                            id="Model"
                            className="hidden font-Poppins-Medium text-xs absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                          >
                            {t("Model")}
                          </p>
                        </div>

                        <div
                          id="MeasuringUnitContainer"
                          className="w-full pr-2 bg-[#F9FAFF] rounded-lg flex border-[1px] border-[#E4E7EC] relative  items-center mr-5"
                          onClick={() => MeasuringUnitChanged()}
                        >
                          <select
                            id="MeasuringUnitInput"
                            name="MeasuringUnit"
                            className=" w-full   rounded-lg bg-[#F9FAFF]   font-Poppins-Medium  text-[#98A2B3] text-xs  outline-none px-4 py-3 cursor-pointer"
                            onChange={(e) => setMeasuringUnit(e.target.value)}
                          >
                            <option
                              value=""
                              selected
                              disabled
                              hidden
                              className=""
                            >
                              {t("Test unit")}
                            </option>

                            {allMeasuringUnit &&
                              allMeasuringUnit.map((item) => (
                                <option
                                  value={item.id}
                                  selected={
                                    MeasuringUnit && MeasuringUnit == item.id
                                      ? "selected"
                                      : ""
                                  }
                                >
                                  {item.unit}
                                </option>
                              ))}
                          </select>
                          <p
                            id="MeasuringUnit"
                            className="hidden font-Poppins-Medium text-xs absolute top-[-0.8rem] bg-white left-[0.8rem]  px-1 text-[#B7C835] font-medium"
                          >
                            {t("Test unit")}
                          </p>
                        </div>

                        <div
                          id="QuantityContainer"
                          className="border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl "
                          onClick={() => QuantityClicked()}
                        >
                          <input
                            id="QuantityInput"
                            name="Quantity"
                            placeholder={t("Quantity")}
                            type="text"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                            onChange={(e) => setQuantity(e.target.value)}
                            value={Quantity}
                          />
                          <p
                            id="Quantity"
                            className="hidden font-Poppins-Medium text-xs absolute top-[-0.8rem] bg-white left-[0.2rem]  px-1 text-[#B7C835] font-medium"
                          >
                            {t("Quantity")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white  py-3  flex sm:flex-row-reverse justify-between mt-10">
                    <button
                      onClick={Edit}
                      type="button"
                      disabled={!ready}
                      className={`${
                        ready ? "bg-[#B7C835]" : "bg-gray-600"
                      } flex flex-grow py-3 text-sm font-Poppins-Medium  justify-center rounded-xl text-white`}
                    >
                      {t("Edit OutSide Product")}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

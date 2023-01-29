/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosClose } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { t } from "i18next";
import { addAllExport } from "../../GlobalData/ExportsSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addAllRevenue } from "../../GlobalData/RevenuesSlice";
import moment from "moment";
import swal from "sweetalert";

export default function AddAccounting({
  SetDataBeforeFilterExport,
  SetDataBeforeFilterRevenue,
  pageE,
  pageR,
  open,
  setOpen,
}) {
  const cancelButtonRef = useRef(null);
  const [Method, SetMethod] = useState("exports");
  const [Datee, SetDate] = useState(new Date());
  const [RevenuesDate, SetRevenuesDate] = useState(new Date());
  const [readyExport, setReadyExport] = useState(true);
  const [readyRevenue, setReadyRevenue] = useState(true);

  const [formData, setFormData] = useState({
    day: "",
    date: new Date(),
    note: "",
    payment_amount: "",
    status: "",
  });

  const [formDataRevenue, setFormDataRevenue] = useState({
    day: "",
    date: new Date(),
    note: "",
    payment_amount: "",
    status: "",
  });

  const [ErrorDay, setErrorDay] = useState("");
  const [ErrorNote, setErrorNote] = useState("");
  const [ErrorPayment, setErrorPayment] = useState("");

  const [ErrorRDay, setErrorRDay] = useState("");
  const [ErrorRNote, setErrorRNote] = useState("");
  const [ErrorRPayment, setErrorRPayment] = useState("");

  const DateInput = React.forwardRef((props, ref) => {
    return (
      <div
        onClick={props.onClick}
        className=" p-2  justify-between   outline-0  border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-[0.80rem] px-4  relative  border-[1px] rounded-xl "
      >
        <label className="text-[#98A2B3] text-xs mr-10 font-Poppins-Regular">
          {t("Date")}
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

  const RevenuesDateInput = React.forwardRef((props, ref) => {
    return (
      <div
        onClick={props.onClick}
        className=" p-2  justify-between   outline-0  border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-[0.80rem] px-4  relative  border-[1px] rounded-xl "
      >
        <label className="text-[#98A2B3] text-xs mr-10 font-Poppins-Regular">
          {t("Date")}
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
  const exportbtn = (e) => {
    if (e.target.checked) {
      document
        .getElementById("radio-1-text")
        .classList.remove("text-[#101828]", "text-[#B7C835]");
      document.getElementById("radio-1-text").classList.add("text-[#B7C835]");

      document
        .getElementById("radio-2-text")
        .classList.remove("text-[#101828]", "text-[#B7C835]");
      SetMethod("exports");
    }
  };

  const revenuesbtn = (e) => {
    if (e.target.checked) {
      document
        .getElementById("radio-1-text")
        .classList.remove("text-[#101828]", "text-[#B7C835]");
      document
        .getElementById("radio-2-text")
        .classList.remove("text-[#101828]", "text-[#B7C835]");
      document.getElementById("radio-2-text").classList.add("text-[#B7C835]");
      SetMethod("Revenues");
    }
  };
  const dispatch = useDispatch();
  function close() {
    setErrorRDay("");
    setErrorRNote("");
    setErrorRPayment("");
    setErrorDay("");
    setErrorNote("");
    setErrorPayment("");
    setFormData({
      day: "",
      date: new Date(),
      note: "",
      payment_amount: "",
      status: "",
    });
    setFormDataRevenue({
      day: "",
      date: new Date(),
      note: "",
      payment_amount: "",
      status: "",
    });
    setOpen(false);
  }

  const getExports = async (page) => {
    await axios.get(`lab-scope/accounting-export?${page}`).then((response) => {
      console.log(response.data, "hi");
      dispatch(addAllExport(response.data.data));
      SetDataBeforeFilterExport(response.data.data);
    });
  };

  const getRevenues = async (page) => {
    await axios.get(`lab-scope/accounting-rev?${page}`).then((response) => {
      console.log(response.data, "hi");
      dispatch(addAllRevenue(response.data.data));
      SetDataBeforeFilterRevenue(response.data.data);
    });
  };

  const SaveExport = async () => {
    setReadyExport(false);

    await axios
      .post("lab-scope/accounting-store", {
        day: formData.day,
        date: moment(`${Datee}`).format("YYYY-MM-DD"),
        note: formData.note,
        payment_amount: formData.payment_amount,
        status: 0,
      })
      .then((response) => {
        // setNameError("a");
        // setPhoneError("a");
        // setEmailError("a");
        // setAddressError("a");
        // setRatioError("a");
        // setSrcError("a");
        // setGenderError("a");
        // setPasswordError("a");
        setReadyExport(true);
        swal("Great!", `Well Done`, "success");

        close();
        getExports(pageE);
        setFormData({
          day: "",
          date: new Date(),
          note: "",
          payment_amount: "",
          status: "",
        });
        setFormDataRevenue({
          day: "",
          date: new Date(),
          note: "",
          payment_amount: "",
          status: "",
        });

        setErrorRDay("");
        setErrorRNote("");
        setErrorRPayment("");
        setErrorDay("");
        setErrorNote("");
        setErrorPayment("");
      })
      .catch((err) => {
        setReadyExport(true);

        if (err.response.data.errors.day) {
          setErrorDay(err.response.data.errors.day[0]);
        } else {
          setErrorDay("");
        }
        if (err.response.data.errors.note) {
          setErrorNote(err.response.data.errors.note[0]);
        } else {
          setErrorNote("");
        }
        if (err.response.data.errors.payment_amount) {
          setErrorPayment(err.response.data.errors.payment_amount[0]);
        } else {
          setErrorPayment("");
        }

        console.log(err);
        // setError(err.response.data.errors.address);
      });
  };

  const SaveRavenue = async () => {
    setReadyRevenue(false);
    await axios
      .post("lab-scope/accounting-store", {
        day: formDataRevenue.day,
        date: moment(`${RevenuesDate}`).format("YYYY-MM-DD"),
        note: formDataRevenue.note,
        payment_amount: formDataRevenue.payment_amount,
        status: 1,
      })
      .then((response) => {
        setReadyRevenue(true);
        swal("Great!", `Well Done`, "success");

        setErrorRDay("");
        setErrorRNote("");
        setErrorRPayment("");
        setErrorDay("");
        setErrorNote("");
        setErrorPayment("");
        close();
        getRevenues(pageR);
        setFormDataRevenue({
          day: "",
          date: new Date(),
          note: "",
          payment_amount: "",
          status: "",
        });
        setFormData({
          day: "",
          date: new Date(),
          note: "",
          payment_amount: "",
          status: "",
        });
      })
      .catch((err) => {
        setReadyRevenue(true);

        if (err.response.data.errors.day) {
          setErrorRDay(err.response.data.errors.day[0]);
        } else {
          setErrorRDay("");
        }
        if (err.response.data.errors.note) {
          setErrorRNote(err.response.data.errors.note[0]);
        } else {
          setErrorRNote("");
        }
        if (err.response.data.errors.payment_amount) {
          setErrorRPayment(err.response.data.errors.payment_amount[0]);
        } else {
          setErrorRPayment("");
        }
        console.log(err);
        // setError(err.response.data.errors.address);
      });
  };

  const handleChangeDay = (e) => {
    setFormData({ ...formData, day: e.target.value });
  };
  const handleChangePayment = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setFormData({ ...formData, payment_amount: e.target.value });
    }
  };
  const handleChangeNote = (e) => {
    setFormData({ ...formData, note: e.target.value });
  };

  const handleChangeRDay = (e) => {
    setFormDataRevenue({ ...formDataRevenue, day: e.target.value });
  };
  const handleChangeRPayment = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setFormDataRevenue({
        ...formDataRevenue,
        payment_amount: e.target.value,
      });
    }
  };
  const handleChangeRNote = (e) => {
    setFormDataRevenue({ ...formDataRevenue, note: e.target.value });
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
                      <p className="  justify-center font-Poppins-SemiBold flex flex-grow text-lg ml-10">
                        {t("Payment")}
                      </p>
                      <IoIosClose
                        className=" text-4xl  text-black border-[1px] rounded-full cursor-pointer bg-[#E4E7EC] "
                        onClick={() => close()}
                      />
                    </div>

                    <div className="flex flex-col space-y-5 w-full m-auto mt-10">
                      <div className="flex space-x-5">
                        <div class="flex border-[1px] p-2 rounded-xl w-full py-3  justify-center  ">
                          <div class="items-center flex ml-2 text-sm space-x-3">
                            <label
                              id="radio-1-text"
                              for="radio-1"
                              class="font-Poppins-Medium text-xs text-[#B7C835] "
                            >
                              <div>{t("Exports")}</div>
                            </label>

                            <div class="flex items-center h-5">
                              <input
                                checked={`${Method === "exports" ? true : ""}`}
                                id="radio-1"
                                name="radio"
                                type="radio"
                                value="Lorem1"
                                class="w-[16.2px] h-[16.2px] appearance-none border-[1px] border-gray-400 bg-clip-content p-[2px]  rounded-[50%]  checked:bg-[#B7C835] checked:border-[#B7C835] "
                                onClick={(e) => exportbtn(e)}
                              />
                            </div>
                          </div>
                        </div>

                        <div class="flex border-[1px] p-2 rounded-xl w-full py-3  justify-center ">
                          <div class="items-center flex ml-2 text-sm space-x-3">
                            <label
                              id="radio-2-text"
                              for="radio-2"
                              class="font-Poppins-Medium text-xs text-[#101828] "
                            >
                              <div>{t("Revenues")}</div>
                            </label>
                            <div class="flex items-center h-5">
                              <input
                                checked={`${Method === "Revenues" ? true : ""}`}
                                id="radio-2"
                                name="radio"
                                type="radio"
                                value="Lorem1"
                                class="w-[16.2px] h-[16.2px] appearance-none border-[1px] border-gray-400 bg-clip-content p-[2px]  rounded-[50%]  checked:bg-[#B7C835] checked:border-[#B7C835] "
                                onClick={(e) => revenuesbtn(e)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`space-y-5 flex-col ${
                          Method === "exports" ? "flex" : "hidden"
                        }`}
                      >
                        <div>
                          <ReactDatePicker
                            id="date"
                            dateFormat="yyyy/MM/dd"
                            className=" "
                            customInput={<DateInput />}
                            selected={Datee}
                            onChange={(date) => SetDate(date)}
                          />
                        </div>
                        <div className="w-full">
                          <div
                            id="DayContainer"
                            className="text-xs border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                          >
                            <input
                              name="Day"
                              value={formData.day}
                              onChange={handleChangeDay}
                              id="Day"
                              placeholder={t("Day")}
                              type="text"
                              className=" w-full  font-Poppins-Medium placeholder:text-[#98A2B3] bg-[#F9FAFF] outline-0 ring-0"
                            />
                          </div>
                          <span className="text-sm text-red-600">
                            {ErrorDay}
                          </span>
                        </div>
                        <div className="w-full">
                          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                            <input
                              name="PaymentAmount"
                              value={formData.payment_amount}
                              onChange={handleChangePayment}
                              placeholder={t("Payment amount")}
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                            />
                          </div>
                          <span className="text-sm text-red-600">
                            {ErrorPayment}
                          </span>
                        </div>
                        <div className="w-full">
                          <div className="w-full relative lg:col-start-1 lg:col-end-3">
                            <textarea
                              value={formData.note}
                              onChange={handleChangeNote}
                              id="NotesInput"
                              className=" bg-[#F9FAFF] placeholder:text-[#98A2B3] font-Poppins-Medium border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-3 px-4 outline-0 ring-0   relative m-auto border-[1px] rounded-xl text-xs "
                              rows={4}
                              placeholder={t("Notes")}
                            />
                          </div>
                          <span className="text-sm text-red-600">
                            {ErrorNote}
                          </span>
                        </div>
                        <div
                          className={`  bg-white  py-3  flex sm:flex-row-reverse justify-between mt-10`}
                        >
                          <button
                            onClick={SaveExport}
                            type="button"
                            disabled={!readyExport}
                            className={`${
                              readyExport ? "bg-[#B7C835]" : "bg-gray-600"
                            } flex flex-grow py-3 text-sm font-Poppins-Medium  justify-center rounded-xl text-white`}
                          >
                            {t("Save")}
                          </button>
                        </div>
                      </div>

                      <div
                        className={`space-y-5 flex-col ${
                          Method === "Revenues" ? "flex" : "hidden"
                        }`}
                      >
                        <div>
                          <ReactDatePicker
                            id="date"
                            dateFormat="yyyy/MM/dd"
                            className=" "
                            customInput={<RevenuesDateInput />}
                            selected={RevenuesDate}
                            onChange={(date) => SetRevenuesDate(date)}
                          />
                        </div>
                        <div className="w-full">
                          <div
                            id="DayContainer"
                            className="text-xs border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl "
                          >
                            <input
                              value={formDataRevenue.day}
                              onChange={handleChangeRDay}
                              name="Day"
                              id="Day"
                              placeholder={t("Day")}
                              type="text"
                              className=" w-full  font-Poppins-Medium placeholder:text-[#98A2B3] bg-[#F9FAFF] outline-0 ring-0"
                            />
                          </div>
                          <span className="text-red-600 text-sm">
                            {ErrorRDay}
                          </span>
                        </div>
                        <div className="w-full">
                          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                            <input
                              value={formDataRevenue.payment_amount}
                              onChange={handleChangeRPayment}
                              name="TotalAmount"
                              placeholder={t("Total amount")}
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                            />
                          </div>
                          <span className="text-red-600 text-sm">
                            {ErrorRPayment}
                          </span>
                        </div>
                        <div className="w-full">
                          <div className="w-full relative lg:col-start-1 lg:col-end-3">
                            <textarea
                              value={formDataRevenue.note}
                              onChange={handleChangeRNote}
                              id="NotesInput"
                              className=" bg-[#F9FAFF] placeholder:text-[#98A2B3] font-Poppins-Medium border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-3 px-4 outline-0 ring-0   relative m-auto border-[1px] rounded-xl text-xs "
                              rows={4}
                              placeholder={t("Notes")}
                            />
                          </div>
                          <span className="text-red-600 text-sm">
                            {ErrorRNote}
                          </span>
                        </div>
                        <div className="bg-white  py-3  flex sm:flex-row-reverse justify-between mt-10">
                          <button
                            onClick={SaveRavenue}
                            type="button"
                            disabled={!readyRevenue}
                            className={`${
                              readyRevenue ? "bg-[#B7C835]" : "bg-gray-600"
                            } flex flex-grow py-3 text-sm font-Poppins-Medium   justify-center rounded-xl text-white`}
                          >
                            {t("Save")}
                          </button>
                        </div>
                      </div>
                    </div>
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

/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosClose } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { t } from "i18next";
import { addAllSupplier } from "../../GlobalData/Suppliers/getSuppliersSlice";
import axios from "axios";
import moment from "moment";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

export default function Bill({ id, open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [Method, SetMethod] = useState("WithSystem");
  const [PurchaseDate, setPurchaseDate] = useState(new Date());
  const [errorNumber, setErrorNumber] = useState("a");
  const [errorId, setErrorId] = useState("a");
  const [errorDollar, setErrorDollar] = useState("a");
  const [ready, setReady] = useState(true);
  const dispatch = useDispatch();
  const PurchaseInput = React.forwardRef((props, ref) => {
    return (
      <div
        onClick={props.onClick}
        className=" p-2  justify-between   outline-0  border-[#E4E7EC] w-full h-fit bg-[#F9FAFF] flex space-x-2 items-center py-[1rem] px-4  relative  border-[1px] rounded-xl "
      >
        <label className="text-[#98A2B3] text-xs mr-10 font-Poppins-Regular">
          {t("Date of Purchase")}
        </label>
        <div className=" flex items-center">
          <label
            onClick={props.onClick}
            ref={ref}
            className="text-black  text-xs font-Poppins-Regular"
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

  const [formData, setFormData] = useState({
    invoice_number: "",
    total_ID: "",
    total_dolar: "",
  });

  const getSuppliers = async (page) => {
    await axios.get(`lab-scope/suppliers?page=${page}`).then((response) => {
      console.log(response.data, "hi");
      dispatch(addAllSupplier(response.data));
    });
  };

  function close() {
    setErrorNumber("");
    setErrorId("");
    setErrorDollar("");
    setFormData({
      invoice_number: "",
      total_ID: "",
      total_dolar: "",
    });
    setOpen(false);
  }

  const handleChangeNumber = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setFormData({
        ...formData,
        invoice_number: e.target.value,
      });
    }
  };

  const handleChangeID = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setFormData({
        ...formData,
        total_ID: e.target.value,
      });
    }
  };

  const handleChangeTotal = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setFormData({
        ...formData,
        total_dolar: e.target.value,
      });
    }
  };

  const Add = async () => {
    setReady(false);
    await axios
      .post("lab-scope/bill-store", {
        supplier_id: id,
        total_ID: formData.total_ID,
        invoice_number: formData.invoice_number,
        date_invoice: moment(`${PurchaseDate}`).format("YYYY-MM-DD"),
        total_dolar: formData.total_dolar,
      })
      .then((response) => {
        setFormData({
          invoice_number: "",
          total_ID: "",
          total_dolar: "",
        });
        swal("Great!", `Well Done`, "success");

        setReady(true);
        setErrorNumber("");
        setErrorId("");
        setErrorDollar("");
        getSuppliers(1);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setReady(true);
        if (err.response.data.errors.invoice_number) {
          setErrorNumber(err.response.data.errors.invoice_number[0]);
        } else {
          setErrorNumber("");
        }
        if (err.response.data.errors.total_ID) {
          setErrorId(err.response.data.errors.total_ID[0]);
        } else {
          setErrorId("");
        }
        if (err.response.data.errors.total_dolar) {
          setErrorDollar(err.response.data.errors.total_dolar[0]);
        } else {
          setErrorDollar("");
        }
      });
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
                <Dialog.Panel className="relative px-7 pb-10 bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-2 sm:max-w-2xl sm:w-full ">
                  <div className="bg-white ">
                    <div className="w-full flex  h-full items-center mt-5">
                      <p className="  justify-center font-Poppins-SemiBold flex flex-grow text-2xl ml-10">
                        {t("Bill")}
                      </p>
                      <IoIosClose
                        className=" text-4xl  text-black border-[1px] rounded-full cursor-pointer bg-[#E4E7EC] "
                        onClick={() => close()}
                      />
                    </div>

                    <div className="flex flex-col space-y-5 w-full m-auto mt-10">
                      <div className={` gap-5 grid grid-cols-2 `}>
                        <div>
                          <ReactDatePicker
                            id="date"
                            dateFormat="yyyy/MM/dd"
                            className=" "
                            customInput={<PurchaseInput />}
                            selected={PurchaseDate}
                            onChange={(date) => setPurchaseDate(date)}
                          />
                        </div>
                        <div className="w-full">
                          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                            <input
                              name="InvoiceNumber"
                              onChange={handleChangeNumber}
                              value={formData.invoice_number}
                              placeholder={t("Invoice number")}
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs text-[#707070] outline-0 ring-0"
                            />
                          </div>
                          <span
                            className={`${
                              errorNumber === "a" ? "invisible" : ""
                            } text-sm text-red-600`}
                          >
                            {errorNumber}
                          </span>
                        </div>
                        <div className="w-full">
                          <div className="w-full  break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                            <input
                              name="TotalID"
                              onChange={handleChangeID}
                              value={formData.total_ID}
                              placeholder={t("Total IQD")}
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs text-[#707070] outline-0 ring-0"
                            />
                          </div>
                          <span
                            className={`${
                              errorId === "a" ? "invisible" : ""
                            }  text-sm text-red-600`}
                          >
                            {errorId}
                          </span>
                        </div>
                        <div className="w-full">
                          <div className="w-full  break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                            <input
                              name="Total"
                              onChange={handleChangeTotal}
                              value={formData.total_dolar}
                              placeholder={t("Total USD")}
                              type="text"
                              className="w-full bg-[#F9FAFF] font-Poppins-Regular text-xs text-[#707070] outline-0 ring-0"
                            />
                          </div>
                          <span
                            className={`${
                              errorDollar === "a" ? "invisible" : ""
                            } text-sm text-red-600`}
                          >
                            {errorDollar}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white  py-3  flex sm:flex-row-reverse justify-between mt-12">
                    <button
                      onClick={Add}
                      type="button"
                      disabled={!ready}
                      className={`${
                        ready ? "bg-[#B7C835]" : "bg-gray-600"
                      } flex flex-grow py-2  justify-center rounded-xl text-white`}
                    >
                      {t("Add Bill")}
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

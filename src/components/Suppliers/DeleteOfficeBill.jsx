/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosClose } from "react-icons/io";
import { t } from "i18next";
import {
  addAllSupplierBill,
  selectSupplierBills,
} from "../../GlobalData/Suppliers/gatSupplierBillsSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

export default function DeleteOfficeBill({
  UnCheck,
  page,
  ids,
  setIds,
  SetDataBeforeFilter,
  SetDataForFilter,
  open,
  setOpen,
  id,
}) {
  const SupplierBillSelector = useSelector(selectSupplierBills);
  const dispatch = useDispatch();
  const [ready, setReady] = useState(true);
  const cancelButtonRef = useRef(null);

  function close() {
    setOpen(false);
  }
  const [VoiceNumber, setVoiceNumber] = useState("");
  useEffect(() => {
    if (SupplierBillSelector.data) {
      SupplierBillSelector.data.map((item) => {
        item.bills.map((bill) => {
          bill.id === id && setVoiceNumber(bill.invoice_number);
        });
      });
    }
    // setVoiceNumber(
    //   SupplierBillSelector.data[i].bills.length > 0
    //     ? SupplierBillSelector.data[i].bills[
    //         SupplierBillSelector.data.bills.findIndex(
    //           (UnitItem) => UnitItem.id === id
    //         )
    //       ]?.invoice_number
    //     : ""
    // );
  }, [id]);

  // SupplierBillSelector.data[item.findIndex((UnitItem) => UnitItem.id === id)]
  //   ?.scientific_office_name;
  console.log(ids, "delete");
  const getSupplierBills = async (page) => {
    await axios.get(`lab-scope/bills?page=${page}`).then((response) => {
      console.log(response.data.data, "hi");
      dispatch(addAllSupplierBill(response.data));
      SetDataForFilter(response.data);
      SetDataBeforeFilter(response.data);
    });
  };
  const remove = async () => {
    setReady(false);
    console.log(ids.length);
    if (ids.length > 0) {
      await axios
        .delete(`lab-scope/bill-delete?bills_ids=${ids}`)
        .then((response) => {
          setReady(true);
          swal("Great!", `Well Done`, "success");
          setIds([]);
          getSupplierBills(page);
          setOpen(false);
        UnCheck();
        });
    } else {
      await axios
        .delete(`lab-scope/bill-delete?bills_ids=${id}`)
        .then((response) => {
          setReady(true);
          swal("Great!", `Well Done`, "success");

          getSupplierBills(page);
          setOpen(false);
        });
    }
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
                        {t("Delete Office Bill")}
                      </p>
                      <IoIosClose
                        className=" text-4xl  text-black border-[1px] rounded-full cursor-pointer bg-[#E4E7EC] "
                        onClick={() => close()}
                      />
                    </div>

                    <div className="flex flex-col space-y-5 w-full m-auto mt-10">
                      <div className={`space-y-5 flex-col `}>
                        <div className="w-full ">
                          <p className="w-fit  font-Poppins-Medium text-sm ">
                            {t("Do you want to delete This Bill?")} :{" "}
                            <span className="text-black ml-5">
                              {VoiceNumber}
                            </span>
                          </p>
                        </div>
                        <p className="text-sm text-yellow-500">
                          Warning : if u delete this bill all the pays that
                          attach to it will be removed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white  py-3  flex sm:flex-row-reverse justify-between mt-5">
                    <button
                      type="button"
                      disabled={!ready}
                      className={`${
                        ready ? "bg-red-600" : "bg-gray-600"
                      } flex  font-medium text-sm py-3 px-6  justify-center rounded-xl text-white`}
                      onClick={() => remove()}
                    >
                      {t("Yes")}
                    </button>
                    <button
                      type="button"
                      className="flex  font-medium text-sm py-3 px-6 bg-gray-500 justify-center rounded-xl text-white"
                      onClick={() => close()}
                    >
                      {t("No")}
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
import React, { useState } from "react";
import { FcPrint } from "react-icons/fc";
import { IoCalendarOutline } from "react-icons/io5";

import ReactDatePicker from "react-datepicker";
import { t } from "i18next";

function OfficesReport({ getOffices, section }) {
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [DataFilterd, setDataFilterd] = useState();

  const [nameDisable, setNameDisable] = useState(false);
  const [numberDisable, setNumberDisable] = useState(false);
  const [totalIDDisable, setTotalIDDisable] = useState(false);
  const [totoalDolarDisable, setTotoalDolarDisable] = useState(false);
  const [remainingDisable, setRemainingDisable] = useState(false);
  const [paidDisable, setPaidDisable] = useState(false);
  const [dateDisable, setDateDisable] = useState(false);

  const re = /^[0-9\b]+$/;

  const FromInput = React.forwardRef((props, ref) => {
    return (
      <div className="flex p-4 rounded-xl justify-between items-center w-full outline-0 border-2">
        <label className="text-[#98A2B3] text-xs mr-20 font-Poppins-Medium">
          {t("From")}
        </label>
        <div className=" flex items-center">
          <label
            onClick={props.onClick}
            ref={ref}
            className="text-black text-xs font-Poppins-Medium"
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

  const ToInput = React.forwardRef((props, ref) => {
    return (
      <div className="flex p-4 rounded-xl justify-between items-center w-full outline-0 border-2">
        <label className="text-[#98A2B3] text-xs mr-20 font-Poppins-Medium">
          {t("To")}
        </label>
        <div className=" flex items-center">
          <label
            onClick={props.onClick}
            ref={ref}
            className="text-black text-xs font-Poppins-Medium"
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

  const handleChangeName = (e) => {
    if (!e.target.value) {
      setDataFilterd();
      setDateDisable(false);
      setNumberDisable(false);
      setTotalIDDisable(false);
      setTotoalDolarDisable(false);
      setRemainingDisable(false);
      setPaidDisable(false);
    } else {
      setDateDisable(true);
      setNumberDisable(true);
      setTotalIDDisable(true);
      setTotoalDolarDisable(true);
      setRemainingDisable(true);
      setPaidDisable(true);
      let DataFiltered = getOffices.filter((item) => {
        return item.scientific_office_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      console.log(DataFiltered);
      setDataFilterd(DataFiltered);
    }
  };

  const handleChangeNumber = (e) => {
    if (!e.target.value) {
      setDataFilterd();
      setNameDisable(false);
      setDateDisable(false);
      setTotalIDDisable(false);
      setTotoalDolarDisable(false);
      setRemainingDisable(false);
      setPaidDisable(false);
    } else {
      setNameDisable(true);
      setDateDisable(true);
      setTotalIDDisable(true);
      setTotoalDolarDisable(true);
      setRemainingDisable(true);
      setPaidDisable(true);
      // let bills;
      // let DataFiltered = getOffices.filter((item) => {
      //   bills = item.bills_pays.filter((bill) => {
      //     return bill.invoice_number
      //       .toLowerCase()
      //       .includes(e.target.value.toLowerCase());
      //   });
      // });
      let Data = [];
      for (let i = 0; i < getOffices.length; i++) {
        Data[i] = {
          account_id: getOffices[i].account_id,
          added_date: getOffices[i].added_date,
          address: getOffices[i].address,
          bills_pays: getOffices[i].bills_pays.filter((bill) => {
            return bill.invoice_number
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          }),
          created_at: getOffices[i].created_at,
          id: getOffices[i].id,
          maintain_phone: getOffices[i].maintain_phone,
          phone: getOffices[i].phone,
          scientific_office_name: getOffices[i].scientific_office_name,
          updated_at: getOffices[i].updated_at,
        };
      }
      console.log(Data, "here");

      setDataFilterd(Data);
      console.log(DataFilterd, "filter");
    }
  };

  const handleChangeTotalID = (e) => {
    if (!e.target.value) {
      setDataFilterd();
      setNameDisable(false);
      setDateDisable(false);
      setNumberDisable(false);
      setTotoalDolarDisable(false);
      setRemainingDisable(false);
      setPaidDisable(false);
    } else {
      setNameDisable(true);
      setNumberDisable(true);
      setDateDisable(true);
      setTotoalDolarDisable(true);
      setRemainingDisable(true);
      setPaidDisable(true);
      // let bills;
      // let DataFiltered = getOffices.filter((item) => {
      //   bills = item.bills_pays.filter((bill) => {
      //     return bill.total_ID
      //       .toLowerCase()
      //       .includes(e.target.value.toLowerCase());
      //   });
      // });
      let Data = [];
      for (let i = 0; i < getOffices.length; i++) {
        Data[i] = {
          account_id: getOffices[i].account_id,
          added_date: getOffices[i].added_date,
          address: getOffices[i].address,
          bills_pays: getOffices[i].bills_pays.filter((bill) => {
            return bill.total_ID == e.target.value;
          }),
          created_at: getOffices[i].created_at,
          id: getOffices[i].id,
          maintain_phone: getOffices[i].maintain_phone,
          phone: getOffices[i].phone,
          scientific_office_name: getOffices[i].scientific_office_name,
          updated_at: getOffices[i].updated_at,
        };
      }
      console.log(Data, "here");

      setDataFilterd(Data);
      console.log(DataFilterd, "filter");
    }
  };

  const handleChangeTotalDolar = (e) => {
    if (!e.target.value) {
      setDataFilterd();
      setNameDisable(false);
      setDateDisable(false);
      setNumberDisable(false);
      setTotalIDDisable(false);
      setRemainingDisable(false);
      setPaidDisable(false);
    } else {
      setNameDisable(true);
      setNumberDisable(true);
      setTotalIDDisable(true);
      setDateDisable(true);
      setRemainingDisable(true);
      setPaidDisable(true);
      // let bills;
      // let DataFiltered = getOffices.filter((item) => {
      //   bills = item.bills_pays.filter((bill) => {
      //     return bill.total_dolar
      //       .toLowerCase()
      //       .includes(e.target.value.toLowerCase());
      //   });
      // });
      let Data = [];
      for (let i = 0; i < getOffices.length; i++) {
        Data[i] = {
          account_id: getOffices[i].account_id,
          added_date: getOffices[i].added_date,
          address: getOffices[i].address,
          bills_pays: getOffices[i].bills_pays.filter((bill) => {
            return bill.total_dolar == e.target.value;
          }),
          created_at: getOffices[i].created_at,
          id: getOffices[i].id,
          maintain_phone: getOffices[i].maintain_phone,
          phone: getOffices[i].phone,
          scientific_office_name: getOffices[i].scientific_office_name,
          updated_at: getOffices[i].updated_at,
        };
      }
      console.log(Data, "here");

      setDataFilterd(Data);
      console.log(DataFilterd, "filter");
    }
  };
  return (
    <div className={`${section === "offices" ? "block" : "hidden"}`}>
      <div className="bg-white mt-5 p-5 rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3  ">
          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
            <input
              onChange={handleChangeName}
              name="OfficeName"
              disabled={nameDisable}
              placeholder={t("Office name")}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
            />
          </div>
          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
            <input
              name="InvoiceNumber"
              onChange={handleChangeNumber}
              disabled={numberDisable}
              placeholder={t("Invoice number")}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
            />
          </div>
          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
            <input
              disabled={totalIDDisable}
              onChange={handleChangeTotalID}
              name="TotalAmountBillID"
              placeholder={t("Total amount bill IQD")}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
            />
          </div>
          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
            <input
              disabled={totoalDolarDisable}
              onChange={handleChangeTotalDolar}
              name="TotalAmountBillDollar"
              placeholder={t("Total amount bill $")}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
            />
          </div>
          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
            <input
              disabled={paidDisable}
              name="TheAmountPaid"
              placeholder={t("The amount paid")}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
            />
          </div>
          <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
            <input
              disabled={remainingDisable}
              name="RemainingAmount"
              placeholder={t("Remaining amount")}
              type="text"
              className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
            />
          </div>
          <div className="w-full flex ">
            <ReactDatePicker
              id="date"
              dateFormat="yyyy/MM/dd"
              disabled={dateDisable}
              className=" "
              customInput={<FromInput />}
              selected={FromDate}
              onChange={(date) => setFromDate(date)}
            />
          </div>
          <div className="w-full flex ">
            <ReactDatePicker
              id="date"
              dateFormat="yyyy/MM/dd"
              disabled={dateDisable}
              className=" "
              customInput={<ToInput />}
              selected={ToDate}
              onChange={(date) => setToDate(date)}
            />
          </div>
          <div className="flex items-center space-x-5">
            <button
              type="button"
              className="flex border-[#D0D5DD] border-[1px] w-2/5 py-3 font-Poppins-Medium text-sm  bg-[#FFFFFF] justify-center rounded-xl text-black"
            >
              {t("Reset")}
            </button>

            <button
              type="button"
              className="flex  flex-grow py-3 font-Poppins-Medium text-sm  bg-[#B7C835] justify-center rounded-xl text-white"
            >
              {t("Apply")}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 lg:grid-cols-5 gap-5 items-center">
        <div className="flex flex-col w-full text-center h-full items-center bg-white space-y-3 px-10 py-6 rounded-2xl">
          <h1 className="font-Poppins-Bold  text-base">10000</h1>
          <p className="font-Poppins-Regular text-xs">{t("Offices")}</p>
        </div>
        <div className="flex flex-col w-full text-center h-full items-center bg-white space-y-3 px-10 py-6 rounded-2xl">
          <h1 className="font-Poppins-Bold  text-base">10000</h1>
          <p className="font-Poppins-Regular text-xs">
            {t("Total amount IQD")}
          </p>
        </div>
        <div className="flex flex-col w-full text-center h-full items-center bg-white space-y-3 px-10 py-6 rounded-2xl">
          <h1 className="font-Poppins-Bold  text-base">10000</h1>
          <p className="font-Poppins-Regular text-xs">{t("Total amount $")}</p>
        </div>
        <div className="flex flex-col w-full text-center h-full items-center bg-white space-y-3 px-10 py-6 rounded-2xl">
          <h1 className="font-Poppins-Bold  text-base">10000</h1>
          <p className="font-Poppins-Regular text-xs">{t("Amount paid")}</p>
        </div>
        <div className="flex flex-col w-full text-center h-full items-center bg-white space-y-3 px-10 py-6 rounded-2xl">
          <h1 className="font-Poppins-Bold  text-base">10000</h1>
          <p className="font-Poppins-Regular text-xs">
            {t("Remaining amount")}
          </p>
        </div>
      </div>

      <div className="w-full h-full flex flex-col  bg-white px-8 pt-10 pb-5 rounded-lg mt-5">
        <div className="flex justify-between w-full">
          <h1 className="font-Poppins-Medium text-lg ">
            {t("Scientific offices")}
          </h1>
          <div className="w-fit border-2 rounded-xl items-center flex space-x-5 px-10">
            <FcPrint className="text-xl" />
            <p className="font-Poppins-Medium text-sm">{t("Print")}</p>
          </div>
        </div>
        <div className="overflow-scroll scrollbar-hide h-64  w-full mt-5">
          <table className=" w-full    mb-5">
            <tr className="border-y-2 sticky top-0 bg-white">
              <td className="py-3 text-[#667085] pr-20 lg:pr-2 font-Poppins-Regular text-sm  w-[15%]">
                {t("Date")}
              </td>
              <td className="py-3 text-[#667085]  pr-20 lg:pr-2 font-Poppins-Regular  text-sm  ">
                {t("Office name")}
              </td>
              <td className="py-3 text-[#667085] pr-20 lg:pr-2 font-Poppins-Regular text-sm ">
                {t("Invoice number")}
              </td>
              <td className="py-3 text-[#667085] pr-20 lg:pr-2 font-Poppins-Regular text-sm ">
                {t("Total amount bill IQD")}
              </td>
              <td className="py-3 text-[#667085] pr-20 lg:pr-2 font-Poppins-Regular text-sm ">
                {t("Total amount bill $")}
              </td>
              <td className="py-3 text-[#667085] pr-20 lg:pr-2 font-Poppins-Regular text-sm ">
                {t("Amount paid")}
              </td>
              <td className="py-3 text-[#667085] pr-20 lg:pr-2 font-Poppins-Regular text-sm ">
                {t("Remaining amount")}
              </td>
            </tr>
            {DataFilterd &&
              DataFilterd.map(
                (supplier) =>
                  supplier.bills_pays &&
                  supplier.bills_pays.map(
                    (bill) =>
                      bill.pays &&
                      bill.pays.map((pay) => (
                        <tr className="mt-2 border-b-[1px]">
                          <td className="py-[0.4rem] ">
                            <div className="flex items-center">
                              <p className=" text-sm font-Poppins-Regular">
                                {bill.date_invoice}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 text-sm font-Poppins-Regular">
                            {supplier.scientific_office_name}
                          </td>
                          <td className="py-3 text-sm font-Poppins-Regular">
                            {bill.invoice_number}
                          </td>
                          <td className="py-3 text-sm font-Poppins-Regular">
                            {bill.total_ID}
                          </td>
                          <td className="py-3 text-sm font-Poppins-Regular">
                            {bill.total_dolar}
                          </td>
                          <td className="py-3 text-sm font-Poppins-Regular">
                            {pay.Amount_ID_before_payment -
                              pay.Amount_ID_after_payment}
                          </td>
                          <td className="py-3 text-sm font-Poppins-Regular">
                            {pay.Amount_ID_after_payment}
                          </td>
                        </tr>
                      ))
                  )
              )}

            {/* <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">07/05/2022</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">#526587</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">95715328</td>
              <td className="py-3 text-sm font-Poppins-Regular">57895123</td>
              <td className="py-3 text-sm font-Poppins-Regular">75315946</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">07/05/2022</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">#526587</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">95715328</td>
              <td className="py-3 text-sm font-Poppins-Regular">57895123</td>
              <td className="py-3 text-sm font-Poppins-Regular">75315946</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">07/05/2022</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">#526587</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">95715328</td>
              <td className="py-3 text-sm font-Poppins-Regular">57895123</td>
              <td className="py-3 text-sm font-Poppins-Regular">75315946</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">07/05/2022</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">#526587</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">95715328</td>
              <td className="py-3 text-sm font-Poppins-Regular">57895123</td>
              <td className="py-3 text-sm font-Poppins-Regular">75315946</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">07/05/2022</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">#526587</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">95715328</td>
              <td className="py-3 text-sm font-Poppins-Regular">57895123</td>
              <td className="py-3 text-sm font-Poppins-Regular">75315946</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">07/05/2022</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">#526587</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">95715328</td>
              <td className="py-3 text-sm font-Poppins-Regular">57895123</td>
              <td className="py-3 text-sm font-Poppins-Regular">75315946</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">07/05/2022</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">#526587</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">95715328</td>
              <td className="py-3 text-sm font-Poppins-Regular">57895123</td>
              <td className="py-3 text-sm font-Poppins-Regular">75315946</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">07/05/2022</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">#526587</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">95715328</td>
              <td className="py-3 text-sm font-Poppins-Regular">57895123</td>
              <td className="py-3 text-sm font-Poppins-Regular">75315946</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">07/05/2022</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">#526587</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">95715328</td>
              <td className="py-3 text-sm font-Poppins-Regular">57895123</td>
              <td className="py-3 text-sm font-Poppins-Regular">75315946</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">07/05/2022</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">#526587</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">95715328</td>
              <td className="py-3 text-sm font-Poppins-Regular">57895123</td>
              <td className="py-3 text-sm font-Poppins-Regular">75315946</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">07/05/2022</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">#526587</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">95715328</td>
              <td className="py-3 text-sm font-Poppins-Regular">57895123</td>
              <td className="py-3 text-sm font-Poppins-Regular">75315946</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">07/05/2022</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">#526587</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">95715328</td>
              <td className="py-3 text-sm font-Poppins-Regular">57895123</td>
              <td className="py-3 text-sm font-Poppins-Regular">75315946</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">07/05/2022</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">#526587</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">95715328</td>
              <td className="py-3 text-sm font-Poppins-Regular">57895123</td>
              <td className="py-3 text-sm font-Poppins-Regular">75315946</td>
            </tr>
            <tr className="mt-2 border-b-[1px]">
              <td className="py-[0.4rem] ">
                <div className="flex items-center">
                  <p className=" text-sm font-Poppins-Regular">07/05/2022</p>
                </div>
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">
                Arlene McCoy
              </td>
              <td className="py-3 text-sm font-Poppins-Regular">#526587</td>
              <td className="py-3 text-sm font-Poppins-Regular">41236988</td>
              <td className="py-3 text-sm font-Poppins-Regular">95715328</td>
              <td className="py-3 text-sm font-Poppins-Regular">57895123</td>
              <td className="py-3 text-sm font-Poppins-Regular">75315946</td>
            </tr> */}
          </table>
        </div>
      </div>
    </div>
  );
}

export default OfficesReport;

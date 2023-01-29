import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { IoCalendarOutline, IoTrashOutline } from "react-icons/io5";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import PangrationSuppliersPaidBills from "./components/Suppliers/PangrationSuppliersPaidBills";
import PayBill from "./components/Suppliers/PayBill";
import { VscListFlat } from "react-icons/vsc";
import AddPaidBill from "./components/Suppliers/AddPaidBill";

import Header from "./components/Header";
import { useTranslation } from "react-i18next";
import {
  addAllPaidBill,
  selectPaidBills,
} from "./GlobalData/Suppliers/getSupplierPaidBillsSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Pagination from "react-js-pagination";
import { TiEdit } from "react-icons/ti";
import moment from "moment";
import DeletePaidBill from "./components/Suppliers/DeletePaidBill";

const items = [
  {
    id: 1,
    name: "Office name",
    DateOfPurchase: "12/06/2020",
    InvoiceNumber: "#696589",
    Amout$BP: "2141242141",
    AmoutIBP: "36998745",
    Amout$AP: "32147896",
    AmoutIAP: "75315946",
  },
  {
    id: 1,
    name: "Office name",
    DateOfPurchase: "12/06/2020",
    InvoiceNumber: "#696589",
    Amout$BP: "2141242141",
    AmoutIBP: "36998745",
    Amout$AP: "32147896",
    AmoutIAP: "75315946",
  },
  {
    id: 1,
    name: "Office name",
    DateOfPurchase: "12/06/2020",
    InvoiceNumber: "#696589",
    Amout$BP: "2141242141",
    AmoutIBP: "36998745",
    Amout$AP: "32147896",
    AmoutIAP: "75315946",
  },
  {
    id: 1,
    name: "Office name",
    DateOfPurchase: "12/06/2020",
    InvoiceNumber: "#696589",
    Amout$BP: "2141242141",
    AmoutIBP: "36998745",
    Amout$AP: "32147896",
    AmoutIAP: "75315946",
  },
  {
    id: 1,
    name: "Office name",
    DateOfPurchase: "12/06/2020",
    InvoiceNumber: "#696589",
    Amout$BP: "2141242141",
    AmoutIBP: "36998745",
    Amout$AP: "32147896",
    AmoutIAP: "75315946",
  },
  {
    id: 1,
    name: "Office name",
    DateOfPurchase: "12/06/2020",
    InvoiceNumber: "#696589",
    Amout$BP: "2141242141",
    AmoutIBP: "36998745",
    Amout$AP: "32147896",
    AmoutIAP: "75315946",
  },
  {
    id: 1,
    name: "Office name",
    DateOfPurchase: "12/06/2020",
    InvoiceNumber: "#696589",
    Amout$BP: "2141242141",
    AmoutIBP: "36998745",
    Amout$AP: "32147896",
    AmoutIAP: "75315946",
  },
  {
    id: 1,
    name: "Office name",
    DateOfPurchase: "12/06/2020",
    InvoiceNumber: "#696589",
    Amout$BP: "2141242141",
    AmoutIBP: "36998745",
    Amout$AP: "32147896",
    AmoutIAP: "75315946",
  },
  {
    id: 1,
    name: "Office name",
    DateOfPurchase: "12/06/2020",
    InvoiceNumber: "#696589",
    Amout$BP: "2141242141",
    AmoutIBP: "36998745",
    Amout$AP: "32147896",
    AmoutIAP: "75315946",
  },
  {
    id: 1,
    name: "Office name",
    DateOfPurchase: "12/06/2020",
    InvoiceNumber: "#696589",
    Amout$BP: "2141242141",
    AmoutIBP: "36998745",
    Amout$AP: "32147896",
    AmoutIAP: "75315946",
  },
  {
    id: 1,
    name: "Office name",
    DateOfPurchase: "12/06/2020",
    InvoiceNumber: "#696589",
    Amout$BP: "2141242141",
    AmoutIBP: "36998745",
    Amout$AP: "32147896",
    AmoutIAP: "75315946",
  },
  {
    id: 1,
    name: "Office name",
    DateOfPurchase: "12/06/2020",
    InvoiceNumber: "#696589",
    Amout$BP: "2141242141",
    AmoutIBP: "36998745",
    Amout$AP: "32147896",
    AmoutIAP: "75315946",
  },
  {
    id: 1,
    name: "Office name",
    DateOfPurchase: "12/06/2020",
    InvoiceNumber: "#696589",
    Amout$BP: "2141242141",
    AmoutIBP: "36998745",
    Amout$AP: "32147896",
    AmoutIAP: "75315946",
  },
  {
    id: 1,
    name: "Office name",
    DateOfPurchase: "12/06/2020",
    InvoiceNumber: "#696589",
    Amout$BP: "2141242141",
    AmoutIBP: "36998745",
    Amout$AP: "32147896",
    AmoutIAP: "75315946",
  },
];

function SuppliersPaidBills() {
  const { t, i18n } = useTranslation();

  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [OpenAddPaidBill, setOpenAddPaidBill] = useState(false);
  const [OpenDeletePaidBill, setOpenDeletePaidBill] = useState(false);

  const dispatch = useDispatch();
  const PaidBillSelector = useSelector(selectPaidBills);
  const [DataBeforeFilter, SetDataBeforeFilter] = useState();
  const [id, setId] = useState();
  const [page, setPage] = useState(1);
  const [DataForFiler, SetDataForFilter] = useState();
  const [ids, setIds] = useState([]);

  const getPaidBills = async (page) => {
    await axios.get(`lab-scope/pays?page=${page}`).then((response) => {
      console.log(response.data, "hi");
      dispatch(addAllPaidBill(response.data));
      SetDataForFilter(response.data);
      SetDataBeforeFilter(response.data);
    });
  };
  useEffect(() => {
    getPaidBills(page);
  }, []);
  const FromInput = React.forwardRef((props, ref) => {
    return (
      <div className="flex p-2 bg-[#F9FAFF] print:hidden rounded-xl justify-between items-center w-fit outline-0 border-2">
        <label className="text-[#98A2B3] text-xs mr-20 font-Poppins-Regular">
          {t("From")}
        </label>
        <div className=" flex items-center">
          <label
            onClick={props.onClick}
            ref={ref}
            className="text-black font-Poppins-Regular"
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
      <div className="flex p-2 bg-[#F9FAFF] print:hidden rounded-xl justify-between items-center w-fit outline-0 border-2">
        <label className="text-[#98A2B3] text-xs mr-20 font-Poppins-Regular">
          {t("To")}
        </label>
        <div className=" flex items-center">
          <label
            onClick={props.onClick}
            ref={ref}
            className="text-black font-Poppins-Regular"
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

  const handlePageChange = (pageNumber) => {
    // console.log(`active page is ${pageNumber}`);
    // this.setState({ activePage: pageNumber });
    setPage(pageNumber);
    getPaidBills(pageNumber);
  };

  const ChangeFrom = (date) => {
    setFromDate(date);

    let secondData = [];
    let content = DataForFiler.data.map((item) => {
      return item.bills_pays.filter((bill) => {
        return (
          bill.date_invoice >= moment(`${date}`).format("YYYY-MM-DD") &&
          bill.date_invoice <= moment(`${ToDate}`).format("YYYY-MM-DD")
        );
      });
    });
    console.log(content);
    for (let i = 0; i < content.length; i++) {
      secondData[i] = {
        account_id: PaidBillSelector.data[i].account_id,
        added_date: PaidBillSelector.data[i].added_date,
        address: PaidBillSelector.data[i].address,
        bills_pays: content[i],
        created_at: PaidBillSelector.data[i].created_at,
        id: PaidBillSelector.data[i].id,
        maintain_phone: PaidBillSelector.data[i].maintain_phone,
        phone: PaidBillSelector.data[i].phone,
        scientific_office_name: PaidBillSelector.data[i].scientific_office_name,
        updated_at: PaidBillSelector.data[i].updated_at,
      };
    }
    let Data = {
      current_page: PaidBillSelector.current_page,
      data: secondData,
      first_page_url: PaidBillSelector.first_page_url,
      from: PaidBillSelector.from,
      last_page: PaidBillSelector.last_page,
      last_page_url: PaidBillSelector.last_page_url,
      links: PaidBillSelector.links,
      next_page_url: PaidBillSelector.next_page_url,
      path: PaidBillSelector.path,
      per_page: PaidBillSelector.per_page,
      prev_page_url: PaidBillSelector.prev_page_url,
      to: PaidBillSelector.to,
      total: PaidBillSelector.total,
    };
    // console.log(secondData, "sec");
    dispatch(addAllPaidBill(Data));
    // console.log(PaidBillSelector, "data");
  };

  const ChangeTo = (date) => {
    setToDate(date);

    let secondData = [];
    let content = DataForFiler.data.map((item) => {
      return item.bills_pays.filter((bill) => {
        console.log(bill, "item");

        return (
          bill.date_invoice >= moment(`${FromDate}`).format("YYYY-MM-DD") &&
          bill.date_invoice <= moment(`${date}`).format("YYYY-MM-DD")
        );
      });
    });
    for (let i = 0; i < content.length; i++) {
      secondData[i] = {
        account_id: PaidBillSelector.data[i].account_id,
        added_date: PaidBillSelector.data[i].added_date,
        address: PaidBillSelector.data[i].address,
        bills_pays: content[i],
        created_at: PaidBillSelector.data[i].created_at,
        id: PaidBillSelector.data[i].id,
        maintain_phone: PaidBillSelector.data[i].maintain_phone,
        phone: PaidBillSelector.data[i].phone,
        scientific_office_name: PaidBillSelector.data[i].scientific_office_name,
        updated_at: PaidBillSelector.data[i].updated_at,
      };
    }
    console.log(secondData);
    let Data = {
      current_page: PaidBillSelector.current_page,
      data: secondData,
      first_page_url: PaidBillSelector.first_page_url,
      from: PaidBillSelector.from,
      last_page: PaidBillSelector.last_page,
      last_page_url: PaidBillSelector.last_page_url,
      links: PaidBillSelector.links,
      next_page_url: PaidBillSelector.next_page_url,
      path: PaidBillSelector.path,
      per_page: PaidBillSelector.per_page,
      prev_page_url: PaidBillSelector.prev_page_url,
      to: PaidBillSelector.to,
      total: PaidBillSelector.total,
    };
    dispatch(addAllPaidBill(Data));
  };

  const SortChange = (e) => {
    if (e.target.value === "A-Z") {
      if (PaidBillSelector.data) {
        let arrayForSort = [...PaidBillSelector.data];
        arrayForSort.sort(function (a, b) {
          if (
            a.scientific_office_name.toLowerCase() <
            b.scientific_office_name.toLowerCase()
          ) {
            return -1;
          }
          if (
            a.scientific_office_name.toLowerCase() >
            b.scientific_office_name.toLowerCase()
          ) {
            return 1;
          }
          return 0;
        });
        let Data = {
          current_page: PaidBillSelector.current_page,
          data: arrayForSort,
          first_page_url: PaidBillSelector.first_page_url,
          from: PaidBillSelector.from,
          last_page: PaidBillSelector.last_page,
          last_page_url: PaidBillSelector.last_page_url,
          links: PaidBillSelector.links,
          next_page_url: PaidBillSelector.next_page_url,
          path: PaidBillSelector.path,
          per_page: PaidBillSelector.per_page,
          prev_page_url: PaidBillSelector.prev_page_url,
          to: PaidBillSelector.to,
          total: PaidBillSelector.total,
        };
        dispatch(addAllPaidBill(Data));
      }
    } else if (e.target.value === "Z-A") {
      if (PaidBillSelector.data) {
        let arrayForSort = [...PaidBillSelector.data];
        arrayForSort.sort(function (a, b) {
          if (
            a.scientific_office_name.toLowerCase() >
            b.scientific_office_name.toLowerCase()
          ) {
            return -1;
          }
          if (
            a.scientific_office_name.toLowerCase() <
            b.scientific_office_name.toLowerCase()
          ) {
            return 1;
          }
          return 0;
        });
        let Data = {
          current_page: PaidBillSelector.current_page,
          data: arrayForSort,
          first_page_url: PaidBillSelector.first_page_url,
          from: PaidBillSelector.from,
          last_page: PaidBillSelector.last_page,
          last_page_url: PaidBillSelector.last_page_url,
          links: PaidBillSelector.links,
          next_page_url: PaidBillSelector.next_page_url,
          path: PaidBillSelector.path,
          per_page: PaidBillSelector.per_page,
          prev_page_url: PaidBillSelector.prev_page_url,
          to: PaidBillSelector.to,
          total: PaidBillSelector.total,
        };
        dispatch(addAllPaidBill(Data));
      }
    }
  };

  const deletePaidBill = (id) => {
    setId(id);
    setOpenDeletePaidBill(true);
  };

  const print = () => {
    window.print();
  };

  const Checkall = () => {
    if (document.getElementById("HeadCheck").checked) {
      let checks = document.getElementsByName("check");
      for (let i = 0; i <= checks.length; i++) {
        if (checks[i].value) {
          setIds((ids) => [...ids, checks[i].value]);
        }

        console.log(checks[i].value);
        checks[i].checked = true;
      }
    } else if (!document.getElementById("HeadCheck").checked) {
      setIds([]);
      let checks = document.getElementsByName("check");
      for (let i = 0; i <= checks.length; i++) {
        checks[i].checked = false;
        // idList = [];
      }
    }
  };

  const UnCheck = () => {
    document.getElementById("HeadCheck").checked = false;
    setIds([]);
    let checks = document.getElementsByName("check");
    for (let i = 0; i <= checks.length; i++) {
      checks[i].checked = false;
    }
  };
  const CheckChild = (e) => {
    if (e.target.checked) {
      setIds((ids) => [...ids, e.target.value]);
    } else {
      let filtered = ids.filter(function (value, index, arr) {
        return value !== e.target.value;
      });

      setIds(filtered);
    }
  };
  return (
    <div className="w-full h-full pr-5 p-5">
      {/* <AddPaidBill
    
        open={OpenAddPaidBill}
        setOpen={setOpenAddPaidBill}
      /> */}

      <DeletePaidBill
        UnCheck={UnCheck}
        setIds={setIds}
        ids={ids}
        page={page}
        SetDataForFilter={SetDataForFilter}
        SetDataBeforeFilter={SetDataBeforeFilter}
        id={id}
        open={OpenDeletePaidBill}
        setOpen={setOpenDeletePaidBill}
      />

      <div className="w-full flex ">
        <Header section="PaidBills" DataBeforeFilter={DataBeforeFilter} />
      </div>
      <div className="flex ">
        <SideBar page="Suppliers" />
        <div className="w-full h-full lg:ml-8 mt-10">
          <div className="flex w-full flex-col lg:flex-row justify-between">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-1 lg:gap-0 lg:grid-cols-1 w-full space-x-2">
              <div className="w-full flex flex-col lg:flex-row">
                <div className="print:hidden w-fit pr-2 bg-white rounded-lg flex items-center mr-5">
                  <select
                    onChange={SortChange}
                    className=" w-fit  rounded-lg font-Poppins-Regular  text-base outline-none px-4 py-2 cursor-pointer"
                  >
                    <option value="" selected disabled hidden>
                      {t("Sort by")}
                    </option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                  </select>
                </div>
                <div className="w-full flex justify-start space-x-2 mt-5 lg:mt-0 md:col-start-2 md:col-end-4 lg:col-start-2 lg:col-end-5">
                  <Link
                    to="/Suppliers"
                    className="bg-white w-fit print:hidden flex items-center px-4 py-2 lg:py-0 rounded-xl cursor-pointer"
                  >
                    <p className="text-[#101828] text-center">
                      {t("Scientific office names")}
                    </p>
                  </Link>

                  <Link
                    to="/Suppliers/OfficeBills"
                    className="bg-white print:hidden w-fit flex items-center px-4 py-2 lg:py-0 rounded-xl cursor-pointer"
                  >
                    <p className="text-[#101828] text-center">
                      {t("Scientific office bills")}
                    </p>
                  </Link>

                  <Link
                    to="/Suppliers/PaidBills"
                    className="bg-[#B7C835] w-fit flex items-center px-4 py-2 lg:py-0 rounded-xl cursor-pointer"
                  >
                    <p className="text-white text-center">{t("Paid bills")}</p>
                  </Link>
                </div>
              </div>
              <div className="flex mt-5 flex-col md:flex-row  space-y-2 md:space-y-0  md:space-x-10">
                <div className="w-fit flex ">
                  <ReactDatePicker
                    id="date"
                    dateFormat="yyyy/MM/dd"
                    className=" "
                    customInput={<FromInput />}
                    selected={FromDate}
                    onChange={(date) => ChangeFrom(date)}
                  />
                </div>
                <div className="w-fit flex ">
                  <ReactDatePicker
                    id="date"
                    dateFormat="yyyy/MM/dd"
                    className=" "
                    customInput={<ToInput />}
                    selected={ToDate}
                    onChange={(date) => ChangeTo(date)}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={print}
              className="print:hidden h-fit w-fit mt-5 lg:mt-0 p-2 bg-white rounded-xl"
            >
              Print
            </button>
          </div>
          {/* Pangration */}
          <div className=" overflow-x-scroll lg:scrollbar-hide print:scrollbar-hide">
            <table className="w-full h-full mt-5 bg-white rounded-t-2xl ">
              <tr className="border-b-[1px] w-full">
                <td className="w-[4%]">
                  <input
                    id="HeadCheck"
                    onClick={() => Checkall()}
                    type="checkbox"
                    className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 "
                  />
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular px-5 md:px-0  py-2 w-[10%]">
                  {t("Scientific office name")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular px-5 md:px-0  py-2 w-[10%] ">
                  {t("Date of purchase")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular px-5 md:px-0  py-2  w-[10%]">
                  {t("Invoice number")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular px-5 md:px-0  py-2 w-[10%] ">
                  {t("Amount $ before payment")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular  px-5 md:px-0 py-2 w-[10%]">
                  {t("Amount IQD before payment")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular  px-5 md:px-0 py-2 w-[10%]">
                  {t("Amount $ after payment")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular  px-5 md:px-0 py-2 w-[10%]">
                  {t("Amount IQD after payment")}
                </td>
                <td className="text-sm print:hidden text-[#98A2B3] font-Poppins-Regular px-5 md:px-0  py-2 w-[10%]">
                  {t("Action")}
                </td>
              </tr>
              {console.log(PaidBillSelector)}
              {PaidBillSelector.data &&
                PaidBillSelector.data.map(
                  (supplier) =>
                    supplier.bills_pays &&
                    supplier.bills_pays.map(
                      (bill) =>
                        bill.pays &&
                        bill.pays.map((pay) => (
                          <tr className="border-b-[1px] ">
                            <td className="w-fit">
                              <input
                                value={pay.id}
                                onClick={CheckChild}
                                name="check"
                                type="checkbox"
                                className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 w-fit"
                              />
                            </td>
                            <td className="font-Poppins-Regular text-black text-base font-semibold py-6 ">
                              {supplier.scientific_office_name}
                            </td>
                            <td className="font-Poppins-Regular text-black text-base font-semibold py-6 ">
                              {bill.date_invoice}
                            </td>
                            <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-2">
                              {bill.invoice_number}
                            </td>
                            <td className="font-Poppins-Regular text-black text-base font-semibold py-6">
                              {pay.Amount_$_before_payment}
                            </td>
                            <td className="font-Poppins-Regular text-black text-base font-semibold py-6">
                              {pay.Amount_ID_before_payment}
                            </td>
                            <td className="font-Poppins-Regular text-black text-base font-semibold py-6">
                              {pay.Amount_$_after_payment}
                            </td>
                            <td className="font-Poppins-Regular text-black text-base font-semibold py-6">
                              {pay.Amount_ID_after_payment}
                            </td>

                            <td>
                              <div className="print:hidden flex space-x-2 py-4">
                                {/* <TiEdit className="text-2xl  opacity-50 cursor-pointer" /> */}
                                <IoTrashOutline
                                  onClick={() => deletePaidBill(pay.id)}
                                  className="text-2xl text-[#F04438] cursor-pointer"
                                />
                              </div>
                            </td>
                          </tr>
                        ))
                    )
                )}
            </table>
          </div>
          <div className="flex justify-center ">
            <Pagination
              activePage={PaidBillSelector.current_page}
              itemsCountPerPage={PaidBillSelector.per_page}
              totalItemsCount={PaidBillSelector.total}
              pageRangeDisplayed={5}
              innerClass="flex justify-center space-x-5 mb-2 border-gray-400 w-full  bottom-0   items-center mt-10"
              itemClass=" bg-white  font-Poppins-Regular py-1 px-3 rounded-lg"
              activeClass="bg-[#B7C835] text-[#FFFFFF]"
              onChange={handlePageChange.bind(this)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuppliersPaidBills;

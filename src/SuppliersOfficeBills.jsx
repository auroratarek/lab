import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { IoCalendarOutline, IoTrashOutline } from "react-icons/io5";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { VscListFlat } from "react-icons/vsc";
import PangrationSuppliersOfficeBill from "./components/Suppliers/PangrationSuppliersOfficeBill";
import EditOfficeBills from "./components/Suppliers/EditOfficeBills";
import DeleteOfficeBill from "./components/Suppliers/DeleteOfficeBill";

import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import PayBill from "./components/Suppliers/PayBill";
import axios from "axios";
import {
  addAllSupplierBill,
  selectSupplierBills,
} from "./GlobalData/Suppliers/gatSupplierBillsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RiSendPlaneLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import Pagination from "react-js-pagination";
import moment from "moment";

const products = [
  {
    id: 1,
    name: "wewe",
    DateOfPurchase: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    InvoiceNumber: "2131242141",
    TotalPayment: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    DateOfPurchase: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    InvoiceNumber: "2131242141",
    TotalPayment: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    DateOfPurchase: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    InvoiceNumber: "2131242141",
    TotalPayment: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    DateOfPurchase: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    InvoiceNumber: "2131242141",
    TotalPayment: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    DateOfPurchase: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    InvoiceNumber: "2131242141",
    TotalPayment: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    DateOfPurchase: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    InvoiceNumber: "2131242141",
    TotalPayment: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    DateOfPurchase: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    InvoiceNumber: "2131242141",
    TotalPayment: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    DateOfPurchase: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    InvoiceNumber: "2131242141",
    TotalPayment: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    DateOfPurchase: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    InvoiceNumber: "2131242141",
    TotalPayment: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    DateOfPurchase: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    InvoiceNumber: "2131242141",
    TotalPayment: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    DateOfPurchase: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    InvoiceNumber: "2131242141",
    TotalPayment: "2141242141",
  },
];

function SuppliersOfficeBills() {
  const { t, i18n } = useTranslation();
  const SupplierBillSelector = useSelector(selectSupplierBills);
  const dispatch = useDispatch();
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [OpenDeleteOfficeBill, setOpenDeleteOfficeBill] = useState(false);
  const [OpenEditOfficeBill, setOpenEditOfficeBill] = useState(false);
  const [OpenPayBill, setPayBill] = useState(false);
  const [id, setId] = useState();
  const [DataBeforeFilter, SetDataBeforeFilter] = useState();
  const [page, setPage] = useState(1);
  const [DataForFiler, SetDataForFilter] = useState();
  const [ids, setIds] = useState([]);

  const getSupplierBills = async (page) => {
    await axios.get(`lab-scope/bills?page=${page}`).then((response) => {
      console.log(response.data, "hi");
      dispatch(addAllSupplierBill(response.data));
      SetDataForFilter(response.data);
      SetDataBeforeFilter(response.data);
      console.log(SupplierBillSelector);
    });
  };
  useEffect(() => {
    getSupplierBills(page);
  }, []);
  const FromInput = React.forwardRef((props, ref) => {
    return (
      <div className="flex p-2 bg-[#F9FAFF] rounded-xl justify-between items-center w-fit print:hidden outline-0 border-2">
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
      <div className="flex p-2 bg-[#F9FAFF] rounded-xl justify-between items-center w-fit print:hidden outline-0 border-2">
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

  const DoPayBill = (id) => {
    setId(id);
    setPayBill(true);
  };

  const Edit = (id) => {
    setId(id);
    setOpenEditOfficeBill(true);
  };

  const Delete = (id) => {
    setId(id);
    setOpenDeleteOfficeBill(true);
  };

  const handlePageChange = (pageNumber) => {
    // console.log(`active page is ${pageNumber}`);
    // this.setState({ activePage: pageNumber });
    setPage(pageNumber);
    getSupplierBills(pageNumber);
  };

  const SortChange = (e) => {
    console.log(SupplierBillSelector);
    if (e.target.value === "A-Z") {
      if (SupplierBillSelector) {
        console.log(SupplierBillSelector.data);
        let arrayForSort = [...SupplierBillSelector.data];
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
          current_page: SupplierBillSelector.current_page,
          data: arrayForSort,
          first_page_url: SupplierBillSelector.first_page_url,
          from: SupplierBillSelector.from,
          last_page: SupplierBillSelector.last_page,
          last_page_url: SupplierBillSelector.last_page_url,
          links: SupplierBillSelector.links,
          next_page_url: SupplierBillSelector.next_page_url,
          path: SupplierBillSelector.path,
          per_page: SupplierBillSelector.per_page,
          prev_page_url: SupplierBillSelector.prev_page_url,
          to: SupplierBillSelector.to,
          total: SupplierBillSelector.total,
        };
        dispatch(addAllSupplierBill(Data));
      }
    } else if (e.target.value === "Z-A") {
      if (SupplierBillSelector) {
        console.log(SupplierBillSelector.data);
        let arrayForSort = [...SupplierBillSelector.data];
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
          current_page: SupplierBillSelector.current_page,
          data: arrayForSort,
          first_page_url: SupplierBillSelector.first_page_url,
          from: SupplierBillSelector.from,
          last_page: SupplierBillSelector.last_page,
          last_page_url: SupplierBillSelector.last_page_url,
          links: SupplierBillSelector.links,
          next_page_url: SupplierBillSelector.next_page_url,
          path: SupplierBillSelector.path,
          per_page: SupplierBillSelector.per_page,
          prev_page_url: SupplierBillSelector.prev_page_url,
          to: SupplierBillSelector.to,
          total: SupplierBillSelector.total,
        };
        dispatch(addAllSupplierBill(Data));
      }
    }
  };
  const ChangeFrom = (date) => {
    setFromDate(date);
    let secondData = [];
    let content = DataForFiler.data.map((item) => {
      return item.bills.filter((bill) => {
        return (
          bill.date_invoice >= moment(`${date}`).format("YYYY-MM-DD") &&
          bill.date_invoice <= moment(`${ToDate}`).format("YYYY-MM-DD")
        );
      });
    });
    console.log(SupplierBillSelector.data[0]);
    for (let i = 0; i < content.length; i++) {
      secondData[i] = {
        account_id: SupplierBillSelector.data[i].account_id,
        added_date: SupplierBillSelector.data[i].added_date,
        address: SupplierBillSelector.data[i].address,
        bills: content[i],
        created_at: SupplierBillSelector.data[i].created_at,
        id: SupplierBillSelector.data[i].id,
        maintain_phone: SupplierBillSelector.data[i].maintain_phone,
        phone: SupplierBillSelector.data[i].phone,
        scientific_office_name:
          SupplierBillSelector.data[i].scientific_office_name,
        updated_at: SupplierBillSelector.data[i].updated_at,
      };
    }
    let Data = {
      current_page: SupplierBillSelector.current_page,
      data: secondData,
      first_page_url: SupplierBillSelector.first_page_url,
      from: SupplierBillSelector.from,
      last_page: SupplierBillSelector.last_page,
      last_page_url: SupplierBillSelector.last_page_url,
      links: SupplierBillSelector.links,
      next_page_url: SupplierBillSelector.next_page_url,
      path: SupplierBillSelector.path,
      per_page: SupplierBillSelector.per_page,
      prev_page_url: SupplierBillSelector.prev_page_url,
      to: SupplierBillSelector.to,
      total: SupplierBillSelector.total,
    };
    dispatch(addAllSupplierBill(Data));
  };

  const ChangeTo = (date) => {
    setToDate(date);
    let secondData = [];
    let content = DataForFiler.data.map((item) => {
      return item.bills.filter((bill) => {
        return (
          bill.date_invoice >= moment(`${FromDate}`).format("YYYY-MM-DD") &&
          bill.date_invoice <= moment(`${date}`).format("YYYY-MM-DD")
        );
      });
    });
    console.log(SupplierBillSelector.data[0]);
    for (let i = 0; i < content.length; i++) {
      secondData[i] = {
        account_id: SupplierBillSelector.data[i].account_id,
        added_date: SupplierBillSelector.data[i].added_date,
        address: SupplierBillSelector.data[i].address,
        bills: content[i],
        created_at: SupplierBillSelector.data[i].created_at,
        id: SupplierBillSelector.data[i].id,
        maintain_phone: SupplierBillSelector.data[i].maintain_phone,
        phone: SupplierBillSelector.data[i].phone,
        scientific_office_name:
          SupplierBillSelector.data[i].scientific_office_name,
        updated_at: SupplierBillSelector.data[i].updated_at,
      };
    }
    let Data = {
      current_page: SupplierBillSelector.current_page,
      data: secondData,
      first_page_url: SupplierBillSelector.first_page_url,
      from: SupplierBillSelector.from,
      last_page: SupplierBillSelector.last_page,
      last_page_url: SupplierBillSelector.last_page_url,
      links: SupplierBillSelector.links,
      next_page_url: SupplierBillSelector.next_page_url,
      path: SupplierBillSelector.path,
      per_page: SupplierBillSelector.per_page,
      prev_page_url: SupplierBillSelector.prev_page_url,
      to: SupplierBillSelector.to,
      total: SupplierBillSelector.total,
    };
    dispatch(addAllSupplierBill(Data));
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

        document
          .getElementById(`Send-${checks[i].value}`)
          .classList.add("hidden");

        console.log(checks[i].value);
        checks[i].checked = true;
      }
    } else if (!document.getElementById("HeadCheck").checked) {
      setIds([]);
      let checks = document.getElementsByName("check");
      for (let i = 0; i <= checks.length; i++) {
        document
          .getElementById(`Send-${checks[i].value}`)
          .classList.remove("hidden");
        checks[i].checked = false;
        // idList = [];
      }
    }
  };

  const CheckChild = (e) => {
    if (e.target.checked) {
      setIds((ids) => [...ids, e.target.value]);
      document.getElementById(`Send-${e.target.value}`).classList.add("hidden");
    } else {
      let filtered = ids.filter(function (value, index, arr) {
        return value !== e.target.value;
      });

      document
        .getElementById(`Send-${e.target.value}`)
        .classList.remove("hidden");
      setIds(filtered);
    }
  };

  const UnCheck = () => {
    document.getElementById("HeadCheck").checked = false;
    setIds([]);
    let checks = document.getElementsByName("check");
    for (let i = 0; i <= checks.length; i++) {
      checks[i].checked = false;
      document
        .getElementById(`Send-${checks[i].value}`)
        .classList.remove("hidden");
    }
  };
  return (
    <div className="w-full h-full p-5 pr-5">
      <PayBill id={id} open={OpenPayBill} setOpen={setPayBill} />

      <DeleteOfficeBill
        UnCheck={UnCheck}
        setIds={setIds}
        page={page}
        ids={ids}
        SetDataBeforeFilter={SetDataBeforeFilter}
        SetDataForFilter={SetDataForFilter}
        id={id}
        open={OpenDeleteOfficeBill}
        setOpen={setOpenDeleteOfficeBill}
      />
      <EditOfficeBills
        page={page}
        SetDataBeforeFilter={SetDataBeforeFilter}
        SetDataForFilter={SetDataForFilter}
        id={id}
        open={OpenEditOfficeBill}
        setOpen={setOpenEditOfficeBill}
      />
      <div className="w-full flex ">
        <Header section="OFficeBills" DataBeforeFilter={DataBeforeFilter} />
      </div>
      <div className="flex ">
        <SideBar page="Suppliers" />
        <div className="w-full h-full lg:ml-8 mt-10">
          <div className="flex w-full flex-col lg:flex-row justify-between">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-1 lg:gap-0 lg:grid-cols-1 w-full space-x-2">
              <div className="w-full flex flex-col lg:flex-row">
                <div className="w-fit pr-2 print:hidden bg-white rounded-lg flex items-center ">
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
                <div className="lg:ml-4 mt-5 lg:mt-0 w-full flex space-x-2 md:col-start-2 md:col-end-4 lg:col-start-2 lg:col-end-5">
                  <Link
                    to="/Suppliers"
                    className="bg-white print:hidden w-fit flex items-center px-4 py-2 lg:py-0 rounded-xl cursor-pointer"
                  >
                    <p className="text-[#101828] text-center">
                      {t("Scientific office names")}
                    </p>
                  </Link>

                  <Link
                    to="/Suppliers/OfficeBills"
                    className=" bg-[#B7C835] w-fit flex items-center px-4 py-2 lg:py-0 rounded-xl cursor-pointer"
                  >
                    <p className=" text-white text-center">
                      {t("Scientific office bills")}
                    </p>
                  </Link>

                  <Link
                    to="/Suppliers/PaidBills"
                    className="bg-white print:hidden w-fit flex items-center px-4 py-2 lg:py-0 rounded-xl cursor-pointer"
                  >
                    <p className="text-[#101828] text-center">
                      {t("Paid bills")}
                    </p>
                  </Link>
                </div>
                <button
                  onClick={print}
                  className="print:hidden p-2 w-fit mt-5 lg:mt-0 bg-white rounded-xl"
                >
                  Print
                </button>
              </div>
              <div className="flex flex-col md:flex-row mt-5 space-y-2 md:space-y-0  md:space-x-10">
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
          </div>
          {console.log(ids, "ids")}
          {/* Pangration */}
          <div className=" overflow-x-scroll">
            <table className="w-full h-full mt-5 bg-white rounded-t-2xl">
              <tr className="border-b-[1px] w-full">
                <td className="w-fit">
                  <input
                    id="HeadCheck"
                    onClick={() => Checkall()}
                    type="checkbox"
                    className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 "
                  />
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2  ">
                  {t("Scientific office name")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[18%] ">
                  {t("Date of Purchase")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-2 ">
                  {t("Invoice Number")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[18%] ">
                  {t("Total IQD")}
                </td>

                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[18%] ">
                  {t("Total Payment")}
                </td>
                <td className="print:hidden text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[10%]">
                  {t("Action")}
                </td>
              </tr>
              {console.log(SupplierBillSelector, "after")}
              {SupplierBillSelector.data &&
                SupplierBillSelector.data.map(
                  (supplier) =>
                    supplier.bills &&
                    supplier.bills.map((Bill) => (
                      <tr className="border-b-[1px] ">
                        <td className="w-fit">
                          <input
                            onClick={CheckChild}
                            value={Bill.id}
                            name="check"
                            type="checkbox"
                            className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 w-fit"
                          />
                        </td>
                        <td className="font-Poppins-Regular text-black text-base font-semibold py-6 ">
                          {supplier.scientific_office_name}
                        </td>

                        <td className="font-Poppins-Regular text-black text-base font-semibold py-6 ">
                          {Bill.date_invoice}
                        </td>
                        <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-2">
                          {Bill.invoice_number}
                        </td>
                        <td className="font-Poppins-Regular text-black text-base font-semibold py-6">
                          {Bill.total_ID}
                        </td>

                        <td className="font-Poppins-Regular text-black text-base font-semibold py-6">
                          {Bill.total_dolar}
                        </td>

                        <td>
                          <div className=" print:hidden flex space-x-2 py-4">
                            <RiSendPlaneLine
                              id={`Send-${Bill.id}`}
                              className="text-2xl text-black cursor-pointer"
                              onClick={() => DoPayBill(Bill.id)}
                            />
                            {/* <TiEdit
                              className="text-2xl  opacity-50 cursor-pointer"
                              onClick={() => Edit(Bill.id)}
                            /> */}
                            <IoTrashOutline
                              className="text-2xl text-[#F04438] cursor-pointer"
                              onClick={() => Delete(Bill.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                )}
            </table>
          </div>

          <div className="flex justify-center ">
            <Pagination
              activePage={SupplierBillSelector.current_page}
              itemsCountPerPage={SupplierBillSelector.per_page}
              totalItemsCount={SupplierBillSelector.total}
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

export default SuppliersOfficeBills;

import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

import "react-datepicker/dist/react-datepicker.css";
import ExportPangration from "./components/Accounting/ExportPangration";
import RevenuesPangration from "./components/Accounting/RevenuesPangration";
import AddAccounting from "./components/Accounting/AddAccounting";

import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { selectLabs } from "./GlobalData/LabSlice";
import axios from "axios";
import { addAllExport, selectExports } from "./GlobalData/ExportsSlice";
import EditAccountExport from "./components/Accounting/EditAccountExport";
import DeleteAccountExport from "./components/Accounting/DeleteAccountExport";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import DeleteAccountRevenue from "./components/Accounting/DeleteAccountRevenue";
import EditAccountRevenue from "./components/Accounting/EditAccountRevenue";
import { addAllRevenue, selectRevenues } from "./GlobalData/RevenuesSlice";
import Pagination from "react-js-pagination";

const exports = [
  {
    id: 1,
    date: "1/1/2023",
    day: "sunday",
    payment_amount: "2000",
    note: "Nothings",
  },
  {
    id: 1,
    date: "1/1/2023",
    day: "sunday",
    payment_amount: "2000",
    note: "Nothings",
  },
  {
    id: 1,
    date: "1/1/2023",
    day: "sunday",
    payment_amount: "2000",
    note: "Nothings",
  },
  {
    id: 1,
    date: "1/1/2023",
    day: "sunday",
    payment_amount: "2000",
    note: "Nothings",
  },
  {
    id: 1,
    date: "1/1/2023",
    day: "sunday",
    payment_amount: "2000",
    note: "Nothings",
  },
  {
    id: 1,
    date: "1/1/2023",
    day: "sunday",
    payment_amount: "2000",
    note: "Nothings",
  },
  {
    id: 1,
    date: "1/1/2023",
    day: "sunday",
    payment_amount: "2000",
    note: "Nothings",
  },
  {
    id: 1,
    date: "1/1/2023",
    day: "sunday",
    payment_amount: "2000",
    note: "Nothings",
  },
];

const Revenues = [
  {
    id: 1,
    date: "1/1/2023",
    day: "sunday",
    total_amount: "200000",
    note: "Nothing",
  },
  {
    id: 1,
    date: "1/1/2023",
    day: "sunday",
    total_amount: "200000",
    note: "Nothing",
  },
  {
    id: 1,
    date: "1/1/2023",
    day: "sunday",
    total_amount: "200000",
    note: "Nothing",
  },
  {
    id: 1,
    date: "1/1/2023",
    day: "sunday",
    total_amount: "200000",
    note: "Nothing",
  },
  {
    id: 1,
    date: "1/1/2023",
    day: "sunday",
    total_amount: "200000",
    note: "Nothing",
  },
  {
    id: 1,
    date: "1/1/2023",
    day: "sunday",
    total_amount: "200000",
    note: "Nothing",
  },
  {
    id: 1,
    date: "1/1/2023",
    day: "sunday",
    total_amount: "200000",
    note: "Nothing",
  },
  {
    id: 1,
    date: "1/1/2023",
    day: "sunday",
    total_amount: "200000",
    note: "Nothing",
  },
];

function Accounting() {
  const [OpenAddAccounting, setOpenAddAccounting] = useState(false);
  const { t, i18n } = useTranslation();
  const [OpenEditAccountingExports, setOpenEditAccountingExports] =
    useState(false);
  const [OpenDeleteAccountingExports, setOpenDeleteAccountingExports] =
    useState(false);

  const [OpenEditAccountingRenvenue, setOpenEditAccountingRenvenue] =
    useState(false);
  const [OpenDeleteAccountingRenvenue, setOpenDeleteAccountingRenvenue] =
    useState(false);
  const [Section, setSection] = useState("exports");
  const [pageExport, setPageExport] = useState(1);
  const [pageRevenue, setPageRevenue] = useState(1);

  const [Id, setId] = useState();
  const [IdR, setIdR] = useState();

  const ExportsSelector = useSelector(selectExports);
  const dispatch = useDispatch();
  const [DataBeforeFilterExport, SetDataBeforeFilterExport] = useState();
  const [DataBeforeFilterRevenue, SetDataBeforeFilterRevenue] = useState();
  const [idsExport, setIdsExport] = useState([]);
  const [idsRevenue, setIdsRevenue] = useState([]);

  const getExports = async (page) => {
    await axios.get(`lab-scope/accounting-export?${page}`).then((response) => {
      console.log(response.data.data, "hi");
      dispatch(addAllExport(response.data.data));
      SetDataBeforeFilterExport(response.data.data);
    });
  };

  const RevenuesSelector = useSelector(selectRevenues);

  const getRevenues = async (page) => {
    await axios.get(`lab-scope/accounting-rev?${page}`).then((response) => {
      console.log(response.data, "hi");
      dispatch(addAllRevenue(response.data.data));
      SetDataBeforeFilterRevenue(response.data.data);
    });
  };
  useEffect(() => {
    getRevenues(pageRevenue);
    getExports(pageExport);
  }, []);
  const AccountingAdd = () => {
    setOpenAddAccounting(true);
  };

  const EditExport = (id) => {
    setId(id);
    setOpenEditAccountingExports(true);
  };

  const removeExport = (id) => {
    setId(id);
    setOpenDeleteAccountingExports(true);
  };

  const EditRevenue = (id) => {
    setIdR(id);
    setOpenEditAccountingRenvenue(true);
  };

  const removeRevenue = (id) => {
    setIdR(id);
    setOpenDeleteAccountingRenvenue(true);
  };

  const handlePageChange = (pageNumber) => {
    // console.log(`active page is ${pageNumber}`);
    // this.setState({ activePage: pageNumber });
    setPageExport(pageNumber);
    getExports(pageNumber);
  };

  const handlePageChangeRevenue = (pageNumber) => {
    // console.log(`active page is ${pageNumber}`);
    // this.setState({ activePage: pageNumber });
    setPageRevenue(pageNumber);
    getRevenues(pageNumber);
  };

  const SortChange = (e) => {
    if (Section === "exports") {
      if (e.target.value === "A-Z") {
        if (ExportsSelector) {
          console.log(ExportsSelector.data);
          let arrayForSort = [...ExportsSelector.data];
          arrayForSort.sort(function (a, b) {
            if (a.day.toLowerCase() < b.day.toLowerCase()) {
              return -1;
            }
            if (a.day.toLowerCase() > b.day.toLowerCase()) {
              return 1;
            }
            return 0;
          });
          let Data = {
            current_page: ExportsSelector.current_page,
            data: arrayForSort,
            first_page_url: ExportsSelector.first_page_url,
            from: ExportsSelector.from,
            last_page: ExportsSelector.last_page,
            last_page_url: ExportsSelector.last_page_url,
            links: ExportsSelector.links,
            next_page_url: ExportsSelector.next_page_url,
            path: ExportsSelector.path,
            per_page: ExportsSelector.per_page,
            prev_page_url: ExportsSelector.prev_page_url,
            to: ExportsSelector.to,
            total: ExportsSelector.total,
          };

          dispatch(addAllExport(Data));
        }
      } else if (e.target.value === "Z-A") {
        if (ExportsSelector) {
          console.log(ExportsSelector.data);
          let arrayForSort = [...ExportsSelector.data];
          arrayForSort.sort(function (a, b) {
            if (a.day.toLowerCase() > b.day.toLowerCase()) {
              return -1;
            }
            if (a.day.toLowerCase() < b.day.toLowerCase()) {
              return 1;
            }
            return 0;
          });
          let Data = {
            current_page: ExportsSelector.current_page,
            data: arrayForSort,
            first_page_url: ExportsSelector.first_page_url,
            from: ExportsSelector.from,
            last_page: ExportsSelector.last_page,
            last_page_url: ExportsSelector.last_page_url,
            links: ExportsSelector.links,
            next_page_url: ExportsSelector.next_page_url,
            path: ExportsSelector.path,
            per_page: ExportsSelector.per_page,
            prev_page_url: ExportsSelector.prev_page_url,
            to: ExportsSelector.to,
            total: ExportsSelector.total,
          };

          dispatch(addAllExport(Data));
        }
      }
    }
    if (Section === "Revenues") {
      if (e.target.value === "A-Z") {
        if (RevenuesSelector) {
          console.log(RevenuesSelector.data);
          let arrayForSort = [...RevenuesSelector.data];
          arrayForSort.sort(function (a, b) {
            if (a.day.toLowerCase() < b.day.toLowerCase()) {
              return -1;
            }
            if (a.day.toLowerCase() > b.day.toLowerCase()) {
              return 1;
            }
            return 0;
          });
          let Data = {
            current_page: RevenuesSelector.current_page,
            data: arrayForSort,
            first_page_url: RevenuesSelector.first_page_url,
            from: RevenuesSelector.from,
            last_page: RevenuesSelector.last_page,
            last_page_url: RevenuesSelector.last_page_url,
            links: RevenuesSelector.links,
            next_page_url: RevenuesSelector.next_page_url,
            path: RevenuesSelector.path,
            per_page: RevenuesSelector.per_page,
            prev_page_url: RevenuesSelector.prev_page_url,
            to: RevenuesSelector.to,
            total: RevenuesSelector.total,
          };

          dispatch(addAllRevenue(Data));
        }
      } else if (e.target.value === "Z-A") {
        if (RevenuesSelector) {
          console.log(RevenuesSelector.data);
          let arrayForSort = [...RevenuesSelector.data];
          arrayForSort.sort(function (a, b) {
            if (a.day.toLowerCase() > b.day.toLowerCase()) {
              return -1;
            }
            if (a.day.toLowerCase() < b.day.toLowerCase()) {
              return 1;
            }
            return 0;
          });
          let Data = {
            current_page: RevenuesSelector.current_page,
            data: arrayForSort,
            first_page_url: RevenuesSelector.first_page_url,
            from: RevenuesSelector.from,
            last_page: RevenuesSelector.last_page,
            last_page_url: RevenuesSelector.last_page_url,
            links: RevenuesSelector.links,
            next_page_url: RevenuesSelector.next_page_url,
            path: RevenuesSelector.path,
            per_page: RevenuesSelector.per_page,
            prev_page_url: RevenuesSelector.prev_page_url,
            to: RevenuesSelector.to,
            total: RevenuesSelector.total,
          };

          dispatch(addAllRevenue(Data));
        }
      }
    }
  };

  const print = () => {
    window.print();
  };

  const CheckallExport = () => {
    if (document.getElementById("HeadCheckExport").checked) {
      let checks = document.getElementsByName("checkExport");
      console.log(checks);
      for (let i = 0; i <= checks.length; i++) {
        if (checks[i].value) {
          setIdsExport((ids) => [...ids, checks[i].value]);
        }
        document
          .getElementById(`Edit-${checks[i].value}`)
          .classList.add("hidden");
        console.log(checks[i].value);
        checks[i].checked = true;
      }
    } else if (!document.getElementById("HeadCheckExport").checked) {
      setIdsExport([]);
      let checks = document.getElementsByName("checkExport");
      for (let i = 0; i <= checks.length; i++) {
        checks[i].checked = false;
        document
          .getElementById(`Edit-${checks[i].value}`)
          .classList.remove("hidden");
        // idList = [];
      }
    }
  };

  const UnCheckExport = () => {
    document.getElementById("HeadCheckExport").checked = false;
    setIdsExport([]);
    let checks = document.getElementsByName("checkExport");
    for (let i = 0; i <= checks.length; i++) {
      checks[i].checked = false;
      document
        .getElementById(`Edit-${checks[i].value}`)
        .classList.remove("hidden");
    }
  };
  const CheckChildExport = (e) => {
    if (e.target.checked) {
      setIdsExport((ids) => [...ids, e.target.value]);
      document.getElementById(`Edit-${e.target.value}`).classList.add("hidden");
    } else {
      let filtered = idsExport.filter(function (value, index, arr) {
        return value !== e.target.value;
      });
      document
        .getElementById(`Edit-${e.target.value}`)
        .classList.remove("hidden");

      setIdsExport(filtered);
    }
  };

  ///////

  const CheckallRevenue = () => {
    if (document.getElementById("HeadCheckRevenue").checked) {
      let checks = document.getElementsByName("checkRevenue");
      console.log(checks);
      for (let i = 0; i <= checks.length; i++) {
        if (checks[i].value) {
          setIdsRevenue((ids) => [...ids, checks[i].value]);
        }
        document
          .getElementById(`EditRe-${checks[i].value}`)
          .classList.add("hidden");
        console.log(checks[i].value);
        checks[i].checked = true;
      }
    } else if (!document.getElementById("HeadCheckRevenue").checked) {
      setIdsRevenue([]);
      let checks = document.getElementsByName("checkRevenue");
      for (let i = 0; i <= checks.length; i++) {
        checks[i].checked = false;
        document
          .getElementById(`EditRe-${checks[i].value}`)
          .classList.remove("hidden");
        // idList = [];
      }
    }
  };

  const UnCheckRevenue = () => {
    document.getElementById("HeadCheckRevenue").checked = false;
    setIdsRevenue([]);
    let checks = document.getElementsByName("checkRevenue");
    for (let i = 0; i <= checks.length; i++) {
      checks[i].checked = false;
      document
        .getElementById(`EditRe-${checks[i].value}`)
        .classList.remove("hidden");
    }
  };
  const CheckChildRevenue = (e) => {
    if (e.target.checked) {
      setIdsRevenue((ids) => [...ids, e.target.value]);
      document
        .getElementById(`EditRe-${e.target.value}`)
        .classList.add("hidden");
    } else {
      let filtered = idsRevenue.filter(function (value, index, arr) {
        return value !== e.target.value;
      });
      document
        .getElementById(`EditRe-${e.target.value}`)
        .classList.remove("hidden");

      setIdsRevenue(filtered);
    }
  };
  return (
    <div className="w-full h-full pr-5 p-5">
      <AddAccounting
        SetDataBeforeFilterExport={SetDataBeforeFilterExport}
        SetDataBeforeFilterRevenue={SetDataBeforeFilterRevenue}
        pageE={pageExport}
        pageR={pageRevenue}
        open={OpenAddAccounting}
        setOpen={setOpenAddAccounting}
      />
      <EditAccountExport
        SetDataBeforeFilterExport={SetDataBeforeFilterExport}
        pageE={pageExport}
        id={Id}
        open={OpenEditAccountingExports}
        setOpen={setOpenEditAccountingExports}
      />
      <DeleteAccountExport
        UnCheckExport={UnCheckExport}
        idsExport={idsExport}
        setIdsExport={setIdsExport}
        SetDataBeforeFilterExport={SetDataBeforeFilterExport}
        pageE={pageExport}
        id={Id}
        open={OpenDeleteAccountingExports}
        setOpen={setOpenDeleteAccountingExports}
      />
      <div className="w-full flex ">
        <Header
          section={Section}
          DataBeforeFilter={
            Section === "exports"
              ? DataBeforeFilterExport
              : DataBeforeFilterRevenue
          }
        />
      </div>
      <div className="flex ">
        <SideBar page="Accounting" />
        <div className="w-full h-full lg:ml-8 mt-10">
          <div className="flex w-full justify-between">
            <div className="flex w-full space-x-2">
              <div className="print:hidden w-fit pr-2 bg-white rounded-lg flex items-center mr-5">
                <select
                  onChange={SortChange}
                  className=" w-fit  rounded-lg font-Poppins-Medium  text-base outline-none px-4 py-2 cursor-pointer"
                >
                  <option value="" selected disabled hidden>
                    {t("Sort by")}
                  </option>
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>
              </div>
              <div className="w-fit flex  space-x-2">
                <div
                  className={`${
                    Section === "exports"
                      ? "bg-[#B7C835]"
                      : "bg-white print:hidden"
                  } w-fit flex  items-center px-4 py-2 lg:py-0 rounded-xl cursor-pointer`}
                  onClick={() => setSection("exports")}
                >
                  <p
                    id="exports"
                    className={`${
                      Section === "exports" ? "text-white" : "text-[#101828]"
                    }  text-xs text-center `}
                  >
                    {t("exports")}
                  </p>
                </div>

                <div
                  className={`${
                    Section === "Revenues"
                      ? "bg-[#B7C835]"
                      : "bg-white print:hidden"
                  } bg-white w-fit flex items-center px-4 py-2 lg:py-0 rounded-xl cursor-pointer`}
                  onClick={() => setSection("Revenues")}
                >
                  <p
                    id="Revenues"
                    className={`${
                      Section === "Revenues" ? "text-white" : "text-[#101828]"
                    }  text-xs text-center `}
                  >
                    {t("Revenues")}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={print}
              className="mr-5 print:hidden h-fit p-2 bg-white rounded-xl"
            >
              Print
            </button>
            <div
              className="bg-[#0D2135] print:hidden w-[28%] lg:w-[24%]  flex items-center justify-center  rounded-xl cursor-pointer "
              onClick={() => AccountingAdd()}
            >
              <p className="text-base font-Poppins-SemiBold flex items-center justify-center text-white ">
                <AiOutlinePlus className="mr-2 text-lg" />
                {t("Add")}
              </p>
            </div>
          </div>

          {console.log(idsExport, "ids")}
          {/* Pangration */}
          <div
            className={`${Section === "exports" ? "block" : "hidden"} w-full`}
          >
            <div className={` overflow-x-scroll`}>
              <table className="w-full h-full mt-8 bg-white rounded-t-2xl ">
                <tr className="border-b-[1px] w-full">
                  <td className="w-[5%] pr-2 lg:pr-0">
                    <input
                      id="HeadCheckExport"
                      onClick={() => CheckallExport()}
                      type="checkbox"
                      className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 "
                    />
                  </td>
                  <td className="text-sm pr-24 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 pl-2">
                    {t("Date")}
                  </td>
                  <td className="text-sm pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 w-[25%] ">
                    {t("Day")}
                  </td>
                  <td className="text-sm pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 ">
                    {t("Payment_amount")}
                  </td>
                  <td className="text-sm pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2  ">
                    {t("Note")}
                  </td>
                  <td className="print:hidden text-sm pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 w-[9%]">
                    {t("Action")}
                  </td>
                </tr>
                {ExportsSelector.data &&
                  ExportsSelector.data.map((item) => (
                    <tr className="border-b-[1px] ">
                      <td className="w-fit">
                        <input
                          value={item.id}
                          onClick={CheckChildExport}
                          name="checkExport"
                          type="checkbox"
                          className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 w-fit"
                        />
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 flex flex-col">
                        <p>{item.date}</p>
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 ">
                        {item.day}
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-2">
                        {item.Payment_amount}
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6">
                        {item.Note}
                      </td>
                      <td>
                        <div className="flex space-x-2 print:hidden py-4">
                          <TiEdit
                            id={`Edit-${item.id}`}
                            className="text-2xl  opacity-50 cursor-pointer"
                            onClick={() => EditExport(item.id)}
                          />
                          <IoTrashOutline
                            className="text-2xl text-[#F04438] cursor-pointer"
                            onClick={() => removeExport(item.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
            <div className="flex justify-center ">
              <Pagination
                activePage={ExportsSelector.current_page}
                itemsCountPerPage={ExportsSelector.per_page}
                totalItemsCount={ExportsSelector.total}
                pageRangeDisplayed={5}
                innerClass="flex justify-center space-x-5 mb-2 border-gray-400 w-full  bottom-0   items-center mt-10"
                itemClass=" bg-white  font-Poppins-Regular py-1 px-3 rounded-lg"
                activeClass="bg-[#B7C835] text-[#FFFFFF]"
                onChange={handlePageChange.bind(this)}
              />
            </div>
          </div>
          {/* <ExportPangration section={Section} itemsPerPage={8} Data={exports} /> */}
          {/* Revenues */}
          <div
            className={`${Section === "Revenues" ? "block" : "hidden"} w-full`}
          >
            <div className={`overflow-x-scroll`}>
              <EditAccountRevenue
                pageR={pageRevenue}
                id={IdR}
                open={OpenEditAccountingRenvenue}
                setOpen={setOpenEditAccountingRenvenue}
                SetDataBeforeFilterRevenue={SetDataBeforeFilterRevenue}
              />
              <DeleteAccountRevenue
                UnCheckRevenue={UnCheckRevenue}
                idsRevenue={idsRevenue}
                setIdsRevenue={setIdsRevenue}
                pageR={pageRevenue}
                id={IdR}
                open={OpenDeleteAccountingRenvenue}
                setOpen={setOpenDeleteAccountingRenvenue}
                SetDataBeforeFilterRevenue={SetDataBeforeFilterRevenue}
              />
              <table className="w-full h-full mt-8 bg-white rounded-t-2xl ">
                <tr className="border-b-[1px] w-full">
                  <td className="w-[5%] pr-2 lg:pr-0">
                    <input
                      id="HeadCheckRevenue"
                      onClick={() => CheckallRevenue()}
                      type="checkbox"
                      className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 "
                    />
                  </td>
                  <td className="text-sm pr-24 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 pl-2">
                    {t("Date")}
                  </td>
                  <td className="text-sm pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 w-[25%] ">
                    {t("Day")}
                  </td>
                  <td className="text-sm pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 ">
                    {t("Payment_amount")}
                  </td>
                  <td className="text-sm pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2  ">
                    {t("Note")}
                  </td>
                  <td className=" print:hidden  text-sm pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 w-[9%]">
                    {t("Action")}
                  </td>
                </tr>
                {RevenuesSelector.data &&
                  RevenuesSelector.data.map((item) => (
                    <tr className="border-b-[1px] ">
                      <td className="w-fit">
                        <input
                          value={item.id}
                          onClick={CheckChildRevenue}
                          name="checkRevenue"
                          type="checkbox"
                          className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 w-fit"
                        />
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 flex flex-col">
                        <p>{item.date}</p>
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 ">
                        {item.day}
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-2">
                        {item.Payment_amount}
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6">
                        {item.Note}
                      </td>
                      <td>
                        <div className=" print:hidden  flex space-x-2 py-4">
                          <TiEdit
                            id={`EditRe-${item.id}`}
                            className="text-2xl  opacity-50 cursor-pointer"
                            onClick={() => EditRevenue(item.id)}
                          />
                          <IoTrashOutline
                            className="text-2xl text-[#F04438] cursor-pointer"
                            onClick={() => removeRevenue(item.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
            <div className="flex justify-center ">
              <Pagination
                activePage={RevenuesSelector.current_page}
                itemsCountPerPage={RevenuesSelector.per_page}
                totalItemsCount={RevenuesSelector.total}
                pageRangeDisplayed={5}
                innerClass="flex justify-center space-x-5 mb-2 border-gray-400 w-full  bottom-0   items-center mt-10"
                itemClass=" bg-white  font-Poppins-Regular py-1 px-3 rounded-lg"
                activeClass="bg-[#B7C835] text-[#FFFFFF]"
                onChange={handlePageChangeRevenue.bind(this)}
              />
            </div>
          </div>

          {/* <RevenuesPangration
            section={Section}
            itemsPerPage={8}
            Data={Revenues}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Accounting;

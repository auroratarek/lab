import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

import Datepicker from "react-tailwindcss-datepicker";
import AddDoctor from "./components/Doctors/AddDoctor";
import DoctorPangration from "./components/Doctors/DoctorPangration";
import { Link } from "react-router-dom";
import { VscListFlat } from "react-icons/vsc";

import Header from "./components/Header";
import { useTranslation } from "react-i18next";
import { addAllDoctor, selectDoctors } from "./GlobalData/DoctorsSlice";
import { useDispatch, useSelector } from "react-redux";
import EditDoctor from "./components/Doctors/EditDoctor";
import DeleteDoctor from "./components/Doctors/DeleteDoctor";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import axios from "axios";
import Pagination from "react-js-pagination";
import moment from "moment";

const Doctor = [
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DoctorAddress: "Address here Address here Address here",
    phone: "0598276050",
    DoctorRatio: "99%",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DoctorAddress: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "0598276050",
    DoctorRatio: "99%",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DoctorAddress: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "0598276050",
    DoctorRatio: "99%",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DoctorAddress: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "0598276050",
    DoctorRatio: "99%",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DoctorAddress: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "0598276050",
    DoctorRatio: "99%",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DoctorAddress: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "0598276050",
    DoctorRatio: "99%",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DoctorAddress: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "0598276050",
    DoctorRatio: "99%",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DoctorAddress: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "0598276050",
    DoctorRatio: "99%",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DoctorAddress: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "0598276050",
    DoctorRatio: "99%",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DoctorAddress: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "0598276050",
    DoctorRatio: "99%",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DoctorAddress: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "0598276050",
    DoctorRatio: "99%",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DoctorAddress: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "0598276050",
    DoctorRatio: "99%",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DoctorAddress: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "0598276050",
    DoctorRatio: "99%",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DoctorAddress: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "0598276050",
    DoctorRatio: "99%",
  },
];

function Doctors() {
  const { t, i18n } = useTranslation();
  const [DataForFilter, setDataForFilter] = useState();
  const [ids, setIds] = useState([]);

  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  const [OpenAddDoctors, setOpenAddDoctors] = useState(false);
  const [DataBeforeFilter, SetDataBeforeFilter] = useState();

  const DoctorAdd = () => {
    setOpenAddDoctors(true);
  };

  useEffect(() => {
    document
      .getElementById("DatePickerHome")
      .children[0].children[0].classList.remove(
        "dark:bg-slate-800",
        "dark:text-white/80",
        "dark:border-slate-600"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[0].classList.remove(
        "dark:bg-slate-800",
        "dark:border-slate-600"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].classList.remove(
        "dark:text-white",
        "dark:border-slate-600"
      );
    // document.getElementById("DatePickerHome").children[0].children[2]
    // .children[1].children[0].children[0].children
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[0].children[0].children[0].children[0].classList.remove(
        "dark:text-white/70",
        "dark:hover:bg-white/10",
        "dark:focus:bg-white/10"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[0].children[0].children[1].children[0].children[0].classList.remove(
        "dark:text-white/70",
        "dark:hover:bg-white/10",
        "dark:focus:bg-white/10"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[0].children[0].children[1].children[1].children[0].classList.remove(
        "dark:text-white/70",
        "dark:hover:bg-white/10",
        "dark:focus:bg-white/10"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[0].children[0].children[2].children[0].classList.remove(
        "dark:text-white/70",
        "dark:hover:bg-white/10",
        "dark:focus:bg-white/10"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[0].children[0].classList.remove(
        "dark:border-gray-700"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[0].children[1].children[0].classList.remove(
        "dark:border-gray-700"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].classList.remove(
        "dark:bg-slate-800"
      );

    removeTheDark();
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[2].children[0].classList.remove(
        "dark:border-gray-700"
      );

    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[2].children[0].children[0].children[0].classList.remove(
        "dark:text-white/70",
        "dark:hover:bg-white/10",
        "dark:focus:bg-white/10"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[2].children[0].children[1].children[0].children[0].classList.remove(
        "dark:text-white/70",
        "dark:hover:bg-white/10",
        "dark:focus:bg-white/10"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[2].children[0].children[1].children[1].children[0].classList.remove(
        "dark:text-white/70",
        "dark:hover:bg-white/10",
        "dark:focus:bg-white/10"
      );
    document
      .getElementById("DatePickerHome")
      .children[0].children[2].children[1].children[0].children[0].children[2].children[0].children[2].children[0].classList.remove(
        "dark:text-white/70",
        "dark:hover:bg-white/10",
        "dark:focus:bg-white/10"
      );
  }, []);

  const [DateFilter, setDateFilter] = useState();
  const removeTheDark = () => {
    let numbers =
      document.getElementById("DatePickerHome").children[0].children[2]
        .children[1].children[0].children[0].children[0].children[1].children[1]
        .children;
    for (let i = 0; i < numbers.length; i++) {
      numbers[i].classList.remove("dark:bg-white/10");
    }
    let numbers2 =
      document.getElementById("DatePickerHome").children[0].children[2]
        .children[1].children[0].children[0].children[2].children[1].children[1]
        .children;
    for (let i = 0; i < numbers2.length; i++) {
      numbers2[i].classList.remove("dark:bg-white/10");
    }
  };
  const [page, setPage] = useState(1);
  const [OpenEditDoctor, setOpenEditDoctor] = useState(false);
  const [OpenDeleteDoctor, setOpenDeleteDoctor] = useState(false);
  const [ID, setId] = useState();
  const DoctorsSelector = useSelector(selectDoctors);
  const dispatch = useDispatch();

  const getDoctors = async () => {
    await axios.get(`lab-scope/myDoctors`).then((response) => {
      console.log(response.data, "hi");
      dispatch(addAllDoctor(response.data));
      setDataForFilter(response.data.data);
      SetDataBeforeFilter(response.data);
    });
  };

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue.endDate);

    setValue(newValue);
    if (newValue !== "") {
      // moment(`${item.created_at}`).format("YYYY-MM-DD");
      // moment(`${item.created_at}`).format("YYYY-MM-DD");
      let content = DataForFilter.filter((item) => {
        return (
          moment(`${item.created_at}`).format("YYYY-MM-DD") >=
            moment(`${newValue.startDate}`).format("YYYY-MM-DD") &&
          moment(`${item.created_at}`).format("YYYY-MM-DD") <=
            moment(`${newValue.endDate}`).format("YYYY-MM-DD")
        );
      });

      let meta = {
        current_page: DoctorsSelector.meta.current_page,
        from: DoctorsSelector.meta.from,
        last_page: DoctorsSelector.meta.last_page,
        links: DoctorsSelector.meta.links,
        path: DoctorsSelector.meta.path,
        per_page: DoctorsSelector.meta.per_page,
        to: DoctorsSelector.meta.to,
        total: DoctorsSelector.meta.total,
      };
      let Data = {
        data: content,
        links: DoctorsSelector.links,
        meta: meta,
      };

      dispatch(addAllDoctor(Data));
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);

  const Edit = (id) => {
    setId(id);
    setOpenEditDoctor(true);
  };

  const Remove = (id) => {
    setId(id);
    setOpenDeleteDoctor(true);
  };
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    getDoctors(pageNumber);
  };

  const SortChange = (e) => {
    if (e.target.value === "A-Z") {
      if (DoctorsSelector) {
        console.log(DoctorsSelector.data);
        let arrayForSort = [...DoctorsSelector.data];
        arrayForSort.sort(function (a, b) {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        let meta = {
          current_page: DoctorsSelector.meta.current_page,
          from: DoctorsSelector.meta.from,
          last_page: DoctorsSelector.meta.last_page,
          links: DoctorsSelector.meta.links,
          path: DoctorsSelector.meta.path,
          per_page: DoctorsSelector.meta.per_page,
          to: DoctorsSelector.meta.to,
          total: DoctorsSelector.meta.total,
        };
        let Data = {
          data: arrayForSort,
          links: DoctorsSelector.links,
          meta: meta,
        };
        dispatch(addAllDoctor(Data));
      }
    } else if (e.target.value === "Z-A") {
      console.log(DoctorsSelector.data);
      let arrayForSort = [...DoctorsSelector.data];
      arrayForSort.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      let meta = {
        current_page: DoctorsSelector.meta.current_page,
        from: DoctorsSelector.meta.from,
        last_page: DoctorsSelector.meta.last_page,
        links: DoctorsSelector.meta.links,
        path: DoctorsSelector.meta.path,
        per_page: DoctorsSelector.meta.per_page,
        to: DoctorsSelector.meta.to,
        total: DoctorsSelector.meta.total,
      };
      let Data = {
        data: arrayForSort,
        links: DoctorsSelector.links,
        meta: meta,
      };
      dispatch(addAllDoctor(Data));
    }
  };
  const handleSelect = (ranges) => {
    console.log(ranges);
  };
  const Day = () => {
    if (DateFilter === "Day") {
      setDateFilter();
      dispatch(addAllDoctor(DataBeforeFilter));
    } else {
      setDateFilter("Day");
      const now = new Date();

      let content = DataForFilter.filter((item) => {
        console.log(
          moment(`${item.created_at}`).format("YYYY-MM-DD") ==
            moment(`${new Date()}`).format("YYYY-MM-DD")
        );
        return (
          moment(`${item.created_at}`).format("YYYY-MM-DD") ==
          moment(`${new Date()}`).format("YYYY-MM-DD")
        );
      });
      let meta = {
        current_page: DoctorsSelector.meta.current_page,
        from: DoctorsSelector.meta.from,
        last_page: DoctorsSelector.meta.last_page,
        links: DoctorsSelector.meta.links,
        path: DoctorsSelector.meta.path,
        per_page: DoctorsSelector.meta.per_page,
        to: DoctorsSelector.meta.to,
        total: DoctorsSelector.meta.total,
      };
      let Data = {
        data: content,
        links: DoctorsSelector.links,
        meta: meta,
      };
      dispatch(addAllDoctor(Data));
    }
  };

  const Week = () => {
    if (DateFilter === "Week") {
      setDateFilter();
      dispatch(addAllDoctor(DataBeforeFilter));
    } else {
      setDateFilter("Week");

      const now = new Date();
      console.log(
        moment(
          `${new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)}`
        ).format("YYYY-MM-DD")
      );
      let content = DataForFilter.filter((item) => {
        return (
          moment(`${item.created_at}`).format("YYYY-MM-DD") >=
            moment(
              `${new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() - 7
              )}`
            ).format("YYYY-MM-DD") &&
          moment(`${item.created_at}`).format("YYYY-MM-DD") <=
            moment(`${new Date()}`).format("YYYY-MM-DD")
        );
      });
      let meta = {
        current_page: DoctorsSelector.meta.current_page,
        from: DoctorsSelector.meta.from,
        last_page: DoctorsSelector.meta.last_page,
        links: DoctorsSelector.meta.links,
        path: DoctorsSelector.meta.path,
        per_page: DoctorsSelector.meta.per_page,
        to: DoctorsSelector.meta.to,
        total: DoctorsSelector.meta.total,
      };
      let Data = {
        data: content,
        links: DoctorsSelector.links,
        meta: meta,
      };
      dispatch(addAllDoctor(Data));
    }
  };

  const Month = () => {
    if (DateFilter === "Month") {
      setDateFilter();
      dispatch(addAllDoctor(DataBeforeFilter));
    } else {
      setDateFilter("Month");

      const now = new Date();
      console.log(
        moment(
          `${new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())}`
        ).format("YYYY-MM-DD")
      );
      let content = DataForFilter.filter((item) => {
        return (
          moment(`${item.created_at}`).format("YYYY-MM-DD") >=
            moment(
              `${new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                now.getDate()
              )}`
            ).format("YYYY-MM-DD") &&
          moment(`${item.created_at}`).format("YYYY-MM-DD") <=
            moment(`${new Date()}`).format("YYYY-MM-DD")
        );
      });
      let meta = {
        current_page: DoctorsSelector.meta.current_page,
        from: DoctorsSelector.meta.from,
        last_page: DoctorsSelector.meta.last_page,
        links: DoctorsSelector.meta.links,
        path: DoctorsSelector.meta.path,
        per_page: DoctorsSelector.meta.per_page,
        to: DoctorsSelector.meta.to,
        total: DoctorsSelector.meta.total,
      };
      let Data = {
        data: content,
        links: DoctorsSelector.links,
        meta: meta,
      };
      dispatch(addAllDoctor(Data));
    }
  };

  const Checkall = () => {
    if (document.getElementById("HeadCheck").checked) {
      let checks = document.getElementsByName("check");
      for (let i = 0; i <= checks.length; i++) {
        if (checks[i].value) {
          setIds((ids) => [...ids, checks[i].value]);
        }
        document
          .getElementById(`Edit-${checks[i].value}`)
          .classList.add("hidden");

        checks[i].checked = true;
      }
    } else if (!document.getElementById("HeadCheck").checked) {
      setIds([]);
      let checks = document.getElementsByName("check");
      for (let i = 0; i <= checks.length; i++) {
        document
          .getElementById(`Edit-${checks[i].value}`)
          .classList.remove("hidden");

        checks[i].checked = false;
        // idList = [];
      }
    }
  };

  const CheckChild = (e) => {
    if (e.target.checked) {
      setIds((ids) => [...ids, e.target.value]);
      document.getElementById(`Edit-${e.target.value}`).classList.add("hidden");
    } else {
      let filtered = ids.filter(function (value, index, arr) {
        return value !== e.target.value;
      });
      document
        .getElementById(`Edit-${e.target.value}`)
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
        .getElementById(`Edit-${checks[i].value}`)
        .classList.remove("hidden");
    }
  };
  return (
    <div className="w-full h-full pr-5 p-5">
      <AddDoctor
        setDataForFilter={setDataForFilter}
        SetDataBeforeFilter={SetDataBeforeFilter}
        page={page}
        open={OpenAddDoctors}
        setOpen={setOpenAddDoctors}
      />
      <EditDoctor
        setDataForFilter={setDataForFilter}
        SetDataBeforeFilter={SetDataBeforeFilter}
        id={ID}
        open={OpenEditDoctor}
        setOpen={setOpenEditDoctor}
      />
      <DeleteDoctor
        UnCheck={UnCheck}
        setIds={setIds}
        ids={ids}
        setDataForFilter={setDataForFilter}
        SetDataBeforeFilter={SetDataBeforeFilter}
        id={ID}
        open={OpenDeleteDoctor}
        setOpen={setOpenDeleteDoctor}
      />
      <div className="w-full flex ">
        <Header section="Doctors" DataBeforeFilter={DataBeforeFilter} />
      </div>
      <div className="flex ">
        <SideBar page="Doctors" />
        <div className="w-full h-full lg:ml-8 mt-10">
          <div className="flex w-full flex-col md:flex-row justify-between">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-5 lg:gap-0 w-full space-x-2">
              <div className="w-fit pr-2 bg-white lg:col-start-1 lg:col-end-2 rounded-lg flex items-center mr-5">
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
              <div className="w-full flex flex-col md:flex-row space-y-2 md:space-y-0 lg:col-start-2 lg:col-end-5 md:space-x-2">
                <div className="flex w-[20rem] lg:w-[100%] ">
                  <div
                    id="DatePickerHome"
                    className="w-full border-2 rounded-xl "
                  >
                    <Datepicker value={value} onChange={handleValueChange} />
                  </div>
                </div>
                <div className="w-full flex space-x-2">
                  <div
                    className={`${
                      DateFilter === "Day" ? "bg-[#B7C835]" : "bg-white"
                    } w-fit flex items-center px-4 py-2 lg:py-0 rounded-xl cursor-pointer`}
                    onClick={Day}
                  >
                    <p
                      className={`${
                        DateFilter === "Day" ? "text-white" : "text-[#101828]"
                      } `}
                    >
                      {t("Day")}
                    </p>
                  </div>

                  <div
                    className={`${
                      DateFilter === "Week" ? "bg-[#B7C835]" : "bg-white"
                    }  w-fit flex items-center px-4 py-2 lg:py-0 rounded-xl cursor-pointer`}
                    onClick={Week}
                  >
                    <p
                      className={`${
                        DateFilter === "Week" ? "text-white" : "text-[#101828]"
                      } `}
                    >
                      {t("Week")}
                    </p>
                  </div>

                  <div
                    className={`${
                      DateFilter === "Month" ? "bg-[#B7C835]" : "bg-white"
                    }  w-fit flex items-center px-4 py-2 lg:py-0 rounded-xl cursor-pointer`}
                    onClick={Month}
                  >
                    <p
                      className={`${
                        DateFilter === "Month" ? "text-white" : "text-[#101828]"
                      } `}
                    >
                      {t("Month")}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="bg-[#0D2135] w-[10rem] lg:w-[93%] mt-5 lg:mt-0 py-2 lg:py-0 lg:col-start-5 lg:col-end-6   flex items-center justify-center  rounded-xl cursor-pointer "
                onClick={() => DoctorAdd()}
              >
                <p className="text-base flex  items-center justify-center text-white ">
                  <AiOutlinePlus className="mr-2 text-lg" />
                  {t("Add Doctor")}
                </p>
              </div>
            </div>
          </div>

          {/* Pangration */}
          <div className="overflow-x-scroll">
            <table className="w-full h-full mt-8 bg-white rounded-t-2xl ">
              <tr className="border-b-[1px] w-full">
                <td className="w-[5%] pr-2 lg:pr-0">
                  <input
                    id="HeadCheck"
                    onClick={() => Checkall()}
                    type="checkbox"
                    className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 "
                  />
                </td>
                <td className="text-sm pr-24 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 pl-2">
                  {t("Doctor name")}
                </td>
                <td className="text-sm pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 w-[25%] ">
                  {t("Doctor's address")}
                </td>
                <td className="text-sm pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 ">
                  {t("Phone number")}
                </td>
                <td className="text-sm pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2  ">
                  {t("Doctor ratio")}
                </td>
                <td className="text-sm pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 w-[9%]">
                  {t("Action")}
                </td>
              </tr>
              {console.log(DoctorsSelector)}
              {DoctorsSelector.data &&
                DoctorsSelector.data.map((item) => (
                  <tr className="border-b-[1px] ">
                    <td className="w-fit">
                      <input
                        value={item.id}
                        onClick={CheckChild}
                        name="check"
                        type="checkbox"
                        className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 w-fit"
                      />
                    </td>
                    <td className="font-Poppins-Regular justify-center h-full text-black text-base font-semibold py-6 flex flex-col">
                      <p>{item.name}</p>
                      <p className="text-xs font-medium text-[#908F8F]">
                        {item.email}
                      </p>
                    </td>
                    <td className="font-Poppins-Regular text-black text-base font-semibold py-6 ">
                      {item.address}
                    </td>
                    <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-2">
                      {item.phone}
                    </td>
                    <td className="font-Poppins-Regular text-black text-base font-semibold py-6">
                      {item.ratio}
                    </td>
                    <td>
                      <div className="flex space-x-2 py-4">
                        <TiEdit
                          id={`Edit-${item.id}`}
                          className="text-2xl  opacity-50 cursor-pointer"
                          onClick={() => Edit(item.id)}
                        />

                        <IoTrashOutline
                          className="text-2xl text-[#F04438] cursor-pointer"
                          onClick={() => Remove(item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
          <div className="flex justify-center ">
            <Pagination
              activePage={
                DoctorsSelector.meta && DoctorsSelector.meta.current_page
              }
              itemsCountPerPage={
                DoctorsSelector.meta && DoctorsSelector.meta.per_page
              }
              totalItemsCount={
                DoctorsSelector.meta && DoctorsSelector.meta.total
              }
              pageRangeDisplayed={5}
              innerClass="flex justify-center space-x-5 mb-2 border-gray-400 w-full  bottom-0   items-center mt-10"
              itemClass=" bg-white  font-Poppins-Regular py-1 px-3 rounded-lg"
              activeClass="bg-[#B7C835] text-[#FFFFFF]"
              onChange={handlePageChange.bind(this)}
            />
          </div>
          {/* <DoctorPangration itemsPerPage={8} Data={Doctor} /> */}
        </div>
      </div>
    </div>
  );
}

export default Doctors;

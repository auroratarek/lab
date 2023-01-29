import React, { useState, useEffect } from "react";
import axios from "axios";

import SideBar from "./components/SideBar";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { IoCalendarOutline, IoTrashOutline } from "react-icons/io5";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InSidePangration from "./components/Store/InSidePangration";
import AddProduct from "./components/Store/AddProduct";
import OutSidePangration from "./components/Store/OutSidePangration";
import { VscListFlat } from "react-icons/vsc";
import { Link } from "react-router-dom";

import { RiSearch2Line, RiSendPlaneLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import Logo from "./Images/Logo.svg";
import UK from "./Images/UK.png";
import NotifContainer from "./components/Home/NotifContainer";

import SA from "./Images/SA.png";

import { useTranslation } from "react-i18next";
import Header from "./components/Header";

import { getProducts } from "./api/StoreData";
import DeleteProduct from "./components/Store/DeleteProduct";
import EditProduct from "./components/Store/EditProduct";
import OutProductContainer from "./components/Store/Inside/OutProductContainer";
import { TiEdit } from "react-icons/ti";
import Pagination from "react-js-pagination";
import EditoutsideProduct from "./components/Store/EditoutsideProduct";
import DeleteoutsideProduct from "./components/Store/DeleteoutsideProduct";
import moment from "moment";

function Store() {
  const { t, i18n } = useTranslation();

  const [section, setSection] = useState("Inside");
  const [OpenAddProduct, setOpenAddProduct] = useState(false);
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [OpenOutProduct, setOpenOutProduct] = useState(false);
  const [OpenEditProduct, setOpenEditProduct] = useState(false);
  const [OpenDeleteProduct, setOpenDeleteProduct] = useState(false);
  const [pageInside, setPageInside] = useState(1);
  const [pageOutside, setPageOutside] = useState(1);

  const [selectedProductId, setSelectedProductId] = useState(false);
  const [selectedOutProductId, setSelectedOutProductId] = useState(false);

  const [OpenEditOutProduct, setOpenEditOutProduct] = useState(false);
  const [OpenDeleteOutProduct, setOpenDeleteOutProductt] = useState(false);
  const [idsInside, setIdsInside] = useState([]);
  const [idsOutside, setIdsOutside] = useState([]);

  const [products, setProducts] = useState([]);
  const [outProducts, setOutProducts] = useState([]);
  const [DataForFilerInside, SetDataForFilterInside] = useState();
  const [DataForFilerOutside, SetDataForFilterOutside] = useState();

  const [DataBeforeFilterInside, SetDataBeforeFilterInside] = useState();

  const [DataBeforeFilterOutside, SetDataBeforeFilterOutside] = useState();

  useEffect(() => {
    getProducts(
      setProducts,
      SetDataForFilterInside,
      SetDataBeforeFilterInside,
      pageInside
    );
    getOutProducts(pageOutside);
  }, []);

  const getOutProducts = async (page) => {
    await axios
      .get(`lab-scope/store-outside?page=${page}`)
      .then((res) => {
        setOutProducts(res.data);
        SetDataForFilterOutside(res.data);
        SetDataBeforeFilterOutside(res.data);
      })
      .catch((err) => {
        // setError(err.response.data);
      });
  };

  const FromInput = React.forwardRef((props, ref) => {
    return (
      <div className="flex p-2 bg-[#F9FAFF] rounded-xl justify-between items-center w-fit outline-0 border-2">
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
      <div className="flex p-2 rounded-xl bg-[#F9FAFF] justify-between items-center w-fit outline-0 border-2">
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

  const ProductOut = () => {
    setOpenOutProduct(true);
  };
  const SectionInside = () => {
    setSection("Inside");
  };

  const SectionOutside = () => {
    setSection("Outside");
  };

  const ProductAdd = () => {
    setOpenAddProduct(true);
  };

  const handlePageChange = (pageNumber) => {
    setPageInside(pageNumber);
    // getPaidBills(pageNumber);
  };

  const SortChange = (e) => {
    // product_name
    if (section === "Inside") {
      if (e.target.value === "A-Z") {
        if (products) {
          console.log(products.data);
          let arrayForSort = [...products.data];
          arrayForSort.sort(function (a, b) {
            if (a.product_name.toLowerCase() < b.product_name.toLowerCase()) {
              return -1;
            }
            if (a.product_name.toLowerCase() > b.product_name.toLowerCase()) {
              return 1;
            }
            return 0;
          });
          let Data = {
            current_page: products.current_page,
            data: arrayForSort,
            first_page_url: products.first_page_url,
            from: products.from,
            last_page: products.last_page,
            last_page_url: products.last_page_url,
            links: products.links,
            next_page_url: products.next_page_url,
            path: products.path,
            per_page: products.per_page,
            prev_page_url: products.prev_page_url,
            to: products.to,
            total: products.total,
          };
          setProducts(Data);
        }
      } else if (e.target.value === "Z-A") {
        if (products) {
          console.log(products.data);
          let arrayForSort = [...products.data];
          arrayForSort.sort(function (a, b) {
            if (a.product_name.toLowerCase() > b.product_name.toLowerCase()) {
              return -1;
            }
            if (a.product_name.toLowerCase() < b.product_name.toLowerCase()) {
              return 1;
            }
            return 0;
          });
          let Data = {
            current_page: products.current_page,
            data: arrayForSort,
            first_page_url: products.first_page_url,
            from: products.from,
            last_page: products.last_page,
            last_page_url: products.last_page_url,
            links: products.links,
            next_page_url: products.next_page_url,
            path: products.path,
            per_page: products.per_page,
            prev_page_url: products.prev_page_url,
            to: products.to,
            total: products.total,
          };
          setProducts(Data);
        }
      }
    }
    if (section === "Outside") {
      if (e.target.value === "A-Z") {
        if (outProducts) {
          console.log(outProducts.data);
          let arrayForSort = [...outProducts.data];
          arrayForSort.sort(function (a, b) {
            if (a.product_name.toLowerCase() < b.product_name.toLowerCase()) {
              return -1;
            }
            if (a.product_name.toLowerCase() > b.product_name.toLowerCase()) {
              return 1;
            }
            return 0;
          });
          let Data = {
            current_page: outProducts.current_page,
            data: arrayForSort,
            first_page_url: outProducts.first_page_url,
            from: outProducts.from,
            last_page: outProducts.last_page,
            last_page_url: outProducts.last_page_url,
            links: outProducts.links,
            next_page_url: outProducts.next_page_url,
            path: outProducts.path,
            per_page: outProducts.per_page,
            prev_page_url: outProducts.prev_page_url,
            to: outProducts.to,
            total: outProducts.total,
          };
          setOutProducts(Data);
        }
      } else if (e.target.value === "Z-A") {
        if (outProducts) {
          console.log(outProducts.data);
          let arrayForSort = [...outProducts.data];
          arrayForSort.sort(function (a, b) {
            if (a.product_name.toLowerCase() > b.product_name.toLowerCase()) {
              return -1;
            }
            if (a.product_name.toLowerCase() < b.product_name.toLowerCase()) {
              return 1;
            }
            return 0;
          });
          let Data = {
            current_page: outProducts.current_page,
            data: arrayForSort,
            first_page_url: outProducts.first_page_url,
            from: outProducts.from,
            last_page: outProducts.last_page,
            last_page_url: outProducts.last_page_url,
            links: outProducts.links,
            next_page_url: outProducts.next_page_url,
            path: outProducts.path,
            per_page: outProducts.per_page,
            prev_page_url: outProducts.prev_page_url,
            to: outProducts.to,
            total: outProducts.total,
          };
          setOutProducts(Data);
        }
      }
    }
  };

  const ChangeFrom = (date) => {
    setFromDate(date);
    if (section === "Inside") {
      moment(`${date}`).format("YYYY-MM-DD");
      moment(`${ToDate}`).format("YYYY-MM-DD");
      let content = DataForFilerInside.data.filter((item) => {
        return (
          item.expire_date >= moment(`${date}`).format("YYYY-MM-DD") &&
          item.expire_date <= moment(`${ToDate}`).format("YYYY-MM-DD")
        );
      });
      let Data = {
        current_page: products.current_page,
        data: content,
        first_page_url: products.first_page_url,
        from: products.from,
        last_page: products.last_page,
        last_page_url: products.last_page_url,
        links: products.links,
        next_page_url: products.next_page_url,
        path: products.path,
        per_page: products.per_page,
        prev_page_url: products.prev_page_url,
        to: products.to,
        total: products.total,
      };
      setProducts(Data);
    }

    if (section === "Outside") {
      moment(`${date}`).format("YYYY-MM-DD");
      moment(`${ToDate}`).format("YYYY-MM-DD");
      let content = DataForFilerOutside.data.filter((item) => {
        return (
          item.out_date >= moment(`${date}`).format("YYYY-MM-DD") &&
          item.out_date <= moment(`${ToDate}`).format("YYYY-MM-DD")
        );
      });
      let Data = {
        current_page: products.current_page,
        data: content,
        first_page_url: products.first_page_url,
        from: products.from,
        last_page: products.last_page,
        last_page_url: products.last_page_url,
        links: products.links,
        next_page_url: products.next_page_url,
        path: products.path,
        per_page: products.per_page,
        prev_page_url: products.prev_page_url,
        to: products.to,
        total: products.total,
      };
      setOutProducts(Data);
    }
  };

  const ChangeTo = (date) => {
    setToDate(date);
    if (section === "Inside") {
      let content = DataForFilerInside.data.filter((item) => {
        return (
          item.expire_date >= moment(`${FromDate}`).format("YYYY-MM-DD") &&
          item.expire_date <= moment(`${date}`).format("YYYY-MM-DD")
        );
      });
      let Data = {
        current_page: products.current_page,
        data: content,
        first_page_url: products.first_page_url,
        from: products.from,
        last_page: products.last_page,
        last_page_url: products.last_page_url,
        links: products.links,
        next_page_url: products.next_page_url,
        path: products.path,
        per_page: products.per_page,
        prev_page_url: products.prev_page_url,
        to: products.to,
        total: products.total,
      };
      setProducts(Data);
    }

    if (section === "Outside") {
      let content = DataForFilerOutside.data.filter((item) => {
        return (
          item.out_date >= moment(`${FromDate}`).format("YYYY-MM-DD") &&
          item.out_date <= moment(`${date}`).format("YYYY-MM-DD")
        );
      });
      let Data = {
        current_page: products.current_page,
        data: content,
        first_page_url: products.first_page_url,
        from: products.from,
        last_page: products.last_page,
        last_page_url: products.last_page_url,
        links: products.links,
        next_page_url: products.next_page_url,
        path: products.path,
        per_page: products.per_page,
        prev_page_url: products.prev_page_url,
        to: products.to,
        total: products.total,
      };
      setOutProducts(Data);
    }
  };

  const CheckallInside = () => {
    if (document.getElementById("HeadCheckInside").checked) {
      let checks = document.getElementsByName("checkInside");
      for (let i = 0; i <= checks.length; i++) {
        if (checks[i].value) {
          setIdsInside((ids) => [...ids, checks[i].value]);
        }
        document
          .getElementById(`Edit-${checks[i].value}`)
          .classList.add("hidden");
        document
          .getElementById(`Send-${checks[i].value}`)
          .classList.add("hidden");
        checks[i].checked = true;
      }
    } else if (!document.getElementById("HeadCheckInside").checked) {
      setIdsInside([]);
      let checks = document.getElementsByName("checkInside");
      for (let i = 0; i <= checks.length; i++) {
        document
          .getElementById(`Edit-${checks[i].value}`)
          .classList.remove("hidden");
        document
          .getElementById(`Send-${checks[i].value}`)
          .classList.remove("hidden");
        checks[i].checked = false;
        // idList = [];
      }
    }
  };

  const CheckChildInside = (e) => {
    if (e.target.checked) {
      setIdsInside((ids) => [...ids, e.target.value]);
      document.getElementById(`Edit-${e.target.value}`).classList.add("hidden");
      document.getElementById(`Send-${e.target.value}`).classList.add("hidden");
    } else {
      let filtered = idsInside.filter(function (value, index, arr) {
        return value !== e.target.value;
      });
      document
        .getElementById(`Edit-${e.target.value}`)
        .classList.remove("hidden");
      document
        .getElementById(`Send-${e.target.value}`)
        .classList.remove("hidden");
      setIdsInside(filtered);
    }
  };

  const UnCheckInside = () => {
    document.getElementById("HeadCheckInside").checked = false;
    setIdsInside([]);
    let checks = document.getElementsByName("checkInside");
    for (let i = 0; i <= checks.length; i++) {
      checks[i].checked = false;
      document
        .getElementById(`Edit-${checks[i].value}`)
        .classList.remove("hidden");
      document
        .getElementById(`Send-${checks[i].value}`)
        .classList.remove("hidden");
    }
  };

  ////////////////////////

  const CheckallOutside = () => {
    if (document.getElementById("HeadCheckOutside").checked) {
      let checks = document.getElementsByName("checkOutside");
      for (let i = 0; i <= checks.length; i++) {
        if (checks[i].value) {
          setIdsOutside((ids) => [...ids, checks[i].value]);
        }

        checks[i].checked = true;
      }
    } else if (!document.getElementById("HeadCheckOutside").checked) {
      setIdsOutside([]);
      let checks = document.getElementsByName("checkOutside");
      for (let i = 0; i <= checks.length; i++) {
        checks[i].checked = false;
        // idList = [];
      }
    }
  };

  const CheckChildOutside = (e) => {
    if (e.target.checked) {
      setIdsOutside((ids) => [...ids, e.target.value]);
    } else {
      let filtered = idsInside.filter(function (value, index, arr) {
        return value !== e.target.value;
      });

      setIdsOutside(filtered);
    }
  };

  const UnCheckOutside = () => {
    document.getElementById("HeadCheckOutside").checked = false;
    setIdsOutside([]);
    let checks = document.getElementsByName("checkOutside");
    for (let i = 0; i <= checks.length; i++) {
      checks[i].checked = false;
    }
  };
  return (
    <div className="w-full h-full p-5 pr-5">
      <AddProduct
        SetDataForFilterInside={SetDataForFilterInside}
        SetDataBeforeFilterInside={SetDataBeforeFilterInside}
        pageInside={pageInside}
        setProducts={setProducts}
        open={OpenAddProduct}
        setOpen={setOpenAddProduct}
      />
      {console.log(products, "p")}
      <div className="w-full flex ">
        <Header
          section={section}
          setData={section === "Inside" ? setProducts : setOutProducts}
          DataBeforeFilter={
            section === "Inside"
              ? DataBeforeFilterInside
              : DataBeforeFilterOutside
          }
        />
      </div>
      <div className="flex ">
        <SideBar page="Store" />
        <div className="w-full h-full lg:ml-8 mt-10">
          <div className="flex w-full flex-col lg:flex-row justify-evenly">
            <div className="flex w-full flex-col lg:flex-row space-x-2">
              <div className=" grid grid-cols-1 gap-3 lg:grid-cols-6 lg:gap-0  space-x-2">
                <div className="w-full flex space-x-2 lg:col-start-1 lg:col-end-2">
                  <div className="w-fit pr-2 bg-white rounded-lg flex items-center mr-2">
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
                </div>
                <div className="flex space-y-3 lg:row-start-2 lg:space-y-0 lg:space-x-2 flex-col lg:flex-row lg:col-start-1 lg:col-end-3 mt-2 ">
                  <div className="w-full flex space-x-2">
                    <div
                      className={`${
                        section === "Inside" ? "bg-[#B7C835] " : "bg-white"
                      } w-fit flex items-center px-4 rounded-xl py-2 lg:py-0 cursor-pointer`}
                      onClick={() => SectionInside()}
                    >
                      <p
                        className={`${
                          section === "Inside"
                            ? "text-white "
                            : "text-[#101828]"
                        }  text-sm font-Poppins-Regular`}
                      >
                        {t("Inside")}
                      </p>
                    </div>

                    <div
                      className={`${
                        section === "Outside" ? "bg-[#B7C835] " : "bg-white"
                      } bg-white w-fit flex items-center px-4 rounded-xl py-2 lg:py-0 cursor-pointer`}
                      onClick={() => SectionOutside()}
                    >
                      <p
                        className={`${
                          section === "Outside"
                            ? "text-white "
                            : "text-[#101828]"
                        }  text-sm font-Poppins-Regular`}
                      >
                        {t("OutSide")}
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
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

                <div
                  className={`${
                    section === "Outside" ? "hidden " : "block"
                  } bg-[#0D2135] w-fit lg:w-[90%] px-2 mt-5 lg:mt-0 py-2 lg:py-0  lg:col-start-6 lg:col-end-7   flex items-center justify-center  rounded-xl cursor-pointer `}
                  onClick={() => ProductAdd()}
                >
                  <p className="text-base flex items-center justify-center text-white ">
                    <AiOutlinePlus className="mr-2 text-lg font-Poppins-Medium" />
                    {t("Add Product")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Pangration */}
          <div className={`${section === "Inside" ? "block" : "hidden"}`}>
            <div className={`  overflow-x-scroll scrollbar-hide`}>
              <OutProductContainer
                SetDataForFilterOutside={SetDataForFilterOutside}
                SetDataBeforeFilterOutside={SetDataBeforeFilterOutside}
                pageInside={pageInside}
                setProducts={setProducts}
                pageOutside={pageOutside}
                setOutProducts={setOutProducts}
                selectedProductId={selectedProductId}
                open={OpenOutProduct}
                setOpen={setOpenOutProduct}
              />
              <EditProduct
                pageInside={pageInside}
                SetDataBeforeFilterInside={SetDataBeforeFilterInside}
                SetDataForFilterInside={SetDataForFilterInside}
                products={products}
                setProducts={setProducts}
                selectedProductId={selectedProductId}
                open={OpenEditProduct}
                setOpen={setOpenEditProduct}
              />
              <DeleteProduct
                UnCheckInside={UnCheckInside}
                idsInside={idsInside}
                setIdsInside={setIdsInside}
                pageInside={pageInside}
                SetDataBeforeFilterInside={SetDataBeforeFilterInside}
                SetDataForFilterInside={SetDataForFilterInside}
                products={products}
                setProducts={setProducts}
                selectedProductId={selectedProductId}
                open={OpenDeleteProduct}
                setOpen={setOpenDeleteProduct}
              />
              <table className="w-full h-full mt-8 bg-white rounded-t-2xl ">
                <tr className="border-b-[1px] w-full">
                  <td className="w-fit ">
                    <input
                      id="HeadCheckInside"
                      onClick={() => CheckallInside()}
                      type="checkbox"
                      className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 "
                    />
                  </td>
                  <td className="text-sm  pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 pl-2">
                    {t("Product name")}
                  </td>
                  <td className="text-sm   pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2  w-[18%]">
                    {t("Description")}
                  </td>
                  <td className="text-sm   pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2  w-[8%]">
                    {t("Quantity")}
                  </td>
                  <td className="text-sm  pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2  ">
                    {t("Company")}
                  </td>
                  <td className="text-sm  pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 w-[8%]">
                    {t("Exp")}
                  </td>
                  <td className="text-sm  pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 pl-5 w-[8%]">
                    {t("Model")}
                  </td>
                  <td className="text-sm  pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 pl-5">
                    {t("Test unit")}
                  </td>
                  <td className="text-sm  pr-20 lg:pr-0 text-[#98A2B3] font-Poppins-Regular py-2 w-[9%]">
                    {t("Action")}
                  </td>
                </tr>
                {console.log(products.data, "inside")}
                {products.data &&
                  products.data.map((item) => (
                    <tr className="border-b-[1px] ">
                      <td className="w-fit">
                        <input
                          value={item.id}
                          onClick={CheckChildInside}
                          name="checkInside"
                          type="checkbox"
                          className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 w-fit"
                        />
                      </td>
                      <td className="font-Poppins-Regular text-black items-center text-base font-semibold py-6 flex mt-2 ">
                        <img
                          src={`https://aurora-team.com/labs-obada/public/${item.image}`}
                          className="rounded-full w-8 h-8 mr-2"
                        />

                        <p>{item.product_name}</p>
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 ">
                        {item.description}
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-2">
                        {item.quantity}
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6">
                        {item.company}
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6">
                        {item.expire_date}
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-5">
                        {item.model}
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-5">
                        {item.test_unit.unit}
                      </td>

                      <td>
                        <div className="flex space-x-2 py-4">
                          <RiSendPlaneLine
                            id={`Send-${item.id}`}
                            className="text-2xl text-black cursor-pointer"
                            onClick={() => {
                              setSelectedProductId(item.id);
                              ProductOut();
                            }}
                          />
                          <TiEdit
                            id={`Edit-${item.id}`}
                            className="text-2xl  opacity-50 cursor-pointer"
                            onClick={() => {
                              setSelectedProductId(item.id);
                              setOpenEditProduct(true);
                            }}
                          />

                          <IoTrashOutline
                            className="text-2xl text-[#F04438] cursor-pointer"
                            onClick={() => {
                              setSelectedProductId(item.id);
                              setOpenDeleteProduct(true);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
            <div className="flex justify-center ">
              <Pagination
                activePage={products.current_page}
                itemsCountPerPage={products.per_page}
                totalItemsCount={products.total}
                pageRangeDisplayed={5}
                innerClass="flex justify-center space-x-5 mb-2 border-gray-400 w-full  bottom-0   items-center mt-10"
                itemClass=" bg-white  font-Poppins-Regular py-1 px-3 rounded-lg"
                activeClass="bg-[#B7C835] text-[#FFFFFF]"
                onChange={handlePageChange.bind(this)}
              />
            </div>
          </div>

          {/* <InSidePangration
            section={section}
            itemsPerPage={8}
            Data={products.data}
          /> */}
          <div
            className={`${
              section === "Outside" ? "block" : "hidden"
            } overflow-x-scroll scrollbar-hide`}
          >
            {/* <EditoutsideProduct
              pageOutside={pageOutside}
              id={selectedOutProductId}
              outProducts={outProducts}
              setOutProducts={setOutProducts}
              open={OpenEditOutProduct}
              setOpen={setOpenEditOutProduct}
            /> */}
            <DeleteoutsideProduct
              UnCheckOutside={UnCheckOutside}
              idsOutside={idsOutside}
              setIdsOutside={setIdsOutside}
              SetDataForFilterOutside={SetDataForFilterOutside}
              SetDataBeforeFilterOutside={SetDataBeforeFilterOutside}
              pageOutside={pageOutside}
              outProducts={outProducts}
              setOutProducts={setOutProducts}
              id={selectedOutProductId}
              open={OpenDeleteOutProduct}
              setOpen={setOpenDeleteOutProductt}
            />
            <table className="w-full h-full mt-8 bg-white rounded-t-2xl ">
              <tr className="border-b-[1px] w-full">
                <td className="w-fit">
                  <input
                    id="HeadCheckOutside"
                    onClick={() => CheckallOutside()}
                    type="checkbox"
                    className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 "
                  />
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pr-20 lg:pr-0 w-[17%] pl-2">
                  {t("Product name")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pr-20 lg:pr-0  w-[18%]">
                  {t("Description")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pr-20 lg:pr-0  w-[8%]">
                  {t("Quantity")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pr-20 lg:pr-0  ">
                  {t("Company")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pr-20 lg:pr-0 w-[10%]">
                  {t("Out side date")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pr-20 lg:pr-0 pl-5 w-[8%]">
                  {t("Model")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pr-20 lg:pr-0 pl-5">
                  {t("Test unit")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pr-20 lg:pr-0 w-[9%]">
                  {t("Action")}
                </td>
              </tr>
              {console.log(outProducts)}
              {outProducts.data &&
                outProducts.data.map((item) => (
                  <tr className="border-b-[1px] ">
                    <td className="w-fit">
                      <input
                        value={item.id}
                        onClick={CheckChildOutside}
                        name="checkOutside"
                        type="checkbox"
                        className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 w-fit"
                      />
                    </td>
                    <td className="font-Poppins-Regular text-black items-center text-base font-semibold py-6 flex mt-2 ">
                      <img
                        src={`https://aurora-team.com/labs-obada/public/${item.image}`}
                        className="rounded-full w-8 h-8 mr-2"
                      />

                      <p>{item.product_name}</p>
                    </td>
                    <td className="font-Poppins-Regular text-black text-base font-semibold py-6 ">
                      {item.description}
                    </td>
                    <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-2">
                      {item.quantity}
                    </td>
                    <td className="font-Poppins-Regular text-black text-base font-semibold py-6">
                      {item.company}
                    </td>
                    <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-5">
                      {item.out_date}
                    </td>
                    <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-5">
                      {item.model}
                    </td>
                    <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-5">
                      {item.unit}
                    </td>

                    <td>
                      <div className="flex space-x-2 py-4">
                        {/* <TiEdit
                          className="text-2xl  opacity-50 cursor-pointer"
                          onClick={() => {
                            setSelectedOutProductId(item.id);
                            setOpenEditOutProduct(true);
                          }}
                        /> */}

                        <IoTrashOutline
                          className="text-2xl text-[#F04438] cursor-pointer"
                          onClick={() => {
                            setSelectedOutProductId(item.id);
                            setOpenDeleteOutProductt(true);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
          {/* <OutSidePangration
            section={section}
            itemsPerPage={8}
            Data={products}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Store;

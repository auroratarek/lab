import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { IoCalendarOutline, IoTrashOutline } from "react-icons/io5";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PangrationSuppliersOfficeName from "./components/Suppliers/PangrationSuppliersOfficeName";
import { Link } from "react-router-dom";
import LabPangration from "./components/Labs/LabPangration";
import AddLab from "./components/Labs/AddLab";
import { VscListFlat } from "react-icons/vsc";

import Header from "./components/Header";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addAllLab, selectLabs, sortLab } from "./GlobalData/LabSlice";
import axios from "axios";
import DeleteLab from "./components/Labs/DeleteLab";
import Pagination from "react-js-pagination";

const labs = [
  {
    id: 1,
    name: "wewe",
    address: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "2131242141",
    code: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    address: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "2131242141",
    code: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    address: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "2131242141",
    code: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    address: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "2131242141",
    code: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    address: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "2131242141",
    code: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    address: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "2131242141",
    code: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    address: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "2131242141",
    code: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    address: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "2131242141",
    code: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    address: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "2131242141",
    code: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    address: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "2131242141",
    code: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    address: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "2131242141",
    code: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    address: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "2131242141",
    code: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    address: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "2131242141",
    code: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    address: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "2131242141",
    code: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    address: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "2131242141",
    code: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    address: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "2131242141",
    code: "2141242141",
  },
  {
    id: 1,
    name: "wewe",
    address: "Aliqua id fugiat nostrud irure ex duis ea quis id",
    phone: "2131242141",
    code: "2141242141",
  },
];
function Labs() {
  const [OpenAddLab, setOpenAddLab] = useState(false);
  const { t, i18n } = useTranslation();
  const [OpenDeleteLab, setOpenDeleteLab] = useState(false);
  const [page, setPage] = useState(1);
  const [Id, setId] = useState();
  const [ids, setIds] = useState([]);
  const LabsSelector = useSelector(selectLabs);
  const [DataBeforeFilter, SetDataBeforeFilter] = useState();
  const dispatch = useDispatch();
  const getLabs = async (page) => {
    await axios.get(`lab-scope/labs?${page}`).then((response) => {
      console.log(response.data, "hi");
      dispatch(addAllLab(response.data));
      SetDataBeforeFilter(response.data);
    });
  };
  useEffect(() => {
    getLabs(page);
  }, []);

  const LabAdd = () => {
    setOpenAddLab(true);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    getLabs(pageNumber);
  };

  const SortChange = (e) => {
    // lab_name
    console.log(LabsSelector.data);
    if (e.target.value === "A-Z") {
      if (LabsSelector) {
        console.log(LabsSelector.data);
        let arrayForSort = [...LabsSelector.data];
        arrayForSort.sort(function (a, b) {
          if (a.lab_name.toLowerCase() < b.lab_name.toLowerCase()) {
            return -1;
          }
          if (a.lab_name.toLowerCase() > b.lab_name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        let Data = {
          current_page: LabsSelector.current_page,
          data: arrayForSort,
          first_page_url: LabsSelector.first_page_url,
          from: LabsSelector.from,
          last_page: LabsSelector.last_page,
          last_page_url: LabsSelector.last_page_url,
          links: LabsSelector.links,
          next_page_url: LabsSelector.next_page_url,
          path: LabsSelector.path,
          per_page: LabsSelector.per_page,
          prev_page_url: LabsSelector.prev_page_url,
          to: LabsSelector.to,
          total: LabsSelector.total,
        };
        dispatch(addAllLab(Data));
      }
    } else if (e.target.value === "Z-A") {
      if (LabsSelector) {
        console.log(LabsSelector.data);
        let arrayForSort = [...LabsSelector.data];
        arrayForSort.sort(function (a, b) {
          if (a.lab_name.toLowerCase() > b.lab_name.toLowerCase()) {
            return -1;
          }
          if (a.lab_name.toLowerCase() < b.lab_name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        let Data = {
          current_page: LabsSelector.current_page,
          data: arrayForSort,
          first_page_url: LabsSelector.first_page_url,
          from: LabsSelector.from,
          last_page: LabsSelector.last_page,
          last_page_url: LabsSelector.last_page_url,
          links: LabsSelector.links,
          next_page_url: LabsSelector.next_page_url,
          path: LabsSelector.path,
          per_page: LabsSelector.per_page,
          prev_page_url: LabsSelector.prev_page_url,
          to: LabsSelector.to,
          total: LabsSelector.total,
        };
        dispatch(addAllLab(Data));
      }
    }
  };

  const Delete = (id) => {
    setId(id);
    setOpenDeleteLab(true);
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

  const CheckChild = (e) => {
    if (e.target.checked) {
      setIds((ids) => [...ids, e.target.value]);
      document.getElementById(`Edit-${e.target.value}`).classList.add("hidden");
      document.getElementById(`Send-${e.target.value}`).classList.add("hidden");
    } else {
      let filtered = ids.filter(function (value, index, arr) {
        return value !== e.target.value;
      });

      setIds(filtered);
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
  return (
    <div className="w-full h-full pr-5 p-5">
      <DeleteLab
        UnCheck={UnCheck}
        setIds={setIds}
        ids={ids}
        SetDataBeforeFilter={SetDataBeforeFilter}
        id={Id}
        page={page}
        open={OpenDeleteLab}
        setOpen={setOpenDeleteLab}
      />
      <AddLab
        SetDataBeforeFilter={SetDataBeforeFilter}
        page={page}
        open={OpenAddLab}
        setOpen={setOpenAddLab}
      />

      <div className="w-full flex ">
        <Header section="Labs" DataBeforeFilter={DataBeforeFilter} />
      </div>
      <div className="flex ">
        <SideBar page="Labs" />
        <div className="w-full h-full lg:ml-8 mt-10">
          <div className="flex w-full justify-between">
            <div className="flex w-full space-x-2">
              <div className="w-fit pr-2 bg-white rounded-lg flex items-center mr-5">
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

            <div
              className="bg-[#0D2135] w-[28%] lg:w-[18%]  flex items-center justify-center  rounded-xl cursor-pointer "
              onClick={() => LabAdd()}
            >
              <p className="text-base font-Poppins-SemiBold flex items-center justify-center text-white ">
                <AiOutlinePlus className="mr-2 text-lg" />
                {t("Add Lab")}
              </p>
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
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-2 pr-20 lg:pr-0">
                  {t("Lab name")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pr-20 lg:pr-0 ">
                  {t("Phone number")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[26%] pr-20 lg:pr-0">
                  {t("Address")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2  pl-2 pr-20 lg:pr-0">
                  {t("Code")}
                </td>
                <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[9%] pr-20 lg:pr-0">
                  {t("Action")}
                </td>
              </tr>
              {LabsSelector.data &&
                LabsSelector.data.map((item) => (
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
                    <td className="font-Poppins-Regular text-black items-center text-base font-semibold py-6 flex mt-2 ">
                      <p>{item.lab_name}</p>
                    </td>
                    <td className="font-Poppins-Regular text-black text-base font-semibold py-6 ">
                      {item.phone}
                    </td>
                    <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-2">
                      {item.address}
                    </td>
                    <td className="font-Poppins-Regular text-black text-base pl-4 font-semibold py-6">
                      {item.code}
                    </td>

                    <td>
                      <div className="flex space-x-2 py-4">
                        <IoTrashOutline
                          className="text-2xl text-[#F04438] cursor-pointer"
                          onClick={() => Delete(item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
          <div className="flex justify-center ">
            <Pagination
              activePage={LabsSelector.current_page}
              itemsCountPerPage={LabsSelector.per_page}
              totalItemsCount={LabsSelector.total}
              pageRangeDisplayed={5}
              innerClass="flex justify-center space-x-5 mb-2 border-gray-400 w-full  bottom-0   items-center mt-10"
              itemClass=" bg-white  font-Poppins-Regular py-1 px-3 rounded-lg"
              activeClass="bg-[#B7C835] text-[#FFFFFF]"
              onChange={handlePageChange.bind(this)}
            />
          </div>
          {/* <DoctorPangration itemsPerPage={8} Data={Doctor} /> */}
          {/* <LabPangration itemsPerPage={8} Data={labs} /> */}
        </div>
      </div>
    </div>
  );
}

export default Labs;

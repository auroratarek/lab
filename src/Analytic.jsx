import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillPlusCircle, AiOutlineClose } from "react-icons/ai";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { BsArrowDown } from "react-icons/bs";
import { BsArrowUp } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FcFolder } from "react-icons/fc";
import { FcOpenedFolder } from "react-icons/fc";
import AddSection from "./components/Analytic/AddSection";
import Intrputik from "./components/Analytic/Intrputik";
import { Link } from "react-router-dom";
import { VscListFlat } from "react-icons/vsc";

import Header from "./components/Header";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addAllAnalysis } from "./GlobalData/Analytic/AnalysisSlice";
import { selectAnalysis } from "./GlobalData/Analytic/AnalysisSlice";
import IntrputikChild from "./components/Analytic/IntrputikChild";
import {
  addAllAnalysisChild,
  selectAnalysisChild,
} from "./GlobalData/Analytic/AnalysisChildSlice";
import EditSection from "./components/Analytic/EditSection";
import { GoDash } from "react-icons/go";
import EditIntrputik from "./components/Analytic/EditIntrputik";

function Analytic() {
  const { t, i18n } = useTranslation();
  const [ShowAddSection, SetShowAddSection] = useState(false);
  const [ShowAddSubSection, SetShowAddSubSection] = useState(false);
  const [ShowEditSection, SetShowEditSection] = useState(false);
  const [showEditIntrputik, SetShowEditIntrputik] = useState(false);
  const [DataBeforeFilter, setDataBeforeFilter] = useState();
  const [id, SetId] = useState(-1);
  const [type, setType] = useState("");
  const AnalysisSelector = useSelector(selectAnalysis);
  const AnalysisChildSelector = useSelector(selectAnalysisChild);

  const dispatch = useDispatch();

  const getSections = async (page) => {
    await axios.get(`lab-scope/get-sections`).then((response) => {
      console.log(response.data, "hi");
      dispatch(addAllAnalysis(response.data));
      setDataBeforeFilter(response.data);
    });
  };
  useEffect(() => {
    getSections();
  }, []);

  const SectionClicked = async (id, once) => {
    if (once === false) {
      if (
        document
          .getElementById(`ArrowForward-${id}`)
          .classList.contains("hidden")
      ) {
        document
          .getElementById(`ArrowForward-${id}`)
          .classList.remove("hidden");
        document
          .getElementById(`ClosedFolder-${id}`)
          .classList.remove("hidden");

        document.getElementById(`ArrowBack-${id}`).classList.add("hidden");
        document.getElementById(`OpenedFolder-${id}`).classList.add("hidden");
        document.getElementById(`SubList-${id}`).classList.add("hidden");
      } else {
        await axios
          .get(`lab-scope/get-AnalysisFromSection?section_id=${id}`)
          .then((response) => {
            dispatch(addAllAnalysisChild(response.data));
            for (let i = 0; i < AnalysisSelector.length; i++) {
              if (
                AnalysisSelector[i].id !== id &&
                AnalysisSelector[i].once === false
              ) {
                if (
                  document
                    .getElementById(`ArrowForward-${AnalysisSelector[i].id}`)
                    .classList.contains("hidden")
                ) {
                  document
                    .getElementById(`ArrowForward-${AnalysisSelector[i].id}`)
                    .classList.remove("hidden");
                  document
                    .getElementById(`ClosedFolder-${AnalysisSelector[i].id}`)
                    .classList.remove("hidden");

                  document
                    .getElementById(`ArrowBack-${AnalysisSelector[i].id}`)
                    .classList.add("hidden");
                  document
                    .getElementById(`OpenedFolder-${AnalysisSelector[i].id}`)
                    .classList.add("hidden");
                  document
                    .getElementById(`SubList-${AnalysisSelector[i].id}`)
                    .classList.add("hidden");
                }
              }
            }
            console.log(response.data, id);
            if (
              document
                .getElementById(`ArrowForward-${id}`)
                .classList.contains("hidden")
            ) {
              document
                .getElementById(`ArrowForward-${id}`)
                .classList.remove("hidden");
              document
                .getElementById(`ClosedFolder-${id}`)
                .classList.remove("hidden");

              document
                .getElementById(`ArrowBack-${id}`)
                .classList.add("hidden");
              document
                .getElementById(`OpenedFolder-${id}`)
                .classList.add("hidden");
              document.getElementById(`SubList-${id}`).classList.add("hidden");
            } else if (
              !document
                .getElementById(`ArrowForward-${id}`)
                .classList.contains("hidden")
            ) {
              document
                .getElementById(`ArrowBack-${id}`)
                .classList.remove("hidden");
              document
                .getElementById(`OpenedFolder-${id}`)
                .classList.remove("hidden");
              document
                .getElementById(`SubList-${id}`)
                .classList.remove("hidden");

              document
                .getElementById(`ArrowForward-${id}`)
                .classList.add("hidden");
              document
                .getElementById(`ClosedFolder-${id}`)
                .classList.add("hidden");
            }

            if (response.data.length === 0) {
              document
                .getElementById(`meesage-${id}`)
                .classList.remove("hidden");
            }
          });
      }
    }
  };

  const SectionAdd = () => {
    SetShowAddSection(true);
    SetShowAddSubSection(false);
    SetShowEditIntrputik(false);
    SetShowEditSection(false);
  };
  const SubSictionShow = (id) => {
    SetShowAddSection(false);
    SetShowAddSubSection(true);
    SetShowEditIntrputik(false);
    SetShowEditSection(false);
    SetId(id);
  };

  const ShowSection = (id) => {
    SetId(id);
    SetShowAddSection(false);
    SetShowAddSubSection(false);
    SetShowEditIntrputik(false);
    SetShowEditSection(true);
  };
  const ShowEditAnalysis = (id, type) => {
    setType(type);
    SetId(id);
    SetShowAddSection(false);
    SetShowAddSubSection(false);
    SetShowEditSection(false);
    SetShowEditIntrputik(true);
  };

  const sortZ = () => {
    if (AnalysisSelector) {
      console.log(AnalysisSelector);
      let arrayForSort = [...AnalysisSelector];
      arrayForSort.sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      dispatch(addAllAnalysis(arrayForSort));
    }
  };

  const sortA = () => {
    if (AnalysisSelector) {
      console.log(AnalysisSelector);
      let arrayForSort = [...AnalysisSelector];
      arrayForSort.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      dispatch(addAllAnalysis(arrayForSort));
    }
  };
  return (
    <div className="w-full h-full pr-5 p-5">
      <div className="w-full flex ">
        <Header section="analytic" DataBeforeFilter={DataBeforeFilter} />
      </div>
      <div className="flex ">
        <SideBar page="Analytic" />
        <div className="w-full h-full lg:ml-8 mt-10">
          <div className="flex flex-col md:flex-row">
            <div className="bg-white p-5 lg:w-[20rem]  w-full flex flex-col rounded-2xl items-center ">
              <div
                className="bg-[#B7C835] w-fit  flex items-center justify-center px-10 py-3 rounded-xl cursor-pointer "
                onClick={() => SectionAdd()}
              >
                <p className="text-sm font-Poppins-Regular flex items-center justify-center text-white">
                  <AiOutlineFolderAdd className="mr-2 text-3xl" />
                  {t("Add section")}
                </p>
              </div>
              <div className="flex justify-between w-full  px-3 mt-5">
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => sortA()}
                >
                  <BsArrowDown />
                  <p className="font-Poppins-Regular text-sm">{t("Move up")}</p>
                </div>
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => sortZ()}
                >
                  <BsArrowUp />
                  <p className="font-Poppins-Regular text-sm">
                    {t("Move down")}
                  </p>
                </div>
              </div>
              <div className="h-[50rem] overflow-y-scroll w-full scrollbar-hide mt-5">
                {AnalysisSelector &&
                  AnalysisSelector.map((Analysis) =>
                    Analysis.once == false ? (
                      <div className="w-full">
                        <div className="flex pl-4  cursor-pointer mt-5 bg-[#F1F4D7] py-2 px-3 rounded-lg w-full  items-center">
                          <div
                            onClick={() =>
                              SectionClicked(Analysis.id, Analysis.once)
                            }
                            className="cursor-pointer flex  bg-[#F1F4D7] rounded-lg w-full  items-center"
                          >
                            <IoIosArrowForward
                              id={`ArrowForward-${Analysis.id}`}
                              className={`${
                                Analysis.once === true ? "hidden" : ""
                              }   mr-2`}
                            />
                            <IoIosArrowDown
                              id={`ArrowBack-${Analysis.id}`}
                              className="mr-2 hidden"
                            />

                            <div className="flex  items-center ">
                              <FcFolder
                                id={`ClosedFolder-${Analysis.id}`}
                                className="text-2xl mr-2"
                              />
                              <FcOpenedFolder
                                id={`OpenedFolder-${Analysis.id}`}
                                className="text-2xl mr-2 hidden"
                              />

                              <p className="font-Poppins-Medium text-sm">
                                {Analysis.name}
                              </p>
                            </div>
                          </div>
                          <div className="bg-white rounded-full mr-2">
                            <GoDash
                              className={`${
                                Analysis.once === true ? "hidden" : ""
                              } text-yellow-400 text-lg `}
                              onClick={() => ShowSection(Analysis.id)}
                            />
                          </div>
                          <AiFillPlusCircle
                            className={`${
                              Analysis.once === true ? "hidden" : ""
                            } text-[#B7C835] text-xl`}
                            onClick={() => SubSictionShow(Analysis.id)}
                          />
                        </div>

                        <div id={`SubList-${Analysis.id}`} className="hidden ">
                          <div className="w-full mt-3">
                            <ul className="flex space-y-2 flex-col justify-center items-center w-full">
                              <li
                                id={`meesage-${Analysis.id}`}
                                className="hidden"
                              >
                                None
                              </li>
                              {AnalysisChildSelector.data?.length > 0 &&
                                AnalysisChildSelector.data.map((Analysi) => (
                                  <li
                                    className=" bg-[#F1F4D7] w-full py-2 text-center rounded-xl cursor-pointer"
                                    onClick={() =>
                                      ShowEditAnalysis(Analysi.id, "Child")
                                    }
                                  >
                                    {Analysi.name}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full ">
                        <div
                          className="flex pl-4   cursor-pointer mt-5 bg-[#F1F4D7] rounded-lg w-full py-2 px-3 items-center"
                          onClick={() =>
                            ShowEditAnalysis(Analysis.id, "Parent")
                          }
                        >
                          <div className="flex  bg-[#F1F4D7] rounded-lg w-full  items-center">
                            <div className="flex  items-center ">
                              <FcFolder
                                id={`ClosedFolder`}
                                className="text-2xl mr-2"
                              />

                              <p className="font-Poppins-Medium text-sm">
                                {Analysis.test_print_name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>

            <div className="md:w-3/4 w-full  mt-5 md:ml-8  md:mt-0 ">
              <AddSection show={ShowAddSection} />
              <IntrputikChild ide={id} show={ShowAddSubSection} />
              <EditSection
                id={id}
                show={ShowEditSection}
                setShow={SetShowEditSection}
              />
              <EditIntrputik
                type={type}
                ide={id}
                show={showEditIntrputik}
                setShow={SetShowEditIntrputik}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytic;

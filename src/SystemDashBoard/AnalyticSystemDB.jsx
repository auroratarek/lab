import React, { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { BsArrowDown } from "react-icons/bs";
import { BsArrowUp } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FcFolder } from "react-icons/fc";
import { FcOpenedFolder } from "react-icons/fc";
import { AiFillPlusCircle } from "react-icons/ai";

import { VscListFlat } from "react-icons/vsc";
import { Link } from "react-router-dom";
import AddSectionSystemDB from "../components/SystemDashBoard/Analytic/AddSectionSystemDB";
import IntrputikSystemDB from "../components/SystemDashBoard/Analytic/IntrputikSystemDB";
import HeaderSystemDB from "../components/SystemDashBoard/HeaderSystemDB";
import SideBarSystemDB from "../components/SystemDashBoard/SideBarSystemDB";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllDBAnalysis,
  selectDBanalysis,
} from "../GlobalData/SystemDashBoard/AnalysisSBDSlice";
import IntrputikChildSystemDB from "../components/SystemDashBoard/Analytic/IntrputikChildSystemDB";
import {
  addAllChildDBanalysis,
  selectChildDBanalysis,
} from "../GlobalData/SystemDashBoard/AnalysisChildSBDSlice";

function AnalyticSystemDB() {
  {
    /* i was doing redux for the manereport and Culture Report tables  */
    /* i did just the get Sections api  */
  }
  const [ShowAddSectionSystemDB, SetShowAddSectionSystemDB] = useState(false);
  const [ShowAddSubSectionSystemDB, SetShowAddSubSectionSystemDB] =
    useState(false);
  const [id, SetId] = useState(-1);
  const DBAnalysisSelector = useSelector(selectDBanalysis);
  const ChildDBAnalysisSelector = useSelector(selectChildDBanalysis);

  const dispatch = useDispatch();

  const getSections = async (page) => {
    await axios.get(`admin-scope/sections?page=${page}`).then((response) => {
      dispatch(addAllDBAnalysis(response.data));
      console.log(response.data);
    });
  };
  useEffect(() => {
    getSections(2);
  }, []);

  {
    /* here when u click on the folder he will make some effect */
  }
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
          .get(`admin-scope/getAnalys?section_id=${id}`)
          .then((response) => {
            dispatch(addAllChildDBanalysis(response.data));
            for (let i = 0; i < DBAnalysisSelector.length; i++) {
              if (
                DBAnalysisSelector[i].id !== id &&
                DBAnalysisSelector[i].once === false
              ) {
                if (
                  document
                    .getElementById(`ArrowForward-${DBAnalysisSelector[i].id}`)
                    .classList.contains("hidden")
                ) {
                  document
                    .getElementById(`ArrowForward-${DBAnalysisSelector[i].id}`)
                    .classList.remove("hidden");
                  document
                    .getElementById(`ClosedFolder-${DBAnalysisSelector[i].id}`)
                    .classList.remove("hidden");

                  document
                    .getElementById(`ArrowBack-${DBAnalysisSelector[i].id}`)
                    .classList.add("hidden");
                  document
                    .getElementById(`OpenedFolder-${DBAnalysisSelector[i].id}`)
                    .classList.add("hidden");
                  document
                    .getElementById(`SubList-${DBAnalysisSelector[i].id}`)
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
          });
      }
    }
  };
  const SectionAdd = () => {
    SetShowAddSectionSystemDB(true);
    SetShowAddSubSectionSystemDB(false);
  };

  const SubSictionShow = (id) => {
    SetShowAddSectionSystemDB(false);
    SetShowAddSubSectionSystemDB(true);
    SetId(id);
  };

  return (
    <div className="w-full h-full pr-5 p-5">
      <div className="w-full flex ">
        <HeaderSystemDB />
      </div>
      <div className="flex ">
        <SideBarSystemDB page="Analytic" />
        <div className="w-full h-full lg:ml-8 mt-10">
          <div className="flex flex-col md:flex-row">
            <div className="bg-white p-5 lg:w-[20rem]  w-full flex flex-col rounded-2xl items-center ">
              <div
                className="bg-[#B7C835] w-fit  flex items-center justify-center px-10 py-3 rounded-xl cursor-pointer "
                onClick={() => SectionAdd()}
              >
                <p className="text-sm font-Poppins-Regular flex items-center justify-center text-white">
                  <AiOutlineFolderAdd className="mr-2 text-3xl" />
                  Add section
                </p>
              </div>
              <div className="flex justify-between w-full  px-3 mt-5">
                <div className="flex items-center space-x-2">
                  <BsArrowDown />
                  <p className="font-Poppins-Regular text-sm">Move up</p>
                </div>
                <div className="flex items-center space-x-2">
                  <BsArrowUp />
                  <p className="font-Poppins-Regular text-sm">Move down</p>
                </div>
              </div>
              {/*h-[70rem] overflow-y-scroll  DBAnalysisSelector Redux it has the whole data for getSections*/}
              <div className="h-[64rem] overflow-y-scroll w-full scrollbar-hide mt-5">
                {DBAnalysisSelector &&
                  DBAnalysisSelector.map((Analysis) =>
                    Analysis.once == false ? (
                      <div className="w-full ">
                        <div className="flex pl-4   cursor-pointer mt-5 bg-[#F1F4D7] rounded-lg w-full py-2 px-3 items-center">
                          <div
                            onClick={() =>
                              SectionClicked(Analysis.id, Analysis.once)
                            }
                            className="cursor-pointer flex  bg-[#F1F4D7] rounded-lg w-full py-2 px-3 items-center"
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
                              {ChildDBAnalysisSelector.data?.length > 0 &&
                                ChildDBAnalysisSelector.data.map((Analysi) => (
                                  <li>{Analysi.name}</li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full ">
                        <div className="flex pl-4   cursor-pointer mt-5 bg-[#F1F4D7] rounded-lg w-full py-2 px-3 items-center">
                          <div className="flex  bg-[#F1F4D7] rounded-lg w-full py-2 px-3 items-center">
                            <div className="flex  items-center ">
                              <FcFolder
                                id={`ClosedFolder`}
                                className="text-2xl mr-2"
                              />

                              <p className="font-Poppins-Medium text-sm">
                                {Analysis.name}
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
              <AddSectionSystemDB ide={-1} show={ShowAddSectionSystemDB} />
              <IntrputikChildSystemDB
                ide={id}
                show={ShowAddSubSectionSystemDB}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticSystemDB;

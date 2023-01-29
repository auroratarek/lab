/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosClose } from "react-icons/io";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function Complete({ Data, id, open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [histo, setHisto] = useState([]);
  const [maneReport, setManeReport] = useState([]);
  const [cultureReport, setCultureReport] = useState([]);

  const [classReport, setClassReport] = useState();
  const [antibiotics, setAntibiotics] = useState([]);

  const [histoTitle, setHistoTitle] = useState(false);
  const [maneReportTitle, setManeReportTitle] = useState(false);
  const [cultureReportTitle, setCultureReportTitle] = useState(false);

  const [antiputikTitle, setAntiputikTitle] = useState(false);
  useEffect(() => {
    // console.log(!Data[0].created_at);
    if (Data && !Data[0].created_at) {
      for (let i = 0; i <= Data.length; i++) {
        if (Data[i] && Data[i].section)
          if (Data[i].section.class_report.hsitopology) {
            setHistoTitle(true);
            for (
              let j = 0;
              j < Data[i].section.class_report.hsitopology.length;
              j++
            ) {
              setHisto((histo) => [
                ...histo,
                Data[i].section.class_report.hsitopology[j],
              ]);
            }
          }
      }

      for (let i = 0; i <= Data.length; i++) {
        if (Data[i] && Data[i].section)
          if (Data[i].section.class_report.mane_report) {
            setManeReportTitle(true);

            for (
              let j = 0;
              j < Data[i].section.class_report.mane_report.length;
              j++
            ) {
              setManeReport((mane) => [
                ...mane,
                {
                  H: Data[i].section.class_report.mane_report[j].h,
                  L: Data[i].section.class_report.mane_report[j].l,
                  result: "",
                },
              ]);
            }
          }
      }

      for (let i = 0; i <= Data.length; i++) {
        if (Data[i] && Data[i].section)
          if (Data[i].section.class_report.culture_report) {
            setCultureReportTitle(true);
            for (
              let j = 0;
              j < Data[i].section.class_report.culture_report.length;
              j++
            ) {
              setCultureReport((culture) => [
                ...culture,
                {
                  sub_test: Data[i].section.class_report.culture_report[j].text,
                  help_result: "",
                },
              ]);
            }
          }
      }

      for (let i = 0; i <= Data.length; i++) {
        if (Data[i] && Data[i].section)
          if (Data[i].section.antibiotics.length > 0) {
            setAntiputikTitle(true);
            for (let j = 0; j < Data[i].section.antibiotics.length; j++) {
              setAntibiotics((antr) => [
                ...antr,
                {
                  antibiotek: Data[i].section.antibiotics[j].subject,
                  result: "",
                  mic: "",
                },
              ]);
            }
          }
      }
    } else {
      if (Data && Data[0].histo_result) {
        for (let i = 0; i < Data[0].histo_result.length; i++) {
          if (Data[0].histo_result.length > 0) {
            setHistoTitle(true);
          } else {
            setHistoTitle(false);
          }
          setHisto((histo) => [...histo, Data[0].histo_result[i]]);
        }
      }
      if (Data && Data[0].main_report_result) {
        for (let i = 0; i < Data[0].main_report_result.length; i++) {
          setManeReportTitle(true);

          setManeReport((mane) => [
            ...mane,
            {
              H: Data[0].main_report_result[i].H,
              L: Data[0].main_report_result[i].L,
              result: Data[0].main_report_result[i].result,
            },
          ]);
        }
      }
      if (Data && Data[0].culture_report_result) {
        for (let i = 0; i < Data[0].culture_report_result.length; i++) {
          if (Data[0].culture_report_result.length > 0) {
            setCultureReportTitle(true);
          } else {
            setCultureReportTitle(false);
          }

          setCultureReport((culture) => [
            ...culture,
            {
              sub_test: Data[0].culture_report_result[i].sub_test,
              help_result: Data[0].culture_report_result[i].help_result,
            },
          ]);
        }
      }
      if (Data && Data[0].anti_result) {
        for (let i = 0; i < Data[0].anti_result.length; i++) {
          setAntiputikTitle(true);
          setAntibiotics((antr) => [
            ...antr,
            {
              antibiotek: Data[0].anti_result[i].antibiotek,
              result: Data[0].anti_result[i].result,
              mic: Data[0].anti_result[i].mic,
            },
          ]);
        }
      }
    }
  }, [Data]);

  function close() {
    setHisto([]);
    setCultureReport([]);
    setManeReport([]);
    setAntibiotics([]);

    setOpen(false);
  }

  const handleChangeHis = (e, index) => {
    let newarr = [...histo];
    newarr[index] = e.target.value;
    // let newarr = histo.filter((his) => {
    //   if (his.text === e.target.value) {
    //     his.text = e.target.value;
    //   }
    //   return his;
    // });
    setHisto(newarr);
  };

  const handleChangeHigh = (e, index) => {
    let newarr = [...maneReport];
    newarr[index].H = e.target.value;
    // let newarr = histo.filter((his) => {
    //   if (his.text === e.target.value) {
    //     his.text = e.target.value;
    //   }
    //   return his;
    // });
    setManeReport(newarr);
  };

  const handleChangeLow = (e, index) => {
    let newarr = [...maneReport];
    newarr[index].L = e.target.value;
    // let newarr = histo.filter((his) => {
    //   if (his.text === e.target.value) {
    //     his.text = e.target.value;
    //   }
    //   return his;
    // });
    setManeReport(newarr);
  };

  const handleChangeResult = (e, index) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      let newarr = [...maneReport];
      newarr[index].result = e.target.value;
      // let newarr = histo.filter((his) => {
      //   if (his.text === e.target.value) {
      //     his.text = e.target.value;
      //   }
      //   return his;
      // });
      setManeReport(newarr);
    }
  };

  const handleChangeSubTest = (e, index) => {
    let newarr = [...cultureReport];
    newarr[index].sub_test = e.target.value;
    // let newarr = histo.filter((his) => {
    //   if (his.text === e.target.value) {
    //     his.text = e.target.value;
    //   }
    //   return his;
    // });
    setCultureReport(newarr);
  };

  const handleChangeHelpResult = (e, index) => {
    let newarr = [...cultureReport];
    newarr[index].help_result = e.target.value;
    // let newarr = histo.filter((his) => {
    //   if (his.text === e.target.value) {
    //     his.text = e.target.value;
    //   }
    //   return his;
    // });
    setCultureReport(newarr);
  };

  const handleChangeSubject = (e, index) => {
    let newarr = [...antibiotics];
    newarr[index].antibiotek = e.target.value;
    // let newarr = histo.filter((his) => {
    //   if (his.text === e.target.value) {
    //     his.text = e.target.value;
    //   }

    //   return his;
    // });
    setAntibiotics(newarr);
  };

  const handleChangeAResult = (e, index) => {
    let newarr = [...antibiotics];
    newarr[index].result = e.target.value;
    // let newarr = histo.filter((his) => {
    //   if (his.text === e.target.value) {
    //     his.text = e.target.value;
    //   }

    //   return his;
    // });
    setAntibiotics(newarr);
  };

  const handleChangeMIC = (e, index) => {
    let newarr = [...antibiotics];
    newarr[index].mic = e.target.value;
    // let newarr = histo.filter((his) => {
    //   if (his.text === e.target.value) {
    //     his.text = e.target.value;
    //   }

    //   return his;
    // });
    setAntibiotics(newarr);
  };
  const Completed = async () => {
    let Datas = {};
    Datas["patient_id"] = id;
    if (histo.length > 0) {
      Datas["histo_result"] = histo;
    }
    if (maneReport.length > 0) {
      Datas["main_report_result"] = maneReport;
    }
    if (cultureReport.length > 0) {
      Datas["culture_report_result"] = cultureReport;
    }
    if (antibiotics.length > 0) {
      Datas["anti_result"] = antibiotics;
    }
    Datas["isComplete"] = 1;

    await axios
      .post("lab-scope/add-result", Datas)
      .then((response) => {
        setHisto([]);
        setCultureReport([]);
        setManeReport([]);
        setAntibiotics([]);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Save = async () => {
    let Datas = {};
    Datas["patient_id"] = id;
    if (histo.length > 0) {
      Datas["histo_result"] = histo;
    }
    if (maneReport.length > 0) {
      Datas["main_report_result"] = maneReport;
    }
    if (cultureReport.length > 0) {
      Datas["culture_report_result"] = cultureReport;
    }
    if (antibiotics.length > 0) {
      Datas["anti_result"] = antibiotics;
    }

    await axios
      .post("lab-scope/add-result", Datas)
      .then((response) => {
        setHisto([]);
        setCultureReport([]);
        setManeReport([]);
        setAntibiotics([]);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const Update = async () => {
  //   let Datas = {};
  //   Datas["patient_id"] = 90;
  //   if (histo.length > 0) {
  //     Datas["histo_result"] = histo;
  //   }
  //   if (maneReport.length > 0) {
  //     Datas["main_report_result"] = maneReport;
  //   }
  //   if (cultureReport.length > 0) {
  //     Datas["culture_report_result"] = cultureReport;
  //   }
  //   if (antibiotics.length > 0) {
  //     Datas["anti_result"] = antibiotics;
  //   }

  //   console.log(Datas, "datas");

  //   await axios
  //     .put("lab-scope/update-result", Datas)
  //     .then((response) => {
  //       setHisto([]);
  //       setCultureReport([]);
  //       setManeReport([]);
  //       setAntibiotics([]);

  //       setOpen(false);
  //       console.log("hi yeah");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
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
                <Dialog.Panel className="relative  pb-8 bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-2 sm:max-w-2xl sm:w-full ">
                  <div className="bg-white px-10">
                    <div className="w-full flex  h-full items-center mt-5">
                      <p className="  justify-center font-Poppins-SemiBold flex flex-grow text-lg ml-10">
                        Analysis results
                      </p>
                      <IoIosClose
                        className=" text-4xl  text-black border-[1px] rounded-full cursor-pointer bg-[#E4E7EC] "
                        onClick={() => close()}
                      />
                    </div>
                  </div>
                  <div className="max-h-full overflow-y-scroll">
                    <div
                      className={`${
                        histoTitle ? "" : "hidden"
                      } w-full h-full mt-10`}
                    >
                      <div className={` w-full border-t-[1px] relative`}>
                        <p className="font-Poppins-Medium text-sm absolute top-[-0.8rem] bg-white left-9  px-1 text-[#101828] font-medium">
                          Hsitopology
                        </p>
                        {/* {Data &&
                          Data.map(
                            (Analysis) =>
                              Analysis.section &&
                              Analysis.section.class_report.hsitopology && (
                                <div className="px-10 w-full mt-5">
                                  <p className="text-sm">
                                    {Analysis.section.name}
                                  </p>
                                </div>
                              )
                          )} */}

                        {histo &&
                          histo.map((his, index) => (
                            <div className="px-10 w-full">
                              <textarea
                                className=" text-xs font-Poppins-Medium col-start-1 mt-2 col-end-3 bg-[#F9FAFF] border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-3 px-4 outline-0 ring-0   relative m-auto border-[1px] rounded-xl  "
                                rows={4}
                                onChange={(e) => handleChangeHis(e, index)}
                                value={his.text || his}
                                placeholder="Notes"
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="w-full h-full mt-10">
                      <div
                        className={`${
                          maneReportTitle.length > 0 ? "" : "hidden"
                        } w-full border-t-[1px] relative`}
                      >
                        <p className="font-Poppins-Medium text-sm absolute top-[-0.8rem] bg-white left-9  px-1 text-[#101828] font-medium">
                          Mane Report
                        </p>
                        {/* {Data &&
                          Data.map(
                            (Analysis) =>
                              Analysis.section &&
                              Analysis.section.class_report.mane_report && (
                                <div className="px-10 mt-8 w-full">
                                  <p className="text-sm">
                                    {Analysis.section.name}
                                  </p>
                                </div>
                              )
                          )} */}
                        {maneReport &&
                          maneReport.map((mane, index) => (
                            <div className=" space-y-2 mt-5  px-10 w-full">
                              <div className="flex space-x-5">
                                <div className="bg-[#F9FAFF] border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl ">
                                  <input
                                    name="High"
                                    placeholder="H"
                                    onChange={(e) => handleChangeHigh(e, index)}
                                    value={mane.H}
                                    type="text"
                                    className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                                  />
                                </div>
                                <div className="bg-[#F9FAFF]  border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl ">
                                  <input
                                    name="Low"
                                    onChange={(e) => handleChangeLow(e, index)}
                                    placeholder="L"
                                    value={mane.L}
                                    type="text"
                                    className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                                  />
                                </div>
                              </div>
                              <div className="bg-[#F9FAFF] border-[#E4E7EC] w-full h-fit  flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl ">
                                <input
                                  name="Results"
                                  onChange={(e) => handleChangeResult(e, index)}
                                  value={mane.result}
                                  placeholder="Results"
                                  type="text"
                                  className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="w-full h-full mt-10">
                      <div
                        className={`${
                          cultureReportTitle.length > 0 ? "" : "hidden"
                        } w-full border-t-[1px] space-y-2 relative`}
                      >
                        <p className="font-Poppins-Medium text-sm absolute top-[-0.8rem] bg-white left-9  px-1 text-[#101828] font-medium">
                          Culture Report
                        </p>
                        {/* {Data &&
                          Data.map(
                            (Analysis) =>
                              Analysis.section &&
                              Analysis.section.class_report.culture_report && (
                                <div className="px-10 mt-8 w-full">
                                  <p className="text-sm">
                                    {Analysis.section.name}
                                  </p>
                                </div>
                              )
                          )} */}
                        {cultureReport &&
                          cultureReport.map((culture, index) => (
                            <div className="px-10 pt-8 flex space-x-5 w-full">
                              <div className="bg-[#F9FAFF] border-[#E4E7EC] w-1/2 h-fit  flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl ">
                                <input
                                  name="SupTest"
                                  placeholder="Sup Test"
                                  onChange={(e) =>
                                    handleChangeSubTest(e, index)
                                  }
                                  value={culture.sub_test}
                                  type="text"
                                  className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                                />
                              </div>
                              <div className="bg-[#F9FAFF]  border-[#E4E7EC] w-2/3 h-fit  flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl ">
                                <input
                                  name="HelpResualt"
                                  onChange={(e) =>
                                    handleChangeHelpResult(e, index)
                                  }
                                  value={culture.help_result}
                                  placeholder="Help Resualt"
                                  type="text"
                                  className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="w-full h-full mt-10">
                      <div
                        className={`${
                          antiputikTitle ? "" : "hidden"
                        } w-full border-t-[1px] space-y-2 relative`}
                      >
                        <p className="font-Poppins-Medium text-sm absolute top-[-0.8rem] bg-white left-9  px-1 text-[#101828] font-medium">
                          Antibiotics
                        </p>
                        {/* {Data &&
                          Data.map(
                            (Analysis) =>
                              Analysis.section &&
                              Analysis.section.antibiotics.length > 0 && (
                                <div className="px-10 mt-8 w-full">
                                  <p className="text-sm">
                                    {Analysis.section.name}
                                  </p>
                                </div>
                              )
                          )} */}

                        {antibiotics &&
                          antibiotics.map((ant, index) => (
                            <div className="px-10 pt-8 flex space-x-5 w-full">
                              <div className="bg-[#F9FAFF] border-[#E4E7EC] w-1/2 h-fit  flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl ">
                                <input
                                  name="Antibiotic"
                                  onChange={(e) =>
                                    handleChangeSubject(e, index)
                                  }
                                  value={ant.antibiotek}
                                  placeholder="Antibiotic"
                                  type="text"
                                  className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                                />
                              </div>
                              <div className="bg-[#F9FAFF]  border-[#E4E7EC]  h-fit  flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl ">
                                <input
                                  name="Result"
                                  value={ant.result}
                                  onChange={(e) =>
                                    handleChangeAResult(e, index)
                                  }
                                  placeholder="Result"
                                  type="text"
                                  className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                                />
                              </div>
                              <div className="bg-[#F9FAFF]  border-[#E4E7EC]  h-fit  flex space-x-2 items-center py-3 px-4    relative m-auto border-[1px] rounded-xl ">
                                <input
                                  name="MIC"
                                  onChange={(e) => handleChangeMIC(e, index)}
                                  value={ant.mic}
                                  placeholder="MIC"
                                  type="text"
                                  className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-10    py-3  flex sm:flex-row-reverse justify-evenly mt-10">
                    <button
                      onClick={Completed}
                      type="button"
                      className="flex outline-none flex-grow py-3 ml-5 bg-[#B7C835] justify-center w-[35%] rounded-xl ring-0 text-white"
                    >
                      Complete & Save
                    </button>

                    <button
                      onClick={Save}
                      type="button"
                      className="flex border-[#D0D5DD] ml-5  border-[1px] flex-grow py-3 font-Poppins-Medium text-sm  w-[35%] bg-[#FFFFFF] justify-center rounded-xl text-black"
                    >
                      Save Result
                    </button>

                    <button
                      type="button"
                      className="flex border-[#D0D5DD] border-[1px] flex-grow py-3 font-Poppins-Medium text-sm w-[20%]  bg-[#FFFFFF] justify-center rounded-xl text-black"
                      onClick={() => close()}
                    >
                      Cancel
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

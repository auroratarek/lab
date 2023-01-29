import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import { AiOutlineClose, AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import { IoCalendarOutline, IoTrashOutline } from "react-icons/io5";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PangrationSuppliersOfficeName from "./components/Suppliers/PangrationSuppliersOfficeName";
import { Link } from "react-router-dom";
import AllPatientsPangration from "./components/Patients/AllPatientsPangration";
import AddPatient from "./components/Patients/AddPatient";
import LaboratoriesPangration from "./components/Patients/LaboratoriesPangration";
import { VscListFlat } from "react-icons/vsc";
import { GoDash } from "react-icons/go";

import Header from "./components/Header";
import { useTranslation } from "react-i18next";
import { TiEdit } from "react-icons/ti";
import DeletePatient from "./components/Patients/DeletePatient";
import EditPatient from "./components/Patients/EditPatient";
import ShowPatient from "./components/Patients/ShowPatient";
import Pagination from "react-js-pagination";
import axios from "axios";
import SendPatient from "./components/Patients/Laboratories/SendPatient";
import Complete from "./components/Patients/Laboratories/Complete";
import { GiCircle } from "react-icons/gi";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import moment from "moment";
const patients = [
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DateOfVisit: "19/10/2022",
    Phone: "0598276050",
    Gender: "Man",
    Age: "27",
    Doctor: "Dr.Anand K.Gundakaram",
    completed: false,
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DateOfVisit: "19/10/2022",
    Phone: "0598276050",
    Gender: "Man",
    completed: true,
    Age: "27",
    Doctor: "Dr.Anand K.Gundakaram",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DateOfVisit: "19/10/2022",
    Phone: "0598276050",
    Gender: "Man",
    completed: false,
    Age: "27",
    Doctor: "Dr.Anand K.Gundakaram",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DateOfVisit: "19/10/2022",
    Phone: "0598276050",
    Gender: "Man",
    completed: true,
    Age: "27",
    Doctor: "Dr.Anand K.Gundakaram",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DateOfVisit: "19/10/2022",
    Phone: "0598276050",
    Gender: "Man",
    Age: "27",
    completed: true,
    Doctor: "Dr.Anand K.Gundakaram",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DateOfVisit: "19/10/2022",
    Phone: "0598276050",
    Gender: "Man",
    completed: true,
    Age: "27",
    Doctor: "Dr.Anand K.Gundakaram",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DateOfVisit: "19/10/2022",
    Phone: "0598276050",
    completed: true,
    Gender: "Man",
    Age: "27",
    Doctor: "Dr.Anand K.Gundakaram",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DateOfVisit: "19/10/2022",
    Phone: "0598276050",
    completed: true,
    Gender: "Man",
    Age: "27",
    Doctor: "Dr.Anand K.Gundakaram",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DateOfVisit: "19/10/2022",
    Phone: "0598276050",
    completed: true,
    Gender: "Man",
    Age: "27",
    Doctor: "Dr.Anand K.Gundakaram",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DateOfVisit: "19/10/2022",
    Phone: "0598276050",
    Gender: "Man",
    completed: true,
    Age: "27",
    Doctor: "Dr.Anand K.Gundakaram",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DateOfVisit: "19/10/2022",
    Phone: "0598276050",
    Gender: "Man",
    completed: true,
    Age: "27",
    Doctor: "Dr.Anand K.Gundakaram",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DateOfVisit: "19/10/2022",
    Phone: "0598276050",
    Gender: "Man",
    completed: true,
    Age: "27",
    Doctor: "Dr.Anand K.Gundakaram",
  },
  {
    id: 1,
    name: "Ali Abu Samra",
    email: "des.aliabusamra@gmail.com",
    DateOfVisit: "19/10/2022",
    Phone: "0598276050",
    Gender: "Man",
    completed: true,
    Age: "27",
    Doctor: "Dr.Anand K.Gundakaram",
  },
];

function Patients() {
  const { t, i18n } = useTranslation();

  const [OpenSendPatient, setOpenSendPatient] = useState(false);
  const [OpenComplete, setOpenComplete] = useState(false);

  const [OpenEditPatient, setOpenEditPatient] = useState(false);
  const [OpenShowPatient, setOpenShowPatient] = useState(false);
  const [OpenDeletePatient, setOpenDeletePatient] = useState(false);
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [OpenAddPatients, setOpenAddPatients] = useState(false);
  const [section, setSection] = useState("all");
  const [page, setPage] = useState(1);
  const [pageLab, setPageLab] = useState(1);
  const [type, setType] = useState("");
  const [id, setId] = useState();
  const [analysID, setAnalysID] = useState();
  const [DataForFilter, setDataForFilter] = useState();
  const [DataForFilterLab, setDataForFilterLab] = useState();

  const [getAllSendingAndResived, setGetAllSendingAndResived] = useState("");
  const [getMyDoctors, setGetMyDoctors] = useState("");

  const FromInput = React.forwardRef((props, ref) => {
    return (
      <div className=" bg-[#F9FAFF] flex p-3 rounded-xl justify-between items-center w-fit outline-0 border-2">
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
      <div className="bg-[#F9FAFF] flex p-3 rounded-xl justify-between items-center w-fit outline-0 border-2">
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

  const PatientsAdd = () => {
    setOpenAddPatients(true);
  };

  const SectionLaboratories = () => {
    setIds([]);
    setSection("Laboratories");
    axios
      .get("lab-scope/patients-SendingAndResived", {
        filter: "sendingAndResived",
      })
      .then((res) => {
        console.log(res.data.data);
        setGetAllSendingAndResived(res.data);
        setDataForFilterLab(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const PatientSend = (id, patientID) => {
    setAnalysID(patientID);
    setId(id);
    setOpenSendPatient(true);
  };

  const [Datas, setDatas] = useState();
  const getResults = async (id) => {
    await axios.get(`lab-scope/get_result_data?id=${id}`).then((response) => {
      console.log(response.data, "hi");
      setDatas(response.data);
      // setIds((ids) => [...ids, checks[i].value]);
    });
  };
  const CompletePatient = (id) => {
    setId(id);
    getResults(id);
    setOpenComplete(true);
  };

  const SectionAll = () => {
    setSection("all");
  };

  const show = (id) => {
    setId(id);
    setOpenShowPatient(true);
  };

  const edit = (id) => {
    setId(id);
    setOpenEditPatient(true);
  };

  const remove = (id) => {
    setId(id);
    setOpenDeletePatient(true);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    axios
      .get(`lab-scope/all-patient?page=${pageNumber}`)
      .then((res) => {
        setGetAllPatients(res.data);
        setDataForFilter(res.data);

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // getSuppliers(pageNumber);
  };

  const handlePageChangeLab = (pageNumber) => {
    setPageLab(pageNumber);
    axios
      .get(`lab-scope/patients-SendingAndResived?page=${pageNumber}`, {
        filter: "sendingAndResived",
      })
      .then((res) => {
        console.log(res.data.data);
        setGetAllSendingAndResived(res.data);
        setDataForFilterLab(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [getAllPatients, setGetAllPatients] = useState("");

  useEffect(() => {
    axios
      .get("lab-scope/all-patient")
      .then((res) => {
        setGetAllPatients(res.data);
        setDataForFilter(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("lab-scope/myDoctors")
      .then((res) => {
        setGetMyDoctors(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("lab-scope/patients-SendingAndResived", {
        filter: "sendingAndResived",
      })
      .then((res) => {
        setGetAllSendingAndResived(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const ChangeFrom = (date) => {
    if (section === "Laboratories") {
      setFromDate(date);

      let content = DataForFilterLab.data.filter((item) => {
        return (
          item.patient_date_of_visit >=
            moment(`${date}`).format("YYYY-MM-DD") &&
          item.patient_date_of_visit <= moment(`${ToDate}`).format("YYYY-MM-DD")
        );
      });
      let meta = {
        current_page: getAllSendingAndResived.meta.current_page,
        from: getAllSendingAndResived.meta.from,
        last_page: getAllSendingAndResived.meta.last_page,
        links: getAllSendingAndResived.meta.links,
        path: getAllSendingAndResived.meta.path,
        per_page: getAllSendingAndResived.meta.per_page,
        to: getAllSendingAndResived.meta.to,
        total: getAllSendingAndResived.meta.total,
      };
      let Data = {
        data: content,
        links: getAllSendingAndResived.links,
        meta: meta,
      };
      console.log(Data, "datafrom");

      setGetAllSendingAndResived(Data);
      console.log(content);
    } else {
      setFromDate(date);

      let content = DataForFilter.data.filter((item) => {
        return (
          item.date_of_visit >= moment(`${date}`).format("YYYY-MM-DD") &&
          item.date_of_visit <= moment(`${ToDate}`).format("YYYY-MM-DD")
        );
      });
      let meta = {
        current_page: getAllPatients.meta.current_page,
        from: getAllPatients.meta.from,
        last_page: getAllPatients.meta.last_page,
        links: getAllPatients.meta.links,
        path: getAllPatients.meta.path,
        per_page: getAllPatients.meta.per_page,
        to: getAllPatients.meta.to,
        total: getAllPatients.meta.total,
      };
      let Data = {
        data: content,
        links: getAllPatients.links,
        meta: meta,
      };
      console.log(Data, "datafrom");

      setGetAllPatients(Data);
      console.log(content);
    }
  };

  const ChangeTo = (date) => {
    if (section === "Laboratories") {
      setToDate(date);
      let content = DataForFilterLab.data.filter((item) => {
        return (
          item.patient_date_of_visit >=
            moment(`${FromDate}`).format("YYYY-MM-DD") &&
          item.patient_date_of_visit <= moment(`${date}`).format("YYYY-MM-DD")
        );
      });
      let meta = {
        current_page: getAllSendingAndResived.meta.current_page,
        from: getAllSendingAndResived.meta.from,
        last_page: getAllSendingAndResived.meta.last_page,
        links: getAllSendingAndResived.meta.links,
        path: getAllSendingAndResived.meta.path,
        per_page: getAllSendingAndResived.meta.per_page,
        to: getAllSendingAndResived.meta.to,
        total: getAllSendingAndResived.meta.total,
      };
      let Data = {
        data: content,
        links: getAllSendingAndResived.links,
        meta: meta,
      };
      console.log(Data, "data");

      setGetAllSendingAndResived(Data);
    } else {
      setToDate(date);
      let content = DataForFilter.data.filter((item) => {
        return (
          item.date_of_visit >= moment(`${FromDate}`).format("YYYY-MM-DD") &&
          item.date_of_visit <= moment(`${date}`).format("YYYY-MM-DD")
        );
      });
      let meta = {
        current_page: getAllPatients.meta.current_page,
        from: getAllPatients.meta.from,
        last_page: getAllPatients.meta.last_page,
        links: getAllPatients.meta.links,
        path: getAllPatients.meta.path,
        per_page: getAllPatients.meta.per_page,
        to: getAllPatients.meta.to,
        total: getAllPatients.meta.total,
      };
      let Data = {
        data: content,
        links: getAllPatients.links,
        meta: meta,
      };
      console.log(Data, "data");

      setGetAllPatients(Data);
    }
  };
  const [ids, setIds] = useState([]);

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
        document
          .getElementById(`Show-${checks[i].value}`)
          .classList.add("hidden");
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
          .getElementById(`Edit-${checks[i].value}`)
          .classList.remove("hidden");
        document
          .getElementById(`Show-${checks[i].value}`)
          .classList.remove("hidden");
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
      document.getElementById(`Edit-${e.target.value}`).classList.add("hidden");
      document.getElementById(`Show-${e.target.value}`).classList.add("hidden");
      document.getElementById(`Send-${e.target.value}`).classList.add("hidden");
    } else {
      let filtered = ids.filter(function (value, index, arr) {
        return value !== e.target.value;
      });
      document
        .getElementById(`Edit-${e.target.value}`)
        .classList.remove("hidden");
      document
        .getElementById(`Show-${e.target.value}`)
        .classList.remove("hidden");
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
        .getElementById(`Edit-${checks[i].value}`)
        .classList.remove("hidden");
      document
        .getElementById(`Show-${checks[i].value}`)
        .classList.remove("hidden");
      document
        .getElementById(`Send-${checks[i].value}`)
        .classList.remove("hidden");
    }
  };
  ///////////////////
  const CheckallLab = () => {
    if (document.getElementById("HeadCheckLab").checked) {
      let checks = document.getElementsByName("checkLab");
      for (let i = 0; i <= checks.length; i++) {
        if (checks[i].value) {
          setIds((ids) => [...ids, checks[i].value]);
        }
        if (document.getElementById(`EditLab-${checks[i].value}`))
          document
            .getElementById(`EditLab-${checks[i].value}`)
            .classList.add("hidden");

        if (document.getElementById(`ShowLab-${checks[i].value}`))
          document
            .getElementById(`ShowLab-${checks[i].value}`)
            .classList.add("hidden");

        if (document.getElementById(`Down-${checks[i].value}`))
          document
            .getElementById(`Down-${checks[i].value}`)
            .classList.add("hidden");

        if (document.getElementById(`Up-${checks[i].value}`))
          document
            .getElementById(`Up-${checks[i].value}`)
            .classList.add("hidden");

        if (document.getElementById(`circle-${checks[i].value}`))
          document
            .getElementById(`circle-${checks[i].value}`)
            .classList.add("hidden");

        console.log(checks[i].value);
        checks[i].checked = true;
      }
    } else if (!document.getElementById("HeadCheckLab").checked) {
      setIds([]);
      let checks = document.getElementsByName("checkLab");
      for (let i = 0; i <= checks.length; i++) {
        if (document.getElementById(`EditLab-${checks[i].value}`))
          document
            .getElementById(`EditLab-${checks[i].value}`)
            .classList.remove("hidden");
        if (document.getElementById(`ShowLab-${checks[i].value}`))
          document
            .getElementById(`ShowLab-${checks[i].value}`)
            .classList.remove("hidden");
        if (document.getElementById(`Down-${checks[i].value}`))
          document
            .getElementById(`Down-${checks[i].value}`)
            .classList.remove("hidden");
        if (document.getElementById(`Up-${checks[i].value}`))
          document
            .getElementById(`Up-${checks[i].value}`)
            .classList.remove("hidden");
        if (document.getElementById(`circle-${checks[i].value}`))
          document
            .getElementById(`circle-${checks[i].value}`)
            .classList.remove("hidden");

        checks[i].checked = false;
        // idList = [];
      }
    }
  };
  const CheckChildLab = (e) => {
    if (e.target.checked) {
      setIds((ids) => [...ids, e.target.value]);
      if (document.getElementById(`EditLab-${e.target.value}`))
        document
          .getElementById(`EditLab-${e.target.value}`)
          .classList.add("hidden");
      if (document.getElementById(`ShowLab-${e.target.value}`))
        document
          .getElementById(`ShowLab-${e.target.value}`)
          .classList.add("hidden");
      if (document.getElementById(`Down-${e.target.value}`))
        document
          .getElementById(`Down-${e.target.value}`)
          .classList.add("hidden");
      if (document.getElementById(`Up-${e.target.value}`))
        document.getElementById(`Up-${e.target.value}`).classList.add("hidden");
      if (document.getElementById(`circle-${e.target.value}`))
        document
          .getElementById(`circle-${e.target.value}`)
          .classList.add("hidden");
    } else {
      let filtered = ids.filter(function (value, index, arr) {
        return value !== e.target.value;
      });
      if (document.getElementById(`EditLab-${e.target.value}`))
        document
          .getElementById(`EditLab-${e.target.value}`)
          .classList.remove("hidden");
      if (document.getElementById(`ShowLab-${e.target.value}`))
        document
          .getElementById(`ShowLab-${e.target.value}`)
          .classList.remove("hidden");
      if (document.getElementById(`Down-${e.target.value}`))
        document
          .getElementById(`Down-${e.target.value}`)
          .classList.remove("hidden");
      if (document.getElementById(`Up-${e.target.value}`))
        document
          .getElementById(`Up-${e.target.value}`)
          .classList.remove("hidden");
      if (document.getElementById(`circle-${e.target.value}`))
        document
          .getElementById(`circle-${e.target.value}`)
          .classList.remove("hidden");

      setIds(filtered);
    }
  };

  const UnCheckLab = () => {
    document.getElementById("HeadCheckLab").checked = false;
    setIds([]);
    let checks = document.getElementsByName("checkLab");
    for (let i = 0; i <= checks.length; i++) {
      checks[i].checked = false;
      if (document.getElementById(`EditLab-${checks[i].value}`))
        document
          .getElementById(`EditLab-${checks[i].value}`)
          .classList.remove("hidden");
      if (document.getElementById(`ShowLab-${checks[i].value}`))
        document
          .getElementById(`ShowLab-${checks[i].value}`)
          .classList.remove("hidden");
      if (document.getElementById(`Down-${checks[i].value}`))
        document
          .getElementById(`Down-${checks[i].value}`)
          .classList.remove("hidden");
      if (document.getElementById(`Up-${checks[i].value}`))
        document
          .getElementById(`Up-${checks[i].value}`)
          .classList.remove("hidden");
      if (document.getElementById(`circle-${checks[i].value}`))
        document
          .getElementById(`circle-${checks[i].value}`)
          .classList.remove("hidden");
    }
  };

  /////////////
  const SortChange = (e) => {
    if (section === "Laboratories") {
      if (e.target.value === "A-Z") {
        if (getAllSendingAndResived) {
          console.log(getAllSendingAndResived.data);
          let arrayForSort = [...getAllSendingAndResived.data];
          arrayForSort.sort(function (a, b) {
            if (a.patient_name.toLowerCase() < b.patient_name.toLowerCase()) {
              return -1;
            }
            if (a.patient_name.toLowerCase() > b.patient_name.toLowerCase()) {
              return 1;
            }
            return 0;
          });
          let meta = {
            current_page: getAllSendingAndResived.meta.current_page,
            from: getAllSendingAndResived.meta.from,
            last_page: getAllSendingAndResived.meta.last_page,
            links: getAllSendingAndResived.meta.links,
            path: getAllSendingAndResived.meta.path,
            per_page: getAllSendingAndResived.meta.per_page,
            to: getAllSendingAndResived.meta.to,
            total: getAllSendingAndResived.meta.total,
          };
          let Data = {
            data: arrayForSort,
            links: getAllSendingAndResived.links,
            meta: meta,
          };
          setGetAllSendingAndResived(Data);
        }
      } else if (e.target.value === "Z-A") {
        console.log(getAllSendingAndResived.data);
        let arrayForSort = [...getAllSendingAndResived.data];
        arrayForSort.sort(function (a, b) {
          if (a.patient_name.toLowerCase() > b.patient_name.toLowerCase()) {
            return -1;
          }
          if (a.patient_name.toLowerCase() < b.patient_name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        let meta = {
          current_page: getAllSendingAndResived.meta.current_page,
          from: getAllSendingAndResived.meta.from,
          last_page: getAllSendingAndResived.meta.last_page,
          links: getAllSendingAndResived.meta.links,
          path: getAllSendingAndResived.meta.path,
          per_page: getAllSendingAndResived.meta.per_page,
          to: getAllSendingAndResived.meta.to,
          total: getAllSendingAndResived.meta.total,
        };
        let Data = {
          data: arrayForSort,
          links: getAllSendingAndResived.links,
          meta: meta,
        };
        setGetAllSendingAndResived(Data);
      }
    } else {
      if (e.target.value === "A-Z") {
        if (getAllPatients) {
          console.log(getAllPatients.data);
          let arrayForSort = [...getAllPatients.data];
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
            current_page: getAllPatients.meta.current_page,
            from: getAllPatients.meta.from,
            last_page: getAllPatients.meta.last_page,
            links: getAllPatients.meta.links,
            path: getAllPatients.meta.path,
            per_page: getAllPatients.meta.per_page,
            to: getAllPatients.meta.to,
            total: getAllPatients.meta.total,
          };
          let Data = {
            data: arrayForSort,
            links: getAllPatients.links,
            meta: meta,
          };
          setGetAllPatients(Data);
        }
      } else if (e.target.value === "Z-A") {
        console.log(getAllPatients.data);
        let arrayForSort = [...getAllPatients.data];
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
          current_page: getAllPatients.meta.current_page,
          from: getAllPatients.meta.from,
          last_page: getAllPatients.meta.last_page,
          links: getAllPatients.meta.links,
          path: getAllPatients.meta.path,
          per_page: getAllPatients.meta.per_page,
          to: getAllPatients.meta.to,
          total: getAllPatients.meta.total,
        };
        let Data = {
          data: arrayForSort,
          links: getAllPatients.links,
          meta: meta,
        };
        setGetAllPatients(Data);
      }
    }
  };

  const DoctorFilter = (e) => {
    if (section === "Laboratories") {
      if (e.target.value === "Doctors") {
        setGetAllSendingAndResived(DataForFilterLab);
      } else {
        let DataFiltered = DataForFilterLab.data.filter((item) => {
          console.log(e.target.value);
          return (
            item.doctor &&
            item.doctor.toLowerCase().includes(e.target.value.toLowerCase())
          );

          // return item.from.toLowerCase() == e.target.value.toLowerCase();
        });
        console.log(DataForFilterLab);
        let meta = {
          current_page: DataForFilterLab.meta.current_page,
          from: DataForFilterLab.meta.from,
          last_page: DataForFilterLab.meta.last_page,
          links: DataForFilterLab.meta.links,
          path: DataForFilterLab.meta.path,
          per_page: DataForFilterLab.meta.per_page,
          to: DataForFilterLab.meta.to,
          total: DataForFilterLab.meta.total,
        };
        let Data = {
          data: DataFiltered,
          links: DataForFilterLab.links,
          meta: meta,
        };

        setGetAllSendingAndResived(Data);
      }
    } else {
      if (e.target.value === "Doctors") {
        setGetAllPatients(DataForFilter);
      } else {
        let DataFiltered = DataForFilter.data.filter((item) => {
          console.log(e.target.value);
          return item.from.toLowerCase().includes(e.target.value.toLowerCase());

          // return item.from.toLowerCase() == e.target.value.toLowerCase();
        });
        console.log(DataForFilter);
        let meta = {
          current_page: DataForFilter.meta.current_page,
          from: DataForFilter.meta.from,
          last_page: DataForFilter.meta.last_page,
          links: DataForFilter.meta.links,
          path: DataForFilter.meta.path,
          per_page: DataForFilter.meta.per_page,
          to: DataForFilter.meta.to,
          total: DataForFilter.meta.total,
        };
        let Data = {
          data: DataFiltered,
          links: DataForFilter.links,
          meta: meta,
        };

        setGetAllPatients(Data);
      }
    }
  };
  return (
    <div className="w-full h-full lg:pr-5 p-5">
      <AddPatient
        setGetAllPatients={setGetAllPatients}
        setDataForFilter={setDataForFilter}
        open={OpenAddPatients}
        setOpen={setOpenAddPatients}
      />
      <div className="w-full flex ">
        <Header
          section={section === "Laboratories" ? "Laboratories" : "patients"}
          setData={
            section === "Laboratories"
              ? setGetAllSendingAndResived
              : setGetAllPatients
          }
          DataBeforeFilter={
            section === "Laboratories" ? DataForFilterLab : DataForFilter
          }
        />
      </div>
      <div className="flex ">
        <SideBar page="Patients" />
        <div className="w-full h-full lg:ml-8 mt-10">
          <div className="flex flex-col lg:flex-row w-full justify-between">
            <div className="grid grid-cols-1 gap-2  lg:gap-0 lg:grid-cols-7 w-full space-x-2">
              <div className="w-fit pr-2 bg-white rounded-lg flex items-center ">
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

              <div className="w-full flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2 pr-2 lg:col-start-2 lg:col-end-5">
                <div className="w-fit flex  space-x-2">
                  <div
                    className={`${
                      section === "all" ? "bg-[#B7C835]" : "bg-white"
                    } w-fit flex items-center px-4 py-2 lg:py-0 rounded-xl cursor-pointer`}
                    onClick={() => SectionAll()}
                  >
                    <p
                      id="all"
                      className={`${
                        section === "all" ? "text-white" : "text-[#101828]"
                      } text-white text-xs text-center `}
                    >
                      {t("All")}
                    </p>
                  </div>

                  <div
                    className={`${
                      section === "NotComplete" ? "bg-[#B7C835]" : "bg-white"
                    } bg-white w-fit flex items-center px-4 py-2 lg:py-0 rounded-xl cursor-pointer`}
                    onClick={() => setSection("NotComplete")}
                  >
                    <p
                      id="Notcomplete"
                      className={`${
                        section === "NotComplete"
                          ? "text-white"
                          : "text-[#101828]"
                      }  text-xs text-center `}
                    >
                      {t("Not complete")}
                    </p>
                  </div>
                  <div
                    className={`${
                      section === "CompletedNotPrinted"
                        ? "bg-[#B7C835]"
                        : "bg-white"
                    } bg-white w-fit flex items-center px-4 py-2 lg:py-0 rounded-xl cursor-pointer`}
                    onClick={() => setSection("CompletedNotPrinted")}
                  >
                    <p
                      id="CompletedAndNotPrinted"
                      className={`${
                        section === "CompletedNotPrinted"
                          ? "text-white"
                          : "text-[#101828]"
                      }  text-xs text-center`}
                    >
                      {t("Completed and not printed")}
                    </p>
                  </div>
                </div>
                <div className="w-fit flex space-x-2">
                  <div
                    className={`${
                      section === "Printed" ? "bg-[#B7C835]" : "bg-white"
                    } bg-white w-fit flex items-center px-4 py-2 lg:py-0 rounded-xl cursor-pointer`}
                    onClick={() => setSection("Printed")}
                  >
                    <p
                      id="Printed"
                      className={`${
                        section === "Printed" ? "text-white" : "text-[#101828]"
                      } text-xs text-center`}
                    >
                      {t("Printed")}
                    </p>
                  </div>

                  <div
                    className={`${
                      section === "Laboratories" ? "bg-[#B7C835]" : "bg-white"
                    } w-fit flex items-center px-4 py-2 lg:py-0 rounded-xl cursor-pointer`}
                    onClick={SectionLaboratories}
                  >
                    <p
                      id="Laboratories"
                      className={`${
                        section === "Laboratories"
                          ? "text-white"
                          : "text-[#101828]"
                      } text-xs text-center`}
                    >
                      {t("Laboratories")}
                    </p>
                  </div>

                  <select
                    name="Doctors"
                    onChange={DoctorFilter}
                    className={`${
                      section === "Doctors"
                        ? "bg-[#B7C835] text-white"
                        : "bg-white"
                    } w-fit   rounded-lg bg-white   font-Poppins-Medium   text-xs  outline-none px-4 py-2 cursor-pointer`}
                  >
                    <option value="Doctors" selected className="">
                      {t("Doctors")}
                    </option>
                    {getMyDoctors &&
                      getMyDoctors.map((item) => (
                        <option value={item.name} className="">
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="lg:col-start-6 lg:col-end-8 lg:flex lg:justify-end lg:items-end w-full h-full">
                <div
                  className="bg-[#0D2135] w-[10rem] lg:h-full lg:w-fit mt-5 lg:px-10 lg:mt-0 py-2 lg:py-0 flex items-center justify-center   rounded-xl cursor-pointer "
                  onClick={() => PatientsAdd()}
                >
                  <p className="text-base font-Poppins-SemiBold flex items-center justify-center text-white ">
                    <AiOutlinePlus className="mr-2 text-lg" />
                    {t("Add patient")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-5 flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-10">
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

          {/* Pangration */}
          <div
            className={`${section === "Laboratories" ? "hidden" : ""} w-full`}
          >
            <div className={` overflow-x-scroll`}>
              <ShowPatient
                id={id}
                open={OpenShowPatient}
                setOpen={setOpenShowPatient}
              />
              <EditPatient
                setGetAllPatients={setGetAllPatients}
                setDataForFilter={setDataForFilter}
                id={id}
                open={OpenEditPatient}
                setOpen={setOpenEditPatient}
              />
              <DeletePatient
                type={section === "Laboratories" ? "Laboratories" : "patients"}
                getAllPatients={getAllPatients}
                getAllSendingAndResived={getAllSendingAndResived}
                page={page}
                pageLab={pageLab}
                setGetAllPatients={setGetAllPatients}
                setDataForFilter={setDataForFilter}
                setGetAllSendingAndResived={setGetAllSendingAndResived}
                UnCheck={section === "Laboratories" ? UnCheck : UnCheckLab}
                ids={ids}
                setids={setIds}
                id={id}
                open={OpenDeletePatient}
                setOpen={setOpenDeletePatient}
              />
              <table className={` w-full h-full mt-5 bg-white rounded-t-2xl `}>
                <tr className="border-b-[1px] w-full">
                  <td className="w-fit  pr-2 lg:pr-0">
                    <input
                      id="HeadCheck"
                      type="checkbox"
                      className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 "
                      onClick={() => Checkall()}
                    />
                  </td>
                  <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2  pr-20 lg:pr-0">
                    {t("Patient name")}
                  </td>
                  <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2   pr-20 lg:pr-0">
                    {t("Date of visit")}
                  </td>
                  <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-2 pr-20 lg:pr-0">
                    {t("Phone number")}
                  </td>
                  <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[8%] pr-20 lg:pr-0 ">
                    {t("Gender")}
                  </td>
                  <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[8%] pr-20 lg:pr-0">
                    {t("Age")}
                  </td>
                  {/* <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-5">
                    Section Name
                  </td> */}
                  <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-5 pr-20 lg:pr-0">
                    {/* {t("Doctor")} */}
                    From
                  </td>

                  <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[13%] pr-20 lg:pr-0">
                    {t("Action")}
                  </td>
                </tr>
                {getAllPatients &&
                  getAllPatients.data.map((item) => (
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
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 flex flex-col">
                        <p>{item.name}</p>
                        <p className="text-xs font-Poppins-Regular font-medium text-[#908F8F]">
                          {item.email}
                        </p>
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 ">
                        {item.date_of_visit}
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-2">
                        {item.phone}
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6">
                        {item.gender}
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6">
                        {item.age}
                      </td>

                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-5">
                        {item.from}
                      </td>
                      <td>
                        <div className="flex justify-center items-center space-x-2 py-4">
                          <GoDash
                            className="text-yellow-400 cursor-pointer"
                            id={`Send-${item.id}`}
                            onClick={() => PatientSend(item.id)}
                          />
                          <AiOutlineEye
                            id={`Show-${item.id}`}
                            className="text-2xl text-black cursor-pointer"
                            onClick={() => show(item.id)}
                          />
                          <TiEdit
                            id={`Edit-${item.id}`}
                            className="text-2xl  opacity-50 cursor-pointer"
                            onClick={() => edit(item.id)}
                          />

                          <IoTrashOutline
                            className="text-2xl text-[#F04438] cursor-pointer"
                            onClick={() => remove(item.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>
            </div>

            <div className="flex justify-center ">
              {getAllPatients && (
                <Pagination
                  activePage={getAllPatients.meta.current_page}
                  itemsCountPerPage={getAllPatients.meta.per_page}
                  totalItemsCount={getAllPatients.meta.total}
                  pageRangeDisplayed={5}
                  innerClass="flex justify-center space-x-5 mb-2 border-gray-400 w-full  bottom-0   items-center mt-10"
                  itemClass=" bg-white  font-Poppins-Regular py-1 px-3 rounded-lg"
                  activeClass="bg-[#B7C835] text-[#FFFFFF]"
                  onChange={handlePageChange.bind(this)}
                />
              )}
            </div>
          </div>

          {/* <AllPatientsPangration itemsPerPage={8} Data={patients} /> */}
          <div
            className={`${
              section === "Laboratories" ? "block" : "hidden"
            } w-full`}
          >
            <div className={`overflow-x-scroll`}>
              <SendPatient
                id={id}
                patientId={analysID}
                open={OpenSendPatient}
                setOpen={setOpenSendPatient}
              />
              <Complete
                Data={Datas}
                id={id}
                open={OpenComplete}
                setOpen={setOpenComplete}
              />
              {/* <ShowPLab open={OpenShowPatient} setOpen={setOpenShowPatient} />
            <EditPLab open={OpenEditPatient} setOpen={setOpenEditPatient} />
            <DeletePLab
              open={OpenDeletePatient}
              setOpen={setOpenDeletePatient}
            /> */}

              <table className="w-full h-full mt-5 bg-white rounded-t-2xl ">
                <tr className="border-b-[1px] w-full">
                  <td className="w-fit">
                    <input
                      id="HeadCheckLab"
                      onClick={() => CheckallLab()}
                      type="checkbox"
                      className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 "
                    />
                  </td>
                  <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 ">
                    {t("Patient name")}
                  </td>
                  <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2  ">
                    {t("Date of visit")}
                  </td>
                  <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-2">
                    {t("Phone number")}
                  </td>
                  <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[8%] ">
                    {t("Gender")}
                  </td>
                  <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[8%]">
                    {t("Age")}
                  </td>
                  <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-5">
                    {t("From")}
                  </td>
                  {/* <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 pl-5">
                    Section Name
                  </td> */}
                  <td className="text-sm text-[#98A2B3] font-Poppins-Regular py-2 w-[15%]">
                    {t("Action")}
                  </td>
                </tr>

                {getAllSendingAndResived.data &&
                  getAllSendingAndResived.data.map((item) => (
                    <tr className="border-b-[1px] ">
                      <td className="w-fit pr-2 lg:pr-0">
                        <input
                          value={item.id}
                          onClick={CheckChildLab}
                          name="checkLab"
                          type="checkbox"
                          className="text-[#E4E7EC] border-[#E4E7EC] border-[1px] ml-5 w-fit"
                        />
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 flex flex-col pr-20 lg:pr-0">
                        <p>{item.patient_name}</p>
                        <p className="text-xs font-medium text-[#908F8F]">
                          {item.email}
                        </p>
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6  pr-20 lg:pr-0">
                        {item.patient_date_of_visit}
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-2 pr-20 lg:pr-0">
                        {item.patitne_phone_number}
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pr-20 lg:pr-0">
                        {item.patitne_gender}
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pr-20 lg:pr-0">
                        {item.patitne_age}
                      </td>
                      <td className="font-Poppins-Regular text-black text-base font-semibold py-6 pl-5 pr-20 lg:pr-0">
                        {item.lab_name || item.doctor || item.compnay}
                      </td>
                      <td>
                        <div className="flex space-x-2 items-center py-4">
                          <GiCircle
                            id={`circle-${item.patient_id}`}
                            className={`text-xl font-bold  ${
                              item.completed
                                ? "bg-[#12B76A] rounded-full text-[#12B76A]"
                                : "text-[#98A2B3]"
                            }  cursor-pointer`}
                            onClick={() => CompletePatient(item.patient_id)}
                          />
                          {item.recived_id ? (
                            <BsArrowDown
                              id={`Down-${item.patient_id}`}
                              className="text-green-400 cursor-pointer"
                              onClick={() => PatientSend(item.patient_id)}
                            />
                          ) : (
                            <BsArrowUp
                              id={`Up-${item.patient_id}`}
                              className="text-red-600 cursor-pointer"
                              onClick={() => PatientSend(item.patient_id)}
                            />
                          )}

                          <AiOutlineEye
                            id={`ShowLab-${item.patient_id}`}
                            className="text-2xl text-black cursor-pointer"
                            onClick={() => show(item.patient_id)}
                          />

                          <TiEdit
                            id={`EditLab-${item.patient_id}`}
                            className="text-2xl  opacity-50 cursor-pointer"
                            onClick={() => edit(item.patient_id)}
                          />
                          {/* <IoTrashOutline
                            className="text-2xl text-[#F04438] cursor-pointer"
                            onClick={() => remove(item.patient_id)}
                          /> */}
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
            <div className="flex justify-center ">
              {getAllSendingAndResived && getAllSendingAndResived.meta && (
                <Pagination
                  activePage={getAllSendingAndResived.meta.current_page}
                  itemsCountPerPage={getAllSendingAndResived.meta.per_page}
                  totalItemsCount={getAllSendingAndResived.meta.total}
                  pageRangeDisplayed={5}
                  innerClass="flex justify-center space-x-5 mb-2 border-gray-400 w-full  bottom-0   items-center mt-10"
                  itemClass=" bg-white  font-Poppins-Regular py-1 px-3 rounded-lg"
                  activeClass="bg-[#B7C835] text-[#FFFFFF]"
                  onChange={handlePageChangeLab.bind(this)}
                />
              )}
            </div>
          </div>
          {/* <LaboratoriesPangration
            section={section}
            itemsPerPage={8}
            Data={patients}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Patients;

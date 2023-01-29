import { configureStore } from "@reduxjs/toolkit";
import TupeReducer from "../GlobalData/SystemDashBoard/TupeSlice";
import UnitReducer from "../GlobalData/SystemDashBoard/UnitSlice";
import TestMethodReducer from "../GlobalData/SystemDashBoard/TestMethodSlice";
import GenderReducer from "../GlobalData/SystemDashBoard/GenderSlice";
import DBLabReducer from "../GlobalData/SystemDashBoard/LabSDBSlice";
import AnalysisSBDReducer from "../GlobalData/SystemDashBoard/AnalysisSBDSlice";
import ManeReportSBDReducer from "../GlobalData/SystemDashBoard/ManeReportSDBSlice";
import CultureReportSDBReducer from "../GlobalData/SystemDashBoard/CultureReportSDBSlice";
import IntrputikSDBReducer from "../GlobalData/SystemDashBoard/IntrputikSDBSlice";
import CompaniesSliceReducer from "../GlobalData/Basic Plugins/CompaniesSlice";
import PaymentMethodSliceReducer from "../GlobalData/Basic Plugins/PaymentMethodSlice";
import SendMethodSliceReducer from "../GlobalData/Basic Plugins/SendMethodSlice";
import analaytics from "../GlobalData/SystemDashBoard/analaytic";
import histopathologys from "../GlobalData/SystemDashBoard/HistopathologySlice";
import TestUnitSliceReducer from "../GlobalData/Basic Plugins/TestUnitSlice";
import UnitStoreSliceReducer from "../GlobalData/Basic Plugins/UnitStoreSlice";
import TestMethodSliceReducer from "../GlobalData/Basic Plugins/TestMethodSlice";
import IntrputikSliceReducer from "../GlobalData/Analytic/IntrputikSlice";
import AnalysisSliceReducer from "../GlobalData/Analytic/AnalysisSlice";
import AnalayticSliceReducer from "../GlobalData/Analytic/AnalayticSlice";
import ManeReportSliceReducer from "../GlobalData/Analytic/ManeReportSlice";
import CultureReportSliceReducer from "../GlobalData/Analytic/CultureReportSlice";
import HistopathologysReducer from "../GlobalData/Analytic/Histopathologys";
import AnalysisChildSliceReducer from "../GlobalData/Analytic/AnalysisChildSlice";

import AnalayticChildSliceReducer from "../GlobalData/Analytic/AnalayticChildSlice";
import ErrorHandleChildReducer from "../GlobalData/Analytic/ErrorHandleChild";
import EditIntrputikReducer from "../GlobalData/Analytic/EditIntrputikSlice";
import EditManeReportReducer from "../GlobalData/Analytic/EditManeReportSlice";
import EditCultureReportReducer from "../GlobalData/Analytic/EditCultureReportSlice";

import ErrorHandleReducer from "../GlobalData/Analytic/ErrorHandle";
import analayticChildReducer from "../GlobalData/SystemDashBoard/analayticChild";
import AnalysisChildSBDSliceReducer from "../GlobalData/SystemDashBoard/AnalysisChildSBDSlice";
import ErrorHandleDBSliceReducer from "../GlobalData/SystemDashBoard/ErrorHandleDBSlice";
import ErrorHandleChildDBSliceReducer from "../GlobalData/SystemDashBoard/ErrorHandleChildDBSlice";
import JobTitleSliceReducer from "../GlobalData/Basic Plugins/JobTitleSlice";
import SpecializationSliceReducer from "../GlobalData/Basic Plugins/SpecializationSlice";
import getSuppliersSliceReducer from "../GlobalData/Suppliers/getSuppliersSlice";
import gatSupplierBillsSliceReducer from "../GlobalData/Suppliers/gatSupplierBillsSlice";
import getSupplierPaidBillsSliceReducer from "../GlobalData/Suppliers/getSupplierPaidBillsSlice";

import DoctorsSliceReducer from "../GlobalData/DoctorsSlice";
import LabSliceReducer from "../GlobalData/LabSlice";
import ExportsSliceReducer from "../GlobalData/ExportsSlice";
import RevenuesSliceReducer from "../GlobalData/RevenuesSlice";

export const store = configureStore({
  reducer: {
    tupe: TupeReducer,
    unit: UnitReducer,
    test: TestMethodReducer,
    gender: GenderReducer,
    DBLab: DBLabReducer,
    DBanalysis: AnalysisSBDReducer,
    DBManeReport: ManeReportSBDReducer,
    DBCultureReport: CultureReportSDBReducer,
    DBIntrputik: IntrputikSDBReducer,
    company: CompaniesSliceReducer,
    paymentMethod: PaymentMethodSliceReducer,
    sendMethod: SendMethodSliceReducer,
    analaytic: analaytics,
    histopathology: histopathologys,
    testUnit: TestUnitSliceReducer,
    unitStore: UnitStoreSliceReducer,
    testMethod: TestMethodSliceReducer,
    Intrputik: IntrputikSliceReducer,
    analysis: AnalysisSliceReducer,
    analaytics: AnalayticSliceReducer,
    ManeReport: ManeReportSliceReducer,
    CultureReport: CultureReportSliceReducer,
    histopathologys: HistopathologysReducer,
    ChildDBanalysis: AnalysisChildSBDSliceReducer,
    AnalysisChild: AnalysisChildSliceReducer,
    errorDB: ErrorHandleDBSliceReducer,
    error: ErrorHandleReducer,
    errorDBChild: ErrorHandleChildDBSliceReducer,
    errorChild: ErrorHandleChildReducer,
    jobTitle: JobTitleSliceReducer,
    specializations: SpecializationSliceReducer,
    analayticChild: analayticChildReducer,
    analayticChilds: AnalayticChildSliceReducer,
    supplier: getSuppliersSliceReducer,
    supplierBill: gatSupplierBillsSliceReducer,
    paidBill: getSupplierPaidBillsSliceReducer,
    doctor: DoctorsSliceReducer,
    lab: LabSliceReducer,
    export: ExportsSliceReducer,
    revenue: RevenuesSliceReducer,
    EditIntrputik: EditIntrputikReducer,
    EditManeReport: EditManeReportReducer,
    EditCultureReport: EditCultureReportReducer,
  },
});

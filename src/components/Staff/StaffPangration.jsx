import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { HiOutlineArrowRight } from "react-icons/hi";
import EmployerContainer from "./EmployerContainer";
import DeleteEmployee from "./DeleteEmployee";
import Pagination from "react-js-pagination";
// Example items, to simulate fetching from another resources.
import axios from "axios"
function Items({ currentItems, setOpenDeleteEmployss }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
      {currentItems &&
        currentItems.map((item) => (
          <EmployerContainer
            id={item.id}
            name={item.name}
            work={item.work}
            phone={item.phone}
            email={item.email}
            setOpenDeleteEmployss={setOpenDeleteEmployss}
          />
        ))}
    </div>
  );
}

function StaffPangration({ itemsPerPage, Data }) {
  console.log(Data)
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [OpenDeleteEmployss, setOpenDeleteEmployss] = useState(false);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  let currentItems;
  if(Data)
   currentItems = Data.data;
  // const pageCount = Math.ceil(Data.length / itemsPerPage);

  // Invoke when user click to request another page.
  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % Data.length;
  //   console.log(
  //     `User requested page number ${event.selected}, which is offset ${newOffset}`
  //   );
  //   setItemOffset(newOffset);
  // };
  const getSuppliers = async (page) => {
    await axios.get(`lab-scope/staff?page=${page}`).then((response) => {
      console.log(response.data, "hi");
      // dispatch(addAllSupplier(response.data));
    });
  };
  useEffect(() => {
    getSuppliers(1);
  }, []);
  const handlePageChange = (pageNumber) => {
    // console.log(`active page is ${pageNumber}`);
    // this.setState({ activePage: pageNumber });
    getSuppliers(pageNumber);
  };
  return (
    <div>
      <DeleteEmployee
        open={OpenDeleteEmployss}
        setOpen={setOpenDeleteEmployss}

      />
      <Items
        setOpenDeleteEmployss={setOpenDeleteEmployss}
        currentItems={currentItems}
        className="w-full bg-white"
      />
      {/* <ReactPaginate
        breakLabel={<BsThreeDots />}
        nextLabel={
          <div className="bg-white py-[0.4rem] px-2  rounded-lg">
            <HiOutlineArrowRight className="bg-white text-xl" />
          </div>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel={
          <div className="bg-white py-[0.4rem] px-2  rounded-lg">
            <HiOutlineArrowLeft className="bg-white text-xl" />
          </div>
        }
        pageClassName="bg-white  font-Poppins-Regular py-1 px-3 rounded-lg"
        containerClassName="flex justify-center space-x-5 mb-2 border-gray-400 w-full  bottom-0   items-center mt-10"
        activeClassName="bg-[#B7C835] text-[#FFFFFF] "
        renderOnZeroPageCount={null}
      /> */}
      {
        Data &&(

          <Pagination
                 activePage={Data.current_page}
                 itemsCountPerPage={Data.per_page}
                 totalItemsCount={Data.total}
                 pageRangeDisplayed={5}
                 innerClass="flex justify-center space-x-5 mb-2 border-gray-400 w-full  bottom-0   items-center mt-10"
                 itemClass=" bg-white  font-Poppins-Regular py-1 px-3 rounded-lg"
                 activeClass="bg-[#B7C835] text-[#FFFFFF]"
                 onChange={handlePageChange.bind(this)}
               />
        )
      }
    </div>
  );
}
export default StaffPangration;

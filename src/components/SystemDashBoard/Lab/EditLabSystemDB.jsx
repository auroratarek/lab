/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";
import {
  addAllDBLab,
  selectDBLabs,
} from "../../../GlobalData/SystemDashBoard/LabSDBSlice";

export default function EditLabSystemDB({ open, setOpen, id }) {
  const cancelButtonRef = useRef(null);
  const LabSelector = useSelector(selectDBLabs);
  const [selected, Setselected] = useState({});
  useEffect(() => {
    Setselected(
      LabSelector.data
        ? LabSelector.data[
            LabSelector.data.findIndex((tupeItem) => tupeItem.id === id)
          ]
        : ""
    );
  }, [id]);

  const Edit = async () => {
    let token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTNjNmIwNGU3YWM4MDJkYTZmMjBmNDFlOTQ0YzgwY2FhZWFkYTUzODYwYjQ0MzliOTIxYzUxYmMxNGI5NzRiZjFmM2Y0MzgxMzdkNWM5MjUiLCJpYXQiOjE2NzMwMDQ1MjYuMTk2NzU2LCJuYmYiOjE2NzMwMDQ1MjYuMTk2NzU4LCJleHAiOjE3MDQ1NDA1MjYuMTkyMjE0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.fnLnZuk2fJ5ZzZ9mNLUiFs8kuIxepWPbx8iTXWQT32Ex1w-GE6CQcs0F6QtwB6v0venr55OlRen94-Kj6zo98O_OXDDeyi2_NDB0GXLFH0w7aoLxFHSO8MKjOzJ__AuDHlQSMiqe8Gb3_G3-lfII9xAeEbs4oOOklGTiSj0NT2hH0sqNc1lov4nqc1rahtEAR3SZKanW8tjkqKTFb1u97fE6impKxCiLPJLFCj5izyacy0y0nuDGNAEoJSd83TyOwBCmiZOKGH2Dw5yCURcfrG246qqee_zcuYGuipjHAMvIN1CXsQLyIMnMWfQHuGQTzFWhU5QSmmQOZZKuas2wneiSdgFVCLWImQS_U0njfY-WtXh7dJu1vauJqRJnrmlSaXwyWzoKjhKxSUPST3KzGvV9rST6mQeP0G6LPcv5b70QLf_fSrDb4AVC4Vi6cTgvMsLzreo5pg20A5dNWAvxnCz0RJkQdhUYQEy5yBKJQOryEMOqTQm2RMrf6z4eVVIKYKDcROy_CPwk5nC6RwEdMRZjBwQEtl7tD1LbL6Kjkuyi8Cc9fSm55moR4NG293_JrhjnTnmFju3m952Bx3LNxiZUVcBs2rhzF9ZD8AGfAvHD_XlxOSiMIZasEhfxb0MA1rd7xdRdklevX5svfxU2HJT6S6rnrsU6CIgM7-b-BVI";

    let selected =
      LabSelector[LabSelector.findIndex((LabItem) => LabItem.id === id)];
    let formdata = new FormData();
    formdata.append("id", selected.id);
    formdata.append("tupe", document.getElementById("tupeName").value);

    await axios
      .put(
        `https://aurora-team.com/labs-obada/api/admin-scope/updateTupe?id=${formdata.get(
          "id"
        )}&tupe=${formdata.get("tupe")}`,
        axios.interceptors.request.use(function (config) {
          let token =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmU1OTAyOTQwNjY1OWQ1OGVlMzQ4MTMzOWZkNDlmOThhYzAxMDNjODcyZjgyNzVjNjY2ODc4NThhZDNkZjBjOGFhOGVmZTM4YjJkZmQyZjAiLCJpYXQiOjE2NzMwMjY0ODAuNjE5OTI2LCJuYmYiOjE2NzMwMjY0ODAuNjE5OTI5LCJleHAiOjE3MDQ1NjI0ODAuNjE0MTE0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.alMtvstRFur9U7Ue5bvu2QDE_QVsQBDmw-VW7t7LEOO7feDxspvm77Zt-7Yi9JpWZ1hgOj2xRYF3LkkG4oakLXA2as8JwAxU7cTrD1jOoVdHsQTL2qwMj63hYKi9TwYw-JqAWB5F9aoULfW9MlCgOAkUIFvlZAIHuPAjwEhDKvFQhpQbpWAAs3MswitX0s8XR6roWEooTAi6ITWulnnOKComQTRnYxPh_ziy8iJUovjzW2sZ6TWY7nJdu1mjtYUaBRF0qlLCUEpv8EAu7-z4r3vNTIhFSp5jjtbWX3Cc_0SphfxApim1wCVPRJ6Ba2oI9DWf8MvILHKCxICRyybH4R5rCe64PkZqItY2ft9_K1TypWs-xiULh1-5-_Bg6Ris9sEdP7x-zQy4bxv0ioD1XO9sFT8a9btQdMGkReXDaXzcbIQxrWl_T1BA-XPAg9mNrZY6buhJPPw_CqbPzyZ7ZaQiFReVJBMCoH3BBApdKG4XXUnGlsjidPeyaC2s1ibUBYlwrQUpm6hnvMxNJivyH8IZ76hRSsc8_LDfRKcZ3rzb5UOxm27TjJaL1A1U6xsUwXRfFhW1C4oj1ASaSnk68h-pfvpZqn_fctEl9veSEx_4-Is2Wnw9h4mSS3KRynGgLmqp_jj7dQojFkrQxgsVkfNYkgYkDlCIh4FG6Y2tLqM";
          config.headers.Authorization = token ? `Bearer ${token}` : "";
          return config;
        })
      )
      .then((response) => {
        let content = LabSelector.map((item) => {
          return item.id == id
            ? { id: id, tupe: document.getElementById("tupeName").value }
            : item;
        });
        dispatch(addAllDBLab(content));
      });
  };

  function close() {
    setOpen(false);
  }

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
                <Dialog.Panel className="relative px-10 pb-8 bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-2 sm:max-w-xl sm:w-full ">
                  <div className="bg-white ">
                    <div className="w-full flex  h-full items-center mt-5">
                      <p className="  justify-center font-Poppins-SemiBold flex flex-grow text-lg ml-10">
                        Show Lab
                      </p>
                      <IoIosClose
                        className=" text-4xl  text-black border-[1px] rounded-full cursor-pointer bg-[#E4E7EC] "
                        onClick={() => close()}
                      />
                    </div>

                    <div className="flex flex-col space-y-5 w-full m-auto mt-10">
                      <div className={` space-y-5 flex-col `}>
                        <img
                          src={selected?.src}
                          className="w-40 h-40 rounded-full mx-auto"
                        />
                        <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                          <input
                            disabled
                            id="LabName"
                            placeholder={selected?.lab_name}
                            type="text"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#98A2B3] outline-0 ring-0"
                          />
                        </div>
                        <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                          <input
                            disabled
                            id="OwnerName"
                            placeholder={selected?.name}
                            type="tel"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#908F8F] outline-0 ring-0"
                          />
                        </div>
                        <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                          <input
                            disabled
                            id="email"
                            placeholder={selected?.email}
                            type="email"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#908F8F] outline-0 ring-0"
                          />
                        </div>
                        <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                          <input
                            disabled
                            id="PhoneNumber"
                            placeholder={selected?.phone}
                            type="tel"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#908F8F] outline-0 ring-0"
                          />
                        </div>

                        <div className="w-full break-words border-[#E4E7EC] h-fit bg-[#F9FAFF] flex space-x-2 items-center py-4 px-4    relative m-auto border-[1px] rounded-xl ">
                          <input
                            disabled
                            id="Address"
                            placeholder={selected?.address}
                            type="text"
                            className="w-full bg-[#F9FAFF] font-Poppins-Medium text-xs placeholder:text-[#908F8F] outline-0 ring-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white  py-3  flex sm:flex-row-reverse justify-between mt-10">
                    <button
                      type="button"
                      className="flex flex-grow font-medium text-sm py-3 bg-[#B7C835] justify-center rounded-xl text-white"
                      onClick={() => Edit()}
                    >
                      Edit Lab
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

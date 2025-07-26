import React, { useRef, useEffect } from "react";

function loader({ openLoader }) {
  const refLoader = useRef(null);

  useEffect(() => {
    if (openLoader) {
      refLoader.current?.showModal();
    } else {
      refLoader.current?.close();
    }
  }, [openLoader]);
  return (
    <>
      <div className="">
        <dialog ref={refLoader} id="my_modal_1" className="modal">
          <div className="modal-box   w-[12rem]">
            <h3 className=" font-semibold text-lg text-center">
              Please Wait...
            </h3>
            <div className="py-4 flex items-center justify-center flex-col gap-2">
              <span className="loading loading-ring loading-xl"></span>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}

export default loader;

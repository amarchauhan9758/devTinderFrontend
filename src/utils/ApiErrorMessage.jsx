import React, { useEffect, useRef } from "react";

function ApiErrorMessage({ setOpenApiModel, openApiModel, errorMessage }) {
  const refLoader = useRef();

  useEffect(() => {
    if (openApiModel) {
      refLoader.current?.showModal();
    } else {
      refLoader.current?.close();
    }
  }, [openApiModel]);
  return (
    <div className="">
      <dialog ref={refLoader} id="my_modal_1" className="modal">
        <div className="modal-box w-[20rem]  h-auto ">
          <h3 className=" font-semibold text-lg text-center">{errorMessage}</h3>
          <div className="text-right">
            <button
              className="btn-error"
              onClick={() => setOpenApiModel(false)}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ApiErrorMessage;

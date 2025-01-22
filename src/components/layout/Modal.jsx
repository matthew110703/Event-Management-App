import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const portal = document.getElementById("modal");
  return createPortal(children, portal);
};

const Modal = ({ children }) => {
  return (
    <Portal>
      <div className="absolute inset-0 m-0 flex items-center justify-center bg-black bg-opacity-50 p-0">
        <main>{children}</main>
      </div>
    </Portal>
  );
};

export default Modal;

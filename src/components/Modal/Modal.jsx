import React from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

const modalWindow = document.querySelector("#modals");

const Modal = ({ onClose, children }) => {
  React.useEffect(() => {
    function closeOnEscape(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }

    function closeOnClick(evt) {
      if (evt.target.id === "overlay") {
        onClose();
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("click", closeOnClick);
    return () => {
      document.removeEventListener("click", closeOnClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);
  return createPortal(
    <>
      <div className={styles.modal}>
        <button className={styles.close}>
          <CloseIcon onClick={onClose} />
        </button>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalWindow
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Modal;

import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal";

const AddChannel = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <React.Fragment>
      <button onClick={openModal}>+</button>
      <Modal open={modalOpen} close={closeModal} header="채널 생성">
        <main> {props.children} </main>
      </Modal>
    </React.Fragment>
  );
};

export default AddChannel;

import React, { useState } from "react";
import { Modal } from "antd";

export default function CreatePost() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={toggleModal}>Create Post</button>
      <Modal footer={null} open={isModalOpen} closable onClose={toggleModal}>
        <p>{/* TODO: implement a form for creating a new POST */}</p>
      </Modal>
    </>
  );
}

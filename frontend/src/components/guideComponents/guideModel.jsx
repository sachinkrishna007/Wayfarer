import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Input, } from "mdb-react-ui-kit";

const AddItemModal = ({ isOpen, onClose, onSubmit }) => {
  const [newItem, setNewItem] = useState("");

  const handleInputChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(newItem);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>Add Item</ModalHeader>
      <ModalBody>
        <form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            label="New Item"
            value={newItem}
            onChange={handleInputChange}
          />
          <Button type="submit" color="primary">
            Add
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default AddItemModal;

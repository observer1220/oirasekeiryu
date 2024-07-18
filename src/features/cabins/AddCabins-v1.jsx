import { useState } from "react";
import { Button, Modal } from "../../components/common";
import CreateCabinForm from "./CreateCabinForm";

function AddCabins() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default AddCabins;

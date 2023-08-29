import { useModal } from "../../context/Modal";

const ReserveModal = () => {
  const { closeModal } = useModal();

  return (
    <>
      <h2>Feature Coming Soon...</h2>
      <button onClick={closeModal}>Exit</button>
    </>
  );
};

export default ReserveModal;

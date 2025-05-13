import ModalLayout from "./_ModalLayout";

type Props = {
  onClose: () => void;
};

const AdminModal = (props: Props) => {
  return (
    <ModalLayout item="start" justify="center" onClose={props.onClose}>
      <div>AdminModal</div>
    </ModalLayout>
  );
};

export default AdminModal;

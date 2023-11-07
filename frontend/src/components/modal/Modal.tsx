import { KeyboardEvent, ReactNode, useEffect, useRef } from 'react';
import styles from './Modal.module.scss';

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
  closeModal: () => void;
  modal: Boolean;
  children: ReactNode;
}

const Modal = ({ modal, closeModal, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (modal) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [modal]);

  const handleEscape = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  const dialog: JSX.Element | null = modal ? (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      onKeyDown={(e) => handleEscape(e)}
    >
      {children}
    </dialog>
  ) : null;

  return dialog;
};
export default Modal;

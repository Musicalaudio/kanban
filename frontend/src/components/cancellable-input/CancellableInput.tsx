import { useRef } from 'react';
import cross from '../../../assets/icon-cross.svg';
import styles from './CancellableInput.module.scss';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  index: number;
  inputList: Array<any>;
  setInputList: Function;
}

const CancellableInput = ({
  name,
  index,
  inputList,
  setInputList,
}: InputProps) => {
  const inputRef = useRef<HTMLDivElement | null>(null);

  const cancelInput = () => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  return (
    <div className={styles.input} ref={inputRef}>
      <input name={name} placeholder="eg. Doing" required />
      <img src={cross} alt="cross to delete this line" onClick={cancelInput} />
    </div>
  );
};

export default CancellableInput;

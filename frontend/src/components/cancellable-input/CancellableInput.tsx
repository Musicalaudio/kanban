import { useRef } from 'react';
import cross from '../../../assets/icon-cross.svg';
import styles from './CancellableInput.module.scss';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  index: number;
  inputList: Array<any>;
  setInputList?: any;
  existingColumnName?: any;
  columnID: string;
  cancelInput?: Function;
  board?: any;
  state?: any;
  dispatch?: React.Dispatch<any>;
}

const CancellableInput = ({
  index,
  inputList,
  setInputList,
  columnID,
  board,
  state,
  dispatch,
  ...attributes
}: InputProps) => {
  const inputRef = useRef<HTMLDivElement | null>(null);

  const deleteCol = (index: number) => {
    let copy = [...inputList];
    copy.splice(index, 1);
    console.log(inputList);

    setInputList(copy);
  };

  const updateColName = (index: number, name: string) => {
    let copy = [...inputList];
    copy[index].name = name;
    setInputList(copy);
  };

  return (
    <div className={styles.input} ref={inputRef}>
      <input
        placeholder="eg. Doing"
        {...attributes}
        onChange={(e) => updateColName(index, e.target.value)}
        required
      />
      <img
        src={cross}
        alt="cross to delete this line"
        onClick={() => deleteCol(index)}
      />
      <input
        name={`inputID-${index}`}
        defaultValue={columnID}
        required
        hidden
      />
    </div>
  );
};

export default CancellableInput;

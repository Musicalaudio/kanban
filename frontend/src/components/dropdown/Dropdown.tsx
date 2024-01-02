import { ReactNode, useEffect, useRef } from 'react';
import styles from './Dropdown.module.scss';
interface DropdownInterface extends React.ComponentPropsWithoutRef<'div'> {
  openDropdown: Boolean;
  setDropdown: Function;
  children: ReactNode;
}

const Dropdown = ({
  openDropdown,
  setDropdown,
  children,
}: DropdownInterface) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let handler = (e: any) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setDropdown(false);
        console.log(dropdownRef.current);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    openDropdown && (
      <div
        className={`${styles['dropdown-menu']} dropdown-menu`}
        ref={dropdownRef}
      >
        {children}
      </div>
    )
  );
};

export default Dropdown;

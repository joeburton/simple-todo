import styles from './SelectMenu.module.css';

type OptionValue = string | number;

type Option<T extends OptionValue> = {
  value: T;
  label: string;
};

type Props<T extends OptionValue> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  styles?: React.CSSProperties;
};

const SelectMenu = <T extends OptionValue>(props: Props<T>) => {
  function handleOnChange(e: React.FormEvent<HTMLSelectElement>) {
    const { selectedIndex } = e.currentTarget;
    const selectedOption = props.options[selectedIndex];
    props.onChange(selectedOption.value);
  }
  return (
    <select
      value={props.value}
      onChange={handleOnChange}
      className={styles.selectMenu}
      style={props.styles}
    >
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
export default SelectMenu;

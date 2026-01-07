'use client'

export type FontSizeControlProps = {
    value: number;
    defaultValue: number;
    onChange: (newValue: number) => void;
};

const FontSizeControl = ({
    value = 30,
    defaultValue = 30,
    onChange = () => {},
}: FontSizeControlProps) => {
  return (
    <select
      value={value || defaultValue}
      onChange={(e) => onChange(Number(e.target.value))}
      className="px-2 py-1 rounded-md border-2 border-cyan-700 focus:border-pink-700 focus:outline-none"
    >
      {[20, 30, 40, 50, 60].map((size) => (
        <option key={size} value={size}>
          {size}px
        </option>
      ))}
    </select>
  );
};

export default FontSizeControl;

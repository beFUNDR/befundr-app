type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 accent-accent border-custom-gray-800 rounded-full"
      />
      <label htmlFor="onlyPaidMissions">{label}</label>
    </div>
  );
};

export default Checkbox;

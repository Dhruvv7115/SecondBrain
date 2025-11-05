interface InputProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  fullWidth?: boolean;
  label?: string;
  id?: string;
  name?: string;
}

export default function Input({
                                placeholder,
                                type,
                                value,
                                onChange,
                                className = "",
                                fullWidth,
                                label,
                                id,
                                name,
                              }: InputProps) {
  return (
    <div className={`flex flex-col gap-2 ${fullWidth && "w-full"}`}>
      {label && <label htmlFor={id} className="px-2 text-neutral-600 text-sm">{label}</label>}
      <input
        id={id ? id : placeholder}
        name={name ? name : placeholder}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
        className={`px-4 py-2 border border-neutral-300 focus:outline-0 focus:ring-3 ring-indigo-600/30 rounded-lg ${className}`}
      ></input>
    </div>
  );
}

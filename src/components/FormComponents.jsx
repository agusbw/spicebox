const variants = {
  primary: "bg-base-200",
  secondary: "bg-base-100",
};

const TextInput = ({
  label,
  name,
  type,
  register,
  className,
  variant = "primary",
  ...rest
}) => {
  return (
    <>
      <label
        className="label text-base label-text font-semibold"
        htmlFor={name}
      >
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        className={`${className} w-full input outline-none outline-offset-0 focus:outline-offset-0 hover:outline hover:outline-4 ease-in-out transition-all duration-100 hover:outline-red-200 hover:bg-white hover:border hover:border-gray-300 focus:border-red-300 focus:bg-white focus:outline-red-200 focus:outline-4 active:outline-0 ${variants[variant]}`}
        name={name}
        {...register}
        {...rest}
      />
    </>
  );
};

const Select = ({
  className,
  children,
  register,
  variant = "primary",
  ...rest
}) => {
  return (
    <select
      className={`${className} select outline-none outline-offset-0 focus:outline-offset-0 hover:outline hover:outline-4 ease-in-out transition-all duration-100 hover:outline-red-200 hover:bg-white hover:border hover:border-gray-300 focus:border-red-300 focus:bg-white focus:outline-red-200 focus:outline-4 active:outline-0 ${variants[variant]}`}
      {...rest}
      {...register}
    >
      {children}
    </select>
  );
};

export { TextInput, Select };

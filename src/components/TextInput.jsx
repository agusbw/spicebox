const TextInput = ({ label, name, type, register, className, ...rest }) => {
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
        className={`${className} w-full input bg-base-200 outline-none outline-offset-0 focus:outline-offset-0 hover:outline hover:outline-4 ease-in-out transition-all duration-100 hover:outline-red-200 hover:bg-white hover:border hover:border-gray-300 focus:border-red-300 focus:bg-white focus:outline-red-200 focus:outline-4 active:outline-0`}
        name={name}
        {...register}
        {...rest}
      />
    </>
  );
};

export default TextInput;

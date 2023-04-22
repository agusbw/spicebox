export default function DetailRecipeContainer({ children, className }) {
  return (
    <div className={`${className} rounded-md shadow-md bg-base-100 border`}>
      <div className="p-3">{children}</div>
    </div>
  );
}

export default function InputErrorMessage({ message, textColor = "error" }) {
  return (
    <div
      className={`${
        textColor !== "error" ? textColor : "text-red-500"
      } text-sm`}
    >
      {message}!
    </div>
  );
}

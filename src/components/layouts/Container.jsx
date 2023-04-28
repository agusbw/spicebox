export default function Container({ children, className }) {
  return <div className={`${className} px-4 lg:px-20 pt-24`}>{children}</div>;
}

import Breadcrumbs from "../Breadcrumbs";
export default function Container({ children, className }) {
  return (
    <div className={`${className} px-4 lg:px-20 pb-10 pt-20`}>
      <Breadcrumbs />
      {children}
    </div>
  );
}

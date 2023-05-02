import React from "react";

export default function CollapsibleList({
  children,
  title,
  variant = "primary",
}) {
  const [showList, setShowList] = React.useState(true);

  const handleDisplayList = () => {
    setShowList(!showList);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDisplayList}
          className={`${
            variant === "primary"
              ? "bg-primary hover:bg-primary-focus"
              : "bg-secondary hover:bg-secondary-focus"
          }   font-bold text-2xl text-white w-8 h-8 btn-circle rounded-full`}
        >
          {showList ? "-" : "+"}
        </button>
        <h2
          className={`text-2xl ${
            variant === "primary" ? "text-primary" : "text-secondary"
          } font-oswald`}
        >
          {title}
        </h2>
      </div>
      <div className="overflow-hidden">
        <ul
          className={`transition-all duration-300 ease-in-out ml-2 list-outside ${
            showList ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
          {children}
        </ul>
      </div>
    </>
  );
}

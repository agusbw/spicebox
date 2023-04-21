export default function PaginationButton({
  totalPages,
  currentPage,
  handlePageChange,
  className,
}) {
  return (
    <div className={`${className} btn-group`}>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`btn ${currentPage === i + 1 && "btn-active"}`}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

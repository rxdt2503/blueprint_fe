import React from "react";
import { IQuestions } from "../../services/api/entities/IIdentityQuestions";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  identityStatement: IQuestions[];
};

export const FrameworkPagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  identityStatement,
}) => {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage > totalPages - 4) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  const isAnswered = (page: number): boolean =>
    identityStatement[page - 1]?.transcript_text ? true : false;

  return (
    <div className="flex items-center gap-2">
      <button
        className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span className="px-2 text-lg text-gray-400">...</span>
          ) : (
            <button
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer focus:outline-none ${
                currentPage === page
                  ? "bg-accentColor text-white"
                  : isAnswered(page as number)
                  ? "bg-green-700 text-white"
                  : "bg-lightgrey text-black"
              }`}
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}
      <button
        className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

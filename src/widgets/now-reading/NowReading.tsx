import React from "react";

export type NowReadingBook = {
  title: string;
  author: string;
  progressPercent: number; // 0~100
};

export type NowReadingProps = {
  book: NowReadingBook;
};

const clamp = (n: number) => Math.max(0, Math.min(100, n));

const NowReading: React.FC<NowReadingProps> = ({ book }) => {
  const p = clamp(book.progressPercent);

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-gray-900">Now Reading</div>
        <div className="text-sm text-gray-500">1권</div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-md rounded-xl bg-gray-50 p-4">
          <div className="flex items-center gap-4">
            {/* book cover */}
            <div className="h-20 w-14 rounded-lg bg-white shadow-sm ring-1 ring-gray-200 flex items-center justify-center text-[11px] text-gray-400">
              cover
            </div>

            {/* book info */}
            <div className="min-w-0 text-center flex-1">
              <div className="font-semibold text-gray-900 truncate">{book.title}</div>
              <div className="text-sm text-gray-500 truncate mt-1">{book.author}</div>

              {/* progress */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>progress</span>
                  <span>{p}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white ring-1 ring-gray-200 overflow-hidden">
                  <div className="h-full bg-gray-900" style={{ width: `${p}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NowReading;
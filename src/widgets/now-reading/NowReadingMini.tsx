import React from "react";
import type { NowReadingBook } from "./NowReading";

export type NowReadingMiniProps = {
  book: NowReadingBook;
};

const clamp = (n: number) => Math.max(0, Math.min(100, n));

const NowReadingMini: React.FC<NowReadingMiniProps> = ({ book }) => {
  const p = clamp(book.progressPercent);

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-gray-900">Now Reading</div>
        <div className="text-sm text-gray-500">1권</div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full rounded-xl bg-gray-50 p-3">
          <div className="flex items-center justify-center gap-3">
            {/* cover */}
            <div className="h-16 w-11 rounded-lg bg-white ring-1 ring-gray-200 shadow-sm flex items-center justify-center text-[10px] text-gray-400">
              cover
            </div>

            {/* info */}
            <div className="min-w-0 text-center">
              <div className="text-sm font-semibold text-gray-900 truncate">{book.title}</div>
              <div className="text-xs text-gray-500 truncate mt-0.5">{book.author}</div>

              {/* progress mini */}
              <div className="mt-2">
                <div className="text-[11px] text-gray-500 mb-1">{p}%</div>
                <div className="h-1.5 w-32 max-w-full rounded-full bg-white ring-1 ring-gray-200 overflow-hidden mx-auto">
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

export default NowReadingMini;
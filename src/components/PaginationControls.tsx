type Props = {
  since: number;
  onFirst: () => void;
  onPrev: () => void;
  onNext: () => void;
  disablePrev: boolean;
};

const PaginationControls = ({
  since,
  onFirst,
  onPrev,
  onNext,
  disablePrev,
}: Props) => {
  return (
    <div className="mt-8 flex justify-center gap-2">
      <button
        onClick={onFirst}
        disabled={since === 0}
        className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
      >
        First
      </button>

      <button
        onClick={onPrev}
        disabled={disablePrev}
        className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
      >
        Previous
      </button>

      <button
        onClick={onNext}
        className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
      >
        Next
      </button>

      <button
        disabled
        className="cursor-not-allowed rounded bg-gray-100 px-4 py-2 text-gray-400"
      >
        Last
      </button>
    </div>
  );
};

export default PaginationControls;

import SearchIcon from "../icons/SearchIcon";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SearchInput = ({ value, onChange }: Props) => {
  return (
    <div className="mb-4 flex justify-center">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search by name or username..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded border py-2 pr-4 pl-10 shadow"
        />
        <SearchIcon className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-500" />
      </div>
    </div>
  );
};

export default SearchInput;

interface InputProps {
  placeholder: string;
  reference?: React.RefObject<HTMLInputElement>;
  className?: string;
}

export function Input({ placeholder, reference, className = "" }: InputProps) {
  return (
    <div className="w-full">
      <input
        ref={reference}
        placeholder={placeholder}
        type="text"
        className={`px-3 sm:px-4 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-1.5 lg:py-2 border-2 border-slate-200 rounded-sm sm:rounded-md md:rounded-md lg:rounded text-xs sm:text-sm md:text-sm lg:text-base w-full focus:outline-none focus:border-blue-500 ${className}`}
      />
    </div>
  );
}
interface InputProps {
    placeholder: string;
    reference?: React.RefObject<HTMLInputElement>; // Type it properly instead of 'any'
    className?: string; // Add className prop
  }
  
  export function Input({ placeholder, reference, className = "" }: InputProps) {
    return (
      <div className="w-full">
        <input
          ref={reference}
          placeholder={placeholder}
          type="text"
          className={`px-5 py-2 border-2 border-slate-200 rounded w-full focus:outline-none focus:border-blue-500 ${className}`}
        />
      </div>
    );
  }
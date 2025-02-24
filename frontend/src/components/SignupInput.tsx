interface SignupInputProps {
    reference: React.RefObject<HTMLInputElement>;
    placeholder: string;
    className?: string; // Add className to the props
}


export function SignupInput({ reference, placeholder, className }: SignupInputProps) {
    return (
        <input
            ref={reference}
            type="text"
            placeholder={placeholder}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7950f2] ${className || ""}`}
        />
    );
}
interface InputProps {
    placeholder : string;
    reference?: any;
}

export function Input({placeholder , reference}: InputProps) {
    return <div>
        <input ref={reference} placeholder={placeholder} type={"text"} className="px-5 py-2 border-2 border-slate-200 rounded"></input>
    </div>
}
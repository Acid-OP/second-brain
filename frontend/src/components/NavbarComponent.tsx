export function NavbarTextComponent({ title }: { title: string }) {
    return (
            <span className=" text-black font-medium text-3xl tracking-tighter">
                {title}
            </span>
    );
}

export function NavbarIconComponent({src , alt}:{src:string ; alt?:string}){
    return(
        <div>
            <div>
            <img src={src} alt={alt || "Icon"} width="50" /> 
            </div>
        </div>
    )
}
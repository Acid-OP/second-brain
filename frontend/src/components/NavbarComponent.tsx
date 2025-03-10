export function NavbarTextComponent({ title }: { title: string }) {
    return (
        <span className="text-black font-semibold tracking-tight 
                        text-lg sm:text-base md:text-2xl lg:text-3xl">
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
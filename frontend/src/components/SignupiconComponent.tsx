export function SignUpIconcomponent({ src, alt, className }: { src: string; alt?: string; className?: string }) {
    return (
        <div className={className}>
            <img src={src} alt={alt || "Icon"} width="100" />
        </div>
    );
}

export function SignUpIconcomponent2({ src, alt, className }: { src: string; alt?: string; className?: string }) {
    return (
        <div className={className}>
            <img src={src} alt={alt || "Icon"} width="300" className="border rounded-lg" />
        </div>
    );
}
export function InputField({className, value, setState}:{className: string, value:any, setState:Function}){
    return(
        <input type="text" className={className} value={value} onChange={(e) => setState(e.currentTarget.value)}/>
    );
}
export const TextError = (props: any) => {
    return (
        <div className="flex justify-center items-center text-center bg-[#E65050]	font-light text-white p-1 text-sm rounded-b-lg">
            {props.children}
        </div>
    )
}
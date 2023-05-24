const SubmitError: React.FC<{error: string}> = ({error}) => {
    return (
        <div className="flex justify-center items-center text-center bg-[#E65050]	font-light text-white p-1 text-sm rounded-lg my-2">
            {error}
        </div>
    )
}

export default SubmitError
import {ButtonContainerProps}  from '@types'

const Button: React.FC<ButtonContainerProps> = ({objects, forGrid}) => {
    const {loading, Spinner, isSaved, AiFillHeart, AiOutlineHeart, handleClick, ptyWaitLoading} = objects;

  return (
    <button className={`flex justify-center items-center bg-primary bg-opacity-50 cursor-pointer transition ease-in-out w-[30px] h-[30px] overflow-hidden rounded-md disabled:bg-opacity-30 ${forGrid ? 'mt-2' : ''}`} onClick={() =>  handleClick()} disabled={ptyWaitLoading}>
        {loading ? <Spinner /> : isSaved ? (
            <AiFillHeart size={20} color='#0847A8' />
        ) : (
            <AiOutlineHeart size={20} color='#fff' />
        )}
    </button>
  )
}
export default Button
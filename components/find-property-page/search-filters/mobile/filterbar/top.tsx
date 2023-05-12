import { useSetRecoilState } from 'recoil'
import { AiOutlineClose } from 'react-icons/ai'
import { layoutState } from '@states'

const Top = () => {
    const closeFilter = useSetRecoilState(layoutState)
    const closeFilterBar = () => {
        closeFilter(others => ({
            ...others,
            isFilterbarOpen: false
          }))
    }

  return (
    <div className='flex text-primary justify-between p-5'>
        <span />
        <p className='font-bold text-lg'>Property Finder</p>

        <AiOutlineClose size={25} onClick={closeFilterBar} />
    </div>
  )
}

export default Top
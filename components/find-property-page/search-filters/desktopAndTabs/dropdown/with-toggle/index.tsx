import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../../../../../../states';
import { IDropdownWithToggleProps } from '../../../../../../types';
import { findProperties } from '../../../mobile';
import Options from './options';

const DropdownWithToggle: React.FC<IDropdownWithToggleProps> = ({ title, tabs, queryName }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [toggle, setToggle] = useState(0);
  const changeTab = (index: number, value: string) => {
    setToggle(index);
    setLoading(loading => ({
      ...loading,
      propertiesLoading: true
    }))

    if(queryName) findProperties({ [queryName]: value }) 
  }

  return (
    <div className='space-y-2 absolute -bottom-[210px] left-0 rounded h-[200px] p-2 bg-white w-full overflow-auto'>
      <h5 className=''> {title} </h5>

      <div className="flex border p-1 rounded">
        { tabs?.map((item, index) => (
            <div onClick={() => changeTab(index, item.value)} key={item.name} className={`filterTab ${toggle === index ? 'filterTabActive' : ''}`}>
                { item.name }
            </div>
        )) }
      </div>

      {/* <Options options={ toggle === 0 ?  : secondTabOptions } />  */}
    </div>
  )
}

export default DropdownWithToggle
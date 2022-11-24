import React from 'react'

const Options = ({options}) => {
  return (
    <div>
      { options.map((option) => {
        const {items, queryName} = option

        return (
          <div className="flex flex-wrap gap-2" key={queryName}>
            { items.map((item) => {
              const {name, value} = item

              return (
                <div key={name} className='py-2 px-4 rounded-full border text-black'>
                    {name}
                </div>
              )
            })}
            </div>
        )
      }) }
      
    </div>
  )
}

export default Options
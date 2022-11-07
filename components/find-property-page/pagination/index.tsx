import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import { useRouter } from "next/router";
import { MdArrowBack, MdArrowForward } from 'react-icons/md';


const Pagination = () => {
    const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
    const router = useRouter();

    const handlePageClick = (data: { selected: number }) => {
        const currentPage = data.selected + 1

        router.push({ pathname: router.pathname, query: { page: currentPage } }); //pathname:path, query:query
    }

    useEffect(() => {
        window.addEventListener('resize', () => setScreenSize(window.innerWidth))
    }, []);

  return (
    <div className="pb-10">
        <ReactPaginate 
            previousLabel={<MdArrowBack />}
            nextLabel={<MdArrowForward />}
            breakLabel={'···'}
            pageCount={200}
            marginPagesDisplayed={screenSize && screenSize < 600 ? 3 : screenSize && screenSize < 400 ? 2 : 5}
            pageRangeDisplayed={0}
            onPageChange={handlePageClick}
            containerClassName={`flex justify-center space-x-2 border p-3 select-none`}
            pageClassName={'pagination'}
            previousClassName={'pagination'}
            nextClassName={'pagination'}
            breakClassName={'pagination leading-[3px] text-lg font-bold'}
            activeClassName={'bg-primary text-white'}
            disableInitialCallback={false}
            disabledClassName={'hidden'}
        />
    </div>
  )
}

export default Pagination
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import { useRouter } from "next/router";
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { PaginationProps } from '../../../types';

const Pagination: React.FC<PaginationProps> = ({pageCount}) => {
    const router = useRouter();
    const activePage = router.query.page ? parseInt(router.query.page.toString()) - 1 : 0;
    
    const [screenSize, setScreenSize] = useState<number>(0);

    const handlePageClick = (data: { selected: number }) => {
        const currentPage = data.selected + 1
        router.push({ pathname: router.pathname, query: { ...router.query, page: currentPage } }); //pathname:path, query:query
    }

    useEffect(() => {
        function updateSize() {
            setScreenSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

  return (
    <div className='pb-10'>
        <ReactPaginate 
            previousLabel={<MdArrowBack />}
            nextLabel={<MdArrowForward />}
            breakLabel={'···'}
            pageCount={pageCount ? Math.ceil(pageCount/100) : 20}
            marginPagesDisplayed={screenSize < 450 ? 1 : screenSize < 550 ? 2 : screenSize < 768 ? 3 : 5}
            pageRangeDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName={`flex justify-center space-x-2 w-full border p-3 select-none overflow-auto`}
            pageClassName={'pagination'}
            previousClassName={'pagination'}
            nextClassName={'pagination'}
            breakClassName={'pagination leading-[3px] text-lg font-bold'}
            activeClassName={'bg-primary text-white'}
            disableInitialCallback={false}
            disabledClassName={'hidden'}
            forcePage={activePage}
        />
    </div>
  )
}

export default Pagination
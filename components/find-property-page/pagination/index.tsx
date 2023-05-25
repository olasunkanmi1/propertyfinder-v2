import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { useRecoilValue } from 'recoil';
import ReactPaginate from 'react-paginate';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { PaginationProps } from '@types';
import { propertiesState, loadingState } from '@states';

const Pagination: React.FC<PaginationProps> = ({pageCount}) => {
    const [screenSize, setScreenSize] = useState<number>(0);
    const properties = useRecoilValue(propertiesState);
    const loading = useRecoilValue(loadingState);
    const router = useRouter();
    
    const activePage = router.query.page ? parseInt(router.query.page.toString()) - 1 : 0;    

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
    <>
        {properties.properties && properties.properties.length >= 1 && !loading.propertiesLoading && (
            <div>
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
        )}
    </>
  )
}

export default Pagination
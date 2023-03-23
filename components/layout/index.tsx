import React from 'react'
import Head from 'next/head'
import Navbar from './navbar'
import Footer from './footer'
import { LayoutProps } from '../../types'
import { useRecoilState, useRecoilValue } from 'recoil'
import { loadingState, navbarState } from '../../states'
import Sidebar from './sidebar'
import Filterbar from '../find-property-page/search-filters/mobile/filterbar'
import RouteChangeLoader from './route-change-loader'
import SignInModal from './sign-in-register/sign-in'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const [open, setOpen] = useRecoilState(navbarState);
  const {isSidebarOpen, profileDropdown, isFilterbarOpen, signInModal} = open;
  const loading = useRecoilValue(loadingState);

  const toggleSidebarAndDropdown = () => {
    if(isSidebarOpen || profileDropdown || isFilterbarOpen || signInModal) {
      setOpen({
        isSidebarOpen: false,
        profileDropdown: false,
        isFilterbarOpen: false,
        signInModal: false,
      })
    }
  }

  return (
    <div className="bg-[#fefefe] w-full">
      <Head>
          <title>{`${title} - PropertyFinder`}</title>
          <meta name="desciption" content="Find your dream property" />
      </Head>

      <div onClick={toggleSidebarAndDropdown} className={`w-full xl:max-w-6xl m-auto px-4 sm:px-8 xl:px-0 min-h-screen space-y-10 ${isSidebarOpen || isFilterbarOpen ? 'touch-none' : ''}`}>
          <Navbar />

          <div className={`space-y-10 ${open.signInModal ? 'blur-sm' : ''}`}>
            { children }
          </div>
      </div>
      <Footer />

      <Sidebar />
      <Filterbar />
      <SignInModal />
      {/* {loading.routeChangeLoading && <RouteChangeLoader /> } */}


      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
      />
    </div>
  )
}

export default Layout
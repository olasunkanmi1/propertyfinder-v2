import React, {useEffect} from 'react';
import Head from 'next/head'
import Navbar from './navbar'
import Footer from './footer'
import { LayoutProps } from '../../types'
import { useRecoilState, useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil'
import { loadingState, navbarState, userState } from '../../states'
import Sidebar from './sidebar'
import Filterbar from '../find-property-page/search-filters/mobile/filterbar'
import RouteChangeLoader from './route-change-loader'
import SignInModal from './sign-in-register/sign-in'
import SignUpModal from './sign-in-register/sign-up'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const open = useRecoilValue(navbarState);
  const setUser = useSetRecoilState(userState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const closeALll = useResetRecoilState(navbarState);

  const {isSidebarOpen, profileDropdown, isFilterbarOpen, signInModal, signUpModal} = open;

  const toggleSidebarAndDropdown = () => {
    if(isSidebarOpen || profileDropdown || isFilterbarOpen || signInModal || signUpModal) {
      closeALll();
    }
  }

  useEffect(() => {
    axios.get('user', { withCredentials: true  })
    .then(({data}) => {
      setUser(data.user)
      setLoading(loading => ({...loading, userLoading: false}));
    }).catch((err) => {
      setUser(null)
      setLoading(loading => ({...loading, userLoading: false}));
    })
  }, [setUser, setLoading])
  

  return (
    <div className="bg-[#fefefe] w-full">
      <Head>
          <title>{`${title} - PropertyFinder`}</title>
          <meta name="desciption" content="Find your dream property" />
      </Head>

      <div onClick={toggleSidebarAndDropdown} className={`w-full xl:max-w-6xl m-auto px-4 sm:px-8 xl:px-0 min-h-screen space-y-10 ${isSidebarOpen || isFilterbarOpen ? 'touch-none' : ''}`}>
          <Navbar/>

          <div className={`space-y-10 ${open.signInModal || open.signUpModal ? 'blur-sm' : ''}`}>
            { children }
          </div>
      </div>
      <Footer />

      <Sidebar />
      <Filterbar />
      <SignInModal />
      <SignUpModal />
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
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
import { SignInModal, SignUpModal, ForgotPasswordModal, ForgotPasswordEmailSentModal, VerifyEmailSentModal, EditProfileModal, ChangePasswordModal } from './modals'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {fetchUser} from '../../utils/fetchFns'

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const setUser = useSetRecoilState(userState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [modal, setModal] = useRecoilState(navbarState);
  const closeALll = useResetRecoilState(navbarState);

  const {isSidebarOpen, profileDropdown, isFilterbarOpen, signInModal, signUpModal, forgotPasswordModal, forgotPasswordMailSent, verifyEmailMailSent, editProfileModal, changePasswordModal } = modal;
  const modals = signInModal || signUpModal || forgotPasswordModal || forgotPasswordMailSent || verifyEmailMailSent || editProfileModal || changePasswordModal

  const toggleSidebarAndDropdown = () => {
    if(isSidebarOpen || profileDropdown || isFilterbarOpen || signInModal || signUpModal || forgotPasswordModal || forgotPasswordMailSent || verifyEmailMailSent || editProfileModal || changePasswordModal) {
      closeALll();
    }
  }

  useEffect(() => {
    async function getUser() {
      const user = await fetchUser();
      setUser(user)
      setLoading(loading => ({...loading, userLoading: false}));
    }
    
    getUser();
  }, [setUser, setLoading])
  
  return (
    <div className="bg-[#fefefe] w-full">
      <Head>
          <title>{`${title} - PropertyFinder`}</title>
          <meta name="desciption" content="Find your dream property" />
      </Head>

      <div onClick={toggleSidebarAndDropdown} className={`w-full xl:max-w-6xl m-auto px-4 sm:px-8 xl:px-0 min-h-screen space-y-10 ${isSidebarOpen || isFilterbarOpen ? 'touch-none' : ''}`}>
          <Navbar/>

          <div className={`space-y-10 ${modals ? 'blur-sm' : ''}`}>
            { children }
          </div>
      </div>
      <Footer />

      <Sidebar />
      <Filterbar />
      <SignInModal />
      <SignUpModal />
      <ForgotPasswordModal />
      <ForgotPasswordEmailSentModal />
      <VerifyEmailSentModal />
      <EditProfileModal />
      <ChangePasswordModal />
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
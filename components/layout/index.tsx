import {useEffect} from 'react';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { LayoutProps } from '../../types'
import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil'
import { loadingState, navbarState, userState } from '../../states'
import { SignInModal, SignUpModal, ForgotPasswordModal, ForgotPasswordEmailSentModal, VerifyEmailSentModal, EditProfileModal, ChangePasswordModal, ClearSavedPropertiesModal } from './modals';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {fetchUser} from '../../utils/fetchFns';
const Navbar = dynamic(() => import('./navbar'));
const Footer = dynamic(() => import('./footer'));
const Sidebar = dynamic(() => import('./sidebar'));
const RouteChangeLoader = dynamic(() => import('./route-change-loader'));
const Filterbar = dynamic(() => import('../find-property-page/search-filters/mobile/filterbar'));
const ImageModal = dynamic(() => import('../unique-property/image-modal'));

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const [loading, setLoading] = useRecoilState(loadingState);
  const modal = useRecoilValue(navbarState);
  const setUser = useSetRecoilState(userState);
  const closeALll = useResetRecoilState(navbarState);

  const {isSidebarOpen, profileDropdown, isFilterbarOpen, signInModal, signUpModal, forgotPasswordModal, forgotPasswordMailSent, verifyEmailMailSent, editProfileModal, changePasswordModal, clearConfirmationModal, imageModal } = modal;
  const modals = signInModal || signUpModal || isFilterbarOpen || forgotPasswordModal || forgotPasswordMailSent || verifyEmailMailSent || editProfileModal || changePasswordModal || clearConfirmationModal || imageModal

  const toggleSidebarAndDropdown = () => {
    if(isSidebarOpen || profileDropdown || isFilterbarOpen || signInModal || signUpModal || forgotPasswordModal || forgotPasswordMailSent || verifyEmailMailSent || editProfileModal || changePasswordModal || clearConfirmationModal || imageModal) closeALll()
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

      <div onClick={toggleSidebarAndDropdown} className={`w-full xl:max-w-6xl m-auto px-3 sm:px-8 xl:px-0 min-h-[calc(100vh-250px)] ft:min-h-[calc(100vh-195px)] ft2:min-h-[calc(100vh-160px)] md:min-h-[calc(100vh-120px)] space-y-10 ${isSidebarOpen || isFilterbarOpen ? 'touch-none' : ''}`}>
          <Navbar/>
          <div className={`space-y-10 ${modals ? 'blur-sm' : ''}`}> { children } </div>
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
      <ClearSavedPropertiesModal />
      <ImageModal />
      {/* {loading.routeChangeLoading && <RouteChangeLoader /> } */}

      <ToastContainer position="bottom-center" autoClose={4000} hideProgressBar={false} closeOnClick />
    </div>
  )
}

export default Layout
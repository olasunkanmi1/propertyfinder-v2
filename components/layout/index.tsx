import {useEffect} from 'react';
import Head from 'next/head'
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil'
import Navbar from './navbar';
import Footer from './footer';
import { SignInModal, SignUpModal, ForgotPasswordModal, ForgotPasswordEmailSentModal, VerifyEmailSentModal, EditProfileModal, ChangePasswordModal, ClearSavedPropertiesModal } from './modals';
import CustomNotification from '../custom-notification';
import Dropdown from './navbar/profile/dropdown'
import Sidebar from './sidebar'
import Filterbar from '../find-property-page/search-filters/mobile/filterbar'
import ImageModal from '../unique-property/image-modal'
import { loadingState, layoutState, userState } from '@states'
import { LayoutProps } from '@types'
import {fetchUser} from '@utils';

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const modal = useRecoilValue(layoutState);
  const setLoading = useSetRecoilState(loadingState);
  const setUser = useSetRecoilState(userState);
  const closeALll = useResetRecoilState(layoutState);
  
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

      <Dropdown />
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
      <CustomNotification />
    </div>
  )
}

export default Layout
import React from 'react'
import Head from 'next/head'
import Navbar from './navbar'
import Footer from './footer'
import { LayoutProps } from '../../types'
import { useRecoilState } from 'recoil'
import { navbarState } from '../../states'
import Sidebar from './sidebar'
import Filterbar from '../find-property-page/search-filters/mobile/filterbar'

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const [open, setOpen] = useRecoilState(navbarState);
  const {isSidebarOpen, profileDropdown, isFilterbarOpen} = open;

  const toggleSidebarAndDropdown = () => {
    if(isSidebarOpen || profileDropdown || isFilterbarOpen) {
      setOpen({
        isSidebarOpen: false,
        profileDropdown: false,
        isFilterbarOpen: false
      })
    }
  }

  return (
    <div className="bg-[#fefefe] w-full">
      <Head>
          <title>{`${title} - PropertyFinder`}</title>
          <meta name="desciption" content="Find your dream property" />
      </Head>

      <div onClick={toggleSidebarAndDropdown} className={`w-full xl:max-w-6xl m-auto px-4 sm:px-8 xl:px-0 min-h-screen space-y-10 ${isSidebarOpen || isFilterbarOpen && 'touch-none'}`}>
          <Navbar />
          { children }
      </div>
      <Footer />

      <Sidebar />
      <Filterbar />
    </div>
  )
}

export default Layout
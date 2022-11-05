import React from 'react'
import Head from 'next/head'
import Navbar from './navbar'
import Footer from './footer'
import { LayoutProps } from '../../types'
import { useRecoilState } from 'recoil'
import { navbarState } from '../../states/navbarAtom'
import Sidebar from './sidebar'

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const [open, setOpen] = useRecoilState(navbarState);
  const {isSidebarOpen, profileDropdown} = open;

  const toggleSidebarAndDropdown = () => {
    if(isSidebarOpen || profileDropdown) {
      setOpen({
        isSidebarOpen: false,
        profileDropdown: false
      })
    }
  }

  return (
    <div onClick={toggleSidebarAndDropdown} className="bg-[#fefefe] w-full">
      <Head>
          <title> { title ? `${title} - PropertyFinder` : 'PropertyFinder' } </title>
          <meta name="desciption" content="Find your dream property" />
      </Head>

      <div className="w-full xl:max-w-6xl m-auto px-4 sm:px-8 xl:px-0 min-h-screen space-y-10">
          <Navbar />
          { children }
      </div>
      <Footer />

      <Sidebar />
    </div>
  )
}

export default Layout
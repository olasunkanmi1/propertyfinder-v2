import React from 'react'
import Head from 'next/head'
import Navbar from './navbar'
import Footer from './footer'
import { LayoutProps } from '../../types'
import { useRecoilState } from 'recoil'
import { dropdownState } from '../../states/dropdownAtom'

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const [dropdownOpen, setDropdownOpen] = useRecoilState(dropdownState);
  const closeDropDown = () => {
    if(dropdownOpen) {
      setDropdownOpen(false)
    }
  }

  return (
    <div onClick={closeDropDown} className="bg-[#fefefe] w-full">
      <Head>
          <title> { title ? `${title} - PropertyFinder` : 'PropertyFinder' } </title>
          <meta name="desciption" content="Find your dream property" />
      </Head>

      <div className="w-full xl:max-w-6xl m-auto px-4 sm:px-8 overflow-hidden min-h-screen space-y-10 mt-[60px] space-y-">
          <Navbar />
          { children }
      </div>
      <Footer />
    </div>
  )
}

export default Layout
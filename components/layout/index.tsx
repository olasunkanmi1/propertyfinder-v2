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
    <div onClick={closeDropDown} className="bg-[#fefefe]">
      <Head>
          <title> { title ? `${title} - PropertyFinder` : 'PropertyFinder' } </title>
          <meta name="desciption" content="Find your dream property" />
      </Head>

      <div className="max-w-6xl m-auto overflow-hidden min-h-screen space-y-10 mt-[100px]">
          <Navbar />
          { children }
      </div>
      <Footer />
    </div>
  )
}

export default Layout
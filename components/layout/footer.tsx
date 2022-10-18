import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/assets/logo.png'
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { FiInstagram } from 'react-icons/fi'
import { AiOutlineMail } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className=" bg-primary ">
      <div className="xl:max-w-6xl mx-auto flex flex-col py-4 text-white space-y-6 overflow-hidden">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            {/* <Image src={Logo} alt="logo" width={180} height={70} /> */}
            <Link href="/" passHref>
              <a className="footer_links"> ABOUT US </a>
            </Link>
            
            <Link href="/" passHref>
              <a className="footer_links"> CAREERS </a>
            </Link>
            
            <Link href="/" passHref>
              <a className="footer_links"> CONTACT US </a>
            </Link>
            
            <Link href="/" passHref>
              <a className="footer_links"> TERMS & PRIVACY POLICY </a>
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link href="/" passHref>
              <a className="footer_social_links">
                <AiOutlineMail size={25} />
              </a>
            </Link>

            <Link href="/" passHref>
              <a className="footer_social_links">
                <FaLinkedinIn size={25} />
              </a>
            </Link>

            <Link href="/" passHref>
              <a className="footer_social_links">
                <FaFacebookF size={25} />
              </a>
            </Link>

            <Link href="/" passHref>
              <a className="footer_social_links">
                <FaWhatsapp size={25} />
              </a>
            </Link>

            <Link href="/" passHref>
              <a className="footer_social_links">
                <FiInstagram size={25} />
              </a>
            </Link>

          </div>
        </div>

        <p className="items-center mx-auto"> © 2021 PropertyFinder, Inc. </p>
      </div>
    </footer>
  )
}

export default Footer
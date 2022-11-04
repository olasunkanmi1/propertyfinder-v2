import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/assets/logo.png'
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { FiInstagram, FiPhoneCall } from 'react-icons/fi'
import { AiOutlineMail } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className="bg-primary">
      <div className="xl:max-w-6xl m-auto px-4 sm:px-8 xl:px-0 flex flex-col py-4 text-white space-y-6 overflow-hidden">
        <div className="space-y-5 md:space-y-0 md:flex justify-between items-center">
          <div className="flex flex-wrap items-center gap-[15px] ls:gap-0 ls:space-x-6 justify-between xls:justify-start">
            <Link href="/" passHref>
              <a className="footer_links"> ABOUT US </a>
            </Link>
            
            <Link href="/" passHref>
              <a className="footer_links"> CAREERS </a>
            </Link>
            
            <Link href="/" passHref>
              <a className="footer_links"> TERMS & PRIVACY POLICY </a>
            </Link>
          </div>

          <div className="flex flex-wrap gap-[15px] ls:gap-0 ls:space-x-4 justify-evenly xls:justify-end">
            <Link href="/" passHref>
              <a className="footer_social_links">
                <FiPhoneCall size={25} />
              </a>
            </Link>

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
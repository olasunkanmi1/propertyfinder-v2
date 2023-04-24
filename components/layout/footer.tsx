import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { FiInstagram, FiPhoneCall } from 'react-icons/fi'
import { AiOutlineMail } from 'react-icons/ai'

const Footer = () => {
  const linkArr = ['ABOUT US', 'CAREERS', 'TERMS & PRIVACY POLICY'];
  const contactArr = [{icon: <FiPhoneCall size={25} />}, {icon: <AiOutlineMail size={25} />}, {icon: <FaLinkedinIn size={25} />}, {icon: <FaFacebookF size={25} />}, {icon: <FaWhatsapp size={25} />}, {icon: <FiInstagram size={25} />}];

  return (
    <footer className="bg-primary">
      <div className="xl:max-w-6xl m-auto px-4 sm:px-8 xl:px-0 flex flex-col py-4 text-white space-y-6 overflow-hidden">
        <div className="space-y-5 md:space-y-0 md:flex justify-between items-center">
          <div className="flex flex-wrap items-center gap-[15px] ls:gap-0 ls:space-x-6 justify-between xls:justify-start">
            {linkArr.map((link, i) => {
              return (
                <div key={i} className='footer_links'> {link} </div>
              )
            })}
          </div>

          <div className="flex flex-wrap gap-[15px] ls:gap-0 ls:space-x-4 justify-evenly xls:justify-end">
            {contactArr.map((ct, i) => {
              return (
                <div key={i} className='footer_social_links'> {ct.icon} </div>
              )
            })}
          </div>
        </div>

        <p className="items-center mx-auto"> © 2021 PropertyFinder, Inc. </p>
      </div>
    </footer>
  )
}

export default Footer
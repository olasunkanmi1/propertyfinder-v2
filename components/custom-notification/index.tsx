import { useState, useEffect } from "react"
import { useRecoilState } from "recoil";
import { layoutState } from "../../states";
import { ToastNotification } from "../../types";
import { Spinner } from "../loader";
import { AiOutlineCheck, AiOutlineClose, AiOutlineExclamation } from "react-icons/ai";
import {motion} from 'framer-motion'

const CustomNotification = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [layout, setLayout] = useRecoilState(layoutState);
  const {toastNotifications} = layout
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const removeToast = (id: number) => {
    setToasts(toasts.filter(toast => toast.id !== id))
    setLayout(layout => ({
      ...layout,
      toastNotifications: layout.toastNotifications.filter(n => n.id !== id)
    }));
  } 

  useEffect(() => {
      if(toastNotifications.length > 3) {
        setLayout(layout => ({
          ...layout,
          toastNotifications: layout.toastNotifications.slice(-3)
        }));
      } else {
        setToasts(toastNotifications)
      } 

      toastNotifications.forEach(notification => {
        setTimeout(() => {
          setLayout(layout => ({
            ...layout,
            toastNotifications: layout.toastNotifications.filter(n => n.id !== notification.id)
          }));
        }, 5000); // disappear after 5 seconds
      });

      function updateSize() {
          setIsMobile(window.innerWidth < 768);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
  }, [toastNotifications, setLayout]);

  return (
    <div className='fixed top-0 w-screen z-[100]'>
      { toasts.map((notification) => {
        const {id, toastType, toastMessage} = notification

        return (
          <motion.div key={id}
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ type: "", stiffness: 300, damping: 25, duration: .5, ease: "easeInOut", delay: 0 }}
            className={`flex justify-center items-center p-2 text-white font-semibold w-full cursor-pointer duration-500 transition ease-in-out border-b m-b-2 min-h-[45px] relative ${toastType === 'success' ? 'bg-green-500' : toastType === 'loading' ? 'bg-primary' : 'bg-red-500'}`}
            onClick={() => removeToast(id)}
          > 
            { toastType === 'success' || toastType === 'error' ? (
              <span className={`flex justify-center items-center w-7 h-7 rounded-full bg-white ${toastType === 'success' ? 'text-green-500' : 'text-red-500'}`}> 
                { toastType === 'success' ? <AiOutlineCheck size={20} /> : <AiOutlineExclamation size={20} /> }
              </span>
            ) : (
              <Spinner />
            ) }

            <span className='leading-none max-w-[calc(100%-80px)] ml-2'> {toastMessage} </span>
            <AiOutlineClose size={20} className='absolute right-3 sm:right-8 ml-3' />
          </motion.div>
        )
      }) }
    </div>
  )
}

export default CustomNotification
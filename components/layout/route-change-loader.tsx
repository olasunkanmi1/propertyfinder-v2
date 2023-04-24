import { PageLoader } from '../loader';

const RouteChangeLoader = () => {
  return (
    <div className='flex justify-center items-center fixed top-0 left-0 w-screen h-screen bg-primary bg-opacity-40 z-50'>
      <PageLoader />
    </div>
  )
}

export default RouteChangeLoader
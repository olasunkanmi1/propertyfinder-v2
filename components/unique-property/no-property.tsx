import Image from 'next/image';
import Layout from '../layout'
import {homeNotFound} from "@public";

const NoProperty: React.FC = () => {
  return (
    <Layout title='No property found'>
        <div className='flex flex-col justify-center items-center w-full h-[400px]'>
            <h1 className='text-xl font-bold text-primary'> Property Does Not Exist </h1>

            <div className='relative w-full h-[300px] md:w-[400px] md:h-[400px]'>
                <Image src={homeNotFound} alt="no result" priority fill />
            </div>
        </div>
    </Layout>
  )
}

export default NoProperty
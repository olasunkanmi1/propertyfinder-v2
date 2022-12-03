import React from 'react'
import Layout from '../layout'
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import Image from 'next/image';
import homeNotFound from "../../public/assets/homeNotFound.webp";

interface INoPropertyProps {
    providers?: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
};

const NoProperty: React.FC<INoPropertyProps> = ({providers}) => {
  return (
    <Layout title='No property found' providers={providers}>
        <div className='flex flex-col justify-center items-center w-full h-[400px]'>
            <h1 className='text-xl font-bold text-primary'> Property Does Not Exist </h1>

            <div className='relative w-full h-[300px] md:w-[400px] md:h-[400px]'>
                <Image src={homeNotFound} alt="no result" priority layout='fill' />
            </div>
        </div>
    </Layout>
  )
}

export default NoProperty
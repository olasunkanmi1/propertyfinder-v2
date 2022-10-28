import React from 'react';
import Image from 'next/image';
import { getProviders, signIn as SignIntoProvider } from 'next-auth/react';

function signIn({ providers }: any) {
  console.log(providers);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-6 px-14 text-center">
        {/* <Image
          src="https://links.papareact.com/ocw"
          alt="logo"
          width={190}
          height={100}
        /> */}
        {/* logo */}
        <p className="font-s italic">
          This is not a real App, it is only for eductional purpose
        </p>

        {/* <div className="mt-40">
          {providers && Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() =>
                  SignIntoProvider(provider.id, { callbackUrl: "/" })
                }
                className="p-3 bg-blue-500 rounded-lg text-white"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
}

export default signIn;

export async function getServerSideProps(context: any) {
  const {req, res} = context;
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

import Head from "next/head";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  data: any;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
type Feature = {
  title: string;
  description: string;
  imgUrl: string;
};

export default function PhysicalProductTemplate({ data, setOpen }: Props) {
  // Extract the field values from the structured data
  const featureSections = [
    {
      title: data.featureTitle1,
      description: data.featureDescription1,
      imgUrl: data.featureImgUrl1,
    },
    {
      title: data.featureTitle2,
      description: data.featureDescription2,
      imgUrl: data.featureImgUrl2,
    },
    {
      title: data.featureTitle3,
      description: data.featureDescription3,
      imgUrl: data.featureImgUrl3,
    },
  ];
  const handleClick = () => {
    if (setOpen) {
      setOpen(true);
    }
  };
  return (
    <>
      <Head>
        <title>{data.metaTitle}</title>
      </Head>
      <main>
        <section className='py-20 bg-transparent lg:py-28'>
          <div className='container px-5 mx-auto text-center'>
            <div className='mb-16'>
              <div className='mb-12 space-y-4'>
                <h4 className='text-2xl font-semibold sm:text-3xl'>
                  {data.tagline}
                </h4>
                <h1 className='text-5xl font-bold sm:text-7xl'>
                  {data.headline}
                </h1>
                <p className='mx-auto text-lg text-gray-600 sm:w-3/4 lg:w-2/4 xl:w-96 sm:text-xl'>
                  {data.heroText}
                </p>
              </div>
              <a
                href='#buyButton'
                className='inline-block px-12 py-4 text-lg font-semibold text-white transition duration-300 ease-in-out transform bg-blue-800 rounded-full shadow hover:bg-blue-900 hover:shadow-lg hover:scale-110'
              >
                {data.heroButtonText}
              </a>
            </div>
            <img
              className='mx-auto xl:max-w-screen-lg mb-28'
              src={data.heroImage}
              alt={data.heroAlt}
            />
            {/* <div className='space-y-12'>
              <p className='mx-auto text-xl font-semibold text-gray-600 lg:w-3/5 sm:text-3xl'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Eveniet obcaecati perferendis voluptas quasi quidem natus error
                voluptatibus.
              </p>
              <div className='flex flex-col justify-center space-y-5 sm:flex-row sm:space-y-0 sm:space-x-10 md:space-x-20'>
                <div className='flex flex-col items-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:text-left'>
                  <span className='flex items-center justify-center w-12 h-12 text-gray-600 bg-white rounded-full shadow'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                  <span className='font-medium text-gray-600'>
                    Mechanical <br />
                    Shutter
                  </span>
                </div>
                <div className='flex flex-col items-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:text-left'>
                  <span className='flex items-center justify-center w-12 h-12 text-gray-600 bg-white rounded-full shadow'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                  <span className='font-medium text-gray-600'>
                    4dB Noise <br />
                    Reduction
                  </span>
                </div>
                <div className='flex flex-col items-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:text-left'>
                  <span className='flex items-center justify-center w-12 h-12 text-gray-600 bg-white rounded-full shadow'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                  <span className='font-medium text-gray-600'>
                    1-inch <br />
                    Image Sensor
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </section>
        {/* <section className='py-10 pt-16 lg:py-14 lg:pt-28'>
          <div className='container px-5 mx-auto'>
            <div className='mb-8 space-y-5 text-center lg:mb-16'>
              <h4 className='text-3xl font-semibold text-gray-600'>
                HDR Video
              </h4>
              <h2 className='text-4xl font-bold sm:text-5xl'>
                Dynamic by Default
              </h2>
              <p className='mx-auto text-lg text-gray-600 sm:w-3/4 lg:w-2/4 xl:w-1/3 sm:text-xl'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Veritatis, aliquid!
              </p>
            </div>
            <div className='flex items-center justify-center mx-auto xl:w-4/5'>
              <button
                onClick={openModal}
                type='button'
                className='absolute flex items-center px-6 py-3 space-x-2 text-sm font-semibold text-blue-800 transition duration-300 transform bg-white rounded-full shadow-md hover:shadow-lg hover:scale-110'
              >
                <span>Watch Video</span>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='relative w-5 h-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
              </button>
              <img
                src='https://images.unsplash.com/photo-1511204579483-e5c2b1d69acd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1871&q=80'
                alt=''
              />
            </div>
            <Transition show={isOpen} as={Fragment}>
              <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className='fixed inset-0 z-10 overflow-y-auto'
              >
                <div className='flex items-center justify-center min-h-screen'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <Dialog.Overlay className='fixed inset-0 bg-black/50' />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                  >
                    <div className='inline-block w-full max-w-2xl p-1 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl'>
                      <iframe
                        width='100%'
                        height='400'
                        src='https://www.youtube.com/embed/ZVNO-fib6fg?controls=0'
                        title='YouTube video player'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      ></iframe>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </div>
        </section> */}
        <section className='py-10 lg:py-14'>
          <div className='container px-5 mx-auto'>
            <div className='mb-8 space-y-5 lg:text-center lg:mb-16'>
              <h2 className='text-4xl font-bold sm:text-5xl'>
                {data.featuresSectionTitle}
              </h2>
              <p className='text-lg text-gray-600 sm:w-3/4 lg:w-2/4 xl:w-1/3 lg:mx-auto sm:text-xl'>
                {data.featuresSectionText}
              </p>
            </div>

            <div className='grid gap-y-10 lg:gap-y-0'>
              {featureSections.map((feature: Feature, i: number) => (
                <div
                  key={i}
                  className='grid items-center gap-5 lg:grid-cols-2 lg:gap-0'
                >
                  <div
                    className={classNames(
                      i % 2 === 0 ? "lg:pr-20" : "lg:pl-20",
                      "space-y-4"
                    )}
                  >
                    <h3 className='text-2xl font-semibold sm:text-4xl'>
                      {feature.title}
                    </h3>
                    <p className='text-lg text-gray-600'>
                      {feature.description}
                    </p>
                  </div>
                  <div
                    className={classNames(
                      i % 2 === 0 ? "lg:order-last" : "",
                      "bg-gray-100 p-20 order-first"
                    )}
                  >
                    <img src={feature.imgUrl} alt={feature.title} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* <section className='py-10 pb-20 lg:py-14 lg:pb-28'>
          <div className='container px-12 mx-auto sm:px-5'>
            <div className='mb-8 space-y-5 text-center lg:mb-16'>
              <h2 className='text-4xl font-bold sm:text-5xl'>
                Great Specifications
              </h2>
              <p className='mx-auto text-lg text-gray-600 sm:w-3/4 lg:w-2/4 xl:w-1/3 sm:text-xl'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Veritatis, aliquid!
              </p>
            </div>

            <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-3'>
              {featuresGrid.map((feature, i) => (
                <div key={i} className='space-y-6 text-center'>
                  <feature.icon className='mx-auto text-blue-800 h-14 w-14' />
                  <div className='space-y-4'>
                    <h5 className='text-2xl font-semibold'>{feature.title}</h5>
                    <p className='text-lg text-gray-600'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        <section className='py-20 bg-gray-100 lg:py-28'>
          <div className='container px-5 mx-auto'>
            <div className='grid items-center gap-10 text-center lg:grid-cols-2 lg:text-left'>
              <div className='space-y-8'>
                <div className='space-y-4'>
                  <h2 className='text-3xl font-bold sm:text-5xl'>
                    {data.ctaTitle}
                  </h2>
                  <p className='text-xl text-gray-600'>{data.ctaText}</p>
                </div>
                <div className='flex items-center justify-center space-x-4 lg:justify-start'>
                  <button
                    id='buyButton'
                    onClick={handleClick}
                    className='inline-block px-6 py-3 text-lg font-semibold text-blue-800 transition duration-300 bg-white rounded-full shadow hover:bg-blue-900 hover:text-white hover:shadow-lg'
                  >
                    {data.ctaButtonText}
                  </button>
                  <div className='text-xl font-semibold text-blue-800'>
                    ${parseFloat(data.price)}
                  </div>
                </div>
              </div>
              <div className=''>
                <img src={data.ctaImage} alt='Drone' />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='mt-12'>
        <div className='container px-5 mx-auto text-center'>
          <p className='text-xs text-gray-500'>
            Copyright 2023. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

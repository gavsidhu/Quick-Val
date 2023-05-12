import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const VideoSection = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <section className='py-10 pt-16 lg:py-14 lg:pt-28'>
      <div className='container px-5 mx-auto'>
        <div className='mb-8 space-y-5 text-center lg:mb-16'>
          <h4 className='text-3xl font-semibold text-gray-600'>HDR Video</h4>
          <h2 className='text-4xl font-bold sm:text-5xl'>Dynamic by Default</h2>
          <p className='mx-auto text-lg text-gray-600 sm:w-3/4 lg:w-2/4 xl:w-1/3 sm:text-xl'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis,
            aliquid!
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
    </section>
  );
};

export default VideoSection;

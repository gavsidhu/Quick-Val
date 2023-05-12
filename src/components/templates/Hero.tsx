const Hero = () => {
    return (
        <section className="py-20 bg-gray-200 lg:py-28">
            <div className="container px-5 mx-auto text-center">
                <div className="mb-16">
                    <div className="mb-12 space-y-4">
                        <h4 className="text-2xl font-semibold sm:text-3xl">Phantom 4PRO V2.0</h4>
                        <h1 className="text-5xl font-bold sm:text-7xl">Visionary intelligence</h1>
                        <p className="mx-auto text-lg text-gray-600 sm:w-3/4 lg:w-2/4 xl:w-96 sm:text-xl">Free HTML Single Product eCommerce langing page template</p>
                    </div>
                    <a href="#0" className="inline-block px-12 py-4 text-lg font-semibold text-white transition duration-300 ease-in-out transform bg-blue-800 rounded-full shadow hover:bg-blue-900 hover:shadow-lg hover:scale-110">Buy now</a>
                </div>
                <img className="mx-auto xl:max-w-screen-lg mb-28" src="../hero-drone.png" alt="Drone" />
                <div className="space-y-12">
                    <p className="mx-auto text-xl font-semibold text-gray-600 lg:w-3/5 sm:text-3xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet obcaecati perferendis voluptas quasi quidem natus error voluptatibus.</p>
                    <div className="flex flex-col justify-center space-y-5 sm:flex-row sm:space-y-0 sm:space-x-10 md:space-x-20">
                        <div className="flex flex-col items-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:text-left">
                            <span className="flex items-center justify-center w-12 h-12 text-gray-600 bg-white rounded-full shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <span className="font-medium text-gray-600">Mechanical <br/>Shutter</span>
                        </div>
                        <div className="flex flex-col items-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:text-left">
                            <span className="flex items-center justify-center w-12 h-12 text-gray-600 bg-white rounded-full shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                                  </svg>
                            </span>
                            <span className="font-medium text-gray-600">4dB Noise <br/>Reduction</span>
                        </div>
                        <div className="flex flex-col items-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:text-left">
                            <span className="flex items-center justify-center w-12 h-12 text-gray-600 bg-white rounded-full shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                  </svg>
                            </span>
                            <span className="font-medium text-gray-600">1-inch <br/>Image Sensor</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Hero;
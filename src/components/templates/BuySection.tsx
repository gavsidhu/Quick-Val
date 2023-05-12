const BuySection = () => {
    return (
        <section className="py-20 bg-gray-100 lg:py-28">
            <div className="container px-5 mx-auto">
                <div className="grid items-center gap-10 text-center lg:grid-cols-2 lg:text-left">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold sm:text-5xl">Phantom 4PRO V2.0</h2>
                            <p className="text-xl text-gray-600">Visionary intelligence. Elevated imagination.</p>
                        </div>
                        <div className="flex items-center justify-center space-x-4 lg:justify-start">
                            <a href="#0" className="inline-block px-6 py-3 text-lg font-semibold text-blue-800 transition duration-300 bg-white rounded-full shadow hover:bg-blue-900 hover:text-white hover:shadow-lg">Buy now</a>
                            <div className="text-xl font-semibold text-blue-800">From $1,599</div>
                        </div>
                    </div>
                    <div className="">
                        <img src="../bottom-drone.png" alt="Drone" />
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default BuySection;
const features = [
    {
        title: 'Incredible Gimbal Camera',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, doloribus. Ipsum saepe dicta excepturi vero sint dolorum quo ullam qui possimus inventore nesciunt incidunt, cum vel modi nostrum tempore. Commodi consectetur reiciendis veniam possimus corporis, distinctio officiis eos iste totam fuga, eum magnam adipisci accusantium.',
        imgUrl: '../camera-img.png',
    },
    {
        title: 'Intuitive Remote Controller',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, doloribus. Ipsum saepe dicta excepturi vero sint dolorum quo ullam qui possimus inventore nesciunt incidunt, cum vel modi nostrum tempore. Commodi consectetur reiciendis veniam possimus corporis, distinctio officiis eos iste totam fuga, eum magnam adipisci accusantium.',
        imgUrl: '../controller-img.png',
    },
    {
        title: 'Intelligent Flight Battery',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, doloribus. Ipsum saepe dicta excepturi vero sint dolorum quo ullam qui possimus inventore nesciunt incidunt, cum vel modi nostrum tempore. Commodi consectetur reiciendis veniam possimus corporis, distinctio officiis eos iste totam fuga, eum magnam adipisci accusantium.',
        imgUrl: '../gimbal-img.png',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const FeaturesBlocks = () => {
    return (
        <section className="py-10 lg:py-14">
            <div className="container px-5 mx-auto">
                <div className="mb-8 space-y-5 lg:text-center lg:mb-16">
                    <h2 className="text-4xl font-bold sm:text-5xl">Powerful Aerial Performance</h2>
                    <p className="text-lg text-gray-600 sm:w-3/4 lg:w-2/4 xl:w-1/3 lg:mx-auto sm:text-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, aliquid!</p>
                </div>

                <div className="grid gap-y-10 lg:gap-y-0">
                    {features.map((feature, i) => (
                        <div key={i} className="grid items-center gap-5 lg:grid-cols-2 lg:gap-0">
                            <div className={classNames(i % 2 === 0 ? 'lg:pr-20':'lg:pl-20', 'space-y-4')}>
                                <h3 className="text-2xl font-semibold sm:text-4xl">{feature.title}</h3>
                                <p className="text-lg text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                            <div className={classNames(i % 2 === 0 ? 'lg:order-last':'', 'bg-gray-100 p-20 order-first')}>
                                <img src={feature.imgUrl} alt={feature.title} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
 
export default FeaturesBlocks;
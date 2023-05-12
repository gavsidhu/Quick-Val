import { CameraIcon, LightningBoltIcon, LightBulbIcon, MoonIcon, PhotographIcon, AdjustmentsIcon } from '@heroicons/react/outline'

const features = [
    {
        title: 'Feature',
        description: 'Sit distinctio similique voluptas delectus corporis similique nostrum vitae voluptas.',
        icon: CameraIcon,
    },
    {
        title: 'Feature',
        description: 'Sit distinctio similique voluptas delectus corporis similique nostrum vitae voluptas.',
        icon: LightningBoltIcon,
    },
    {
        title: 'Feature',
        description: 'Sit distinctio similique voluptas delectus corporis similique nostrum vitae voluptas.',
        icon: LightBulbIcon,
    },
    {
        title: 'Feature',
        description: 'Sit distinctio similique voluptas delectus corporis similique nostrum vitae voluptas.',
        icon: MoonIcon,
    },
    {
        title: 'Feature',
        description: 'Sit distinctio similique voluptas delectus corporis similique nostrum vitae voluptas.',
        icon: PhotographIcon,
    },
    {
        title: 'Feature',
        description: 'Sit distinctio similique voluptas delectus corporis similique nostrum vitae voluptas.',
        icon: AdjustmentsIcon,
    },
]

const Features = () => {
    return (
        <section className="py-10 pb-20 lg:py-14 lg:pb-28">
            <div className="container px-12 mx-auto sm:px-5">
                <div className="mb-8 space-y-5 text-center lg:mb-16">
                    <h2 className="text-4xl font-bold sm:text-5xl">Great Specifications</h2>
                    <p className="mx-auto text-lg text-gray-600 sm:w-3/4 lg:w-2/4 xl:w-1/3 sm:text-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, aliquid!</p>
                </div>

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, i) =>(
                        <div key={i} className="space-y-6 text-center">
                            <feature.icon className="mx-auto text-blue-800 h-14 w-14" />
                            <div className="space-y-4">
                                <h5 className="text-2xl font-semibold">{feature.title}</h5>
                            <p className="text-lg text-gray-600">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
 
export default Features;

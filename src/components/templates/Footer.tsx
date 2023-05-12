const Footer = () => {
    return (
        <footer className="py-8 lg:py-12">
            <div className="container px-5 mx-auto text-center">
                <div className="flex flex-col justify-center mb-6 space-y-2 text-sm text-gray-500 md:flex-row md:space-y-0 md:space-x-4">
                    <p>Copyright © 2021 Rance. All rights reserved.</p>
                    <p>Images and texts from <a className="text-blue-700 underline" href="https://dji.com" rel="nofollow" target="_blank">dji.com</a> | <a className="text-blue-700 underline" href="https://unsplash.com" rel="nofollow" target="_blank">unsplash.com</a></p>
                </div>
                <div className="mx-auto sm:w-2/4 lg:w-1/3">
                    <p className="text-xs text-gray-400">Photos and texts are used to demonstrate the capabilities of the site template, please do not use them for commercial purposes.</p>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;
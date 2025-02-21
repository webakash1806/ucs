import car1 from '../assets/car1.avif';
import car2 from '../assets/car2.avif';

const HomeSection2 = ({ data }) => {

    console.log("home section is", data);


    const { children } = data

    const stripHTMLTags = (str) => {
        return str.replace(/<\/?[^>]+(>|$)/g, "");
    };


    return (
        <div className='w-full px-[4vw] lg:px-[6vw] flex flex-col items-center justify-center bg-[#F5F6F7]  py-20 pt-6'>
            <h1 className='text-3xl md:text-4xl font-semibold pb-10  text-main '>
                {data?.title}
            </h1>
            <div className='w-fit flex flex-col sm:block p-4 bg-[#cedfe427] rounded-lg shadow-md '>
                <img src={children[0]?.photo?.secure_url} className='float-left w-full sm:w-[40vw] md:w-[30vw] lg:w-[25vw] sm:mr-3' alt="Main visual" />

                <h2 className='text-xl md:text-2xl font-semibold text-main mb-1'>
                    {children[0]?.title}
                </h2>
                <p className='text-base  text-[#535760] mb-4'>

                    {children[0]?.description
                        ? stripHTMLTags(children[0]?.description)
                        : "Description Not Available"}
                </p>
                <h2 className='text-xl md:text-2xl font-semibold text-main mb-1'>
                    {/* {children[1].title} */}
                </h2>
                <p className='text-base  text-[#535760] mb-4'>
                    {children[1]?.description
                        ? stripHTMLTags(children[2]?.description)
                        : "Description Not Available"}
                </p>
                <h2 className='text-xl md:text-2xl font-semibold text-main mb-1'>
                    {children[2].title}
                </h2>
                <p className='text-base  text-[#535760] mb-4'>
                    {children[2]?.description
                        ? stripHTMLTags(children[2]?.description)
                        : "Description Not Available"}
                </p>
                <img src={children[4]?.photo?.secure_url} className='float-right w-full sm:w-[40vw] md:w-[30vw] lg:w-[25vw] sm:ml-3' alt="Main visual" />

                <h2 className='text-xl md:text-2xl font-semibold text-main mb-1'>
                    {children[3].title}
                </h2>
                <p className='text-base  text-[#535760] mb-4'>
                    {children[3]?.description
                        ? stripHTMLTags(children[3]?.description)
                        : "Description Not Available"}
                </p>

                <h2 className='text-xl md:text-2xl font-semibold text-main mb-1'>
                    {children[4].title}
                </h2>
                <p className='text-base  text-[#535760] mb-4'>
                    {children[4]?.description
                        ? stripHTMLTags(children[4]?.description)
                        : "Description Not Available"}
                </p>


            </div>
        </div>
    );
};

export default HomeSection2;

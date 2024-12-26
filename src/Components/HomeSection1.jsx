import about1 from '../assets/car1.avif';
import transparency from '../assets/icons/transparency.avif'
import trust from '../assets/icons/trust.avif'
import support from '../assets/icons/support.avif'

const HomeSection1 = ({data}) => {

     const {children}=data

     
    const stripHTMLTags = (str) => {
        return str.replace(/<\/?[^>]+(>|$)/g, "");
      };

     
    
    return (
        <div className='px-[5vw] py-20 flex flex-col items-center justify-center md:px-[6vw] lg:px-[8rem] bg-[#F5F6F7]'>
            <h1 className="text-3xl font-[600] mb-6 text-main md:text-4xl">
                {data?.title}
            </h1>
            <div className='flex flex-col items-center justify-center gap-8 pb-10 sm:block'>
                <img src={about1} className='w-full sm:w-[16rem] border h-full drop-shadow-[-3px_4px_4px_#808080] sm:mr-3 md:w-[19rem] lg:w-[25rem] float-left relative z-[10]' alt="Main visual" />
                <h2 className='mb-1 text-xl font-semibold md:text-2xl text-main'>
                    {children[0]?.title}
                </h2>
                <p className='text-base  text-[#535760] mb-4'>
                  
                     {children[0]?.description
        ? stripHTMLTags(children[0]?.description)
        : "Description Not Available"}
                 </p>    
                <p className='text-base  text-[#535760] mb-4'>
                    <strong>{children[1]?.title}</strong>,         {children[1]?.description
        ? stripHTMLTags(children[1]?.description)
        : "Description Not Available"}
                </p>
                <h2 className='mb-1 text-xl font-semibold md:text-2xl text-main'>
                   {children[2]?.title}
                </h2>
                <p className='text-base  text-[#535760] mb-4'>At
          
                    {children[2]?.description
        ? stripHTMLTags(children[2]?.description)
        : "Description Not Available"}

                </p>


            </div>

            <div className='flex flex-wrap items-center justify-center flex-grow gap-5'>
                <div className='flex items-center max-w-[20rem] shadow-md py-1 gap-1 bg-lightSky border-main border rounded-md'>
                    <img src={transparency} alt="Transparency icon" className='w-[5rem] rounded-md' />
                    <div>
                        <h2 className='font-semibold text-[1.1rem] mb-1'>100% Transparency</h2>
                        <p className='text-[0.9rem] leading-5'>We ensure complete clarity in all our services and dealings.</p>
                    </div>
                </div>

                <div className='flex items-center max-w-[20rem] shadow-md py-1 gap-1 bg-lightSky border-main border rounded-md'>
                    <img src={support} alt="Transparency icon" className='w-[5rem] rounded-md' />
                    <div>
                        <h2 className='font-semibold  text-[1.1rem] mb-1'>24/7 Customer Support</h2>
                        <p className='text-[0.9rem] leading-5'>We maintain open communication with clients at every step.</p>
                    </div>
                </div>

                <div className='flex items-center max-w-[20rem] shadow-md py-1 gap-1 bg-lightSky border-main border rounded-md'>
                    <img src={trust} alt="Trust icon" className='w-[5rem] rounded-md' />
                    <div>
                        <h2 className='font-semibold text-[1.1rem] mb-1'>Trusted & Quality Service</h2>
                        <p className='text-[0.9rem] leading-5'>Providing reliable and top-notch service is our utmost priority.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default HomeSection1;
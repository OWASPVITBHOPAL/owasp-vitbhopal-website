import { Container } from "../ui/container";

const HeroSection = () => {
  return (
    <Container className="px-4 md:px-6 lg:px-8">
      <div className="relative w-full min-h-[250px] h-[80vh] md:h-[70vh] md:min-h-[500px] flex items-center justify-center my-0 md:my-16 overflow-hidden">
        {/* Mobile Layout - Text over SVG */}
        <div className="absolute h-full inset-0 flex items-center justify-center z-10 pointer-events-none px-2 md:hidden">
          <div className="flex-shrink-0 flex flex-col select-none w-full items-center">
            <div className="flex flex-col items-center justify-center text-center mb-2">
              <div className="text-[#ABABAB] text-[100px] sm:text-[40px] not-italic font-bold leading-17 tracking-[-2px]">
                OWASP
              </div>
              <div className="text-[#ABABAB] text-[70px] sm:text-[40px] not-italic font-normal leading-tight">
                VIT Bhopal
              </div>
              <div className="text-[#ABABAB] text-[25px] sm:text-[12px] not-italic font-semibold tracking-wide leading-tight">
                Student Chapter
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Text over SVG */}
        <div className="absolute inset-0 hidden md:flex flex-col items-center justify-center z-10 pointer-events-none px-2">
          <div className="flex-shrink-0 flex flex-col select-none w-full">
            <div className="flex flex-row justify-center items-center">
              <span className="text-[#ABABAB] text-[80px] md:text-[150px] not-italic font-bold leading-tight">
                OWASP
              </span>
              <span className="text-[#ABABAB] text-[80px] md:text-[140px]  not-italic font-normal leading-tight ml-8">
                VIT Bhopal
              </span>
            </div>
            <div className="flex flex-row justify-end items-center w-full pr-8 md:pr-16">
              <div className="w-32 lg:w-40 border-[3px] lg:border-[4px] border-[#ABABAB] mr-4" />
              <span className="text-[#ABABAB] text-[20px] lg:text-[28px] xl:text-[32px] not-italic font-semibold leading-tight">
                Student Chapter
              </span>
            </div>
          </div>
        </div>

        {/* SVG Background */}
        {/* <div className="relative z-0 w-full flex justify-center">
          <div className="w-full max-w-none">
            <HeroSVG className="w-full h-auto" />
          </div>
        </div> */}
      </div>
    </Container>
  );
};

export default HeroSection;

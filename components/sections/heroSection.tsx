import { Container } from "../ui/container";
import { homeContent } from "@/Content/Home";
import { AnimatedHeroText } from "./AnimatedHeroText";

const HeroSection = () => {
  const { titlePrefix, titleSuffix, subtitle } = homeContent.hero;
  return (
    <Container className="px-4 md:px-6 lg:px-8">
      <div className="relative my-0 flex h-[80vh] min-h-62.5 w-full items-center justify-center md:my-16 md:h-[70vh] md:min-h-125">
        {/* Animated Hero Typography (Cyber Decrypt, Synchronized with Loader) */}
        <AnimatedHeroText
          titlePrefix={titlePrefix}
          titleSuffix={titleSuffix}
          subtitle={subtitle}
        />
      </div>
    </Container>
  );
};

export default HeroSection;

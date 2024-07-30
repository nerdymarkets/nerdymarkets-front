import Image from 'next/image';
import { Container, List } from 'reactstrap';
import workingImage from '../../../../public/images/workingImage.png';
import { howItWorks } from '@/utils/page-info';
import AnimationWrapper from '@/components/shared/animation-wrapper';
const HowItWorksSection = () => {
  return (
    <div className="bg-black py-20">
      <Container>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-4">
            <AnimationWrapper className="text-4xl font-extrabold mb-6 text-white">
              <h2>How it works</h2>
            </AnimationWrapper>
            <AnimationWrapper delay={0.2}>
              <List className=" text-white list-decimal pl-6 space-y-4">
                {howItWorks.map((item, index) => (
                  <li key={index} className="font-light">
                    <span className="font-bold text-lg">{item.name}:</span>{' '}
                    {item.text}
                  </li>
                ))}
              </List>
            </AnimationWrapper>
          </div>
          <div className="md:w-1/2 p-4 ">
            <AnimationWrapper delay={0.3}>
              <Image
                src={workingImage}
                alt="How it works image"
                className="rounded-3xl shadow-lg"
              />
            </AnimationWrapper>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HowItWorksSection;

import Image from 'next/image';
import { Container, List } from 'reactstrap';
import waitlistImage from '../../../../public/images/waitlist.png';
import { waitlist } from '@/utils/page-info';
import AnimationWrapper from '@/components/shared/animation-wrapper';
const WaitListSection = () => {
  return (
    <div className=" py-20">
      <Container>
        <div className="flex flex-col md:flex-row items-center text-black">
          <div className="md:w-1/2 p-4 ">
            <AnimationWrapper delay={0.2}>
              <Image
                src={waitlistImage}
                alt="waitlistImage"
                className="rounded-3xl shadow-lg"
              />
            </AnimationWrapper>
          </div>
          <div className="md:w-1/2 p-4">
            <AnimationWrapper>
              <p className="text-6xl font-extrabold mb-6 ">
                Why join our Waitlist?
              </p>

              <p>
                Joining our waitlist ensures you’re among the first to access
                our service. Here’s why you should sign up:
              </p>
            </AnimationWrapper>
            <AnimationWrapper>
              <List className=" list-disc pl-6 space-y-4">
                {waitlist.map((item, index) => (
                  <li key={index} className="font-light">
                    <span className="font-bold text-lg">{item.name}:</span>{' '}
                    {item.text}
                  </li>
                ))}
              </List>
            </AnimationWrapper>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WaitListSection;

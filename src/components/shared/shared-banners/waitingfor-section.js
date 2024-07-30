import Image from 'next/image';
import waitingfor from '../../../../public/images/waitingfor.png';
import { Container } from 'reactstrap';
import SubscriptionForm from '../subscription-form';
import AnimationWrapper from '../animation-wrapper';
const WaitingForSection = () => {
  return (
    <div className=" py-14">
      <Container>
        <div className="flex flex-col md:flex-row items-center text-black">
          <div className="md:w-1/2 p-4 ">
            <AnimationWrapper delay={0.2}>
              <Image
                src={waitingfor}
                alt="waitlistImage"
                className="rounded-3xl shadow-lg"
              />
            </AnimationWrapper>
          </div>
          <div className="md:w-1/2 p-4">
            <AnimationWrapper>
              <h2 className="text-6xl font-extrabold mb-6 ">
                What are you waiting for?
              </h2>
              <p>
                There&apos;s no better time to take control of your investment
                portfolio. Once launched, our portfolios will guide you through
                your investment journey. And the best part? You will be your own
                portfolio manager!
              </p>
            </AnimationWrapper>
            <AnimationWrapper delay={0.2}>
              <SubscriptionForm labelTextColor="text-black" roundedButton />
            </AnimationWrapper>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WaitingForSection;

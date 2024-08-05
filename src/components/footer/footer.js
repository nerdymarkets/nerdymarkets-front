import Image from 'next/image';
import { Container } from 'reactstrap';
import nerdylogo from '../../../public/logo/nerdylogo.png';
import SubscriptionForm from '../shared/subscription-form';
import AnimationWrapper from '../shared/animation-wrapper';
const Footer = () => {
  return (
    <div className="bg-black py-14 text-white">
      <Container>
        <div className="flex flex-col md:flex-row items-center w-full justify-between">
          <div className="mb-6 md:mb-0">
            <AnimationWrapper delay={0.3}>
              <Image
                src={nerdylogo}
                alt="logo"
                width={300}
                height={250}
                priority={true}
                placeholder="blur"
              />

              <p className="text-lg font-light">Join us and be successful.</p>
            </AnimationWrapper>
          </div>

          <AnimationWrapper>
            <SubscriptionForm roundedButton inputWidth="large" />
          </AnimationWrapper>
        </div>
        <AnimationWrapper>
          <div className="flex flex-col gap-4 mt-10 text-sm md:text-base">
            <p>
              Disclosure: Any explanation or information which we give to you as
              part of this service, or about the performance of the portfolios
              is not intended to be, and should not be considered as investment
              advice. The content presented is for educational and informational
              purposes only and solely as a self help tool for your personal
              use. We are unable to provide any guarantee as to the performance
              of any particular portfolio or strategy.
            </p>
            <p>
              Past performance, risk scores, statistics and any other
              information with respect to the portfolios are not reliable
              indicators of future performance. We do not represent or guarantee
              that you will achieve profits or losses similar to those shown on
              this website or within the service.
            </p>
            <p>©NerdyMarkets Limited. All rights reserved.</p>
          </div>
        </AnimationWrapper>
      </Container>
    </div>
  );
};

export default Footer;

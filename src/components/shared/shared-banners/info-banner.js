import Image from 'next/image';
import { Container } from 'reactstrap';
import { twMerge } from 'tailwind-merge';
import SubscriptionForm from '../subscription-form';
import AnimationWrapper from '../animation-wrapper';
const InfoBanner = () => {
  return (
    <div className={twMerge('py-10 bg-black text-white')}>
      <Container className="flex  items-center">
        <AnimationWrapper>
          <div className="flex flex-col  items-start">
            <h1 className="text-8xl font-extrabold leading-tight">
              Smart Alpha Portfolios for big
              <span className={twMerge('text-customPink px-2')}>success</span>
            </h1>
            <div className="flex flex-col gap-6 my-4 pt-10s  text-start">
              <p>
                Don&apos;t be left out. Invest like a hedge fund or managed
                fund.
              </p>
              <p>
                Copy trade our Smart Volatility ETF portfolios with promising
                potential.
              </p>
            </div>
            <SubscriptionForm />
          </div>
        </AnimationWrapper>

        <AnimationWrapper delay={0.3}>
          <Image
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=639,h=334,fit=crop/Aq2BvWKQ6gSzv6l3/performance_portfolios-AzGrN7l06MTJnog3.png"
            alt="banner-image"
            width={600}
            height={300}
            className="w-[1650px] h-10 md:h-12 lg:h-[250px]"
          />
        </AnimationWrapper>
      </Container>
    </div>
  );
};

export default InfoBanner;

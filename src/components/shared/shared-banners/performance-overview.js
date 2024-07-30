import Image from 'next/image';
import { Container } from 'reactstrap';
import AnimationWrapper from '@/components/shared/animation-wrapper';

const PerformanceOverview = () => {
  return (
    <Container className="bg-white py-20 text-start flex gap-6 flex-col items-center">
      <AnimationWrapper>
        <h1 className="text-6xl font-bold">
          Unlock the Power of Smart Investing
        </h1>
      </AnimationWrapper>
      <AnimationWrapper delay={0.2}>
        <div className="text-normal font-sans">
          <p>
            We believe in data-driven, methodical trading strategies. Our
            approach is rooted in statistics and probabilities, not hype or
            emotion. We are not stock market gurus with crystal ball
            predictions. Instead, we offer a transparent, reliable, and
            research-driven portfolios.
          </p>
          <p>
            We designed three strategic portfolios, each tailored to different
            risk levels. Whether you prefer a low-, medium-, or high-volatility
            approach, we have a portfolio for you. Follow one, two, or all three
            to match your investment style.
          </p>
          <p>
            Each month, we review the composition of each portfolio and make
            adjustments based on various factors embedded in our strictly
            mechanical approach. You’ll receive monthly commentary with all the
            updates to the portfolios. Through your preferred broker, you decide
            whether you want to act on the changes, allowing you full control
            over your investments. This way you become an informed investor.
          </p>
        </div>
      </AnimationWrapper>
      <AnimationWrapper delay={0.4}>
        <div className="text-customPink font-semibold gap-6 flex flex-col items-center text-center">
          <h4>Smart Volatility ETF Portfolios Performance</h4>
          <h7>Backtesting Results 2015-2023</h7>
          <Image
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=646,h=349,fit=crop/Aq2BvWKQ6gSzv6l3/capture2-mk3DJGrrX9h7N3Zk.JPG"
            alt="banner-image"
            width={600}
            height={300}
            className="h-10 md:h-12 lg:h-[250px]"
          />
        </div>
      </AnimationWrapper>
    </Container>
  );
};

export default PerformanceOverview;

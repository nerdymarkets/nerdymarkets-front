import Image from 'next/image';
import { Container } from 'reactstrap';
import AnimationWrapper from '@/components/shared/animation-wrapper';
import keyStat from '../../../../public/images/keystats.png';
const PerformanceOverview = () => {
  return (
    <Container className="bg-white py-20 text-start flex gap-6 flex-col items-center font-rubik">
      <AnimationWrapper>
        <h1 className="text-6xl font-extrabold">
          Unlock the Power of Smart Investing
        </h1>
      </AnimationWrapper>
      <AnimationWrapper delay={0.2}>
        <div className="text-normal  font-extralight">
          <p className="leading-[30px]">
            We believe in data-driven, methodical trading strategies. Our
            approach is rooted in statistics and probabilities, not hype or
            emotion. We are not stock market gurus with crystal ball
            predictions. Instead, we offer a transparent, reliable, and
            research-driven portfolios.
          </p>
          <p className="mt-4 leading-[30px]">
            We provide a{' '}
            <span className="font-extrabold">robust portfolio</span>
            that responds to market volatility and requires minimal monitoring,
            as it rebalances on a monthly basis. This portfolio consists of
            individual stocks and ETFs.
          </p>
          <p className="mt-4">
            Each month, we review the composition of the portfolio and make
            adjustments based on various factors embedded in our strictly
            mechanical approach. You’ll receive monthly commentary with all the
            updates to the portfolio. Through your preferred broker, you decide
            whether you want to act on the changes, allowing you a full control
            over your investments. This way you become an{' '}
            <span className="font-medium">informed investor.</span>
          </p>
        </div>
      </AnimationWrapper>
      <AnimationWrapper delay={0.4}>
        <div className="text-customPink font-semibold gap-6 flex flex-col items-center text-center">
          <h4 className="text-3xl">
            Smart Volatility ETF Portfolios Performance
          </h4>
          <h6 className="text-base">Backtesting Results 2015-2023</h6>
          <Image
            src={keyStat}
            alt="banner-image"
            layout="responsive"
            objectFit="contain"
          />
        </div>
      </AnimationWrapper>
    </Container>
  );
};

export default PerformanceOverview;

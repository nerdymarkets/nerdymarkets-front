import Image from 'next/image';
import { Container } from 'reactstrap';

import SubscriptionForm from '../subscription-form';
import AnimationWrapper from '../animation-wrapper';
import logoWhite from '../../../../public/logo/nerdylogo.png';
import perfromanceImage from '../../../../public/images/performance.png';
const InfoBanner = () => {
  return (
    <div className="py-10 bg-black text-white font-rubik">
      <Container className="flex  flex-col  w-full ">
        <AnimationWrapper>
          <div className="flex flex-col space-y-4 max-w-5xl">
            <Image src={logoWhite} alt="logo" width={300} />
            <h1 className="text-3xl md:text-[88px] font-extrabold leading-[100px] font-rubik ">
              <div>Smart Volatility</div>
              <div>Portfolio for big</div>
              <div className="text-customPink">success</div>
            </h1>
          </div>
        </AnimationWrapper>

        <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-10">
          <div className="flex-1">
            <div className="flex flex-col gap-6 my-4 pt-10s  text-start">
              <div>
                <div> Don&apos;t be left out. Invest like a hedge fund or</div>
                <div>managed fund.</div>
              </div>
              <div>
                <div> Copy trade our Smart Volatility ETF portfolios with</div>
                <div> promising potential</div>
              </div>
            </div>

            <SubscriptionForm roundedButton />
          </div>
          <div className="md:w-1/2">
            <Image
              src={perfromanceImage}
              alt="banner-image"
              layout="responsive"
              objectFit="contain"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default InfoBanner;

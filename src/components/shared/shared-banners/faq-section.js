import { faq } from '@/utils/page-info';
import AnimationWrapper from '@/components/shared/animation-wrapper';
import { Container } from 'reactstrap';
const FaqSection = () => {
  return (
    <div className="py-20 bg-black text-white font-rubik">
      <Container>
        <div className="md:px-40 px-3">
          <AnimationWrapper>
            <p className="text-5xl font-bold mb-6 text-center">
              Frequently asked Questions
            </p>
          </AnimationWrapper>
          <AnimationWrapper delay={0.3}>
            <div className="grid md:grid-cols-1 gap-4">
              {faq.map((item, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold text-customPink">
                    {item.question}
                  </h3>
                  <p className="text-base font-extralight leading-6">
                    {item.answer}
                  </p>
                  <p className="text-base font-thin  leading-6 mt-2">
                    {item.answer1 ? item.answer1 : ''}
                  </p>
                </div>
              ))}
            </div>
          </AnimationWrapper>
        </div>
      </Container>
    </div>
  );
};

export default FaqSection;

import { faq } from '@/utils/page-info';
import AnimationWrapper from '@/components/shared/animation-wrapper';
const FaqSection = () => {
  return (
    <div className="py-20 bg-black text-white">
      <div className="px-40">
        <AnimationWrapper>
          <h2 className="text-5xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h2>
        </AnimationWrapper>
        <AnimationWrapper delay={0.3}>
          <div className="grid grid-cols-2">
            {faq.map((item, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold ">{item.question}</h3>
                <p className="text-md font-light">{item.answer}</p>
              </div>
            ))}
          </div>
        </AnimationWrapper>
      </div>
    </div>
  );
};

export default FaqSection;

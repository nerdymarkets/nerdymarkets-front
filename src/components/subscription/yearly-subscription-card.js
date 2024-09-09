import { motion } from 'framer-motion';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import AnimationWrapper from '@/components/shared/animation-wrapper';
import PropTypes from 'prop-types';
const YearlySubscriptionCard = ({ onHoverChange, onSubscribe }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        zIndex: 10,
        transition: { duration: 0.4 },
      }}
      onHoverStart={() => onHoverChange('yearly')}
      onHoverEnd={() => onHoverChange(null)}
      className="relative z-10"
    >
      <AnimationWrapper className="h-100" delay={0.2}>
        <Card className="shadow-lg h-100 text-muted bg-white rounded-[1.5rem] transition-transform duration-200 hover:translate-y-[-0px] hover:shadow-xl">
          <CardBody className="d-flex flex-column align-items-center">
            <AnimationWrapper delay={0.3}>
              <CardTitle className="mt-4 text-3xl">
                Yearly Subscription
              </CardTitle>
            </AnimationWrapper>
            <AnimationWrapper delay={0.4}>
              <CardText className="text-muted">
                Get a full year of access with a discounted rate.
              </CardText>
            </AnimationWrapper>
            <AnimationWrapper delay={0.4} className="text-center">
              <CardText className="display-4 mb-4">$100/year</CardText>
              <Button
                onClick={onSubscribe}
                className="bg-customPink  hover:bg-customPinkSecondary border-0 text-white shadow-md hover:translate-y-[-2px] hover:shadow-lg transition-transform duration-200 rounded-full px-4 py-2"
              >
                Subscribe Now
              </Button>
            </AnimationWrapper>
          </CardBody>
        </Card>
      </AnimationWrapper>
    </motion.div>
  );
};
YearlySubscriptionCard.propTypes = {
  onHoverChange: PropTypes.func.isRequired,
  onSubscribe: PropTypes.func.isRequired,
};
export default YearlySubscriptionCard;

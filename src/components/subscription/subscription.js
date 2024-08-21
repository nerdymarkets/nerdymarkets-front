import MonthlySubscriptionCard from '@/components/subscription/monthly-subscription-card';
import YearlySubscriptionCard from '@/components/subscription/yearly-subscription-card';
import { Container, Row, Col } from 'reactstrap';
import { useState } from 'react';
import PaymentModal from '@/components/payment/payment-modal';

const Subscription = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const togglePaymentModal = (subscriptionType = null) => {
    setSelectedSubscription(subscriptionType);
    setIsPaymentModalOpen(!isPaymentModalOpen);
  };

  const handleSubscribeClick = (subscriptionType) => {
    togglePaymentModal(subscriptionType);
  };

  return (
    <Container className="pt-10 min-h-screen">
      <Row className="justify-content-center text-center ">
        <Col lg="8">
          <h2 className="display-5 text-muted">Choose Your Subscription</h2>
          <p className="lead text-muted">
            Pick the plan that best suits your needs and start your journey with
            us today!
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center mt-10 cursor-grabbing">
        <Col
          md="4"
          className={`mb-4 ${
            hoveredCard === 'yearly' ? 'scale-90' : 'scale-100'
          } transition-transform duration-200`}
        >
          <MonthlySubscriptionCard
            onHoverChange={setHoveredCard}
            onSubscribe={() => handleSubscribeClick('monthly')}
          />
        </Col>

        <Col
          md="4"
          className={`mb-4 ${
            hoveredCard === 'monthly' ? 'scale-90' : 'scale-100'
          } transition-transform duration-200`}
        >
          <YearlySubscriptionCard
            onHoverChange={setHoveredCard}
            onSubscribe={() => handleSubscribeClick('yearly')}
          />
        </Col>
      </Row>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        toggle={() => togglePaymentModal(null)}
        subscriptionType={selectedSubscription}
      />
    </Container>
  );
};

export default Subscription;

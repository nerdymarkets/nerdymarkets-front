import Paypal from '@/components/paypal/paypa';
import { Container } from 'reactstrap';
import Stripe from '@/components/strip/strip';
export default function Subscribe() {
  return (
    <Container>
      <Paypal />
      <Stripe />
    </Container>
  );
}

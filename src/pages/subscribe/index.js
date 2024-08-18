import Paypal from '@/components/paypal/paypa';
import { Container } from 'reactstrap';
import Stripe from '@/components/strip/strip';
export default function Subscribe() {
  return (
    <Container className="flex flex-col gap-40">
      <Paypal />
      <Stripe />
    </Container>
  );
}

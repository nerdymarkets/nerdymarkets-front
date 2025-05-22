import FaqSection from '@/components/shared/shared-banners/faq-section';
import HowItWorksSection from '@/components/shared/shared-banners/howitworks-section';
import InfoBanner from '@/components/shared/shared-banners/info-banner';
import PerformanceOverview from '@/components/shared/shared-banners/performance-overview';
import WaitingForSection from '@/components/shared/shared-banners/waitingfor-section';
import WaitListSection from '@/components/shared/shared-banners/waitlist-section';
import { useSession } from 'next-auth/react';

import { Spinner } from 'reactstrap';
export default function Home() {
  const { status } = useSession();
  if (status === 'loading') {
    return (
      <div className="text-center">
        <Spinner className="text-customPink" />
      </div>
    );
  }
  return (
    <>
      <InfoBanner />
      <PerformanceOverview />
      <HowItWorksSection />
      <WaitListSection />
      <FaqSection />
      <WaitingForSection />
    </>
  );
}

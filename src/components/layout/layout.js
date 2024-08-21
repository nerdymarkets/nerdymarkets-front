import Header from '@/components/header/header';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { Inter } from 'next/font/google';
import Footer from '../footer/footer';

const inter = Inter({ subsets: ['latin'] });
const Layout = ({ children }) => {
  return (
    <div className={`flex flex-col  ${inter.className}`}>
      <Container fluid className="px-4 bg-black">
        <Header />
      </Container>
      <div className="flex-grow min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;

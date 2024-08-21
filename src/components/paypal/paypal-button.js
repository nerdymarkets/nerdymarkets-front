/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Image from 'next/image';
import paypallogo from '../../../public/logo/paypalsecondlogo.png';

export const PaypalButton = ({ onClick }) => {
  return (
    <div
      id="paypal-button-container"
      style={{
        display: 'inline-block',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: '#FFC439',
        textAlign: 'center',
        cursor: 'pointer',
        width: '100%',
      }}
      onClick={onClick}
    >
      <Image
        src={paypallogo}
        alt="PayPal"
        width={100} // Adjust width as per your requirement
        height={26} // Adjust height as per your requirement
        style={{ display: 'block', margin: '0 auto', height: '26px' }}
      />
      <div
        style={{
          fontSize: '16px',
          color: 'white',
          fontWeight: '300',
          marginTop: '5px',
        }}
      >
        Subscribe with PayPal
      </div>
    </div>
  );
};

PaypalButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default PaypalButton;

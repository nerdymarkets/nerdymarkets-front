/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Image from 'next/image';
import paypallogo from '../../../public/logo/paypalsecondlogo.png';

export const PaypalButton = ({ onClick, buttonName }) => {
  return (
    <div
      id="paypal-button-container"
      className="rounded-3xl cursor-pointer text-center bg-customPink  hover:bg-customPinkSecondary p-4 shadow-paypal"
      onClick={onClick}
    >
      <Image
        src={paypallogo}
        alt="PayPal"
        width={100}
        height={26}
        style={{ display: 'block', margin: '0 auto', height: '26px' }}
      />
      <p className="text-white font-bold">{buttonName}</p>
    </div>
  );
};

PaypalButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonName: PropTypes.string,
};

export default PaypalButton;

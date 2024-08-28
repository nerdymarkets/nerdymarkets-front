import PropTypes from 'prop-types';

const Avatar = ({ name }) => {
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  return (
    <div className="bg-customPink rounded-full w-10 h-10 flex items-center justify-center text-white text-lg font-bold">
      {getInitial(name)}
    </div>
  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Avatar;

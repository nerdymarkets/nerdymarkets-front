import PropTypes from 'prop-types';
import { formatDate } from '@/utils/fomrat-date';

const UserComments = ({ initialComments }) => {
  return (
    <div className="bg-pink-200 rounded-3xl py-4  mx-auto shadow-lg border-gray-600 font-handwritten">
      <table className="w-full ">
        <thead>
          <tr>
            <th className="py-3 px-4 text-left border-b-2 border-black ">
              Month/Date
            </th>
            <th className="py-3 px-4 text-center border-b-2 border-black">
              Commentary/Update
            </th>
          </tr>
        </thead>
        <tbody>
          {initialComments.map((comment) => (
            <tr
              key={comment._id}
              className="border-b-2  border-black text-left"
            >
              <td className="py-3 px-4 w-20 border-r-2  ">
                {formatDate(comment.createdAt)}
              </td>
              <td className="py-3 px-4 break-words max-w-xs overflow-hidden">
                {comment.comment}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

UserComments.propTypes = {
  initialComments: PropTypes.array,
};

export default UserComments;

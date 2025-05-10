import PropTypes from 'prop-types';
import { formatDate } from '@/utils/fomrat-date';
import { Spinner } from 'reactstrap';
import { useState } from 'react';
const UserComments = ({ initialComments }) => {
  const [comments] = useState(initialComments);

  if (!comments) {
    return (
      <div className="text-center py-4">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <div className="bg-customBlack rounded-3xl py-4 text-white mx-auto shadow-lg border-gray-600 ">
      <table className="w-full ">
        <thead>
          <tr>
            <th className="py-3 px-4 text-left border-b-2 border-black  text-3xl">
              Month/Date
            </th>
            <th className="py-3 px-4 text-center border-b-2 border-black  text-3xl">
              Commentary/Update
            </th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
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

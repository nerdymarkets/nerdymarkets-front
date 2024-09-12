import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { backendBaseUrl } from '../../environments/environment';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { formatDate } from '@/utils/fomrat-date';
const socket = io(backendBaseUrl, {
  withCredentials: true,
  transports: ['websocket', 'polling'],
});

const AdminComments = ({ initialComments }) => {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const handleNewComment = (comment) => {
      setComments((prevComments) => {
        const exists = prevComments.some((c) => c._id === comment._id);
        if (!exists) {
          return [...prevComments, comment];
        }
        return prevComments;
      });
    };

    const handleDeleteComment = (commentId) => {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    };

    socket.on('newComment', handleNewComment);
    socket.on('deleteComment', handleDeleteComment);
    return () => {
      socket.off('newComment', handleNewComment);
      socket.off('deleteComment', handleDeleteComment);
    };
  }, []);

  const handleAddComment = () => {
    if (!newComment.trim()) {
      return;
    }
    socket.emit('addComment', newComment);
    setNewComment('');
  };

  const handleDeleteComment = (commentId) => {
    socket.emit('deleteComment', commentId);
  };

  return (
    <Container className="text-white mt-8">
      <h2 className="text-3xl mb-4">Manage Comments</h2>
      <div className="flex flex-col items-center ">
        <div className="my-4 w-full">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a new comment"
            className="bg-gray-700 p-2 rounded text-white w-full h-20"
          />
        </div>
        <button
          onClick={handleAddComment}
          className="ml-2 bg-green-500 px-4 py-2 rounded-3xl "
        >
          Add Comment
        </button>
      </div>
      <div className="mt-6 border-2 rounded-xl py-4 px-4">
        <ul>
          {comments.map((comment) => (
            <li
              key={comment._id}
              className="flex justify-between items-center mb-2"
            >
              <p>{formatDate(comment.createdAt)}</p>
              <p className="break-words max-w-xs overflow-hidden">
                {comment.comment}
              </p>
              <button
                onClick={() => handleDeleteComment(comment._id)}
                className="bg-red-500 px-2 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

AdminComments.propTypes = {
  initialComments: PropTypes.array,
};

export default AdminComments;

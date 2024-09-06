import { format } from 'date-fns';

/**
 * Formats a date string to 'dd/MM/yyyy, HH:mm:ss' format.
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date.
 */
export const formatDate = (dateString) => {
  return format(new Date(dateString), 'dd/MM/yyyy, HH:mm:ss');
};

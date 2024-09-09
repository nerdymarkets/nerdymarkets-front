import { format, isValid } from 'date-fns';

/**
 * Formats a date string to 'dd/MM/yyyy, HH:mm:ss' format.
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date or 'N/A' if the date is invalid.
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (!isValid(date)) {
    return 'N/A';
  }

  return format(date, 'dd/MM/yyyy, HH:mm:ss');
};

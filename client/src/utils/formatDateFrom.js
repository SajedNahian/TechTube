import moment from 'moment';

export default date => {
  date = new Date(date);
  return moment(date).fromNow();
};

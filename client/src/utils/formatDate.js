const formatDate = date => {
  date = new Date(date);
  var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  // console.log(`${monthNames[monthIndex]} ${day}, ${year}`);
  return `${monthNames[monthIndex]} ${day}, ${year}`;
};

export default formatDate;

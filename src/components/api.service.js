import axios from 'axios';

function fetchPerformance(teamName, selectedDate) {
  let metadata = {
      "table": "vPerformanceMA",
      "where": JSON.stringify([
        {"team = ": teamName},
        {"gameDate < ": selectedDate}
      ]),
      "order": "row_num desc"};

  return new Promise((resolve, reject) => {
    axios
      .get('https://nhl-data.herokuapp.com/api/table', {
        headers: metadata
        })
      .then(res => {
        resolve(res.data)
      })
      .catch(error => reject({ Error : error }));
  })
}

function getCurrentTime() {
  // Get the current 'global' time from an API using Promise
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      var didSucceed = Math.random() >= 0.2;
      didSucceed ? resolve(new Date()) : reject('Error');
    }, 2000);
  })
}

export {
  fetchPerformance,
  getCurrentTime
}

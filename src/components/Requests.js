const scheduledGames = () =>
  fetch("https://nhl-data.herokuapp.com/api/table", {
  //fetch("http://localhost:8008/api/table", {
      headers: {
        "Content-Type": "application/json",
        "table": "NHLGame",
        "where": "[{'detailedState = ':'Scheduled'}]"
      }
    })
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

const fetchData = (props) =>
  //fetch("https://nhl-data.herokuapp.com/api/table", {
  fetch("http://localhost:8008/api/table", {
        headers: props.headers
    })
    .then(res => res.ok ? res : Promise.reject(res))
    .then(res => {
      return res.json()
    })


export {
  scheduledGames,
  fetchData
}

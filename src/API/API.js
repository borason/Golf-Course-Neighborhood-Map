class Helper {
  static baseURL() {
    return "https://api.foursquare.com/v2";
  }
  static auth() {
    const keys = {
      client_id: "VUYQFRISU5Z0THJZYM4IWOCW5QDJNWFU1SCKFGW021JSV02M",
      client_secret: "4NNARBYIRNA3V15ANQPN5W102NHWPNM5JWD0EZ522W14XYBE",
      v: "20190213"
    };
    return Object.keys(keys)
      .map(key => `${key}=${keys[key]}`)
      .join("&");
  }
  static urlBuilder(urlPrams) {
    if (!urlPrams) {
      return "";
    }
    return Object.keys(urlPrams)
      .map(key => `${key}=${urlPrams[key]}`)
      .join("&");
  }
  static headers() {
    return {
      Accept: "application/json"
    };
  }
  static checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error = response;
      throw error;
    }
  }
  static simpleFetch(endpoint, method, urlParams) {
    let requestData = {
      method,
      headers: Helper.headers()
    };
    return fetch(
      `${Helper.baseURL()}${endpoint}?${Helper.auth()}&${Helper.urlBuilder(
        urlParams
      )}`,
      requestData
    )
      .then(Helper.checkStatus)
      .then(response => response.json())
      .catch(error => {
        alert(
          "An error occurred while trying to fetch data from Foursquare - Error Code of: " +
            error.response
        );
      });
  }
}

export default class API {
  static search(urlPrams) {
    return Helper.simpleFetch("/venues/search", "GET", urlPrams);
  }
  static getVenueDetails(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
  }
  static getVenuePhotos(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
  }
}
// export default class API {
//   url =
//     "https://api.foursquare.com/v2/venues/search?client_id=VUYQFRISU5Z0THJZYM4IWOCW5QDJNWFU1SCKFGW021JSV02M&client_secret=4NNARBYIRNA3V15ANQPN5W102NHWPNM5JWD0EZ522W14XYBE&limit=10&near=84101&query=coffee&v=20190222";

//   getVenueInfo = id =>
//     fetch(
//       "https://api.foursquare.com/v2/venues/search?client_id=VUYQFRISU5Z0THJZYM4IWOCW5QDJNWFU1SCKFGW021JSV02M&client_secret=4NNARBYIRNA3V15ANQPN5W102NHWPNM5JWD0EZ522W14XYBE&limit=10&near=84101&query=coffee&v=20190222"
//     )
//       .then(console.log("fetch successful"))
//       .then(response => {
//         if (!response.ok) {
//           throw Error(
//             "Error in getting Venue Detail Response from FourSquare API"
//           );
//         }
//         return response;
//       })
//       .then(data => data.json())
//       .then(data => data)
//       .then(data => console.log(data))
//       .catch(error => {
//         console.log(
//           "Error in Retrieving Venue Details from FourSquare: " +
//             error +
//             ": " +
//             error.message
//         );
//       });
// }

export function PostData(userData) {
  //let BaseURL = 'https://sipcityapi.mobileprogramming.net/admin-login';
  //let BaseURL = 'https://sipcityapi.mobileprogramming.net/admin-login';

  return new Promise((resolve, reject) => {
    fetch('https://sipcityapi.mobileprogramming.net/admin-login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData, {
        "email": "ashok.amara@mobileprogrammingllc.com",
        "Password": "Mp96!*@#XhP"

      })
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        resolve(responseJSON);
      })
      .catch((error) => {
        reject(error);
      })



  });
}
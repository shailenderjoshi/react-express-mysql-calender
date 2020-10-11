
export const getFetch = ( url, method, params= {}) => {
    
    // GET Token and set header accordingly
    let myToken = getDataFromLocalStorage('token');
    let myHeader = '';
    if(myToken)
        myHeader = {'Authorization' : 'Bearer '+ myToken, "Content-Type" : "application/json"}
    else
        myHeader = {"Content-Type" : "application/json"}

    if(method === 'GET'){
        const queryString = Object.entries(params).map( param => {
            return `${param[0]}=${param[1]}`
        }).join('&')

        return fetch(`${url}?${queryString}`, {
            method : 'GET',
            headers : myHeader
        }).then( res => res.json())
    }

    if(method === 'POST'){
        var requestOptions = {
            method: 'POST',
            headers: myHeader,
            body: JSON.stringify(params)
        };
        return fetch(url, requestOptions).then( res => res.json() );
    }
}

export function getDataFromLocalStorage( key ) {
    if(localStorage.getItem('mylogin')){
        const localStorageObject = JSON.parse(localStorage.getItem('mylogin'));
        return localStorageObject[key];
    }
    return false;
}




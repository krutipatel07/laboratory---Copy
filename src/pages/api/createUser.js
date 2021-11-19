

export default function createUser(name,email,role,tier) {

var axios = require('axios');
var data = JSON.stringify({
    "collection": "users",
    "database": "users",
    "dataSource": "Cluster0",
    "document": {
        "name":name,
        "email": email,
        "role":role,
        "tier":tier,
        "projects":[]
    },
    "projection": {
        "_id": 1
    }
});
            
var config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-baqkb/endpoint/data/beta/action/insertOne',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'Q2EtDTGreFGXGf5aJCcwAutRklHEHiQpqfnBLtsciIgoJQEjsW2K250wuD6YYp41'
    },
    data : data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
};

createUser("kirti","kirti@maket.ca","client","student");
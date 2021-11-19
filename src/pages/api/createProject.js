
export default function createUser(title, description, budgetMin, budgetMax) {



var axios = require('axios');
var data = JSON.stringify({
    "collection": "projects",
    "database": "laboratory",
    "dataSource": "Cluster0",
    "document": {
        "title":title,
        "description":description
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
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Origin': 'http://localhost:3000/dashboard/projects/new',
        'Access-Control-Allow-Credentials': 'true',
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

//createUser('new project','home for me');
const axios = require('axios');

const CHANNELS =['orgainic','referral','Ads'];
const LOCATIONS =['USA','UK','Canada','India','Australia'];

function getRandomInt(min:number,max:number):number{
    return Math.floor(Math.random()*(max-min+1))+min;
}

async function generateDummyUsers() {
    const requests = [];

    for (let i=0;i<20;i++){
        const sessionDuration = getRandomInt(1,9);
        const start = new Date(Date.now()- getRandomInt(0,30)*86400000);
        const end = new Date(start.getTime()+sessionDuration*1000);
        const userData={
            userId:`user_${i}`,
            sessionStart:start,
            sessionEnd:end,
            sessionDuration:sessionDuration,
            channel:CHANNELS[getRandomInt(0,2)],
            location:LOCATIONS[getRandomInt(0,4)],
            revenue:getRandomInt(0,100),
        };
        requests.push(axios.post('http://localhost:3000/api/user',userData));
        try{
            await Promise.all(requests);
            console.log('Dummy users added successfully');                  
        }
        catch(err){
            console.error('Error in adding dummy users');
        }
    }  
    
}

generateDummyUsers();
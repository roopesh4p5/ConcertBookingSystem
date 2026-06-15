 
const axios = require('axios');

const bookSeat = async (userId) => {
  try {
    const response = await axios.post(
  'http://localhost:3000/api/bookings',
  {
    seatId: "C02",
    userId: userId
  }
);
    console.log(`User ${userId}: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error(`User ${userId}: "error" ${error}`);
  }
};

const main = async () => {
  const promises = [];
  for (let i = 5; i <= 105; i++) {
    promises.push(bookSeat(i));
    
  }
  await Promise.all(promises);
};


main();

main();
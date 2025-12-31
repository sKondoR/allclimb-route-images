// s/api/fetchData.js
// import { someDatabaseClient } from 'your-database-client';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     // Fetch data from remote server
//     const response = await fetch('https://remote-server.com/data');
//     const data = await response.json();

//     // Save data to database
//     // Example using some database client
//     const result = await someDatabaseClient.insert(data);

//     res.status(200).json({ message: 'Data fetched and saved successfully', result });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }
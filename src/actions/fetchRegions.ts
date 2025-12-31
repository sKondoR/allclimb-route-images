'use server';
import { getDatabase } from '@/lib/database';
import { Region } from '@/models/Region';

export async function fetchRegions() {
  try {
    console.log('here');
    const response = await fetch('https://www.allclimb.com/ru/guides/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed (e.g., authorization)
      },
      body: JSON.stringify({
        // Include the data you want to send in the POST request
        key: 'value', // Example payload
      }),
    });

    // https://www.allclimb.com/new_search_for/ POST searchfor=shi&lang=ru
    // https://www.allclimb.com/ru/guides/ POST
    // https://www.allclimb.com/ru/guides/Antalya/
    // https://www.allclimb.com/ru/guides/%D0%9A%D0%B0%D1%80%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D0%B5%D1%80%D0%B5%D1%88%D0%B5%D0%B5%D0%BA/BROKEN%20HEART/
    const { result } = await response.json();
    
    const { getMongoRepository } = await getDatabase();
    const regionRepo = getMongoRepository(Region);

    console.log('result: ', result);

    await regionRepo.clear();
    await regionRepo.save(result);
      
    return { success: true };
  } catch (error) {
    return { error: 'Failed to fetch data' };
  }
}


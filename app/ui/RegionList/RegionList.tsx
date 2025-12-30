import { getDatabase } from '@/lib/database';
import { Region } from '@/models/Region';

export default async function UsersPage() {
  const { getRepository } = await getDatabase();
  const repository = getRepository(Region);
  
  const regions = await repository.find();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      
      <ul className="space-y-2">
        {regions.map((region) => (
          <li key={region._id.toString()} className="p-4 border rounded">
            <div className="font-medium">{region.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
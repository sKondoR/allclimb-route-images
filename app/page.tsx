import { RegionList } from './ui/RegionList';
import { SearchForm } from './ui/SearchForm';

export default function Landing() {
  return (
    <div className="image-upload-container border-2 border-white/30 rounded-sm p-6 text-center hover:border-white/50 transition-colors">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Поиск по имени трассы на Allclimb
      </h1>
      <SearchForm />
      <RegionList />
    </div>
  );
}

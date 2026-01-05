import { PageDescription } from '@/app/ui/PageDescription';
import RouteInfo from '../ui/RouteInfo/RouteInfo';

export default async function RoutePage() {
  return (
  <>
    <div className="mt-3">
      <PageDescription>
        <div className="w-full text-right"></div>
      </PageDescription>
    </div>
    <RouteInfo />
  </>);
}
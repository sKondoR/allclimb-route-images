import { fetchSettings } from "@/app/actions/fetchSettings";
import type { ISettings } from "@/shared/types/ISettings";

export default async function ScrapStats() {
  const settings: ISettings[] = await fetchSettings(); 
  const {
      regions,
      regionsErrors,
      places,
      placesErrors,
      sectors,
      sectorsErrors,
      routes,
      scrapDate,
  } = settings[settings.length - 1].scrapStats;
  return (
    <div className="p-5 text-white/50 text-sm relative z-20">
      <div className="grid grid-cols-3">
        <div>{scrapDate}</div>
        <div className="col-span-2">обновление данных с Allclimb</div>
        <div></div>
        <div>всего</div>
        <div>ошибки загрузки</div>
        <div>регионов</div>
        <div>{regions}</div>
        <div>{regionsErrors}</div>
        <div>мест</div>
        <div>{places}</div>
        <div>{placesErrors}</div>
        <div>секторов</div>
        <div>{sectors}</div>
        <div>{sectorsErrors}</div>
        <div>трасс</div>
        <div>{routes}</div>
        <div></div>
      </div>
    </div>
  );
}

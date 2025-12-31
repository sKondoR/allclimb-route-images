import { getAllRegions } from '@/services/regionService';
import type { IRegion, IRegionNode } from '@/shared/types/IRegion';
import { fetchRegions } from '@/actions/fetchRegions';
import { TreeViewComponent } from './TreeViewComponent';
// import { fetchRegionChildren } from '@/actions/fetchRegionChildren'; // Предполагаем, что такая функция существует

export default async function RegionTree() {
  // Изначально загружаем все регионы (корневые)
  let regions: IRegion[] = await getAllRegions();

  if (!regions?.length) {
    await fetchRegions();
    regions = await getAllRegions();
  }

  // Преобразуем в древовидную структуру (упрощённо: предполагаем, что у регионов есть parentId)
  const buildTree = (regions: IRegion[]): IRegionNode[] => {
    const map = new Map<string, IRegionNode>();
    const roots: IRegionNode[] = [];

    // Инициализируем все узлы
    regions.forEach(region => {
      map.set(region._id.toString(), { ...region, children: [] });
    });

    // Строим дерево
    regions.forEach((region) => {
      // if (region.parentId) {
      //   const parent = map.get(region.parentId.toString());
      //   if (parent) {
      //     parent.children?.push(map.get(region._id.toString())!);
      //   }
      // } else {
        roots.push(map.get(region._id.toString())!);
      //}
    });

    return roots;
  };

  const treeData: IRegionNode[] = buildTree(regions);

  return <TreeViewComponent data={treeData} />;
}

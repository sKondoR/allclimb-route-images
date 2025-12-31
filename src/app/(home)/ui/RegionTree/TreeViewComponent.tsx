'use client'
import type { IRegionNode } from '@/shared/types/IRegion';
// import { fetchRegionChildren } from '@/actions/fetchRegionChildren'; // Предполагаем, что такая функция существует
import { useState } from 'react'; 
import { fetchRegionChildren } from '@/actions/fetchRegionChildren';

// Клиентский компонент для отображения дерева и обработки кликов
export function TreeViewComponent({ data }: { data: IRegionNode[] }) {
  const [tree, setTree] = useState<IRegionNode[]>(data);

  const toggleNode = async (id: string) => {
    setTree(prev => {
      const toggleRecursive = (nodes: IRegionNode[]): IRegionNode[] => {
        return nodes.map(node => {
          if (node._id.toString() === id) {
            // Если дети ещё не загружены — загружаем
            if (!node.children?.length || (node.children.length === 1 && !node.children[0].name)) {
              // Показ заглушки до загрузки
              fetchRegionChildren(id).then(children => {
                setTree(prev =>
                  prev.map(n => updateNodeChildren(n, id, children))
                );
              });
            }
            return { ...node, isOpen: !node.isOpen };
          } else if (node.children?.length) {
            return { ...node, children: toggleRecursive(node.children) };
          }
          return node;
        });
      };
      return toggleRecursive(prev);
    });
  };

  const updateNodeChildren = (node: IRegionNode, id: string, children: IRegionNode[]): IRegionNode => {
    if (node._id.toString() === id) {
      return { ...node, children, isOpen: true };
    }
    if (node.children) {
      return {
        ...node,
        children: node.children.map(child => updateNodeChildren(child, id, children))
      };
    }
    return node;
  };


  const renderTree = (nodes: IRegionNode[]) => {
    return (
      <ul className="ml-4">
        {nodes.map(node => (
          <li key={node._id.toString()} className="mb-1">
            <div
              onClick={() => toggleNode(node._id.toString())}
              className="cursor-pointer font-medium hover:underline flex items-center"
            >
              {node.children?.length ? (
                <span className="mr-1">
                  {node.isOpen ? '▼' : '►'}
                </span>
              ) : (
                <span className="w-4 mr-1"></span>
              )}
              {node.name}
            </div>
            {node.isOpen && node.children && renderTree(node.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-8">
      <h1 className="font-bold mb-2">Region Tree</h1>
      {renderTree(tree)}
    </div>
  );
};
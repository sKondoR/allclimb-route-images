interface TreeNode {
  id: string;
  name: string;
  hasChildren?: boolean;
  link?: string;
  country?: string;
  numroutes?: number;
  children?: TreeNode[];
  isExpanded?: boolean;
  isLoading?: boolean;
}

interface RecursiveTreeProps {
  initialData: TreeNode[];
  onNodeClick?: (node: TreeNode) => void;
}
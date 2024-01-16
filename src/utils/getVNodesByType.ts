import { isVNode, VNode, VNodeNormalizedChildren, VNodeTypes } from 'vue';

export const getVNodesByType = (type: VNodeTypes, target: VNodeNormalizedChildren, deep: boolean = false): VNode[] => {
  const nodes: VNode[] = [];

  if (Array.isArray(target)) {
    for (const node of target) {
      if (isVNode(node)) {
        if (node.type === type) {
          nodes.push(node);
          if (deep && node.children && Array.isArray(node.children)) nodes.push(...getVNodesByType(type, node.children, deep));
        } else if (node.children && Array.isArray(node.children)) {
          nodes.push(...getVNodesByType(type, node.children, deep));
        }
      } else if (Array.isArray(node)) {
        nodes.push(...getVNodesByType(type, node, deep));
      }
    }
  }

  return nodes;
};

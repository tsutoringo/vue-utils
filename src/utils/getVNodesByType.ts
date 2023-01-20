import { isVNode, VNode, VNodeArrayChildren, VNodeTypes } from 'vue';

export const getVNodesByType = (target: VNodeArrayChildren, type: VNodeTypes, deep: boolean = false): VNode[] => {
  const nodes: VNode[] = [];
  for (const node of target) {
    if (isVNode(node)) {
      if (node.type === type) {
        nodes.push(node);
        if (deep && node.children && Array.isArray(node.children)) nodes.push(...getVNodesByType(node.children, type, true));
      } else if (node.children && Array.isArray(node.children)) {
        nodes.push(...getVNodesByType(node.children, type));
      }
    }
  }

  return nodes;
};

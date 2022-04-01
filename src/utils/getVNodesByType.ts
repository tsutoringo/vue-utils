import { isVNode, VNode, VNodeArrayChildren, VNodeTypes } from 'vue';

export const getVNodesByType = (target: VNodeArrayChildren, type: VNodeTypes): VNode[] => {
  const nodes: VNode[] = [];
  for (const node of target) {
    if (isVNode(node)) {
      if (node.type === type) {
        nodes.push(node);
      } else if (node.children && Array.isArray(node.children)) {
        nodes.push(...getVNodesByType(node.children, type));
      }
    }
  }

  return nodes;
};

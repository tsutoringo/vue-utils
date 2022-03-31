import { isVNode, VNode, VNodeArrayChildren, VNodeTypes } from 'vue';

export const getVNodesByComponent = (target: VNodeArrayChildren, component: VNodeTypes): VNode[] => {
  const nodes: VNode[] = [];
  for (const node of target) {
    if (isVNode(node)) {
      if (node.type === component) {
        nodes.push(node);
      } else if (node.children && Array.isArray(node.children)) {
        nodes.push(...getVNodesByComponent(node.children, component));
      }
    }
  }

  return nodes;
};

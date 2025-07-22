export function flattenTreeData(treeData, level = 0, expandedRowIds) {
  let result = [];
  
  treeData.forEach(item => {
    const newItem = { ...item, level };
    result.push(newItem);
    
    // 如果有子节点且当前行是展开状态，则递归添加子节点
    if (item.children && item.children.length && expandedRowIds.has(item.id)) {
      result = result.concat(flattenTreeData(item.children, level + 1, expandedRowIds));
    }
  });
  
  return result;
}
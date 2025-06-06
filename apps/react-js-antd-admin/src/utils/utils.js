import { ascend } from "ramda";

/**
 * return menu routes
 */
export const menuFilter = (items) => {
  return items
    .filter((item) => {
      const show = item.meta?.key;
      if (show && item.children) {
        item.children = menuFilter(item.children);
      }
      return show;
    })
    .sort(ascend((item) => item.order || Number.POSITIVE_INFINITY));
};
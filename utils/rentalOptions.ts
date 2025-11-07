/**
 * 租赁系统选项数据
 * 统一管理所有枚举类型数据，后续将从数据库枚举表加载
 */

/**
 * 店铺列表
 */
export const stores = [
  { id: 26555, name: "绘光数码科技" },
  { id: 26812, name: "绘光数码分店" },
];

/**
 * 设备类型
 */
export const deviceTypes = [
  { id: 1, name: "Switch 续航版(破解)" },
  { id: 2, name: "Switch OLED 版(破解)" },
  { id: 3, name: "Switch 续航版(正版)" },
  { id: 4, name: "Switch OLED 版(正版)" },
  { id: 999, name: "其他" },
];

/**
 * 设备容量
 */
export const deviceCapacities = [
  { id: 1, name: "正版无需内存卡" },
  { id: 2, name: "64GB" },
  { id: 3, name: "256GB" },
  { id: 4, name: "512GB" },
  { id: 5, name: "1TB" },
];

/**
 * 手柄数量
 */
export const controllerCounts = [
  { id: 1, name: "1副手柄" },
  { id: 2, name: "2副手柄" },
  { id: 3, name: "3副手柄" },
  { id: 4, name: "4副手柄" },
];

/**
 * 租期时长
 */
export const rentalDurations = [
  { id: 1, name: "7天" },
  { id: 2, name: "15天" },
  { id: 3, name: "30天" },
  { id: 4, name: "60天" },
  { id: 5, name: "90天" },
  { id: 6, name: "365天" },
  { id: 999, name: "其他" },
];

/**
 * 快递平台
 */
export const expressVendors = [
  { id: 1, name: "顺丰速运" },
  { id: 2, name: "中通快递" },
  { id: 3, name: "京东物流" },
];

/**
 * 订单状态
 */
export const orderStatuses = [
  { id: 1, name: "待发货" },
  { id: 2, name: "已发货" },
  { id: 999, name: "已取消" },
];

/**
 * 辅助函数：根据ID获取店铺名称
 */
export function getStoreName(id: number): string {
  const store = stores.find((s) => s.id === id);
  return store ? store.name : "-";
}

/**
 * 辅助函数：根据ID获取设备类型名称
 */
export function getDeviceTypeName(id: number): string {
  const type = deviceTypes.find((t) => t.id === id);
  return type ? type.name : "-";
}

/**
 * 辅助函数：根据ID获取设备容量名称
 */
export function getDeviceCapacityName(id: number): string {
  const capacity = deviceCapacities.find((c) => c.id === id);
  return capacity ? capacity.name : "-";
}

/**
 * 辅助函数：根据ID获取手柄数量名称
 */
export function getControllerCountName(id: number): string {
  const count = controllerCounts.find((c) => c.id === id);
  return count ? count.name : "-";
}

/**
 * 辅助函数：根据ID获取租期时长名称
 */
export function getRentalDurationName(id: number): string {
  const duration = rentalDurations.find((d) => d.id === id);
  return duration ? duration.name : "-";
}

/**
 * 辅助函数：根据ID获取订单状态名称
 */
export function getOrderStatusName(id: number): string {
  const status = orderStatuses.find((s) => s.id === id);
  return status ? status.name : "-";
}

/**
 * 辅助函数：获取订单状态样式类
 */
export function getOrderStatusClass(id: string): string {
  const classes: Record<string, string> = {
    1: "bg-blue-100 text-blue-800",
    2: "bg-green-100 text-green-800",
    999: "bg-red-100 text-red-800",
  };
  return classes[id] || "bg-gray-100 text-gray-800";
}

/**
 * 检查是否为"其他"选项
 */
export function isOtherOption(id: number): boolean {
  return id === 999;
}

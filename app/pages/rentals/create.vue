<template>
  <div>
    <!-- 页面标题 -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">新建租赁订单</h1>
          <p class="mt-2 text-gray-600">创建新的设备租赁订单</p>
        </div>
        <NuxtLink
          to="/rentals"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          返回列表
        </NuxtLink>
      </div>
    </div>

    <!-- 自动识别（多行输入） -->
    <div class="bg-white shadow rounded-lg mb-6">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900">自动识别</h3>
          <button
            type="button"
            @click="handleAutoParse"
            :disabled="!form.autoParseText || !form.autoParseText.trim()"
            class="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            识别
          </button>
        </div>
        <label
          for="autoParseText"
          class="block text-sm font-medium text-gray-700"
          >请输入需要自动识别的内容</label
        >
        <textarea
          id="autoParseText"
          v-model="form.autoParseText"
          rows="4"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="可粘贴客服聊天、客户需求等文本，后续将自动解析填充表单"
        />
      </div>
    </div>

    <!-- 表单 -->
    <form @submit.prevent="handleSubmit" class="space-y-8">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
            基本信息
          </h3>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <!-- 订单编号 -->
            <div>
              <label
                for="orderNumber"
                class="block text-sm font-medium text-gray-700"
              >
                订单编号 <span class="text-red-500">*</span>
              </label>
              <input
                id="orderNumber"
                v-model="form.orderNumber"
                type="text"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="请输入订单编号"
              />
            </div>

            <!-- 所属店铺 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                所属店铺 <span class="text-red-500">*</span>
              </label>
              <div class="space-y-2">
                <label
                  v-for="store in stores"
                  :key="store.id"
                  class="flex items-center"
                >
                  <input
                    v-model="form.storeId"
                    :value="store.id"
                    type="radio"
                    required
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{
                    store.name
                  }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
            收件信息
          </h3>

          <div>
            <label
              for="shippingAddress"
              class="block text-sm font-medium text-gray-700"
            >
              收件信息 <span class="text-red-500">*</span>
            </label>
            <textarea
              id="shippingAddress"
              v-model="form.shippingAddress"
              required
              rows="3"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="请输入详细的收件地址、收件人姓名和联系电话"
            />
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
            设备信息
          </h3>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <!-- 设备类型 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                设备类型 <span class="text-red-500">*</span>
              </label>
              <div class="space-y-2">
                <label
                  v-for="type in deviceTypes"
                  :key="type.id"
                  class="flex items-center"
                >
                  <input
                    v-model="form.deviceType"
                    :value="type.id"
                    type="radio"
                    required
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{
                    type.name
                  }}</span>
                </label>
                <!-- 设备类型 - 其他 输入框 -->
                <div v-if="isOtherOption(form.deviceType)" class="mt-2">
                  <input
                    v-model="form.deviceTypeOther"
                    type="text"
                    placeholder="请输入其他设备类型"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <!-- 设备容量 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                设备容量 <span class="text-red-500">*</span>
              </label>
              <div class="space-y-2">
                <label
                  v-for="capacity in deviceCapacities"
                  :key="capacity.id"
                  class="flex items-center"
                >
                  <input
                    v-model="form.deviceCapacity"
                    :value="capacity.id"
                    type="radio"
                    required
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{
                    capacity.name
                  }}</span>
                </label>
              </div>
            </div>

            <!-- 手柄数量 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                手柄数量 <span class="text-red-500">*</span>
              </label>
              <div class="space-y-2">
                <label
                  v-for="controller in controllerCounts"
                  :key="controller.id"
                  class="flex items-center"
                >
                  <input
                    v-model="form.controllerCount"
                    :value="controller.id"
                    type="radio"
                    required
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{
                    controller.name
                  }}</span>
                </label>
              </div>
            </div>

            <!-- 预装游戏 -->
            <div>
              <label
                for="preinstalledGames"
                class="block text-sm font-medium text-gray-700"
              >
                破解版预装游戏/正版游戏卡带 <span class="text-red-500">*</span>
              </label>
              <textarea
                id="preinstalledGames"
                v-model="form.preinstalledGames"
                required
                rows="3"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="请输入预装游戏名称"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
            租期信息
          </h3>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <!-- 起始租期 -->
            <div>
              <label
                for="startDate"
                class="block text-sm font-medium text-gray-700"
              >
                起始租期 <span class="text-red-500">*</span>
              </label>
              <input
                id="startDate"
                v-model="form.startDate"
                type="date"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <!-- 租期时长 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                租期时长 <span class="text-red-500">*</span>
              </label>
              <div class="space-y-2">
                <label
                  v-for="duration in rentalDurations"
                  :key="duration.id"
                  class="flex items-center"
                >
                  <input
                    v-model="form.rentalDuration"
                    :value="duration.id"
                    type="radio"
                    required
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{
                    duration.name
                  }}</span>
                </label>
                <!-- 租期时长 - 其他 输入框 -->
                <div v-if="isOtherOption(form.rentalDuration)" class="mt-2">
                  <input
                    v-model="form.rentalDurationOther"
                    type="text"
                    placeholder="请输入其他租期时长（如：45天）"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <!-- 最晚发货时间 -->
            <div>
              <label
                for="latestShippingDate"
                class="block text-sm font-medium text-gray-700"
              >
                最晚发货时间 <span class="text-red-500">*</span>
              </label>
              <input
                id="latestShippingDate"
                v-model="form.latestShippingDate"
                type="datetime-local"
                step="1"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
            其他信息
          </h3>

          <div>
            <label
              for="remarks"
              class="block text-sm font-medium text-gray-700"
            >
              备注
            </label>
            <textarea
              id="remarks"
              v-model="form.remarks"
              rows="4"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="请输入备注信息（可选）"
            />
          </div>
        </div>
      </div>

      <!-- 错误提示 -->
      <div
        v-if="errorMessage"
        class="bg-red-50 border border-red-200 rounded-md p-4"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">提交失败</h3>
            <div class="mt-2 text-sm text-red-700">
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>

      <!-- 提交按钮 -->
      <div class="flex justify-end space-x-3">
        <NuxtLink
          to="/rentals"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          取消
        </NuxtLink>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            v-if="isSubmitting"
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ isSubmitting ? "提交中..." : "创建订单" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
// 导入统一的选项数据
import {
  stores,
  deviceTypes,
  deviceCapacities,
  controllerCounts,
  rentalDurations,
  isOtherOption,
} from "../../../utils/rentalOptions";

// 设置页面布局
definePageMeta({
  layout: "default",
});

// 表单数据
const form = ref({
  orderNumber: "",
  storeId: 1,
  shippingAddress: "",
  deviceType: 1,
  deviceTypeOther: "",
  deviceCapacity: 2,
  controllerCount: 1,
  preinstalledGames: "",
  startDate: "",
  rentalDuration: 2,
  rentalDurationOther: "",
  latestShippingDate: "",
  remarks: "",
  autoParseText: `2025-10-29 11:55:04
订单号：2025102911521560
店铺(26555)：绘光数码科技
订单续租：开启
订单结算比例：92.00%
续租每期费率：1.00%
寄出方式：包邮
归还方式：自付
直付通订单
人人租小程序
预租订单
交易规范订单
自选租期
支付宝免密代扣
服务详情
晚发必赔
缺货必赔
芝麻租物订单
注意事项
管控订单

预览
配件清单(7)
任天堂Switch 续航版游戏机 95新 租物
套餐： 到期须归还 主机+1副手柄+国行版本 64GB畅玩版，装满游戏开机即玩
租期： 2025-11-09~2025-11-23 (共15天)
押金：￥ 0.00
信用评估额度：￥1000.00
商品押金：￥1000.00
租金：108.00
详情
数量：1
运费：￥0.00
保险：￥0.00
实付款：￥108
详细
付款时间：2025-10-29 11:52:40
租金：
￥108.00/￥108.00
已结租金:￥0.00
收起
应付总费用：￥108.00
应付总租金：￥108.00
应付运费：￥0.00
优惠减免：￥0
实付金额：￥108.00
到期购买价：该商品未设置可到期购买
少少伟
18255566570
安徽省阜阳市颍州区颍西街道清河西路100号阜阳师范大学西湖校区第一生活区
注册手机: 18255566570
[一键隐藏]
[一键复制]
成功下单1次
累计下单1次
待发货
最晚发货时间：2025年11月07日 00:00:00
订单备注：【预租订单】：预租订单，待发货；【?月?日发货】；待发货[11月6日发货] 
认证资料： 王少伟  (341622200411080575) 人脸识别通过性别：男年龄：20会员等级：VIP0`,
});

// 状态
const isSubmitting = ref(false);
const errorMessage = ref("");

// 初始化表单
onMounted(() => {
  // 设置默认起始日期为今天+3天
  form.value.startDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
});
// 自动识别：从 autoParseText 解析并回填表单
const handleAutoParse = () => {
  try {
    const raw = (form.value.autoParseText || "").replace(/\r\n?/g, "\n");
    const lines = raw
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    // 1) 订单号/订单编号
    {
      const m = raw.match(/订单(?:号|编号)[：:]+\s*([A-Za-z0-9_-]+)/);
      if (m) form.value.orderNumber = m[1];
    }

    // 2) 店铺(123) -> storeId
    {
      const m = raw.match(/店铺[^\n]*?\((\d+)\)/);
      if (m) {
        const id = Number(m[1]);
        if (stores.some((s) => s.id === id)) form.value.storeId = id;
      }
    }

    // 3) 到期购买价 的下三行 -> shippingAddress（逗号分隔）
    {
      const idx = lines.findIndex((l) => l.includes("到期购买价"));
      if (idx !== -1) {
        const addr = [lines[idx + 1], lines[idx + 2], lines[idx + 3]]
          .filter(Boolean)
          .join("，");
        if (addr) form.value.shippingAddress = addr;
      }
    }

    // 4) 从“预览”到“租期”之间匹配 设备类型/容量/手柄数量
    {
      const sIdx = lines.findIndex((l) => l.includes("预览"));
      const eIdx = lines.findIndex((l) => l.includes("租期"));
      const between = sIdx !== -1 && eIdx !== -1 && eIdx > sIdx
        ? lines.slice(sIdx, eIdx + 1).join("\n")
        : raw;

      // 设备类型：根据"续航"/"OLED"和"畅玩"的组合匹配
      const has续航 = between.includes("续航");
      const hasOLED = between.includes("OLED");
      const has畅玩 = between.includes("畅玩");
      
      if (has续航 && has畅玩) {
        form.value.deviceType = 1; // Switch 续航版(破解)
      } else if (hasOLED && has畅玩) {
        form.value.deviceType = 2; // Switch OLED 版(破解)
      } else if (has续航 && !has畅玩) {
        form.value.deviceType = 3; // Switch 续航版(正版)
      } else if (hasOLED && !has畅玩) {
        form.value.deviceType = 4; // Switch OLED 版(正版)
      } else {
        form.value.deviceType = 999; // 其他
      }

      // 设备容量：先枚举名称，再兜底匹配 \d+(GB|TB)
      const capHit = deviceCapacities.find((c) => between.includes(c.name));
      if (capHit) {
        form.value.deviceCapacity = capHit.id;
      } else {
        const m = between.match(/(\d+)\s*(TB|GB)/i);
        if (m) {
          const val = (m[2].toUpperCase() === "TB")
            ? `${m[1]}TB`
            : `${m[1]}GB`;
          const cap = deviceCapacities.find((c) => c.name.toUpperCase() === val.toUpperCase());
          if (cap) form.value.deviceCapacity = cap.id;
        }
      }

      // 手柄数量：X副手柄/手柄X(副)
      const cm = between.match(/(\d+)\s*副?手柄|手柄\s*(\d+)\s*副?/);
      const cnum = cm ? Number(cm[1] || cm[2]) : undefined;
      if (cnum) {
        const ctrl = controllerCounts.find((c) => Number(c.id) === cnum);
        if (ctrl) form.value.controllerCount = ctrl.id;
      } else {
        const ctrlByName = controllerCounts.find((c) => between.includes(c.name));
        if (ctrlByName) form.value.controllerCount = ctrlByName.id;
      }
    }

    // 5) 租期：起始日期与天数
    {
      const rentLine = lines.find((l) => l.includes("租期")) || "";
      // 支持形如：2025-11-09~2025-11-23 (共15天)
      const dateRange = rentLine.match(/(20\d{2}-\d{1,2}-\d{1,2}).*?(20\d{2}-\d{1,2}-\d{1,2})/);
      if (dateRange) {
        const d = new Date(dateRange[1]);
        if (!isNaN(d.getTime())) {
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, "0");
          const dd = String(d.getDate()).padStart(2, "0");
          form.value.startDate = `${yyyy}-${mm}-${dd}`;
        }
      } else {
        const d1 = rentLine.match(/(20\d{2}-\d{1,2}-\d{1,2})/);
        if (d1) form.value.startDate = d1[1];
      }
      const dm = rentLine.match(/共\s*(\d+)\s*天|([0-9]+)\s*天/);
      const dnum = dm ? Number(dm[1] || dm[2]) : undefined;
      if (dnum) {
        const label = `${dnum}天`;
        const dur = rentalDurations.find((x) => x.name === label);
        if (dur) {
          form.value.rentalDuration = dur.id;
          form.value.rentalDurationOther = "";
        } else {
          form.value.rentalDuration = 999;
          form.value.rentalDurationOther = label;
        }
      }
    }

    // 6) 最晚发货时间：支持 “2025年11月07日 00:00:00” 或 “YYYY-MM-DD HH:mm[:ss]”
    {
      const latestLine = lines.find((l) => l.includes("最晚发货时间")) || "";
      let iso = "";
      let m1 = latestLine.match(/(20\d{2})年(\d{1,2})月(\d{1,2})日\s+(\d{1,2}):(\d{2})(?::(\d{2}))?/);
      if (m1) {
        const yyyy = m1[1];
        const mm = String(Number(m1[2])).padStart(2, "0");
        const dd = String(Number(m1[3])).padStart(2, "0");
        const HH = String(Number(m1[4])).padStart(2, "0");
        const MM = m1[5];
        const SS = m1[6] ? m1[6] : "00";
        iso = `${yyyy}-${mm}-${dd}T${HH}:${MM}:${SS}`;
      } else {
        const m2 = latestLine.match(/(20\d{2}-\d{1,2}-\d{1,2})\s+(\d{1,2}:\d{2}(?::\d{2})?)/);
        if (m2) {
          const d = new Date(`${m2[1]} ${m2[2]}`.replace(/-/g, "/"));
          if (!isNaN(d.getTime())) {
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, "0");
            const dd = String(d.getDate()).padStart(2, "0");
            const HH = String(d.getHours()).padStart(2, "0");
            const MM = String(d.getMinutes()).padStart(2, "0");
            const SS = String(d.getSeconds()).padStart(2, "0");
            iso = `${yyyy}-${mm}-${dd}T${HH}:${MM}:${SS}`;
          }
        }
      }
      if (iso) form.value.latestShippingDate = iso;
    }

    console.log("[AutoParse] 解析完成:", JSON.stringify(form.value, null, 2));
  } catch (e) {
    console.error("自动识别失败:", e);
  }
};

// 提交表单
const handleSubmit = async () => {
  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    // 额外校验：当选择"其他"时需填写自定义内容
    if (
      isOtherOption(form.value.deviceType) &&
      !form.value.deviceTypeOther.trim()
    ) {
      errorMessage.value = "请选择设备类型或填写其他设备类型";
      isSubmitting.value = false;
      return;
    }

    if (
      isOtherOption(form.value.rentalDuration) &&
      !form.value.rentalDurationOther.trim()
    ) {
      errorMessage.value = "请选择租期时长或填写其他租期时长";
      isSubmitting.value = false;
      return;
    }

    // 这里可以调用API提交数据
    console.log("提交表单数据:", form.value);

    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 提交成功后跳转到租赁列表
    await navigateTo("/rentals");
  } catch (error) {
    errorMessage.value = "提交失败，请重试";
    console.error("提交失败:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

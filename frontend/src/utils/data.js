import {
    LuGauge,
    LuMonitor,
    LuCupSoda,
    LuUtensils,
    LuMonitorCheck,
    LuMilkOff,
    LuArrowLeftRight,
    LuReceipt,
    LuUser,
    LuActivity,
    LuSettings,
    LuLogOut

} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuGauge,
        path: "/dashboard",
    },
    {
        id: "02",
        label: "POS",
        icon: LuMonitor,
        path: "/dashboard/pos",
    },
    {
        id: "03",
        label: "Products",
        icon: LuCupSoda,
        path: "/dashboard/products",
    },
    {
        id: "04",
        icon: LuUtensils,
        label: "Ingredients & Materials",
        path: "/dashboard/ingredients",
    },
    {
        id: "05",
        icon: LuMonitorCheck,
        label: "Stock In",
        path: "/dashboard/stocks",
    },
    {
        id: "06",
        icon: LuMilkOff,
        label: "Spoiled & Damaged",
        path: "/dashboard/spoilage",
    },
    {
        id: "07",
        icon: LuArrowLeftRight,
        label: "Transactions",
        path: "/dashboard/transactions",
    },
    {
        id: "08",
        icon: LuReceipt,
        label: "Sales",
        path: "/dashboard/sales",
    },
    {
        id: "09",
        icon: LuUser,
        label: "Users",
        path: "/dashboard/users",
    },
    {
        id: "10",
        icon: LuActivity,
        label: "Activity Logs",
        path: "/dashboard/logs",
    },
    {
        id: "11",
        icon: LuSettings,
        label: "Settings",
        path: "/dashboard/settings",
    },
    {
        id: "12",
        icon: LuLogOut,
        label: "Logout",
        path: "logout",
    },
];
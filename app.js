/**
 * Freizeitsport München - Sportarten-Visualisierung
 * Daten: opendata.muenchen.de
 * Version: 1.0.0
 */

const DATA_URL = 'hallensportprogramm_2025_2026.csv';

// Sport Icons (SVG) - smooth, rounded style
const SPORT_ICONS = {
    "Basketball": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/><path d="M5.6 5.6c3 3.5 3 8.3 0 11.8"/><path d="M18.4 5.6c-3 3.5-3 8.3 0 11.8"/></svg>`,
    "BodyART": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5v6"/><path d="M12 9q-4 0-6 3"/><path d="M12 9q4 0 6 3"/><path d="M12 12.5L8 21"/><path d="M12 12.5L16 21"/></svg>`,
    "Bodystyling": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5v5"/><path d="M12 9L8 10L9 14"/><path d="M12 9L16 10L15 14"/><path d="M12 11.5L10 21"/><path d="M12 11.5L14 21"/></svg>`,
    "Core Power": `<svg viewBox="0 0 24 24" fill="none" stroke="none"><path d="M6 2.5C6 1.5 7 1 8 1h2.5c1 0 1.5.5 1.5 1.5v5c0 1-.5 1.5-1.5 1.5H8c-1 0-2-.5-2-1.5v-5z" fill="currentColor"/><path d="M12 2.5c0-1 .5-1.5 1.5-1.5H16c1 0 2 .5 2 1.5v5c0 1-1 1.5-2 1.5h-2.5c-1 0-1.5-.5-1.5-1.5v-5z" fill="currentColor"/><path d="M6.5 10c0-.8.5-1.2 1.5-1.2h2c1 0 1.5.4 1.5 1.2v4.5c0 .8-.5 1.2-1.5 1.2H8c-1 0-1.5-.4-1.5-1.2V10z" fill="currentColor"/><path d="M12.5 10c0-.8.5-1.2 1.5-1.2h2c1 0 1.5.4 1.5 1.2v4.5c0 .8-.5 1.2-1.5 1.2h-2c-1 0-1.5-.4-1.5-1.2V10z" fill="currentColor"/><path d="M7.5 17c0-.6.4-1 1.2-1h1.6c.8 0 1.2.4 1.2 1v4c0 .8-.4 1.5-1.2 1.5H8.7c-.8 0-1.2-.7-1.2-1.5v-4z" fill="currentColor"/><path d="M12.5 17c0-.6.4-1 1.2-1h1.6c.8 0 1.2.4 1.2 1v4c0 .8-.4 1.5-1.2 1.5h-1.6c-.8 0-1.2-.7-1.2-1.5v-4z" fill="currentColor"/></svg>`,
    "Eltern-Kind-Turnen": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="4" r="2.5"/><path d="M8 6.5v5"/><path d="M8 9L5 12"/><path d="M8 9L12 8"/><path d="M8 11.5L6 20"/><path d="M8 11.5L10 20"/><circle cx="16" cy="7" r="2"/><path d="M16 9v3"/><path d="M16 10L14 8"/><path d="M16 10L18 8"/><path d="M16 12L15 17"/><path d="M16 12L17 17"/></svg>`,
    "Fatburn": `<svg viewBox="0 0 24 24" fill="none" stroke="none"><path d="M12 1c-4 5-7 9-7 14c0 4 3 7 7 7s7-3 7-7c0-5-3-9-7-14z" fill="currentColor"/><path d="M7.5 3c-2 2-3.5 4-3.5 7c0 2 1 3 2.5 3c1.5 0 2.5-1 2.5-2.5c0-2.5-1-5-1.5-7.5z" fill="currentColor"/><path d="M12 22c-2.5 0-4-1.5-4-4c0-3 2-5.5 4-8c2 2.5 4 5 4 8c0 2.5-1.5 4-4 4z" fill="white"/></svg>`,
    "Female Moves": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5v5"/><path d="M12 8L7 6"/><path d="M12 8L17 10"/><path d="M12 11.5L9 21"/><path d="M12 11.5L16 19"/></svg>`,
    "Fitness Classic": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="12" x2="17" y2="12"/><rect x="4" y="6" width="3" height="12" fill="currentColor" stroke="none"/><rect x="17" y="6" width="3" height="12" fill="currentColor" stroke="none"/><rect x="2" y="8" width="2" height="8" fill="currentColor" stroke="none"/><rect x="20" y="8" width="2" height="8" fill="currentColor" stroke="none"/></svg>`,
    "Fitness Power": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="3" height="12" fill="currentColor" stroke="none"/><rect x="17" y="6" width="3" height="12" fill="currentColor" stroke="none"/><rect x="2" y="8" width="2" height="8" fill="currentColor" stroke="none"/><rect x="20" y="8" width="2" height="8" fill="currentColor" stroke="none"/><line x1="7" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="17" y2="12"/><circle cx="12" cy="12" r="4"/><path d="M12 9L10.5 12H12.5L11 15L14 11H11.5L13 9Z" fill="currentColor" stroke="none"/></svg>`,
    "Functional Training": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    "Generation plus": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M7 12h10"/></svg>`,
    "HIIT": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l3 8 6-16 3 8h4"/></svg>`,
    "Kickbox-Power": `<svg viewBox="0 0 4096 4096" fill="none" stroke="none"><path d="M 923.646 736.968 C 1114.57 720.766 1136.03 791.45 1223.44 923.385 C 1225.11 953.355 1223.26 963.387 1229.76 994.007 C 1402.93 977.78 1439.81 904.035 1630.41 1009.5 C 1693.31 1044.31 1672.75 1041.88 1750.9 1054.83 C 1854.13 1071.92 2011.56 1116.38 2107.9 1121.86 C 2188.57 1072.62 2292.23 1078.23 2367.2 1138.82 C 2407.76 1171.59 2371.25 1262.25 2347.66 1300.76 C 2293.99 1379.62 2166.11 1363.22 2107.9 1300.25 C 1935.81 1316.42 1761.83 1299.19 1589.51 1295.15 C 1593.92 1338.69 1650.1 1434.54 1691.62 1453.52 C 1746.36 1478.55 1814 1495.48 1871.96 1515.71 C 2035.83 1450.12 2195.5 1393.08 2370.3 1363.36 C 2382.68 1361.26 2463.63 1348.29 2469.75 1344.2 C 2544.24 1294.49 2620.97 1247.79 2708.02 1222.49 C 2830.79 1190.69 3063.93 1179.91 3168.98 1116.22 C 3263.26 1059.06 3283.56 903.642 3406.72 893.142 C 3502.54 884.009 3568.42 969.327 3534.79 1057.25 C 3508.17 1126.82 3456.52 1204.11 3410.44 1262.4 C 3359.42 1326.94 3289.52 1307.96 3221.35 1312.65 C 3213.15 1317.99 3202.15 1323.64 3193.22 1327.7 C 3080.41 1378.99 2999.95 1443.95 2875.84 1488.25 C 2815.91 1509.64 2748.69 1516.2 2692.09 1546.77 C 2568.81 1617.14 2442.3 1760.21 2308.61 1818.85 C 2261.03 1848.65 2067.99 1957.88 2049.98 1975.82 C 2015.28 2033.69 1970.15 2138.87 1939.79 2204.34 C 1936.42 2211.61 1925.18 2267.38 1921.28 2281.32 L 1875.71 2438.44 C 1868.23 2463.8 1838.79 2547.07 1843.18 2564.03 C 1865.72 2649.06 1892.17 2726.35 1878 2816.89 C 1851.8 2984.36 1698.6 3184.27 1751.33 3345.6 C 1765.59 3389.23 1789.67 3442 1753.06 3482.38 C 1685.08 3557.37 1434.33 3529.29 1334.32 3529.86 C 1269.8 3533.9 1180.8 3516.1 1181.44 3433.99 C 1183.36 3347.75 1266.5 3353.62 1320.3 3338.13 C 1377.41 3321.7 1448.6 3296.86 1497.87 3262.47 C 1511.94 3252.64 1524.92 2725.21 1525.46 2669.73 C 1525.63 2652.27 1497.61 2599.9 1491.51 2578.06 C 1436.01 2379.05 1459.44 2235.99 1454.35 2045.45 C 1374.96 1892.17 1243.13 1827.18 1091.56 1752.58 C 1012.97 1878.69 905.517 1949.66 756.958 1876.07 C 646.445 1821.34 660.74 1681 618.6 1607.13 C 595.597 1566.82 568.835 1549.67 553.901 1501.2 C 507.789 1358.66 617.152 1287.21 724.647 1231.12 C 771.322 1206.77 813.337 1169.69 864.44 1154.26 L 862.864 1152.33 C 848.581 1135.27 712.768 1113.39 748.571 1015.59 C 744.798 1007.4 740.769 999.201 736.985 991.057 C 671.511 850.163 802.136 761.949 923.646 736.968 z M 1229.76 1048.79 C 1198.67 1266.92 1089.62 1260.96 908.089 1189.17 C 903.684 1187.43 691.906 1314.49 669.671 1328.04 C 617.993 1368.45 601.606 1430.64 619.76 1492.11 C 631.904 1533.24 667.769 1559.04 681.845 1592.88 C 720.658 1686.21 721.258 1838.77 849.997 1849.64 C 1005.99 1862.82 1067.22 1651.64 1150.73 1538.17 C 1125.34 1518.46 1081.33 1495.59 1050.02 1486.09 C 1044.56 1484.44 1025.69 1517.49 1020.93 1522.49 C 977.445 1568.28 921.533 1608.03 882.143 1653.13 C 863.661 1674.29 854.331 1747.85 803.717 1721.17 C 747.123 1691.33 877.486 1578.57 895.023 1558.5 C 875.475 1529.03 791.979 1438.57 882.268 1446.76 C 895.298 1447.94 925.556 1495.71 938.693 1506.83 L 948.984 1515.71 C 959.46 1502.68 972.62 1487.16 982.068 1473.7 C 1023.93 1403.93 1040.15 1280.77 1128.89 1257.44 C 1185.05 1242.68 1252.49 1262.84 1298.86 1292.19 C 1454.15 1390.5 1292.87 1463.97 1225.34 1534.65 C 1188.1 1573.63 1151.9 1661.71 1117.22 1706.9 C 1156.14 1720.22 1257.63 1788.38 1280.86 1776.74 C 1387.86 1723.1 1486.74 1654.61 1570.21 1568.5 C 1594.33 1543.62 1615.03 1512.92 1638.95 1489.29 C 1519 1373.29 1560.51 1352.7 1510.88 1246.12 C 1510.38 1245.03 1414.76 1152.95 1495.35 1163.11 C 1532.92 1167.85 1558.02 1215.68 1579.89 1241.32 C 1673.69 1242.9 1765.81 1251.25 1863.77 1252.31 C 1867.63 1235 1878.92 1150.21 1874.66 1134.76 C 1858.13 1124.48 1691.86 1100.72 1661.74 1092.7 C 1644.29 1088.05 1624.22 1070.08 1608.39 1061.07 C 1542.43 1023.56 1481.37 999.917 1404.79 1006.68 C 1348.45 1018.36 1287.35 1035.26 1229.76 1048.79 z M 1871.96 1576.25 C 1815.95 1551.27 1827.34 1566.36 1795.03 1610.27 C 1709.54 1726.46 1571.26 1852.77 1437.71 1910.98 C 1460.91 1942.62 1499.65 1995.59 1519.64 2028.04 C 1521.73 2065.37 1517.33 2103.52 1519.64 2142.43 C 1530.84 2133.8 1541.72 2125.38 1554.83 2119.72 C 1646.73 2077.45 1820.56 2057.28 1910.18 2110.63 L 1915.47 2110.3 C 1933.14 2087.85 1943.63 2000.74 1966.6 1973.7 C 2010.97 1921.49 2082.63 1891.99 2140.01 1855.59 C 1957.56 1705.26 2064.88 1524 2055.8 1504.84 L 2049.98 1504.16 C 2007.53 1526.11 1905.68 1550.57 1871.96 1576.25 z M 1515.68 2211.62 C 1514.9 2327.75 1523.14 2439.68 1552.32 2551.98 C 1559.5 2579.62 1588.78 2641.73 1589.76 2663.1 C 1595.21 2781.75 1570.92 2933.86 1584.22 3044 C 1620.89 3050.44 1664.87 3058.1 1701.8 3061.19 C 1710.35 3061.34 1719.49 3061.7 1727.98 3061.19 C 1764.73 2913.11 1846.08 2845.22 1803.06 2664.07 C 1793.23 2622.68 1771.22 2589.19 1778.66 2544.06 C 1798.9 2421.31 1874.48 2280.36 1880.78 2159.11 C 1834.97 2134.71 1779.12 2128.68 1727.98 2132.38 C 1657.27 2131.4 1567.12 2163.54 1515.68 2211.62 z M 2186.65 1818.85 C 2235.91 1837.99 2576.74 1547.63 2653 1503.19 C 2713.99 1467.65 2791.7 1461.93 2857.45 1437.74 C 2931.06 1411.88 2987.89 1375.67 3055.43 1339.45 C 3044.77 1303.57 3015.18 1227.57 2967.86 1228.38 C 2805.19 1276.62 2751.91 1242.94 2582.68 1338.69 C 2547.54 1356.85 2523.62 1389 2483.92 1396.54 C 2414.46 1409.9 2170.09 1438.58 2134.27 1498.53 C 2069.74 1606.56 2086.98 1736.02 2186.65 1818.85 z M 827.597 1024.09 C 817.325 1033.24 814.469 1037.69 806.419 1048.79 C 832.058 1087 832.468 1084.81 877.671 1081.53 C 922.564 1125.79 945.716 1149.57 1007.54 1168.46 C 1029.81 1174.39 1087.61 1191.09 1106.25 1178.32 C 1221.26 1099.6 1177.59 767.199 948.984 786.971 C 815.351 799.157 735.074 898.966 827.597 1024.09 z M 2263.08 1300.25 C 2303.65 1270.76 2307.13 1230.22 2327.04 1184.24 C 2301.72 1155.77 2244.12 1131.92 2206.84 1145.07 C 2186.42 1146.97 2181.05 1147.16 2161.55 1154.26 C 2154.1 1188.72 2133.56 1225.69 2154.64 1259.61 C 2175.87 1293.77 2225.19 1306.88 2263.08 1300.25 z M 1579.89 3098.75 C 1581.57 3118.23 1577.55 3159.79 1584.53 3168.32 C 1592.7 3173.22 1685.77 3190.85 1686.94 3175.02 C 1689.44 3158.64 1700.42 3126.79 1707.08 3111.47 C 1662.76 3111.8 1611.02 3097.93 1579.89 3098.75 z M 1935.31 1252.31 C 1977.93 1254.5 2033.56 1252.09 2077.73 1252.31 C 2079.26 1250.51 2087.22 1184.86 2086.29 1177.35 C 2080.31 1171.94 1955.95 1145.25 1942.25 1145.07 C 1936 1182.8 1934.61 1214.48 1935.31 1252.31 z M 3055.43 1211.67 C 3090.38 1249.56 3095.31 1281.67 3114.78 1304.59 C 3128.65 1297.24 3176.1 1277.9 3180.84 1265.85 C 3187.22 1249.61 3148.53 1187.45 3126.83 1192.43 C 3100.87 1201.44 3080.96 1204.25 3055.43 1211.67 z M 1579.89 3223.42 C 1568.32 3243.6 1570.31 3265.6 1559.3 3284.48 C 1532.23 3330.93 1372.48 3382.33 1324.54 3392.62 C 1299.29 3398.03 1283.76 3397.25 1259.04 3407.36 C 1205.72 3486.03 1335.19 3476.26 1377.88 3476 L 1563.25 3476.14 C 1664.95 3476.35 1732.62 3493.23 1688.3 3361.77 C 1674.72 3321.48 1671.53 3272.59 1671.56 3233.25 C 1633.68 3232.56 1617.21 3230.39 1579.89 3223.42 z M 1150.73 1304.59 C 1120.26 1322 1072.3 1400.62 1075.06 1430.92 C 1082.62 1438.05 1166.5 1480.53 1182.45 1489.29 L 1206.74 1473.7 C 1232.58 1451.33 1296.77 1409.73 1297.58 1378.89 C 1298.81 1331.93 1192.11 1303.33 1150.73 1304.59 z M 1701.8 1515.71 L 1699.32 1517.77 C 1679.92 1533.99 1667.59 1553 1650.82 1571.11 C 1538.44 1692.42 1453.33 1740.32 1318.4 1818.85 C 1343.76 1835.37 1372.77 1851.05 1396.86 1868.1 C 1416.6 1870.48 1526.14 1794.98 1547.6 1778.4 C 1639.33 1707.57 1706.6 1634.32 1770.56 1538.17 C 1752.53 1534.26 1708.48 1515.9 1701.8 1515.71 z M 3265.5 1260.35 C 3333.32 1262.24 3344.16 1251.26 3381.27 1197.17 C 3408.5 1157.48 3560.13 936.452 3415.03 944.487 C 3352.98 954.697 3283.07 1108.41 3198.86 1168.46 C 3240.68 1206.58 3236.8 1260.05 3265.5 1260.35 z" fill="currentColor"/></svg>`,
    "Mobility Stretching": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="6" r="2.5"/><path d="M8 8.5L16 12"/><path d="M16 12L20 10"/><path d="M8 8.5L4 18"/><path d="M8 8.5L12 16L16 20"/></svg>`,
    "Nordic Walking": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="3" r="2.5"/><path d="M10 5.5v5"/><path d="M10 8L7 10L3 21"/><path d="M10 8L14 10L18 21"/><path d="M10 10.5L7 20"/><path d="M10 10.5L14 18"/></svg>`,
    "Pilates": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="4" cy="16" r="2"/><path d="M6 16h10"/><path d="M16 16L20 8"/><path d="M16 16L22 10"/><path d="M2 20h20"/></svg>`,
    "Power Circuit": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2"/></svg>`,
    "Qi Gong": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18a4.5 4.5 0 0 1 0-9a4.5 4.5 0 0 0 0-9" fill="currentColor" stroke="none"/><circle cx="12" cy="7.5" r="1.2" stroke-width="1.2"/><circle cx="12" cy="16.5" r="1.2" stroke-width="1.2"/></svg>`,
    "Rücken Fitness": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M6 10 Q6 7 12 6.5 Q18 7 18 10"/><path d="M8 10 L12 18 L16 10"/><path d="M12 7 L12 18"/></svg>`,
    "Silent Disco": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17v-5a8 8 0 0 1 16 0v5"/><rect x="2" y="14" width="4" height="6" rx="1" fill="currentColor" stroke="none"/><rect x="18" y="14" width="4" height="6" rx="1" fill="currentColor" stroke="none"/></svg>`,
    "Step Power": `<svg viewBox="0 0 24 24" fill="none" stroke="none"><path d="M2 22V18H6V14H10V10H14V6H18V2H22V22Z" fill="currentColor"/></svg>`,
    "Volleyball": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3q4 3 4 9t-4 9"/><path d="M12 3q-4 3-4 9t4 9"/><path d="M3 12q3-4 9-4t9 4"/></svg>`,
    "Yoga": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5v5"/><path d="M12 9L8 12"/><path d="M12 9L16 12"/><path d="M8 12q4 3 8 0"/><path d="M6 15h12"/><path d="M8 20q4-2 8 0"/></svg>`,
    "Zirkuskünste": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="2.5"/><path d="M12 12.5v5"/><path d="M12 14L8 11"/><path d="M12 14L16 11"/><path d="M12 17.5L10 22"/><path d="M12 17.5L14 22"/><circle cx="6" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none"/><circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none"/></svg>`,
    "Zumba": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M12 6.5L13 12"/><path d="M13 9L9 6"/><path d="M13 9L17 7"/><path d="M13 12L9 21"/><path d="M13 12L17 19"/></svg>`
};

// Active state icons (black on white background) - only for icons that need different rendering
const SPORT_ICONS_ACTIVE = {
    "Qi Gong": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18a4.5 4.5 0 0 1 0-9a4.5 4.5 0 0 0 0-9" fill="currentColor" stroke="none"/><circle cx="12" cy="7.5" r="1.2" fill="white" stroke="none"/><circle cx="12" cy="16.5" r="1.2" fill="currentColor" stroke="none"/></svg>`,
    "Fatburn": `<svg viewBox="0 0 24 24" fill="none" stroke="none"><path d="M12 1c-4 5-7 9-7 14c0 4 3 7 7 7s7-3 7-7c0-5-3-9-7-14z" fill="currentColor"/><path d="M7.5 3c-2 2-3.5 4-3.5 7c0 2 1 3 2.5 3c1.5 0 2.5-1 2.5-2.5c0-2.5-1-5-1.5-7.5z" fill="currentColor"/></svg>`
};

/**
 * Get icon for a sport, optionally for active state
 */
function getIcon(sport, isActive = false) {
    if (isActive && SPORT_ICONS_ACTIVE[sport]) {
        return SPORT_ICONS_ACTIVE[sport];
    }
    return SPORT_ICONS[sport] || SPORT_ICONS["Fitness Classic"];
}

// Sport name mapping (CSV name -> Display name)
const SPORT_NAME_MAP = {
    "BodyART®": "BodyART",
    "Core - Power für Bauch und Rücken": "Core Power",
    "Fitness für Frauen": "Fitness Classic",
    "HIIT - High.intensity interval training": "HIIT",
    "Mobility Streching": "Mobility Stretching",
    "Power Circuit Training": "Power Circuit",
    "Rücken Fitness": "Rücken Fitness",
    "Silent Disco Groove": "Silent Disco",
    "Zirkuskünste Eltern-Kind-Turnen": "Zirkuskünste"
};

// Day abbreviations
const DAY_MAP = {
    "Montag": "Mo",
    "Dienstag": "Di",
    "Mittwoch": "Mi",
    "Donnerstag": "Do",
    "Freitag": "Fr",
    "Samstag": "Sa",
    "Sonntag": "So"
};

// State
let kurse = [];
let sportarten = [];
let sportCounts = {};
let currentSportIndex = 0;
let isPlaying = true;
let autoPlayInterval = null;
let map = null;
let markerElements = [];

// DOM Elements
const elements = {};

/**
 * Initialize the application
 */
async function init() {
    cacheElements();
    await loadData();
    initMap();
    createMarkers();
    createPills();
    setupEventListeners();
    showSport(sportarten[0]);
    startAutoPlay();
}

/**
 * Cache DOM elements
 */
function cacheElements() {
    elements.loading = document.getElementById('loading');
    elements.sportIcon = document.getElementById('sportIcon');
    elements.sportName = document.getElementById('sportName');
    elements.sportCount = document.getElementById('sportCount');
    elements.sportPills = document.getElementById('sportPills');
    elements.uiPanel = document.querySelector('.ui-panel');
    elements.detailCard = document.getElementById('detailCard');
    elements.detailOverlay = document.getElementById('detailOverlay');
    elements.detailTitle = document.getElementById('detailTitle');
    elements.detailTime = document.getElementById('detailTime');
    elements.detailLocation = document.getElementById('detailLocation');
    elements.detailClose = document.getElementById('detailClose');
    elements.infoModal = document.getElementById('infoModal');
    elements.infoOverlay = document.getElementById('infoOverlay');
    elements.infoClose = document.getElementById('infoClose');
}

/**
 * Load and parse CSV data from Open Data Portal
 */
async function loadData() {
    try {
        console.log('Fetching:', DATA_URL);
        const response = await fetch(DATA_URL);
        console.log('Response status:', response.status);
        const csvText = await response.text();
        console.log('CSV length:', csvText.length);
        kurse = parseCSV(csvText);
        console.log('Parsed courses:', kurse.length);

        // Count sports and create sorted list
        sportCounts = {};
        kurse.forEach(k => {
            sportCounts[k.sport] = (sportCounts[k.sport] || 0) + 1;
        });

        sportarten = Object.entries(sportCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([sport]) => sport);

        if (elements.loading) {
            elements.loading.style.display = 'none';
        }
    } catch (error) {
        console.error('Error loading data:', error);
        if (elements.loading) {
            elements.loading.textContent = 'Fehler beim Laden der Daten';
        }
    }
}

/**
 * Parse CSV text into structured data
 */
function parseCSV(csvText) {
    // Remove BOM if present
    if (csvText.charCodeAt(0) === 0xFEFF) {
        csvText = csvText.slice(1);
    }

    // Normalize line endings
    csvText = csvText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    const lines = csvText.trim().split('\n');
    const headers = parseCSVLine(lines[0]);
    const result = [];

    console.log('CSV Headers:', headers);
    console.log('Total lines:', lines.length);

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length < headers.length) continue;

        const lat = parseFloat(values[11]);
        const lng = parseFloat(values[12]);

        if (isNaN(lat) || isNaN(lng)) continue;

        let sportName = values[0].trim();
        sportName = SPORT_NAME_MAP[sportName] || sportName;

        const tag = DAY_MAP[values[2]] || values[2];
        const zeitStart = values[3];
        const zeitEnd = values[4];
        const strasse = values[5];
        const hausnummer = values[6];
        const stadtteil = values[8];

        // Extract description/details (e.g., age groups)
        const beschreibung = values[1].trim();

        result.push({
            sport: sportName,
            beschreibung: beschreibung,
            lat: lat,
            lng: lng,
            tag: tag,
            zeit: `${zeitStart}-${zeitEnd}`,
            ort: `${strasse} ${hausnummer}${stadtteil ? ', ' + stadtteil : ''}`,
            webseite: values[13] ? values[13].trim() : ''
        });
    }

    return result;
}

/**
 * Parse a single CSV line (handling quoted fields)
 */
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());

    return result;
}

/**
 * Initialize Leaflet map
 */
function initMap() {
    map = L.map('map', {
        zoomControl: false,
        attributionControl: false
    }).setView([48.137154, 11.576124], 12);

    // Dark base layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Labels layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 20,
        opacity: 0.6
    }).addTo(map);
}

/**
 * Create map markers for all courses
 */
function createMarkers() {
    markerElements = [];

    kurse.forEach((kurs, index) => {
        const marker = L.marker([kurs.lat, kurs.lng], {
            icon: L.divIcon({
                className: 'marker-container',
                html: `<div class="marker-dot" data-sport="${kurs.sport}" data-index="${index}"></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            }),
            zIndexOffset: 0
        }).addTo(map);

        // Direct click handler on Leaflet marker
        marker.on('click', () => {
            const dot = marker.getElement()?.querySelector('.marker-dot');
            if (dot && dot.classList.contains('active')) {
                showDetail(index);
            }
        });

        markerElements.push({ marker, sport: kurs.sport, index });
    });
}

/**
 * Create sport filter pills
 */
function createPills() {
    if (!elements.sportPills) return;

    elements.sportPills.innerHTML = '';

    sportarten.forEach((sport, index) => {
        const pill = document.createElement('div');
        pill.className = 'sport-pill';
        pill.innerHTML = getIcon(sport, false);
        pill.dataset.sport = sport;
        pill.dataset.index = index;
        pill.addEventListener('click', () => handlePillClick(index));
        elements.sportPills.appendChild(pill);
    });
}

/**
 * Handle pill click
 */
function handlePillClick(index) {
    currentSportIndex = index;
    showSport(sportarten[index]);
    stopAutoPlay();
    isPlaying = false;
}

// Track current active sport for transitions
let currentActiveSport = null;
let isTransitioning = false;

/**
 * Show a specific sport with smooth transition
 */
function showSport(sport, skipTransition = false) {
    // Skip if already showing this sport or currently transitioning
    if (sport === currentActiveSport) return;
    if (isTransitioning && !skipTransition) return;

    const isFirstLoad = currentActiveSport === null;
    isTransitioning = true;

    // Collect current and new dots
    const currentDots = [];
    const newDots = [];

    markerElements.forEach(({ marker, sport: markerSport }) => {
        const dot = marker.getElement()?.querySelector('.marker-dot');
        if (!dot) return;

        if (dot.classList.contains('active')) {
            currentDots.push(dot);
        }
        if (markerSport === sport) {
            newDots.push({ dot, marker });
        }
    });

    // Update UI immediately for responsiveness
    updateSportUI(sport);

    // For first load or skipTransition, activate immediately
    if (isFirstLoad || skipTransition) {
        activateNewMarkers(newDots);
        currentActiveSport = sport;
        isTransitioning = false;
        return;
    }

    // Phase 1: Fade out current active markers
    currentDots.forEach(dot => {
        dot.classList.add('fading-out');
    });

    // Phase 2: After fade-out, activate new markers
    setTimeout(() => {
        // Remove old active states
        currentDots.forEach(dot => {
            dot.classList.remove('active', 'fading-out');
        });

        // Reset z-index for old markers
        markerElements.forEach(({ marker, sport: markerSport }) => {
            if (markerSport !== sport) {
                marker.setZIndexOffset(0);
            }
        });

        // Activate new markers
        activateNewMarkers(newDots);

        currentActiveSport = sport;
        isTransitioning = false;
    }, 200); // Fade-out duration
}

/**
 * Activate new markers with synced animation
 */
function activateNewMarkers(newDots) {
    newDots.forEach(({ dot, marker }, index) => {
        // Small random delay for organic feel (0-80ms)
        const stagger = Math.random() * 0.08;
        dot.style.setProperty('--pulse-delay', `${stagger}s`);

        // Activate with very slight stagger for wave effect
        setTimeout(() => {
            dot.classList.add('active');
            marker.setZIndexOffset(1000);
        }, Math.min(index * 3, 100)); // Cap total stagger at 100ms
    });
}

/**
 * Update sport UI elements (icon, name, count, pills)
 */
function updateSportUI(sport) {
    // Update info display (always use inactive/default icon for large display)
    if (elements.sportIcon) {
        elements.sportIcon.innerHTML = getIcon(sport, false);
    }
    if (elements.sportName) {
        elements.sportName.textContent = sport;
    }
    if (elements.sportCount) {
        const count = sportCounts[sport] || 0;
        elements.sportCount.textContent = `${count} Kurs${count !== 1 ? 'e' : ''}`;
    }

    // Update pills - swap icons based on active state
    document.querySelectorAll('.sport-pill').forEach((pill) => {
        const pillSport = pill.dataset.sport;
        const isActive = pillSport === sport;
        pill.classList.toggle('active', isActive);
        // Update icon to match active/inactive state
        pill.innerHTML = getIcon(pillSport, isActive);
    });
}

/**
 * Show next sport
 */
function nextSport() {
    currentSportIndex = (currentSportIndex + 1) % sportarten.length;
    showSport(sportarten[currentSportIndex]);
}

/**
 * Start auto-play
 */
function startAutoPlay() {
    stopAutoPlay();
    // Longer interval to account for transition time and let users appreciate each sport
    autoPlayInterval = setInterval(nextSport, 3500);
}

/**
 * Stop auto-play
 */
function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

/**
 * Show detail card for a course - shows all courses at same location
 */
function showDetail(index) {
    const kurs = kurse[index];
    if (!kurs) return;

    // Find all courses at the same location with the same sport
    const coursesAtLocation = kurse.filter(k =>
        k.sport === kurs.sport &&
        k.lat === kurs.lat &&
        k.lng === kurs.lng
    );

    if (elements.detailTitle) {
        elements.detailTitle.textContent = kurs.sport;
    }

    if (elements.detailLocation) {
        elements.detailLocation.textContent = kurs.ort;
    }

    // Build course list HTML
    if (elements.detailTime) {
        let coursesHTML = '';

        if (coursesAtLocation.length === 1) {
            // Single course - simple display
            const beschr = kurs.beschreibung !== kurs.sport ? kurs.beschreibung : '';
            coursesHTML = `
                <div class="course-item">
                    <span class="course-time">${kurs.tag} ${kurs.zeit}</span>
                    ${beschr ? `<span class="course-desc">${beschr}</span>` : ''}
                </div>
            `;
        } else {
            // Multiple courses - show list
            coursesHTML = coursesAtLocation.map(k => {
                const beschr = k.beschreibung !== k.sport ? k.beschreibung : '';
                return `
                    <div class="course-item">
                        <span class="course-time">${k.tag} ${k.zeit}</span>
                        ${beschr ? `<span class="course-desc">${beschr}</span>` : ''}
                    </div>
                `;
            }).join('');
        }

        // Add website link if available
        if (kurs.webseite) {
            coursesHTML += `
                <a href="${kurs.webseite}" target="_blank" rel="noopener" class="course-link">
                    Mehr erfahren →
                </a>
            `;
        }

        elements.detailTime.innerHTML = coursesHTML;
    }

    elements.detailCard?.classList.add('visible');
    elements.detailOverlay?.classList.add('visible');
}

/**
 * Hide detail card
 */
function hideDetail() {
    elements.detailCard?.classList.remove('visible');
    elements.detailOverlay?.classList.remove('visible');
}

/**
 * Hide info modal
 */
function hideInfoModal() {
    elements.infoModal?.classList.add('hidden');
    elements.infoOverlay?.classList.add('hidden');

    // Show UI panel after modal slides away
    setTimeout(() => {
        elements.uiPanel?.classList.add('visible');
    }, 200);
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Info modal close
    elements.infoClose?.addEventListener('click', hideInfoModal);
    elements.infoOverlay?.addEventListener('click', hideInfoModal);

    // Detail card close
    elements.detailClose?.addEventListener('click', hideDetail);
    elements.detailOverlay?.addEventListener('click', hideDetail);

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            currentSportIndex = (currentSportIndex + 1) % sportarten.length;
            showSport(sportarten[currentSportIndex]);
            stopAutoPlay();
            isPlaying = false;
        } else if (e.key === 'ArrowLeft') {
            currentSportIndex = (currentSportIndex - 1 + sportarten.length) % sportarten.length;
            showSport(sportarten[currentSportIndex]);
            stopAutoPlay();
            isPlaying = false;
        } else if (e.key === 'Escape') {
            hideDetail();
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

export interface ExportReportData {
  activeMembers: number;
  expiredMembers: number;
  totalRevenue: number;

  revenueData: {
    month: string;
    value: number;
  }[];

  attendanceData: {
    day: string;
    value: number;
  }[];

  membershipData: {
    membershipName: string;
    value: number;
  }[];

  transactions: {
    id: string | number;
    invoice: string;
    member: string;
    type: string;
    amount: number;
    date: string;
    status: string;
  }[];
}

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

const escapeHtml = (value: any) => {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const formatCompact = (value: number) => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  }

  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return String(value);
};

const createBarChart = (
  data: { label: string; value: number }[],
  type: "revenue" | "number"
) => {
  const maxValue = Math.max(
    ...data.map((item) => Number(item.value) || 0),
    1
  );

  return data
    .map((item) => {
      const numericValue = Number(item.value) || 0;

      const height = Math.max(
        4,
        Math.round((numericValue / maxValue) * 130)
      );

      const valueLabel =
        type === "revenue"
          ? formatCompact(numericValue)
          : numericValue.toString();

      return `
        <div class="chart-column">

          <div class="chart-value">
            ${escapeHtml(valueLabel)}
          </div>

          <div class="chart-bar-area">

            <div
              class="chart-bar"
              style="height:${height}px;"
            ></div>

          </div>

          <div class="chart-label">
            ${escapeHtml(item.label)}
          </div>

        </div>
      `;
    })
    .join("");
};

const createMembershipChart = (
  data: {
    membershipName: string;
    value: number;
  }[]
) => {
  if (!data || data.length === 0) {
    return `
      <div class="membership-empty">
        No membership data
      </div>
    `;
  }

  const total = data.reduce(
    (sum, item) => sum + Number(item.value || 0),
    0
  );

  if (total <= 0) {
    return `
      <div class="membership-empty">
        No membership data
      </div>
    `;
  }

  const colors = [
    "#E82528",
    "#9A0006",
    "#D65A5C",
    "#151A2D",
    "#777777",
  ];

  let currentDegree = 0;

  const gradients = data.map((item, index) => {
    const percentage =
      (Number(item.value || 0) / total) * 100;

    const start = currentDegree;

    const end =
      currentDegree + (percentage / 100) * 360;

    currentDegree = end;

    return `${colors[index % colors.length]} ${start}deg ${end}deg`;
  });

  const donutBackground = `conic-gradient(${gradients.join(", ")})`;

  const legend = data
    .map((item, index) => {
      const percentage =
        ((Number(item.value || 0) / total) * 100).toFixed(1);

      return `
        <div class="legend-row">

          <div class="legend-left">

            <span
              class="legend-dot"
              style="
                background:${colors[index % colors.length]};
              "
            ></span>

            <span>
              ${escapeHtml(item.membershipName)}
            </span>

          </div>

          <div class="legend-right">
            ${item.value}
            <span class="legend-percent">
              (${percentage}%)
            </span>
          </div>

        </div>
      `;
    })
    .join("");

  return `
    <div class="membership-content">

      <div
        class="donut-chart"
        style="
          background:${donutBackground};
        "
      >

        <div class="donut-center">

          <div class="donut-total">
            ${total.toLocaleString("id-ID")}
          </div>

          <div class="donut-label">
            Members
          </div>

        </div>

      </div>

      <div class="membership-legend">
        ${legend}
      </div>

    </div>
  `;
};

export const exportPdf = (data: ExportReportData) => {
  if (typeof window === "undefined") {
    return;
  }

  const {
    activeMembers,
    expiredMembers,
    totalRevenue,
    revenueData,
    attendanceData,
    membershipData,
    transactions,
  } = data;

  /*
   * ============================================
   * CHART DATA
   * ============================================
   */

  const revenueChart = createBarChart(
    revenueData.map((item) => ({
      label: item.month,
      value: item.value,
    })),
    "revenue"
  );

  const attendanceChart = createBarChart(
    attendanceData.map((item) => ({
      label: item.day,
      value: item.value,
    })),
    "number"
  );

  const membershipChart =
    createMembershipChart(membershipData);

  /*
   * ============================================
   * TRANSACTIONS
   * ============================================
   */

  const transactionRows =
    transactions && transactions.length > 0
      ? transactions
          .map((item) => {
            let statusClass = "status-default";

            const status =
              String(item.status || "").toLowerCase();

            if (
              status === "paid" ||
              status === "success" ||
              status === "completed"
            ) {
              statusClass = "status-success";
            }

            if (
              status === "pending" ||
              status === "on process"
            ) {
              statusClass = "status-warning";
            }

            if (
              status === "failed" ||
              status === "cancelled" ||
              status === "canceled"
            ) {
              statusClass = "status-danger";
            }

            return `
              <tr>

                <td>
                  ${escapeHtml(item.invoice)}
                </td>

                <td>
                  ${escapeHtml(item.member)}
                </td>

                <td>
                  ${escapeHtml(item.type)}
                </td>

                <td class="amount">
                  ${formatRupiah(
                    Number(item.amount) || 0
                  )}
                </td>

                <td>
                  ${escapeHtml(item.date)}
                </td>

                <td>
                  <span class="status ${statusClass}">
                    ${escapeHtml(item.status)}
                  </span>
                </td>

              </tr>
            `;
          })
          .join("")
      : `
          <tr>
            <td
              colspan="6"
              class="empty-row"
            >
              No transactions found
            </td>
          </tr>
        `;

  /*
   * ============================================
   * DATE
   * ============================================
   */

  const generatedDate =
    new Date().toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  /*
   * ============================================
   * OPEN PRINT WINDOW
   * ============================================
   */

  const printWindow = window.open(
    "",
    "_blank",
    "width=1400,height=1000"
  );
  

  if (!printWindow) {
    alert(
      "Please allow popups for this website."
    );

    return;
  }

  /*
   * ============================================
   * HTML
   * ============================================
   */

  printWindow.document.open();

  printWindow.document.write(`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8" />

<title>
DOMS Report
</title>

<style>

/* ==========================================
   RESET
========================================== */

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  background: #ffffff;
  color: #222222;
  font-family:
    Arial,
    Helvetica,
    sans-serif;
}

body {
  padding: 24px;
}

/* ==========================================
   REPORT
========================================== */

.report {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

/* ==========================================
   HEADER
========================================== */

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 16px;
  margin-bottom: 16px;

  border-bottom:
    3px solid #E82528;
}

.brand {
  display: flex;
  flex-direction: column;
}

.logo {
  font-size: 25px;
  font-weight: 900;
  letter-spacing: 0.5px;
  color: #151A2D;
}

.subtitle {
  margin-top: 5px;
  font-size: 11px;
  color: #777777;
}

.report-heading {
  text-align: right;
}

.report-heading h1 {
  margin: 0;

  font-size: 22px;
  font-weight: 900;

  color: #E82528;
}

.report-heading span {
  display: block;

  margin-top: 4px;

  font-size: 10px;
  color: #888888;
}

/* ==========================================
   KPI
========================================== */

.kpi-grid {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 12px;

  margin-bottom: 14px;
}

.kpi-card {
  background: #ffffff;

  border:
    1px solid #E7E7E7;

  border-radius: 10px;

  padding: 15px;

  min-height: 92px;
}

.kpi-title {
  font-size: 10px;
  color: #777777;
}

.kpi-value {
  margin-top: 7px;

  font-size: 23px;
  font-weight: 900;

  color: #151A2D;
}

.kpi-change {
  margin-top: 5px;

  font-size: 9px;
  color: #16A34A;
}

/* ==========================================
   REVENUE
========================================== */

.revenue-grid {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 12px;

  margin-bottom: 14px;
}

.revenue-card {
  border-radius: 10px;

  padding: 17px;

  min-height: 105px;
}

.revenue-primary {
  color: white;

  background:
    linear-gradient(
      135deg,
      #390606 0%,
      #C01212 55%,
      #4B1010 100%
    );
}

.revenue-secondary {
  border:
    1px solid #E7E7E7;

  background: #ffffff;
}

.revenue-label {
  font-size: 10px;
  opacity: 0.85;
}

.revenue-value {
  margin-top: 7px;

  font-size: 23px;
  font-weight: 900;
}

.revenue-change {
  margin-top: 7px;

  font-size: 9px;
}

.target-progress {
  width: 100%;
  height: 7px;

  margin-top: 13px;

  border-radius: 10px;

  background: #EEEEEE;

  overflow: hidden;
}

.target-progress-fill {
  width: 50%;
  height: 100%;

  background: #E82528;
}

.target-text {
  margin-top: 5px;

  font-size: 9px;
  color: #777777;
}

/* ==========================================
   CARD
========================================== */

.card {
  border:
    1px solid #E5E5E5;

  border-radius: 10px;

  background: #ffffff;

  padding: 14px;
}

.card-title {
  font-size: 13px;
  font-weight: 900;

  color: #151A2D;
}

.card-subtitle {
  margin-top: 3px;

  font-size: 9px;

  color: #888888;
}

/* ==========================================
   CHART GRID
========================================== */

.chart-grid {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 12px;

  margin-bottom: 14px;
}

/* ==========================================
   BAR CHART
========================================== */

.chart {
  height: 190px;

  margin-top: 10px;

  display: flex;

  align-items: flex-end;

  justify-content: space-around;

  gap: 7px;

  border-bottom:
    1px solid #EEEEEE;
}

.chart-column {
  flex: 1;

  height: 175px;

  min-width: 24px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: flex-end;
}

.chart-value {
  min-height: 14px;

  margin-bottom: 4px;

  font-size: 8px;

  color: #555555;

  white-space: nowrap;
}

.chart-bar-area {
  height: 130px;

  display: flex;

  align-items: flex-end;

  justify-content: center;
}

.chart-bar {
  width: 24px;

  min-height: 3px;

  border-radius:
    5px 5px 0 0;

  background:
    linear-gradient(
      to top,
      #9A0006,
      #E82528
    );
}

.chart-label {
  margin-top: 5px;

  font-size: 8px;

  color: #666666;

  text-align: center;

  white-space: nowrap;
}

/* ==========================================
   MEMBER ANALYTICS
========================================== */

.section-title {
  margin-top: 3px;
  margin-bottom: 10px;

  font-size: 15px;
  font-weight: 900;

  color: #151A2D;
}

.analytics-grid {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 12px;

  margin-bottom: 14px;
}

/* ==========================================
   DONUT
========================================== */

.membership-content {
  min-height: 180px;

  margin-top: 15px;

  display: flex;

  align-items: center;

  gap: 25px;
}

.donut-chart {
  width: 125px;
  height: 125px;

  flex-shrink: 0;

  border-radius: 50%;

  display: flex;

  align-items: center;
  justify-content: center;
}

.donut-center {
  width: 82px;
  height: 82px;

  border-radius: 50%;

  background: #ffffff;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;
}

.donut-total {
  font-size: 16px;

  font-weight: 900;

  color: #151A2D;
}

.donut-label {
  margin-top: 3px;

  font-size: 8px;

  color: #777777;
}

.membership-legend {
  flex: 1;
}

.legend-row {
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 9px;

  font-size: 9px;
}

.legend-left {
  display: flex;

  align-items: center;

  gap: 7px;
}

.legend-right {
  font-weight: 700;
}

.legend-percent {
  color: #09ae04;
  font-weight: normal;
}

.legend-dot {
  width: 9px;
  height: 9px;

  border-radius: 50%;

  display: inline-block;
}

.membership-empty {
  padding: 50px 0;

  text-align: center;

  color: #999999;

  font-size: 10px;
}

/* ==========================================
   TRANSACTIONS
========================================== */

.transaction-card {
  border:
    1px solid #E5E5E5;

  border-radius: 10px;

  overflow: hidden;

  margin-bottom: 10px;
}

.transaction-header {
  padding: 14px;
}

table {
  width: 100%;

  border-collapse:
    collapse;

  table-layout: fixed;
}

thead {
  display: table-header-group;
}

th {
  padding:
    8px 9px;

  text-align: left;

  background:
    #151A2D;

  color:
    #ffffff;

  font-size: 8px;

  font-weight: 700;
}

td {
  padding:
    8px 9px;

  border-bottom:
    1px solid #EEEEEE;

  font-size: 8px;

  color: #444444;

  word-break: break-word;
}

.amount {
  font-weight: 700;

  color: #151A2D;
}

.status {
  display: inline-block;

  padding:
    3px 7px;

  border-radius:
    20px;

  font-size: 7px;

  font-weight: 700;
}

.status-success {
  background: #E8F7EE;
  color: #16803C;
}

.status-warning {
  background: #FFF4D6;
  color: #9A6700;
}

.status-danger {
  background: #FDE8E8;
  color: #C52222;
}

.status-default {
  background: #EEEEEE;
  color: #666666;
}

.empty-row {
  padding: 25px;

  text-align: center;

  color: #999999;
}

/* ==========================================
   FOOTER
========================================== */

.footer {
  display: flex;

  justify-content:
    space-between;

  padding-top: 8px;

  font-size: 8px;

  color: #999999;
}

/* ==========================================
   PRINT
========================================== */

@media print {

  @page {
    size: A4 landscape;
    margin: 8mm;
  }

  html,
  body {
    width: 100%;
    background: #ffffff;
  }

  body {
    padding: 0;
  }

  .report {
    max-width: none;
  }

  .card,
  .kpi-card,
  .revenue-card,
  .transaction-card {
    break-inside: avoid;
  }

  .chart-grid,
  .analytics-grid {
    break-inside: avoid;
  }

  tr {
    break-inside: avoid;
  }

  /*
   * Keep background colors
   */
  * {
    -webkit-print-color-adjust:
      exact !important;

    print-color-adjust:
      exact !important;
  }
}

</style>

</head>

<body>

<div class="report">

  <!-- =====================================
       HEADER
  ====================================== -->

  <div class="header">

    <div class="brand">

      <div class="logo">
        DOMS FITNESS
      </div>

      <div class="subtitle">
        Gym Management Report
      </div>

    </div>

    <div class="report-heading">

      <h1>
        GYM REPORT
      </h1>

      <span>
        Overview and performance analytics
      </span>

    </div>

  </div>


  <!-- =====================================
       KPI
  ====================================== -->

  <div class="kpi-grid">

    <div class="kpi-card">

      <div class="kpi-title">
        Total Members
      </div>

      <div class="kpi-value">
        1,248
      </div>

      <div class="kpi-change">
        +12.5%
      </div>

    </div>


    <div class="kpi-card">

      <div class="kpi-title">
        Active Members
      </div>

      <div class="kpi-value">
        ${activeMembers}
      </div>

      <div class="kpi-change">
        +8.2%
      </div>

    </div>


    <div class="kpi-card">

      <div class="kpi-title">
        Expired Members
      </div>

      <div class="kpi-value">
        ${expiredMembers}
      </div>

      <div class="kpi-change">
        -4.3%
      </div>

    </div>


    <div class="kpi-card">

      <div class="kpi-title">
        New Members
      </div>

      <div class="kpi-value">
        86
      </div>

      <div class="kpi-change">
        +15.8%
      </div>

    </div>

  </div>


  <!-- =====================================
       REVENUE
  ====================================== -->

  <div class="revenue-grid">

    <div class="revenue-card revenue-primary">

      <div class="revenue-label">
        Total Revenue
      </div>

      <div class="revenue-value">
        ${formatRupiah(totalRevenue)}
      </div>

      <div class="revenue-change">
        ↑ 18.6% vs last month
      </div>

    </div>


    <div class="revenue-card revenue-secondary">

      <div class="revenue-label">
        Average Revenue / Member
      </div>

      <div
        class="revenue-value"
        style="color:#151A2D;"
      >
        ${formatRupiah(600000)}
      </div>

      <div class="target-progress">

        <div
          class="target-progress-fill"
        ></div>

      </div>

      <div class="target-text">
        50% of monthly target
      </div>

    </div>

  </div>


  <!-- =====================================
       CHARTS
  ====================================== -->

  <div class="chart-grid">


    <!-- REVENUE -->

    <div class="card">

      <div class="card-title">
        Revenue Overview
      </div>

      <div class="card-subtitle">
        Monthly revenue performance
      </div>

      <div class="chart">

        ${revenueChart}

      </div>

    </div>


    <!-- ATTENDANCE -->

    <div class="card">

      <div class="card-title">
        Attendance
      </div>

      <div class="card-subtitle">
        Weekly member attendance
      </div>

      <div class="chart">

        ${attendanceChart}

      </div>

    </div>

  </div>


  <!-- =====================================
       MEMBER ANALYTICS
  ====================================== -->

  <div class="section-title">
    Member Analytics
  </div>


  <div class="analytics-grid">


    <!-- MEMBERSHIP -->

    <div class="card">

      <div class="card-title">
        Membership Distribution
      </div>

      <div class="card-subtitle">
        Current membership distribution
      </div>

      ${membershipChart}

    </div>

  </div>


  <!-- =====================================
       TRANSACTIONS
  ====================================== -->

  <div class="section-title">
    Recent Transactions
  </div>


  <div class="transaction-card">

    <div class="transaction-header">

      <div class="card-title">
        Recent Transactions
      </div>

      <div class="card-subtitle">
        Latest gym payment transactions
      </div>

    </div>


    <table>

      <thead>

        <tr>

          <th>
            Invoice
          </th>

          <th>
            Member
          </th>

          <th>
            Type
          </th>

          <th>
            Amount
          </th>

          <th>
            Date
          </th>

          <th>
            Status
          </th>

        </tr>

      </thead>


      <tbody>

        ${transactionRows}

      </tbody>

    </table>

  </div>


  <!-- =====================================
       FOOTER
  ====================================== -->

  <div class="footer">

    <span>
      DOMS Management Report
    </span>

    <span>
      Generated ${generatedDate}
    </span>

  </div>

</div>


<script>

window.onload = function () {

  setTimeout(function () {

    window.focus();

    window.print();

  }, 700);

};

</script>

</body>

</html>
  `);

  printWindow.document.close();
};
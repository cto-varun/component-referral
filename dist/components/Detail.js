"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Detail;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// const columns =

function Detail(_ref) {
  let {
    data,
    accountStatus,
    setSelectedFilters,
    selectedFilters
  } = _ref;
  const [creditData, setCreditData] = (0, _react.useState)([]);
  const [columns, updateColumns] = (0, _react.useState)([{
    title: 'CREDITS',
    dataIndex: 'credit',
    key: 'credit',
    render: dt => /*#__PURE__*/_react.default.createElement("div", {
      style: {
        cursor: 'pointer'
      },
      className: "text-bold",
      onClick: () => updateStatus(dt)
    }, dt)
  }, {
    title: 'PREVIOUS YEAR',
    dataIndex: 'previousYear',
    key: 'previousYear',
    render: dt => /*#__PURE__*/_react.default.createElement("div", null, "$ ", dt)
  }, {
    title: 'CURRENT YEAR',
    dataIndex: 'currentYear',
    key: 'currentYear',
    render: dt => /*#__PURE__*/_react.default.createElement("div", null, "$ ", dt)
  }, {
    title: 'LIFETIME',
    dataIndex: 'lifetime',
    key: 'lifetime',
    render: dt => /*#__PURE__*/_react.default.createElement("div", {
      className: "text-green text-bold"
    }, "$ ", dt)
  }]);
  (0, _react.useEffect)(() => {
    if (data) {
      let newCreditData = [{
        credit: 'Earned',
        previousYear: data?.earnedCredits?.previousYearCredit,
        currentYear: data?.earnedCredits?.currentYearCredit,
        lifetime: data?.earnedCredits?.lifeTimeCredit
      }, {
        credit: 'Pending',
        previousYear: data?.pendingCredits?.previousYearCredit,
        currentYear: data?.pendingCredits?.currentYearCredit,
        lifetime: data?.pendingCredits?.lifeTimeCredit
      }, {
        credit: 'Forfeited',
        previousYear: data?.forfeitedCredits?.previousYearCredit,
        currentYear: data?.forfeitedCredits?.currentYearCredit,
        lifetime: data?.forfeitedCredits?.lifeTimeCredit
      }];
      setCreditData(newCreditData);
    }
  }, [data]);
  function updateStatus(status) {
    // console.log('status is ', status);
    setSelectedFilters({
      ...selectedFilters,
      statusFilter: status
    });
  }
  const countByType = type => {
    return data?.rewardDetails?.filter(_ref2 => {
      let {
        Status
      } = _ref2;
      return Status?.statusCode === type;
    })?.length;
  };
  const pendingCount = countByType('Pending');
  const activeCount = countByType('Active');
  const earnedCount = countByType('Earned');
  const forfietedCount = countByType('Forfieted');
  return data?.potentialMaximumCredits ? /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 6,
    className: "p-2 basic-details"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "text-head"
  }, "Maximum Credit Available"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", {
    className: "text-dollar"
  }, "$"), ' ', /*#__PURE__*/_react.default.createElement("span", {
    className: "text-price"
  }, data?.potentialMaximumCredits?.currentYearCredit)), /*#__PURE__*/_react.default.createElement("div", null, "Account Status : ", accountStatus), /*#__PURE__*/_react.default.createElement("div", null, "Created On :", ' ', (0, _moment.default)(data?.advocate?.createdTime).format('MM/DD/YYYY'))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 12,
    className: "p-2"
  }, /*#__PURE__*/_react.default.createElement(_antd.Table, {
    columns: columns,
    dataSource: creditData,
    rowClassName: "bg-transparent",
    className: "bg-transparent",
    pagination: false
  })), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 6,
    className: "p-2 basic-details"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex align-items-center "
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "miw-100 maw-150 text-dollar-grey"
  }, activeCount || '0', " Active Rewards")), /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex align-items-center "
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "miw-100 maw-150 text-dollar-green"
  }, earnedCount || '0', " Earned Rewards")), /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex align-items-center "
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "miw-100 maw-150 text-dollar-blue"
  }, pendingCount || '0', " Pending Rewards")), /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex align-items-center "
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "miw-100 maw-150 text-dollar-red"
  }, forfietedCount || '0', " Forfieted Rewards")))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
}
module.exports = exports.default;
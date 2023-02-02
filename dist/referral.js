"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Referral;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _moment = _interopRequireDefault(require("moment"));
var _Filter = _interopRequireDefault(require("./components/Filter.js"));
var _Detail = _interopRequireDefault(require("./components/Detail.js"));
require("./styles.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
//components

const columns = [{
  title: 'REFERRAL CODE',
  dataIndex: 'referralCode',
  key: 'referralCode',
  render: data => /*#__PURE__*/_react.default.createElement("div", {
    className: "text-green"
  }, data || '-')
}, {
  title: 'EMAIL',
  // dataIndex: 'email',
  key: 'email',
  render: data => /*#__PURE__*/_react.default.createElement("div", {
    className: "text-table-dark"
  }, data?.email || data?.emailAddress || '-')
}, {
  title: 'BAN',
  dataIndex: 'billingAccountNumber',
  key: 'billingAccountNumber',
  render: data => /*#__PURE__*/_react.default.createElement("div", {
    className: "text-table-dark"
  }, data || '-')
}, {
  title: 'STATUS',
  dataIndex: 'status',
  key: 'status',
  render: data => /*#__PURE__*/_react.default.createElement("div", {
    className: "text-table-dark"
  }, data?.status || '-')
}, {
  title: 'STATUS DATE',
  dataIndex: 'status',
  key: 'status',
  render: data => /*#__PURE__*/_react.default.createElement("div", {
    className: "text-table-dark"
  }, data?.updated ? (0, _moment.default)(data?.updated).format('MM/DD/YY h:mm a') : '-')
}, {
  title: 'ACTOR',
  dataIndex: 'uri',
  key: 'uri',
  render: data => /*#__PURE__*/_react.default.createElement("div", {
    className: "text-table-dark"
  }, data ? 'Advocate' : 'Referee')
}, {
  title: 'DAYS LEFT TO PAYOUT',
  dataIndex: 'daysLeftToPayout',
  key: 'daysLeftToPayout',
  render: data => /*#__PURE__*/_react.default.createElement("div", {
    className: "text-table-dark"
  }, data !== undefined ? `${data} Days` : '-')
}];
const initialFilterValues = {
  actorFilter: '',
  statusFilter: '',
  search: '',
  fromDate: '',
  toDate: ''
};
function Referral(_ref) {
  let {
    data,
    properties
  } = _ref;
  const [state, setState] = (0, _react.useState)({
    referee: [],
    allReferee: []
  });
  const [selectedFilters, setSelectedFilters] = (0, _react.useState)(initialFilterValues);
  const {
    referralData,
    accountStatus
  } = data?.data;
  const {
    accountStatuses
  } = properties;
  (0, _react.useEffect)(() => {
    if (referralData?.referee) {
      setState({
        ...state,
        referee: referralData?.advocate?.uri ? [referralData?.advocate, ...referralData?.referee] : referralData?.referee || [],
        allReferee: referralData?.advocate?.uri ? [referralData?.advocate, ...referralData?.referee] : referralData?.referee || []
      });
    }
  }, [referralData]);
  const {
    referee
  } = state;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Filter.default, {
    setState: setState,
    state: state,
    data: referralData,
    selectedFilters: selectedFilters,
    setSelectedFilters: setSelectedFilters
  }), /*#__PURE__*/_react.default.createElement(_Detail.default, {
    data: referralData,
    selectedFilters: selectedFilters,
    setSelectedFilters: setSelectedFilters,
    accountStatus: accountStatuses[accountStatus?.accountStatus]
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/_react.default.createElement(_antd.Table, {
    columns: columns,
    dataSource: referee,
    rowClassName: "bg-transparent",
    className: "bg-transparent",
    locale: {
      emptyText: 'It looks like there is no referral history available for this customer'
    }
  })));
}
module.exports = exports.default;
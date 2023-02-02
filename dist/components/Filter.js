"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ReferralFilter;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const {
  RangePicker
} = _antd.DatePicker;
const {
  Search
} = _antd.Input;
const {
  Option
} = _antd.Select;
function ReferralFilter(props) {
  const {
    setState,
    state,
    data,
    selectedFilters,
    setSelectedFilters
  } = props;
  const {
    referee,
    allReferee
  } = state;
  const [filters, setFilters] = (0, _react.useState)({
    actorFilter: [{
      name: 'ANY',
      value: ''
    }, {
      name: 'Advocate',
      value: 'Advocate'
    }, {
      name: 'Referee',
      value: 'Referee'
    }],
    statusFilter: []
  });
  (0, _react.useEffect)(() => {
    generateFilters();
  }, [allReferee]);
  (0, _react.useEffect)(() => {
    handleFilter();
  }, [selectedFilters]);
  function generateFilters() {
    let statusFilter = [{
      name: 'ANY',
      value: ''
    }];
    for (const element of allReferee) {
      if (statusFilter.findIndex(e => e.value === element?.status?.status) === -1 && element?.status?.status) statusFilter.push({
        name: element?.status?.status,
        value: element?.status?.status
      });
    }
    setFilters({
      ...filters,
      statusFilter
    });
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex justify-content-between my-2 p-1 bg-light"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex align-items-center"
  }, /*#__PURE__*/_react.default.createElement(RangePicker, {
    className: "ml-2",
    onChange: (e, date) => {
      handleDateFilter(date);
    }
  }), /*#__PURE__*/_react.default.createElement(_antd.Dropdown, {
    menu: renderMenu('status'),
    className: "ml-2"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, null, "Status : ", selectedFilters.statusFilter || 'ANY', ' ', /*#__PURE__*/_react.default.createElement(_icons.DownOutlined, null))), /*#__PURE__*/_react.default.createElement(_antd.Dropdown, {
    menu: renderMenu('actor'),
    className: "ml-2"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, null, "Actor : ", selectedFilters.actorFilter || 'ANY', ' ', /*#__PURE__*/_react.default.createElement(_icons.DownOutlined, null)))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(Search, {
    placeholder: "Search by referral code",
    style: {
      width: 244
    },
    onChange: handleSearch,
    value: selectedFilters.search
  })));
  function handleDateFilter(date) {
    setSelectedFilters({
      ...selectedFilters,
      fromDate: date[0],
      toDate: date[1]
    });
  }
  function handleFilter() {
    let {
      actorFilter,
      statusFilter,
      search,
      fromDate,
      toDate
    } = selectedFilters;
    let newDataToRender = [];
    newDataToRender = allReferee?.filter(e => !search || e?.referralCode?.includes(search))?.filter(e => !statusFilter || e.status?.status?.includes(statusFilter))?.filter(e => !actorFilter || actorFilter === 'Advocate' && e?.uri || actorFilter === 'Referee' && e?.referralCode);
    if (fromDate && toDate) newDataToRender = newDataToRender?.filter(e => (0, _moment.default)(e?.status?.updated) > (0, _moment.default)(fromDate) && (0, _moment.default)(e?.status?.updated) < (0, _moment.default)(toDate));
    setState({
      ...state,
      referee: newDataToRender
    });
  }
  function handleSearch(e) {
    setSelectedFilters({
      ...selectedFilters,
      search: e.target.value
    });
  }
  function renderMenu(type) {
    let myFilterVariable = `${type}Filter`;
    let menus = filters[myFilterVariable];
    return /*#__PURE__*/_react.default.createElement(_antd.Menu, {
      onClick: e => {
        handleMenuClick(myFilterVariable, e);
      }
    }, menus?.map((menu, index) => {
      return /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
        key: index,
        icon: /*#__PURE__*/_react.default.createElement(_icons.OrderedListOutlined, null)
      }, menu.name);
    }));
  }
  function handleMenuClick(myFilterVariable, e) {
    setSelectedFilters({
      ...selectedFilters,
      [myFilterVariable]: filters[myFilterVariable][e.key]['value']
    });
  }
}
module.exports = exports.default;
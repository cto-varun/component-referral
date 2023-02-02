import React, { useState, useEffect } from 'react';
import { DatePicker, Dropdown, Button, Menu, Input, Select } from 'antd';
import { DownOutlined, OrderedListOutlined } from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

export default function ReferralFilter(props) {
    const {
        setState,
        state,
        data,
        selectedFilters,
        setSelectedFilters,
    } = props;

    const { referee, allReferee } = state;

    const [filters, setFilters] = useState({
        actorFilter: [
            { name: 'ANY', value: '' },
            { name: 'Advocate', value: 'Advocate' },
            { name: 'Referee', value: 'Referee' },
        ],
        statusFilter: [],
    });

    useEffect(() => {
        generateFilters();
    }, [allReferee]);

    useEffect(() => {
        handleFilter();
    }, [selectedFilters]);

    function generateFilters() {
        let statusFilter = [{ name: 'ANY', value: '' }];

        for (const element of allReferee) {
            if (
                statusFilter.findIndex(
                    (e) => e.value === element?.status?.status
                ) === -1 &&
                element?.status?.status
            )
                statusFilter.push({
                    name: element?.status?.status,
                    value: element?.status?.status,
                });
        }

        setFilters({
            ...filters,
            statusFilter,
        });
    }

    return (
        <div className="d-flex justify-content-between my-2 p-1 bg-light">
            <div className="d-flex align-items-center">
                <RangePicker
                    className="ml-2"
                    onChange={(e, date) => {
                        handleDateFilter(date);
                    }}
                />
                <Dropdown menu={renderMenu('status')} className="ml-2">
                    <Button>
                        Status : {selectedFilters.statusFilter || 'ANY'}{' '}
                        <DownOutlined />
                    </Button>
                </Dropdown>
                <Dropdown menu={renderMenu('actor')} className="ml-2">
                    <Button>
                        Actor : {selectedFilters.actorFilter || 'ANY'}{' '}
                        <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
            <div>
                <Search
                    placeholder="Search by referral code"
                    style={{ width: 244 }}
                    onChange={handleSearch}
                    value={selectedFilters.search}
                />
            </div>
        </div>
    );
    function handleDateFilter(date) {
        setSelectedFilters({
            ...selectedFilters,
            fromDate: date[0],
            toDate: date[1],
        });
    }
    function handleFilter() {
        let {
            actorFilter,
            statusFilter,
            search,
            fromDate,
            toDate,
        } = selectedFilters;
        let newDataToRender = [];
        newDataToRender = allReferee
            ?.filter((e) => !search || e?.referralCode?.includes(search))
            ?.filter(
                (e) => !statusFilter || e.status?.status?.includes(statusFilter)
            )
            ?.filter(
                (e) =>
                    !actorFilter ||
                    (actorFilter === 'Advocate' && e?.uri) ||
                    (actorFilter === 'Referee' && e?.referralCode)
            );
        if (fromDate && toDate)
            newDataToRender = newDataToRender?.filter(
                (e) =>
                    moment(e?.status?.updated) > moment(fromDate) &&
                    moment(e?.status?.updated) < moment(toDate)
            );
        setState({
            ...state,
            referee: newDataToRender,
        });
    }

    function handleSearch(e) {
        setSelectedFilters({
            ...selectedFilters,
            search: e.target.value,
        });
    }

    function renderMenu(type) {
        let myFilterVariable = `${type}Filter`;
        let menus = filters[myFilterVariable];
        return (
            <Menu
                onClick={(e) => {
                    handleMenuClick(myFilterVariable, e);
                }}
            >
                {menus?.map((menu, index) => {
                    return (
                        <Menu.Item key={index} icon={<OrderedListOutlined />}>
                            {menu.name}
                        </Menu.Item>
                    );
                })}
            </Menu>
        );
    }

    function handleMenuClick(myFilterVariable, e) {
        setSelectedFilters({
            ...selectedFilters,
            [myFilterVariable]: filters[myFilterVariable][e.key]['value'],
        });
    }
}

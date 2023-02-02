import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import moment from 'moment';

//components
import Filter from './components/Filter.js';
import Detail from './components/Detail.js';

import './styles.css';

const columns = [
    {
        title: 'REFERRAL CODE',
        dataIndex: 'referralCode',
        key: 'referralCode',
        render: (data) => <div className="text-green">{data || '-'}</div>,
    },
    {
        title: 'EMAIL',
        // dataIndex: 'email',
        key: 'email',
        render: (data) => (
            <div className="text-table-dark">
                {data?.email || data?.emailAddress || '-'}
            </div>
        ),
    },
    {
        title: 'BAN',
        dataIndex: 'billingAccountNumber',
        key: 'billingAccountNumber',
        render: (data) => <div className="text-table-dark">{data || '-'}</div>,
    },
    {
        title: 'STATUS',
        dataIndex: 'status',
        key: 'status',
        render: (data) => (
            <div className="text-table-dark">{data?.status || '-'}</div>
        ),
    },
    {
        title: 'STATUS DATE',
        dataIndex: 'status',
        key: 'status',
        render: (data) => (
            <div className="text-table-dark">
                {data?.updated
                    ? moment(data?.updated).format('MM/DD/YY h:mm a')
                    : '-'}
            </div>
        ),
    },
    {
        title: 'ACTOR',
        dataIndex: 'uri',
        key: 'uri',
        render: (data) => (
            <div className="text-table-dark">
                {data ? 'Advocate' : 'Referee'}
            </div>
        ),
    },
    {
        title: 'DAYS LEFT TO PAYOUT',
        dataIndex: 'daysLeftToPayout',
        key: 'daysLeftToPayout',
        render: (data) => (
            <div className="text-table-dark">
                {data !== undefined ? `${data} Days` : '-'}
            </div>
        ),
    },
];

const initialFilterValues = {
    actorFilter: '',
    statusFilter: '',
    search: '',
    fromDate: '',
    toDate: '',
};

export default function Referral({ data, properties }) {
    const [state, setState] = useState({
        referee: [],
        allReferee: [],
    });
    const [selectedFilters, setSelectedFilters] = useState(initialFilterValues);

    const { referralData, accountStatus } = data?.data;
    const { accountStatuses } = properties;

    useEffect(() => {
        if (referralData?.referee) {
            setState({
                ...state,
                referee: referralData?.advocate?.uri
                    ? [referralData?.advocate, ...referralData?.referee]
                    : referralData?.referee || [],
                allReferee: referralData?.advocate?.uri
                    ? [referralData?.advocate, ...referralData?.referee]
                    : referralData?.referee || [],
            });
        }
    }, [referralData]);

    const { referee } = state;

    return (
        <div>
            <Filter
                setState={setState}
                state={state}
                data={referralData}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
            />
            <Detail
                data={referralData}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                accountStatus={accountStatuses[accountStatus?.accountStatus]}
            />
            <div className="mt-4">
                <Table
                    columns={columns}
                    dataSource={referee}
                    rowClassName="bg-transparent"
                    className="bg-transparent"
                    locale={{
                        emptyText:
                            'It looks like there is no referral history available for this customer',
                    }}
                />
            </div>
        </div>
    );
}

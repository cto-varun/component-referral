import React, { useEffect, useState } from 'react';
import { Row, Col, Table } from 'antd';
import moment from 'moment';
// const columns =

export default function Detail({
    data,
    accountStatus,
    setSelectedFilters,
    selectedFilters,
}) {
    const [creditData, setCreditData] = useState([]);
    const [columns, updateColumns] = useState([
        {
            title: 'CREDITS',
            dataIndex: 'credit',
            key: 'credit',
            render: (dt) => (
                <div
                    style={{ cursor: 'pointer' }}
                    className="text-bold"
                    onClick={() => updateStatus(dt)}
                >
                    {dt}
                </div>
            ),
        },
        {
            title: 'PREVIOUS YEAR',
            dataIndex: 'previousYear',
            key: 'previousYear',
            render: (dt) => <div>$ {dt}</div>,
        },
        {
            title: 'CURRENT YEAR',
            dataIndex: 'currentYear',
            key: 'currentYear',
            render: (dt) => <div>$ {dt}</div>,
        },
        {
            title: 'LIFETIME',
            dataIndex: 'lifetime',
            key: 'lifetime',
            render: (dt) => <div className="text-green text-bold">$ {dt}</div>,
        },
    ]);

    useEffect(() => {
        if (data) {
            let newCreditData = [
                {
                    credit: 'Earned',
                    previousYear: data?.earnedCredits?.previousYearCredit,
                    currentYear: data?.earnedCredits?.currentYearCredit,
                    lifetime: data?.earnedCredits?.lifeTimeCredit,
                },
                {
                    credit: 'Pending',
                    previousYear: data?.pendingCredits?.previousYearCredit,
                    currentYear: data?.pendingCredits?.currentYearCredit,
                    lifetime: data?.pendingCredits?.lifeTimeCredit,
                },
                {
                    credit: 'Forfeited',
                    previousYear: data?.forfeitedCredits?.previousYearCredit,
                    currentYear: data?.forfeitedCredits?.currentYearCredit,
                    lifetime: data?.forfeitedCredits?.lifeTimeCredit,
                },
            ];

            setCreditData(newCreditData);
        }
    }, [data]);

    function updateStatus(status) {
        // console.log('status is ', status);
        setSelectedFilters({ ...selectedFilters, statusFilter: status });
    }
    const countByType = (type) => {
        return data?.rewardDetails?.filter(({ Status }) => {
            return Status?.statusCode === type;
        })?.length;
    };

    const pendingCount = countByType('Pending');
    const activeCount = countByType('Active');
    const earnedCount = countByType('Earned');
    const forfietedCount = countByType('Forfieted');

    return data?.potentialMaximumCredits ? (
        <Row>
            <Col span={6} className="p-2 basic-details">
                <div className="text-head">Maximum Credit Available</div>
                <div>
                    <span className="text-dollar">$</span>{' '}
                    <span className="text-price">
                        {data?.potentialMaximumCredits?.currentYearCredit}
                    </span>
                </div>
                <div>Account Status : {accountStatus}</div>
                <div>
                    Created On :{' '}
                    {moment(data?.advocate?.createdTime).format('MM/DD/YYYY')}
                </div>
            </Col>
            <Col span={12} className="p-2">
                <Table
                    columns={columns}
                    dataSource={creditData}
                    rowClassName="bg-transparent"
                    className="bg-transparent"
                    pagination={false}
                />
            </Col>
            <Col span={6} className="p-2 basic-details">
                <div className="d-flex align-items-center ">
                    <div className="miw-100 maw-150 text-dollar-grey">
                        {activeCount || '0'} Active Rewards
                    </div>
                </div>
                <div className="d-flex align-items-center ">
                    <div className="miw-100 maw-150 text-dollar-green">
                        {earnedCount || '0'} Earned Rewards
                    </div>
                </div>
                <div className="d-flex align-items-center ">
                    <div className="miw-100 maw-150 text-dollar-blue">
                        {pendingCount || '0'} Pending Rewards
                    </div>
                </div>
                <div className="d-flex align-items-center ">
                    <div className="miw-100 maw-150 text-dollar-red">
                        {forfietedCount || '0'} Forfieted Rewards
                    </div>
                </div>
            </Col>
        </Row>
    ) : (
        <></>
    );
}

import React, {useEffect} from "react";
import "react-credit-cards/es/styles-compiled.css";
import {Space, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {useSelector} from "../../redux/hooks";
import {useDispatch} from "react-redux";
import {deleteWallet} from "../../redux/wallet/slice";
import {useHistory} from "react-router-dom";

interface DataType {
    walletId: string;
    bankAccount: string;
    funds: number;
}

export const WalletList: React.FC = (props) => {

    const walletData:any[] = useSelector(state => state.wallet.data);

    const dispatch = useDispatch();

    const history = useHistory();

    const columns: ColumnsType<DataType> = [
        {
            title: 'WalletId',
            dataIndex: 'id',
            key: 'walletId',
        },
        {
            title: 'BankAccount',
            dataIndex: 'bankAccount',
            key: 'bankAccount',
        },
        {
            title: 'Funds',
            dataIndex: 'funds',
            key: 'funds',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={()=>{dispatch(deleteWallet({bankAccount:record.bankAccount}))
                    alert(record.bankAccount+"deleted")
                    history.push("/wallet")}}>Delete</a>
                </Space>
            ),
        },
    ];

    console.log(walletData)
        return (
            <div id="WalletList" style={{marginTop: 50}}>
                <Table columns={columns} dataSource={walletData}/>
            </div>
        );

}

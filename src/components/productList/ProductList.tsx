import React from "react";
import {Link, useHistory} from "react-router-dom";
import {List, Space, Image, Tag, Typography} from "antd";
import {DeleteOutlined, StarOutlined} from "@ant-design/icons";
// import {addWatchList, deleteWatchList} from "../../redux/watchList/slice";
import { useDispatch } from "react-redux";
import {useSelector} from "../../redux/hooks";
import axios from "axios";
import {port} from "../../AppConfig";

const { Text } = Typography;

interface Product {
    id: string;
    streetAddress: string;
    suburb: string;
    landArea: number;
    realEstateArea: number;
    bedrooms: number;
    bathrooms: number;
    garage: number;
    realEstateImgs: any[];
    title: string;
    agentId: string;
}
interface PropsType {
  data: Product[];
  paging: any;
  onPageChange?: (nextPage, pageSize) => void;
}

const listData = (productList: Product[]) =>
  productList.map((p) => ({
    id: p.id,
    streetAddress: p.streetAddress,
      title: p.title,
      suburb:p.suburb,
      landArea:p.landArea,
      realEstateArea:p.realEstateArea,
      tags: (
          <>
              {p.suburb && <Tag color="#f50">{p.suburb} suburb</Tag>}
              {p.landArea && <Tag color="#108ee9">{p.landArea} land area </Tag>}
              {p.realEstateArea && <Tag color="#87d068">{p.realEstateArea} real estate area</Tag>}
              {p.bedrooms && <Tag color="#2db7f5">{p.bedrooms} bed rooms</Tag>}
              {p.bedrooms && <Tag color="pink">{p.bathrooms} bath rooms</Tag>}
          </>
      ),
      realEstateImgs: p.realEstateImgs[0].url,
      bathrooms: p.bathrooms,
      garage: p.garage,
      agentId: p.agentId,

  }));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const ProductList: React.FC<PropsType> = ({
  data,
  paging,
  onPageChange,
}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let userInfo = useSelector(state => state.user.userInfo);

    const onAdd = async (id: any) => {
        console.log("Success:", id);
        try {
            let response = await axios.post( port+`watchList/addList?realEstateId=${id}`);
            if (response.data.status == 200) {
                alert("add success！");
                history.push("/watchList");
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            alert(error)
            alert("add fail！");
        }
    };

    const onDelete = async (id: any) => {
        console.log("Success:", id);
        try {
            let response = await axios.post(port+`watchList/deleteList?realEstateId=${id}`);

            if (response.data.status == 200) {
                alert("delete success！");
                history.push("/watchList");
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            alert(error)
            alert("delete fail！");
        }
    };

    const products = listData(data);

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                current: paging.page,
                onChange: (page) => onPageChange && onPageChange(page, paging.records),
                pageSize: paging.records,
                total: paging.total,
            }}
            dataSource={products}
            footer={
                <div>
                    find:<Text strong>{paging.records}</Text>
                </div>
            }
            renderItem={(item) => (
                <List.Item
                    actions={[
                            <StarOutlined onClick={
                                ()=>{
                                    onAdd(item.id)
                                // dispatch(addWatchList({realEstateId:item.id}))
                                }
                            }>
                            </StarOutlined>
                       ,
                            <DeleteOutlined  onClick={
                                ()=>{
                                    onDelete(item.id)
                                    // dispatch(deleteWatchList({realEstateId:item.id}))
                                    // history.push("/watchList")
                                }}>
                                </DeleteOutlined>
                        ,
                        <Link to={"/detail/" + item.id} style={{fontSize: 20, fontWeight: 400}}> Detail</Link>
                    ]}
                    extra={
                        <Image width={272} height={172} alt="image"
                               src={item.realEstateImgs}/>
                    }
                >
                    <List.Item.Meta
                        title={
                            <>
                                <Text style={{fontSize: 30, fontWeight: 400}}>
                                    {item.streetAddress}
                                </Text>
                            </>
                        }
                        description={item.tags}
                    />
                    <Text
                        type="warning"
                        style={{fontSize: 25, fontWeight: 400}}
                    >{item.suburb}</Text>
                    <Text
                        type="danger"
                        style={{fontSize: 25, fontWeight: 400}}
                    > {item.title}</Text>
                </List.Item>
            )}
        />
    );
};

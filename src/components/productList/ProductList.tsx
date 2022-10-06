import React from "react";
import { Link } from "react-router-dom";
import { List, Rate, Space, Image, Tag, Typography } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
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

const addWatchList = () => {

    alert("add")
};

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
                        <div onClick={addWatchList}>
                            <IconText
                                icon={StarOutlined}
                                text=""
                                key="list-vertical-star-o"
                            />
                        </div>
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
                                <Text
                                    type="danger"
                                    style={{fontSize: 30, fontWeight: 400}}
                                >
                                    {" "}
                                    {item.suburb}
                                </Text>
                               
                            </>
                        }
                        description={item.tags}
                    />
                    <h3>{item.title}</h3>
                </List.Item>
            )}
        />
    );
};

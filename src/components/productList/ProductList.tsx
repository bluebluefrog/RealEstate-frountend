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
              {p.realEstateArea && <Tag color="#87d068">real estate area</Tag>}
              {p.bedrooms && <Tag color="#2db7f5">{p.bedrooms}bed rooms</Tag>}
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
                    key={item.streetAddress}
                    actions={[
                        <IconText
                            icon={StarOutlined}
                            text="156"
                            key="list-vertical-star-o"
                        />,
                        <IconText
                            icon={LikeOutlined}
                            text="156"
                            key="list-vertical-like-o"
                        />,
                        <>
                            <Rate defaultValue={3}/>
                            <Text strong className="ant-rate-text">
                                {item.bathrooms}
                            </Text>
                        </>,
                    ]}
                    extra={
                        <Image width={272} height={172} alt="image"
                               src={item.realEstateImgs}/>
                    }
                >
                    <List.Item.Meta
                        title={
                            <>
                                {item.bathrooms ? (
                                    <>
                                        <Text style={{fontSize: 20, fontWeight: 400}}>
                                            {item.streetAddress}
                                        </Text>
                                        <Text
                                            type="danger"
                                            style={{fontSize: 20, fontWeight: 400}}
                                        >
                                            {" "}
                                            {item.title}
                                        </Text>
                                    </>
                                ) : (
                                    <Text style={{fontSize: 20, fontWeight: 400}}>
                                        {item.landArea}
                                    </Text>
                                )}
                                <Link to={"/detail/" + item.id}> {item.title}</Link>
                            </>
                        }
                        description={item.tags}
                    />
                    {item.streetAddress}
                </List.Item>
            )}
        />
    );
};

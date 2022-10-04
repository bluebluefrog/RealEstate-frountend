import styles from "./ProductIntro.module.css";
import React from "react";
import { Typography, Carousel, Image, Rate, Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface PropsType {
    title: string;
    streetAddress: string;
    suburb: string | number;
    bedrooms: string;
    bathrooms: string;
    realEstateArea: string;
    landArea: string | number;
    pictures: string[];
}

const columns: ColumnsType<RowType> = [
  {
    title: "title",
    dataIndex: "title",
    key: "title",
    align: "left",
    width: 120,
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
];

interface RowType {
  title: string;
  description: string | number | JSX.Element;
  key: number;
}

export const ProductIntro: React.FC<PropsType> = ({
  title,
  streetAddress,
  suburb,
  bedrooms,
  bathrooms,
  realEstateArea,
  pictures,
}) => {

    const tableDataSource: RowType[] = [
      {
        key: 0,
        title: "title",
        description: title,
      },
      {
        key: 1,
        title: "suburb",
        description: (
          <>
            <Typography.Text type="danger" strong>
              {suburb}
            </Typography.Text>
          </>
        ),
      },
      {
        key: 3,
        title: "land area",
        description: realEstateArea ? (
          <>
            <Typography.Text type="danger" strong>
              {realEstateArea}
            </Typography.Text>
          </>
        ) : (
          "no info"
        ),
      },
      {
        key: 4,
        title: "bedrooms",
        description: bedrooms ? bedrooms : "no info",
      },
      {
        key: 2,
        title: "bathrooms",
        description: (
          <>
              {5}
          </>
        ),
      },
    ];

  return (
    <div className={styles["intro-container"]}>
      <Typography.Title level={4}>{title}</Typography.Title>
      <div className={styles["intro-detail-content"]}>
        <Typography.Text style={{ marginLeft: 20 }}>
          <span className={styles["intro-detail-strong-text"]}>{streetAddress}</span>{" "}

        </Typography.Text>
        <Typography.Text style={{ marginLeft: 50 }}>
          <span className={styles["intro-detail-strong-text"]}>{suburb}</span>{" "}
        </Typography.Text>
      </div>

      <Carousel autoplay slidesToShow={1}>
        {pictures.map((p) => (
          <Image height={500} width={600} src={p} />
        ))}
      </Carousel>

      <Table<RowType>
        columns={columns}
        dataSource={tableDataSource}
        size="small"
        bordered={false}
        pagination={false}
        showHeader={false}
      />
    </div>
  );
};

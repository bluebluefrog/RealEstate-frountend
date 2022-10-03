import React from 'react';
import styles from './ProductCollection.module.css';
import { Row, Col, Typography, Divider } from "antd";
import { ProductImage } from "./ProductImage";

interface PropsType {
    title: JSX.Element;
    sideImage: string;
    products: any[];
}
export const ProductCollection: React.FC<PropsType> = ({ title, sideImage, products }) => {

    return (
        <div className={styles.content}>
            <Divider orientation='left'>{title}</Divider>
            <Row>
                <Col span={4}>
                    <img src={sideImage} className={styles["side-image"]} alt=""/>
                </Col>
                <Col span={20}>
                    <Row>
                        <Col span={12}>
                            <ProductImage
                                id={products[0].id}
                                size={"large"}
                                title={products[0].streetAddress}
                                imageSrc={products[0].realEstateImgs[0].url}
                                price={products[0].suburb}
                            />
                        </Col>
                        <Col span={12}>
                            <Row>
                                {products.slice(1,3).map(item => (
                                    <Col span={12} className={styles["side-text"]}>
                                        <ProductImage
                                            id={item.id}
                                            size={"small"}
                                            title={item.streetAddress}
                                            imageSrc={item.realEstateImgs[0].url}
                                            price={item.suburb}
                                        />
                                    </Col>
                                ))}
                            </Row>
                            <Row>
                                {products.slice(4,6).map(item => (
                                    <Col span={12} className={styles["side-text"]}>
                                        <ProductImage
                                            id={item.id}
                                            size={"small"}
                                            title={item.streetAddress}
                                            imageSrc={item.realEstateImgs[0].url}
                                            price={item.suburb}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        {products.slice(6,10).map(item => (
                            <Col span={6} className={styles["side-text"]}>
                                <ProductImage
                                    id={item.id}
                                    size={"small"}
                                    title={item.streetAddress}
                                    imageSrc={item.realEstateImgs[0].url}
                                    price={item.suburb}
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
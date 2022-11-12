import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useLoaderData } from 'react-router-dom';


const News = () => {
    const news = useLoaderData();
    const { _id, author, title, total_view, details, image_url,category_id } = news;
    return (
        <div>
            <h2>This is News {news.title}</h2>
            <Card >
                <Card.Img variant="top" src={image_url} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {details}
                    </Card.Text>
                    <Link to={`/category/${category_id}`}>
                        <Button variant="primary">
                            All news in this category
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default News;
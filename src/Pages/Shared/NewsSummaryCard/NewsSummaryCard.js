import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { FaBookmark, FaShareAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const NewsSummaryCard = ({ news }) => {
    // console.log(news);
    const { _id, author, title, total_view, details, image_url } = news;
    return (

        <Card className="mb-5">
            <Card.Header className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center gap-3'>
                    <Image roundedCircle src={author.img} style={{ width: '60px' }}></Image>
                    <div>
                        <p className='mb-0'>
                            {author.name}
                        </p>
                        <p>
                            {author.published_date}
                        </p>
                    </div>
                </div>
                <div className="">
                    <FaBookmark></FaBookmark>
                    <FaShareAlt></FaShareAlt>
                </div>
            </Card.Header>
            <Card.Body >
                <Card.Title>{title}</Card.Title>
                <Card.Img variant="top" src={image_url} />
                <Card.Text>
                    {
                        details.length > 200
                            ?
                            <p>{details.slice(0, 250) + '...'}<Link to={`/news/${_id}`}>Read More</Link></p>
                            :
                            <p>{details}</p>

                    }
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
    );
};

export default NewsSummaryCard;
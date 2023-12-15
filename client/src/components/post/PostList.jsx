import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const PostList = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios.post("/api/post/list")
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    setPostList([...response.data.postList])
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <>
            <div className='list__header'>
                <h3>LIST</h3>
                <p>무슨 글 있는지 봅시다</p>
            </div>

            <div className='list__wrap'>
                {postList.map((post, key) => {
                    console.log(post)
                    return (
                        <div className='list' key={key}>
                            <span className='cate'>교육</span>
                            <h3 className='title'>
                                <Link to={`/detail/${post.postNum}`}>{post.title}</Link>
                            </h3>
                            <p className='desc'>{post.content}</p>
                            <div className='auth'>{post.author.displayName}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PostList
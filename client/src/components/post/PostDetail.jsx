import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const PostDetail = () => {
    let params = useParams();
    let navigate = useNavigate();
    const [postInfo, setPostInfo] = useState({});

    useEffect(() => {
        let body = {
            postNum: params.postNum,
        }
        axios.post("/api/post/detail", body)
            .then((response) => {
                console.log(response)
                setPostInfo(response.data.post)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum])

    const DeleteHandler = () => {
        if (window.confirm("정말로 삭제하겠습니까?")) {
            let body = {
                postNum: params.postNum,
            }
            axios
                .post("/api/post/delete", body)
                .then((response) => {
                    if (response.data.success) {
                        alert("게시글이 삭제되었습니다.");
                        navigate("/list")
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("게시글 삭제가 실패햇습니다.")
                })
        }
    }

    return (
        <div className='detail__wrap'>
            <div className='detail__title'>
                <h3>{postInfo.title}</h3>
                <div className='auth'>jjj</div>
            </div>
            <div className='detail__contents'>
                {postInfo.image ? <img src={postInfo.image} alt={postInfo.title} /> : null}
                {postInfo.content}
            </div>
            <div className='detail__btn'>
                <Link to={`/modify/${postInfo.postNum}`}>수정하기</Link>
                <button onClick={() => DeleteHandler()}>삭제</button>
                <Link to="/list">목록하기</Link>
            </div>
        </div>
    )
}

export default PostDetail
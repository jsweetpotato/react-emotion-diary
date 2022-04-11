import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || ""

  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const goDetail = () => navigate(`/diary/${id}`);
  const goEdit = ()=> navigate(`/edit/${id}`)

  return (
    <div className="diary-item">
      <div className={`diary-imgbox img${emotion}`} onClick={goDetail}>
        <img src={env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt={`emotion${emotion}`} />
      </div>
      <div className='diary-info' onClick={goDetail}>
        <p className="date">{strDate}</p>
        <p className="content">{content}</p>
      </div>
      <Button text={"수정"} onClick={goEdit} />
    </div>
  );
};

export default React.memo(DiaryItem);

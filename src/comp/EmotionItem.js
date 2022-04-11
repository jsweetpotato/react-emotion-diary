import React from 'react';

const EmotionItem = ({ emotion_id, emotion_descript, emotion_img, onClick, isSelected }) => {
  return (
    <div onClick={() => onClick(emotion_id)} className={["emotion-imgbox", isSelected ? "select" : "not-select"].join(" ")}>
      <div className={`emotion-back img${emotion_id}`}></div>
      <img src={emotion_img} alt={emotion_descript} />
      <p>{emotion_descript} </p>
    </div>
  );
};

export default React.memo(EmotionItem);

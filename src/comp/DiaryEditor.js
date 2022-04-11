import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";

//comp
import Button from "./Button";
import EmotionItem from "./EmotionItem";
import Header from "./Header";

//util
import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

const DiaryEditor = ({ isEdit, originDate }) => {
  const navigate = useNavigate();
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState();
  const [date, setDate] = useState(getStringDate(new Date()));

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handleSubmit = () => {
    if (!emotion) {
      alert("오늘의 감정을 선택해주세요!");
      return;
    }

    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "일기를 작성하시겠습니까?")) {
      if (!isEdit) onCreate(date, content, emotion);
      else onEdit(originDate.id, date, content, emotion);
      navigate("/", { replace: true });
    }
  };

  const handleRemove = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      onRemove(originDate.id);
      navigate("/", { replace: true });
      return;
    }
  };

  useEffect(() => {
    if (!isEdit) return;
    setDate(getStringDate(new Date(parseInt(originDate.date))));
    setEmotion(originDate.emotion);
    setContent(originDate.content);
  }, [isEdit, originDate]);

  return (
    <div className="diary-editor">
      <Header
        leftChild={<Button text={"뒤로"} onClick={() => navigate(-1)} />}
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        rightChild={isEdit && <Button text={"삭제"} type={"negative"} onClick={handleRemove} />}
      />
      <div className="wrapper">
        <section>
          <h4>오늘은 언제인가요?</h4>
          <input className="input-date" type={"date"} value={date} onChange={({ target }) => setDate(target.value)} />
        </section>
        <section>
          <h4>오늘의 기분</h4>
          <div className="emotion-wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <textarea
            placeholder="오늘은 어땠나요?"
            ref={contentRef}
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </section>
        <section>
          <div className="control-box">
            <Button text={"취소하기"} onClick={() => navigate(-1)} />
            <Button text={"작성완료"} type={"positive"} onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};
export default DiaryEditor;

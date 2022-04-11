import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

// comp
import Button from "../comp/Button";
import Header from "../comp/Header";

// util
import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

const Diary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState();

  useEffect(() => {
    const titleElem = document.getElementsByTagName('title')[0];
    titleElem.innerHTML = `감정일기장 - ${id}번 일기`
  }, []);

  useEffect(() => {
    if (diaryList < 1) return;
    const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));
    if (!targetDiary) {
      alert("없는 일기입니다");
      navigate("/", { replace: true });
      return;
    }
    setData(targetDiary);
  }, [id, diaryList]);

  if (!data) {
    return <div className="diary-page">로딩중입니다..</div>;
  } else {
    const curEmotionData = emotionList.find((it) => parseInt(it.emotion_id) === parseInt(data.emotion));

    return (
      <div className="diary-page">
        <Header
          leftChild={<Button text={"뒤로"} onClick={() => navigate(-1)} />}
          rightChild={<Button text={"수정"} onClick={() => navigate(`/edit/${id}`)} />}
          headText={`${getStringDate(new Date(data.date))} 기록`}
        />
        <article>
          <section>
            <h4>그날의 감정</h4>
            <div className={`detail-imgbox img${data.emotion}`}>
              <img src={curEmotionData.emotion_img} alt={curEmotionData.emotion_descript} />
              <p>{curEmotionData.emotion_descript}</p>
            </div>
          </section>
          <section>
            <h4>그날의 일기</h4>
            <textarea className="detail-textarea" value={data.content} readonly />
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;

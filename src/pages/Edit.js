import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../comp/DiaryEditor";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);

  const [originDate, setOriginData] = useState();

  useEffect(() => {
    const titleElem = document.getElementsByTagName('title')[0];
    titleElem.innerHTML = `감정일기장 - ${id}번 수정`
  }, []);

  useEffect(() => {
    if (diaryList.length < 1) return;
    const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));

    if (!targetDiary) return navigate(-1, { replace: true });
    if (targetDiary) return setOriginData(targetDiary);
  }, [id, diaryList]);


  return <>{originDate && <DiaryEditor isEdit={true} originDate={originDate} />}</>;
};

export default Edit;

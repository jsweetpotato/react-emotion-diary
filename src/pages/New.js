import { useEffect } from 'react';
import DiaryEditor from "../comp/DiaryEditor";

const New = () => {

  useEffect(() => {
    const titleElem = document.getElementsByTagName('title')[0];
    titleElem.innerHTML = `감정일기장 - 새 일기`
  }, []);

  return (
    <>
      <DiaryEditor/>
    </>
  );
};

export default New;

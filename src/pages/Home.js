import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import Button from "../comp/Button";
import DiaryList from "../comp/DiaryList";
import Header from "../comp/Header";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  // new Date().getMonth()를 불러올시 1월이 0으로 표기되기때문에 getMonth()를 사용할 때 1을 더해줌
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    const titleElem = document.getElementsByTagName('title')[0];
    titleElem.innerHTML = `감정 일기장`
  }, []);

  useEffect(() => {
    if (diaryList.length < 1) return;
    // the first day of current date, 1 means first day
    const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();

    // the last day of current date, "0" means the last day of prev month(because 1 is the first day of current month), to get last day of current month have to getMonth() + 1
    const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0, 23, 59, 59).getTime();

    // then set data range of firstday ~ lastday
    setData(diaryList.filter((it) => firstDay <= it.date && lastDay >= it.date));
  }, [diaryList, curDate]);

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
  };

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
  };
  return (
    <div>
      <Header
        headText={headText}
        leftChild={<Button text={"<"} onClick={decreaseMonth} />}
        rightChild={<Button text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;

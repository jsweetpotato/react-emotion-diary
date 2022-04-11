import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];

const filterOptionList = [
  { value: "all", name: "모두" },
  { value: "good", name: "좋음" },
  { value: "bad", name: "나쁨" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select className="control-menu" value={value} onChange={({ target }) => onChange(target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === "good") return parseInt(item.emotion) <= 3;
      if (filter === "bad") return parseInt(item.emotion) > 3;
    };

    // Copy the object using JSON, convert string and then parse it
    const compare = (a, b) => {
      if (sortType === "latest") return parseInt(b.date) - parseInt(a.date);
      if (sortType === "oldest") return parseInt(a.date) - parseInt(b.date);
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList = filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="diary-list">
      <div className="menu-wrapper">
        <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
        <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
        <Button type={"positive"} text={"새 일기쓰기"} onClick={() => navigate("/new")} />
      </div>
      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

// 정상적으로 데이터가 전달 안됐을때
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

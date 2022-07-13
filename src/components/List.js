import React from "react";
import { useDispatch } from "react-redux";
import {deleteList} from './../store/list/listSlice'

const List = ({ id, content }) => {
  const dispatch = useDispatch();
  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteList(id));
  };
  return (
    <div>
      <div>
        <h3>{id}</h3>
        <p>{content}</p>
      </div>
      <button type="button" onClick={onDelete}>
        삭제
      </button>
    </div>
  );
};

export default List;

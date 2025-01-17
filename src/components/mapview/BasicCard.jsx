/*global kakao*/
import React, { useState, useEffect } from "react";
import Toast from "../Toast";
import { useDispatch, useSelector } from "react-redux";

function BasicCard({ data, i }) {
  const [likeStatus, setLikeStatus] = useState(data.like);
  const [ToastStatus, setToastStatus] = useState(false);

  const dispatch = useDispatch();
  const redux = useSelector((state) => state);

  useEffect(() => {
    if (ToastStatus) {
      setTimeout(() => setToastStatus(false), 1000);
    }
  }, [ToastStatus]);

  const select = (i) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      redux.searched_data[i].HSSPLY_ADRES,
      function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(
            result[0].y - 0.001,
            result[0].x
          );

          redux.kakaoMap.setLevel(3);
          setTimeout(() => redux.kakaoMap.panTo(coords), 100);
        } else {
          setToastStatus(true);
        }
      }
    );
    dispatch({ type: "CLICK_HOUSE_DATA", id: data.HOUSE_MANAGE_NO });
  };

  const onClickLike = () => {};

  useEffect(() => {}, []);

  return (
    <div onClick={() => select(i)}>
      {ToastStatus && <Toast msg="등록된 위치 없음" />}
      <div className="cardInner">
        <div className="cardLeft">
          <div className="apt_place">
            {data.HOUSE_SECD_NM}&nbsp;|&nbsp;
            {data.HSSPLY_ADRES.split(" ")[0].substr(0, 2)}{" "}
            {data.HSSPLY_ADRES.split(" ")[1]}
          </div>
          <div className="apt_name">
            <span>{data.HOUSE_NM}</span>
            <span className="like_count">
              <span>254</span>
              <span />
            </span>
          </div>
          <div className="apt_period">
            <div>
              청약 기간&nbsp;&nbsp;|&nbsp;&nbsp;
              {data.RCEPT_BGNDE.replace(/-/g, ".").substr(2)} ~{" "}
              {data.RCEPT_ENDDE.replace(/-/g, ".").substr(2)}
            </div>
            <div>
              청약 발표&nbsp;&nbsp;|&nbsp;&nbsp;
              {data.PRZWNER_PRESNATN_DE.replace(/-/g, ".").substr(2)}
            </div>
          </div>
        </div>
        <div className="cardRight">
          <div
            className={likeStatus ? "like on" : "like off"}
            onClick={(e) => {
              e.stopPropagation();
              setLikeStatus((prev) => !prev);
            }}
          />
          <div className="apt_img" />
        </div>
      </div>
    </div>
  );
}
export default BasicCard;

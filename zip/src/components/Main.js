import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Main = ({}) => {
  
  useEffect(() => {
    console.log('main')
  }, []);
  
  return (
    <>
      <div>메인임</div>
      <Link to="/view" className="btn_goToMapView">지도 보기</Link>
    </>
  );
};

export default Main;
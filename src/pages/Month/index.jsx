import { DatePicker, NavBar, Toast } from "antd-mobile";
import React, { useState } from "react";
import "./index.scss";
import classNames from "classnames";
import dayjs from "dayjs";

export default function Month() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    console.log(dayjs());
    return dayjs()
  });
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>

      <div className="content">
        <div className="header">
          {/* 时间切换区域 date change area */}
          <div className="date">
            <span className="text">
              {dayjs(currentDate).format("YYYY | M")}月账单
            </span>
            <span
              className={classNames("arrow", showDatePicker && "expand")}
              onClick={() => setShowDatePicker(true)}
            ></span>
          </div>
          {/* 统计区域 statistic area */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>

            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>

            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>

            {/* 时间选择器 DatePicker */}
            <DatePicker
              className="kaDate"
              title="记账 Account"
              precision="month"
              visible={showDatePicker}
              max={new Date()}
              onClose={() => {
                setShowDatePicker(false);
              }}
              onConfirm={(val) => {
                setCurrentDate(val);
                console.log(currentDate);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

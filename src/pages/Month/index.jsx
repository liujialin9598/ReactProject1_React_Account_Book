import { DatePicker, NavBar } from "antd-mobile";
import React from "react";
import './index.scss'

export default function Month() {
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>

      <div className="content">
        <div className="header">
          {/* 时间切换区域 date change area */}
          <div className="date">
            <span className="text">2023 | 3月账单</span>
            <span className="arrow expand"></span>
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
              visible={false}
              max={new Date()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

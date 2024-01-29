import { DatePicker, NavBar, Toast } from "antd-mobile";
import React, { useMemo, useState } from "react";
import "./index.scss";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";

export default function Month() {
  //对数据按月分组 Group data by month
  const { billList } = useSelector((state) => state.billStore);
  const groupBill = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  console.log(groupBill);

  //控制datepicker的显示 control the display of datepicker
  const [showDatePicker, setShowDatePicker] = useState(false);

  //设置时间 set time
  const [currentDate, setCurrentDate] = useState(() => {
    console.log(dayjs());
    return dayjs();
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
              {/* 使用dayjs 设置时间格式 */}
              {/* set time format by dayjs */}
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

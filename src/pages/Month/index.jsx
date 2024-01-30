import { DatePicker, NavBar } from "antd-mobile";
import React, { useMemo, useState } from "react";
import "./index.scss";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import DayBill from "./components/DayBill";

export default function Month() {
  //对数据按月分组 Group data by month
  const { billList } = useSelector((state) => state.billStore);

  const groupBill = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-M"));
  }, [billList]);

  //控制datepicker的显示 control the display of datepicker
  const [showDatePicker, setShowDatePicker] = useState(false);

  //设置时间 set time
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs();
  });

  const onComfirm = (val) => {
    setCurrentDate(val);
  };

  //筛选时间对应的账单 filter bills by selected time
  const timeStr = dayjs(currentDate).format("YYYY-M");
  const monthlyBill = groupBill[timeStr] ? groupBill[timeStr] : [];
  const sumPay = monthlyBill
    .filter((item) => item.type === "pay")
    .reduce((a, b) => {
      return a + b.money;
    }, 0);
  const sumIncome = monthlyBill
    .filter((item) => item.type === "income")
    .reduce((a, b) => a + b.money, 0);

  // 当前月按照日来分组
  const groupBillDaily = useMemo(() => {
    return _.groupBy(monthlyBill, (item) =>
      dayjs(item.date).format("YYYY-MM-DD")
    );
  }, [monthlyBill]);
  const days=Object.keys(groupBillDaily)

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
              <span className="money">{sumPay}</span>
              <span className="type">支出</span>
            </div>

            <div className="item">
              <span className="money">{sumIncome}</span>
              <span className="type">收入</span>
            </div>

            <div className="item">
              <span className="money">{sumPay + sumIncome}</span>
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
              onConfirm={onComfirm}
            />
          </div>
        </div>
        {/* 单日列表统计 daily statistic bill*/}
        {days.length > 0 &&
          days.map((key) => {
            console.log(groupBillDaily[key]);
            return <DayBill groupBillDaily={groupBillDaily[key]} key={key}/>;
          })}
      </div>
    </div>
  );
}

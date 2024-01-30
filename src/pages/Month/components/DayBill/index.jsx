import classNames from "classnames";
import "./index.scss";
import dayjs from "dayjs";
import { billTypeToName } from "@/content";
import { useState } from "react";
import Icon from "@/components/Icon";

const DailyBill = ({ groupBillDaily }) => {
  const sumPay = groupBillDaily
    .filter((item) => item.type === "pay")
    .reduce((a, b) => {
      return a + b.money;
    }, 0);
  const sumIncome = groupBillDaily
    .filter((item) => item.type === "income")
    .reduce((a, b) => a + b.money, 0);

  const [billListVisible, setBillListVisible] = useState(true);
  return (
    <div className={classNames("dailyBill")}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">
            {dayjs(groupBillDaily[0].date).format("M月DD日")}
          </span>
          <span
            className={classNames("arrow", { expand: !billListVisible })}
            onClick={() => setBillListVisible(!billListVisible)}
          ></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{sumPay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{sumIncome}</span>
          </div>
          <div className="balance">
            <span className="money">{sumPay + sumIncome}</span>
            <span className="type">结余</span>
          </div>
        </div>
        <div
          className="billList"
          style={{ display: billListVisible ? "block" : "none" }}
        >
          {groupBillDaily.map((item) => {
            return (
              <div className="bill" key={item.id}>
                  <Icon type={item.useFor} />
                <div className="detail">
                  <div className="billType">{billTypeToName[item.useFor]}</div>
                </div>
                <div className={classNames("money", item.type)}>
                  {item.money.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default DailyBill;

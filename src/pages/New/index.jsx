import { Button, DatePicker, Input, NavBar } from "antd-mobile";
import Icon from "@/components/Icon";
import "./index.scss";
import classNames from "classnames";
import { billListData } from "@/content";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { pushBillList } from "@/store/modules/billStore";
import { useDispatch } from "react-redux";

const New = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTag, setActiveTag] = useState("pay");

  //保存提示
  const [showButton, setShowButton] = useState(false);

  //收集金额
  const [newBill, setNewBill] = useState(0);
  //收集类型
  const [useFor, setUseFor] = useState("");
  //保存账单 save bill
  const saveBill = () => {
    setShowButton(true);
    setTimeout(() => {
      setShowButton(false);
    }, 1000);
    const data = {
      date: new Date(),
      type: activeTag,
      money: activeTag === "income" ? newBill : -newBill,
      useFor: useFor,
    };
    dispatch(pushBillList(data));
  };

  const IconClick = (type) => {
    setUseFor(type);
    saveBill();

    //清空输入框 reset money input
    setNewBill(0);
  };

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>
      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames({ selected: activeTag === "pay" })}
            onClick={() => setActiveTag("pay")}
          >
            支出
          </Button>
          <Button
            className={classNames({ selected: activeTag === "income" })}
            shape="rounded"
            onClick={() => setActiveTag("income")}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text">{"今天"}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={newBill}
                onChange={setNewBill}
                onFocus={() => setNewBill("")}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>
      <div className="kaTypeList">
        {billListData[activeTag].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    <div
                      className={classNames("item", "")}
                      key={item.type}
                      onClick={() => IconClick(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {showButton && (
        <div className="btns">
          <Button className="btn save"> 已 保 存</Button>
        </div>
      )}
    </div>
  );
};

export default New;

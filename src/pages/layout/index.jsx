import React, { useEffect } from "react";
import { fetchBillList } from "@/store/modules/billStore";
import { useDispatch } from "react-redux";
import {
  AddCircleOutline,
  BillOutline,
  CalculatorOutline,
} from "antd-mobile-icons";
import { Badge, TabBar } from "antd-mobile";
import { Outlet, useNavigate } from "react-router";
import "./index.scss";

//布局容器
export default function Layout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBillList());
  }, [dispatch]);

  const tabs = [
    {
      key: "month",
      title: "月度账单",
      icon: <BillOutline />,
      badge: Badge.dot,
    },
    {
      key: "new",
      title: "记账",
      icon: <AddCircleOutline />,
      badge: "5",
    },
    {
      key: "year",
      title: "年度账单",
      icon: <CalculatorOutline />,
    },
  ];

  const navigate = useNavigate();
  const setRouteActive = (value) => {
    navigate(value);
  };

  return (
    <div className="layout">
      <div className="container">
        <Outlet />
      </div>

      <TabBar className="footer" onChange={(value) => setRouteActive(value)}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
}

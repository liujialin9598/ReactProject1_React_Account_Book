import React, { useEffect } from "react";
import { Button } from "antd-mobile";
import { Outlet } from "react-router-dom";
import { fetchBillList } from "@/store/modules/billStore";
import { useDispatch } from "react-redux";
//布局容器
export default function Layout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBillList());
  }, [dispatch]);

  return (
    <div>
      <Button color="primary">测试</Button>
      我是layout
      <div className="purple-theme">
        <Button color="primary">局部</Button>
      </div>
      <Outlet />
    </div>
  );
}

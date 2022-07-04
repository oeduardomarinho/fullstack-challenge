import React from "react";

import { Tabs, Button } from "antd";
import { Professionals, ProfessionalTypes } from "../";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";

const Home = () => {
  return (
    <div
      style={{
        display: "block",
        width: "100%",
        padding: 30,
        placeItems: "center",
      }}
    >
      <Tabs
        centered
        defaultActiveKey="professional"
        tabBarExtraContent={
          <Button type="primary" disabled>
            Log out
          </Button>
        }
      >
        <Tabs.TabPane
          tabKey="professional"
          key="professional"
          tab={
            <span>
              <UserOutlined /> Professionals
            </span>
          }
        >
          <Professionals />
        </Tabs.TabPane>

        <Tabs.TabPane
          tabKey="professionalType"
          key="professionalType"
          tab={
            <span>
              <TeamOutlined /> Professional Types
            </span>
          }
        >
          <ProfessionalTypes />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export { Home };

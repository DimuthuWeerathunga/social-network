import React from "react";
import { Col } from "antd";

import SignUpForm from "../components/auth/SignUpForm";
import { SECONDARY_BG_COLOR } from "../global-settings/colors";

function SignUpPage() {
  return (
    <div style={{ backgroundColor: SECONDARY_BG_COLOR }}>
      <Col
        span={12}
        offset={4}
        style={{ marginTop: "4rem", paddingBottom: "4rem" }}
      >
        <SignUpForm></SignUpForm>
      </Col>
    </div>
  );
}

export default SignUpPage;

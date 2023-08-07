import NewJoinPageComponentUI from "./NewJoin.presenter";
import { ChangeEvent, useState } from "react";
import { RadioChangeEvent } from "antd";
import { INewJoinPageComponent } from "./NewJoin.types";
import axios from "axios";

export default function NewJoinPageComponent(props: INewJoinPageComponent) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [isMember, setIsMember] = useState("");
  const [profileImageName, setProfileImageName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState(" ");
  const [isMemberError, setIsMemberError] = useState(" ");

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
    if (event.currentTarget.value !== "") {
      setEmailError(" ");
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
    if (event.currentTarget.value !== "") {
      setPasswordError(" ");
    }
  };

  const onChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.currentTarget.value);
    if (event.currentTarget.value !== "") {
      setNicknameError(" ");
    }
  };

  const onChangeRadioBtn = (event: RadioChangeEvent) => {
    console.log(event);
    setIsMember(event.target.value);
    if (event.target.value !== "") {
      setIsMemberError(" ");
    }
  };

  const onClickSubmit = async () => {
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
    }
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
    }
    if (!nickname) {
      setNicknameError("닉네임을 입력해주세요.");
    }
    if (!isMember) {
      setIsMemberError("구분을 선택해주세요.");
    }
    if (email && password && nickname && isMember) {
      console.log(`${email}, ${password}, ${nickname} , ${isMember}`);
      try {
        const response = await axios.post("http://192.168.111.1:8080/signup", {
          email,
          password,
          nickname,
          profileImageName,
          type: isMember,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <NewJoinPageComponentUI
      isUserData={props.isUserData}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onChangeNickname={onChangeNickname}
      onChangeRadioBtn={onChangeRadioBtn}
      emailError={emailError}
      passwordError={passwordError}
      nicknameError={nicknameError}
      isMemberError={isMemberError}
      onClickSubmit={onClickSubmit}
    />
  );
}

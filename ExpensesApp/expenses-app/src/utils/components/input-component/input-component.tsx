import React, { HTMLInputTypeAttribute, ReactNode } from "react";
import styles from "./input-component.module.css";

interface InputComponentProps {
  children: ReactNode;
  inputType: HTMLInputTypeAttribute;
  inputName: string;
  errorMessage?: string;
  inputData: (name: string, value: string) => void;
}

export default function InputComponent({
  children,
  inputType,
  inputName,
  inputData,
  errorMessage,
}: InputComponentProps) {
  return (
    <>
      <div className={styles.container} style={{marginBottom: errorMessage? 0 : "1rem"}}>
        {children}
        <input
          type={inputType}
          name={inputName}
          onChange={(e) => inputData(inputName, e.target.value)}
        />
      </div>
      <span style={{ color: "red" }}>{errorMessage}</span>
    </>
  );
}

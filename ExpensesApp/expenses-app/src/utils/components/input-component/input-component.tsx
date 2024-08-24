import React, { HTMLInputTypeAttribute, ReactNode } from "react";
import styles from "./input-component.module.css";

interface InputComponentProps {
  children?: ReactNode;
  inputType: HTMLInputTypeAttribute;
  inputName: string;
  errorMessage?: string;
  label?: string;
  inputData: (name: string, value: string) => void;
}

export default function InputComponent({
  children,
  inputType,
  inputName,
  inputData,
  errorMessage,
  label,
}: InputComponentProps) {
  return (
    <>
      <h4 style={{margin:0}}>{label}</h4>
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

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  type: "checkbox" | "radio" | "switch";
  label?: string;
  className?: string;
};

const FormCheckRadio = (props: Props) => {
  return (
    <div className={`${props.type} ${props.className}`}>
      {props.children}
      <span className="check" />
      <span className="pl-2">{props.label}</span>
    </div>
  );
};

export default FormCheckRadio;

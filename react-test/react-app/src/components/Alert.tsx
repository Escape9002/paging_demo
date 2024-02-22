import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  state?: "primary" | "secondary";
  onClose: () => void;
}

const Alert = ({ children, state = "primary", onClose }: Props) => {
  console.log("hello");
  return (
    <div className={"alert alert-" + state + "alert-dismissible"}>
      {children}

      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Alert;

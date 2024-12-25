import { FieldError } from "react-hook-form";
import { Label } from "../ui/label";

interface LabelDoubtProps {
  value: string;
  children: React.ReactNode;
  htmlFor?: string;
  error?: FieldError;
}

const LabelBlock: React.FC<LabelDoubtProps> = ({
  children,
  value,
  htmlFor,
  error,
}) => {
  return (
    <div>
      <Label className="mb-3 block" htmlFor={htmlFor}>
        {value}
      </Label>
      {children}
      <p>{error && <small className="text-error">{error.message}</small>}</p>
    </div>
  );
};

export default LabelBlock;

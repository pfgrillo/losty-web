import { useForm } from "react-hook-form";
import Icon from "../Icon";
import { IconType } from "react-icons";

interface Props {
  type: string;
  id: string;
  register: ReturnType<typeof useForm>["register"];
  watch?: ReturnType<typeof useForm>["watch"];
  disabled?: {
    byField: string;
    condition: string;
  };
  className?: string;
  icon?: IconType;
}

const InputField = ({
  type,
  id,
  register,
  watch,
  disabled,
  className,
  icon,
}: Props) => {
  const componentClassName = [
    "px-3 py-2 w-full relative block appearance-none",
    "placeholder-gray-500 text-gray-900 rounded-md",
    "focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:border-2 focus:z-10",
    "sm:text-sm mb-2",
    "shadow-lg",
    `${className ? className : ""}`,
  ].join(" ");

  return (
    <div className="flex">
      <div className="relative w-full">
        {icon && (
          <Icon
            icon={icon}
            color="#6366F1"
            className="absolute top-3 right-3 cursor-pointer z-[100]"
          />
        )}
        <input
          type={type}
          id={id}
          {...register(id)}
          disabled={watch ? disabled?.byField! === disabled?.condition! : false}
          className={componentClassName}
          max={
            type === "date" ? new Date().toISOString().split("T")[0] : undefined
          }
        />
      </div>
    </div>
  );
};

export default InputField;

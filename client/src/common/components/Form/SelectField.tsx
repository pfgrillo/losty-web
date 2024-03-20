import { useForm } from "react-hook-form";
import { toCamelCase } from "../../../utils/string.utils";

interface Props {
  options: string[];
  id: string;
  register: ReturnType<typeof useForm>["register"];
}

const SelectField = ({ options, id, register }: Props) => {
  const componentClassName = [
    "px-3 py-2 w-full relative block appearance-none",
    "border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md",
    "focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:border-2 focus:z-10",
    "sm:text-sm mt-2 mb-2",
  ].join(" ");

  return (
    <select id={id} {...register(id)} className={componentClassName}>
      {options.map((item) => (
        <option key={item} value={item}>
          {toCamelCase(item)}
        </option>
      ))}
    </select>
  );
};

export default SelectField;

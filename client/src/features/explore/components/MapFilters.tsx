import { ReportType, ItemType } from "../../../models/Marker";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import Button from "../../../common/components/Button";
import FormField from "../../../common/components/Form/FormField";
import SelectField from "../../../common/components/Form/SelectField";
import InputField from "../../../common/components/Form/InputField";
import Buttons from "../../../common/components/Buttons";
import FormCheckRadio from "../../../common/components/Form/CheckRadio";
import FormCheckRadioGroup from "../../../common/components/Form/CheckRadioGroup";

interface Props {
  onFilterChange: (filterOptions: any) => void;
}

export interface FilterOptions {
  reportType: ReportType[];
  itemType: "All" | ItemType | "";
  reportDate: {
    reportDay: string;
    reportTime: string;
  };
  place: string;
  description: string;
  title: string;
  reward: number;
  isEvent: boolean;
  event: any;
}

const MapFilters = ({ onFilterChange }: Props) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const filterOptions: FilterOptions = {
      reportType: data.reportType,
      itemType: data.itemType,
      reportDate: {
        reportDay: data.reportDate,
        reportTime: data.reportTime,
      },
      place: data.place,
      description: data.description,
      title: data.title,
      reward: data.reward,
      isEvent: data.isEvent,
      event: data.event,
    };
    onFilterChange(filterOptions);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col bg-white p-3">
      <div className="flex flex-row gap-x-10 flex-1 flex-wrap justify-start mb-4">
        <FormField label="Report Type" id="reportType">
          <FormCheckRadioGroup>
            <FormCheckRadio type="checkbox" label="Found">
              <input
                type="checkbox"
                value={ReportType.FOUND}
                id="reportType"
                {...register("reportType")}
              />
            </FormCheckRadio>
            <FormCheckRadio type="checkbox" label="Lost">
              <input
                type="checkbox"
                value={ReportType.LOST}
                id="reportType"
                {...register("reportType")}
              />
            </FormCheckRadio>
          </FormCheckRadioGroup>
        </FormField>
        <FormField label="Item Type" id="itemType">
          <SelectField
            options={["All", ...Object.values(ItemType)]}
            id="itemType"
            register={register}
          />
        </FormField>
        <FormField label="Date" id="reportDate">
          <InputField
            type="date"
            id="reportDate"
            register={register}
            className="mb-10"
          />
          <InputField type="time" id="reportTime" register={register} />
        </FormField>
        <FormField label="Place" id="place">
          <InputField type="text" id="place" register={register} />
        </FormField>
        <FormField label="Description" id="description">
          <InputField type="text" id="description" register={register} />
        </FormField>
        <FormField label="Title" id="title">
          <InputField type="text" id="title" register={register} />
        </FormField>
        <FormField label="Reward" id="reward">
          <InputField
            type="number"
            id="reward"
            register={register}
            watch={watch}
            disabled={{ byField: "reportType", condition: ReportType.FOUND }}
          />
        </FormField>
      </div>
      <Buttons className="flex flex-row" type="justify-center">
        <Button color="transparent" type="reset" label="Cancel" />
        <Button color="main" type="submit" label="Apply" />
      </Buttons>
    </form>
  );
};

export default MapFilters;

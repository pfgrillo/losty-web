import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { ItemType, Marker, ReportType } from "../../../models/Marker";
import { useAppDispatch } from "../../../hooks/storeHook";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectReportState } from "../../../store/features/reportSlice";
import { Wrapper } from "@googlemaps/react-wrapper";
import SingleItemMap from "../../../common/components/SingleItemMap";
import { postMarker } from "../services/report.service";
import Button from "../../../common/components/Button";
import Buttons from "../../../common/components/Buttons";
import FormField from "../../../common/components/Form/FormField";
import InputField from "../../../common/components/Form/InputField";
import SelectField from "../../../common/components/Form/SelectField";

const ReportItem = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const reportState = useSelector(selectReportState);
  const itemTypes = ItemType;
  const location = useLocation();
  const item: any = location.state?.item;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const addMarker: Marker = {
      user: localStorage.getItem('user')!,
      title: data.title,
      description: data.description,
      coordinates: {lat: item.lat!, lng: item.lng!},
      reportType: item.reportType === ReportType.LOST ? ReportType.LOST : ReportType.FOUND,
      itemType: data.itemType,
      label: data.title,
      place: data.location,
      reportDate: data.date.toString(),
      reportTime: data.time.toString(),
      reward: data.reward,
      isEvent: false,
      event: null
    };

    dispatch(postMarker(addMarker));

    if (!reportState.loading) {
      navigate('/explore');
    }
  };

  const cancelReport = () => {
    navigate('/explore');
  }

  const marker: Marker = {
    _id: '1',
    title: 'Test',
    description: 'This is a test',
    coordinates: {
      lat: item.lat!,
      lng: item.lng!
    },
    reportType: item.reportType === ReportType.LOST ? ReportType.LOST : ReportType.FOUND,
    itemType: ItemType.SUNGLASSES,
    label: 'Sunglasses',
    place: 'Test',
    reportDate: '01/01/2023',
    reportTime: '12:00',
    user: 'user@user.com',
    reward: 0
  };

  return (
    <>
      <div className="flex flex-col grow mt-4 text-black mb-5">
        <div className="flex flex-col grow pl-3">
          <div className="text-3xl font-[600] mb-5">Report Item</div>
          <div className="min-h-screen flex items-start justify-center sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div className="p-2 h-36 rounded-md">
                <Wrapper apiKey={apiKey!}><SingleItemMap marker={marker} /></Wrapper>
              </div>
              
              <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" name="remember" value="true" />
                <FormField id="title" label={`What have you ${marker.reportType}?`}>
                  <InputField type="text" id="title" register={register} />
                </FormField>
                <FormField id="description" label="Describe the item as best as you can">
                  <InputField type="text" id="description" register={register} />
                </FormField>
                <FormField id="itemType" label="Choose a category">
                  <SelectField options={Object.values(itemTypes)} id="itemType" register={register} />
                </FormField>
                <FormField id="date" label="Choose a date">
                  <InputField type="date" id="date" register={register} />
                </FormField>
                <FormField id="time" label="Choose a time (optional)">
                  <InputField type="time" id="time" register={register} />
                </FormField>
                <FormField id="location" label="Describe the location">
                  <InputField type="text" id="location" register={register} />
                </FormField>
                <FormField id="extra" label="Any other information you want to add?">
                  <InputField type="text" id="extra" register={register} />
                </FormField>
                {item.reportType === ReportType.LOST &&
                  <FormField id="reward" label="Do you want to add a reward?">
                    <InputField type="number" id="reward" register={register} />
                  </FormField>
                }
                {/* {errors.title && (
                      <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                    )} */}
                <Buttons type="justify-around lg:justify-around" noWrap>
                  <Button color="main" type="submit" label="Report item" />
                  <Button className="text-indigo-500 hover:bg-indigo-100" type="reset" label="Cancel" onClick={() => cancelReport()} />
                </Buttons>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReportItem;

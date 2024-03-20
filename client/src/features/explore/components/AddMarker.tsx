import React from 'react';
import { ReportType } from '../../../models/Marker';
import { ReactComponent as AddLostIcon } from '../../../assets/icons/add_lost.svg'; 
import { ReactComponent as AddFoundIcon } from '../../../assets/icons/add_found.svg'; 

type Props = {
  reportType: ReportType;
  onRequestClose: (data?: ReportType) => void;
};

const AddMarker = ({ reportType, onRequestClose }: Props) => {
  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '58%',
    transform: 'translate(-50%, -50%)',
  };

  const icon =
    reportType === ReportType.LOST ? <AddLostIcon width={40} height={40} /> : <AddFoundIcon width={40} height={40} />;

  return <div style={iconStyle} className="cursor-pointer pointer-events-none" onClick={() => onRequestClose(ReportType.FOUND)}>{icon}</div>;
};

export default AddMarker;

import React from 'react';
import {
  ControlBarButton,
  Camera,
} from 'amazon-chime-sdk-component-library-react';

import { LocalVideo } from './LocalVideo';
import { useVideoInputs } from '../providers/DevicesProvider';
import { useMeetingManager } from '../providers/MeetingProvider';
import { isOptionActive } from '../utils/DeviceUtils';
import { useLocalVideoToggle } from '../providers/LocalVideoToggleProvider';
import { DeviceConfig } from '../types';

// TODO: import from library when types are exported
export interface PopOverItemProps {
  onClick?: () => void;
  checked?: boolean;
  children?: React.ReactElement<any> | React.ReactElement<any>[];
  disabled?: boolean;
  href?: string;
  as?: any;
  text?: string;
  border?: boolean;
}

const VideoInputControl: React.FC = () => {
  const meetingManager = useMeetingManager();
  const videoInputConfig: DeviceConfig = {
    additionalDevices: true,
  };
  const { devices, selectedDevice } = useVideoInputs(videoInputConfig);
  const { isVideoEnabled, toggleVideo } = useLocalVideoToggle();
  const dropdownOptions: PopOverItemProps[] = devices.map(device => ({
    children: <span>{device.label}</span>,
    checked: isOptionActive(selectedDevice, device.deviceId),
    onClick: (): Promise<void> =>
      meetingManager.selectVideoInputDevice(device.deviceId),
  }));

  return (
    <>
      <ControlBarButton
        icon={<Camera disabled={!isVideoEnabled} />}
        onClick={toggleVideo}
        label={isVideoEnabled ? 'Disable video' : 'Enable video'}
        popOver={dropdownOptions}
      />
      {/* TODO: need to resize video tile dynamically */}
      <LocalVideo
        id="meeting-video"
        style={{ width: '20rem', position: 'absolute', top: '3.5rem' }}
      />
    </>
  );
};

export default VideoInputControl;
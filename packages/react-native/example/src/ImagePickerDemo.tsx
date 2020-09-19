import React from 'react';
import { ImagePicker } from '@td-design/react-native';

export default function ImagePickerDemo() {
  return (
    <>
      <ImagePicker
        action="http://object-service.dev.thundersdata.com/file/uploadToPub"
        data={{ access_token: '223bc111017d323b00fee4cf9c59a2be' }}
        borderStyle="dashed"
        marginBottom="s"
      />
      <ImagePicker
        action="http://object-service.dev.thundersdata.com/file/uploadToPub"
        data={{ access_token: '223bc111017d323b00fee4cf9c59a2be' }}
        borderStyle="solid"
        icon="plus"
        marginBottom="s"
      />
      <ImagePicker
        action="http://object-service.dev.thundersdata.com/file/uploadToPub"
        data={{ access_token: '223bc111017d323b00fee4cf9c59a2be' }}
        borderStyle="solid"
        icon="linedCamera"
        marginBottom="s"
      />
      <ImagePicker
        action="http://object-service.dev.thundersdata.com/file/uploadToPub"
        data={{ access_token: '223bc111017d323b00fee4cf9c59a2be' }}
        borderStyle="solid"
        icon="linedCamera"
        showUploadImg
        marginBottom="s"
      />
    </>
  );
}

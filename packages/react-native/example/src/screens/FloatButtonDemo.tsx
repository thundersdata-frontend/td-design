import React from 'react';
import { SvgXml } from 'react-native-svg';
import Container from '../components/Container';
import { FloatButton } from '@td-design/react-native';

const IconHome = () => (
  <SvgXml
    color="white"
    xml={`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z" fill="currentColor"></path></svg>`}
  />
);
const IconNotification = () => (
  <SvgXml
    color="white"
    xml={`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M18 16v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5 0h-2v-2h2v2zm0-4h-2V8h2v4zm-1 10c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2z" fill="currentColor"></path></svg>`}
  />
);
const IconCreate = () => (
  <SvgXml
    color="white"
    xml={`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--gridicons" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5h2z" fill="currentColor"></path><path d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4z" fill="currentColor"></path></svg>`}
  />
);
export default function FloatButtonDemo() {
  return (
    <Container>
      <FloatButton verticalOrientation="down">
        <FloatButton.Item buttonColor="#9b59b6" title="New Task">
          <IconHome />
        </FloatButton.Item>
        <FloatButton.Item buttonColor="#3498db" title="Notifications">
          <IconNotification />
        </FloatButton.Item>
        <FloatButton.Item buttonColor="#1abc9c" title="All Tasks">
          <IconCreate />
        </FloatButton.Item>
      </FloatButton>
    </Container>
  );
}

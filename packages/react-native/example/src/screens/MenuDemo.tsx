import React, { useState } from 'react';
import { Menu } from '@td-design/react-native';
import { IndexPath } from '../../menu/type';

import Container from '../components/Container';

const { MenuGroup, MenuItem } = Menu;
export default () => {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>({ row: '3-2', section: '3' });
  // const [selectedIndex, setSelectedIndex] = useState<IndexPath>({ row: '3' });

  return (
    <Container>
      <Menu width={300} itemHeight={60}>
        <MenuGroup id="1" title="Akveo React Native" left={{ name: 'user', color: 'gold' }}>
          <MenuItem id="1-1" title="UI Kitten" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
          <MenuItem id="1-2" title="Kitten Tricks" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
        </MenuGroup>
        <MenuGroup id="2" title="Akveo Angular" left={{ name: 'star', color: 'gold' }}>
          <MenuItem id="2-1" title="Nebular" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
          <MenuItem id="2-2" title="ngx-admin" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
          <MenuItem id="2-3" title="UI Bakery" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
        </MenuGroup>
        <MenuGroup id="3" title="Akveo Design" left={{ name: 'lock', color: 'gold' }}>
          <MenuItem
            id="3-1"
            title="Eva Design System"
            right={{ name: 'right', color: 'black', activeColor: 'white' }}
          />
          <MenuItem id="3-2" title="Eva Icons" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
        </MenuGroup>
      </Menu>
      {/* <Menu>
        <MenuItem id="1" title="UI Kitten" />
        <MenuItem id="2" title="Kitten Tricks" />
        <MenuItem id="3" title="Nebular" />
      </Menu> */}
    </Container>
  );
};

import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { ThemeProvider, helpers, Accordion, WingBlank, WhiteSpace, Picker, DatePicker } from '@td-design/react-native';
import { theme } from './theme';
import Iconfont from './Iconfont';

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);
const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemeProvider {...{ theme }}>
          <WhiteSpace />
          {/* <WingBlank>
            <Accordion
              activeSections={[2]}
              expandedHeight={200}
              sections={[
                {
                  title: 'Header1',
                  content:
                    'dal;asjdklfjasd;lkfjas;lkdfja;lksdjf;laksdjf;laksdjf;lkasjdf;lkasjdf;lkasjdf;lkasjd;lfkajs;dklfjasl;kdjf',
                },
                {
                  title: 'Header2',
                  content:
                    'dal;asjdklfjasd;lkfjas;lkdfja;lksdjf;laksdjf;laksdjf;lkasjdf;lkasjdf;lkasjdf;lkasjd;lfkajs;dklfjasl;kdjfdal;asjdklfjasd;lkfjas;lkdfja;lksdjf;laksdjf;laksdjf;lkasjdf;lkasjdf;lkasjdf;lkasjd;lfkajs;dklfjasl;kdjfdal;asjdklfjasd;lkfjas;lkdfja;lksdjf;laksdjf;laksdjf;lkasjdf;lkasjdf;lkasjdf;lkasjd;lfkajs;dklfjasl;kdjf',
                },
                { title: 'Header3', content: 'a;lkjdfalksdjf;laksdjfa' },
              ]}
            />
          </WingBlank> */}
          <WhiteSpace />
          <Picker
            data={[
              { label: 'zhangsan', value: 1 },
              { label: '1111', value: 2 },
              { label: '2222', value: 3 },
              { label: '3333', value: 4 },
              { label: '4444', value: 5 },
            ]}
            selectedValue={3}
            onValueChange={value => console.log('aaaa', value)}
          />
          <WhiteSpace />
          {/* <DatePicker value={new Date()} onChange={date => console.log(date)} /> */}
        </ThemeProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

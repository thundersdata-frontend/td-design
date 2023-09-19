import React from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Center from '../center';
import Empty from '../empty';
import helpers from '../helpers';
import { Theme } from '../theme';
import { Head } from './Head';
import { Rows } from './Rows';
import { TableProps } from './type';
import useTable from './useTable';
import { ColumnContext } from './utils';

const { deviceHeight } = helpers;

function Table<T extends Record<string, any>>(props: TableProps<T>) {
  const {
    columns = [],
    dataSource = [],
    headerStyle = {},
    rowStyle = {},
    onRefresh,
    onEndReached,
    refreshing = false,
    height = deviceHeight,
    fixedHeader = true,
    showHeader = true,
    emptyComponent,
    keyExtractor,
  } = props;
  const theme = useTheme<Theme>();
  const { contentHeight, handleHeaderLayout, handleLayout, cellWidth } = useTable({ columns });

  const styles = StyleSheet.create({
    contentContainer: {
      flexGrow: 1,
      flexDirection: 'column',
      height: height,
    },
  });

  return (
    <ColumnContext.Provider value={{ columns: columns, cellWidth: cellWidth }}>
      <ScrollView
        horizontal
        onContentSizeChange={handleLayout}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        bounces={false}
      >
        <FlatList<T>
          scrollEnabled={dataSource.length > 0}
          nestedScrollEnabled
          stickyHeaderIndices={fixedHeader && showHeader ? [0] : []}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: theme.colors.white,
          }}
          ListHeaderComponent={
            showHeader ? (
              <Box onLayout={handleHeaderLayout}>
                <Head headerStyle={headerStyle}></Head>
              </Box>
            ) : null
          }
          data={dataSource}
          bounces={false}
          ListEmptyComponent={
            emptyComponent ? (
              emptyComponent
            ) : (
              <Center height={contentHeight}>
                <Empty />
              </Center>
            )
          }
          renderItem={({ item }) => {
            return <Rows data={item} rowStyle={rowStyle}></Rows>;
          }}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          refreshing={refreshing}
          keyExtractor={keyExtractor}
        />
      </ScrollView>
    </ColumnContext.Provider>
  );
}
Table.displayName = 'Table';

export default Table;

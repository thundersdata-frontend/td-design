import React, { FC } from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Empty from '../empty';
import helpers from '../helpers';
import { Theme } from '../theme';
import WhiteSpace from '../white-space';
import { Head } from './Head';
import { Rows } from './Rows';
import { TableProps } from './type';
import useTable from './useTable';
import { ColumnContext } from './utils';

const { deviceHeight } = helpers;

const Table: FC<TableProps> = props => {
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
  } = props;
  const theme = useTheme<Theme>();
  const { handleLayout, cellWidth } = useTable({ columns });

  const styles = StyleSheet.create({
    contentContainer: {
      flexGrow: 1,
      flexDirection: 'column',
      backgroundColor: theme.colors.background,
      height: '100%',
    },
    scrollview: { flex: 1 },
  });

  return (
    <ColumnContext.Provider value={{ columns: columns, cellWidth: cellWidth }}>
      <Box height={height} onLayout={handleLayout}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollview}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        >
          <Box flex={1}>
            <FlatList
              nestedScrollEnabled
              stickyHeaderIndices={fixedHeader && showHeader ? [0] : []}
              ListHeaderComponent={showHeader ? <Head headerStyle={headerStyle}></Head> : null}
              data={dataSource}
              ListEmptyComponent={
                emptyComponent ? (
                  emptyComponent
                ) : (
                  <Box paddingTop="x3">
                    <Empty />
                  </Box>
                )
              }
              renderItem={({ item }) => {
                return <Rows data={item} rowStyle={rowStyle}></Rows>;
              }}
              onRefresh={onRefresh}
              onEndReached={onEndReached}
              refreshing={refreshing}
              keyExtractor={(_, i) => i + ''}
            />
          </Box>
        </ScrollView>
        <WhiteSpace />
      </Box>
    </ColumnContext.Provider>
  );
};
Table.displayName = 'Table';

export default Table;

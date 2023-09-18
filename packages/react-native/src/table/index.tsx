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
    horizontalScroll = false,
    headerStyle = {},
    rowStyle = {},
    onRefresh,
    onEndReached,
    refreshing = false,
    tableWidth,
    tableHeight = deviceHeight,
    fixedHeader = true,
    showHeader = true,
    emptyComponent,
  } = props;
  const theme = useTheme<Theme>();

  const { handleLayout, cellWidth } = useTable({ columns, tableWidth });

  const styles = StyleSheet.create({
    contentContainer: {
      flexGrow: 1,
      width: tableWidth,
      flexDirection: 'column',
      backgroundColor: theme.colors.background,
    },
    scrollview: { flex: 1 },
  });

  return (
    <ColumnContext.Provider value={{ columns: columns, cellWidth: cellWidth }}>
      <Box height={tableHeight} onLayout={handleLayout}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollview}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={horizontalScroll}
        >
          <Box flex={1} width={tableWidth}>
            <FlatList
              stickyHeaderIndices={fixedHeader && showHeader ? [0] : []}
              ListHeaderComponent={showHeader ? <Head headerStyle={headerStyle} tableWidth={tableWidth}></Head> : null}
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

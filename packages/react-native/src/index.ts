// components
import { useTheme } from '@shopify/restyle';
import type { Rule, Store, ValidateErrorEntity } from 'rc-field-form/es/interface';

import { default as Accordion } from './accordion';
import { default as ActionSheet } from './action-sheet';
import { Accessory, Avatar, AvatarGroup } from './avatar';
import { default as Badge } from './badge';
import { default as Box } from './box';
import { default as BoxShadow } from './box-shadow';
import { default as Brief } from './brief';
import { default as Button } from './button';
import { default as ButtonGroup } from './button-group';
import { default as Card } from './card';
import { default as Carousel } from './carousel';
import { default as Center } from './center';
import { Checkbox, CheckboxList } from './checkbox';
import { default as CollapseText } from './collapse-text';
import { CountDown, CountDownItem } from './count-down';
import { default as Divider } from './divider';
import { default as Empty } from './empty';
import { default as ErrorBlock } from './error-block';
import Flex from './flex';
import { default as FloatButton } from './float-button';
import { default as Flow } from './flow';
import { Form, FormItem, FormListItem, useForm } from './form';
import helpers from './helpers';
import { AnimateHeader, ImageHeader } from './image-header';
import { default as Indicator } from './indicator';
import Input, { InputItem, TextArea } from './input';
import { default as Label } from './label';
import { default as Link } from './link';
import { List, ListHeader } from './list';
import { default as ListItem } from './list-item';
import { default as Menu } from './menu';
import { default as Modal } from './modal';
import { default as NoticeBar } from './notice-bar';
import { default as Notify } from './notify';
import { NumberKeyboardInput, NumberKeyboardItem, NumberKeyboardView, showNumberKeyboard } from './number-keyboard';
import { default as Pagination } from './pagination';
import { default as Passcode } from './passcode';
import { default as Portal } from './portal';
import { default as Pressable } from './pressable';
import { default as Progress } from './progress';
import { Radio, RadioList } from './radio';
import { default as Result } from './result';
import { default as ScrollNumber } from './scroll-number';
import { default as SearchBar } from './search-bar';
import { default as Slider } from './slider';
import { default as Stepper } from './stepper';
import { default as SvgIcon } from './svg-icon';
import { default as SwipeRow } from './swipe-row';
import { default as Switch } from './switch';
import { default as Table } from './table';
import { default as Tag } from './tag';
import { default as Text } from './text';
import type { Theme } from './theme';
import theme from './theme';
import ThemeProvider from './theme-provider';
import { default as Timeline } from './timeline';
import { default as Toast } from './toast';
import { default as Tooltip } from './tooltip';
import { default as Tree } from './tree';
import {
  showVehicleKeyboard,
  VehicleKeyboardInput,
  VehicleKeyboardItem,
  VehicleKeyboardView,
} from './vehicle-keyboard';
import { default as WhiteSpace } from './white-space';
import { default as WingBlank } from './wing-blank';

export {
  Accordion,
  ActionSheet,
  Avatar,
  AvatarGroup,
  Accessory,
  Box,
  Badge,
  BoxShadow,
  Brief,
  Button,
  ButtonGroup,
  Card,
  Carousel,
  Center,
  Checkbox,
  CheckboxList,
  CollapseText,
  CountDown,
  CountDownItem,
  Divider,
  Empty,
  ErrorBlock,
  Flex,
  FloatButton,
  Flow,
  Form,
  FormItem,
  FormListItem,
  useForm,
  useTheme,
  helpers,
  ImageHeader,
  AnimateHeader,
  Indicator,
  Input,
  InputItem,
  TextArea,
  Label,
  Link,
  List,
  ListHeader,
  ListItem,
  Menu,
  Modal,
  NoticeBar,
  Notify,
  showNumberKeyboard,
  NumberKeyboardInput,
  NumberKeyboardItem,
  NumberKeyboardView,
  Pagination,
  Passcode,
  Portal,
  Pressable,
  Progress,
  Radio,
  RadioList,
  Result,
  ScrollNumber,
  SearchBar,
  Slider,
  Stepper,
  SvgIcon,
  SwipeRow,
  Switch,
  Table,
  Tag,
  Text,
  theme,
  ThemeProvider,
  Timeline,
  Toast,
  Tooltip,
  Tree,
  showVehicleKeyboard,
  VehicleKeyboardInput,
  VehicleKeyboardItem,
  VehicleKeyboardView,
  WhiteSpace,
  WingBlank,
};

export type File = {
  fileName: string;
  fileType: string;
  uri: string;
  fileSize?: number;
};

export type { Theme, Store, ValidateErrorEntity, Rule };

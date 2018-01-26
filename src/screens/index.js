import { Navigation } from 'react-native-navigation';

import Schedule from './Schedule';
import GradePoint from './GradePoint';
import Modul from './Modul';
import News from './News';
import Ngampus from './Ngampus';
import Account from './Account';
import Setting from './Setting';
import About from './About';
import Feedback from './Feedback';

import NewsDetail from '../components/news/NewsDetail';
import FlatListComp from '../components/modul/FlatListComp';
import ModalFilter from '../components/modul/ModalFilter';
import FlatListComp2 from '../components/search/FlatListComp';
import ModalFilter2 from '../components/search/ModalFilter';
import Header from '../components/search/HeaderComp';
import TabContainer from '../components/schedule/TabContainer';

import Search from './Search';
import AcademicCalendar from './AcademicCalendar';

import Drawer from './Drawer';

export const registerScreens = function registerScreens(store, Provider) {
  Navigation.registerComponent('screen.Schedule', () => Schedule, store, Provider);
  Navigation.registerComponent('screen.GradePoint', () => GradePoint, store, Provider);
  Navigation.registerComponent('screen.Modul', () => Modul, store, Provider);
  Navigation.registerComponent('screen.News', () => News, store, Provider);
  Navigation.registerComponent('screen.Ngampus', () => Ngampus, store, Provider);
  Navigation.registerComponent('screen.Account', () => Account, store, Provider);
  Navigation.registerComponent('screen.Setting', () => Setting, store, Provider);
  Navigation.registerComponent('screen.About', () => About, store, Provider);
  Navigation.registerComponent('screen.Feedback', () => Feedback, store, Provider);

  Navigation.registerComponent('comp.Drawer', () => Drawer, store, Provider);
  Navigation.registerComponent('comp.ModalFilter', () => ModalFilter, store, Provider);
  Navigation.registerComponent('comp.FlatListComp', () => FlatListComp, store, Provider);
  Navigation.registerComponent('comp.ModalFilter2', () => ModalFilter2, store, Provider);
  Navigation.registerComponent('comp.FlatListComp2', () => FlatListComp2, store, Provider);
  Navigation.registerComponent('comp.Header', () => Header, store, Provider);
  Navigation.registerComponent('comp.TabContainer', () => TabContainer, store, Provider);

  Navigation.registerComponent('push.Search', () => Search, store, Provider);
  Navigation.registerComponent('push.AcademicCalendar', () => AcademicCalendar, store, Provider);
  Navigation.registerComponent('push.NewsDetail', () => NewsDetail);
};

export default registerScreens;

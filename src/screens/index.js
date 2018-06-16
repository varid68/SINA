import { Navigation } from 'react-native-navigation';

import Schedule from './Schedule';
import GradePoint from './GradePoint';
import News from './News';
import Account from './Account';
import About from './About';
import Feedback from './Feedback';

import NewsDetail from '../components/news/NewsDetail';
import TabContainer from '../components/schedule/TabContainer';

import AcademicCalendar from './AcademicCalendar';

import Drawer from './Drawer';

export const registerScreens = function registerScreens(store, Provider) {
  Navigation.registerComponent('screen.Schedule', () => Schedule, store, Provider);
  Navigation.registerComponent('screen.GradePoint', () => GradePoint, store, Provider);
  Navigation.registerComponent('screen.News', () => News, store, Provider);
  Navigation.registerComponent('screen.Account', () => Account, store, Provider);
  Navigation.registerComponent('screen.About', () => About, store, Provider);
  Navigation.registerComponent('screen.Feedback', () => Feedback, store, Provider);

  Navigation.registerComponent('comp.Drawer', () => Drawer, store, Provider);
  Navigation.registerComponent('comp.TabContainer', () => TabContainer, store, Provider);

  Navigation.registerComponent('push.AcademicCalendar', () => AcademicCalendar, store, Provider);
  Navigation.registerComponent('push.NewsDetail', () => NewsDetail);
};

export default registerScreens;
